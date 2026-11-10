import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Clock, Navigation, CheckCircle2, HeartHandshake, PackageCheck, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const LocationSection: React.FC = () => {
  const { storeInfo } = useStore();

  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${storeInfo.address}, ${storeInfo.postalCode} ${storeInfo.city}, ${storeInfo.country}`
  )}`;

  return (
    <section id="dove-siamo" className="py-24 px-4 sm:px-6 bg-[#ffffff] scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#5f6368] font-light block mb-2">
            Boutique & Punto Ritiro Ufficiale
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#231f20] tracking-tight mb-4">
            Corso Giacomo Matteotti 7, Milano
          </h2>
          <p className="text-sm sm:text-base text-[#5f6368] font-light leading-relaxed">
            Situata a pochi passi da Piazza San Babila, la nostra boutique accoglie gli ospiti per consulenze olfattive personalizzate, acquisto diretto e ritiro degli ordini online.
          </p>
        </div>

        {/* Location & Details Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Opening Hours & Store Services (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address & Contact Box */}
            <div className="bg-[#fafbfc] border border-[#231f20] rounded-[2px] p-6 space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#5f6368] font-light block mb-1">
                  Indirizzo Ufficiale
                </span>
                <p className="text-lg font-light text-[#231f20] leading-snug">
                  {storeInfo.address}
                </p>
                <p className="text-sm font-light text-[#5f6368]">
                  {storeInfo.postalCode} {storeInfo.city}, {storeInfo.country}
                </p>
                <div className="text-xs text-[#231f20] font-mono mt-1 pt-1 border-t border-[#d5e0ea]">
                  <span className="text-[#5f6368]">Codice Google Plus: </span>
                  {storeInfo.googleMapsCode}
                </div>
              </div>

              <div className="pt-2 border-t border-[#d5e0ea]">
                <span className="text-[10px] uppercase tracking-widest text-[#5f6368] font-light block mb-1">
                  Recapito Telefonico Diretto
                </span>
                <a
                  href={`tel:${storeInfo.phone.replace(/\s+/g, '')}`}
                  className="text-base text-[#231f20] font-mono hover:text-[#000000] inline-flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#a3bfdb]" />
                  <span>{storeInfo.phone}</span>
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-primary w-full py-3 text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Ottieni Indicazioni Stradali</span>
                </a>
              </div>
            </div>

            {/* Opening Hours Table */}
            <div className="bg-[#ffffff] border border-[#d5e0ea] rounded-[2px] p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-[#231f20] stroke-[1.5]" />
                <h3 className="text-sm uppercase tracking-wider font-normal text-[#231f20]">
                  Orari di Apertura Boutique
                </h3>
              </div>

              <div className="divide-y divide-[#d5e0ea]/60 text-xs font-light">
                {storeInfo.openingHours.map(schedule => (
                  <div key={schedule.day} className="py-2.5 flex items-center justify-between">
                    <span className="text-[#231f20]">{schedule.day}</span>
                    <span className={`font-mono tabular-nums ${schedule.closed ? 'text-[#5f6368] italic' : 'text-[#231f20] font-normal'}`}>
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>

              {/* Service flags */}
              <div className="mt-6 pt-4 border-t border-[#d5e0ea] space-y-2 text-xs text-[#5f6368] font-light">
                <div className="flex items-center gap-2">
                  <PackageCheck className="w-4 h-4 text-[#231f20] shrink-0" />
                  <span>Ritiro in negozio: pronto in 2 ore dall'ordine online</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#231f20] shrink-0" />
                  <span>Servizio di consegna celere a Milano e in tutta Italia</span>
                </div>
                <div className="flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-[#231f20] shrink-0" />
                  <span>Attività LGBTQ+ friendly e accessibile</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps Interactive Embed (7 cols) */}
          <div className="lg:col-span-7 h-full flex flex-col">
            <div className="bg-[#fafbfc] border border-[#d5e0ea] rounded-[2px] p-2 h-full flex flex-col">
              <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[540px] rounded-[2px] overflow-hidden border border-[#d5e0ea]">
                <iframe
                  title="Mazzolari Corso Giacomo Matteotti 7 Milano Google Maps"
                  src={storeInfo.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale-[30%] hover:grayscale-0 transition-all duration-500"
                />

                {/* Floating location card on map */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-[#231f20] p-3 rounded-[2px] max-w-[260px] shadow-sm pointer-events-none">
                  <div className="font-serif text-sm font-normal text-[#231f20]">
                    Profumeria Mazzolari
                  </div>
                  <div className="text-[11px] text-[#5f6368] font-light mt-0.5">
                    Corso Giacomo Matteotti, 7 · Milano
                  </div>
                  <div className="text-[10px] text-[#231f20] font-mono mt-1">
                    Google Rating 4.4 ★ (133 recensioni)
                  </div>
                </div>
              </div>

              {/* Map footer strip */}
              <div className="mt-3 px-3 py-1 flex items-center justify-between text-xs text-[#5f6368] font-light">
                <span>Coordinate: 45.4682° N, 9.1963° E</span>
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#231f20] hover:underline"
                >
                  Visualizza su Google Maps →
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
