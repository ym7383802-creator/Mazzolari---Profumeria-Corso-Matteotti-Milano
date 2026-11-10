import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Package, Truck, MessageCircle, ArrowLeft, Phone, Calendar, Clock, MapPin, Printer } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { OrderCustomerInfo } from '../types/store';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    submitOrder,
    lastOrder,
    setLastOrder,
    storeInfo
  } = useStore();

  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    deliveryAddress: '',
    city: 'Milano',
    postalCode: '20121',
    pickupTimeNotes: 'Preferenza ritiro: pomeriggio (15:00 - 18:00)',
    paymentPreference: 'in_store' as 'in_store' | 'cod' | 'whatsapp'
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const isFreeShipping = cartTotal >= 120;
  const shippingFee = deliveryMethod === 'delivery' ? (isFreeShipping ? 0 : 10) : 0;
  const grandTotal = cartTotal + shippingFee;

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.fullName.trim()) errs.fullName = 'Inserisci nome e cognome';
    if (!formData.phone.trim()) errs.phone = 'Inserisci un recapito telefonico';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Inserisci un indirizzo email valido';
    if (deliveryMethod === 'delivery' && !formData.deliveryAddress.trim()) {
      errs.deliveryAddress = 'Inserisci indirizzo completo per la consegna';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const customerInfo: OrderCustomerInfo = {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        deliveryMethod,
        deliveryAddress: deliveryMethod === 'delivery' ? formData.deliveryAddress : undefined,
        city: deliveryMethod === 'delivery' ? formData.city : undefined,
        postalCode: deliveryMethod === 'delivery' ? formData.postalCode : undefined,
        pickupTimeNotes: formData.pickupTimeNotes,
        paymentPreference: formData.paymentPreference
      };

      submitOrder(customerInfo);
      setIsSubmitting(false);
    }, 600);
  };

  const handleWhatsAppCheckout = () => {
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrors({
        fullName: !formData.fullName.trim() ? 'Inserisci il tuo nome' : '',
        phone: !formData.phone.trim() ? 'Inserisci il tuo telefono' : ''
      });
      return;
    }

    const itemsText = cart
      .map(item => `• ${item.product.name} (${item.selectedSize}) x${item.quantity} = €${(item.price * item.quantity).toFixed(2)}`)
      .join('\n');

    const message = encodeURIComponent(
      `*NUOVO ORDINE - MAZZOLARI CORSO MATTEOTTI*\n` +
      `Cliente: ${formData.fullName}\n` +
      `Telefono: ${formData.phone}\n` +
      `Email: ${formData.email || 'Non indicata'}\n\n` +
      `*PRODOTTI SELEZIONATI:*\n${itemsText}\n\n` +
      `Modalità: ${deliveryMethod === 'pickup' ? 'Ritiro in Boutique (Corso Matteotti 7)' : `Consegna a: ${formData.deliveryAddress}, ${formData.postalCode} ${formData.city}`}\n` +
      `Totale: €${grandTotal.toFixed(2)}\n\n` +
      `Note: ${formData.pickupTimeNotes || 'Nessuna nota'}`
    );

    const cleanNumber = storeInfo.whatsappPhone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setLastOrder(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-[#231f20]/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 15 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl bg-[#ffffff] border border-[#231f20] rounded-[2px] shadow-2xl z-10 overflow-hidden my-8"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#d5e0ea] flex items-center justify-between bg-[#fafbfc]">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#5f6368] font-light block">
                Profumeria Mazzolari · Corso Giacomo Matteotti 7
              </span>
              <h3 className="text-xl font-light text-[#231f20]">
                {lastOrder ? "Conferma del Tuo Ordine" : "Completamento Ordine & Ritiro"}
              </h3>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 text-[#231f20] hover:text-[#000000] rounded-full border border-[#d5e0ea] hover:border-[#231f20] transition-colors"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Conditional Body: Order Form OR Confirmation Screen */}
          {lastOrder ? (
            /* Order Confirmation View */
            <div className="p-6 sm:p-10 text-center max-h-[80vh] overflow-y-auto">
              <div className="w-16 h-16 rounded-full bg-[#d5e0ea] flex items-center justify-center mx-auto mb-6 text-[#231f20]">
                <CheckCircle className="w-8 h-8 stroke-[1.5]" />
              </div>

              <span className="text-xs uppercase tracking-[0.2em] text-[#5f6368] font-light block mb-1">
                Ordine Ricevuto con Successo
              </span>
              <h3 className="text-2xl sm:text-3xl font-light text-[#231f20] tracking-tight mb-2">
                Grazie per la tua preferenza, {lastOrder.customer.fullName}
              </h3>
              <p className="text-sm font-mono text-[#231f20] mb-8">
                Numero di riferimento: <strong>#{lastOrder.id}</strong>
              </p>

              {/* Order Recap Box */}
              <div className="bg-[#fafbfc] border border-[#d5e0ea] rounded-[2px] p-6 text-left max-w-xl mx-auto mb-8 space-y-4 text-xs font-light">
                <div className="flex justify-between border-b border-[#d5e0ea] pb-3">
                  <span className="text-[#5f6368]">Data ordine:</span>
                  <span className="font-mono text-[#231f20]">{lastOrder.createdAt}</span>
                </div>

                <div className="flex justify-between border-b border-[#d5e0ea] pb-3">
                  <span className="text-[#5f6368]">Modalità scelta:</span>
                  <span className="text-[#231f20] font-normal">
                    {lastOrder.customer.deliveryMethod === 'pickup'
                      ? 'Ritiro in Boutique (Corso Matteotti 7, Milano)'
                      : `Consegna a domicilio (${lastOrder.customer.deliveryAddress})`}
                  </span>
                </div>

                {lastOrder.customer.deliveryMethod === 'pickup' && (
                  <div className="bg-[#d5e0ea]/40 p-3 rounded-[2px] text-[#231f20] text-xs">
                    <strong>Informazioni sul Ritiro:</strong> Il tuo pacchetto sarà pronto entro 2 ore presso la cassa principale di Mazzolari in Corso Giacomo Matteotti 7, 20121 Milano. Orari: Lun-Sab 10:00-19:00.
                  </div>
                )}

                <div>
                  <span className="text-[#5f6368] block mb-2 font-normal uppercase text-[10px] tracking-wider">
                    Fragranze ordinate:
                  </span>
                  <div className="space-y-2">
                    {lastOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>
                          {item.product.name} ({item.selectedSize}) x{item.quantity}
                        </span>
                        <span className="font-mono text-[#231f20] tabular-nums">
                          €{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#d5e0ea] flex justify-between text-sm font-normal text-[#231f20]">
                  <span>Totale Ordine</span>
                  <span className="font-mono tabular-nums">€{lastOrder.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons in Confirmation */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                <button
                  onClick={() => window.print()}
                  className="btn-ghost-luxury w-full sm:w-auto px-6 py-2.5 text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Stampa Ricevuta</span>
                </button>
                <button
                  onClick={handleClose}
                  className="btn-pill-primary w-full sm:w-auto px-8 py-3 text-xs uppercase tracking-widest"
                >
                  Torna alla Boutique
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
              
              {/* Delivery method toggle */}
              <div className="mb-8">
                <label className="block text-xs uppercase tracking-wider text-[#231f20] font-normal mb-3">
                  Scegli come ricevere il tuo acquisto:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('pickup')}
                    className={`p-4 rounded-[2px] border text-left flex items-start gap-3 transition-colors cursor-pointer ${
                      deliveryMethod === 'pickup'
                        ? 'border-[#231f20] bg-[#fafbfc]'
                        : 'border-[#d5e0ea] hover:border-[#231f20]'
                    }`}
                  >
                    <Package className="w-5 h-5 text-[#231f20] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-normal text-sm text-[#231f20]">
                        Ritiro in Boutique Mazzolari
                      </div>
                      <div className="text-xs text-[#5f6368] font-light mt-0.5">
                        Corso Giacomo Matteotti 7 · Gratuito · Pronto in 2 ore
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('delivery')}
                    className={`p-4 rounded-[2px] border text-left flex items-start gap-3 transition-colors cursor-pointer ${
                      deliveryMethod === 'delivery'
                        ? 'border-[#231f20] bg-[#fafbfc]'
                        : 'border-[#d5e0ea] hover:border-[#231f20]'
                    }`}
                  >
                    <Truck className="w-5 h-5 text-[#231f20] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-normal text-sm text-[#231f20]">
                        Consegna a Domicilio
                      </div>
                      <div className="text-xs text-[#5f6368] font-light mt-0.5">
                        {isFreeShipping ? 'Gratuita (ordine > €120)' : 'Spedizione Espressa €10.00'}
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Customer Contact Information */}
              <div className="space-y-4 mb-8">
                <h4 className="text-xs uppercase tracking-wider font-normal text-[#231f20] border-b border-[#d5e0ea] pb-2">
                  Dati di Contatto del Cliente
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#5f6368] font-light mb-1">
                      Nome e Cognome *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="es. Mario Rossi"
                      className="w-full px-3 py-2 text-sm border border-[#d5e0ea] focus:border-[#231f20] outline-none rounded-[2px]"
                    />
                    {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#5f6368] font-light mb-1">
                      Recapito Telefonico * (per WhatsApp e ritiro)
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+39 333 1234567"
                      className="w-full px-3 py-2 text-sm border border-[#d5e0ea] focus:border-[#231f20] outline-none rounded-[2px]"
                    />
                    {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#5f6368] font-light mb-1">
                    Indirizzo Email * (per la ricevuta d'ordine)
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nome@esempio.it"
                    className="w-full px-3 py-2 text-sm border border-[#d5e0ea] focus:border-[#231f20] outline-none rounded-[2px]"
                  />
                  {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                </div>

                {/* Conditional Delivery Address */}
                {deliveryMethod === 'delivery' && (
                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#5f6368] font-light mb-1">
                        Indirizzo di Spedizione Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.deliveryAddress}
                        onChange={e => setFormData({ ...formData, deliveryAddress: e.target.value })}
                        placeholder="Via / Piazza, Civico, Scala, Piano"
                        className="w-full px-3 py-2 text-sm border border-[#d5e0ea] focus:border-[#231f20] outline-none rounded-[2px]"
                      />
                      {errors.deliveryAddress && (
                        <p className="text-xs text-red-600 mt-1">{errors.deliveryAddress}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#5f6368] font-light mb-1">
                          Città
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={e => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-3 py-2 text-sm border border-[#d5e0ea] focus:border-[#231f20] outline-none rounded-[2px]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#5f6368] font-light mb-1">
                          CAP
                        </label>
                        <input
                          type="text"
                          value={formData.postalCode}
                          onChange={e => setFormData({ ...formData, postalCode: e.target.value })}
                          className="w-full px-3 py-2 text-sm border border-[#d5e0ea] focus:border-[#231f20] outline-none rounded-[2px]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Notes or Pickup Time */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#5f6368] font-light mb-1">
                    {deliveryMethod === 'pickup' ? 'Fascia oraria preferita per il ritiro / Note' : 'Note per il corriere o confezione regalo'}
                  </label>
                  <input
                    type="text"
                    value={formData.pickupTimeNotes}
                    onChange={e => setFormData({ ...formData, pickupTimeNotes: e.target.value })}
                    placeholder="es. Ritiro previsto per giovedì pomeriggio, confezione regalo gradita"
                    className="w-full px-3 py-2 text-sm border border-[#d5e0ea] focus:border-[#231f20] outline-none rounded-[2px]"
                  />
                </div>
              </div>

              {/* Order Recap Banner */}
              <div className="bg-[#fafbfc] border border-[#d5e0ea] p-4 rounded-[2px] mb-8">
                <div className="flex items-center justify-between text-xs text-[#5f6368] mb-1">
                  <span>Totale articoli ({cart.length})</span>
                  <span className="font-mono tabular-nums text-[#231f20]">€{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#5f6368] mb-2">
                  <span>Spedizione / Ritiro</span>
                  <span className="font-mono tabular-nums text-[#231f20]">
                    {shippingFee === 0 ? 'Gratuito' : `€${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex items-center justify-between text-base font-normal text-[#231f20] pt-2 border-t border-[#d5e0ea]">
                  <span>Totale da Saldare</span>
                  <span className="font-mono tabular-nums">€{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Two Active Submission Options */}
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-pill-primary w-full py-4 text-xs uppercase tracking-widest cursor-pointer shadow-none flex items-center justify-center gap-2"
                >
                  <Package className="w-4 h-4" />
                  <span>
                    {isSubmitting ? 'Elaborazione in corso...' : `Conferma Ordine (€${grandTotal.toFixed(2)})`}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  className="btn-ghost-luxury w-full py-3 text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2 bg-white"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Invia Riepilogo Ordine via WhatsApp (+39 02 795261)</span>
                </button>

                <p className="text-[11px] text-center text-[#5f6368] font-light pt-2">
                  Il pagamento potrà essere effettuato al momento del ritiro in boutique (Corso Matteotti 7) con carta o contanti, oppure tramite link sicuro per spedizioni.
                </p>
              </div>

            </form>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
