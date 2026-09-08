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
    let finished = false;
    const finishLoading = () => {
      if (finished) return;
      finished = true;
      leaveTimer = window.setTimeout(() => {
        setLoaderState("leaving");
        hideTimer = window.setTimeout(() => setLoaderState("hidden"), 380);
      }, 520);
    };

    if (document.readyState === "complete") finishLoading();
    else window.addEventListener("load", finishLoading, { once: true });
    // Если событие load задержалось (упавший ресурс, медленная сеть), экран ожидания
    // всё равно не должен навсегда перекрывать страницу, включая вход в админку.
    const safetyTimer = window.setTimeout(finishLoading, 4000);

    return () => {
      window.removeEventListener("load", finishLoading);
      window.clearTimeout(safetyTimer);
      if (leaveTimer) window.clearTimeout(leaveTimer);
      if (hideTimer) window.clearTimeout(hideTimer);
    };
  }, []);

  return <>
    <RouterProvider router={router} />
    {loaderState !== "hidden" && <SiteLoader leaving={loaderState === "leaving"} />}
  </>;
}
