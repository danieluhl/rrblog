import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { getPostBySlug } from "../../utils/get-posts.server";
import type { Route } from "./+types/post";

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
    <div className="flex items-center flex-col gap-8">
      <header className="flex flex-col gap-2 items-center">
        <h1 className="title-font text-6xl text-fg">{loaderData.title}</h1>
        <p className="text-muted-foreground">{loaderData.description}</p>
      </header>
      <div className="w-full text-lg">
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
          {loaderData.content}
        </Markdown>
      </div>
    </div>
  );
}
