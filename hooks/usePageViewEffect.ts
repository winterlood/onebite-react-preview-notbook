import { useEffect } from "react";
import { useRouter } from "next/router";

interface ConfigParams {
  pageTitle?: string | undefined;
  pageLocation?: string | undefined;
  pagePath?: string | undefined;
  sendPageView?: boolean | undefined;
}

export const pageViewGA = (configParams: ConfigParams) => {
  if (typeof window !== "object") return;
  if (window.gtag !== undefined) {
    window.gtag("config", process.env.GA_TRACKING_ID as string, {
      page_title: configParams.pageTitle,
      page_location: configParams.pageLocation,
      page_path: configParams.pagePath,
      send_page_view: configParams.sendPageView,
    });
  }
};

export const triggerGAEvent = (event: {
  name: string;
  category: string;
  label: string;
}) => {
  if (typeof window !== "object") return;
  if (window.gtag !== undefined) {
    window.gtag("event", event.name, {
      event_category: event.category,
      event_label: event.label,
    });
  }
};

export default function usePageviewEffect() {
  const router = useRouter();
  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;

    const handleRouteChange = (url: string) => {
      pageViewGA({
        pagePath: url,
      });
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
}
