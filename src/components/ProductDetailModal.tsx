import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, MessageCircle, Clock, Truck, ShieldCheck, ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types/store';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart, storeInfo } = useStore();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0].size);
      setQuantity(1);
      setAddedSuccess(false);
    }
  }, [product]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const currentSizeObj = product.sizes.find(s => s.size === selectedSize) || product.sizes[0];
  const unitPrice = currentSizeObj.price;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 1800);
  };

  const handleWhatsAppInquiry = () => {
    const message = encodeURIComponent(
      `Buongiorno Profumeria Mazzolari Corso Matteotti, desidero maggiori informazioni o ordinare la fragranza "${product.name}" (${product.brand}) nel formato ${selectedSize} al prezzo di €${unitPrice}.`
    );
    const cleanNumber = storeInfo.whatsappPhone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#231f20]/60 backdrop-blur-sm"
        />

        {/* Modal Window: Contiguous Purchase Module */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#ffffff] border border-[#231f20] rounded-[2px] shadow-2xl z-10 overflow-hidden my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-[#231f20] hover:text-[#000000] bg-white/80 rounded-full border border-[#d5e0ea] transition-colors"
            aria-label="Chiudi finestra dettagli"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Full bleed product image showcase */}
            <div className="relative bg-[#fafafa] border-b md:border-b-0 md:border-r border-[#d5e0ea] p-6 sm:p-8 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-[380px] sm:max-h-[440px] w-auto object-contain rounded-[2px] mx-auto drop-shadow-sm"
                referrerPolicy="no-referrer"
              />

              {product.badge && (
                <div className="absolute top-6 left-6">
                  <span className="text-xs uppercase tracking-widest bg-[#ffffff] text-[#231f20] border border-[#231f20] px-2.5 py-1 rounded-[2px] font-light">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Right: Contiguous Purchase Information */}
            <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
              <div>
                {/* Brand & Concentration kicker */}
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#5f6368] font-light mb-1">
                  <span>{product.brand}</span>
                  <span>·</span>
                  <span>{product.concentration}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-light text-[#231f20] tracking-tight mb-2">
                  {product.name}
                </h2>

                <div className="text-xl font-normal text-[#231f20] font-mono tabular-nums mb-4">
                  €{totalPrice.toFixed(2)}
                  {quantity > 1 && (
                    <span className="text-xs text-[#5f6368] font-light font-sans ml-2">
                      (€{unitPrice.toFixed(2)} ciascuno)
                    </span>
                  )}
                </div>

                <div className="w-full h-[1px] bg-[#d5e0ea] my-4" />

                {/* Description */}
                <p className="text-sm text-[#231f20]/90 font-light leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Olfactory Pyramid */}
                <div className="bg-[#fafbfc] border border-[#d5e0ea] p-4 rounded-[2px] mb-6 space-y-2 text-xs">
                  <h4 className="text-[11px] uppercase tracking-widest text-[#231f20] font-medium mb-1">
                    Piramide Olfattiva
                  </h4>
                  <div className="text-[#5f6368]">
                    <span className="text-[#231f20] font-normal">Note di Testa: </span>
                    {product.olfactoryNotes.top.join(', ')}
                  </div>
                  <div className="text-[#5f6368]">
                    <span className="text-[#231f20] font-normal">Note di Cuore: </span>
                    {product.olfactoryNotes.heart.join(', ')}
                  </div>
                  <div className="text-[#5f6368]">
                    <span className="text-[#231f20] font-normal">Note di Fondo: </span>
                    {product.olfactoryNotes.base.join(', ')}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="mb-6">
                  <label className="block text-xs uppercase tracking-wider text-[#231f20] font-normal mb-2">
                    Formato Disponibile
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(sizeOption => {
                      const isSelected = sizeOption.size === selectedSize;
                      return (
                        <button
                          key={sizeOption.size}
                          onClick={() => setSelectedSize(sizeOption.size)}
                          className={`px-4 py-2 text-xs rounded-[2px] border transition-colors cursor-pointer flex items-center justify-between gap-3 ${
                            isSelected
                              ? 'border-[#231f20] bg-[#231f20] text-white font-normal'
                              : 'border-[#d5e0ea] text-[#231f20] hover:border-[#231f20] font-light'
                          }`}
                        >
                          <span>{sizeOption.size}</span>
                          <span className={isSelected ? 'text-white/80' : 'text-[#5f6368]'}>
                            €{sizeOption.price}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity Stepper */}
                <div className="mb-6 flex items-center gap-4">
                  <span className="text-xs uppercase tracking-wider text-[#231f20] font-normal">
                    Quantità:
                  </span>
                  <div className="flex items-center border border-[#d5e0ea] rounded-[2px]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-sm hover:bg-[#d5e0ea]/40 text-[#231f20] transition-colors"
                      aria-label="Diminuisci quantità"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 text-xs font-mono tabular-nums text-[#231f20]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 text-sm hover:bg-[#d5e0ea]/40 text-[#231f20] transition-colors"
                      aria-label="Aumenta quantità"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons & Reassurance */}
              <div className="pt-4 border-t border-[#d5e0ea] space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="btn-pill-primary w-full py-3.5 text-xs uppercase tracking-widest cursor-pointer shadow-none flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                  <span>
                    {addedSuccess ? 'Aggiunto al Carrello!' : `Aggiungi al Carrello — €${totalPrice.toFixed(2)}`}
                  </span>
                </button>

                <button
                  onClick={handleWhatsAppInquiry}
                  className="btn-ghost-luxury w-full py-2.5 text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2 text-[#231f20]"
                >
                  <MessageCircle className="w-4 h-4 stroke-[1.5] text-[#25D366]" />
                  <span>Ordina o Chiedi via WhatsApp (+39 02 795261)</span>
                </button>

                {/* Service notes */}
                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-[#5f6368] font-light">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#231f20]" />
                    <span>Ritiro in Corso Matteotti 7 (2h)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#231f20]" />
                    <span>Spedizione sicura in tutta Italia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
