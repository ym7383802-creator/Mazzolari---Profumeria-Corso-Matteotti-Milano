import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, RotateCcw, Plus, Trash2, Sliders, Image, MapPin, Store, Tag, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types/store';

export const StoreCustomizerModal: React.FC = () => {
  const {
    isCustomizerOpen,
    setIsCustomizerOpen,
    storeInfo,
    updateStoreInfo,
    products,
    updateProduct,
    addProduct,
    deleteProduct,
    resetToDefaults
  } = useStore();

  const [activeTab, setActiveTab] = useState<'info' | 'media' | 'products' | 'hours'>('info');
  const [editingInfo, setEditingInfo] = useState(storeInfo);
  const [savedNotification, setSavedNotification] = useState(false);

  // Synchronize when opened
  React.useEffect(() => {
    if (isCustomizerOpen) {
      setEditingInfo(storeInfo);
    }
  }, [isCustomizerOpen, storeInfo]);

  if (!isCustomizerOpen) return null;

  const handleSaveInfo = () => {
    updateStoreInfo(editingInfo);
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2000);
  };

  const handleAddNewProduct = () => {
    const newProd: Product = {
      id: `custom-perfume-${Date.now()}`,
      name: 'Nuova Fragranza Esclusiva',
      brand: 'Mazzolari',
      subtitle: 'Eau de Parfum Nobile',
      category: 'Nicchia',
      concentration: 'Eau de Parfum',
      description: 'Descrizione olfattiva personalizzata per questa fragranza formulata a Milano.',
      olfactoryNotes: {
        top: ['Agrumi Nobili', 'Bergamotto'],
        heart: ['Iris di Firenze', 'Legni Bianchi'],
        base: ['Ambra Grigia', 'Muschio']
      },
      image: storeInfo.heroImage,
      sizes: [
        { size: '50 ml', price: 145, inStock: true },
        { size: '100 ml', price: 210, inStock: true }
      ],
      featured: false,
      badge: 'Nuova Selezione'
    };
    addProduct(newProd);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCustomizerOpen(false)}
          className="fixed inset-0 bg-[#231f20]/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 15 }}
          className="relative w-full max-w-4xl bg-[#ffffff] border border-[#231f20] rounded-[2px] shadow-2xl z-10 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#d5e0ea] flex items-center justify-between bg-[#fafbfc]">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#231f20]" />
              <div>
                <h3 className="text-base font-normal text-[#231f20] uppercase tracking-wider">
                  Area Gestione & Personalizzazione Negozio
                </h3>
                <span className="text-xs text-[#5f6368] font-light">
                  Modifica in tempo reale testi, immagini di copertina, prodotti, orari e recapiti
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCustomizerOpen(false)}
              className="p-1.5 text-[#231f20] hover:text-[#000000] rounded-full border border-[#d5e0ea] transition-colors"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#d5e0ea] px-6 bg-[#ffffff] gap-2 overflow-x-auto text-xs font-light">
            <button
              onClick={() => setActiveTab('info')}
              className={`py-3 px-4 border-b-2 uppercase tracking-wider cursor-pointer whitespace-nowrap transition-colors ${
                activeTab === 'info'
                  ? 'border-[#231f20] text-[#231f20] font-normal'
                  : 'border-transparent text-[#5f6368] hover:text-[#231f20]'
              }`}
            >
              Info Boutique & Contatti
            </button>
            <button
              onClick={() => setActiveTab('media')}
              className={`py-3 px-4 border-b-2 uppercase tracking-wider cursor-pointer whitespace-nowrap transition-colors ${
                activeTab === 'media'
                  ? 'border-[#231f20] text-[#231f20] font-normal'
                  : 'border-transparent text-[#5f6368] hover:text-[#231f20]'
              }`}
            >
              Cover Hero & Video
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`py-3 px-4 border-b-2 uppercase tracking-wider cursor-pointer whitespace-nowrap transition-colors ${
                activeTab === 'products'
                  ? 'border-[#231f20] text-[#231f20] font-normal'
                  : 'border-transparent text-[#5f6368] hover:text-[#231f20]'
              }`}
            >
              Catalogo Fragranze ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('hours')}
              className={`py-3 px-4 border-b-2 uppercase tracking-wider cursor-pointer whitespace-nowrap transition-colors ${
                activeTab === 'hours'
                  ? 'border-[#231f20] text-[#231f20] font-normal'
                  : 'border-transparent text-[#5f6368] hover:text-[#231f20]'
              }`}
            >
              Orari di Apertura
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
            
            {/* Tab 1: Info & Texts */}
            {activeTab === 'info' && (
              <div className="space-y-6 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#5f6368] uppercase tracking-wider mb-1">
                      Nome Negozio / Brand
                    </label>
                    <input
                      type="text"
                      value={editingInfo.name}
                      onChange={e => setEditingInfo({ ...editingInfo, name: e.target.value })}
                      className="w-full px-3 py-2 border border-[#d5e0ea] rounded-[2px] text-sm text-[#231f20]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#5f6368] uppercase tracking-wider mb-1">
                      Sottotitolo / Categoria
                    </label>
                    <input
                      type="text"
                      value={editingInfo.subtitle}
                      onChange={e => setEditingInfo({ ...editingInfo, subtitle: e.target.value })}
                      className="w-full px-3 py-2 border border-[#d5e0ea] rounded-[2px] text-sm text-[#231f20]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-[#5f6368] uppercase tracking-wider mb-1">
                      Indirizzo Fisico Boutique
                    </label>
                    <input
                      type="text"
                      value={editingInfo.address}
                      onChange={e => setEditingInfo({ ...editingInfo, address: e.target.value })}
                      className="w-full px-3 py-2 border border-[#d5e0ea] rounded-[2px] text-sm text-[#231f20]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#5f6368] uppercase tracking-wider mb-1">
                      Città & CAP
                    </label>
                    <input
                      type="text"
                      value={`${editingInfo.postalCode} ${editingInfo.city}`}
                      onChange={e => {
                        const parts = e.target.value.split(' ');
                        setEditingInfo({
                          ...editingInfo,
                          postalCode: parts[0] || '20121',
                          city: parts.slice(1).join(' ') || 'Milano'
                        });
                      }}
                      className="w-full px-3 py-2 border border-[#d5e0ea] rounded-[2px] text-sm text-[#231f20]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#5f6368] uppercase tracking-wider mb-1">
                      Telefono Fisso
                    </label>
                    <input
                      type="text"
                      value={editingInfo.phone}
                      onChange={e => setEditingInfo({ ...editingInfo, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-[#d5e0ea] rounded-[2px] text-sm text-[#231f20]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#5f6368] uppercase tracking-wider mb-1">
                      Numero WhatsApp per Ordini
                    </label>
                    <input
                      type="text"
                      value={editingInfo.whatsappPhone}
                      onChange={e => setEditingInfo({ ...editingInfo, whatsappPhone: e.target.value })}
                      className="w-full px-3 py-2 border border-[#d5e0ea] rounded-[2px] text-sm text-[#231f20]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#5f6368] uppercase tracking-wider mb-1">
                    Google Maps Plus Code
                  </label>
                  <input
                    type="text"
                    value={editingInfo.googleMapsCode}
                    onChange={e => setEditingInfo({ ...editingInfo, googleMapsCode: e.target.value })}
                    className="w-full px-3 py-2 border border-[#d5e0ea] rounded-[2px] text-sm text-[#231f20]"
                  />
                </div>

                <div>
                  <label className="block text-[#5f6368] uppercase tracking-wider mb-1">
                    Banner Annunci Top Bar
                  </label>
                  <input
                    type="text"
                    value={editingInfo.announcement}
                    onChange={e => setEditingInfo({ ...editingInfo, announcement: e.target.value })}
                    className="w-full px-3 py-2 border border-[#d5e0ea] rounded-[2px] text-sm text-[#231f20]"
                  />
                </div>

                <div className="pt-4 border-t border-[#d5e0ea]">
                  <label className="block text-[#5f6368] uppercase tracking-wider mb-1">
                    Titolo Sezione Chi Siamo
                  </label>
                  <input
                    type="text"
                    value={editingInfo.aboutTitle}
                    onChange={e => setEditingInfo({ ...editingInfo, aboutTitle: e.target.value })}
                    className="w-full px-3 py-2 border border-[#d5e0ea] rounded-[2px] text-sm text-[#231f20] mb-3"
                  />

                  <label className="block text-[#5f6368] uppercase tracking-wider mb-1">
                    Descrizione Sezione Chi Siamo
                  </label>
                  <textarea
                    rows={3}
                    value={editingInfo.aboutDescription}
                    onChange={e => setEditingInfo({ ...editingInfo, aboutDescription: e.target.value })}
                    className="w-full px-3 py-2 border border-[#d5e0ea] rounded-[2px] text-sm text-[#231f20]"
                  />
                </div>
              </div>
            )}

            {/* Tab 2: Media & Hero */}
            {activeTab === 'media' && (
              <div className="space-y-6 text-xs">
                <div>
                  <label className="block text-[#5f6368] uppercase tracking-wider mb-1">
                    Titolo Principale Hero
                  </label>
                  <input
                    type="text"
                    value={editingInfo.heroHeadline}
                    onChange={e => setEditingInfo({ ...editingInfo, heroHeadline: e.target.value })}
                    className="w-full px-3 py-2 border border-[#d5e0ea] rounded-[2px] text-sm text-[#231f20]"
                  />
                </div>

                <div>
                  <label className="block text-[#5f6368] uppercase tracking-wider mb-1">
                    Sottotitolo Hero
                  </label>
                  <textarea
                    rows={2}
                    value={editingInfo.heroSubheadline}
                    onChange={e => setEditingInfo({ ...editingInfo, heroSubheadline: e.target.value })}
                    className="w-full px-3 py-2 border border-[#d5e0ea] rounded-[2px] text-sm text-[#231f20]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#5f6368] uppercase tracking-wider mb-1">
                      URL Immagine di Copertina Hero
                    </label>
                    <input
                      type="text"
                      value={editingInfo.heroImage}
                      onChange={e => setEditingInfo({ ...editingInfo, heroImage: e.target.value })}
                      className="w-full px-3 py-2 border border-[#d5e0ea] rounded-[2px] text-sm text-[#231f20]"
                    />
                    <div className="mt-2 aspect-video bg-gray-100 rounded-[2px] overflow-hidden border border-[#d5e0ea]">
                      <img src={editingInfo.heroImage} alt="Anteprima Cover" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#5f6368] uppercase tracking-wider mb-1">
                      URL Immagine Sezione Boutique
                    </label>
                    <input
                      type="text"
                      value={editingInfo.storeImage}
                      onChange={e => setEditingInfo({ ...editingInfo, storeImage: e.target.value })}
                      className="w-full px-3 py-2 border border-[#d5e0ea] rounded-[2px] text-sm text-[#231f20]"
                    />
                    <div className="mt-2 aspect-video bg-gray-100 rounded-[2px] overflow-hidden border border-[#d5e0ea]">
                      <img src={editingInfo.storeImage} alt="Anteprima Boutique" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[#5f6368] uppercase tracking-wider mb-1">
                    URL Video di Sfondo Hero
                  </label>
                  <input
                    type="text"
                    value={editingInfo.heroVideo}
                    onChange={e => setEditingInfo({ ...editingInfo, heroVideo: e.target.value })}
                    className="w-full px-3 py-2 border border-[#d5e0ea] rounded-[2px] text-sm text-[#231f20]"
                  />
                </div>
              </div>
            )}

            {/* Tab 3: Products */}
            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#5f6368] font-light">
                    Modifica prezzi, nomi, note olfattive e immagini del catalogo
                  </span>
                  <button
                    onClick={handleAddNewProduct}
                    className="btn-pill-primary py-2 px-4 text-xs uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Aggiungi Fragranza</span>
                  </button>
                </div>

                <div className="divide-y divide-[#d5e0ea]">
                  {products.map(product => (
                    <div key={product.id} className="py-6 first:pt-0 space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-14 h-14 object-cover rounded-[2px] border border-[#d5e0ea]"
                          />
                          <div>
                            <h4 className="text-sm font-normal text-[#231f20]">{product.name}</h4>
                            <span className="text-xs text-[#5f6368]">{product.brand} · {product.category}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="text-red-600 hover:text-red-800 p-2 text-xs flex items-center gap-1"
                          title="Elimina fragranza"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Elimina</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <label className="text-[#5f6368] block mb-1">Nome Profumo</label>
                          <input
                            type="text"
                            value={product.name}
                            onChange={e => updateProduct(product.id, { name: e.target.value })}
                            className="w-full px-2.5 py-1.5 border border-[#d5e0ea] rounded-[2px]"
                          />
                        </div>
                        <div>
                          <label className="text-[#5f6368] block mb-1">Marchio / Maison</label>
                          <input
                            type="text"
                            value={product.brand}
                            onChange={e => updateProduct(product.id, { brand: e.target.value })}
                            className="w-full px-2.5 py-1.5 border border-[#d5e0ea] rounded-[2px]"
                          />
                        </div>
                        <div>
                          <label className="text-[#5f6368] block mb-1">Prezzo Base (€ 50ml)</label>
                          <input
                            type="number"
                            value={product.sizes[0]?.price || 150}
                            onChange={e => {
                              const val = parseFloat(e.target.value) || 0;
                              const updatedSizes = [...product.sizes];
                              if (updatedSizes[0]) updatedSizes[0].price = val;
                              updateProduct(product.id, { sizes: updatedSizes });
                            }}
                            className="w-full px-2.5 py-1.5 border border-[#d5e0ea] rounded-[2px] font-mono"
                          />
                        </div>
                      </div>

                      <div className="text-xs">
                        <label className="text-[#5f6368] block mb-1">Descrizione</label>
                        <textarea
                          rows={2}
                          value={product.description}
                          onChange={e => updateProduct(product.id, { description: e.target.value })}
                          className="w-full px-2.5 py-1.5 border border-[#d5e0ea] rounded-[2px]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Hours */}
            {activeTab === 'hours' && (
              <div className="space-y-4 text-xs">
                <span className="text-[#5f6368] font-light block mb-2">
                  Imposta gli orari di apertura e i giorni di chiusura della boutique:
                </span>
                {editingInfo.openingHours.map((schedule, idx) => (
                  <div key={schedule.day} className="flex items-center gap-4 py-2 border-b border-[#d5e0ea]">
                    <span className="w-28 font-medium text-[#231f20]">{schedule.day}</span>
                    <input
                      type="text"
                      value={schedule.hours}
                      onChange={e => {
                        const newHours = [...editingInfo.openingHours];
                        newHours[idx] = { ...newHours[idx], hours: e.target.value };
                        setEditingInfo({ ...editingInfo, openingHours: newHours });
                      }}
                      className="flex-1 px-3 py-1.5 border border-[#d5e0ea] rounded-[2px] font-mono text-xs"
                    />
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Footer of Customizer */}
          <div className="p-4 sm:p-6 border-t border-[#d5e0ea] bg-[#fafbfc] flex items-center justify-between">
            <button
              onClick={() => {
                if (window.confirm('Vuoi davvero ripristinare tutti i dati originali certificati di Mazzolari?')) {
                  resetToDefaults();
                  setEditingInfo(storeInfo);
                }
              }}
              className="btn-ghost-luxury text-xs text-[#5f6368] hover:text-[#231f20] flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Ripristina Originali</span>
            </button>

            <div className="flex items-center gap-3">
              {savedNotification && (
                <span className="text-xs text-emerald-700 font-normal">
                  Modifiche salvate con successo!
                </span>
              )}
              <button
                onClick={handleSaveInfo}
                className="btn-pill-primary text-xs uppercase tracking-wider py-2.5 px-6 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Salva Modifiche</span>
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
