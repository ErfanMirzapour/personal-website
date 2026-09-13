import { getCollection } from 'astro:content';
export async function getPublishedPosts() {
  return (
    await getCollection(
      'blog',
      ({ data }) => !data.draft && data.pubDate <= new Date(),
    )
  ).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
