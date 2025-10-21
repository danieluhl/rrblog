import {
  index,
  layout,
  prefix,
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/_layout.tsx", [
    index("routes/home.tsx"),
    route("tags", "routes/tags.tsx"),
    route("tag", "routes/tag.tsx"),
  ]),
  layout("routes/posts/_layout.tsx", [
    ...prefix("post", [route(":slug", "routes/posts/post.tsx")]),
  ]),
] satisfies RouteConfig;
