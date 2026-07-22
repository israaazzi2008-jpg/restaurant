import React, { useEffect, useState } from 'react';
import { Clock, Utensils, CheckCircle2, Bell, Sparkles, X, ChevronRight, Flame, ShieldCheck, ShoppingBag } from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface OrderStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onUpdateOrderStatus?: (status: OrderStatus) => void;
  onAddMoreFood?: () => void;
}

const STATUS_STEPS: { id: OrderStatus; label: string; desc: string; icon: string; percent: number }[] = [
  { id: 'received', label: 'Order Received', desc: 'Sent to master kitchen queue', icon: '📝', percent: 20 },
  { id: 'preparing', label: 'Kitchen Preparing', desc: 'Prepping fresh dough & ingredients', icon: '🥗', percent: 45 },
  { id: 'cooking', label: 'Grilling & Baking', desc: 'Smash burgers on grill & woodfired oven', icon: '🔥', percent: 75 },
  { id: 'ready', label: 'En Route to Table', desc: 'Served hot directly to your table', icon: '🏃‍♂️', percent: 90 },
  { id: 'served', label: 'Served & Ready', desc: 'Bon Appétit!', icon: '✨', percent: 100 },
];

export const OrderStatusModal: React.FC<OrderStatusModalProps> = ({
  isOpen,
  onClose,
  order,
  onAddMoreFood,
}) => {
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const [waiterCalled, setWaiterCalled] = useState(false);
  const [napkinsRequested, setNapkinsRequested] = useState(false);

  // Auto-advance real-time simulation
  useEffect(() => {
    if (!order) return;

    // Reset status index on order load
    const initialIndex = STATUS_STEPS.findIndex((s) => s.id === order.status);
    setCurrentStatusIndex(initialIndex >= 0 ? initialIndex : 0);

    const timer = setInterval(() => {
      setCurrentStatusIndex((prev) => {
        if (prev < STATUS_STEPS.length - 1) {
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
    }, 8000); // Advances step every 8 seconds in real-time simulation

    return () => clearInterval(timer);
  }, [order]);

  if (!isOpen || !order) return null;

  const currentStep = STATUS_STEPS[currentStatusIndex];

  const handleCallWaiter = () => {
    setWaiterCalled(true);
    setTimeout(() => setWaiterCalled(false), 4000);
  };

  const handleRequestNapkins = () => {
    setNapkinsRequested(true);
    setTimeout(() => setNapkinsRequested(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-orange-100 text-xs font-black uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span>Real-Time Kitchen Tracker</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl font-black font-serif">Order #{order.id}</h2>
              <p className="text-xs text-orange-100">
                Customer: <span className="font-bold text-white">{order.customerName}</span> • Table <span className="font-bold text-white">#{order.tableNumber}</span>
              </p>
            </div>

            <div className="bg-white/20 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/30 text-right">
              <div className="text-[10px] text-orange-100 uppercase tracking-wider font-semibold">Total Price Paid</div>
              <div className="text-xl font-black text-white">${order.totalPrice.toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* Live Progress Bar Section */}
        <div className="p-6 space-y-6">
          
          {/* Main Status Display Box */}
          <div className="bg-orange-50 rounded-2xl p-5 border border-orange-200 text-center relative overflow-hidden">
            <div className="text-4xl mb-2">{currentStep.icon}</div>
            <h3 className="text-xl font-black font-serif text-stone-900 mb-1">
              {currentStep.label}
            </h3>
            <p className="text-xs font-medium text-stone-600 mb-4 max-w-sm mx-auto">
              {currentStep.desc}
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-orange-200/60 rounded-full h-3 mb-2 overflow-hidden p-0.5">
              <div
                className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full transition-all duration-700 shadow-xs"
                style={{ width: `${currentStep.percent}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-[11px] font-bold text-orange-800 px-1">
              <span>{currentStep.percent}% Complete</span>
              <span>
                {currentStatusIndex === STATUS_STEPS.length - 1
                  ? 'Served on Table!'
                  : `Est. time: ~${Math.max(1, 15 - currentStatusIndex * 3)} mins`}
              </span>
            </div>
          </div>

          {/* Stepper Steps List */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-stone-400">
              Kitchen Preparation Steps
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
              {STATUS_STEPS.map((step, idx) => {
                const isPassed = idx <= currentStatusIndex;
                const isCurrent = idx === currentStatusIndex;

                return (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStatusIndex(idx)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex sm:flex-col items-center justify-between gap-2 ${
                      isCurrent
                        ? 'bg-orange-600 text-white border-orange-600 shadow-md'
                        : isPassed
                        ? 'bg-orange-50 text-orange-950 border-orange-200'
                        : 'bg-stone-50 text-stone-400 border-stone-200 opacity-60'
                    }`}
                  >
                    <span className="text-lg">{step.icon}</span>
                    <div className="text-left sm:text-center w-full">
                      <div className="text-[11px] font-bold truncate leading-tight">{step.label}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Table Service Call Buttons */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-stone-900">Table #{order.tableNumber} Service Controls</div>
              <div className="text-[11px] text-stone-500">Need anything during your meal? Signal our waiters instantly.</div>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleCallWaiter}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  waiterCalled
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-900 text-white hover:bg-orange-600'
                }`}
              >
                <Bell className="w-3.5 h-3.5" />
                <span>{waiterCalled ? 'Waiter Notified! 🏃‍♂️' : 'Call Waiter'}</span>
              </button>

              <button
                onClick={handleRequestNapkins}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  napkinsRequested
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <span>{napkinsRequested ? 'Napkins Coming! ✨' : 'Request Napkins'}</span>
              </button>
            </div>
          </div>

          {/* Item Breakdown Summary */}
          <div className="border-t border-stone-100 pt-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-stone-900 mb-2.5">
              Ordered Dish Breakdown
            </h4>

            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between bg-stone-50 p-2.5 rounded-xl text-xs">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.menuItem.image}
                      alt={item.menuItem.name}
                      className="w-10 h-10 rounded-lg object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="font-bold text-stone-900">{item.quantity}x {item.menuItem.name}</div>
                      {item.selectedOptions && item.selectedOptions.length > 0 && (
                        <div className="text-[10px] text-stone-500">{item.selectedOptions.join(', ')}</div>
                      )}
                      {item.specialNotes && (
                        <div className="text-[10px] font-mono text-orange-700 bg-orange-100 px-2 py-0.5 rounded mt-1 inline-block border border-orange-200">
                          💬 "{item.specialNotes}"
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="font-bold text-orange-600">
                    {(item.menuItem.price * item.quantity).toLocaleString()} DA
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            {onAddMoreFood && (
              <button
                onClick={() => {
                  onClose();
                  onAddMoreFood();
                }}
                className="flex-1 py-3 bg-orange-100 hover:bg-orange-200 text-orange-900 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add More Food to Table</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Close Tracker
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
