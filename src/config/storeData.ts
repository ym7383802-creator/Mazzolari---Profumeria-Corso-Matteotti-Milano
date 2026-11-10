import { StoreInfo, Product } from '../types/store';

export const INITIAL_STORE_INFO: StoreInfo = {
  name: "Mazzolari - Corso Matteotti",
  subtitle: "Profumeria d'Autore · Milano",
  description: "Boutique storica e tempio della profumeria artistica e di nicchia nel quadrilatero della moda di Milano.",
  heroHeadline: "L'Arte della Profumeria d'Autore a Milano",
  heroSubheadline: "Da decenni in Corso Matteotti 7, custodiamo le creazioni olfattive più ricercate del mondo. Fragranze rare, materie prime nobili e consulenza sartoriale.",
  heroImage: "/src/assets/images/hero_mazzolari_matteotti_1794326353007.jpg",
  heroVideo: "/assets/media/boutique_atmosphere.mp4",
  useVideo: false,
  address: "Corso Giacomo Matteotti, 7",
  city: "Milano MI",
  postalCode: "20121",
  country: "Italia",
  googleMapsCode: "F58W+R8 Milano, Provincia di Milano, Italia",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.147250499694!2d9.1963242!3d45.4682498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c6b12a819077%3A0x67db2011b981f4a9!2sCorso%20Giacomo%20Matteotti%2C%207%2C%2020121%20Milano%20MI!5e0!3m2!1sit!2sit!4v1700000000000",
  phone: "+39 02 795261",
  whatsappPhone: "+39 02 795261",
  rating: 4.4,
  reviewsCount: 133,
  openingHours: [
    { day: "Lunedì", hours: "10:00 – 19:00" },
    { day: "Martedì", hours: "10:00 – 19:00" },
    { day: "Mercoledì", hours: "10:00 – 19:00" },
    { day: "Giovedì", hours: "10:00 – 19:00" },
    { day: "Venerdì", hours: "10:00 – 19:00" },
    { day: "Sabato", hours: "10:00 – 19:00" },
    { day: "Domenica", hours: "Chiuso", closed: true }
  ],
  aboutTitle: "Un'Istituzione Olfattiva a Milano",
  aboutDescription: "Nel cuore vibrante di Milano, a due passi da Piazza San Babila e Via Montenapoleone, Mazzolari in Corso Matteotti 7 è un punto di riferimento assoluto per estimatori, collezionisti e amanti del bello.",
  aboutDetail: "La nostra boutique accoglie ogni ospite con discrezione, competenza e sensibilità, offrendo un viaggio immersivo tra le maison storiche, i nasi indipendenti e le creazioni esclusive firmate Mazzolari. Spazio inclusivo e LGBTQ+ friendly.",
  storeImage: "/src/assets/images/store_matteotti_milano_1794326354974.jpg",
  announcement: "Spedizione gratuita a Milano e in tutta Italia per ordini superiori a €120 · Ritiro in boutique disponibile in 2 ore",
  socialInstagram: "@mazzolarimilano",
  socialFacebook: "Profumeria Mazzolari Milano"
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "mazzolari-lui",
    name: "Lui",
    brand: "Mazzolari",
    subtitle: "Eau de Parfum Intenso",
    category: "Uomo",
    concentration: "Eau de Parfum",
    description: "Una leggenda della profumeria d'autore maschile. Caldo, carismatico e avvolgente, unisce le note terrose del patchouli indonesiano al sandalo cremoso e alla sensualità dell'ambra.",
    olfactoryNotes: {
      top: ["Bergamotto di Calabria", "Cardamomo"],
      heart: ["Patchouli Nobile", "Legno di Cedro", "Sandalo di Mysore"],
      base: ["Ambra Grigia", "Cuoio Morbido", "Vetiver Bourbon"]
    },
    image: "/src/assets/images/perfume_mazzolari_lui_1794326353808.jpg",
    sizes: [
      { size: "50 ml", price: 135, inStock: true },
      { size: "100 ml", price: 195, inStock: true },
      { size: "250 ml", price: 340, inStock: true }
    ],
    featured: true,
    badge: "Icona Bestseller"
  },
  {
    id: "mazzolari-alessandro",
    name: "Alessandro",
    brand: "Mazzolari",
    subtitle: "Eau de Parfum Gourmand",
    category: "Unisex",
    concentration: "Eau de Parfum",
    description: "Un inno alla dolcezza raffinata dell'infanzia e all'alta pasticceria milanese. Note vellutate di mandorla tostata e miele dorato che si fondono con l'eliotropio e una vaniglia soffice.",
    olfactoryNotes: {
      top: ["Mandorla Dolce", "Anice Stellato"],
      heart: ["Eliotropio", "Miele Fiorito", "Fiori Bianchi"],
      base: ["Bacche di Vaniglia", "Muschio Bianco", "Fava Tonka"]
    },
    image: "/src/assets/images/perfume_mazzolari_alessandro_1794326354547.jpg",
    sizes: [
      { size: "50 ml", price: 140, inStock: true },
      { size: "100 ml", price: 205, inStock: true }
    ],
    featured: true,
    badge: "Firma Esclusiva"
  },
  {
    id: "mazzolari-oscura",
    name: "Oscura Milano",
    brand: "Mazzolari",
    subtitle: "Eau de Parfum di Nicchia",
    category: "Nicchia",
    concentration: "Eau de Parfum",
    description: "Un viaggio notturno tra le architetture storiche e i portoni segreti di Milano. Fumoso, misterioso, impreziosito da incenso sacro dell'Oman e resine ambrate.",
    olfactoryNotes: {
      top: ["Pepe Nero", "Elemi", "Bacche di Ginepro"],
      heart: ["Incenso Somalo", "Iris Fiorentino", "Cuoio Antico"],
      base: ["Legno di Guaiaco", "Oud Affumicato", "Benjoin"]
    },
    image: "/src/assets/images/perfume_nicchia_oud_1794326355156.jpg",
    sizes: [
      { size: "50 ml", price: 165, inStock: true },
      { size: "100 ml", price: 245, inStock: true }
    ],
    featured: true,
    badge: "Collezione Notturna"
  },
  {
    id: "aura-de-miel",
    name: "Aura de Miel",
    brand: "Mazzolari Privée",
    subtitle: "Eau de Parfum Floreale Caldo",
    category: "Donna",
    concentration: "Eau de Parfum",
    description: "Luminosa e radiosa come i raggi del sole su una terrazza fiorita. I fiori d'arancio mediterranei si intrecciano con miele d'acacia e muschi avvolgenti.",
    olfactoryNotes: {
      top: ["Neroli", "Mandorla Verde", "Fiori d'Arancio"],
      heart: ["Gelsomino Sambac", "Miele Dorato", "Rosa Centifolia"],
      base: ["Vaniglia Bourbon", "Sandalo", "Cashmeran"]
    },
    image: "/src/assets/images/perfume_donna_vaniglia_1794326411883.jpg",
    sizes: [
      { size: "50 ml", price: 130, inStock: true },
      { size: "100 ml", price: 190, inStock: true }
    ],
    featured: false,
    badge: "Nuovo Arrivo"
  },
  {
    id: "aurore-agrume",
    name: "Aurore Agrume",
    brand: "Mazzolari",
    subtitle: "Cologne d'Auteur Rinfrescante",
    category: "Unisex",
    concentration: "Eau de Parfum",
    description: "La freschezza cristallina di un mattino estivo in riva al Lago di Como. Pura spremitura di agrumi nobili italiani, rinvigorita da tocchi aromatici di rosmarino e petitgrain.",
    olfactoryNotes: {
      top: ["Bergamotto di Reggio", "Limone di Amalfi", "Pompelmo Rosa"],
      heart: ["Petitgrain", "Rosmarino Selvatico", "Lavanda di Provenza"],
      base: ["Muschio di Quercia", "Cedro dell'Atlante", "Ambroxan"]
    },
    image: "/src/assets/images/perfume_fresco_bergamotto_1794326412978.jpg",
    sizes: [
      { size: "50 ml", price: 120, inStock: true },
      { size: "100 ml", price: 175, inStock: true }
    ],
    featured: false
  },
  {
    id: "ambra-architectura",
    name: "Ambra Architectura",
    brand: "Mazzolari Collezione Oro",
    subtitle: "Extrait de Parfum Puro",
    category: "Esclusivi",
    concentration: "Extrait de Parfum (30%)",
    description: "Creazione ad altissima concentrazione formulata per la boutique di Corso Matteotti. Un monumento scultoreo di ambra grigia naturale, labdano e vaniglia millesimata.",
    olfactoryNotes: {
      top: ["Zafferano Persiano", "Arancia Amara"],
      heart: ["Labdano Andaluso", "Ambra Grigia Rara", "Patchouli"],
      base: ["Vaniglia Nera", "Balsamo del Tolù", "Legno di Agarwood"]
    },
    image: "/src/assets/images/perfume_esclusivo_ambra_1794326412872.jpg",
    sizes: [
      { size: "50 ml", price: 220, inStock: true },
      { size: "100 ml", price: 320, inStock: true }
    ],
    featured: true,
    badge: "Edizione Limitata"
  }
];
