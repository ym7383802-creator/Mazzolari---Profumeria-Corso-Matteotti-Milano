import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface Testimonial {
  quote: string;
  author: string;
  context: string;
  rating: number;
}

const REVIEWS: Testimonial[] = [
  {
    quote: "La profumeria più raffinata di Milano. Entrare in Corso Matteotti è un'esperienza sensoriale unica: il personale ti guida con estrema competenza alla scoperta di fragranze che non troveresti altrove.",
    author: "Elena V.",
    context: "Recensione verificata Google · Cliente Storica",
    rating: 5
  },
  {
    quote: "Ho utilizzato il servizio di ritiro in negozio: ho ordinato online e in meno di due ore il mio profumo Mazzolari Lui era pronto con una confezione regalo impeccabile e campioncini squisiti.",
    author: "Marco B.",
    context: "Recensione verificata Google · Ritiro in Boutique",
    rating: 5
  },
  {
    quote: "Selezione di profumi di nicchia senza eguali. L'atmosfera è accogliente, inclusiva e sofisticata. Un punto fermo nel quadrilatero di Milano per chi ama i veri capolavori olfattivi.",
    author: "Chiara & Davide T.",
    context: "Recensione verificata Google · Acquisto in Boutique",
    rating: 5
  }
];

export const TestimonialBand: React.FC = () => {
  const { storeInfo } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex(prev => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex(prev => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const current = REVIEWS[currentIndex];

  return (
    <section id="recensioni" className="bg-[#d5e0ea] py-20 px-4 sm:px-6 border-b border-[#c4d4e2] scroll-mt-20">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        
        {/* Verified Google Rating Pill-Free Banner */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#231f20] font-light mb-6">
          <span className="font-normal">Valutazione Ufficiale Google: {storeInfo.rating} / 5</span>
          <span>·</span>
          <span>{storeInfo.reviewsCount} Recensioni Verificate</span>
        </div>

        {/* 5-Star Row in #231f20 */}
        <div className="flex items-center gap-1.5 mb-8">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-[#231f20] text-[#231f20]" />
          ))}
        </div>

        {/* Quoted review text in weight 300 */}
        <blockquote className="text-xl sm:text-2xl md:text-3xl font-light text-[#231f20] leading-snug tracking-tight max-w-3xl mb-8 min-h-[120px] flex items-center justify-center">
          “{current.quote}”
        </blockquote>

        {/* Reviewer attribution */}
        <div className="text-xs tracking-wider text-[#231f20] mb-8">
          <div className="font-normal uppercase">{current.author}</div>
          <div className="text-[#5f6368] font-light mt-0.5">{current.context}</div>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={prevReview}
            className="w-9 h-9 rounded-[2px] border border-[#231f20] flex items-center justify-center text-[#231f20] hover:bg-[#231f20] hover:text-white transition-colors cursor-pointer"
            aria-label="Recensione precedente"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="text-xs font-mono text-[#231f20]">
            0{currentIndex + 1} / 0{REVIEWS.length}
          </div>
          <button
            onClick={nextReview}
            className="w-9 h-9 rounded-[2px] border border-[#231f20] flex items-center justify-center text-[#231f20] hover:bg-[#231f20] hover:text-white transition-colors cursor-pointer"
            aria-label="Prossima recensione"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
