import { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router";
import SiteLoader from "./components/SiteLoader";
import StorefrontApp from "./StorefrontApp";

const router = createBrowserRouter([{ path: "*", Component: StorefrontApp }]);

export default function App() {
  const [loaderState, setLoaderState] = useState<"visible" | "leaving" | "hidden">("visible");

  useEffect(() => {
    let leaveTimer: number | undefined;
    let hideTimer: number | undefined;
    const finishLoading = () => {
      leaveTimer = window.setTimeout(() => {
        setLoaderState("leaving");
        hideTimer = window.setTimeout(() => setLoaderState("hidden"), 380);
      }, 520);
    };

    if (document.readyState === "complete") finishLoading();
    else window.addEventListener("load", finishLoading, { once: true });

    return () => {
      window.removeEventListener("load", finishLoading);
      if (leaveTimer) window.clearTimeout(leaveTimer);
      if (hideTimer) window.clearTimeout(hideTimer);
    };
  }, []);

  return <>
    <RouterProvider router={router} />
    {loaderState !== "hidden" && <SiteLoader leaving={loaderState === "leaving"} />}
  </>;
}
