import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Screenshots from '@/components/Screenshots';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <Screenshots />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
