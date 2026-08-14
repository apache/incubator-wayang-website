---
slug: gsoc-2026-wayang-jdbc-driver
title: Introducing JDBC Support for Apache Wayang
authors: [makarandhinge]
tags: [wayang, jdbc, gsoc]
---

# Introducing JDBC Support for Apache Wayang

As part of Google Summer of Code 2026, I worked on JDBC support for Apache Wayang, enabling Java applications to interact with Wayang through the standard JDBC API.

<div style={{textAlign: 'center'}}>
  <img width="90%" alt="Apache Wayang JDBC support project hero image" src="/img/blog/wayang-jdbc/hero-image.png" />
</div>

Apache Wayang provides a unified way to express and execute data processing workloads across different execution platforms. This project introduces a JDBC interface around Wayang's SQL API, separating the Java-facing JDBC API layer from the underlying Wayang execution system.

<!--truncate-->

## Why JDBC?

JDBC is the standard database interface for Java applications. It provides familiar concepts such as connections, statements, result sets, and metadata, which many Java developers already understand.

Before going further, it is useful to clarify the terminology used in this post. The **Wayang JDBC driver** refers to the complete implementation. It consists of a **client-side JDBC layer** that implements the Java-facing `java.sql` API, a **JDBC protocol** used for communication, and a **JDBC server** that receives requests and connects them to Apache Wayang.

Apache Wayang already provides a SQL API, but the missing piece was a standard JDBC interface for external applications. This project addresses that gap by making Wayang accessible through the JDBC API without requiring applications to depend directly on Wayang-specific APIs.

The impact goes beyond providing another way for Java applications to execute SQL. JDBC provides a bridge between Wayang's cross-platform data processing capabilities and the broader SQL ecosystem. By exposing Wayang through a standard database interface, applications and tools that already understand JDBC can potentially interact with Wayang without requiring Wayang-specific integrations.

This opens the door to integrating Wayang with external business intelligence and data analysis tools such as Tableau, Power BI, and other JDBC-compatible applications. Such integrations could allow users to work with familiar SQL and BI interfaces while benefiting from Wayang's ability to execute data processing workloads across different execution platforms.

The Wayang JDBC driver therefore acts as an integration boundary: applications interact through a standard database interface, while Wayang remains responsible for SQL processing, optimization, and execution across its supported platforms.

To make this possible, the project separates the client-side JDBC layer from the Wayang execution environment through a set of components that work together.

## Architecture

The Wayang JDBC driver is organized into separate components so that the JDBC-facing API, communication protocol, server-side request handling, and Wayang execution remain independently manageable.

<div style={{textAlign: 'center'}}>
  <img width="90%" alt="Layered architecture of the Apache Wayang JDBC driver implementation from Java application to Apache Wayang" src="/img/blog/wayang-jdbc/architecture.png" />
</div>

The flow starts with a Java application. The application uses the standard JDBC API to connect, submit SQL queries, and consume results.

The client-side JDBC layer provides the JDBC-facing objects used by the application, including the Java `Driver`, `Connection`, `Statement`, `ResultSet`, and database metadata objects. Its main responsibility is to translate JDBC operations into requests that can be understood by the server.

The Wayang JDBC protocol defines the communication between the client-side JDBC layer and the server. It covers requests, responses, errors, metadata, result data, and protocol versioning. This keeps the client-side layer and server connected through a defined boundary instead of requiring them to depend directly on each other's internal classes.

The Wayang JDBC server handles JDBC requests on the Wayang side. It manages client sessions, dispatches requests, validates queries, executes SQL, manages result cursors, provides metadata, and returns errors or results to the client-side JDBC layer.

Apache Wayang remains responsible for the actual SQL processing. The Wayang JDBC driver does not replace Wayang's SQL execution system; it provides a standard entry point into it. Once the server passes a query into Wayang's SQL API, Wayang handles planning, optimization, and execution.

The key communication boundary is between the client-side JDBC layer and the JDBC server:

```text
Client-side JDBC layer
     │
     │ TCP + length-prefixed JSON protocol
     ▼
JDBC Server
```

In short, the client-side JDBC layer speaks the Java `java.sql` API, the protocol carries the requests, the server manages the JDBC session and execution lifecycle, and Apache Wayang performs the actual SQL processing.

