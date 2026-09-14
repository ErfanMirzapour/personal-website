import publication from './publication.json';
export const designs = [
  {
    id: 'editorial',
    name: 'Editorial',
    number: '01',
    description:
      'A considered reading experience. Serif headlines, generous margins, and a quiet blue accent.',
    detail: 'TYPE-LED / AIRY / TIMELESS',
  },
  {
    id: 'swiss',
    name: 'Swiss grid',
    number: '02',
    description:
      'A confident, structured portfolio. Oversized type, sharp divisions, and a vivid red signature.',
    detail: 'PRECISE / BOLD / STRUCTURED',
  },
  {
    id: 'notebook',
    name: 'Developer notebook',
    number: '03',
    description:
      'An engineer’s open notebook. A persistent index, monospace details, and purposeful annotations.',
    detail: 'TECHNICAL / ORDERED / DIRECT',
  },
  {
    id: 'dark',
    name: 'Quiet dark',
    number: '04',
    description:
      'A restrained night-time surface. Spacious composition, silver typography, and electric blue.',
    detail: 'DARK / FOCUSED / CONTEMPORARY',
  },
  {
    id: 'journal',
    name: 'Personal journal',
    number: '05',
    description:
      'A more personal introduction. Warm paper, literary type, and a green editorial rhythm.',
    detail: 'PERSONAL / LITERARY / RELAXED',
  },
] as const;
export type Design = (typeof designs)[number]['id'];
// Set only after Erfan chooses a design. The release command refuses an unset choice.
const choice = publication.design as string | null;
if (choice !== null && !designs.some((design) => design.id === choice)) {
  throw new Error('Unknown publication design');
}
export const selectedDesign = choice as Design | null;
export const fallbackDesign: Design = 'editorial';
