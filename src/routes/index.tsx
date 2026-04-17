import { createFileRoute } from "@tanstack/react-router";
import LenisProvider from "@/components/layout/LenisProvider";
import Navigation from "@/components/layout/Navigation";
import Hero from "@/components/sections/Hero";
import Philosophy from "@/components/sections/Philosophy";
import Problem from "@/components/sections/Problem";
import TheSadhakasWay from "@/components/sections/TheSadhakasWay";
import Intro from "@/components/sections/Intro";
import Offerings from "@/components/sections/Offerings";
import ManualOfLife from "@/components/sections/ManualOfLife";
import Journeys from "@/components/sections/Journeys";
import Registration from "@/components/sections/Registration";
import Footer from "@/components/layout/Footer";
import { SectionErrorBoundary } from "@/components/shared/SectionErrorBoundary";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <LenisProvider>
      <div className="grain-overlay">
        {/* Navigation is outside error boundaries — it must always be visible */}
        <Navigation />

        <SectionErrorBoundary name="Hero">
          <Hero />
        </SectionErrorBoundary>

        <SectionErrorBoundary name="Philosophy">
          <Philosophy />
        </SectionErrorBoundary>

        <SectionErrorBoundary name="Problem">
          <Problem />
        </SectionErrorBoundary>

        <SectionErrorBoundary name="The Sādhakas Way">
          <TheSadhakasWay />
        </SectionErrorBoundary>

        <SectionErrorBoundary name="Intro">
          <Intro />
        </SectionErrorBoundary>

        <SectionErrorBoundary name="Offerings">
          <Offerings />
        </SectionErrorBoundary>

        <SectionErrorBoundary name="Manual of Life">
          <ManualOfLife />
        </SectionErrorBoundary>

        <SectionErrorBoundary name="Journeys">
          <Journeys />
        </SectionErrorBoundary>

        <SectionErrorBoundary name="Registration">
          <Registration />
        </SectionErrorBoundary>

        <SectionErrorBoundary name="Footer">
          <Footer />
        </SectionErrorBoundary>
      </div>
    </LenisProvider>
  );
}
