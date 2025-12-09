import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CatalogueSection } from "@/components/CatalogueSection";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { GameFAB } from "@/components/RingTossGame";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CatalogueSection />
      </main>
      <Footer />
      <CartDrawer />
      <GameFAB />
    </div>
  );
};

export default Index;
