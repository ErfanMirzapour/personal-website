export const site = {
  url: 'https://erfanmirzapour.ir',
  name: 'Erfan Mirzapour',
  title: 'Senior Frontend Engineer',
  location: 'Tehran, Iran',
  email: 'erfanmirzapour1@gmail.com',
  telegram: 'https://t.me/ErfanM96',
  telegramHandle: '@ErfanM96',
  linkedin: 'https://www.linkedin.com/in/erfanmirzapour/',
  github: 'https://github.com/ErfanMirzapour',
  instagram: 'https://www.instagram.com/erfan_m96x/',
  description:
    'Erfan Mirzapour is a senior frontend engineer in Tehran who builds fast, accessible web products. Open to full-time opportunities.',
  intro:
    'I build web products that feel fast, work for everyone, and stay easy to change.',
  summary: [
    'I’m a frontend engineer in Tehran. Since 2019 I’ve worked on travel booking, fintech, health apps and dashboards, mostly on the parts people actually feel: speed, accessibility, and interfaces that make sense the first time.',
    'Away from the keyboard I train calisthenics, watch football and too many films, and usually have something new I’m learning.',
  ],
  availability: 'Open to full-time roles',
};

export const socials = [
  { name: 'LinkedIn', href: site.linkedin },
  { name: 'GitHub', href: site.github },
  { name: 'Telegram', href: site.telegram },
  { name: 'Instagram', href: site.instagram },
];

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
    name: 'Frameworks',
    items: ['React', 'Svelte', 'Angular', 'Vue', 'Solid', 'HTMX'],
  },
  {
    name: 'Tooling',
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
    name: 'Backend & data',
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
    name: 'Testing',
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

export const experience = [
  {
    company: 'OMPFinex',
    role: 'Senior Frontend Engineer',
    start: 'Jul 2025',
    end: 'Sep 2026',
    summary:
      'Shipped product features and landing pages, built a CRM panel, and brought AI tools into the team’s workflow.',
  },
  {
    company: 'Independent',
    role: 'Freelance Software Engineer',
    start: 'Jun 2023',
    end: 'Dec 2024',
    summary:
      'Frontend and backend work for an eyewear shop, an energy dashboard, and an online payment service.',
  },
  {
    company: 'Alibaba Travels',
    role: 'Senior Frontend Developer',
    start: 'Jun 2021',
    end: 'Apr 2023',
    summary:
      'On the frontend core team: shared infrastructure for other teams, and the web launch of Alibaba Plus.',
  },
  {
    company: 'TiSS',
    role: 'Senior Frontend Developer',
    start: 'Aug 2020',
    end: 'May 2021',
    summary:
      'Made the app faster, restructured the codebase, and added integration and end-to-end tests.',
  },
  {
    company: 'Erfan Salamat Health Service',
    role: 'Frontend Developer',
    start: 'Jan 2020',
    end: 'Sep 2020',
    summary:
      'Designed the client architecture for two PWAs and rebuilt the admin panel.',
  },
  {
    company: 'DAAP',
    role: 'Frontend Developer',
    start: 'Jun 2019',
    end: 'Jan 2020',
    summary:
      'A React and Redux admin panel, a map interface for marketers, and the landing site.',
  },
  {
    company: 'Nahira',
    role: 'Freelance Frontend Developer',
    start: 'Jan 2019',
    end: 'Jul 2019',
    summary: 'Where it started: junior work across several client projects.',
  },
];

export const education = {
  degree: 'B.E. in Software Engineering',
  school: 'K. N. Toosi University of Technology',
};

export const year = (date: string) => date.slice(-4);
