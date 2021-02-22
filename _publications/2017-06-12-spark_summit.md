---
layout: publication
title: Publication
subtitle: >
   Interoperating a Zoo of Data Processing Platforms Using Rheem
link-name: Talk at Spark Summit 2017
img-thumb: assets/img/screenshot/sparksummit.png
authors: Yasser Idris and Sebastian Kruse
year: 2017
month: 06
day: 12
link-paper: https://databricks.com/session/interoperating-a-zoo-of-data-processing-platforms-using-rheem
link-external: True 
---

We are witnessing a proliferation of big data, which has lead to a zoo of data processing systems. Each system providing a different set of features. For example, Spark provides scalability to analytic tasks, but Java 8 Streams provides low-latency. Furthermore, complex applications, such as ETL and ML, are now requiring a mixture of platforms to perform tasks efficiently. In such complex data analytics pipelines, the use of multiple data processing system is not only for performance reasons, but also because of data diversity. Datasets often natively reside on different data formats and storage engines. Unfortunately, developers are left alone in the challenging tasks of: (1) choosing the right platform for their applications; and (2) performing tedious and costly data migration and integration tasks to obtain the results.

In this talk, we will present Rheem, an open source scalable cross-platform system that frees developers from these burdens. Rheem provides an abstraction layer on top of Spark (and other processing platforms) with the aim of enabling cross-platform optimization and interoperability. It automatically selects the best data processing platforms for a given task and also handles the cross-platform execution. In particular, we will discuss how Rheem allows Spark to work in tandem with other platforms in order to achieve higher performance. We will also show how easy a developer can write complex applications on top of Rheem to seamlessly use multiple different data processing platforms according to their tasks at hand. Using Rheem developers do not have to worry about the integration or data migration between Spark and other platforms.