With these components in place, a JDBC query can travel from an application to Wayang and return results through the standard `ResultSet` interface. Let's follow that journey step by step.

## How a SQL Query Works

Consider a simple SQL query:

```sql
SELECT ID, NAME, CITY
FROM fs.people
ORDER BY ID;
```

This query travels through the Wayang JDBC driver in a few clear phases.

<div style={{textAlign: 'center'}}>
  <img width="90%" alt="SQL query journey through the client-side JDBC layer, protocol, server, Wayang execution, cursor store, and result fetching" src="/img/blog/wayang-jdbc/sql-journey.png" />
</div>

### Phase 1 — Submit the query

The Java application uses the standard JDBC API. When the application calls `Statement.executeQuery()`, the client-side JDBC layer receives the SQL query.

The driver converts that JDBC operation into an `EXECUTE_QUERY` request and sends it to the JDBC server.

### Phase 2 — Validate and execute

On the server side, the JDBC server identifies the client session and validates the SQL query against the read-only policy. This is important because the server is the boundary between the client-side JDBC layer and Wayang's execution system.

After validation, the server passes the SQL query to Wayang's SQL API through `SqlContext`. From there, Wayang handles planning, optimization, and execution on the selected execution platform.

### Phase 3 — Produce the result

After execution, the server obtains the query rows and column metadata. The rows are associated with a server-side cursor so they can be consumed incrementally instead of requiring the client to handle the entire result at once.

The `CursorStore` keeps track of this server-side result state for the session.

### Phase 4 — Consume results

The server returns the first result page to the client-side JDBC layer. The Java application consumes rows through the standard `ResultSet.next()` method.

When the current page is exhausted and more rows are available, the client-side JDBC layer sends a `FETCH` request. The server reads the next page from the `CursorStore` and returns it to the client-side JDBC layer. This continues until the result set is exhausted.

The important distinction is that query execution and result fetching are separate:

```text
EXECUTE_QUERY
      ↓
Execute SQL
      ↓
Create result/cursor
      ↓
Return first page
```

```text
ResultSet.next()
      ↓
Need more rows?
      ↓
FETCH
      ↓
CursorStore
      ↓
Next page
```

Each `ResultSet.next()` does not execute the SQL query again. The query is executed once, and later fetches retrieve additional pages from the server-side cursor.

> The JDBC application only sees the standard JDBC interface. The driver, protocol, and server handle the communication and lifecycle details, while Apache Wayang remains responsible for SQL processing and execution.

## Key Design Decisions

This section explains why the Wayang JDBC driver is structured this way, not just what the code does.

### 1. Client–server separation

**Problem:** Should the client-side JDBC layer contain the Wayang runtime, or should query execution happen separately?

**Decision:** The Wayang JDBC driver separates the client-side JDBC layer from the server-side Wayang execution environment.

```text
Java Application
       ↓
JDBC Driver
       ↓
JDBC Server
       ↓
Apache Wayang
```

**Why:** This keeps the client-side JDBC layer separate from the Wayang runtime, provides a clear boundary between JDBC and Wayang, and allows the server to manage execution and resources.

**Trade-off:** This separation introduces network communication and server-side lifecycle management.

### 2. A dedicated driver–server protocol

**Problem:** The client-side JDBC layer and JDBC server need to exchange requests, responses, errors, metadata, and result data without relying on each other's internal Java objects.

**Decision:** The client-side JDBC layer and JDBC server communicate through a defined TCP protocol using length-prefixed JSON messages.

```text
JDBC Driver
     │
     │ TCP
     │
     │ Length-prefixed JSON
     ▼
JDBC Server
```

**Why:** The protocol gives both sides a clear communication contract and makes the boundary between the client-side JDBC layer and the server implementation explicit.

**Trade-off:** The protocol must be maintained as part of the project, including versioning, error representation, and message compatibility.

### 3. Server-side read-only validation

**Problem:** The project scope is read-only SQL execution, and that policy needs to be enforced at the correct boundary.

**Decision:** The server validates incoming SQL against the read-only policy before sending it to Wayang.

```text
SQL Query
    ↓
JDBC Server
    ↓
Read-only validation
   ↙        ↘
Allowed    Rejected
   ↓
Wayang
```

