import { Outlet, createRootRoute, HeadContent, Scripts, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import appCss from "../styles.css?url";
import InteractiveBackground from "../components/layout/InteractiveBackground";
import PetalDrop from "../components/shared/PetalDrop";
import IlluminatedPath from "../components/layout/IlluminatedPath";
import SeekerTrail from "../components/shared/SeekerTrail";
import AnnouncementBar from "../components/layout/AnnouncementBar";
import SanskritWhispers from "../components/layout/SanskritWhispers";

function NotFoundComponent() {
  const navigate = useNavigate();
  useEffect(() => { navigate({ to: "/" }); }, [navigate]);
  return null;
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sādhakas — The Missing Curriculum" },
      { name: "description", content: "A philosophical journey exploring the questions your education never addressed. Join immersive journeys that bridge science, art, and consciousness." },
      { name: "author", content: "Sādhakas" },
      { property: "og:title", content: "Sādhakas — The Missing Curriculum" },
      { property: "og:description", content: "A philosophical journey exploring the questions your education never addressed." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/assets/images/logo.png" },
      { property: "og:site_name", content: "Sādhakas" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Sādhakas — The Missing Curriculum" },
      { name: "twitter:description", content: "A philosophical journey exploring the questions your education never addressed." },
      { name: "twitter:image", content: "/assets/images/logo.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/assets/images/logo.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {/* ── Announcement bar — above everything, unaffected by perspective shift ── */}
        <AnnouncementBar />

        {/* ── Global overlays ── */}
        <IlluminatedPath />
        <PetalDrop />
        <SeekerTrail />
        <SanskritWhispers />

        {/* Perspective Shift — flash overlay + #site-content filter */}
        <div id="perspective-overlay" aria-hidden="true" />

        <InteractiveBackground>
          {children}
        </InteractiveBackground>
        <Scripts />
      </body>
    </html>
  );
}

import Navbar from "../components/layout/Navbar";

function RootComponent() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
