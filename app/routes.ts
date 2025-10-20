import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("post/:slug", "routes/post.tsx"),
  route("posts", "routes/posts.tsx"),
] satisfies RouteConfig;
