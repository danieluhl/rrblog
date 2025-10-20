import type { Route } from "./+types/home";

// biome-ignore lint/correctness/noEmptyPattern: we want the type in case we need these later
export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Pixelated Pond" },
    { name: "description", content: "The blog of Daniel Uhl in react router" },
  ];
}

export default function Home() {
  return <div>hello</div>;
}
