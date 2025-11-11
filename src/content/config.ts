import { defineCollection, reference, z } from "astro:content";

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
    // author: z.string(),

    author: reference("author"),

    // relación
    tags: z.array(z.string()),

    isDraft: z.boolean().default(false),
  }),
});

const authorCollection = defineCollection({
  type  : "data",
  schema: ({ image }) => z.object({
    name  : z.string(),
    avatar: image().refine((img) => {
      if (!img || typeof img.width !== "number") return true;
      return img.width < 400;
    }, {
      message: "El avatar debe tener un ancho menor a 400 píxeles.",
    }),
  }),
})

export const collections = {
  blog  : blogCollection,
  author: authorCollection,
};
