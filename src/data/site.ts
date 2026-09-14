export const site = {
  url: 'https://erfanmirzapour.ir',
  name: 'Erfan Mirzapour',
  title: 'Senior Frontend Engineer',
  email: 'erfanmirzapour1@gmail.com',
  linkedin: 'https://www.linkedin.com/in/erfanmirzapour/',
  github: 'https://github.com/ErfanMirzapour',
  telegram: 'https://t.me/ErfanM96',
  instagram: 'https://www.instagram.com/erfan_m96x/',
  description:
    'Erfan Mirzapour is a senior frontend engineer focused on performance, accessibility, and maintainable web experiences. Open to full-time opportunities.',
  intro:
    'I build thoughtful web experiences with a focus on performance, accessibility, and maintainable architecture.',
  about:
    'I’m a frontend engineer based in Tehran, with a foundation in software engineering and experience across product teams, platform work, and freelance projects. I work across the web stack, connecting careful interface development with the systems behind it.',
  availability: 'Open to full-time opportunities',
};
export const skills = [
  {
    name: 'The web platform',
    items: [
      'JavaScript',
      'TypeScript',
      'Accessibility',
      'Responsive design',
      'Performance',
    ],
  },
  {
    name: 'Interfaces & frameworks',
    items: ['React', 'Svelte', 'Angular', 'Vue', 'Solid', 'HTMX'],
  },
  {
    name: 'Application & tooling',
    items: [
      'Astro',
      'Next.js',
      'Nuxt',
      'Remix',
      'Vite',
      'Tailwind CSS',
      'shadcn/ui',
    ],
  },
  {
    name: 'Beyond the browser',
    items: [
      'Node.js',
      'Bun',
      'Deno',
      'PostgreSQL',
      'SQLite',
      'MongoDB',
      'Prisma',
      'Drizzle',
    ],
  },
  {
    name: 'Quality & testing',
    items: [
      'Vitest',
      'Jest',
      'Testing Library',
      'Playwright',
      'Cypress',
      'Storybook',
    ],
  },
];

export const technologyColors: Record<
  string,
  { background: string; color: string }
> = {
  JavaScript: { background: '#f7df1e', color: '#171717' },
  TypeScript: { background: '#3178c6', color: '#ffffff' },
  React: { background: '#61dafb', color: '#10252b' },
  Svelte: { background: '#ff3e00', color: '#1d0902' },
  Angular: { background: '#dd0031', color: '#ffffff' },
  Vue: { background: '#42b883', color: '#10251c' },
  Solid: { background: '#446b9e', color: '#ffffff' },
  Astro: { background: '#ff5d01', color: '#241004' },
  'Next.js': { background: '#000000', color: '#ffffff' },
  Nuxt: { background: '#00dc82', color: '#08271b' },
  Remix: { background: '#000000', color: '#ffffff' },
  Vite: { background: '#646cff', color: '#101127' },
  'Tailwind CSS': { background: '#38bdf8', color: '#082f49' },
  'shadcn/ui': { background: '#18181b', color: '#ffffff' },
  'Node.js': { background: '#339933', color: '#071807' },
  Bun: { background: '#fbf0df', color: '#26221c' },
  Deno: { background: '#000000', color: '#ffffff' },
  PostgreSQL: { background: '#4169e1', color: '#ffffff' },
  SQLite: { background: '#0f5b78', color: '#ffffff' },
  MongoDB: { background: '#47a248', color: '#071607' },
  Prisma: { background: '#2d3748', color: '#ffffff' },
  Vitest: { background: '#729b1b', color: '#101804' },
  Jest: { background: '#c21325', color: '#ffffff' },
  Cypress: { background: '#1b1e2e', color: '#ffffff' },
  Storybook: { background: '#ff4785', color: '#2b0715' },
};
export const strengths = [
  {
    title: 'Working across teams',
    text: 'Contributed to shared infrastructure and foundational tools for other frontend teams at Alibaba Travels.',
  },
  {
    title: 'Improving how we work',
    text: 'Introduced AI tools into the development workflow at OMPFinex and added integration and end-to-end tests at TiSS.',
  },
  {
    title: 'From idea to delivery',
    text: 'Delivered features, landing pages, and a CRM panel, with experience contributing to both frontend and backend work.',
  },
];
export const experience = [
  {
    company: 'OMPFinex',
    role: 'Senior Frontend Engineer',
    start: 'Jul 2025',
    end: 'Sep 2026',
    points: [
      'Delivered new product features and landing pages.',
      'Refactored frontend code and improved application performance.',
      'Built a CRM panel and integrated AI tools into the development workflow.',
    ],
    tech: 'Astro · Svelte · Angular · React · TypeScript',
  },
  {
    company: 'Independent',
    role: 'Freelance Software Engineer',
    start: 'Jun 2023',
    end: 'Dec 2024',
    points: [
      'Contributed to frontend and backend development for an online glasses shop, an energy visualization dashboard, and an online payment service.',
    ],
    tech: 'React · Next.js · Vue · Node.js · TypeScript',
  },
  {
    company: 'Alibaba Travels',
    role: 'Senior Frontend Developer',
    start: 'Jun 2021',
    end: 'Apr 2023',
    points: [
      'Worked on shared infrastructure and base tools as part of the frontend core team.',
      'Built and launched the web experience for Alibaba Plus and contributed to the initial accommodation service.',
    ],
    tech: '',
  },
  {
    company: 'TiSS',
    role: 'Senior Frontend Developer',
    start: 'Aug 2020',
    end: 'May 2021',
    points: [
      'Optimized performance and restructured the codebase.',
      'Added integration and end-to-end tests to improve the release process.',
    ],
    tech: '',
  },
  {
    company: 'Erfan Salamat Health Service',
    role: 'Frontend Developer',
    start: 'Jan 2020',
    end: 'Sep 2020',
    points: [
      'Designed client-side architecture for two PWAs and participated in development.',
      'Rebuilt the back-office admin panel.',
    ],
    tech: '',
  },
  {
    company: 'DAAP',
    role: 'Frontend Developer',
    start: 'Jun 2019',
    end: 'Jan 2020',
    points: [
      'Built a React and Redux admin panel, a GIS interface for marketers, and the app’s landing website.',
    ],
    tech: '',
  },
  {
    company: 'Nahira',
    role: 'Freelance Frontend Developer',
    start: 'Jan 2019',
    end: 'Jul 2019',
    points: [
      'Contributed to multiple projects as a junior frontend developer.',
    ],
    tech: '',
  },
];
export const interests = [
  'Movies',
  'Calisthenics',
  'Learning',
  'Gaming',
  'Football',
  'Travel',
];