**Why:** The server is the execution boundary, so it should enforce the policy rather than relying only on the client.

**Trade-off:** The server needs validation logic before query execution can begin.

### 4. Cursor-based result paging

**Problem:** A query may return many rows, and returning the entire result set in a single response is not a good fit for the client/server protocol.

**Decision:** The server uses a logical cursor and returns results in pages.

```text
Execute Query
     ↓
Results
     ↓
CursorStore
     ↓
Page 1
     ↓
FETCH
     ↓
Page 2
     ↓
FETCH
     ↓
Page 3
```

**Why:** Paging allows the JDBC `ResultSet` to consume results incrementally instead of requiring one large response.

**Trade-off:** The server must maintain cursor state and clean it up correctly.

### 5. Hierarchical resource ownership

**Problem:** JDBC objects have dependent lifecycles, and the server has corresponding resources that must not leak.

**Decision:** Resource ownership follows the JDBC object hierarchy.

```text
Connection
    ↓
Statement
    ↓
ResultSet
    ↓
Server Cursor
```

When a connection closes, its statements, result sets, and associated server resources are cleaned up. When a statement closes or replaces its result set, the result-set and cursor resources are released. When a result set closes, its server-side cursor is released. If a client disconnects, the server cleans up the session and the resources belonging to that client.

**Why:** This makes lifecycle behavior predictable and helps prevent leaked server-side cursors or stale session resources.

**Trade-off:** The implementation needs explicit ownership tracking on both the client side and the server side.

Together, these decisions keep the system understandable: the client-side JDBC layer presents the standard JDBC API, the protocol defines communication, the server owns execution policy and lifecycle, and Wayang performs the SQL processing.

## What Was Implemented

This section summarizes the concrete functionality delivered during the project.

### Client-side JDBC layer

The client-side JDBC module implements the Java-facing layer that applications use directly.

**Connection**

- JDBC `Driver` registration
- Connection establishment
- JDBC URL handling
- Connection lifecycle

**Statement**

- Statement creation
- SQL query submission
- Query execution
- Statement lifecycle

**ResultSet**

- Result navigation
- Typed value access
- `wasNull()`
- Result paging
- ResultSet lifecycle

**Metadata**

- `ResultSetMetaData`
- `DatabaseMetaData`
- Catalog information
- Schema information
- Table information
- Column information
- JDBC type information

### JDBC protocol

The protocol module defines the contract between the client-side JDBC layer and the JDBC server.

Implemented protocol functionality includes:

- Request and response messages
- Protocol versioning
- Query execution requests
- Fetch requests
- Metadata requests
- Error responses
- Result data transfer
- Length-prefixed JSON framing

The important point is that the protocol is the boundary between the client-side JDBC layer and the server-side implementation.

### JDBC server

The server-side module receives JDBC protocol requests and turns them into Wayang operations.

Implemented server functionality includes:

- Client session management
- Request dispatching
- SQL query execution
- Read-only SQL validation
- Result and cursor management
- Result paging
- Metadata retrieval
- Error handling
- Resource cleanup

This is the part of the system where a JDBC request becomes an actual Wayang SQL operation.

### Wayang SQL integration

The JDBC server connects to Wayang's existing SQL functionality instead of replacing it.

```text
JDBC Request
     ↓
JDBC Server
     ↓
Wayang SQL API
     ↓
Query Processing
     ↓
Results
```

The integration allows SQL submitted through JDBC to be passed into Wayang's SQL API, processed by Wayang, and returned through the JDBC result-handling path. The exact upstream files and classes changed for this integration should be listed with the final PRs and commits after final upstream verification.

### Repository map

The implementation is organized around the same major areas described above:

```text
wayang-jdbc/
│
├── wayang-jdbc-driver/
│   └── Client-side JDBC layer
│
├── wayang-jdbc-protocol/
│   └── Client-side layer ↔ server communication
│
├── wayang-jdbc-server/
│   └── JDBC server implementation
```

If you want to understand the Java-facing part, start with the client-side JDBC layer. If you want to understand communication, start with the protocol. If you want to understand execution, start with the server.

With the core JDBC functionality implemented, the next question is how well it behaves in practice. The implementation was validated through automated tests and end-to-end execution.

