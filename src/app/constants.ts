import { JobExperience } from './work-section/job-experience/job-experience.model';
import type { Project } from './work-section/project-card/project.model';

export const EXPERIENCES: JobExperience[] = [
  {
    orgName: 'BuildShip',
    orgLogo: 'assets/buildship.png',
    role: 'Software Engineer',
    startMonth: 10,
    startYear: 2023,
    endMonth: undefined,
    endYear: undefined,
    description: [
      [
        {
          text: 'Converted the core project into a Turborepo-managed monorepo with multiple apps & packages, with local HMR across packages -- ',
        },
        {
          text: "here's how!",
          href: 'https://nithinrdy.com', // TODO: Change this.
        },
      ],
      [
        {
          text: 'Built Global Search using Meilisearch (instance deployed to a GCP VM), with periodic syncs via CRON and access controlled using tenant-tokens.',
        },
      ],
      [
        {
          text: 'Built the BuildShip Templates & Nodes explorer NextJS app, leveraging SSR and using Tailwind for styling.',
        },
      ],
      [
        {
          text: "Improved the app's lazy-loading, bundling, and chunking strategies, and reduced the built entrypoint size by ~48%.",
        },
      ],
      [
        {
          text: "Built a file-explorer style Interface over Google Cloud Storage's flat namespace, supporting core file operations.",
        },
      ],
    ],
    tools: [
      'TypeScript',
      'ReactJS',
      'Jotai',
      'Firestore',
      'NextJS',
      'GCP',
      'Meilisearch',
      'GitHub Actions',
    ],
  },
  {
    orgName: 'Zenskar',
    orgLogo: 'assets/zenskar.jpeg',
    role: 'Engineering Intern',
    startMonth: 3,
    startYear: 2023,
    endMonth: 9,
    endYear: 2023,
    description: [
      [
        {
          text: 'Built several user-facing pages and components from scratch and helped set up a standardized design language integrated with Storybook.',
        },
      ],
      [
        {
          text: 'Set up Vitest, optimized the Cypress test suite (to cut memory usage by 13%, CPU usage by 75%, and run duration from ~9 minutes to ~3.5 minutes) and wired everything up to GitHub Actions.',
        },
      ],
    ],
    tools: ['TypeScript', 'ReactJS', 'Tailwind', 'RecoilJS', 'Cypress', 'Vitest', 'Storybook'],
  },
];

export const PROJECTS = [
  {
    name: 'Open Preview Peek',
    description:
      "A browser extension that lets you quickly check how a webpage's Open Graph and Twitter metadata would be displayed when links to the page are posted on various social media platforms and messaging apps. Meant to help with web development and debugging, ideal for use when developing web apps locally.",
    logo: 'assets/open-preview-peek.png',
    links: [
      {
        platform: 'chromewebstore',
        href: 'https://chromewebstore.google.com/detail/open-preview-peek/kdohpaiabbmiljbhmhfjkgmienocieml',
      },
      {
        platform: 'github',
        href: 'https://github.com/nithinrdy/open-preview-peek',
      },
    ],
    tech: ['TypeScript', 'ReactJS', 'Tailwind', 'Open Graph', 'Web Extension APIs'],
  },
] satisfies Project[];

export const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
