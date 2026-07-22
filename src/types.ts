export type MenuCategory = 'all' | 'burgers' | 'tacos' | 'pizza' | 'drinks' | 'sides';

export interface MenuItem {
  id: string;
  name: string;
  category: 'burgers' | 'tacos' | 'pizza' | 'drinks' | 'sides';
  price: number;
  description: string;
  ingredients: string[];
  image: string;
  calories: number;
  isSpicy?: boolean;
  isVegetarian?: boolean;
  isPopular?: boolean;
  prepTimeMinutes: number;
  customizableOptions?: string[];
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  quantity: number;
  specialNotes?: string;
  selectedOptions?: string[];
}

export type OrderStatus = 'received' | 'preparing' | 'cooking' | 'ready' | 'served';
export type PaymentMethod = 'card' | 'apple_pay' | 'cash_table';

export interface Order {
  id: string;
  items: CartItem[];
  customerName: string;
  tableNumber: string;
  specialInstructions?: string;
  subtotal: number;
  tax: number;
  serviceFee: number;
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
  paymentMethod: PaymentMethod;
  estimatedTimeMinutes: number;
  progressPercent: number;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingPreference: 'indoor' | 'patio' | 'booth' | 'chef_counter';
  specialRequests?: string;
  status: 'confirmed' | 'cancelled';
  tableAssigned: string;
}
