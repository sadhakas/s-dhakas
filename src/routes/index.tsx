import { createFileRoute } from "@tanstack/react-router";
import LenisProvider from "@/components/layout/LenisProvider";
import Navigation from "@/components/layout/Navigation";
import Hero from "@/components/sections/Hero";
import Philosophy from "@/components/sections/Philosophy";
import Problem from "@/components/sections/Problem";
import Journeys from "@/components/sections/Journeys";
import Registration from "@/components/sections/Registration";
import Footer from "@/components/layout/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <LenisProvider>
      <div className="grain-overlay">
        <Navigation />
        <Hero />
        <Philosophy />
        <Problem />
        <Journeys />
        <Registration />
        <Footer />
      </div>
    </LenisProvider>
  );
}
