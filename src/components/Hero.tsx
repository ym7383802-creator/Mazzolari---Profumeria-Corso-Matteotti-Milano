import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Hero: React.FC = () => {
  const { storeInfo } = useStore();

  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#fafafa]">
      {/* Background Media: High resolution image or atmospheric video */}
      <div className="absolute inset-0 z-0">
        {storeInfo.useVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-90 transition-opacity duration-700"
            src={storeInfo.heroVideo}
          />
        ) : (
          <img
            src={storeInfo.heroImage}
            alt="Mazzolari Profumeria Corso Matteotti Milano"
            className="w-full h-full object-cover object-center scale-[1.02] transition-transform duration-1000 ease-out"
            referrerPolicy="no-referrer"
          />
        )}

        {/* Measured subtle scrim: provides 4.5:1 WCAG legibility while keeping the ethereal light editorial feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#ffffff] via-[#ffffff]/50 to-black/20" />
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-white/30" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-20 text-center flex flex-col items-center">
        
        {/* Editorial Subtitle Kicker (Clean unboxed text, no pills) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs sm:text-sm uppercase tracking-[0.28em] text-[#231f20] font-light mb-4 flex items-center gap-2"
        >
          <span>Milano</span>
          <span className="text-[#a3bfdb]">·</span>
          <span>Corso Giacomo Matteotti 7</span>
          <span className="text-[#a3bfdb]">·</span>
          <span>Profumeria Artistica</span>
        </motion.div>

        {/* Display Headline: Weight 300 whisper-weight, tight line-height */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl font-light text-[#231f20] tracking-[-0.03em] leading-[1.06] mb-10 max-w-4xl text-balance"
        >
          {storeInfo.heroHeadline}
        </motion.h1>

        {/* Action Buttons: Primary 60px pill + Secondary 2px hairline ghost button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#catalogo"
            className="btn-pill-primary w-full sm:w-auto px-8 py-3.5 text-xs uppercase tracking-widest text-[#231f20] font-medium shadow-none text-center"
          >
            Scopri la Collezione
          </a>
          <a
            href="#dove-siamo"
            className="btn-ghost-luxury w-full sm:w-auto px-7 py-3 text-xs uppercase tracking-widest text-[#231f20] font-light bg-white/70 backdrop-blur-sm text-center"
          >
            Boutique & Ritiro in Negozio
          </a>
        </motion.div>

        {/* Minimalist scroll down indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 text-[#5f6368] flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-light">Scorri</span>
          <ArrowDown className="w-4 h-4 stroke-[1] animate-bounce text-[#231f20]" />
        </motion.div>
      </div>

      {/* Decorative Hairline Bottom Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#d5e0ea]" />
    </section>
  );
};
