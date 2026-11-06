// All the text, links and lists on the website live in this one file.
// Edit a value, save, and the page updates. `bun run check` catches typos
// such as a missing field or a badly formatted date.
import type { ImageMetadata } from 'astro';
import portraitImage from './assets/images/erfan-portrait.webp';

// To change the photo, put the new file in src/assets/images/ and update the
// import above.

export const profile = {
  name: 'Erfan Mirzapour',
  title: 'Senior Software Engineer (Web Platform)',
  location: 'Tehran, Iran',
  intro:
    'I build web products that feel fast, work for everyone, and stay easy to change.',
  // Each string is one paragraph. They light up word by word as you scroll.
  summary: [
    'I’m a Software Engineer in Tehran. Since 2019 I’ve worked on travel booking, fintech, health apps and dashboards, mostly on the parts people actually feel: speed, accessibility, and interfaces that make sense the first time.',
    'Away from the keyboard I train calisthenics, play football, watch movies, play video games, and usually have something new I’m learning.',
  ],
  portrait: portraitImage as ImageMetadata,
  // Shown in the browser tab and search results. Keep the description under 160 characters.
  seoTitle: 'Erfan Mirzapour — Senior Software Engineer',
  description:
    'I\'m a Senior Software Engineer in Tehran who builds fast, accessible web products.',
};

export const contact = {
  heading: 'Say hello',
  lead: 'Telegram is where I reply fastest, usually the same day. Email works well for anything longer or formal.',
  // Labels for the two buttons under your name.
  primaryCta: 'Message me on Telegram',
  secondaryCta: 'Send an email',
  telegramUrl: 'https://t.me/ErfanM96',
  telegramHandle: '@ErfanM96',
  email: 'erfanmirzapour1@gmail.com',
  // Footer icons.
  linkedin: 'https://www.linkedin.com/in/erfanmirzapour/',
  github: 'https://github.com/ErfanMirzapour',
  instagram: 'https://www.instagram.com/erfan_m96x/',
};

export const skills = {
  heading: 'Skills',
  lead: 'These are the pieces everything I build is made from.',
  // Skills orbiting your photo, split evenly across three orbits.
  // `desktop` is for wide screens (around 12-15 looks best). `mobile` is for
  // phones, where the atom is smaller: keep it short, around 8.
  orbit: {
    desktop: [
      'TypeScript',
      'React',
      'Vue',
      'Astro',
      'Node.js',
      'Bun',
      'Golang',
      'Python',
      'Docker',
      'Technical Leadership',
      'System Design',
      'Auth',
      'Databases',
      'CI/CD',
      'Mentoring',
    ],
    mobile: [
      'TypeScript',
      'React',
      'Vue',
      'Astro',
      'Node.js',
      'Golang',
      'Python',
      'Technical Leadership',
      'Databases',
      'CI/CD',
    ],
  },
  // Skill groups. Each one gets its own colour automatically. `symbol` is the
  // short code shown on the tile (up to 4 characters).
  groups: [
    {
      name: 'The Web Platform',
      items: [
        { name: 'HTML', symbol: 'Ht' },
        { name: 'CSS', symbol: 'Cs' },
        { name: 'JavaScript', symbol: 'Js' },
        { name: 'Web APIs', symbol: 'Wa' },
        { name: 'Responsive Development', symbol: 'Rd' },
        { name: 'Cross-browser Compatibility', symbol: 'Cc' },
        { name: 'Site Performance', symbol: 'Sp' },
        { name: 'Web Accessibility', symbol: 'Wa' },
        { name: 'PWAs', symbol: 'Pw' },
      ],
    },
    {
      name: 'Langs & Runtimes',
      items: [
        { name: 'TypeScript', symbol: 'Ts' },
        { name: 'Node', symbol: 'Nd' },
        { name: 'Bun', symbol: 'Bn' },
        { name: 'Golang', symbol: 'Go' },
        { name: 'Python', symbol: 'Py' },
        { name: 'PHP', symbol: 'Ph' },
      ],
    },
    {
      name: 'Frameworks',
      items: [
        { name: 'React', symbol: 'Rc' },
        { name: 'Vue', symbol: 'Vu' },
        { name: 'Svelte', symbol: 'Sv' },
        { name: 'Angular', symbol: 'Ng' },
        { name: 'Solid', symbol: 'Sl' },
        { name: 'HTMX', symbol: 'Hx' },
      ],
    },
    {
      name: 'App Frameworks',
      items: [
        { name: 'Astro', symbol: 'As' },
        { name: 'Next.js', symbol: 'Nx' },
        { name: 'Tanstack Start', symbol: 'Ts' },
        { name: 'Nuxt', symbol: 'Nu' },
        { name: 'Remix', symbol: 'Rx' },
      ],
    },
    {
      name: 'Tooling',
      items: [
        { name: 'Vite Plus', symbol: 'Vp' },
        { name: 'PNPM', symbol: 'Pn' },
        { name: 'Tailwind CSS', symbol: 'Tw' },
        { name: 'shadcn/ui', symbol: 'Sh' },
        { name: 'Turborepo', symbol: 'Tr' },
      ],
    },
    {
      name: 'Back-end',
      items: [
        { name: 'System Design', symbol: 'Sd' },
        { name: 'Microservices', symbol: 'Ms' },
        { name: 'Background Jobs', symbol: 'Bj' },
        { name: 'Caching Strategies', symbol: 'Cs' },
        { name: 'OpenTelemtry', symbol: 'Ot' },
        { name: 'API Development', symbol: 'Ad' },
        { name: 'Auth', symbol: 'At' },
        { name: 'Security', symbol: 'Sc' },
      ],
    },
    {
      name: 'Infra',
      items: [
        { name: 'CI/CD', symbol: 'Ci' },
        { name: 'Nginx', symbol: 'Nx' },
        { name: 'Docker', symbol: 'Dc' },
        { name: 'Cloudflare', symbol: 'Cf' },
      ],
    },
    {
      name: 'Databases',
      items: [
        { name: 'PostgreSQL', symbol: 'Pg' },
        { name: 'MongoDB', symbol: 'Mg' },
        { name: 'Redis', symbol: 'Rd' },
        { name: 'SQLite', symbol: 'Sq' },
      ],
    },
    {
      name: 'Testing',
      items: [
        { name: 'Vitest', symbol: 'Vt' },
        { name: 'Testing Library', symbol: 'Tl' },
        { name: 'Playwright', symbol: 'Pw' },
        { name: 'Storybook', symbol: 'Sb' },
      ],
    },
  ],
};

