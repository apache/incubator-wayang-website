---
slug: gsoc-2026-datalake-friendly-wayang
title: "GSoC 2026: Making Apache Wayang More Datalake-Friendly"
authors: [jun.wang]
tags: [wayang, gsoc, trino, presto, bigquery, duckdb, parquet]
---

# GSoC 2026: Making Apache Wayang More Datalake-Friendly

This blog post summarizes my Google Summer of Code 2026 project for Apache Wayang. The original goal, "Make Wayang More Datalake-Friendly", was to integrate modern analytical SQL engines and Parquet-based data sources into Wayang's optimization and execution framework.

Apache Wayang lets users describe a data-processing pipeline once and then either choose an execution platform or let Wayang's optimizer decide where the pipeline should run. This matters for modern analytical workloads because data is often no longer stored inside a single database. It may live as Parquet files in object storage, in federated catalogs queried by Trino or Presto, in a serverless warehouse such as BigQuery, or in local analytical files processed by DuckDB. The project focused on making these engines visible to Wayang as execution platforms rather than treating them as separate external connectors.

<div style={{textAlign: 'center'}}>
  <img width="90%" alt="Apache Wayang data lake execution platforms project overview" src="/img/blog/wayang-datalake/hero-image.png" />
</div>

<!--truncate-->

## Project Goals

The project had four main goals:

- Add SQL-backed execution platforms as alternatives that Wayang's optimizer can evaluate.
- Push relational operators such as filter, projection, join, aggregation, sort, and table sink into those engines.
- Execute logical `ParquetSource` inputs on SQL platforms.
- Provide integration tests and profiling workflows needed for reliable execution and cost-based platform selection.

## SQL Platform Architecture

The implementation builds on Wayang's reusable JDBC platform structure. Each SQL engine follows the same architecture:

- A `Platform` class identifies the backend, provides the JDBC driver class, and defines the configuration prefix used by that engine, such as `wayang.trino.*`, `wayang.bigquery.*`, or `wayang.duckdb.*`.
- A `Plugin` registers the platform, mappings, and channel conversions so the optimizer can use the engine.
- `Mapping` classes replace logical Wayang operators with engine-specific execution operators.
- Execution operators implement `JdbcExecutionOperator` and generate SQL fragments.
- `JdbcExecutor` collects compatible operators in an execution stage and assembles one SQL statement for the target engine.

For example, a logical `FilterOperator` with a SQL implementation can be transformed into `TrinoFilterOperator`, `PrestoFilterOperator`, `BigQueryFilterOperator`, or `DuckDBFilterOperator`. A source contributes the `FROM` relation; filters add `WHERE` predicates; joins add `JOIN ... ON ...`; reduce and reduce-by operators contribute aggregation expressions and, where needed, `GROUP BY`; and sorts add `ORDER BY`.

The executor then assembles a query of the following form:

```sql
SELECT ...
FROM ...
JOIN ...
WHERE ...
GROUP BY ...
ORDER BY ...
```

The goal is to keep as much work as possible inside the SQL engine. When a plan segment ends with a table sink, Wayang writes the result directly through SQL. Otherwise, the generated query is passed through Wayang's SQL channel abstraction so later operators can continue from it. This keeps engine-specific modules small while reusing Wayang's optimizer, channels, and JDBC execution path.

## Platform Implementations

I implemented support for four SQL engines: Trino, Presto, BigQuery, and DuckDB. They build on a common architecture while targeting different runtime models.

| Platform | Runtime model | Integration focus |
|---|---|---|
| Trino | Distributed/federated SQL engine | Catalog/schema configuration, cluster execution, and SQL pushdown |
| Presto | Distributed/federated SQL engine | Operator pushdown, table-sink execution, and engine-only integration coverage |
| BigQuery | Serverless cloud data warehouse | JDBC authentication, qualified table names, and large analytical scans |
| DuckDB | Embedded analytical database | Local execution, simple setup, and Parquet-oriented workflows |

Trino and Presto implement table source, filter, projection, join, global reduce, reduce-by, sort, and table sink support. Their tests register only the target platform plugin, create self-contained fixtures, run the Wayang plan in the SQL engine, and verify results through JDBC. This prevents unsupported operators from being hidden by a Java fallback.

BigQuery reuses the JDBC execution path but needs platform-specific behavior for driver configuration, backtick-quoted table names, and cloud execution. Its cost profile is also different: BigQuery has relatively high query-startup overhead, so reliable platform selection depends on calibrating its fixed and per-record costs for the target deployment.

DuckDB represents the embedded analytical side of the project. Unlike Trino, Presto, or BigQuery, it does not require a remote service, coordinator, or worker cluster. The implementation follows the shared JDBC platform pattern while targeting local execution through `jdbc:duckdb:` or a DuckDB database file. It supports the same relational operator set and adds DuckDB-specific Parquet handling through relations or `read_parquet(...)` views. This makes DuckDB particularly useful for lightweight local analytics and file-oriented workloads.

## SQL Parquet Source Support

Parquet support is the main file-source part of the project. Wayang already has a logical `ParquetSource`, but SQL engines cannot always execute a file URI directly. They usually need a relation: for example, a Hive or Iceberg table in Trino, an external table in BigQuery, or a `read_parquet(...)` view in DuckDB.

In the `feature/parquet-sql-independent-platforms-clean` branch, I implemented an independent platform approach for SQL Parquet execution. The shared base is `JdbcParquetSource`, and each platform adds a small concrete source such as `TrinoParquetSource`, `PrestoParquetSource`, or `BigQueryParquetSource`. A `ParquetSourceMapping` then turns a logical `ParquetSource` into the platform-specific source alternative.

