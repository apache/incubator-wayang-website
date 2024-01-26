---
id: benchmark
title: Benchmarking Wayang
sidebar_position: 2
---

Wayang is a powerful cross-platform middleware that can utilize and seamlessly integrate various execution platforms, including Postgres, Spark, Flink, Java Streams, and Python. In benchmarking, we found that Wayang demonstrated exceptional performance across multiple use cases, including a popular machine learning algorithm, a core big data benchmark task, and a relational query. 

Apache Wayang has the goal of providing a platform to enable data-agnostic applications and decentralized data processing, the fundamentals of federated learning.

### Running a Relational Query Across Multiple Independent Databases (Federation)

In this use case, we showcase how Apache Wayang addresses the common challenge of analyzing data scattered across diverse systems, a prevalent issue in many data-driven projects. Through Wayang, developers can seamlessly perform analytics on relational data residing in multiple systems. The in-situ data processing approach employed by Wayang introduces data privacy-preserving mechanisms into distributed data analytics tasks.

__Datasets__: To test the capabilities of Wayang, we utilized the [TPC-H benchmark](https://www.tpc.org/tpch/default5.asp), which comprises five datasets/relations. The lineitem and orders relations are stored in HDFS, while customer, supplier, and region are in Postgres, and nation is in S3 or the local file system. Our testing covered a range of dataset sizes, from 1GB to 100GB, to ensure our product's scalability and robustness.

__Query/task__: We evaluate the performance of the complex SQL TPC-H query 5:

``` sql
SELECT N_NAME, SUM(L_EXTENDEDPRICE*(1-L_DISCOUNT)) AS REVENUE
FROM CUSTOMER, ORDERS, LINEITEM, SUPPLIER, NATION, REGION
WHERE C_CUSTKEY = O_CUSTKEY AND L_ORDERKEY = O_ORDERKEY AND L_SUPPKEY = S_SUPPKEY
AND C_NATIONKEY = S_NATIONKEY AND S_NATIONKEY = N_NATIONKEY AND N_REGIONKEY = R_REGIONKEY
AND R_NAME = 'ASIA' AND O_ORDERDATE >= '1994-01-01'
AND O_ORDERDATE < DATEADD(YY, 1, cast('1994-01-01' as date))
GROUP BY N_NAME
ORDER BY REVENUE DESC

```
__Baselines__: We compared Wayang with two widely-used systems for storing and querying relational data: Spark and Postgres. To conduct a fair comparison, we first moved all datasets to the system being tested (Spark or Postgres).

__Results__: The results of our tests, presented in Figure 1, show the execution time in seconds of the SQL query 5. Note that the time required to transfer data to Spark or Postgres was excluded from the results. As seen in Figure 1, Wayang significantly outperformed Postgres while retaining a runtime very close to Spark. It's important to note that for Spark to function, we needed twice the time to extract datasets from Postgres and transfer them to Spark. 
Wayang achieved such impressive performance by seamlessly combining Postgres with Spark: Wayang's query optimizer chose to perform all selections and projections on the data stored in Postgres before extracting data to join with the relations in HDFS. Additionally, the optimizer determined that executing the join between lineitem and supplier in Spark would be beneficial, as it could distribute the computational load of joining to multiple workers. All of this was done without the need for the user to specify where each operation should be executed.
<br />
<img width="75%" alt="" src="/img/benchmarks/disperse_data.png" />

### Reducing Execution Costs for Machine Learning Tasks Using Multiple Systems

To evaluate Apache Wayang's ability to accelerate machine learning tasks while optimizing costs by leveraging multiple systems, we conducted a comprehensive benchmark. The benchmark involved storing all data within a single repository, a scenario where selectively offloading data to more powerful engines can significantly enhance performance. To assess this feature, we employed a widely used machine learning algorithm, stochastic gradient descent, to perform classification tasks.<br />

__Datasets__: We use two real-world datasets that we downloaded from the UCI machine learning repository, namely higgs and rcv1. higgs consists of ~11 million data points with 28 features each and rcv1 contains ~677 thousand data points with ~47 thousand features each. In addition, we construct a synthetic dataset so that we can stress our product with even larger datasets, specifically with 88 million data points of 100 features each.  

__Query/task__: We test the performance of training classification models for higgs and the synthetic dataset and a regression model rcv1. All three training models use stochastic gradient descent but with a different loss function. We use Hinge loss to simulate support vector machines for the classification tasks and the logistic loss for the regression task.

__Baselines__: We compare Wayang against MLlib from Apache Spark and SystemML from IBM, two very popular machine learning libraries. 

__Results__: Our results, shown in Figure 2, demonstrate that Wayang outperforms both baselines by more than an order of magnitude in runtime performance for large datasets.
<br />
<img width="75%" alt="" src="/img/benchmarks/bench2.png" />

Apache Wayang's intelligent optimizer dynamically utilizes a hybrid approach, seamlessly blending Spark and local Java execution, to significantly improve the performance of the stochastic gradient descent algorithm. This optimization strategy involves leveraging Spark for efficient preprocessing and data preparation, while transitioning to local Java execution for the subsequent gradient computation phase. During this phase, the dataset shrinks considerably, making it more efficient to process using a single machine. This optimization technique, while not readily apparent without specialized expertise, is seamlessly implemented by Apache Wayang, requiring no additional user intervention.

### Optimizing Big Data Analytics by Adapting Platforms to Data and Task Characteristics 

We demonstrate the platform adaptation capabilities of Apache Wayang, showcasing how it optimizes analytical tasks by tailoring execution to the specific data and task characteristics. Our approach involves dynamically selecting the optimal processing engine based on the nature of the data and the complexity of the analytical operation. This flexibility allows Wayang to deliver enhanced performance and efficiency, particularly for complex analytical workflows that demand the strengths of multiple processing engines.

__Datasets__: We use Wikipedia abstracts and store them in HDFS. We vary the dataset size from 1GB to 800GB.

__Query/task__: We test our product with a widely popular big data analytical task, namely WordCount. It counts the number of distinct words in a text corpus. Different variations of wordcount are useful in various text mining applications, such as term frequency, word clouds, etc.

__Baselines__: We use three different platforms where Wordcount can be executed: Apache Spark, Apache Flink, and a single node Java program. We then set Wayang to be able to automatically choose which of the three platforms to use for each dataset.

__Results__: The benchmark results, presented in Figure 3, provide evidence of Apache Wayang's platform adaptation prowess, consistently selecting the fastest available platform for various dataset sizes in our WordCount example. By incorporating execution cost modeling into the query optimizer, Wayang eliminates the need for manual platform selection or migration, allowing users to solely focus on their analytical tasks. Our platform adaptation feature seamlessly identifies the optimal platform for each query or task based on data and query characteristics, ensuring faster execution and enhanced efficiency in big data analytics.
<br />
<img width="75%" alt="" src="/img/benchmarks/bench3.png" />
<br /><br />