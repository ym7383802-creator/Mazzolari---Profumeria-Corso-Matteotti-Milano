import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Phone, MapPin } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Header: React.FC = () => {
  const { storeInfo, cartCount, setIsCartOpen } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top editorial announcement bar */}
      {storeInfo.announcement && (
        <div className="bg-[#231f20] text-[#ffffff] text-xs py-2 px-4 text-center font-light tracking-wide border-b border-[#333333]">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <span className="hidden sm:inline-flex items-center gap-1.5 opacity-80 text-[11px]">
              <MapPin className="w-3 h-3 text-[#a3bfdb]" />
              Corso Giacomo Matteotti 7, Milano
            </span>
            <span className="mx-auto text-[11px] sm:text-xs">
              {storeInfo.announcement}
            </span>
            <a
              href={`tel:${storeInfo.phone.replace(/\s+/g, '')}`}
              className="hidden sm:inline-flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity text-[11px]"
            >
              <Phone className="w-3 h-3 text-[#a3bfdb]" />
              {storeInfo.phone}
            </a>
          </div>
        </div>
      )}

      {/* Main Top Bar adhering to the Top Bar Contract (3 zones) */}
      <header className="sticky top-0 z-40 bg-[#ffffff]/95 backdrop-blur-md border-b border-[#d5e0ea] transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element Brand wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#231f20] hover:text-[#000000]"
              aria-label="Apri menu navigazione"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            <a href="#" className="flex flex-col text-left group">
              <span className="font-serif text-xl sm:text-2xl tracking-[0.18em] text-[#231f20] uppercase font-normal leading-none">
                MAZZOLARI
              </span>
              <span className="text-[9px] tracking-[0.25em] text-[#5f6368] uppercase font-light mt-1">
                Corso Matteotti · Milano
              </span>
            </a>
          </div>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-[13px] tracking-wider uppercase font-light text-[#231f20]">
            <a
              href="#catalogo"
              className="hover:text-[#000000] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#a3bfdb] hover:after:w-full after:transition-all whitespace-nowrap shrink-0"
            >
              Collezioni
            </a>
            <a
              href="#nicchia"
              className="hover:text-[#000000] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#a3bfdb] hover:after:w-full after:transition-all whitespace-nowrap shrink-0"
            >
              Profumi di Nicchia
            </a>
            <a
              href="#storia"
              className="hover:text-[#000000] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#a3bfdb] hover:after:w-full after:transition-all whitespace-nowrap shrink-0"
            >
              Boutique Milano
            </a>
            <a
              href="#dove-siamo"
              className="hover:text-[#000000] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#a3bfdb] hover:after:w-full after:transition-all whitespace-nowrap shrink-0"
            >
              Posizione & Orari
            </a>
            <a
              href="#recensioni"
              className="hover:text-[#000000] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#a3bfdb] hover:after:w-full after:transition-all whitespace-nowrap shrink-0"
            >
              Recensioni
            </a>
          </nav>

          {/* Zone 3: 1 primary action (60px pill button in #a3bfdb) */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => setIsCartOpen(true)}
              className="btn-pill-primary text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-none"
              aria-label="Apri carrello"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
              <span className="font-medium">Carrello</span>
              {cartCount > 0 && (
                <span className="bg-[#231f20] text-[#ffffff] text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-medium ml-0.5">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#ffffff] border-b border-[#d5e0ea] px-6 py-6 space-y-4">
            <nav className="flex flex-col space-y-4 text-sm uppercase tracking-wider font-light text-[#231f20]">
              <a
                href="#catalogo"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-[#d5e0ea]/50 flex items-center justify-between"
              >
                Collezioni Profumi
                <span className="text-[#5f6368] text-xs">→</span>
              </a>
              <a
                href="#nicchia"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-[#d5e0ea]/50 flex items-center justify-between"
              >
                Profumi di Nicchia
                <span className="text-[#5f6368] text-xs">→</span>
              </a>
              <a
                href="#storia"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-[#d5e0ea]/50 flex items-center justify-between"
              >
                La Boutique di Corso Matteotti
                <span className="text-[#5f6368] text-xs">→</span>
              </a>
              <a
                href="#dove-siamo"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-[#d5e0ea]/50 flex items-center justify-between"
              >
                Dove Siamo & Orari
                <span className="text-[#5f6368] text-xs">→</span>
              </a>
              <a
                href="#recensioni"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 flex items-center justify-between"
              >
                Valutazioni Google (4.4 ★)
                <span className="text-[#5f6368] text-xs">→</span>
              </a>
            </nav>

            <div className="pt-4 border-t border-[#d5e0ea] flex flex-col gap-2 text-xs text-[#5f6368] font-light">
              <p>Corso Giacomo Matteotti 7, 20121 Milano MI</p>
              <p>Telefono: +39 02 795261</p>
              <p className="text-[#231f20] font-normal">Aperto: Lun - Sab 10:00 - 19:00</p>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
