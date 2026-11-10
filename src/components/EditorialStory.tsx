import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const EditorialStory: React.FC = () => {
  const { storeInfo } = useStore();

  return (
    <section id="storia" className="py-24 px-4 sm:px-6 bg-[#fafbfc] border-y border-[#d5e0ea] scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Overlapping Luxury Boutique Photography with Hairline Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            {/* Background decorative hairline offset card */}
            <div className="absolute -inset-3 sm:-inset-4 border border-[#231f20] rounded-[2px] pointer-events-none translate-x-2 translate-y-2 hidden sm:block" />

            <div className="relative z-10 bg-[#ffffff] border border-[#d5e0ea] rounded-[2px] overflow-hidden p-2 sm:p-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2px]">
                <img
                  src={storeInfo.storeImage}
                  alt="Profumeria Mazzolari Corso Giacomo Matteotti Milano"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Caption pill-free editorial metadata */}
              <div className="pt-3 px-2 pb-1 flex items-center justify-between text-[11px] text-[#5f6368] font-light">
                <span className="flex items-center gap-1.5 text-[#231f20]">
                  <MapPin className="w-3.5 h-3.5 text-[#a3bfdb]" />
                  Corso Giacomo Matteotti 7, 20121 Milano
                </span>
                <span>Boutique Ufficiale</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Verified Story and Store Ethos */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <div className="text-xs uppercase tracking-[0.25em] text-[#5f6368] font-light mb-3">
              Mazzolari Milano · Corso Matteotti
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#231f20] tracking-tight leading-[1.08] mb-6">
              {storeInfo.aboutTitle}
            </h2>

            <p className="text-base text-[#231f20]/90 font-light leading-relaxed mb-6">
              {storeInfo.aboutDescription}
            </p>

            <p className="text-sm text-[#5f6368] font-light leading-relaxed mb-8">
              {storeInfo.aboutDetail}
            </p>

            {/* Core Boutique Values (Natural prose without mechanical slop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#d5e0ea]">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#231f20] shrink-0 mt-0.5 stroke-[1.5]" />
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-normal text-[#231f20] mb-0.5">
                    Consulenza Sartoriale
                  </h4>
                  <p className="text-xs text-[#5f6368] font-light leading-relaxed">
                    Ascolto attento per individuare la fragranza che esprime la tua identità.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#231f20] shrink-0 mt-0.5 stroke-[1.5]" />
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-normal text-[#231f20] mb-0.5">
                    Ritiro Rapido in Negozio
                  </h4>
                  <p className="text-xs text-[#5f6368] font-light leading-relaxed">
                    Ordina comodamente online e ritira il tuo pacchetto pronto in boutique.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#231f20] shrink-0 mt-0.5 stroke-[1.5]" />
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-normal text-[#231f20] mb-0.5">
                    Spedizione Accurata
                  </h4>
                  <p className="text-xs text-[#5f6368] font-light leading-relaxed">
                    Packaging di lusso anti-urto con campioncini d'autore in omaggio.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#231f20] shrink-0 mt-0.5 stroke-[1.5]" />
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-normal text-[#231f20] mb-0.5">
                    Spazio LGBTQ+ Friendly
                  </h4>
                  <p className="text-xs text-[#5f6368] font-light leading-relaxed">
                    Un ambiente accogliente, rispettoso e aperto a ogni sensibilità.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <a
                href="#dove-siamo"
                className="btn-ghost-luxury text-xs uppercase tracking-wider hover:border-[#231f20]"
              >
                Vieni a Trovarci in Corso Matteotti 7
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
