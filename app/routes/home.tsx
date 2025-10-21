import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { formatDate } from "~/utils/formatting";
import { getPosts } from "~/utils/get-posts.server";
import type { Route } from "./+types/home";

// biome-ignore lint/correctness/noEmptyPattern: we want the type in case we need these later
export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Pixelated Pond" },
    { name: "description", content: "The blog of Daniel Uhl in react router" },
  ];
}

export async function loader() {
  const posts = getPosts();
  return { posts };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const posts = loaderData.posts;
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link key={post.slug} to={`/post/${post.slug}`}>
          <Card className="gap-2">
            <CardHeader>
              <h1 className="text-2xl">{post.title}</h1>
            </CardHeader>
            <CardContent>{post.description}</CardContent>
            <CardFooter>
              <small className="flex gap-2 text-muted-foreground">
                <span>{formatDate(post.updateDate)}</span>
                {post.tags.map((tag) => (
                  <span key={tag} className="">
                    #{tag}
                  </span>
                ))}
              </small>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
