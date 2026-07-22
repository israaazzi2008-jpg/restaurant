import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, Flame, Plus, Check, Info, SlidersHorizontal, Sparkles, X, Minus } from 'lucide-react';
import { MENU_ITEMS } from '../data/menuData';
import { MenuItem, MenuCategory, CartItem } from '../types';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem, quantity?: number, options?: string[], notes?: string) => void;
  cartItems: CartItem[];
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onAddToCart, cartItems }) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpicyOnly, setFilterSpicyOnly] = useState(false);
  const [filterVegOnly, setFilterVegOnly] = useState(false);
  const [detailModalItem, setDetailModalItem] = useState<MenuItem | null>(null);

  // Modal customization state
  const [modalQuantity, setModalQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [specialNotes, setSpecialNotes] = useState('');
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  // Filter menu items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category check
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Search query check (search name, ingredients, or description)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesIng = item.ingredients.some((ing) => ing.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesIng) return false;
      }
      // Spicy check
      if (filterSpicyOnly && !item.isSpicy) return false;
      // Veg check
      if (filterVegOnly && !item.isVegetarian) return false;

      return true;
    });
  }, [selectedCategory, searchQuery, filterSpicyOnly, filterVegOnly]);

  const handleOpenDetail = (item: MenuItem) => {
    setDetailModalItem(item);
    setModalQuantity(1);
    setSelectedOptions([]);
    setSpecialNotes('');
  };

  const toggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleAddFromModal = () => {
    if (!detailModalItem) return;
    onAddToCart(detailModalItem, modalQuantity, selectedOptions, specialNotes);
    
    setAddedAnimationId(detailModalItem.id);
    setTimeout(() => setAddedAnimationId(null), 1200);
    setDetailModalItem(null);
  };

  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(item, 1);
    setAddedAnimationId(item.id);
    setTimeout(() => setAddedAnimationId(null), 1200);
  };

  const getCartQuantityForItem = (itemId: string) => {
    return cartItems
      .filter((ci) => ci.menuItem.id === itemId)
      .reduce((acc, ci) => acc + ci.quantity, 0);
  };

  return (
    <section id="menu" className="py-16 bg-stone-900 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-orange-400 bg-orange-950/80 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-orange-500/30">
            Freshly Prepared Daily
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-serif mb-3">
            Interactive Gourmet Menu
          </h2>
          <p className="text-stone-300 text-sm sm:text-base">
            Explore our artisanal smash burgers, braised tacos, woodfired orange pizza, and drinks. Search by ingredient or label, customize, and add directly to your cart.
          </p>
        </div>

        {/* Search Bar & Filters Bar */}
        <div className="bg-stone-950 rounded-3xl p-4 sm:p-6 shadow-xl border border-orange-500/30 mb-10">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Search Input Label */}
            <div className="relative w-full lg:max-w-md">
              <label htmlFor="search-input" className="block text-xs font-mono font-bold text-orange-400 uppercase tracking-wider mb-1.5">
                Search Menu Items or Ingredients
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-orange-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  id="search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search burgers, tacos, pizza, truffle, bacon..."
                  className="w-full pl-11 pr-10 py-3 bg-stone-900 border border-orange-500/30 rounded-2xl text-white text-sm placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Quick Filter Toggles */}
            <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-start lg:justify-end self-end">
              <button
                onClick={() => setFilterSpicyOnly(!filterSpicyOnly)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                  filterSpicyOnly
                    ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-600/30'
                    : 'bg-stone-900 text-stone-300 border-stone-800 hover:bg-stone-800'
                }`}
              >
                <Flame className={`w-3.5 h-3.5 ${filterSpicyOnly ? 'text-white' : 'text-red-400'}`} />
                <span>Spicy Only</span>
              </button>

              <button
                onClick={() => setFilterVegOnly(!filterVegOnly)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                  filterVegOnly
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30'
                    : 'bg-stone-900 text-stone-300 border-stone-800 hover:bg-stone-800'
                }`}
              >
                <span>🌱 Vegetarian</span>
              </button>

              {(searchQuery || filterSpicyOnly || filterVegOnly) && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilterSpicyOnly(false);
                    setFilterVegOnly(false);
                  }}
                  className="px-3 py-2 text-xs font-bold text-orange-400 hover:underline cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-5 mt-5 border-t border-stone-800 no-scrollbar pb-1">
            {[
              { id: 'all', label: 'All Categories', icon: '🍽️' },
              { id: 'burgers', label: 'Burgers', icon: '🍔' },
              { id: 'tacos', label: 'Tacos', icon: '🌮' },
              { id: 'pizza', label: 'Woodfired Pizza', icon: '🍕' },
              { id: 'drinks', label: 'Drinks & Refreshments', icon: '🍹' },
              { id: 'sides', label: 'Sides & Desserts', icon: '🍟' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as MenuCategory)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer border ${
                  selectedCategory === tab.id
                    ? 'bg-orange-600 text-white border-orange-400 shadow-lg shadow-orange-600/30 scale-[1.02]'
                    : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-orange-500/40 hover:text-white'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-stone-950 rounded-3xl p-12 text-center border border-stone-800">
            <div className="w-16 h-16 rounded-full bg-orange-950 text-orange-400 flex items-center justify-center mx-auto mb-4 border border-orange-500/30">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white font-serif mb-1">No matching dishes found</h3>
            <p className="text-stone-400 text-sm max-w-md mx-auto mb-6">
              Try searching for something else or clear active filters to view our complete gourmet menu.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setFilterSpicyOnly(false);
                setFilterVegOnly(false);
              }}
              className="px-6 py-2.5 bg-orange-600 text-white font-bold rounded-xl text-xs hover:bg-orange-500 transition-colors cursor-pointer border border-orange-400/30"
            >
              Show Full Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const itemQuantityInCart = getCartQuantityForItem(item.id);

              return (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -6, scale: 1.01 }}
                  onClick={() => handleOpenDetail(item)}
                  className="bg-stone-950 rounded-2xl border border-orange-500/25 shadow-xl hover:border-orange-500/70 hover:shadow-orange-600/20 transition-all duration-300 overflow-hidden flex flex-col justify-between group cursor-pointer relative"
                >
                  {/* Cart Quantity Badge if in cart */}
                  {itemQuantityInCart > 0 && (
                    <div className="absolute top-3 right-3 z-10 bg-orange-600 text-white text-xs font-mono font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 border border-orange-400/40 animate-pulse">
                      <Check className="w-3.5 h-3.5" />
                      <span>{itemQuantityInCart} in cart</span>
                    </div>
                  )}

                  <div>
                    {/* Item Image */}
                    <div className="relative aspect-[16/10] bg-stone-900 overflow-hidden border-b border-stone-800">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-80" />

                      {/* Tag badges */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                        {item.isPopular && (
                          <span className="bg-amber-500 text-stone-950 text-[10px] font-mono font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-md">
                            ⭐ Popular
                          </span>
                        )}
                        {item.isSpicy && (
                          <span className="bg-red-600 text-white text-[10px] font-mono font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-md">
                            🌶️ Spicy
                          </span>
                        )}
                        {item.isVegetarian && (
                          <span className="bg-emerald-600 text-white text-[10px] font-mono font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-md">
                            🌱 Veg
                          </span>
                        )}
                      </div>

                      {/* Price Tag Overlay */}
                      <div className="absolute bottom-3 left-3 bg-stone-900/90 backdrop-blur-md px-3 py-1 rounded-xl shadow-lg border border-orange-500/40">
                        <span className="text-base font-mono font-bold text-orange-400">{item.price.toLocaleString()} DA</span>
                      </div>
                      
                      {/* Calories Tag */}
                      <div className="absolute bottom-3 right-3 bg-stone-950/80 backdrop-blur-md px-2.5 py-0.5 rounded-lg text-[10px] font-mono text-stone-400 border border-stone-800">
                        {item.calories} kcal
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="text-lg font-bold text-white font-serif group-hover:text-orange-400 transition-colors">
                          {item.name}
                        </h3>
                      </div>

                      <p className="text-xs text-stone-300 leading-relaxed mb-4 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Ingredients Section */}
                      <div className="mb-2">
                        <div className="text-[10px] font-mono font-bold text-orange-400/90 uppercase tracking-wider mb-1.5">
                          Ingredients & Recipe:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {item.ingredients.map((ingredient, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] font-medium bg-stone-900 text-stone-300 px-2 py-0.5 rounded-md border border-stone-800"
                            >
                              {ingredient}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="px-5 pb-5 pt-0 flex items-center gap-2">
                    <button
                      onClick={(e) => handleQuickAdd(item, e)}
                      className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                        addedAnimationId === item.id
                          ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30'
                          : 'bg-orange-600 hover:bg-orange-500 text-white border-orange-400/30 shadow-md shadow-orange-600/20 active:scale-95'
                      }`}
                    >
                      {addedAnimationId === item.id ? (
                        <>
                          <Check className="w-4 h-4 animate-bounce" />
                          <span>Added to Cart!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleOpenDetail(item)}
                      className="p-3 bg-stone-900 hover:bg-stone-800 text-orange-400 rounded-xl transition-colors cursor-pointer border border-stone-800"
                      title="Customize / View Details"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>

                </motion.div>
              );
            })}
          </div>
        )}

      </div>

      {/* Item Detail & Customization Modal */}
      {detailModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
          <div className="bg-stone-900 text-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-orange-500/40 relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button
              onClick={() => setDetailModalItem(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-stone-950/80 text-orange-400 border border-orange-500/30 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header */}
            <div className="relative aspect-[16/9] bg-stone-950 border-b border-stone-800">
              <img
                src={detailModalItem.image}
                alt={detailModalItem.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-xs font-mono font-bold bg-orange-600 text-white px-2.5 py-0.5 rounded-md uppercase tracking-wider mb-1 inline-block shadow-md">
                  {detailModalItem.category}
                </span>
                <h3 className="text-2xl font-black font-serif">{detailModalItem.name}</h3>
                <div className="text-lg font-mono font-bold text-orange-400">{detailModalItem.price.toLocaleString()} DA</div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              
              {/* Description & Calories */}
              <div>
                <p className="text-stone-300 text-sm leading-relaxed mb-3">
                  {detailModalItem.description}
                </p>
                <div className="flex items-center gap-4 text-xs font-mono font-semibold text-stone-400">
                  <span>⚡ {detailModalItem.calories} kcal</span>
                  <span>⏱️ ~{detailModalItem.prepTimeMinutes} mins prep</span>
                </div>
              </div>

              {/* Complete Ingredients list */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-orange-400 mb-2">
                  Recipe & Ingredients
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {detailModalItem.ingredients.map((ing, i) => (
                    <span key={i} className="text-xs bg-stone-950 text-stone-200 px-2.5 py-1 rounded-lg border border-stone-800 font-medium">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Customizable options checkboxes */}
              {detailModalItem.customizableOptions && detailModalItem.customizableOptions.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-orange-400 mb-2.5">
                    Customize Ingredients & Options
                  </h4>
                  <div className="space-y-2">
                    {detailModalItem.customizableOptions.map((opt, idx) => {
                      const isChecked = selectedOptions.includes(opt);
                      return (
                        <label
                          key={idx}
                          onClick={() => toggleOption(opt)}
                          className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                            isChecked
                              ? 'bg-orange-950/60 border-orange-500 text-orange-200'
                              : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                          }`}
                        >
                          <span>{opt}</span>
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                            isChecked ? 'bg-orange-600 border-orange-500 text-white' : 'border-stone-700 bg-stone-900'
                          }`}>
                            {isChecked && <Check className="w-3.5 h-3.5" />}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Special Instructions Note */}
              <div>
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-orange-400 block mb-1.5">
                  Special Kitchen Request
                </label>
                <textarea
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="e.g. Extra crispy, sauce on the side, no onions..."
                  className="w-full p-3 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-orange-500 transition-all resize-none h-20"
                />
              </div>

              {/* Quantity Selector & Confirm Button */}
              <div className="pt-4 border-t border-stone-800 flex items-center justify-between gap-4">
                
                <div className="flex items-center gap-3 bg-stone-950 p-1.5 rounded-xl border border-stone-800">
                  <button
                    onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                    className="w-8 h-8 rounded-lg bg-stone-900 text-stone-300 flex items-center justify-center hover:bg-stone-800 transition-colors cursor-pointer border border-stone-800"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-mono font-bold text-white w-6 text-center">
                    {modalQuantity}
                  </span>
                  <button
                    onClick={() => setModalQuantity(modalQuantity + 1)}
                    className="w-8 h-8 rounded-lg bg-stone-900 text-stone-300 flex items-center justify-center hover:bg-stone-800 transition-colors cursor-pointer border border-stone-800"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAddFromModal}
                  className="flex-1 py-3.5 px-6 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-orange-600/30 flex items-center justify-between transition-all cursor-pointer border border-orange-400/30 active:scale-95"
                >
                  <span>Add {modalQuantity} to Cart</span>
                  <span className="font-mono text-sm">{(detailModalItem.price * modalQuantity).toLocaleString()} DA</span>
                </button>

              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
