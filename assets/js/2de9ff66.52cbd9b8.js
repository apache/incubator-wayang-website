"use strict";(self.webpackChunkwayang_website=self.webpackChunkwayang_website||[]).push([[701],{8810:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>r,contentTitle:()=>l,default:()=>p,frontMatter:()=>s,metadata:()=>o,toc:()=>c});var t=i(5893),a=i(1151);const s={title:"How to build Wayang",sidebar_position:1,id:"installation"},l="Compiling Apache Wayang",o={id:"guide/installation",title:"How to build Wayang",description:"\x3c!--",source:"@site/docs/guide/installation.md",sourceDirName:"guide",slug:"/guide/installation",permalink:"/docs/guide/installation",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{title:"How to build Wayang",sidebar_position:1,id:"installation"},sidebar:"guideSidebar",next:{title:"Getting started",permalink:"/docs/guide/getting-started"}},r={},c=[];function d(e){const n={code:"code",h1:"h1",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"compiling-apache-wayang",children:"Compiling Apache Wayang"}),"\n",(0,t.jsx)(n.p,{children:"Apache Wayang (incubating) has different dependencies, for compiling, it needs to add some profile in the compilation to enable maven works properly."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"mvn clean compile\n"})}),"\n",(0,t.jsx)(n.p,{children:"The line before is because the plugin the Antlr is not needed in all the modules, as well it has happened with Scala language."}),"\n",(0,t.jsx)(n.p,{children:"When maven compiles one or more modules using those plugins in the compilation time, it needs to add."}),"\n",(0,t.jsx)(n.p,{children:"The modules are:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"wayang-api-scala-java"}),"\n",(0,t.jsx)(n.li,{children:"wayang-core (Antlr)"}),"\n",(0,t.jsx)(n.li,{children:"wayang-iejoin"}),"\n",(0,t.jsx)(n.li,{children:"wayang-spark"}),"\n",(0,t.jsx)(n.li,{children:"wayang-profiler"}),"\n",(0,t.jsx)(n.li,{children:"wayang-tests-integration"}),"\n"]}),"\n",(0,t.jsx)(n.h1,{id:"executing-coverage",children:"Executing Coverage"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"mvn clean verify jacoco:report\n"})}),"\n",(0,t.jsxs)(n.p,{children:["the final report is placed on ",(0,t.jsx)(n.code,{children:"./target/aggregate.exec/aggregate.exec"})]})]})}function p(e={}){const{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>o,a:()=>l});var t=i(7294);const a={},s=t.createContext(a);function l(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:l(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);