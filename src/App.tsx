import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { LoadingScreen } from './components/LoadingScreen';
import { Header } from './components/Header';
import { HeroIntro } from './components/HeroIntro';
import { MenuSection } from './components/MenuSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderStatusModal } from './components/OrderStatusModal';
import { Footer } from './components/Footer';
import { CartItem, MenuItem, Order } from './types';

export default function App() {
  const [showLoading, setShowLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [isOrderStatusOpen, setIsOrderStatusOpen] = useState(false);
  const [tableNumber, setTableNumber] = useState('');
  const [activeSection, setActiveSection] = useState('hero');

  // Add Item to Cart
  const handleAddToCart = (
    item: MenuItem,
    quantity = 1,
    selectedOptions: string[] = [],
    specialNotes = ''
  ) => {
    setCartItems((prevCart) => {
      // Check if exact same item with same options exists
      const existingIndex = prevCart.findIndex(
        (ci) =>
          ci.menuItem.id === item.id &&
          JSON.stringify(ci.selectedOptions || []) === JSON.stringify(selectedOptions) &&
          ci.specialNotes === specialNotes
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newCartItem: CartItem = {
          cartItemId: `${item.id}-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
          menuItem: item,
          quantity,
          selectedOptions,
          specialNotes,
        };
        return [...prevCart, newCartItem];
      }
    });
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((ci) => (ci.cartItemId === cartItemId ? { ...ci, quantity: newQty } : ci))
    );
  };

  // Remove Item
  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.cartItemId !== cartItemId));
  };

  // Totals calculations
  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + item.menuItem.price * item.quantity,
    0
  );
  const tax = Math.round(cartSubtotal * 0.08); // 8% tax
  const serviceFee = cartSubtotal > 0 ? 200 : 0; // 200 DA kitchen service fee
  const grandTotal = cartSubtotal + tax + serviceFee;
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Order submission handler
  const handleOrderSubmitted = (order: Order) => {
    setActiveOrder(order);
    if (order.tableNumber) {
      setTableNumber(order.tableNumber);
    }
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setCartItems([]); // Clear cart
    setIsOrderStatusOpen(true);
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-950 font-sans text-stone-100 selection:bg-orange-500 selection:text-white">
      
      {/* 1. Animated Burger Preparation Intro */}
      <AnimatePresence>
        {showLoading && <LoadingScreen onFinish={() => setShowLoading(false)} />}
      </AnimatePresence>

      {/* Main Website View */}
      {!showLoading && (
        <div className="flex flex-col min-h-screen animate-in fade-in duration-500">
          
          {/* Header */}
          <Header
            cartCount={totalCartCount}
            cartTotal={cartSubtotal}
            onOpenCart={() => setIsCartOpen(true)}
            activeOrder={activeOrder}
            onOpenOrderStatus={() => setIsOrderStatusOpen(true)}
            tableNumber={tableNumber}
            onSelectCategory={() => {
              scrollToSection('menu');
            }}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />

          {/* Body Content */}
          <main className="flex-1">
            {/* Hero & Restaurant Intro */}
            <HeroIntro
              onExploreMenu={() => scrollToSection('menu')}
              onAddToCart={(item) => handleAddToCart(item, 1)}
            />

            {/* Interactive Menu Section */}
            <MenuSection
              onAddToCart={handleAddToCart}
              cartItems={cartItems}
            />
          </main>

          {/* Footer */}
          <Footer
            onReplayIntro={() => setShowLoading(true)}
          />

          {/* Drawers and Modals */}
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveCartItem}
            onProceedToCheckout={() => {
              setIsCartOpen(false);
              setIsCheckoutOpen(true);
            }}
            subtotal={cartSubtotal}
            tax={tax}
            serviceFee={serviceFee}
            totalPrice={grandTotal}
          />

          <CheckoutModal
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            cartItems={cartItems}
            subtotal={cartSubtotal}
            tax={tax}
            serviceFee={serviceFee}
            totalPrice={grandTotal}
            onOrderSubmitted={handleOrderSubmitted}
            initialTableNumber={tableNumber}
          />

          <OrderStatusModal
            isOpen={isOrderStatusOpen}
            onClose={() => setIsOrderStatusOpen(false)}
            order={activeOrder}
            onAddMoreFood={() => scrollToSection('menu')}
          />

        </div>
      )}

    </div>
  );
}
