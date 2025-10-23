import { existsSync, readdirSync, readFileSync } from "node:fs";
import { extname, join } from "node:path";
import matter from "gray-matter";
import { type PostMeta, PostMetaSchema } from "../types/posts-types";

const devPostsDirectory = join(process.cwd(), "app/content");
const prodPostsDirectory = join(process.cwd(), "content");

const postsDirectory = existsSync(devPostsDirectory)
  ? devPostsDirectory
  : prodPostsDirectory;
const postFileExtensions = [".md"];

// const postsCache: Post[] = [];

export function getPosts(dir: string = postsDirectory) {
  // if (postsCache.length > 0) {
  //   return postsCache;
  // }
  // paths relative to the app/content directory
  const filePaths = getAllFileNames(dir, postFileExtensions);
  const posts = filePaths.map(getPostByFileName).sort((a, b) => {
    return b.pubDatetime.getTime() - a.pubDatetime.getTime();
  });
  return posts;
}

function getAllFileNames(dir: string, extensions: string[]) {
  return readdirSync(dir, { recursive: true, encoding: "utf8" })
    .filter((file) => extensions.includes(extname(file)))
    .map((file) => join(dir, file));
}

type Post = PostMeta & {
  content: string;
  slug: string;
};

function getPostByFileName(fileName: string): Post {
  const source = readFileSync(fileName, "utf8");
  const { data, content } = matter(source);

  const result = PostMetaSchema.safeParse(data);

  if (result?.error?.issues && result.error.issues.length > 0) {
    throw new Error(
      `Error parsing post metadata for ${fileName}: ${JSON.stringify(
        result.error.issues.map((i) => `${i.path} :: ${i.message}`),
        null,
        " ",
      )}`,
    );
  }

  // this should never happen but needed for typescript to be happy
  if (!result.data) {
    throw new Error(`Error parsing post metadata for ${fileName}`);
  }

  const items = result.data;

  return {
    slug: items.title.toLowerCase().replaceAll(" ", "-"),
    content,
    ...items,
  };
}

export function getPostBySlug(slug: string): {
  prevPost: Post | undefined;
  post: Post;
  nextPost: Post | undefined;
} {
  const posts = getPosts();
  const postIndex = posts.findIndex((post) => post.slug === slug);
  if (postIndex === -1) {
    throw new Error(`Post with slug "${slug}" not found`);
  }
  return {
    prevPost: posts[postIndex - 1],
    post: posts[postIndex],
    nextPost: posts[postIndex + 1],
  };
}
