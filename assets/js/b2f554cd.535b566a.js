"use strict";(self.webpackChunkwayang_website=self.webpackChunkwayang_website||[]).push([[1477],{10:a=>{a.exports=JSON.parse('{"blogPosts":[{"id":"Apache Kafka meets Apache Wayang","metadata":{"permalink":"/blog/Apache Kafka meets Apache Wayang","source":"@site/blog/2024-03-06-kafka-meets-wayang-1.md","title":"Apache Kafka meets Apache Wayang - Part 1","description":"Intro","date":"2024-03-06T00:00:00.000Z","formattedDate":"March 6, 2024","tags":[{"label":"wayang","permalink":"/blog/tags/wayang"},{"label":"kafka","permalink":"/blog/tags/kafka"},{"label":"cross organization data collaboration","permalink":"/blog/tags/cross-organization-data-collaboration"}],"readingTime":3.925,"hasTruncateMarker":false,"authors":[{"name":"Mirko K\xe4mpf","title":"Apache Commiter","url":"https://github.com/kamir","imageURL":"https://avatars.githubusercontent.com/u/1241122?v=4","key":"kamir"}],"frontMatter":{"slug":"Apache Kafka meets Apache Wayang","title":"Apache Kafka meets Apache Wayang - Part 1","authors":"kamir","tags":["wayang","kafka","cross organization data collaboration"]},"unlisted":false,"nextItem":{"title":"Apache Kafka meets Apache Wayang - Part 2","permalink":"/blog/Apache Kafka meets Apache Wayang"}},"content":"## Intro\\n\\nThis article is the first of a four part series about federated data analysis using Apache Wayang.\\nThe first article starts with an introduction of a typical data colaboration scenario which will emerge in our digital future.\\n\\nIn part two and three we will share a summary of our Apache Kafka client implementation for Apache Wayang.\\nWe started with the Java Platform (part 2) and the Apache Spark implementation follows (W.I.P.) in part three.\\n\\nThe use case behind this work is an imaginary data collaboration scenario.\\nWe see this example and the demand for a solution already in many places.  \\nFor us this is motivation enough to propose a solution.\\nThis would also allow us to do more local data processing, and businesses can stop moving data around the world, but rather care about data locality while they expose and share specific information to others by using data federation.\\nThis reduces complexity of data management and cost dramatically.\\n\\nFor this purpose, we illustrate a cross organizational data sharing scenario from the finance sector soon.\\nThis analysis pattern will also be relevant in the context of data analysis along supply chains, another typical example where data from many stakeholder together is needed but never managed in one place, for good reasons.\\n\\nData federation can help us to unlock the hidden value of all those isolated data lakes.\\n\\n\\n## A cross organizational data sharing scenario\\nOur goal is the implementation of a cross organization decentralized data processing scenario, in which protected local data should be processed in combination with public data from public sources in a collaborative manner. \\nInstead of copying all data into a central data lake or a central data platform we decided to use federated analytics. \\nApache Wayang is the tool we work with. \\nIn our case, the public data is hosted on publicly available websites or data pods. \\nA client can use the HTTP(S) protocol to read the data which is given in a well defined format. \\nFor simplicity we decided to use CSV format. \\nWhen we look into the data of each participant we have a different perspective.\\n\\nOur processing procedure should calculate a particular metric on the _local data_ of each participant. \\nAn example of such a metric is the average spending of all users on a particular product category per month. \\nThis can vary from partner to partner, hence, we want to be able to calculate a peer-group comparison so that each partner can see its own metric compared with a global average calculated from contributions by all partners. \\nSuch a process requires global averaging and local averaging. \\nAnd due to governance constraints, we can\u2019t bring all raw data together in one place.\\n\\nInstead, we want to use Apache Wayang for this purpose. \\nWe simplify the procedure and split it into two phases. \\nPhase one is the process, which allows each participant to calculate the local metrics. \\nThis requires only local data. The second phase requires data from all collaborating partners. \\nThe monthly sum and counter values per partner and category are needed in one place by all other parties. \\nHence, the algorithm of the first phase stores the local results locally, and the contributions to the global results in an externally accessible Kafka topic. \\nWe assume this is done by each of the partners. \\n\\nNow we have a scenario, in which an Apache Wayang process must be able to read data from multiple Apache Kafka topics from multiple Apache Kafka clusters but finally writes into a single Kafka topic, which then can be accessed by all the participating clients.\\n\\n![images/image-1.png](images/image-1.png)\\n\\nThe illustration shows the data flows in such a scenario. \\nJobs with red border are executed by the participants in isolation within their own data processing environments. \\nBut they share some of the data, using publicly accessible Kafka topics, marked by A. Job 4 is the Apache Wayang job in our focus: here we intent to read data from 3 different source systems, and write results into a fourth system (marked as B), which can be accesses by all participants again.\\n\\nWith this in mind we want to implement an Apache Wayang application which implements the illustrated *Job 4*. \\nSince as of today, there is now _KafkaSource_ and _KafkaSink_ available in Apache Wayang, an implementation of both will be our first step. \\nOur assumption is, that in the beginning, there won\u2019t be much data. \\n\\nApache Spark is not required to cope with the load, but we expect, that in the future, a single Java application would not be able to handle our workload. \\nHence, we want to utilize the Apache Wayang abstraction over multiple processing platforms, starting with Java. \\nLater, we want to switch to Apache Spark."},{"id":"Apache Kafka meets Apache Wayang","metadata":{"permalink":"/blog/Apache Kafka meets Apache Wayang","source":"@site/blog/2024-03-06-kafka-meets-wayang-2.md","title":"Apache Kafka meets Apache Wayang - Part 2","description":"In the second part of the article series we describe the implementation of the Kafka Source and Kafka Sink component for Apache Wayang.","date":"2024-03-06T00:00:00.000Z","formattedDate":"March 6, 2024","tags":[{"label":"wayang","permalink":"/blog/tags/wayang"},{"label":"kafka","permalink":"/blog/tags/kafka"},{"label":"cross organization data collaboration","permalink":"/blog/tags/cross-organization-data-collaboration"}],"readingTime":5.095,"hasTruncateMarker":false,"authors":[{"name":"Mirko K\xe4mpf","title":"Apache Commiter","url":"https://github.com/kamir","imageURL":"https://avatars.githubusercontent.com/u/1241122?v=4","key":"kamir"}],"frontMatter":{"slug":"Apache Kafka meets Apache Wayang","title":"Apache Kafka meets Apache Wayang - Part 2","authors":"kamir","tags":["wayang","kafka","cross organization data collaboration"]},"unlisted":false,"prevItem":{"title":"Apache Kafka meets Apache Wayang - Part 1","permalink":"/blog/Apache Kafka meets Apache Wayang"},"nextItem":{"title":"Website updated","permalink":"/blog/website_update"}},"content":"In the second part of the article series we describe the implementation of the Kafka Source and Kafka Sink component for Apache Wayang.\\nWe look into the \u201cRead- and Write-Path\u201d for our data items, called _DataQuanta_.\\n\\n## Apache Wayang\u2019s Read & Write Path for Kafka topics\\n\\nTo describe the read and write paths for data in the context of the created Apache Wayang code snippet, the primary classes and interfaces we need to understand are as follows:\\n\\n**WayangContext:** This class is essential for initializing the Wayang processing environment. \\nIt allows you to configure the execution environment and register plugins that define which platforms Wayang can use for data processing tasks, such as _Java.basicPlugin()_ for local Java execution.\\n\\n**JavaPlanBuilder:** This class is used to build and define the data processing pipeline (or plan) in Wayang. \\nIt provides a fluent API to specify the operations to be performed on the data, from reading the input to processing it and writing the output.\\n\\n### Read Path\\nThe read path describes how data is ingested from a source into the Wayang processing pipeline:\\n\\n_Reading from Kafka Topic:_ The method _readKafkaTopic(topicName)_ is used to ingest data from a specified Kafka topic. \\nThis is the starting point of the data processing pipeline, where topicName represents the name of the Kafka topic from which data is read.\\n\\n_Data Tokenization and Preparation:_ Once the data is read from Kafka, it undergoes several transformations such as Splitting, Filtering, and Mapping. \\nWhat follows are the procedures known as Reducing, Grouping, Co-Grouping, and Counting.\\n\\n### Write Path\\n_Writing to Kafka Topic:_ The final step in the pipeline involves writing the processed data back to a Kafka topic using _.writeKafkaTopic(...)_. \\nThis method takes parameters that specify the target Kafka topic, a serialization function to format the data as strings, and additional configuration for load profile estimation, which optimizes the writing process.\\n\\nThis read-write path provides a comprehensive flow of data from ingestion from Kafka, through various processing steps, and finally back to Kafka, showcasing a full cycle of data processing within Apache Wayang\'s abstracted environment and is implemented in our example program shown in *listing 1*.\\n\\n## Implementation of Input- and Output Operators\\nThe next section shows how a new pair of operators can be implemented to extend Apache Wayang\u2019s capabilities on the input and output side. \\nWe created the Kafka Source and Kafka Sink components so that our cross organizational data collaboration scenario can be implemented using data streaming infrastructure.\\n\\n**Level 1 \u2013 Wayang execution plan with abstract operators**\\n\\nThe implementation of our Kafka Source and Kafka Sink components for Apache Wayang requires new methods and classes on three layers. \\nFirst of all in the API package. \\nHere we use the JavaPlanBuilder to expose the function for selecting a Kafka topic as the source to be used by client.  \\nThe class _JavaPlanBuilder_ in package _org.apache.wayang.api_ in the project *wayang-api/wayang-api-scala-java* exposes our new functionality to our external client.\\nAn instance of the JavaPlanBuilder is used to define the data processing pipeline. \\nWe use its _readKafkaTopic()_ which specifies the source Kafka topic to read from, and for the write path we use the _writeKafkaTopic()_ method. \\nBoth Methods do only trigger activities in the background.\\n\\nFor the output side, we use the _DataQuantaBuilder_ class, which offers an implementation of the writeKafkaTopic function. \\nThis function is designed to send processed data, referred to as DataQuanta, to a specified Kafka topic. \\nEssentially, it marks the final step in a data processing sequence constructed using the Apache Wayang framework.\\n\\nIn the DataQuanta class we implemented the methods writeKafkaTopic and writeKafkaTopicJava which use the KafkaTopicSink class. \\nIn this API layer we use the Scala programming language, but we utilize the Java classes, implemented in the layer below.\\n\\n**Level 2 \u2013 Wiring between Platform Abstraction and Implementation**\\n\\nThe second layer builds the bridge between the WayangContext and PlanBuilders which work together with DataQuanta and the DataQuantaBuilder.\\n\\nAlso, the mapping between the abstract components and the specific implementations are defined in this layer.\\n\\nTherefore, the mappings package has a class _Mappings_ in which all relevant input and output operators are listed. \\nWe use it to register the KafkaSourceMapping and a KafkaSinkMapping for the particular platform, Java in our case. \\nThese classes allow the Apache Wayang framework to use the Java implementation of the KafkaTopicSource component (and KafkaTopicSink respectively). \\nWhile the Wayang execution plan uses the higher abstractions, here on the \u201cplatform level\u201d we have to link the specific implementation for the target platform. \\nIn our case this leads to a Java program running on a JVM which is set up by the Apache Wayang framework using the logical components of the execution plan.\\n\\nThose mappings link the real implementation of our operators the ones used in an execution plan.\\nThe JavaKafkaTopicSource and the JavaKafkaTopicSink extend the KafkaTopicSource and KafkaTopicSink so that the lower level implementation of those classes become available within Wayang\u2019s Java Platform context.\\n\\nIn this layer, the KafkaConsumer class and the KafkaProducer class are used, but both are configured and instantiated in the next layer underneath. \\nAll this is done in the project *wayang-plarforms/wayang-java*.\\n\\n**Layer 3 \u2013 Input/Output Connector Layer**\\n\\nThe _KafkaTopicSource_ and _KafkaTopicSink_ classes build the third layer of our implementation. \\nBoth are implemented in Java programming language. \\nIn this layer, the real Kafka-Client logic is defined. \\nDetails about consumer and producers, client configuration, and schema handling have to be handled here.\\n\\n## Summary\\nBoth classes in the third layer implement the Kafka client logic which is needed by the Wayang-execution plan when external data flows should be established. \\nThe layer above handles the mapping of the components at startup time. \\nAll this wiring is needed to keep Wayang open and flexible so that multiple external systems can be used in a variety of combinations and using multiple target platforms in combinations.\\n\\n## Outlook\\nThe next part of the article series will cover the creation of an Kafka Source and Sink component for the Apache Spark platform, which allows our use case to scale. \\nFinally, in part four we bring all puzzles together, and show the full implementation of the multi organizational data collaboration use case."},{"id":"website_update","metadata":{"permalink":"/blog/website_update","source":"@site/blog/2024-01-25-website_update.md","title":"Website updated","description":"We\'re updated our website and use now Docusaurus.","date":"2024-01-25T00:00:00.000Z","formattedDate":"January 25, 2024","tags":[{"label":"wayang","permalink":"/blog/tags/wayang"}],"readingTime":0.32,"hasTruncateMarker":true,"authors":[{"name":"Alexander Alten","title":"PPMC Apache Wayang","url":"https://github.com/2pk03","imageURL":"https://avatars.githubusercontent.com/u/1323575?v=4","key":"alo.alt"}],"frontMatter":{"slug":"website_update","title":"Website updated","authors":["alo.alt"],"tags":["wayang"]},"unlisted":false,"prevItem":{"title":"Apache Kafka meets Apache Wayang - Part 2","permalink":"/blog/Apache Kafka meets Apache Wayang"}},"content":"We\'re updated our website and use now Docusaurus.\\n\\n\x3c!--truncate--\x3e\\n# Website updated\\n\\nAuthor: [2pk03](https://github.com/2pk03)\\n\\nWe switched to a new CMS. That\'s all.\\n\\n## Cheatsheet\\n\\nList:\\n- Line one \\n  - Line one.one\\n  - Line one.two\\n- Line two\\n  - Line two.one\\n  - Line two.two\\n- Line three\\n  - ...\\n  - ...\\n\\nAnother style for a list:\\n* Line one\\n* Line two\\n* Line three"}]}')}}]);