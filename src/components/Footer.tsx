import React from 'react';
import { MapPin, Phone, Clock, Instagram, Facebook, Settings, Heart, Shield } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { storeInfo, setIsCustomizerOpen } = useStore();

  return (
    <footer className="bg-[#231f20] text-[#ffffff] pt-16 pb-12 border-t border-[#333333]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#3a3738]">
          
          {/* Brand & Ethos (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-serif text-2xl tracking-[0.16em] uppercase block font-normal">
              MAZZOLARI
            </span>
            <span className="text-[10px] tracking-[0.25em] text-[#a3bfdb] uppercase block font-light">
              Corso Giacomo Matteotti 7 · Milano
            </span>
            <p className="text-xs text-[#ffffff]/70 font-light leading-relaxed max-w-sm pt-2">
              Profumeria d'autore nel cuore del quadrilatero della moda di Milano. Un'esperienza sensoriale dedicata a chi riconosce l'eccellenza delle creazioni olfattive artigianali e di nicchia.
            </p>
            <div className="flex items-center gap-2 pt-2 text-[11px] text-[#ffffff]/80 font-light">
              <Heart className="w-3.5 h-3.5 text-[#a3bfdb]" />
              <span>Attività LGBTQ+ friendly e accogliente</span>
            </div>
          </div>

          {/* Navigazione Veloce (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#a3bfdb] font-normal mb-4">
              Esplora la Boutique
            </h4>
            <ul className="space-y-2.5 text-xs font-light text-[#ffffff]/80">
              <li>
                <a href="#catalogo" className="hover:text-white transition-colors">
                  Tutte le Fragranze
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-white transition-colors">
                  Profumi di Nicchia & Artigianali
                </a>
              </li>
              <li>
                <a href="#storia" className="hover:text-white transition-colors">
                  La Nostra Storia a Milano
                </a>
              </li>
              <li>
                <a href="#dove-siamo" className="hover:text-white transition-colors">
                  Orari di Apertura & Ritiro
                </a>
              </li>
              <li>
                <a href="#recensioni" className="hover:text-white transition-colors">
                  Recensioni dei Clienti (4.4 ★)
                </a>
              </li>
            </ul>
          </div>

          {/* Boutique Details & Hours (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#a3bfdb] font-normal mb-4">
              Boutique di Corso Matteotti
            </h4>

            <div className="space-y-2.5 text-xs font-light text-[#ffffff]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#a3bfdb] shrink-0 mt-0.5" />
                <span>
                  {storeInfo.address}, {storeInfo.postalCode} {storeInfo.city}, {storeInfo.country}
                  <span className="block text-[10px] text-[#ffffff]/50 mt-0.5 font-mono">
                    Codice Plus: {storeInfo.googleMapsCode}
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#a3bfdb] shrink-0" />
                <a
                  href={`tel:${storeInfo.phone.replace(/\s+/g, '')}`}
                  className="font-mono hover:text-white"
                >
                  {storeInfo.phone}
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#a3bfdb] shrink-0 mt-0.5" />
                <span>
                  Lunedì – Sabato: 10:00 – 19:00
                  <span className="block text-[11px] text-[#ffffff]/50">
                    Domenica: Chiuso
                  </span>
                </span>
              </div>
            </div>

            {/* Social links */}
            <div className="pt-4 flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-[2px] border border-[#4a4748] flex items-center justify-center text-[#ffffff]/80 hover:text-white hover:border-[#a3bfdb] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-[2px] border border-[#4a4748] flex items-center justify-center text-[#ffffff]/80 hover:text-white hover:border-[#a3bfdb] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#ffffff]/50 font-light">
          <div>
            © {new Date().getFullYear()} Mazzolari Milano · Corso Giacomo Matteotti 7. Tutti i diritti riservati.
          </div>

          <div className="flex items-center gap-6">
            <span>Ritiro in Negozio Gratuito</span>
            <span>·</span>
            <span>Spedizioni Espresse in Italia</span>
            <span>·</span>
            
            {/* Discreet Admin / Store Customizer Trigger */}
            <button
              onClick={() => setIsCustomizerOpen(true)}
              className="text-[#a3bfdb] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Gestisci contenuti, prezzi, orari e immagini"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Personalizza Negozio</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
