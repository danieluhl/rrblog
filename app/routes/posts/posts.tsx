import { Link } from "react-router";
import { getPosts } from "utils/get-posts.server";
import type { Route } from "./+types/posts";

export async function loader() {
  const posts = getPosts();
  return { posts };
}

export default function Posts({ loaderData }: Route.ComponentProps) {
  const posts = loaderData.posts;
  return (
    <div>
      {posts.map((post) => (
        <Link key={post.slug} to={`/post/${post.slug}`}>
          {post.title}
        </Link>
      ))}
    </div>
  );
}
