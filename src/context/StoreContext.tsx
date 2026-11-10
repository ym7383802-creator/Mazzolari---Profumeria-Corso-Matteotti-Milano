import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, StoreInfo, OrderRecord, OrderCustomerInfo } from '../types/store';
import { INITIAL_STORE_INFO, INITIAL_PRODUCTS } from '../config/storeData';

interface StoreContextType {
  storeInfo: StoreInfo;
  products: Product[];
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCustomizerOpen: boolean;
  setIsCustomizerOpen: (open: boolean) => void;
  activeProductDetail: Product | null;
  setActiveProductDetail: (product: Product | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  lastOrder: OrderRecord | null;
  setLastOrder: (order: OrderRecord | null) => void;
  orders: OrderRecord[];
  
  // Cart actions
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Store & Product live editing
  updateStoreInfo: (updated: Partial<StoreInfo>) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  addProduct: (newProduct: Product) => void;
  deleteProduct: (id: string) => void;
  resetToDefaults: () => void;

  // Checkout submission
  submitOrder: (customer: OrderCustomerInfo) => OrderRecord;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEY_STORE = 'mazzolari_matteotti_store_v1';
const STORAGE_KEY_PRODUCTS = 'mazzolari_matteotti_products_v1';
const STORAGE_KEY_CART = 'mazzolari_matteotti_cart_v1';
const STORAGE_KEY_ORDERS = 'mazzolari_matteotti_orders_v1';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [storeInfo, setStoreInfo] = useState<StoreInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STORE);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.heroVideo && parsed.heroVideo.includes('aistudio')) {
          parsed.heroVideo = INITIAL_STORE_INFO.heroVideo;
        }
        return parsed;
      }
      return INITIAL_STORE_INFO;
    } catch {
      return INITIAL_STORE_INFO;
    }
  });

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ORDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [activeProductDetail, setActiveProductDetail] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<OrderRecord | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STORE, JSON.stringify(storeInfo));
    } catch (e) {
      console.warn('Failed to save store info to localStorage', e);
    }
  }, [storeInfo]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.warn('Failed to save products to localStorage', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.warn('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  // Cart calculations
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product: Product, size: string, quantity: number = 1) => {
    const sizeObj = product.sizes.find(s => s.size === size) || product.sizes[0];
    const price = sizeObj ? sizeObj.price : 150;
    const cartItemId = `${product.id}-${size}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { id: cartItemId, product, selectedSize: size, price, quantity }];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Live editing handlers
  const updateStoreInfo = (updated: Partial<StoreInfo>) => {
    setStoreInfo(prev => ({ ...prev, ...updated }));
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updated } : p)));
  };

  const addProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setCart(prev => prev.filter(item => item.product.id !== id));
  };

  const resetToDefaults = () => {
    setStoreInfo(INITIAL_STORE_INFO);
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem(STORAGE_KEY_STORE);
    localStorage.removeItem(STORAGE_KEY_PRODUCTS);
  };

  const submitOrder = (customer: OrderCustomerInfo): OrderRecord => {
    const deliveryCost = customer.deliveryMethod === 'delivery' && cartTotal < 120 ? 10 : 0;
    const finalTotal = cartTotal + deliveryCost;
    const orderNumber = `MZL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: OrderRecord = {
      id: orderNumber,
      createdAt: new Date().toLocaleDateString('it-IT', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      customer,
      items: [...cart],
      subtotal: cartTotal,
      deliveryCost,
      total: finalTotal,
      status: 'confermato'
    };

    setOrders(prev => [newOrder, ...prev]);
    setLastOrder(newOrder);
    clearCart();
    return newOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        storeInfo,
        products,
        cart,
        isCartOpen,
        setIsCartOpen,
        isCustomizerOpen,
        setIsCustomizerOpen,
        activeProductDetail,
        setActiveProductDetail,
        isCheckoutOpen,
        setIsCheckoutOpen,
        lastOrder,
        setLastOrder,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        updateStoreInfo,
        updateProduct,
        addProduct,
        deleteProduct,
        resetToDefaults,
        submitOrder
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
