---
id: features
title: Features
sidebar_position: 3
---

### Cross platform enablement
Apache Wayang's cross-platform optimizer stands out as its most distinguishing feature. It not only selects the most suitable processing engine for each task, but also empowers users to execute a single task across multiple platforms. This capability is achieved through an extensible set of graph transformations applied to the Apache Wayang plan, which identifies alternative execution plans that potentially offer better performance. These alternative plans are then evaluated using platform-specific cost models, which can either be user-defined or learned from historical data. These cost models are parameterized based on the underlying hardware configuration, such as the number of computing nodes for distributed operations.

### Scalable ML (ML4All)
ML4all is part of Wayang, enhancing machine learning workflows. ML4all alleviates users from the complexities of algorithm selection and low-level implementation details, enabling them to concentrate on the core aspects of their machine learning applications. By employing an innovative abstraction, ML4all addresses a broad spectrum of machine learning tasks and utilizes a cost-based optimizer to dynamically identify the optimal gradient descent algorithm for each scenario. Notably, ML4all demonstrates performance improvements of two orders of magnitude over existing systems, enabling the processing of large datasets that were previously impractical.

### High Efficiency
Apache Wayang's suite of optimized operators and sophisticated query optimization techniques enables it to effectively process large-scale and small-scale datasets. By employing a data processing abstraction based on UDFs, Wayang allows applications to convey semantic information about their functions, optimization hints (such as iteration counts), constraints (e.g., physical placement of operators), and alternative execution plans. The optimizer incorporates these insights to refine the execution plan, aiming to achieve optimal performance in a comprehensive manner.

### Flexibility
Apache Wayang offers a collection of operators that applications utilize to define their tasks. A crucial aspect of Apache Wayang is its flexible operator mapping structure, which enables developers to effortlessly add, modify, or remove mappings between Wayang and execution operators. This flexibility empowers developers to seamlessly integrate additional Wayang and execution operators into their applications.

### Cost Saving
Developers can focus on building their applications without the need to understand the complexities of underlying platforms. This simplifies the development process and removes the requirement for developers to be experts in big data infrastructures. Apache Wayang automatically determines the most suitable data processing platforms for specific tasks and deploys applications accordingly.

### Additonal Features
- Zero-copy: cross-platform in-situ data processing
- High performance: A highly-extensible API framework to generate DAG based federated execution plane at runtime to speed up data processing, providing 50-180x speed up by:
  - reduce data movement to single platforms.
  - reduce ETL overhead to perform large-scale analytics
  - reduce data duplication and storage
  - execute data processing on the best available technology, including local JVM stream processing
- Data application agnosticity
  - run data tasks on multiple platforms without re-platforming the code (move jobs from Hadoop to Spark without changinf the code et large)
  - implement a sustainable AI stratgy by using data pools in-situ
- Enterprise ready federated learning (in development)
<br /><br />

