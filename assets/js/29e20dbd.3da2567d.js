"use strict";(self.webpackChunkwayang_website=self.webpackChunkwayang_website||[]).push([[578],{5944:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>l,contentTitle:()=>s,default:()=>p,frontMatter:()=>o,metadata:()=>r,toc:()=>c});var n=t(5893),i=t(1151);const o={slug:"kafka-meets-wayang-2",title:"Apache Kafka meets Apache Wayang - Part 2",authors:"kamir",tags:["wayang","kafka","cross organization data collaboration"]},s="Apache Wayang meets Apache Kafka - Part 2",r={permalink:"/blog/kafka-meets-wayang-2",source:"@site/blog/2024-03-06-kafka-meets-wayang-2.md",title:"Apache Kafka meets Apache Wayang - Part 2",description:"In the second part of the article series we describe the implementation of the Kafka Source and Kafka Sink component for Apache Wayang.",date:"2024-03-06T00:00:00.000Z",formattedDate:"March 6, 2024",tags:[{label:"wayang",permalink:"/blog/tags/wayang"},{label:"kafka",permalink:"/blog/tags/kafka"},{label:"cross organization data collaboration",permalink:"/blog/tags/cross-organization-data-collaboration"}],readingTime:5.095,hasTruncateMarker:!1,authors:[{name:"Mirko K\xe4mpf",title:"Apache Commiter",url:"https://github.com/kamir",imageURL:"https://avatars.githubusercontent.com/u/1241122?v=4",key:"kamir"}],frontMatter:{slug:"kafka-meets-wayang-2",title:"Apache Kafka meets Apache Wayang - Part 2",authors:"kamir",tags:["wayang","kafka","cross organization data collaboration"]},unlisted:!1,prevItem:{title:"Apache Wayang vs. Presto/Trino",permalink:"/blog/wayang-vs-trino"},nextItem:{title:"Apache Kafka meets Apache Wayang - Part 1",permalink:"/blog/kafka-meets-wayang-1"}},l={authorsImageUrls:[void 0]},c=[{value:"Apache Wayang\u2019s Read &amp; Write Path for Kafka topics",id:"apache-wayangs-read--write-path-for-kafka-topics",level:2},{value:"Read Path",id:"read-path",level:3},{value:"Write Path",id:"write-path",level:3},{value:"Implementation of Input- and Output Operators",id:"implementation-of-input--and-output-operators",level:2},{value:"Summary",id:"summary",level:2},{value:"Outlook",id:"outlook",level:2}];function h(e){const a={br:"br",em:"em",h2:"h2",h3:"h3",p:"p",strong:"strong",...(0,i.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(a.p,{children:["In the second part of the article series we describe the implementation of the Kafka Source and Kafka Sink component for Apache Wayang.\nWe look into the \u201cRead- and Write-Path\u201d for our data items, called ",(0,n.jsx)(a.em,{children:"DataQuanta"}),"."]}),"\n",(0,n.jsx)(a.h2,{id:"apache-wayangs-read--write-path-for-kafka-topics",children:"Apache Wayang\u2019s Read & Write Path for Kafka topics"}),"\n",(0,n.jsx)(a.p,{children:"To describe the read and write paths for data in the context of the created Apache Wayang code snippet, the primary classes and interfaces we need to understand are as follows:"}),"\n",(0,n.jsxs)(a.p,{children:[(0,n.jsx)(a.strong,{children:"WayangContext:"})," This class is essential for initializing the Wayang processing environment.\nIt allows you to configure the execution environment and register plugins that define which platforms Wayang can use for data processing tasks, such as ",(0,n.jsx)(a.em,{children:"Java.basicPlugin()"})," for local Java execution."]}),"\n",(0,n.jsxs)(a.p,{children:[(0,n.jsx)(a.strong,{children:"JavaPlanBuilder:"})," This class is used to build and define the data processing pipeline (or plan) in Wayang.\nIt provides a fluent API to specify the operations to be performed on the data, from reading the input to processing it and writing the output."]}),"\n",(0,n.jsx)(a.h3,{id:"read-path",children:"Read Path"}),"\n",(0,n.jsx)(a.p,{children:"The read path describes how data is ingested from a source into the Wayang processing pipeline:"}),"\n",(0,n.jsxs)(a.p,{children:[(0,n.jsx)(a.em,{children:"Reading from Kafka Topic:"})," The method ",(0,n.jsx)(a.em,{children:"readKafkaTopic(topicName)"})," is used to ingest data from a specified Kafka topic.\nThis is the starting point of the data processing pipeline, where topicName represents the name of the Kafka topic from which data is read."]}),"\n",(0,n.jsxs)(a.p,{children:[(0,n.jsx)(a.em,{children:"Data Tokenization and Preparation:"})," Once the data is read from Kafka, it undergoes several transformations such as Splitting, Filtering, and Mapping.\nWhat follows are the procedures known as Reducing, Grouping, Co-Grouping, and Counting."]}),"\n",(0,n.jsx)(a.h3,{id:"write-path",children:"Write Path"}),"\n",(0,n.jsxs)(a.p,{children:[(0,n.jsx)(a.em,{children:"Writing to Kafka Topic:"})," The final step in the pipeline involves writing the processed data back to a Kafka topic using ",(0,n.jsx)(a.em,{children:".writeKafkaTopic(...)"}),".\nThis method takes parameters that specify the target Kafka topic, a serialization function to format the data as strings, and additional configuration for load profile estimation, which optimizes the writing process."]}),"\n",(0,n.jsxs)(a.p,{children:["This read-write path provides a comprehensive flow of data from ingestion from Kafka, through various processing steps, and finally back to Kafka, showcasing a full cycle of data processing within Apache Wayang's abstracted environment and is implemented in our example program shown in ",(0,n.jsx)(a.em,{children:"listing 1"}),"."]}),"\n",(0,n.jsx)(a.h2,{id:"implementation-of-input--and-output-operators",children:"Implementation of Input- and Output Operators"}),"\n",(0,n.jsx)(a.p,{children:"The next section shows how a new pair of operators can be implemented to extend Apache Wayang\u2019s capabilities on the input and output side.\nWe created the Kafka Source and Kafka Sink components so that our cross organizational data collaboration scenario can be implemented using data streaming infrastructure."}),"\n",(0,n.jsx)(a.p,{children:(0,n.jsx)(a.strong,{children:"Level 1 \u2013 Wayang execution plan with abstract operators"})}),"\n",(0,n.jsxs)(a.p,{children:["The implementation of our Kafka Source and Kafka Sink components for Apache Wayang requires new methods and classes on three layers.\nFirst of all in the API package.\nHere we use the JavaPlanBuilder to expose the function for selecting a Kafka topic as the source to be used by client.",(0,n.jsx)(a.br,{}),"\n","The class ",(0,n.jsx)(a.em,{children:"JavaPlanBuilder"})," in package ",(0,n.jsx)(a.em,{children:"org.apache.wayang.api"})," in the project ",(0,n.jsx)(a.em,{children:"wayang-api/wayang-api-scala-java"})," exposes our new functionality to our external client.\nAn instance of the JavaPlanBuilder is used to define the data processing pipeline.\nWe use its ",(0,n.jsx)(a.em,{children:"readKafkaTopic()"})," which specifies the source Kafka topic to read from, and for the write path we use the ",(0,n.jsx)(a.em,{children:"writeKafkaTopic()"})," method.\nBoth Methods do only trigger activities in the background."]}),"\n",(0,n.jsxs)(a.p,{children:["For the output side, we use the ",(0,n.jsx)(a.em,{children:"DataQuantaBuilder"})," class, which offers an implementation of the writeKafkaTopic function.\nThis function is designed to send processed data, referred to as DataQuanta, to a specified Kafka topic.\nEssentially, it marks the final step in a data processing sequence constructed using the Apache Wayang framework."]}),"\n",(0,n.jsx)(a.p,{children:"In the DataQuanta class we implemented the methods writeKafkaTopic and writeKafkaTopicJava which use the KafkaTopicSink class.\nIn this API layer we use the Scala programming language, but we utilize the Java classes, implemented in the layer below."}),"\n",(0,n.jsx)(a.p,{children:(0,n.jsx)(a.strong,{children:"Level 2 \u2013 Wiring between Platform Abstraction and Implementation"})}),"\n",(0,n.jsx)(a.p,{children:"The second layer builds the bridge between the WayangContext and PlanBuilders which work together with DataQuanta and the DataQuantaBuilder."}),"\n",(0,n.jsx)(a.p,{children:"Also, the mapping between the abstract components and the specific implementations are defined in this layer."}),"\n",(0,n.jsxs)(a.p,{children:["Therefore, the mappings package has a class ",(0,n.jsx)(a.em,{children:"Mappings"})," in which all relevant input and output operators are listed.\nWe use it to register the KafkaSourceMapping and a KafkaSinkMapping for the particular platform, Java in our case.\nThese classes allow the Apache Wayang framework to use the Java implementation of the KafkaTopicSource component (and KafkaTopicSink respectively).\nWhile the Wayang execution plan uses the higher abstractions, here on the \u201cplatform level\u201d we have to link the specific implementation for the target platform.\nIn our case this leads to a Java program running on a JVM which is set up by the Apache Wayang framework using the logical components of the execution plan."]}),"\n",(0,n.jsx)(a.p,{children:"Those mappings link the real implementation of our operators the ones used in an execution plan.\nThe JavaKafkaTopicSource and the JavaKafkaTopicSink extend the KafkaTopicSource and KafkaTopicSink so that the lower level implementation of those classes become available within Wayang\u2019s Java Platform context."}),"\n",(0,n.jsxs)(a.p,{children:["In this layer, the KafkaConsumer class and the KafkaProducer class are used, but both are configured and instantiated in the next layer underneath.\nAll this is done in the project ",(0,n.jsx)(a.em,{children:"wayang-plarforms/wayang-java"}),"."]}),"\n",(0,n.jsx)(a.p,{children:(0,n.jsx)(a.strong,{children:"Layer 3 \u2013 Input/Output Connector Layer"})}),"\n",(0,n.jsxs)(a.p,{children:["The ",(0,n.jsx)(a.em,{children:"KafkaTopicSource"})," and ",(0,n.jsx)(a.em,{children:"KafkaTopicSink"})," classes build the third layer of our implementation.\nBoth are implemented in Java programming language.\nIn this layer, the real Kafka-Client logic is defined.\nDetails about consumer and producers, client configuration, and schema handling have to be handled here."]}),"\n",(0,n.jsx)(a.h2,{id:"summary",children:"Summary"}),"\n",(0,n.jsx)(a.p,{children:"Both classes in the third layer implement the Kafka client logic which is needed by the Wayang-execution plan when external data flows should be established.\nThe layer above handles the mapping of the components at startup time.\nAll this wiring is needed to keep Wayang open and flexible so that multiple external systems can be used in a variety of combinations and using multiple target platforms in combinations."}),"\n",(0,n.jsx)(a.h2,{id:"outlook",children:"Outlook"}),"\n",(0,n.jsx)(a.p,{children:"The next part of the article series will cover the creation of an Kafka Source and Sink component for the Apache Spark platform, which allows our use case to scale.\nFinally, in part four we bring all puzzles together, and show the full implementation of the multi organizational data collaboration use case."})]})}function p(e={}){const{wrapper:a}={...(0,i.a)(),...e.components};return a?(0,n.jsx)(a,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}},1151:(e,a,t)=>{t.d(a,{Z:()=>r,a:()=>s});var n=t(7294);const i={},o=n.createContext(i);function s(e){const a=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function r(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),n.createElement(o.Provider,{value:a},e.children)}}}]);