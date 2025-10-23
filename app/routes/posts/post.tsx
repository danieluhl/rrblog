import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import { getPostBySlug } from "../../utils/get-posts.server";
import type { Route } from "./+types/post";
import { Button } from "~/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon, HeartIcon } from "lucide-react";
import { NavLink } from "react-router";

export async function loader({ params }: Route.LoaderArgs) {
  const postData = getPostBySlug(params.slug);
  return postData;
}

export function meta({ loaderData }: Route.MetaArgs) {
  return [
    { title: loaderData?.post.title },
    { name: "description", content: loaderData?.post.description },
  ];
}

export default function Post({ loaderData }: Route.ComponentProps) {
  const { prevPost, post, nextPost } = loaderData;

  const handleHeartClick = () => {
    console.log("heart");
  };

  return (
    <div className="flex items-center flex-col gap-8">
      <header className="flex flex-col items-center gap-4">
        <h1 className="title-font text-6xl text-fg">{post.title}</h1>
        <p className="text-muted-foreground">{post.description}</p>
      </header>
      <div className="w-full text-lg space-y-4 font-light markdown">
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            code(props) {
              const { children, className, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  PreTag="div"
                  language={match[1]}
                  style={dark}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        >
          {post.content}
        </Markdown>
      </div>
      <div className="flex justify-between w-full">
        {prevPost ? (
          <NavLink to={`/post/${prevPost.slug}`}>
            <Button size="icon-lg">
              <ArrowLeftIcon />
            </Button>
          </NavLink>
        ) : (
          <Button size="icon-lg" disabled>
            <ArrowLeftIcon />
          </Button>
        )}
        <Button
          size="icon-lg"
          onClick={handleHeartClick}
          className="bg-red-100 text-red-700"
        >
          <HeartIcon />
        </Button>
        {nextPost ? (
          <NavLink to={`/post/${nextPost.slug}`}>
            <Button size="icon-lg">
              <ArrowRightIcon />
            </Button>
          </NavLink>
        ) : (
          <Button size="icon-lg" disabled>
            <ArrowRightIcon />
          </Button>
        )}
      </div>
    </div>
  );
}
