import { createFileRoute } from "@tanstack/react-router";
import LenisProvider from "@/components/LenisProvider";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Problem from "@/components/Problem";
import Journeys from "@/components/Journeys";
import Registration from "@/components/Registration";
import Footer from "@/components/Footer";

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
