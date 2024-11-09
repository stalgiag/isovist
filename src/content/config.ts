import { z, defineCollection } from 'astro:content';

const projectCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    featuredImage: image().refine((img) => img.width >= 3, {
      message: "Featured image must be at least 3 pixels wide!",
    }),
    featuredImageAlt: z.string(),
    tags: z.array(z.string()),
    thumbnail: image().refine((img) => img.width >= 3, {
      message: "Thumbnail must be at least 3 pixels wide!",
    }),
    thumbnailAlt: z.string(),
  }),
});


export const collections = {
  'projects': projectCollection,
};