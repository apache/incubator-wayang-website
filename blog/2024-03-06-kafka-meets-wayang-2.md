---
slug: kafka-meets-wayang-2
title: Apache Kafka meets Apache Wayang - Part 2
authors: kamir
tags: [wayang, kafka, cross organization data collaboration]
---

# Apache Wayang meets Apache Kafka - Part 2

In the second part of the article series we describe the implementation of the Kafka Source and Kafka Sink component for Apache Wayang.
We look into the “Read- and Write-Path” for our data items, called _DataQuanta_.

## Apache Wayang’s Read & Write Path for Kafka topics

To describe the read and write paths for data in the context of the created Apache Wayang code snippet, the primary classes and interfaces we need to understand are as follows:

**WayangContext:** This class is essential for initializing the Wayang processing environment. 
It allows you to configure the execution environment and register plugins that define which platforms Wayang can use for data processing tasks, such as _Java.basicPlugin()_ for local Java execution.

**JavaPlanBuilder:** This class is used to build and define the data processing pipeline (or plan) in Wayang. 
It provides a fluent API to specify the operations to be performed on the data, from reading the input to processing it and writing the output.

### Read Path
The read path describes how data is ingested from a source into the Wayang processing pipeline:

_Reading from Kafka Topic:_ The method _readKafkaTopic(topicName)_ is used to ingest data from a specified Kafka topic. 
This is the starting point of the data processing pipeline, where topicName represents the name of the Kafka topic from which data is read.

_Data Tokenization and Preparation:_ Once the data is read from Kafka, it undergoes several transformations such as Splitting, Filtering, and Mapping. 
What follows are the procedures known as Reducing, Grouping, Co-Grouping, and Counting.

### Write Path
_Writing to Kafka Topic:_ The final step in the pipeline involves writing the processed data back to a Kafka topic using _.writeKafkaTopic(...)_. 
This method takes parameters that specify the target Kafka topic, a serialization function to format the data as strings, and additional configuration for load profile estimation, which optimizes the writing process.

This read-write path provides a comprehensive flow of data from ingestion from Kafka, through various processing steps, and finally back to Kafka, showcasing a full cycle of data processing within Apache Wayang's abstracted environment and is implemented in our example program shown in *listing 1*.

## Implementation of Input- and Output Operators
The next section shows how a new pair of operators can be implemented to extend Apache Wayang’s capabilities on the input and output side. 
We created the Kafka Source and Kafka Sink components so that our cross organizational data collaboration scenario can be implemented using data streaming infrastructure.

**Level 1 – Wayang execution plan with abstract operators**

The implementation of our Kafka Source and Kafka Sink components for Apache Wayang requires new methods and classes on three layers. 
First of all in the API package. 
Here we use the JavaPlanBuilder to expose the function for selecting a Kafka topic as the source to be used by client.  
The class _JavaPlanBuilder_ in package _org.apache.wayang.api_ in the project *wayang-api/wayang-api-scala-java* exposes our new functionality to our external client.
An instance of the JavaPlanBuilder is used to define the data processing pipeline. 
We use its _readKafkaTopic()_ which specifies the source Kafka topic to read from, and for the write path we use the _writeKafkaTopic()_ method. 
Both Methods do only trigger activities in the background.

For the output side, we use the _DataQuantaBuilder_ class, which offers an implementation of the writeKafkaTopic function. 
This function is designed to send processed data, referred to as DataQuanta, to a specified Kafka topic. 
Essentially, it marks the final step in a data processing sequence constructed using the Apache Wayang framework.

In the DataQuanta class we implemented the methods writeKafkaTopic and writeKafkaTopicJava which use the KafkaTopicSink class. 
In this API layer we use the Scala programming language, but we utilize the Java classes, implemented in the layer below.

**Level 2 – Wiring between Platform Abstraction and Implementation**

The second layer builds the bridge between the WayangContext and PlanBuilders which work together with DataQuanta and the DataQuantaBuilder.

Also, the mapping between the abstract components and the specific implementations are defined in this layer.

Therefore, the mappings package has a class _Mappings_ in which all relevant input and output operators are listed. 
We use it to register the KafkaSourceMapping and a KafkaSinkMapping for the particular platform, Java in our case. 
These classes allow the Apache Wayang framework to use the Java implementation of the KafkaTopicSource component (and KafkaTopicSink respectively). 
While the Wayang execution plan uses the higher abstractions, here on the “platform level” we have to link the specific implementation for the target platform. 
In our case this leads to a Java program running on a JVM which is set up by the Apache Wayang framework using the logical components of the execution plan.

Those mappings link the real implementation of our operators the ones used in an execution plan.
The JavaKafkaTopicSource and the JavaKafkaTopicSink extend the KafkaTopicSource and KafkaTopicSink so that the lower level implementation of those classes become available within Wayang’s Java Platform context.

In this layer, the KafkaConsumer class and the KafkaProducer class are used, but both are configured and instantiated in the next layer underneath. 
All this is done in the project *wayang-plarforms/wayang-java*.

**Layer 3 – Input/Output Connector Layer**

The _KafkaTopicSource_ and _KafkaTopicSink_ classes build the third layer of our implementation. 
Both are implemented in Java programming language. 
In this layer, the real Kafka-Client logic is defined. 
Details about consumer and producers, client configuration, and schema handling have to be handled here.

## Summary
Both classes in the third layer implement the Kafka client logic which is needed by the Wayang-execution plan when external data flows should be established. 
The layer above handles the mapping of the components at startup time. 
All this wiring is needed to keep Wayang open and flexible so that multiple external systems can be used in a variety of combinations and using multiple target platforms in combinations.

## Outlook
The next part of the article series will cover the creation of an Kafka Source and Sink component for the Apache Spark platform, which allows our use case to scale. 
Finally, in part four we bring all puzzles together, and show the full implementation of the multi organizational data collaboration use case.




