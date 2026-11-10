import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, ArrowRight, Package, Truck, Sparkles, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    setIsCheckoutOpen,
    storeInfo
  } = useStore();

  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');

  if (!isCartOpen) return null;

  const freeShippingThreshold = 120;
  const isFreeShipping = cartTotal >= freeShippingThreshold;
  const shippingFee = deliveryType === 'delivery' ? (isFreeShipping ? 0 : 10) : 0;
  const grandTotal = cartTotal + shippingFee;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleQuickWhatsAppOrder = () => {
    if (cart.length === 0) return;
    const itemsText = cart
      .map(item => `• ${item.product.name} (${item.selectedSize}) x${item.quantity} = €${(item.price * item.quantity).toFixed(2)}`)
      .join('\n');
    
    const message = encodeURIComponent(
      `Buongiorno Profumeria Mazzolari Corso Matteotti, desidero effettuare il seguente ordine:\n\n${itemsText}\n\nModalità: ${deliveryType === 'pickup' ? 'Ritiro in Boutique (Corso Matteotti 7)' : 'Consegna a Domicilio'}\nTotale: €${grandTotal.toFixed(2)}\n\nResto in attesa della vostra conferma.`
    );
    const cleanNumber = storeInfo.whatsappPhone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-[#231f20]/50 backdrop-blur-xs transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="w-screen max-w-md bg-[#ffffff] border-l border-[#231f20] flex flex-col justify-between shadow-2xl"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#d5e0ea] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#231f20] stroke-[1.5]" />
                <h3 className="text-base uppercase tracking-wider font-light text-[#231f20]">
                  Il Tuo Carrello ({cartCount})
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 text-[#231f20] hover:text-[#000000] rounded-full border border-[#d5e0ea] hover:border-[#231f20] transition-colors"
                aria-label="Chiudi carrello"
              >
                <X className="w-4 h-4 stroke-[1.5]" />
              </button>
            </div>

            {/* Free shipping banner if delivery */}
            {deliveryType === 'delivery' && (
              <div className="bg-[#fafbfc] px-6 py-2.5 border-b border-[#d5e0ea] text-xs font-light text-[#5f6368]">
                {isFreeShipping ? (
                  <span className="text-[#231f20] font-normal flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#a3bfdb]" />
                    Spedizione gratuita applicata al tuo ordine!
                  </span>
                ) : (
                  <span>
                    Aggiungi altri <strong className="text-[#231f20] font-mono">€{(freeShippingThreshold - cartTotal).toFixed(2)}</strong> per la spedizione gratuita
                  </span>
                )}
              </div>
            )}

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#d5e0ea]">
              {cart.length === 0 ? (
                <div className="py-20 text-center flex flex-col items-center justify-center">
                  <ShoppingBag className="w-12 h-12 text-[#d5e0ea] stroke-[1] mb-4" />
                  <p className="text-sm text-[#231f20] font-light mb-1">
                    Il tuo carrello è vuoto
                  </p>
                  <p className="text-xs text-[#5f6368] font-light max-w-xs mb-6">
                    Esplora la nostra collezione d'autore e scopri la tua fragranza ideale.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="btn-pill-primary text-xs uppercase tracking-wider"
                  >
                    Scopri le Fragranze
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                    {/* Item Thumbnail */}
                    <div className="w-18 h-18 bg-[#fbfbfb] border border-[#d5e0ea] rounded-[2px] overflow-hidden shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-[#5f6368] font-light">
                              {item.product.brand}
                            </span>
                            <h4 className="text-sm font-light text-[#231f20] leading-tight">
                              {item.product.name}
                            </h4>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#5f6368] hover:text-[#231f20] transition-colors p-1"
                            title="Rimuovi prodotto"
                          >
                            <Trash2 className="w-3.5 h-3.5 stroke-[1.2]" />
                          </button>
                        </div>
                        <div className="text-xs text-[#5f6368] font-light mt-0.5">
                          Formato: {item.selectedSize}
                        </div>
                      </div>

                      {/* Quantity & Item Subtotal */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-[#d5e0ea] rounded-[2px]">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-xs text-[#231f20] hover:bg-[#d5e0ea]/40"
                            aria-label="Riduci"
                          >
                            -
                          </button>
                          <span className="px-3 text-xs font-mono tabular-nums text-[#231f20]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs text-[#231f20] hover:bg-[#d5e0ea]/40"
                            aria-label="Aumenta"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-xs sm:text-sm font-normal text-[#231f20] font-mono tabular-nums">
                          €{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer with Totals and Order Buttons */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-[#d5e0ea] bg-[#fafbfc] space-y-4">
                {/* Delivery Method Selector */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#231f20] font-medium mb-2">
                    Modalità di Consegna o Ritiro
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => setDeliveryType('pickup')}
                      className={`p-2.5 rounded-[2px] border text-left flex flex-col gap-1 transition-colors ${
                        deliveryType === 'pickup'
                          ? 'border-[#231f20] bg-white text-[#231f20]'
                          : 'border-[#d5e0ea] bg-transparent text-[#5f6368]'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-normal text-xs">
                        <Package className="w-3.5 h-3.5" />
                        <span>Ritiro in Negozio</span>
                      </div>
                      <span className="text-[10px] text-[#5f6368] font-light">
                        Corso Matteotti 7 · Gratuito
                      </span>
                    </button>

                    <button
                      onClick={() => setDeliveryType('delivery')}
                      className={`p-2.5 rounded-[2px] border text-left flex flex-col gap-1 transition-colors ${
                        deliveryType === 'delivery'
                          ? 'border-[#231f20] bg-white text-[#231f20]'
                          : 'border-[#d5e0ea] bg-transparent text-[#5f6368]'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-normal text-xs">
                        <Truck className="w-3.5 h-3.5" />
                        <span>Consegna Domicilio</span>
                      </div>
                      <span className="text-[10px] text-[#5f6368] font-light">
                        {isFreeShipping ? 'Gratuita' : '€10.00 (Espressa)'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Subtotals breakdown */}
                <div className="space-y-1.5 text-xs text-[#5f6368] font-light pt-2 border-t border-[#d5e0ea]">
                  <div className="flex justify-between">
                    <span>Subtotale fragranze</span>
                    <span className="font-mono text-[#231f20] tabular-nums">
                      €{cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>
                      {deliveryType === 'pickup' ? 'Ritiro in Boutique' : 'Spedizione espressa'}
                    </span>
                    <span className="font-mono text-[#231f20] tabular-nums">
                      {shippingFee === 0 ? 'Gratuito' : `€${shippingFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base text-[#231f20] font-normal pt-2 border-t border-[#d5e0ea]">
                    <span>Totale Stimato</span>
                    <span className="font-mono tabular-nums">
                      €{grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Action CTA Buttons */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={handleProceedToCheckout}
                    className="btn-pill-primary w-full py-3.5 text-xs uppercase tracking-widest cursor-pointer shadow-none flex items-center justify-center gap-2"
                  >
                    <span>Procedi all'Ordine</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleQuickWhatsAppOrder}
                    className="btn-ghost-luxury w-full py-2.5 text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2 bg-white"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>Invia Ordine Diretto via WhatsApp</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
