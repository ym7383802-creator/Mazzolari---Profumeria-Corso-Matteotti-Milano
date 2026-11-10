import React from 'react';
import { MapPin, Clock, ShieldCheck } from 'lucide-react';

export const BrandStrip: React.FC = () => {
  const features = [
    {
      icon: MapPin,
      label: "Boutique Storica",
      desc: "Corso Giacomo Matteotti 7, Milano"
    },
    {
      icon: Clock,
      label: "Ritiro in Negozio",
      desc: "Pronto in sole 2 ore dal tuo ordine"
    },
    {
      icon: ShieldCheck,
      label: "Autenticità Garantita",
      desc: "Flaconi originali 100% certificati"
    }
  ];

  return (
    <section className="bg-[#d5e0ea] py-8 px-4 sm:px-6 border-b border-[#c2d2df]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 items-center">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center px-2 py-1"
              >
                <Icon className="w-5 h-5 text-[#231f20] stroke-[1.2] mb-2" />
                <span className="text-xs uppercase tracking-wider font-normal text-[#231f20]">
                  {item.label}
                </span>
                <span className="text-[11px] text-[#231f20]/75 font-light mt-0.5 max-w-[170px] leading-tight">
                  {item.desc}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
