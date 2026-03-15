export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  weight: string;
  shelfLife: string;
  description: string;
  shortDescription: string;
  ingredients: string[];
  image: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedWeight?: string;
  unitMultiplier?: number;
  unitPrice?: number;
}

export interface Batch {
  id: string;
  productId: string;
  productName: string;
  manufactureDate: string;
  expiryDate: string;
  quantity: number;
  status: 'fresh' | 'expiring-soon' | 'expired';
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: 'online' | 'cod';
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderStatus: 'placed' | 'confirmed' | 'packed' | 'shipped' | 'out-for-delivery' | 'delivered';
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  ordersCount: number;
  totalSpending: number;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}
