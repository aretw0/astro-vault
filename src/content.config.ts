import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const content = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/" }),
  schema: z.object({
    title: z.string().optional(),
  }),
});

export const collections = {
  content,
};
