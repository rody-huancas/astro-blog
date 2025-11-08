import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  type  : "content",
  schema: ({ image }) => z.object({
    title      : z.string(),
    date       : z.date(),
    description: z.string(),
    image      : image().refine((img) => {
      if (!img || typeof img.width !== "number") return true;
      return img.width < 1200;
    }, {
      message: "La imagen debe tener un ancho menor a 1200 píxeles.",
    }),
    // relación
    author: z.string(),
    // relación
    tags: z.array(z.string()),
  }),
});

export const collections = {
  blog: blogCollection,
};
