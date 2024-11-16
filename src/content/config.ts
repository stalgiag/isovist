import { z, defineCollection } from 'astro:content';

const projectCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    video: z.string(),
    tags: z.array(z.string()),
    scale: z.number().optional(),
    offset: z.array(z.number()).optional(),
    thumbnail: image().refine((img) => img.width >= 300, {
      message: "Thumbnail must be at least 300 pixels wide!",
    }),
    thumbnailAlt: z.string(),
  }),
});


export const collections = {
  'projects': projectCollection,
};