import { Link, Outlet } from "react-router";
import { ThemePicker } from "~/components/theme-picker";

export default function PostLayout() {
  return (
    <div className="grid place-items-center h-full min-h-screen bg-dark">
      <div className="w-full flex flex-col gap-4 h-full min-h-screen py-12 max-w-4xl px-12">
        <nav className="flex justify-between w-full gap-8 items-center">
          <div className="flex">
            <Link className="text-xl text-muted-foreground title-font" to="/">
              The Pixelated Pond
            </Link>
          </div>
          <ThemePicker />
        </nav>
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