This also introduced a shared source abstraction in the JDBC layer. `JdbcSourceOperator` marks operators that can start a SQL stage and provide a relation for the `FROM` clause, so both table sources and Parquet sources can be handled through the same executor path.

`JdbcParquetSource` supports two ways to expose a Parquet URI as a SQL relation. A user can map the URI to an existing relation with configuration such as `wayang.trino.parquetsource.mappings`. Alternatively, if auto-creation is enabled, Wayang generates a stable relation name and creates the relation from a platform-specific SQL template. If neither option is configured, the source uses the original URI as its relation reference. The implementation also escapes URI values used in SQL templates, converts Parquet schema fields into SQL column definitions when the template requires them, and estimates cardinality with `SELECT count(*) FROM <relation>`.

## Cost Profiling

Wayang's optimizer compares alternative execution plans through load and cost estimates. For a new SQL platform, this means the platform needs default parameters for operators such as source, filter, projection, join, reduce, sort, and sink. Without these parameters, the platform remains executable, but the optimizer lacks calibrated estimates for comparing it with alternative execution platforms.

The profiling work adds pilot workloads for Trino, Presto, BigQuery, and DuckDB. Each pilot runs representative Wayang plans over several row counts, records execution and cardinality logs, and writes profiling artifacts that can be consumed by Wayang's existing profiler. The calibrated values are then translated back into platform default properties, such as `wayang.trino.*.load`, `wayang.bigquery.*.load`, or `wayang.duckdb.*.load`.

These defaults are only starting points. They capture one measured environment and give users a repeatable workflow for recalibrating the cost model on their own cluster, cloud region, connector, or storage system.

## Validation

Validation focused on end-to-end usability through Wayang rather than compilation alone.

The test coverage includes:

- Engine-only integration tests for Trino, Presto, BigQuery, and DuckDB, where only the target platform plugin is registered.
- JavaPlanBuilder tests that exercise user-facing plans such as table scan, filter, projection, aggregation, join, sort, and table sink.
- SQL pushdown checks that verify generated queries contain the expected `WHERE`, `JOIN`, `GROUP BY`, `ORDER BY`, and sink shapes.
- Parquet source, Parquet join, and multi-platform alternative tests from the clean Parquet branch.
- Setup guides and profiling smoke tests so the experiments can be repeated locally.

This matters because Wayang can combine multiple execution platforms in one plan. If a test accidentally allows another platform to handle part of the work, it may pass even though the intended SQL platform is incomplete.

## Work Product Summary

The main code contributions are listed below. The status reflects the public upstream state as of August 19, 2026.

| Area | Link | Status |
|---|---|---|
| Trino platform | [apache/wayang#772](https://github.com/apache/wayang/pull/772) | Merged |
| Presto platform | [apache/wayang#773](https://github.com/apache/wayang/pull/773) | Merged |
| BigQuery platform | [apache/wayang#774](https://github.com/apache/wayang/pull/774) | Merged |
| Trino cost profiling | [apache/wayang#787](https://github.com/apache/wayang/pull/787) | Merged |
| BigQuery cost profiling | [apache/wayang#788](https://github.com/apache/wayang/pull/788) | Merged |
| Presto cost profiling | [apache/wayang#789](https://github.com/apache/wayang/pull/789) | Merged |
| SQL Parquet source support | [apache/wayang#793](https://github.com/apache/wayang/pull/793) | Merged |
| DuckDB platform | [apache/wayang#794](https://github.com/apache/wayang/pull/794) | Merged |

## Lessons and Changes

The project evolved from a broad engine-integration plan into a more focused implementation around Trino, Presto, BigQuery, DuckDB, SQL Parquet support, and cost profiling. The main lessons were:

- **Shared abstractions matter**. Reusing the JDBC template kept the new platform modules small and made the implementations easier to compare and maintain.
- **SQL engines still need platform-specific handling**. Even with JDBC, each engine has different table naming rules, driver settings, SQL behavior, startup overhead, and file-access mechanisms.
- **Engine-only tests are necessary**. A Wayang plan can be valid while still relying on another platform for part of the work, so the tests need to prove that the intended SQL engine can execute the relevant plan segment.
- **Cost models need measurements**. Initial defaults are useful, but optimizer decisions should eventually be calibrated with profiling data from realistic deployments.
- **Depth was more valuable than breadth**. As the project evolved, the focus shifted from adding more engines to strengthening the existing integrations with tests, documentation, Parquet support, and profiling workflows.

## Future Work

Future work should focus on evaluating and extending these platforms in more realistic analytical environments:

- **Cloud and object-storage experiments**. Run controlled experiments across data sizes, data locations, and cost profiles to check whether Wayang's optimizer chooses the expected platform. For example, BigQuery may fit large cloud scans, DuckDB may fit local Parquet workloads, and Trino or Presto may fit federated SQL queries.
- **Connector-aware cost models**. Refine costs for engines such as Trino and Presto based on the underlying connector and storage system.
- **Broader SQL file-source support**. Extend the Parquet approach to more file formats or table formats used in datalake workloads.
- **More JDBC-template engines**. Use the shared structure to add additional analytical SQL engines with less duplicated code.
- **Hybrid execution plans**. Explore plans that combine SQL engines with Wayang's Java, Spark, or Flink platforms.
