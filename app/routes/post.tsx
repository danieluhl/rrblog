import Markdown from "react-markdown";
import { getPostBySlug } from "../../scripts/get-posts";
import type { Route } from "./+types/post";

export async function loader({ params }: Route.LoaderArgs) {
  let post = getPostBySlug(params.slug);
  return post;
}

export function meta({ loaderData }: Route.MetaArgs) {
  return [
    { title: loaderData.title },
    { name: "description", content: loaderData.description },
  ];
}

export default function Post({ params, loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h1>{loaderData.title}</h1>
      <small>{loaderData.description}</small>
      <Markdown>{loaderData.content}</Markdown>
    </div>
  );
}
