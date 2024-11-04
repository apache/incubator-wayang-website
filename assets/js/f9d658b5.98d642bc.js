"use strict";(self.webpackChunkwayang_website=self.webpackChunkwayang_website||[]).push([[9298],{2687:(a,e,n)=>{n.r(e),n.d(e,{assets:()=>c,contentTitle:()=>i,default:()=>d,frontMatter:()=>r,metadata:()=>s,toc:()=>l});var t=n(5893),o=n(1151);const r={slug:"wayang-tensorflow",title:"Integrating ML platforms in Wayang",authors:["zkaoudi"],tags:["wayang","ML","tensorflow"]},i="Integrating ML platforms in Wayang",s={permalink:"/blog/wayang-tensorflow",source:"@site/blog/2024-05-07-wayang-tensorflow.md",title:"Integrating ML platforms in Wayang",description:"We are happy to announce that we have extended Wayang to be able to utilize any ML platform and any ML operators.",date:"2024-05-07T00:00:00.000Z",formattedDate:"May 7, 2024",tags:[{label:"wayang",permalink:"/blog/tags/wayang"},{label:"ML",permalink:"/blog/tags/ml"},{label:"tensorflow",permalink:"/blog/tags/tensorflow"}],readingTime:2.77,hasTruncateMarker:!1,authors:[{name:"Zoi Kaoudi",title:"(P)PMC Apache Wayang",url:"https://github.com/zkaoudi",imageURL:"https://avatars.githubusercontent.com/zkaoudi",key:"zkaoudi"}],frontMatter:{slug:"wayang-tensorflow",title:"Integrating ML platforms in Wayang",authors:["zkaoudi"],tags:["wayang","ML","tensorflow"]},unlisted:!1,prevItem:{title:"Apache Wayang Release Odysse",permalink:"/blog/wayang-release-odysse"},nextItem:{title:"Wayang and the Federated AI",permalink:"/blog/wayang-federated-ai"}},c={authorsImageUrls:[void 0]},l=[{value:"Step 1: Introducing a Model",id:"step-1-introducing-a-model",level:2},{value:"Step 2: Introducing Training Operators",id:"step-2-introducing-training-operators",level:2},{value:"Step 3: Introducing Prediction Operators",id:"step-3-introducing-prediction-operators",level:2},{value:"Deep Learning Models",id:"deep-learning-models",level:2},{value:"New ML platform -- Tensorflow Integration",id:"new-ml-platform----tensorflow-integration",level:2},{value:"Acknowledgement",id:"acknowledgement",level:3},{value:"Follow Wayang",id:"follow-wayang",level:3}];function p(a){const e={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",...(0,o.a)(),...a.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(e.p,{children:["We are happy to announce that we have extended Wayang to be able to utilize any ML platform and any ML operators.\nThanks to the extensible nature of Wayang, the only core changes we had to do were introducing the concept of a ",(0,t.jsx)(e.code,{children:"Model"})," and implement a new driver for the newly added platform."]}),"\n",(0,t.jsx)(e.h2,{id:"step-1-introducing-a-model",children:"Step 1: Introducing a Model"}),"\n",(0,t.jsxs)(e.p,{children:["With respect to the model, we followed Wayang\u2019s abstraction philosophy: We created a ",(0,t.jsx)(e.code,{children:"Model"})," interface to be used as input or output by Wayang operators and then extended it for the platform-specific operators. Different model interfaces can be found here:"]}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.a,{href:"https://github.com/apache/incubator-wayang/tree/main/wayang-commons/wayang-basic/src/main/java/org/apache/wayang/basic/model",children:"https://github.com/apache/incubator-wayang/tree/main/wayang-commons/wayang-basic/src/main/java/org/apache/wayang/basic/model"})}),"\n",(0,t.jsxs)(e.p,{children:["A platform-specific model needs to be instantiated to be used as the output of a training operator and as input for an inference operator. You can see an example of the ",(0,t.jsx)(e.code,{children:"SparkMLModel"})," here:"]}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.a,{href:"https://github.com/apache/incubator-wayang/tree/main/wayang-platforms/wayang-spark/src/main/java/org/apache/wayang/spark/model/SparkMLModel.java",children:"https://github.com/apache/incubator-wayang/tree/main/wayang-platforms/wayang-spark/src/main/java/org/apache/wayang/spark/model/SparkMLModel.java"})}),"\n",(0,t.jsx)(e.h2,{id:"step-2-introducing-training-operators",children:"Step 2: Introducing Training Operators"}),"\n",(0,t.jsx)(e.p,{children:"We added the desired Wayang (platform-agnostic) training operators which are binary to unary operators, taking as input the X and y values and outputting a Model. You can find an example of a LinearRegressionOperator here:"}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.a,{href:"https://github.com/apache/incubator-wayang/blob/main/wayang-commons/wayang-basic/src/main/java/org/apache/wayang/basic/operators/LinearRegressionOperator.java",children:"https://github.com/apache/incubator-wayang/blob/main/wayang-commons/wayang-basic/src/main/java/org/apache/wayang/basic/operators/LinearRegressionOperator.java"})}),"\n",(0,t.jsxs)(e.p,{children:["Platform-specific execution operators, such as SparkLinearRegressionOperator, can be easily added as any other execution operator: extending the corresponding Wayang operator and providing the mappings from the Wayang to the execution operator. See, for example, the ",(0,t.jsx)(e.code,{children:"SparkLinearRegressionOperator"}),":"]}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.a,{href:"https://github.com/apache/incubator-wayang/tree/main/wayang-platforms/wayang-spark/src/main/java/org/apache/wayang/spark/operators/ml/SparkLinearRegressionOperator.java",children:"https://github.com/apache/incubator-wayang/tree/main/wayang-platforms/wayang-spark/src/main/java/org/apache/wayang/spark/operators/ml/SparkLinearRegressionOperator.java"})}),"\n",(0,t.jsx)(e.h2,{id:"step-3-introducing-prediction-operators",children:"Step 3: Introducing Prediction Operators"}),"\n",(0,t.jsxs)(e.p,{children:["Additionally, we created a ",(0,t.jsx)(e.code,{children:"PredictOperator"}),", a BinaryToUnary Wayang (platform-agnostic) operator which takes as input the data quanta and a model and outputs the data quanta with the predictions output by the model."]}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.a,{href:"https://github.com/apache/incubator-wayang/tree/main/wayang-commons/wayang-basic/src/main/java/org/apache/wayang/basic/operators/PredictOperator.java",children:"https://github.com/apache/incubator-wayang/tree/main/wayang-commons/wayang-basic/src/main/java/org/apache/wayang/basic/operators/PredictOperator.java"})}),"\n",(0,t.jsxs)(e.p,{children:["Then, a concrete platform-specific operator extends from the abstract one. See the ",(0,t.jsx)(e.code,{children:"SparkPredictOperator"})," for an example:"]}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.a,{href:"https://github.com/apache/incubator-wayang/tree/main/wayang-platforms/wayang-spark/src/main/java/org/apache/wayang/spark/operators/ml/SparkPredictOperator.java",children:"https://github.com/apache/incubator-wayang/tree/main/wayang-platforms/wayang-spark/src/main/java/org/apache/wayang/spark/operators/ml/SparkPredictOperator.java"})}),"\n",(0,t.jsx)(e.h2,{id:"deep-learning-models",children:"Deep Learning Models"}),"\n",(0,t.jsxs)(e.p,{children:["Unlike traditional machine learning models, the definition of deep learning models is more flexible. Users can combine different blocks (e.g., fully connected blocks, convolutional blocks) to build their desired models. The whole model can be represented as a graph on which the vertices represent blocks and the edges represent connections between blocks. In this case, we built a ",(0,t.jsx)(e.code,{children:"DLModel"})," class that implements the ",(0,t.jsx)(e.code,{children:"Model"})," interface, which contains a user-defined, platform-agnostic graph of the model:"]}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.a,{href:"https://github.com/apache/incubator-wayang/tree/main/wayang-commons/wayang-basic/src/main/java/org/apache/wayang/basic/model/DLModel.java",children:"https://github.com/apache/incubator-wayang/tree/main/wayang-commons/wayang-basic/src/main/java/org/apache/wayang/basic/model/DLModel.java"})}),"\n",(0,t.jsxs)(e.p,{children:["For training, we implemented the platform-agnostic ",(0,t.jsx)(e.code,{children:"DLModelTrainingOperator"})," Wayang operator:"]}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.a,{href:"https://github.com/apache/incubator-wayang/tree/main/wayang-commons/wayang-basic/src/main/java/org/apache/wayang/basic/operators/DLTrainingOperator.java",children:"https://github.com/apache/incubator-wayang/tree/main/wayang-commons/wayang-basic/src/main/java/org/apache/wayang/basic/operators/DLTrainingOperator.java"})}),"\n",(0,t.jsx)(e.h2,{id:"new-ml-platform----tensorflow-integration",children:"New ML platform -- Tensorflow Integration"}),"\n",(0,t.jsxs)(e.p,{children:["We have added Tensorflow as a new platform by creating a new module (",(0,t.jsx)(e.code,{children:"wayang-tensorflow"}),") inside the ",(0,t.jsx)(e.code,{children:"wayang-platforms"})," parent module and implementing a Tensorflow driver. The TensorflowExecutor driver is responsible for creating and destroying Tensorflow resources, such as a model graph and a model parameter context. When a training task scheduled on Tensorflow, it will be mapped to TensorflowDLModelTrainingOperator. In this process, the ",(0,t.jsx)(e.code,{children:"DLModel"})," will be converted to ",(0,t.jsx)(e.code,{children:"TensorflowModel"}),", which means that the user-defined model graph will be converted to a Tensorflow model graph. Likewise, for inference, the ",(0,t.jsx)(e.code,{children:"PredictOperator"})," will be mapped to ",(0,t.jsx)(e.code,{children:"TensorflowPredictOperator"}),". All the code for the tensorflow platform can be found here:"]}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.a,{href:"https://github.com/apache/incubator-wayang/tree/main/wayang-platforms/wayang-tensorflow/src/main/java/org/apache/wayang/tensorflow",children:"https://github.com/apache/incubator-wayang/tree/main/wayang-platforms/wayang-tensorflow/src/main/java/org/apache/wayang/tensorflow"})}),"\n",(0,t.jsx)(e.h3,{id:"acknowledgement",children:"Acknowledgement"}),"\n",(0,t.jsx)(e.p,{children:"The source code for the support of ML operators and the Tensorflow integration has been contributed by Mingxi Liu."}),"\n",(0,t.jsx)(e.h3,{id:"follow-wayang",children:"Follow Wayang"}),"\n",(0,t.jsxs)(e.p,{children:["Apache Wayang is in incubation phase and has a potential roadmap of implementations\ncoming soon (including the federated learning aspect as well as an SQL interface and a novel\ndata debugging functionality). If you want to hear or join the community, consult the link\n",(0,t.jsx)(e.a,{href:"https://wayang.apache.org/community/",children:"https://wayang.apache.org/community/"})," , join the mailing lists, contribute with new ideas,\nwrite documentation, or fix bugs."]})]})}function d(a={}){const{wrapper:e}={...(0,o.a)(),...a.components};return e?(0,t.jsx)(e,{...a,children:(0,t.jsx)(p,{...a})}):p(a)}},1151:(a,e,n)=>{n.d(e,{Z:()=>s,a:()=>i});var t=n(7294);const o={},r=t.createContext(o);function i(a){const e=t.useContext(r);return t.useMemo((function(){return"function"==typeof a?a(e):{...e,...a}}),[e,a])}function s(a){let e;return e=a.disableParentContext?"function"==typeof a.components?a.components(o):a.components||o:i(a.components),t.createElement(r.Provider,{value:e},a.children)}}}]);