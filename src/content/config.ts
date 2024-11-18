import { z, defineCollection } from 'astro:content';

export const SPOTLIGHTS = {
  INVERSE: 'inverse',
  NORMAL: 'normal',
}

const projectCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    order: z.number(),
    title: z.string(),
    video: z.string().optional(),
    videos: z.array(z.string()).optional(),
    image: image().optional(),
    spotlight: z.enum([SPOTLIGHTS.INVERSE, SPOTLIGHTS.NORMAL]).optional(),
    tags: z.array(z.string()).optional(),
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