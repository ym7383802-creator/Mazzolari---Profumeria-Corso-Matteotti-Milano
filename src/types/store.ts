export interface ProductSize {
  size: string;
  price: number;
  inStock: boolean;
}

export interface OlfactoryNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  subtitle: string;
  category: 'Donna' | 'Uomo' | 'Unisex' | 'Nicchia' | 'Esclusivi' | 'Nuovi';
  concentration: string;
  description: string;
  olfactoryNotes: OlfactoryNotes;
  image: string;
  sizes: ProductSize[];
  featured?: boolean;
  badge?: string;
}

export interface CartItem {
  id: string; // product.id + '-' + size
  product: Product;
  selectedSize: string;
  price: number;
  quantity: number;
}

export interface StoreHours {
  day: string;
  hours: string;
  closed?: boolean;
}

export interface StoreInfo {
  name: string;
  subtitle: string;
  description: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroImage: string;
  heroVideo: string;
  useVideo: boolean;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  googleMapsCode: string;
  googleMapsEmbedUrl: string;
  phone: string;
  whatsappPhone: string;
  rating: number;
  reviewsCount: number;
  openingHours: StoreHours[];
  aboutTitle: string;
  aboutDescription: string;
  aboutDetail: string;
  storeImage: string;
  announcement: string;
  socialInstagram: string;
  socialFacebook: string;
}

export interface OrderCustomerInfo {
  fullName: string;
  phone: string;
  email: string;
  deliveryMethod: 'pickup' | 'delivery';
  deliveryAddress?: string;
  city?: string;
  postalCode?: string;
  pickupTimeNotes?: string;
  paymentPreference: 'in_store' | 'cod' | 'whatsapp';
}

export interface OrderRecord {
  id: string;
  createdAt: string;
  customer: OrderCustomerInfo;
  items: CartItem[];
  subtotal: number;
  deliveryCost: number;
  total: number;
  status: 'confermato' | 'in_preparazione' | 'pronto';
}
