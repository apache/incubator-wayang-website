"use strict";(self.webpackChunkwayang_website=self.webpackChunkwayang_website||[]).push([[608],{3169:(e,a,s)=>{s.r(a),s.d(a,{default:()=>o});s(7294);var t=s(3692),r=s(5999),i=s(1944),n=s(4023),c=s(7955),l=s(5893);function h(e){let{year:a,posts:s}=e;return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(c.Z,{as:"h3",id:a,children:a}),(0,l.jsx)("ul",{children:s.map((e=>(0,l.jsx)("li",{children:(0,l.jsxs)(t.Z,{to:e.metadata.permalink,children:[e.metadata.formattedDate," - ",e.metadata.title]})},e.metadata.date)))})]})}function d(e){let{years:a}=e;return(0,l.jsx)("section",{className:"margin-vert--lg",children:(0,l.jsx)("div",{className:"container",children:(0,l.jsx)("div",{className:"row",children:a.map(((e,a)=>(0,l.jsx)("div",{className:"col col--4 margin-vert--lg",children:(0,l.jsx)(h,{...e})},a)))})})})}function o(e){let{archive:a}=e;const s=(0,r.I)({id:"theme.blog.archive.title",message:"Archive",description:"The page & hero title of the blog archive page"}),t=(0,r.I)({id:"theme.blog.archive.description",message:"Archive",description:"The page & hero description of the blog archive page"}),h=function(e){const a=e.reduce(((e,a)=>{const s=a.metadata.date.split("-")[0],t=e.get(s)??[];return e.set(s,[a,...t])}),new Map);return Array.from(a,(e=>{let[a,s]=e;return{year:a,posts:s}}))}(a.blogPosts);return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(i.d,{title:s,description:t}),(0,l.jsxs)(n.Z,{children:[(0,l.jsx)("header",{className:"hero hero--primary",children:(0,l.jsxs)("div",{className:"container",children:[(0,l.jsx)(c.Z,{as:"h1",className:"hero__title",children:s}),(0,l.jsx)("p",{className:"hero__subtitle",children:t})]})}),(0,l.jsx)("main",{children:h.length>0&&(0,l.jsx)(d,{years:h})})]})]})}}}]);