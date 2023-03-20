import { useEffect } from "react";
import { useRouter } from "next/router";

export const pageview = (url: string) => {
  if (typeof window !== "object") return;
  window.gtag("config", process.env.GA_TRACKING_ID as string, {
    page_path: url,
  });
};

export default function usePageviewEffect() {
  const router = useRouter();
  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;

    const handleRouteChange = (url: string) => {
      pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
}
