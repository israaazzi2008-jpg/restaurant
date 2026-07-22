import { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // BURGERS
  {
    id: 'burger-1',
    name: "L'Orange Smash Supreme",
    category: 'burgers',
    price: 1400,
    description: "Double smashed premium Angus beef, melted sharp cheddar, caramelized orange-glazed onions, crispy smoked bacon, house secret orange aioli on a toasted brioche bun.",
    ingredients: ['Angus Beef', 'Sharp Cheddar', 'Glazed Onions', 'Smoked Bacon', 'House Orange Aioli', 'Brioche Bun'],
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    calories: 850,
    isPopular: true,
    prepTimeMinutes: 12,
    customizableOptions: ['Extra Bacon (+250 DA)', 'Double Cheese (+150 DA)', 'Gluten-Free Bun (+100 DA)', 'No Onions']
  },
  {
    id: 'burger-2',
    name: "Fiery Citrus Chicken Crunch",
    category: 'burgers',
    price: 1300,
    description: "Crispy fried chicken breast soaked in spicy orange habanero glaze, crunchy cabbage slaw, dill pickles, and garlic sauce.",
    ingredients: ['Crispy Chicken', 'Orange Habanero Glaze', 'Cabbage Slaw', 'Dill Pickles', 'Garlic Mayo', 'Brioche'],
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80',
    calories: 780,
    isSpicy: true,
    isPopular: true,
    prepTimeMinutes: 10,
    customizableOptions: ['Extra Spicy Glaze', 'Mild Glaze', 'Extra Pickles', 'Add Cheddar (+100 DA)']
  },
  {
    id: 'burger-3',
    name: "Truffle & Wild Mushroom Smash",
    category: 'burgers',
    price: 1600,
    description: "Double smashed beef patties topped with sautéed wild forest mushrooms, Swiss Gruyère cheese, white truffle aioli, and baby arugula.",
    ingredients: ['Angus Beef', 'Wild Mushrooms', 'Swiss Gruyère', 'White Truffle Aioli', 'Baby Arugula'],
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    calories: 890,
    prepTimeMinutes: 14,
    customizableOptions: ['Extra Truffle Aioli (+100 DA)', 'Substitute Swiss for Cheddar', 'No Arugula']
  },
  {
    id: 'burger-4',
    name: "Smokey BBQ Bacon Beast",
    category: 'burgers',
    price: 1550,
    description: "Triple smashed beef patty, double cheddar, crispy onion rings, hickory BBQ sauce, and thick-cut maple bacon.",
    ingredients: ['Triple Beef Patty', 'Double Cheddar', 'Crispy Onion Rings', 'Hickory BBQ Sauce', 'Maple Bacon'],
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    calories: 1020,
    prepTimeMinutes: 15,
    customizableOptions: ['Extra BBQ Sauce', 'Remove Onion Rings', 'Extra Patty (+350 DA)']
  },

  // TACOS
  {
    id: 'taco-1',
    name: "Authentic Beef Birria Tacos",
    category: 'tacos',
    price: 1450,
    description: "Three slow-braised beef birria tacos grilled in beef fat with melted Oaxaca cheese, diced white onion, fresh cilantro, and rich spiced dipping consomé.",
    ingredients: ['Braised Beef Birria', 'Oaxaca Cheese', 'Handmade Corn Tortillas', 'Fresh Cilantro', 'White Onions', 'Beef Consomé'],
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
    calories: 720,
    isPopular: true,
    prepTimeMinutes: 12,
    customizableOptions: ['Extra Consomé (+150 DA)', 'Flour Tortillas', 'No Cilantro', 'Extra Cheese (+100 DA)']
  },
  {
    id: 'taco-2',
    name: "Citrus Glazed Cod Fish Tacos",
    category: 'tacos',
    price: 1350,
    description: "Crisp beer-battered wild cod fish, tangy red cabbage slaw, fresh orange-lime drizzle, sliced jalapeños, and avocado crema.",
    ingredients: ['Wild Cod', 'Red Cabbage Slaw', 'Orange-Lime Drizzle', 'Avocado Crema', 'Fresh Jalapeños'],
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80',
    calories: 580,
    isSpicy: true,
    prepTimeMinutes: 10,
    customizableOptions: ['Grilled Fish (Unbattered)', 'Extra Avocado Crema (+100 DA)', 'No Jalapeños']
  },
  {
    id: 'taco-3',
    name: "Al Pastor Pork Fiesta",
    category: 'tacos',
    price: 1250,
    description: "Tender pork marinated in achiote and citrus juices, roasted pineapple chunks, salsa verde, onions, and micro cilantro.",
    ingredients: ['Marinated Pork Al Pastor', 'Roasted Pineapple', 'Salsa Verde', 'Diced Onions', 'Cilantro'],
    image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=800&q=80',
    calories: 640,
    prepTimeMinutes: 10,
    customizableOptions: ['Extra Pineapple', 'Salsa Roja instead of Verde', 'No Onions']
  },
  {
    id: 'taco-4',
    name: "Smokey Cauliflower & Avocado (V)",
    category: 'tacos',
    price: 1150,
    description: "Smokey spiced roasted cauliflower florets, mashed avocado, chipotle cashew crema, toasted pumpkin seeds, and fresh lime.",
    ingredients: ['Roasted Cauliflower', 'Fresh Avocado', 'Chipotle Cashew Crema', 'Pumpkin Seeds', 'Lime'],
    image: 'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?auto=format&fit=crop&w=800&q=80',
    calories: 460,
    isVegetarian: true,
    prepTimeMinutes: 8,
    customizableOptions: ['Extra Avocado (+150 DA)', 'Vegan Cheese (+100 DA)', 'Extra Lime']
  },

  // PIZZA
  {
    id: 'pizza-1',
    name: "L'Orange Honey Pepperoni",
    category: 'pizza',
    price: 1850,
    description: "Crispy artisan crust, San Marzano tomato sauce, fresh fior di latte mozzarella, double cup-and-char pepperoni, hot orange blossom honey drizzle.",
    ingredients: ['San Marzano Tomatoes', 'Fior Di Latte Mozzarella', 'Crispy Pepperoni', 'Orange Chili Honey', 'Fresh Basil'],
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
    calories: 1150,
    isPopular: true,
    prepTimeMinutes: 15,
    customizableOptions: ['Extra Hot Honey (+100 DA)', 'Garlic Crust Oil', 'Gluten-Free Crust (+300 DA)']
  },
  {
    id: 'pizza-2',
    name: "Truffle Burrata & Wild Mushroom",
    category: 'pizza',
    price: 2100,
    description: "White garlic cream base, sautéed cremini & shiitake mushrooms, whole fresh burrata cheese broken on top, truffle glaze, and fresh thyme.",
    ingredients: ['Garlic Roasted Cream', 'Wild Mushrooms', 'Creamy Fresh Burrata', 'Truffle Glaze', 'Fresh Thyme'],
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    calories: 1220,
    isVegetarian: true,
    isPopular: true,
    prepTimeMinutes: 16,
    customizableOptions: ['Extra Burrata Ball (+300 DA)', 'Add Prosciutto (+250 DA)', 'Extra Truffle Glaze']
  },
  {
    id: 'pizza-3',
    name: "Citrus Spicy BBQ Chicken Pizza",
    category: 'pizza',
    price: 1800,
    description: "Grilled citrus-infused chicken breast, smoky BBQ sauce base, sliced red onions, sweet bell peppers, smoked gouda & mozzarella cheese.",
    ingredients: ['Citrus Grilled Chicken', 'Smoky BBQ Sauce', 'Smoked Gouda', 'Mozzarella', 'Red Onions', 'Bell Peppers'],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    calories: 1080,
    isSpicy: true,
    prepTimeMinutes: 14,
    customizableOptions: ['Add Jalapeños (+80 DA)', 'Ranch Drizzle', 'Extra Cheese (+200 DA)']
  },

  // DRINKS & SIDES
  {
    id: 'drink-1',
    name: "Sparkling Blood Orange Lemonade",
    category: 'drinks',
    price: 450,
    description: "Hand-squeezed Sicilian blood oranges, organic lemons, crushed fresh mint leaves, and sparkling spring water.",
    ingredients: ['Blood Orange Juice', 'Organic Lemon', 'Fresh Mint', 'Cane Sugar', 'Sparkling Water'],
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=800&q=80',
    calories: 140,
    isPopular: true,
    prepTimeMinutes: 3,
    customizableOptions: ['Less Sugar', 'Extra Mint', 'Add Chia Seeds (+50 DA)']
  },
  {
    id: 'drink-2',
    name: "Craft Citrus & Blossom Iced Tea",
    category: 'drinks',
    price: 350,
    description: "Cold-brewed Earl Grey tea infused with orange blossom nectar, fresh lemon wheels, and a rosemary sprig.",
    ingredients: ['Cold-Brewed Earl Grey', 'Orange Blossom Nectar', 'Lemon Slices', 'Rosemary'],
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80',
    calories: 90,
    prepTimeMinutes: 3,
    customizableOptions: ['Unsweetened', 'Extra Lemon']
  },
  {
    id: 'side-1',
    name: "Truffle Parmesan Skin-On Fries",
    category: 'sides',
    price: 750,
    description: "Golden hand-cut skin-on fries tossed in white truffle oil, grated aged Parmesan, chives, served with garlic orange aioli.",
    ingredients: ['Hand-Cut Potatoes', 'White Truffle Oil', 'Aged Parmesan Cheese', 'Fresh Chives', 'Garlic Orange Aioli'],
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80',
    calories: 520,
    isPopular: true,
    prepTimeMinutes: 8,
    customizableOptions: ['Extra Truffle Oil (+100 DA)', 'Extra Garlic Aioli (+80 DA)']
  },
  {
    id: 'side-2',
    name: "Hot Cinnamon Churros & Orange Chocolate",
    category: 'sides',
    price: 650,
    description: "Four hot crispy golden churros dusted in cinnamon sugar, served with a warm dark chocolate orange blossom dip.",
    ingredients: ['Crispy Churro Dough', 'Cinnamon Sugar', 'Dark Chocolate Orange Dip'],
    image: 'https://images.unsplash.com/photo-1624371414361-e670edf4898d?auto=format&fit=crop&w=800&q=80',
    calories: 480,
    isVegetarian: true,
    prepTimeMinutes: 7,
    customizableOptions: ['Extra Chocolate Dip (+150 DA)', 'Add Salted Caramel Dip (+150 DA)']
  }
];

export const RESTAURANT_INFO = {
  name: "L'Orange Gourmet",
  tagline: "Vibrant Citrus Fusion & Artisanal Comfort Food",
  description: "At L'Orange Gourmet, we ignite your senses with bright, handcrafted flavors. From our signature orange-glazed smash burgers and slow-braised birria tacos to hot-honey woodfired pizzas, every dish is prepared fresh using locally sourced premium ingredients.",
  address: "742 Citrus Avenue, Gourmet District",
  phone: "+213 550 12 34 56",
  hours: "Mon - Sun: 11:30 AM - 11:00 PM",
  rating: 4.9,
  reviewsCount: 1280
};
