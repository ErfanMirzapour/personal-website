// Content lives in src/content.ts. This file only adds site-wide constants.
import { profile } from '../content';
import pkg from '../../package.json';

export { profile, contact, skills, career } from '../content';

export const site = {
  url: 'https://erfanmirzapour.ir',
  name: profile.name,
  title: profile.title,
  description: profile.description,
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// 'Jul 2025' -> '2025-07', for the <time datetime> attribute.
export const isoMonth = (date: string) => {
  const [month, yr] = date.split(' ');
  return `${yr}-${String(months.indexOf(month) + 1).padStart(2, '0')}`;
};

// The site's version comes from package.json and links to its GitHub release.
export const version = {
  number: pkg.version,
  url: `https://github.com/ErfanMirzapour/personal-website/releases/tag/v${pkg.version}`,
};