## Testing & Validation

The Wayang JDBC driver was validated across the client-side layer, protocol, server, and Wayang integration layers. Testing focused on JDBC behavior, request and response handling, query execution, result and metadata processing, error handling, and resource lifecycle to ensure that the complete flow works consistently from the application to Wayang and back.

## Demo / How to Run

The JDBC module includes a small local demo for exploring CSV-backed datasets. The demo lists available CSV files, shows their SQL-style table names, lets the user select a dataset, and then runs simple analysis operations on the selected file.

This demo is intentionally beginner-friendly. It helps show how external data can be represented as logical SQL-style tables, while keeping the data itself in ordinary CSV files.

### Prerequisites

- Java 17 JDK
- Git
- Bash
- Internet access for Maven dependencies

Verify the required tools:

```text
java -version
javac -version
git --version
```

The demo requires a JDK because the client is compiled with `javac`.

### 1. Get the code

```text
git clone https://github.com/apache/wayang.git
cd wayang
chmod +x mvnw
```

### 2. Start the JDBC server

In Terminal 1, run:

```text
bash wayang-jdbc/demo/start-demo-server.sh
```

The script builds the JDBC server and its dependencies, creates the demo configuration, exposes the CSV files in `wayang-jdbc/demo/data` through the SQL schema `fs`, and starts the server on `127.0.0.1:9999`.

Leave this terminal running.

### 3. Run the JDBC CSV selection demo

In Terminal 2, run:

```text
bash wayang-jdbc/demo/run-demo-client.sh
```

The script builds the client-side JDBC layer, compiles `CsvSelectionOperationsDemo.java`, connects to `jdbc:wayang://127.0.0.1:9999/demo`, discovers available CSV files from `wayang-jdbc/demo/data`, maps each CSV file to a SQL-style table name under the `fs` schema, and lets the user select a CSV file by number or name.

For example, the demo can show files such as:

```text
ecommerce_sales_analytics.csv     -> fs.ecommerce_sales_analytics
heart_disease_risk_2026.csv       -> fs.heart_disease_risk_2026
people.csv                        -> fs.people
student_performance_dataset.csv   -> fs.student_performance_dataset
```

Selecting `heart_disease_risk` uses the logical table `fs.heart_disease_risk_2026` and executes SQL queries through the client-side JDBC layer and JDBC server, for example:

```sql
SELECT COUNT(*) AS total_rows FROM fs.heart_disease_risk_2026;
SELECT * FROM fs.heart_disease_risk_2026 LIMIT 5;
```

The result is read from a JDBC `ResultSet` and printed by the demo client.

### 4. What the demo shows

This demo demonstrates that Wayang is not a database and does not store the data itself. The CSV files remain in the data folder, while the JDBC server exposes them through the configured SQL model as logical SQL-style tables such as `fs.heart_disease_risk_2026`.

The important path is:

```text
Java demo client → client-side JDBC layer → JDBC protocol → JDBC server → Wayang SQL API → CSV-backed result
```

### 5. Important demo files

```text
wayang-jdbc/demo/
├── start-demo-server.sh
├── run-demo-client.sh
├── CsvSelectionOperationsDemo.java
└── data/
    ├── ecommerce_sales_analytics.csv
    ├── heart_disease_risk_2026.csv
    ├── people.csv
    └── student_performance_dataset.csv
```

- `start-demo-server.sh` starts the local Wayang JDBC server.
- `run-demo-client.sh` builds the client-side JDBC layer, compiles the demo, and runs it.
- `CsvSelectionOperationsDemo.java` contains the JDBC demo logic.
- `data/` contains the CSV datasets that are exposed as logical `fs.<table>` names.

### 6. Common problems

| Problem                                | Check                                      |
| -------------------------------------- | ------------------------------------------ |
| `Connection refused`                   | Start the JDBC server in Terminal 1        |
| `Address already in use`               | Port 9999 is already occupied              |
| `Unsupported class file major version` | Use Java 17                                |
| `javac: command not found`             | Install a JDK, not only a JRE              |
| No CSV files are listed                | Check `wayang-jdbc/demo/data`              |
| File selection fails                   | Select by the shown number or table prefix |

