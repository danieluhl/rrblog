import { HomeIcon, TagIcon } from "lucide-react";
import { Outlet } from "react-router";
import { ThemePicker } from "~/components/theme-picker";
import { Button } from "~/components/ui/button";

export default function RootLayout() {
  return (
    <div className="grid place-items-center h-full min-h-screen bg-dark">
      <div className="w-full flex flex-col gap-8 h-full min-h-screen py-12 max-w-4xl px-12">
        <nav className="flex justify-between w-full">
          <div className="flex">
            <Button size="icon-lg" aria-label="Home" variant="ghost">
              <HomeIcon />
            </Button>
            <Button size="icon-lg" aria-label="Posts" variant="ghost">
              <TagIcon />
            </Button>
          </div>
          <ThemePicker />
        </nav>
        <header className="flex items-center flex-col gap-8">
          <div className="flex flex-col gap-2 items-center">
            <small className="text-fg-dim">Welcome to the</small>
            <h1 className="title-font text-6xl text-fg">Pixelated Pond</h1>
          </div>
          <p className="text-center text-fg-dim max-w-xl">
            Here you'll find my thoughts on frontend software development, web
            design, stoicism, mindfulness, productivity, and more.
          </p>
        </header>
        <div className="grow-1">
          <Outlet />
        </div>
        <footer className="flex items-center justify-center gap-2 text-fg-dim">
          <small>A blog by Daniel Uhl</small>
        </footer>
      </div>
    </div>
  );
}
