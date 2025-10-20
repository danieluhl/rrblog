import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div>
      <h1>Parent Content</h1>
      <Outlet />
    </div>
  );
}