Press `Ctrl+C` in Terminal 1 to stop the server.

## Challenges & Lessons Learned

One of the main challenges was that implementing JDBC is not only about exposing methods from the `java.sql` interfaces. JDBC objects have relationships and lifecycle rules:

```text
Connection → Statement → ResultSet → Server Cursor
```

Keeping these resources consistent across both the client and server required careful lifecycle handling. Closing a result set, replacing a statement result, closing a connection, or losing a client session all need to release the correct server-side resources.

Another challenge was designing the client-server protocol. JDBC operations had to be represented as request and response messages, with support for framing, errors, metadata, result data, and protocol versioning. A clear communication contract became essential because the client-side JDBC API layer and the Wayang execution environment run on different sides of the system.

Result handling also required more than simply returning rows. The implementation needed to coordinate the full path:

```text
Query execution → result materialization → cursor → pages → ResultSet
```

This required thinking about JDBC behavior on the client side and state management on the server side at the same time.

Integrating JDBC with Wayang was another important part of the work. The goal was not to duplicate Wayang's SQL processing, optimizer, or execution responsibilities. The Wayang JDBC driver had to adapt to Wayang's existing SQL API and provide a standard interface around it.

Working on this as part of an Apache project also meant learning how to work inside an existing open-source codebase. I had to understand the project structure, discuss design choices, respond to feedback, write documentation, and think about how future contributors would understand and maintain the implementation.

The main lessons I took from this project are:

- Designing an API means understanding its lifecycle and behavioral contracts, not just implementing interfaces.
- Client-server systems require careful handling of state, errors, and resource ownership.
- Integrating with an existing open-source project requires adapting to its architecture rather than building in isolation.
- Documentation and a reproducible demo are part of making an implementation genuinely useful.

## Current State & Remaining Work

The Wayang JDBC driver now provides the core infrastructure required for applications to connect to Apache Wayang through JDBC, submit SQL queries, receive results, and access metadata.

### Current state

Completed:

- Client-side JDBC layer and connection handling
- Statement and ResultSet support
- JDBC metadata
- Driver–server protocol
- JDBC server
- SQL execution through Wayang
- Result paging and cursor management
- Error and resource handling
- Demo and documentation

### What's left

**Future improvements**

- Additional JDBC features
- Streaming large result sets
- Query cancellation
- Authentication and TLS
- Broader JDBC-tool compatibility testing
- Performance improvements
- Packaging and distribution improvements

## Project Resources

<div style={{display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))'}}>
  <div style={{border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1rem'}}>
    <h3>Source Code</h3>
    <p>The complete Wayang JDBC driver implementation and related project changes.</p>
    <p style={{color: '#f29007', fontWeight: 600}}>Coming soon →</p>
  </div>
  <div style={{border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1rem'}}>
    <h3>Pull Request</h3>
    <p>The upstream contribution containing the Wayang JDBC driver implementation.</p>
    <p><a style={{color: '#f29007', fontWeight: 600}} href="https://github.com/apache/wayang/pull/792">View pull request →</a></p>
  </div>
</div>

Before the final GSoC submission, the source code placeholder should be replaced with the stable source code URL.

## Conclusion

The project introduced a JDBC interface for Apache Wayang, allowing Java applications to interact with Wayang through a familiar standard API. The implementation connects the client-side JDBC layer with Wayang's SQL API through a dedicated protocol and server, while handling query execution, results, metadata, and resource lifecycle.

This provides a foundation for making Apache Wayang easier to integrate with Java applications and future JDBC-compatible tooling.

The current implementation provides a foundation that can be extended by the Apache Wayang community as the JDBC integration evolves.

## Acknowledgements

I would like to thank Google Summer of Code and the 2026 GSoC team for providing the opportunity to contribute to open source.

I am grateful to the Apache Wayang community for the support and welcoming open-source environment throughout the project.

Special thanks to Zoi Kaoudi, Apache Wayang Organization Administrator, for her guidance and support during the program, and to Kaustubh Beedkar, my mentor, for his continuous technical guidance, feedback, code reviews, and discussions throughout the project.

I am grateful to everyone in the Apache Wayang community who contributed through discussions, reviews, and feedback during the development of the Wayang JDBC driver.
