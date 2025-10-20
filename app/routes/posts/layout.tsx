import { Outlet } from "react-router";

export default function PostLayout() {
  return (
    <div>
      <h1>Post Layout</h1>
      <Outlet />
    </div>
  );
}
