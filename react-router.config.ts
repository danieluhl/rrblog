import type { Config } from "@react-router/dev/config";
import { getPosts } from "./scripts/get-posts";

export default {
  ssr: true,
  async prerender() {
    const posts = getPosts();
    return posts.map((post) => `/post/${post.slug}`);
  },
  future: {
    unstable_viteEnvironmentApi: true,
  },
} satisfies Config;
