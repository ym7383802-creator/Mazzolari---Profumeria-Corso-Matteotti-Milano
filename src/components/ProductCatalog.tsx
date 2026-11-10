import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Eye, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types/store';

const CATEGORIES = [
  { id: 'all', label: 'Tutti i Profumi' },
  { id: 'Nicchia', label: 'Profumi di Nicchia' },
  { id: 'Uomo', label: 'Profumi Uomo' },
  { id: 'Donna', label: 'Profumi Donna' },
  { id: 'Unisex', label: 'Profumi Unisex' },
  { id: 'Esclusivi', label: 'Fragranze Esclusive' }
];

export const ProductCatalog: React.FC = () => {
  const { products, addToCart, setActiveProductDetail } = useStore();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSizes, setSelectedSizes] = useState<{ [productId: string]: string }>({});
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // Filter products
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleQuickAdd = (product: Product) => {
    const chosenSize = selectedSizes[product.id] || product.sizes[0].size;
    addToCart(product, chosenSize, 1);
    setRecentlyAddedId(product.id);
    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 1500);
  };

  return (
    <section id="catalogo" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-24">
      {/* Section Header with Whisper-weight Type */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#d5e0ea] pb-8">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#5f6368] font-light block mb-2">
            Collezione Ufficiale · Mazzolari Matteotti
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#231f20] tracking-tight">
            Fragranze d'Autore & Estratti Rari
          </h2>
        </div>
        <p className="text-sm text-[#5f6368] max-w-md font-light leading-relaxed">
          Ogni creazione è un viaggio olfattivo senza tempo, formulata con essenze nobili selezionate a mano nella nostra boutique di Milano.
        </p>
      </div>

      {/* Category Filter Bar (Clean segmented button controls, no pills) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-10 no-scrollbar">
        {CATEGORIES.map(cat => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs uppercase tracking-wider rounded-[2px] whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#231f20] text-[#ffffff] font-normal'
                  : 'bg-transparent text-[#231f20] hover:bg-[#d5e0ea]/40 font-light border border-transparent'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Product Grid: 2 columns on mobile, 3 columns on desktop (as requested in spec) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
        {filteredProducts.map((product, index) => {
          const currentSize = selectedSizes[product.id] || product.sizes[0].size;
          const currentSizeObj = product.sizes.find(s => s.size === currentSize) || product.sizes[0];
          const currentPrice = currentSizeObj ? currentSizeObj.price : 150;
          const isJustAdded = recentlyAddedId === product.id;

          return (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group flex flex-col bg-[#ffffff] border border-[#d5e0ea] hover:border-[#231f20] rounded-[2px] transition-all duration-300 relative"
            >
              {/* Product Badge if any */}
              {product.badge && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="text-[10px] uppercase tracking-wider bg-[#ffffff]/90 backdrop-blur-sm text-[#231f20] border border-[#d5e0ea] px-2 py-0.5 rounded-[2px] font-light">
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Edge-to-Edge Image Container */}
              <div
                onClick={() => setActiveProductDetail(product)}
                className="relative aspect-[4/3] sm:aspect-[1/1] overflow-hidden bg-[#fbfbfb] cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />

                {/* Quick view overlay button on hover (desktop) */}
                <div className="absolute inset-0 bg-[#231f20]/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none sm:pointer-events-auto">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveProductDetail(product);
                    }}
                    className="bg-white/95 text-[#231f20] text-xs px-4 py-2 rounded-[2px] border border-[#231f20] flex items-center gap-1.5 uppercase tracking-wider font-light shadow-none hover:bg-[#231f20] hover:text-white transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Dettagli Piramide</span>
                  </button>
                </div>
              </div>

              {/* Product Details Section */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between border-t border-[#d5e0ea]/70">
                <div>
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <span className="text-[11px] uppercase tracking-widest text-[#5f6368] font-light">
                      {product.brand} · {product.concentration}
                    </span>
                    <span className="text-[11px] text-[#5f6368] font-light hidden sm:inline">
                      {product.category}
                    </span>
                  </div>

                  <h3
                    onClick={() => setActiveProductDetail(product)}
                    className="text-base sm:text-lg font-light text-[#231f20] tracking-tight group-hover:text-[#000000] cursor-pointer leading-tight mb-1"
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs text-[#5f6368] font-light line-clamp-2 leading-relaxed mb-3">
                    {product.description}
                  </p>

                  {/* Olfactory pyramid tags */}
                  <div className="text-[11px] text-[#5f6368] font-light mb-4">
                    <span className="text-[#231f20] font-normal">Note: </span>
                    {product.olfactoryNotes.heart.join(', ')}
                  </div>
                </div>

                <div>
                  {/* Size Selector */}
                  <div className="flex items-center gap-1.5 mb-4">
                    {product.sizes.map(sizeOption => {
                      const isSelected = sizeOption.size === currentSize;
                      return (
                        <button
                          key={sizeOption.size}
                          onClick={() => handleSizeSelect(product.id, sizeOption.size)}
                          className={`text-[11px] px-2 py-1 rounded-[2px] border transition-colors cursor-pointer ${
                            isSelected
                              ? 'border-[#231f20] text-[#231f20] font-normal bg-[#d5e0ea]/30'
                              : 'border-[#d5e0ea] text-[#5f6368] hover:border-[#231f20] font-light'
                          }`}
                        >
                          {sizeOption.size}
                        </button>
                      );
                    })}
                  </div>

                  {/* Price and Add to Cart Action */}
                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#d5e0ea]/50">
                    <div>
                      <span className="text-sm sm:text-base font-normal text-[#231f20] font-mono tabular-nums">
                        €{currentPrice.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => handleQuickAdd(product)}
                      disabled={isJustAdded}
                      className={`text-xs px-3 sm:px-4 py-2 rounded-[2px] transition-all flex items-center gap-1.5 cursor-pointer uppercase tracking-wider font-light ${
                        isJustAdded
                          ? 'bg-[#231f20] text-white border border-[#231f20]'
                          : 'bg-[#d5e0ea] text-[#231f20] hover:bg-[#a3bfdb] border border-transparent'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-white" />
                          <span className="hidden sm:inline">Aggiunto</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5 stroke-[1.5]" />
                          <span>Acquista</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};
