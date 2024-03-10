"use strict";(self.webpackChunkwayang_website=self.webpackChunkwayang_website||[]).push([[2227],{3785:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>l,contentTitle:()=>o,default:()=>p,frontMatter:()=>r,metadata:()=>s,toc:()=>c});var t=n(5893),i=n(1151);const r={slug:"kafka-meets-wayang-2",title:"Apache Kafka meets Apache Wayang - Part 3",authors:"kamir",tags:["wayang","kafka","spark","cross organization data collaboration"]},o=void 0,s={permalink:"/blog/kafka-meets-wayang-2",source:"@site/blog/2024-03-10-kafka-meets-wayang-3.md",title:"Apache Kafka meets Apache Wayang - Part 3",description:"The third part of this article series is an activity log.",date:"2024-03-10T00:00:00.000Z",formattedDate:"March 10, 2024",tags:[{label:"wayang",permalink:"/blog/tags/wayang"},{label:"kafka",permalink:"/blog/tags/kafka"},{label:"spark",permalink:"/blog/tags/spark"},{label:"cross organization data collaboration",permalink:"/blog/tags/cross-organization-data-collaboration"}],readingTime:4.985,hasTruncateMarker:!1,authors:[{name:"Mirko K\xe4mpf",title:"Apache Commiter",url:"https://github.com/kamir",imageURL:"https://avatars.githubusercontent.com/u/1241122?v=4",key:"kamir"}],frontMatter:{slug:"kafka-meets-wayang-2",title:"Apache Kafka meets Apache Wayang - Part 3",authors:"kamir",tags:["wayang","kafka","spark","cross organization data collaboration"]},unlisted:!1,prevItem:{title:"Apache Kafka meets Apache Wayang - Part 2",permalink:"/blog/Apache Kafka meets Apache Wayang"},nextItem:{title:"Apache Wayang vs. Presto/Trino",permalink:"/blog/wayang-vs-trino"}},l={authorsImageUrls:[void 0]},c=[{value:"The goal of this implementation",id:"the-goal-of-this-implementation",level:2},{value:"Implementation of Input- and Output Operators",id:"implementation-of-input--and-output-operators",level:2},{value:"Summary",id:"summary",level:2},{value:"Outlook",id:"outlook",level:2}];function h(e){const a={code:"code",em:"em",h2:"h2",img:"img",p:"p",pre:"pre",strong:"strong",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(a.p,{children:"The third part of this article series is an activity log.\nMotivated by the learnings from last time, I stated implementing a Kafka Source component and a Kafka Sink component for the Apache Spark platform in Apache Wayang.\nIn our previous article we shared the results of the work on the frist Apache Kafka integration using the Java Platform."}),"\n",(0,t.jsx)(a.p,{children:"Let's see how it goes this time with Apache Spark."}),"\n",(0,t.jsx)(a.h2,{id:"the-goal-of-this-implementation",children:"The goal of this implementation"}),"\n",(0,t.jsx)(a.p,{children:"We want to process data from Apache Kafka topics, which are hosted on Confluent cloud.\nIn our example scenario, the data is available in multiple different clusters, in different regions and owned by different organizations."}),"\n",(0,t.jsx)(a.p,{children:"We assume, that the operator of our job has been granted appropriate permissions, and the topic owner already provided the configuration properties, including access coordinates and credentials."}),"\n",(0,t.jsx)(a.p,{children:(0,t.jsx)(a.img,{alt:"images/image-1.png",src:n(655).Z+"",width:"904",height:"550"})}),"\n",(0,t.jsxs)(a.p,{children:["This illustration has already been introduced in part one.\nWe focus on ",(0,t.jsx)(a.strong,{children:"Job 4"})," in the image and start to implement it.\nThis time we expect the processing load to be higher so that we want to utilize the scalability capabilities of Apache Spark."]}),"\n",(0,t.jsxs)(a.p,{children:["Again, we start with a ",(0,t.jsx)(a.strong,{children:"WayangContext"}),", as shown by examples in the Wayang code repository."]}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{children:"WayangContext wayangContext = new WayangContext().with(Spark.basicPlugin());\n"})}),"\n",(0,t.jsxs)(a.p,{children:["We simply switched the backend system towards Apache Spark by using the ",(0,t.jsx)(a.em,{children:"WayangContext"})," with ",(0,t.jsx)(a.em,{children:"Spark.basicPlugin()"}),".\nThe ",(0,t.jsx)(a.strong,{children:"JavaPlanBuilder"})," and all other logic of our example job won't be touched."]}),"\n",(0,t.jsx)(a.p,{children:"In order to make this working we will now implement the Mappings and the Operators for the Apache Spark platform module."}),"\n",(0,t.jsx)(a.h2,{id:"implementation-of-input--and-output-operators",children:"Implementation of Input- and Output Operators"}),"\n",(0,t.jsx)(a.p,{children:"We reuse the Kafka Source and Kafka Sink components which have been created for the JavaKafkaSource and JavaKafkaSink.\nHence we work with Wayang's Java API."}),"\n",(0,t.jsx)(a.p,{children:(0,t.jsx)(a.strong,{children:"Level 1 \u2013 Wayang execution plan with abstract operators"})}),"\n",(0,t.jsxs)(a.p,{children:["Since the ",(0,t.jsx)(a.em,{children:"JavaPlanBuilder"})," already exposes the function for selecting a Kafka topic as source\nand the ",(0,t.jsx)(a.em,{children:"DataQuantaBuilder"})," class exposes the ",(0,t.jsx)(a.em,{children:"writeKafkaTopic"})," function we can move on quickly."]}),"\n",(0,t.jsx)(a.p,{children:"Remember, in this API layer we use the Scala programming language, but we utilize the Java classes, implemented in the layer below."}),"\n",(0,t.jsx)(a.p,{children:(0,t.jsx)(a.strong,{children:"Level 2 \u2013 Wiring between Platform Abstraction and Implementation"})}),"\n",(0,t.jsx)(a.p,{children:"As in the case with the Java Platform, in the second layer we build a bridge between the WayangContext and the PlanBuilders, which work together with DataQuanta and the DataQuantaBuilder."}),"\n",(0,t.jsx)(a.p,{children:"We must provide the mapping between the abstract components and the specific implementations in this layer."}),"\n",(0,t.jsxs)(a.p,{children:["Therefore, the mappings package in project ",(0,t.jsx)(a.strong,{children:"wayang-platforms/wayang-spark"})," has a class ",(0,t.jsx)(a.em,{children:"Mappings"})," in which\nour ",(0,t.jsx)(a.em,{children:"KafkaTopicSinkMapping"})," and ",(0,t.jsx)(a.em,{children:"KafkaTopicSourceMapping"})," will be registered."]}),"\n",(0,t.jsx)(a.p,{children:"Again, these classes allow the Apache Wayang framework to use the Java implementation of the KafkaTopicSource component (and KafkaTopicSink respectively)."}),"\n",(0,t.jsx)(a.p,{children:"While the Wayang execution plan uses the higher abstractions, here on the \u201cplatform level\u201d we have to link the specific implementation for the target platform.\nIn this case this leads to an Apache Spark job, running on a Spark cluster which is set up by the Apache Wayang framework using the logical components of the execution plan, and the Apache Spark configuration provided at runtime."}),"\n",(0,t.jsx)(a.p,{children:"A mapping links an operator implementation to the abstraction used in an execution plan.\nWe define two new mappings for our purpose, namely KafkaTopicSourceMapping, and KafkaTopicSinkMapping, both could be reused from last round."}),"\n",(0,t.jsxs)(a.p,{children:["For the Spark platform we simply replace the occurences of ",(0,t.jsx)(a.em,{children:"JavaPlatform"})," with ",(0,t.jsx)(a.em,{children:"SparkPlatform"}),"."]}),"\n",(0,t.jsxs)(a.p,{children:["Furthermore, we create an implementation of the ",(0,t.jsx)(a.em,{children:"SparkKafkaTopicSource"})," and ",(0,t.jsx)(a.em,{children:"SparkKafkaTopicSink"}),"."]}),"\n",(0,t.jsx)(a.p,{children:(0,t.jsx)(a.strong,{children:"Layer 3 \u2013 Input/Output Connector Layer"})}),"\n",(0,t.jsx)(a.p,{children:"Let's quickly recap, how does Apache Spark interacts with Apache Kafka?"}),"\n",(0,t.jsxs)(a.p,{children:["There is already an integration which gives us a DataSet using the Spark SQL framework.\nFor Spark Streaming, there is also a Kafka integration using the ",(0,t.jsx)(a.em,{children:"SparkSession"}),"'s ",(0,t.jsx)(a.em,{children:"readStream()"})," function.\nKafka client properties are provided as key value pairs ",(0,t.jsx)(a.em,{children:"k"})," and ",(0,t.jsx)(a.em,{children:"v"})," by using the ",(0,t.jsx)(a.em,{children:"option( k, v )"})," function.\nFor writing into a topic, we can use the ",(0,t.jsx)(a.em,{children:"writeStream()"})," function.\nBut from a first look, it seems to be not the best fit."]}),"\n",(0,t.jsx)(a.p,{children:"Another approach is possible.\nWe can use simple RDDs to process data previously consumed from Apache Kafka.\nThis is a more low-level approach compared to using Datasets with Spark Structured Streaming,\nand it typically involves using the Kafka RDD API provided by Spark."}),"\n",(0,t.jsx)(a.p,{children:"This approach is less common with newer versions of Spark, as Structured Streaming provides a higher-level abstraction that simplifies stream processing.\nHowever, we might need that approach for the integration with Apache Wayang."}),"\n",(0,t.jsx)(a.p,{children:"For now, we will focus on the lower level approach and plan to consume data from Kafka using a Kafka client, and then\nwe parallelize the records in an RDD."}),"\n",(0,t.jsxs)(a.p,{children:["This allows us to reuse ",(0,t.jsx)(a.em,{children:"KafkaTopicSource"})," and ",(0,t.jsx)(a.em,{children:"KafkaTopicSink"})," classes we built last time.\nThose were made specifically for a simple non parallel Java program, using one Consumer and one Producer."]}),"\n",(0,t.jsxs)(a.p,{children:["The selected approach does not yet fully take advantage from Spark's parallelism at load time.\nFor higher loads and especially for streaming processing we would have to investigate another approache, using a ",(0,t.jsx)(a.em,{children:"SparkStreamingContext"}),", but this is out of scope for now."]}),"\n",(0,t.jsxs)(a.p,{children:["Since we can't reuse the ",(0,t.jsx)(a.em,{children:"JavaKafkaTopicSource"})," and ",(0,t.jsx)(a.em,{children:"JavaKafkaTopicSink"})," we rather implement ",(0,t.jsx)(a.em,{children:"SparkKafkaTopicSource"})," and ",(0,t.jsx)(a.em,{children:"SparkKafkaTopicSink"})," based on given ",(0,t.jsx)(a.em,{children:"SparkTextFileSource"})," and ",(0,t.jsx)(a.em,{children:"SparkTextFileSink"})," which both cary all needed RDD specific logic."]}),"\n",(0,t.jsx)(a.h2,{id:"summary",children:"Summary"}),"\n",(0,t.jsx)(a.p,{children:"As expected, the integration of Apache Spark with Apache Wayang was no magic, thanks to a fluent API design and a well structured architecture of Apache Wayang.\nWe could easily follow the pattern we have worked out in the previous exercise."}),"\n",(0,t.jsx)(a.p,{children:"But a bunch of much more interesting work will follow next.\nMore testing, more serialization schemes, and Kafka Schema Registry support should follow, and full parallelization as well."}),"\n",(0,t.jsx)(a.p,{children:"The code has been submitted to the Apache Wayang repository."}),"\n",(0,t.jsx)(a.h2,{id:"outlook",children:"Outlook"}),"\n",(0,t.jsx)(a.p,{children:"The next part of the article series will cover the real world example as described in image 1.\nWe will show how analysts and developers can use the Apache Kafka integration for Apache Wayang to solve cross organizational collaboration issues.\nTherefore, we will bring all puzzles together, and show the full implementation of the multi organizational data collaboration use case."})]})}function p(e={}){const{wrapper:a}={...(0,i.a)(),...e.components};return a?(0,t.jsx)(a,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},655:(e,a,n)=>{n.d(a,{Z:()=>t});const t=n.p+"assets/images/image-1-9cc35d5aea2b867d7e5759a96bd02334.png"},1151:(e,a,n)=>{n.d(a,{Z:()=>s,a:()=>o});var t=n(7294);const i={},r=t.createContext(i);function o(e){const a=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function s(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),t.createElement(r.Provider,{value:a},e.children)}}}]);