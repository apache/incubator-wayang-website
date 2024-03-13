import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Apache Wayang (incubating)',
  tagline: 'Next-Gen Data Platform Integration',
  favicon: 'img/wayang-logo.jpg',

  // Set the production url of your site here
  url: 'https://wayang.apache.org/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: {
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'All our posts',
          showReadingTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [require.resolve('docusaurus-lunr-search')],
  themeConfig: {
    // Replace with your project's social card
    announcementBar: {
      id: 'support_us',
      content:
        '⭐️ If you like Apache Wayang, give it a star on <a target="_blank" href="https://github.com/apache/incubator-wayang">GitHub</a>! ⭐ ',
      backgroundColor: '#fafbfc',
      textColor: '#091E42',
      isCloseable: true,
    },
    navbar: {
      title: '',
      logo: {
        alt: 'Wayang Logo',
        src: 'img/wayang.png',
      },
      items: [
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'tutorialSidebar',
        //   position: 'left',
        //   label: 'Tutorial',
        // },
        {
          type: 'docSidebar',
          sidebarId: 'startSidebar',
          position: 'right',
          label: 'Download',
        },
        {
          type: 'docSidebar',
          sidebarId: 'introductionSidebar',
          position: 'right',
          label: 'About',
        },
        {
          type: 'docSidebar',
          sidebarId: 'guideSidebar',
          position: 'right',
          label: 'Developers',
        },
        {
          type: 'dropdown',
          label: 'Community',
          position: 'right',
          items: [
            {
              label: 'Blog',
              to: '/blog/',
            },
            {
              type: 'docSidebar',
              sidebarId: 'communitySidebar',
              label: 'Project',
            },
          ]
        },
        {
          type: 'dropdown',
          label: 'ASF',
          position: 'right',
          items: [
            {
              label: 'Foundation',
              to: 'https://www.apache.org/'
            },
            {
              label: 'License',
              to: 'https://www.apache.org/licenses/'
            },
            {
              label: 'Events',
              to: 'https://www.apache.org/events/current-event.html'
            },
            {
              label: 'Privacy',
              to: 'https://privacy.apache.org/policies/privacy-policy-public.html'
            },
            {
              label: 'Security',
              to: 'https://www.apache.org/security/'
            },
            {
              label: 'Sponsorship',
              to: 'https://www.apache.org/foundation/sponsorship.html'
            },
            {
              label: 'Thanks',
              to: 'https://www.apache.org/foundation/thanks.html'
            },
            {
              label: 'Code of Conduct',
              to: 'https://www.apache.org/foundation/policies/conduct.html'
            }
          ]
        },
        {
          href: 'https://github.com/apache/incubator-wayang',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Mailing list',
              href: 'https://lists.apache.org/list.html?dev@wayang.apache.org',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/apachewayang',
            },
            {
              label: 'Reddit',
              href: 'https://www.reddit.com/r/ApacheWayang',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/apachewayang',
            },
          ],
        },
        {
          title: 'Docs',
          items: [
            {
              label: 'Install',
              to: '/docs/start/download',
            },
            {
              label: 'Features',
              to: '/docs/introduction/features',
            },
            {
              label: 'Benchmark',
              to: '/docs/introduction/benchmark',
            },
          ],
        },
        {
          title: 'Repositories',
          items: [
            {
              label: 'Wayang',
              href: 'https://github.com/apache/incubator-wayang',
            },
            {
              label: 'Website',
              href: 'https://github.com/apache/incubator-wayang-website',
            },
          ],
        },
      ],
      logo: {
        width: 200,
        src: "/img/apache-incubator.svg",
        href: "https://incubator.apache.org/",
        alt: "Apache Incubator logo"
      },
      copyright: `<div>
      <p> Apache Wayang is an effort undergoing incubation at The Apache Software Foundation (ASF), sponsored by the Apache Incubator. Incubation is required of all newly accepted projects until a further review indicates that the infrastructure, communications, and decision making process have stabilized in a manner consistent with other successful ASF projects. While incubation status is not necessarily a reflection of the completeness or stability of the code, it does indicate that the project has yet to be fully endorsed by the ASF. </p>
      <p>
        Copyright © ${new Date().getFullYear()} The Apache Software Foundation, Licensed under the Apache License, Version 2.0. <br/>
        Apache, the names of Apache projects, and the feather logo are either registered trademarks or trademarks of the Apache Software Foundation in the United States and/or other countries.
      </p>
      </div>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["java", "javascript", "rust", "cpp", "c", "bash", "scala", "python"]
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
