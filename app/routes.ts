import {
  index,
  layout,
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),
    index("routes/posts.tsx"),
    index("routes/tags.tsx"),
    index("routes/tag.tsx"),
  ]),
  layout("routes/posts/layout.tsx", [route("post/:slug", "routes/post.tsx")]),
] satisfies RouteConfig;
