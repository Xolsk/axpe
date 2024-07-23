import classes from "./Layout.module.css";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div data-testid="layout">
      <main className={classes.main}>
        <Outlet />
      </main>
    </div>
  );
}
