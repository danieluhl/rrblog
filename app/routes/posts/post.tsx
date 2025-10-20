import Markdown from "react-markdown";
import { Button } from "~/components/ui/button";
import { getPostBySlug } from "../../../utils/get-posts.server";
import type { Route } from "../+types/post";

export async function loader({ params }: Route.LoaderArgs) {
  const post = getPostBySlug(params.slug);
  return post;
}

export function meta({ loaderData }: Route.MetaArgs) {
  return [
    { title: loaderData?.title },
    { name: "description", content: loaderData?.description },
  ];
}

export default function Post({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <Button>Click me</Button>
      <h1>{loaderData.title}</h1>
      <small>{loaderData.description}</small>
      <Markdown>{loaderData.content}</Markdown>
    </div>
  );
}
