/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BrandStrip } from './components/BrandStrip';
import { ProductCatalog } from './components/ProductCatalog';
import { EditorialStory } from './components/EditorialStory';
import { TestimonialBand } from './components/TestimonialBand';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { StoreCustomizerModal } from './components/StoreCustomizerModal';
import { MessageCircle } from 'lucide-react';

const MainLayout: React.FC = () => {
  const {
    activeProductDetail,
    setActiveProductDetail,
    storeInfo,
    setIsCustomizerOpen
  } = useStore();

  // Keyboard shortcut (Alt + E) to open store customizer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === 'e' || e.key === 'E')) {
        e.preventDefault();
        setIsCustomizerOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsCustomizerOpen]);

  const handleConciergeWhatsApp = () => {
    const msg = encodeURIComponent(
      "Buongiorno Profumeria Mazzolari Corso Matteotti, desidero ricevere una consulenza olfattiva personalizzata."
    );
    const cleanNumber = storeInfo.whatsappPhone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#231f20] flex flex-col font-sans selection:bg-[#d5e0ea] selection:text-[#231f20]">
      {/* Top Header */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section with Whisper-Weight Typography and Cover Media */}
        <Hero />

        {/* 2. Brand Strip on Powder Blue (#d5e0ea) Band */}
        <BrandStrip />

        {/* 3. Fragrance Catalog (2-col mobile, 3-col desktop) */}
        <ProductCatalog />

        {/* 4. Split Editorial Story (Boutique interior overlapping card) */}
        <EditorialStory />

        {/* 5. Testimonial Band on Powder Blue Band (Google 4.4 ★ / 133 reviews) */}
        <TestimonialBand />

        {/* 6. Dedicated Location & Opening Hours Section (Corso Matteotti 7) */}
        <LocationSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Concierge WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={handleConciergeWhatsApp}
          className="bg-[#231f20] hover:bg-[#000000] text-white p-3.5 rounded-full shadow-lg flex items-center gap-2 border border-[#d5e0ea] hover:border-white transition-all transform hover:scale-105 group cursor-pointer"
          title="Consulenza olfattiva via WhatsApp (+39 02 795261)"
          aria-label="Assistenza WhatsApp"
        >
          <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]/20" />
          <span className="hidden sm:inline text-xs font-light tracking-wider pr-1">
            Consulenza WhatsApp
          </span>
        </button>
      </div>

      {/* Modals & Drawers */}
      <CartDrawer />
      <ProductDetailModal
        product={activeProductDetail}
        onClose={() => setActiveProductDetail(null)}
      />
      <CheckoutModal />
      <StoreCustomizerModal />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}
