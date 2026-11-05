import ThemeProvider from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import HeritageSection from "./components/HeritageSection";
import MiniGame from "./components/MiniGame";
import BatikStudio from "./components/BatikStudio";
import BatikLens from "./components/BatikLens";
import GallerySection from "./components/GallerySection";
import VirtualDraping from "./components/VirtualDraping";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <ThemeProvider>
      <Navbar />
      <main>
        <HeroSection />
        <HeritageSection />
        <GallerySection />
        <MiniGame />
        <BatikStudio />
        <BatikLens />
        <VirtualDraping />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
