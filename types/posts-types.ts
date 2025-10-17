import { z } from "zod";

export const tags = [
  "coding",
  "philosophy",
  "productivity",
  "life",
  "products",
  "design",
] as const;

export const TagsSchema = z
  .enum(tags)
  .array()
  .refine(
    (items) => {
      const uniqueItems = new Set(items);
      return uniqueItems.size === items.length;
    },
    {
      message: "Error: duplicate tag found on one post",
    },
  );

export type Tags = z.infer<typeof TagsSchema>;

export const PostMetaSchema = z.object({
  title: z.string(),
  description: z.string(),
  updateDate: z.date(),
  tags: TagsSchema,
});

export type PostMeta = z.infer<typeof PostMetaSchema>;
