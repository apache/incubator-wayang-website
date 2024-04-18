"use strict";(self.webpackChunkwayang_website=self.webpackChunkwayang_website||[]).push([[8356],{409:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>s,toc:()=>d});var t=n(5893),i=n(1151);const o={slug:"wayang-federated-ai",title:"Wayang and the Federated AI",authors:["glauesppen"],tags:["wayang","federated","ai"]},r="The Federated AI",s={permalink:"/blog/wayang-federated-ai",source:"@site/blog/2024-04-17-federated-ai.md",title:"Wayang and the Federated AI",description:"AI systems and applications are widely used nowadays, from assisting grammar spellings to",date:"2024-04-17T00:00:00.000Z",formattedDate:"April 17, 2024",tags:[{label:"wayang",permalink:"/blog/tags/wayang"},{label:"federated",permalink:"/blog/tags/federated"},{label:"ai",permalink:"/blog/tags/ai"}],readingTime:2.855,hasTruncateMarker:!1,authors:[{name:"Gl\xe1ucia Esppenchutz",title:"(P)PMC Apache Wayang",url:"https://github.com/glauesppen",imageURL:"https://avatars.githubusercontent.com/glauesppen",key:"glauesppen"}],frontMatter:{slug:"wayang-federated-ai",title:"Wayang and the Federated AI",authors:["glauesppen"],tags:["wayang","federated","ai"]},unlisted:!1,nextItem:{title:"Pywayang - Apache Wayang's Python API",permalink:"/blog/wayang-python-api"}},l={authorsImageUrls:[void 0]},d=[{value:"Apache Wayang in the Federated AI world",id:"apache-wayang-in-the-federated-ai-world",level:2},{value:"A real-world example",id:"a-real-world-example",level:2},{value:"Follow Wayang",id:"follow-wayang",level:3},{value:"Thank you!",id:"thank-you",level:5}];function c(e){const a={a:"a",h2:"h2",h3:"h3",h5:"h5",p:"p",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(a.p,{children:"AI systems and applications are widely used nowadays, from assisting grammar spellings to\ndetecting early signs of cancer cells. Building an AI requires a lot of data and training to achieve\nthe desired results, and federated learning is an approach to make AI training more viable.\nFederated learning (or collaborative learning) is a technique that trains AI models on data\ndistributed across multiple serves or devices. It does so without centralizing data on a single\nplace or storage. It also prevents the possibility of data breaches and protects sensitive\npersonal data. One of the significant challenges in working with AI is the variety of tools found\nin the market or the open-source community. Each tool provides results in a different form;\nintegrating them can be pretty challenging. Let's talk about Apache Wayang (incubating) and\nhow it can help to solve this problem."}),"\n",(0,t.jsx)(a.h2,{id:"apache-wayang-in-the-federated-ai-world",children:"Apache Wayang in the Federated AI world"}),"\n",(0,t.jsx)(a.p,{children:"Apache Wayang (Wayang, for short), a project in an incubation phase at Apache Software\nFoundation (ASF), integrates big data platforms and tools by removing the complexity of\nworrying about low-level details. Interestingly, even if it was not designed for, Wayang could\nalso serve as a scalable platform for federated learning: the Wayang community is starting to\nwork on integrating federated learning capabilities. In a federated learning approach, Wayang\nwould allow different local models to be built and exchange its model results across other data\ncenters to combine them into a single enhanced model."}),"\n",(0,t.jsx)(a.h2,{id:"a-real-world-example",children:"A real-world example"}),"\n",(0,t.jsx)(a.p,{children:"Let's consider a real-world scenario. Hospitals and health organizations have increased their\ninvestments in machine/deep learning initiatives to learn more and predict diagnostics.\nHowever, due to legal frameworks, sharing patients' information or diagnostics is impossible,\nand the solution would be to apply federated learning. To solve this problem, we could use\nWayang to help to train the models. See the diagram 1 below:"}),"\n",(0,t.jsx)("br",{}),"\n",(0,t.jsx)("img",{width:"75%",alt:"wayang stack",src:"/img/architecture/federated-ai-architecture-1.png"}),"\n",(0,t.jsx)("br",{}),"\n",(0,t.jsx)("br",{}),"\n",(0,t.jsx)(a.p,{children:'As a first step, the data scientists would send an ML task to Wayang, which will work as an\nabstraction layer to connect to different data processing platforms, sparing the time to build\nintegration code for each. Then, the data platforms process and generate the results that will\nbe sent back to Wayang. Wayang aggregates the results into one "global result" and sends it\nback to the requestor as a next step.'}),"\n",(0,t.jsx)("br",{}),"\n",(0,t.jsx)("img",{width:"75%",alt:"wayang stack",src:"/img/architecture/federated-ai-architecture-2.png"}),"\n",(0,t.jsx)("br",{}),"\n",(0,t.jsx)("br",{}),"\n",(0,t.jsx)(a.p,{children:"The process repeats until the desired results are achieved.\nAlthough it is very much like a Federated learning pipeline, Wayang removes a considerable\nlayer of complexity from the developers by integrating with diverse types of data platforms. It\nalso brings fast development and reduces the need for a deep understanding of data\ninfrastructure or integrations. Developers can focus on the logic and how to execute tasks\ninstead of details about data processors."}),"\n",(0,t.jsx)(a.h3,{id:"follow-wayang",children:"Follow Wayang"}),"\n",(0,t.jsxs)(a.p,{children:["Apache Wayang is in an incubation phase and has a potential roadmap of implementations\ncoming soon (including the federated learning aspect as well as an SQL interface and a novel\ndata debugging functionality). If you want to hear or join the community, consult the link\n",(0,t.jsx)(a.a,{href:"https://wayang.apache.org/community/",children:"https://wayang.apache.org/community/"})," , join the mailing lists, contribute with new ideas,\nwrite documentation, or fix bugs."]}),"\n",(0,t.jsx)("br",{}),"\n",(0,t.jsx)(a.h5,{id:"thank-you",children:"Thank you!"}),"\n",(0,t.jsx)(a.p,{children:"I (Gl\xe1ucia) want to thank professor Jorge Quian\xe9 for the guidance to write this blog post.\nThanks for incentivate me to join the project and for the knowledge shared. I will always remember you."})]})}function h(e={}){const{wrapper:a}={...(0,i.a)(),...e.components};return a?(0,t.jsx)(a,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},1151:(e,a,n)=>{n.d(a,{Z:()=>s,a:()=>r});var t=n(7294);const i={},o=t.createContext(i);function r(e){const a=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function s(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),t.createElement(o.Provider,{value:a},e.children)}}}]);