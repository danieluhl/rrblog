import type { Config } from "@react-router/dev/config";
import { getPosts } from "./utils/get-posts.server";

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
