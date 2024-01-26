import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '199'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '7dc'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'f68'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', '81d'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '24d'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '2c2'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '53d'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog', '3e9'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', 'fd9'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', '2e9'),
    exact: true
  },
  {
    path: '/blog/tags/wayang',
    component: ComponentCreator('/blog/tags/wayang', '296'),
    exact: true
  },
  {
    path: '/blog/website_update',
    component: ComponentCreator('/blog/website_update', 'f57'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '7ab'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '13f'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '8dd'),
            routes: [
              {
                path: '/docs/community/mailinglist',
                component: ComponentCreator('/docs/community/mailinglist', '510'),
                exact: true,
                sidebar: "communitySidebar"
              },
              {
                path: '/docs/community/repositories',
                component: ComponentCreator('/docs/community/repositories', 'b99'),
                exact: true,
                sidebar: "communitySidebar"
              },
              {
                path: '/docs/community/team',
                component: ComponentCreator('/docs/community/team', 'a18'),
                exact: true,
                sidebar: "communitySidebar"
              },
              {
                path: '/docs/guide/code-with-wayang',
                component: ComponentCreator('/docs/guide/code-with-wayang', 'fd2'),
                exact: true,
                sidebar: "guideSidebar"
              },
              {
                path: '/docs/guide/development',
                component: ComponentCreator('/docs/guide/development', '655'),
                exact: true,
                sidebar: "guideSidebar"
              },
              {
                path: '/docs/introduction/about',
                component: ComponentCreator('/docs/introduction/about', '4c3'),
                exact: true,
                sidebar: "introductionSidebar"
              },
              {
                path: '/docs/introduction/benchmark',
                component: ComponentCreator('/docs/introduction/benchmark', '613'),
                exact: true,
                sidebar: "introductionSidebar"
              },
              {
                path: '/docs/introduction/features',
                component: ComponentCreator('/docs/introduction/features', 'f48'),
                exact: true,
                sidebar: "introductionSidebar"
              },
              {
                path: '/docs/start/download',
                component: ComponentCreator('/docs/start/download', '667'),
                exact: true,
                sidebar: "startSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '42f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
