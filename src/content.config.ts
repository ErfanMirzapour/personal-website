import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z
    .object({
      title: z.string().min(1),
      description: z.string().min(1),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      draft: z.boolean().default(true),
    })
    .refine((post) => !post.updatedDate || post.updatedDate >= post.pubDate, {
      message: 'updatedDate must not precede pubDate',
    }),
});
export const collections = { blog };
