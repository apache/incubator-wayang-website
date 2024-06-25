---
slug: wayang-vs-trino
title: Apache Wayang vs. Presto/Trino 
authors: [zkaoudi]
tags: [wayang, presto, trino]
---

# Apache Wayang vs. Presto/Trino 

We have been asked several times about the difference between Apache Wayang and Presto/Trino. In this blog post, we will clarify the main differences and how they impact various applications and use cases.

<!--truncate-->
## Key Distinctions

Trino/Presto is a **query engine** for **distributed SQL query processing**. It is composed of a coordinator and multiple workers. The coordinator consists of a query optimizer and a scheduler, while the workers are responsible for performing the necessary query processing. Data is fetched from external systems via a Connector API, i.e., Trino/Presto supports [multiple data sources](https://trino.io/ecosystem/data-source). Notably,query processing is is conducted exclusively by Trino/Presto workers, not the external systems.


In contrast, Wayang is a **middleware** for **integrating diverse data platforms**, including but not limited to query engines. This means that Wayang leverages the processing capabilities of the underlying data platforms to complete a given job, with no actual query processing taking place within Wayang itself.

Below you can graphically see the difference between the two systems. Note that not all available data sources or data platforms are illustrated for simplicity reasons.

Below you can see how Wayang integrates data platforms and utilizes them for any data processing required.
<br/>
<img width="90%" alt="Wayang" src="/img/blog/wayang-architecture.png" title="Wayang" />  
<br/>
<br/>

Below you can see how Trino unifies different data sources and then performs data processing in a distributed manner.
<br/>
<img width="90%" alt="Trino" src="/img/blog/trino-architecture.png" title="Trino"/>  
<br/>


I hope this makes it clear now. <br/>
In fact, Trino can be easily plugged to Wayang as a platform and be seamlessly integrated with other data platforms, as shown below.

<img width="75%" alt="Trino" src="/img/blog/wayang-with-trino.png" />  

## What are the advantages of using Wayang?

Wayang brings several benefits thanks to its integration layer:

* Seamless integration of SQL query engines with ML and other data analysis systems within a single job, eliminating the need to materialize intermediate results.


* Users are freed from the task of specifying the query engines for an application if they desire. By submitting their Wayang job, the cross-platform optimizer can automatically determine the best data platform to use for improved performance or cost savings.


* Wayang facilitates cross-platform data processing by utilizing multiple data platforms to execute a query for a single job, optimizing performance and cost efficiency.

* Data does not have to be transferred outside their original location.

## Conclusion

Trino is a distributed SQL query engine which performs all the query processing of an input SQL query in a distributed manner. Wayang, on the other hand, is a data platform integrator which can automatically determine which data platform(s) is best suited for an application.


Author: [zkaoudi](https://github.com/zkaoudi)