type Month =
  | 'Jan'
  | 'Feb'
  | 'Mar'
  | 'Apr'
  | 'May'
  | 'Jun'
  | 'Jul'
  | 'Aug'
  | 'Sep'
  | 'Oct'
  | 'Nov'
  | 'Dec';
type MonthYear = `${Month} ${number}`;

export const career = {
  heading: 'Career',
  lead: 'Seven years, from the first freelance job to now.',
  // Newest first. The first job gets the glowing marker. Dates look like 'Jul 2025'.
  // Each line in `points` shows as one bullet.
  jobs: [
    {
      company: 'OMPFinex',
      role: 'Senior Front-end Engineer',
      start: 'Jul 2025',
      end: 'Sep 2026',
      points: [
        'Developed new features for the core crypto exchange platform and public website.',
        'Built an internal customer relationship management (CRM) application.',
      ],
    },
    {
      company: 'Independent',
      role: 'Senior Software Engineer',
      start: 'Jun 2023',
      end: 'Dec 2024',
      points: [
        'Worked on several projects.',
        'Technologies: React, Next, Typescript, Vite, Vue, Node, Postgre, Mongo.'
      ],
    },
    {
      company: 'Alibaba Travels Co.',
      role: 'Senior Front-end Developer',
      start: 'Jun 2021',
      end: 'Apr 2023',
      points: [
        'Built shared front-end infrastructure and developer tooling as part of the front-end core team.',
        'Built and launched the web interface for Alibaba Plus.',
        'Developed the front-end for the initial launch of the accommodation service.',
      ],
    },
    {
      company: 'TiSS',
      role: 'Front-end Team Lead',
      start: 'Aug 2020',
      end: 'May 2021',
      points: [
        'Added performance optimizations.',
        'Refactored and restructured the codebase.',
        'Shortened release cycles by adding integration and end-to-end tests using Jest, Testing Library, and Cypress.',
      ],
    },
    {
      company: 'Erfan Salamat Health Service',
      role: 'Senior Front-end Developer',
      start: 'Jan 2020',
      end: 'Sep 2020',
      points: [
        'Designed the client-side architecture of two progressive web apps (PWAs) and contributed to their development.',
        'Rebuilt Erfan Salamat\'s back-office admin panel.',
      ],
    },
    {
      company: 'DAAP',
      role: 'Front-end Developer',
      start: 'Jun 2019',
      end: 'Jan 2020',
      points: [
        'Developed a back-office admin panel using React and Redux.',
        'Other projects: simple GIS web app, landing website.',
      ],
    },
    {
      company: 'Nahira',
      role: 'Entry-level Front-end Developer',
      start: 'Jan 2019',
      end: 'Jul 2019',
      points: ['Where it started: junior work across several client projects.'],
    },
  ] satisfies {
    company: string;
    role: string;
    start: MonthYear;
    end: MonthYear;
    points: string[];
  }[],
  education: {
    heading: 'Education',
    degree: 'Bachelor in Software Engineering',
    school: 'K. N. Toosi University of Technology',
  },
};
