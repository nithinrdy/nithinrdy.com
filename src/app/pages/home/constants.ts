import { JobExperience } from './work-section/job-experience/job-experience.model';
import type { Project } from './work-section/project-card/project.model';

export const EXPERIENCES: JobExperience[] = [
  {
    orgName: 'BuildShip',
    url: 'https://buildship.com',
    role: 'Software Engineer',
    startMonth: 10,
    startYear: 2023,
    endMonth: undefined,
    endYear: undefined,
    description: [
      [
        {
          text: 'Migrated the core project to a Turborepo-managed monorepo with multiple apps & packages (shared UI components, Tailwind config and icons as packages consumed by Vite and NextJS apps), with ',
        },
        {
          text: 'clean HMR across packages',
          href: 'https://nithinrdy.hashnode.dev/avoid-repeatedly-building-internal-packages-in-a-nodejs-monorepo-during-development',
        },
        {
          text: "when making changes."
        }
      ],
      [
        {
          text: 'Built Global Search using Meilisearch (served from a GCP VM), indexing a total of 16,000 documents with periodic syncs via CRON and access controlled using tenant-tokens.',
        },
      ],
      [
        {
          text: 'Built the fully-responsive public-facing BuildShip Templates & Nodes explorer NextJS app from scratch, leveraging ISR and using Tailwind for styling (perfect score on 3/4 Lighthouse categories with a 98 on accessibility).',
        },
      ],
      [
        {
          text: "Improved the app's lazy-loading, bundling, and chunking strategies, and reduced the built entrypoint size by ~48% (FCP down by 1.1s, blocking time down by 1.2s, among other improvements).",
        },
      ],
      [
        {
          text: "Built a file-explorer style interface over Google Cloud Storage's flat namespace with core file operations. Created APIs using Multer for file uploads on Cloud Run instances (with form-parsing, per-execution-isolated storage and post-execution cleanup).",
        },
      ],
    ],
    tools: [
      'TypeScript',
      'ReactJS',
      'Jotai',
      'Material UI',
      'Firestore',
      'NextJS',
      'GCP',
      'Meilisearch',
      'GitHub Actions',
    ],
  },
  {
    orgName: 'Zenskar',
    url: 'https://zenskar.com',
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
    name: 'AudioPass',
    description:
      'Open source multi-threaded Linux desktop app that lets you play local audio through a virtual mic. UI and audio processing handled by separate dedicated threads communicating via MPSC and PipeWire channels.',
    logo: 'assets/audiopass.png',
    links: [
      {
        platform: 'github',
        href: 'https://github.com/nithinrdy/audiopass',
      },
    ],
    tech: ['Rust', 'egui', 'PipeWire'],
  },
  {
    name: 'Open Preview Peek',
    description:
      "Open source browser extension that lets you view how a webpage's Open Graph and Twitter metadata would be displayed when links to the page are posted on social media platforms and messaging apps. Meant to help with web development and debugging, ideal for use when developing web apps locally.",
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
  {
    name: 'GSoC 2022 with Oppia',
    description: `Worked on Oppia's web platform as part of Google Summer of Code 2022. Created mocks in Figma, built custom SVG animations and other components from scratch -- aimed at adding to the learners' experience. Also put in place unit and E2E tests (using Jasmine and Protractor).\n\nIs 2022 too long ago? Maybe. But this was the first time I built something used by real people, so here it is.`,
    logo: 'https://developers.google.com/open-source/gsoc/resources/downloads/GSoC-icon-192.png',
    links: [
      {
        platform: 'code',
        href: 'https://summerofcode.withgoogle.com/archive/2022/projects/5XM0ONH7',
      },
    ],
    tech: ['TypeScript', 'Angular', 'Python', 'Jasmine', 'Protractor', 'Figma'],
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
