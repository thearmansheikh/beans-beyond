// ─────────────────────────────────────────────
// Beans & Beyond – App Constants
// ─────────────────────────────────────────────

import type { MenuItem, MenuCategory, Review } from "@/types";

export const RESTAURANT = {
  name: "Beans & Beyond",
  tagline:
    "When you're stuck on something creatively, you can't solve a problem, you go to a coffee shop…",
  taglineAuthor: "Eric Weiner",
  description: "Café, Breakfast & Brunch restaurant serving Halal food on Commercial Road, London E14.",
  address: "819-821 Commercial Road, London E14 7HG",
  phone: "020 3089 6961",
  email: "hello@bbcafe.co.uk",
  website: "https://www.bbcafe.co.uk",
  rating: 4.5,
  reviewCount: 120,
  halal: true,
  googleMapsUrl: "https://goo.gl/maps/nuEfMNKqU2c8uqq48",
  // Free static embed — no API key required
  googleMapsEmbed:
    "https://maps.google.com/maps?q=819-821+Commercial+Road,+London+E14+7HG&t=&z=17&ie=UTF8&iwloc=&output=embed",
  social: {
    instagram: "https://www.instagram.com/beans_beyond/",
    facebook: "https://www.facebook.com/BeansBeyond",
    tiktok: "https://www.tiktok.com/@bbcafe",
  },
} as const;

export const HOURS = [
  { day: "Monday",    open: "08:00", close: "22:00", closed: false },
  { day: "Tuesday",   open: "08:00", close: "22:00", closed: false },
  { day: "Wednesday", open: "08:00", close: "22:00", closed: false },
  { day: "Thursday",  open: "08:00", close: "22:00", closed: false },
  { day: "Friday",    open: "08:00", close: "22:00", closed: false },
  { day: "Saturday",  open: "08:00", close: "22:00", closed: false },
  { day: "Sunday",    open: "10:00", close: "17:00", closed: false },
];

export const MENU_CATEGORIES: MenuCategory[] = [
  { _id: "1", name: "All",        slug: "all",        displayOrder: 0, icon: "🍽️" },
  { _id: "2", name: "Breakfast",  slug: "breakfast",  displayOrder: 1, icon: "🍳" },
  { _id: "3", name: "Coffee",     slug: "coffee",     displayOrder: 2, icon: "☕" },
  { _id: "4", name: "Mains",      slug: "lunch",      displayOrder: 3, icon: "🥘" },
  { _id: "5", name: "Snacks",     slug: "snacks",     displayOrder: 4, icon: "🥐" },
  { _id: "6", name: "Cold Drinks",slug: "cold-drinks",displayOrder: 5, icon: "🥤" },
  { _id: "7", name: "Desserts",   slug: "desserts",   displayOrder: 6, icon: "🍰" },
];

// All food is 100% halal. Photos via Unsplash CDN.
// To swap in a real BB photo, drop the file into /public/images/menu/<name>.jpg
// and replace the imageUrl with "/images/menu/<name>.jpg".
export const MENU_ITEMS: MenuItem[] = [
  // ─── BREAKFAST ───
  {
    _id: "b1", name: "Full English Breakfast", category: "breakfast",
    description: "2 eggs, 3 rashers of bacon, sausage, cherry tomato, mushrooms, baked beans & fries. Halal.",
    price: 9.95, imageUrl: "/images/menu/full-english.jpg",
    dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, allergens: ["eggs"] },
    available: true, customizationOptions: [
      { name: "Toast", options: ["White", "Brown", "Sourdough", "No toast"], additionalPrice: 0 },
      { name: "Eggs", options: ["Scrambled", "Fried", "Poached"], additionalPrice: 0 },
    ], popular: true,
  },
  {
    _id: "b2", name: "Veggie Breakfast", category: "breakfast",
    description: "2 eggs, grilled halloumi, smashed avocado, baked beans, grilled tomato, mushrooms & toast.",
    price: 9.45, imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, allergens: ["gluten", "eggs", "dairy"] },
    available: true, customizationOptions: [
      { name: "Eggs", options: ["Scrambled", "Fried", "Poached"], additionalPrice: 0 },
    ], popular: true,
  },
  {
    _id: "b3", name: "Beans & Beyond Big Breakfast", category: "breakfast",
    description: "Our signature feast — 2 eggs, beef sausages, turkey bacon, hash browns, beans, mushrooms, grilled tomato, halloumi & sourdough.",
    price: 12.95, imageUrl: "/images/menu/big-breakfast.jpg",
    dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, allergens: ["gluten", "eggs", "dairy"] },
    available: true, customizationOptions: [], chefsPick: true,
  },
  {
    _id: "b4", name: "Eggs Benedict", category: "breakfast",
    description: "Poached eggs on a toasted English muffin with turkey ham and rich hollandaise sauce.",
    price: 8.95, imageUrl: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=600&q=80",
    dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, allergens: ["gluten", "eggs", "dairy"] },
    available: true, customizationOptions: [], chefsPick: true,
  },
  {
    _id: "b5", name: "Eggs Florentine", category: "breakfast",
    description: "Poached eggs on toasted muffin with wilted spinach and hollandaise. Vegetarian classic.",
    price: 8.45, imageUrl: "https://images.unsplash.com/photo-1645802734055-886b819da175?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, allergens: ["gluten", "eggs", "dairy"] },
    available: true, customizationOptions: [],
  },
  {
    _id: "b6", name: "Smashed Avocado Toast", category: "breakfast",
    description: "Smashed avocado on toasted sourdough with cherry tomatoes, feta, chilli flakes & lemon.",
    price: 7.95, imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, allergens: ["gluten", "dairy"] },
    available: true, customizationOptions: [
      { name: "Add", options: ["None", "Poached egg (+£1.50)", "Halloumi (+£2)", "Smoked salmon (+£3)"], additionalPrice: 0 },
    ], popular: true,
  },
  {
    _id: "b7", name: "Pancake Stack", category: "breakfast",
    description: "Fluffy American pancakes with maple syrup, fresh berries & clotted cream — add bacon and eggs for a sweet & savoury brunch.",
    price: 7.95, imageUrl: "/images/menu/pancake-stack.jpg",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, allergens: ["gluten", "eggs", "dairy"] },
    available: true, customizationOptions: [
      { name: "Top with", options: ["Berries & cream", "Nutella & banana", "Lotus Biscoff", "Bacon & syrup"], additionalPrice: 0 },
    ],
  },
  {
    _id: "b8", name: "Shakshuka", category: "breakfast",
    description: "Two eggs baked in spiced tomato & pepper sauce with feta — served with warm pitta.",
    price: 8.95, imageUrl: "https://images.unsplash.com/photo-1590412200988-a436970781fa?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, allergens: ["gluten", "eggs", "dairy"] },
    available: true, customizationOptions: [], chefsPick: true,
  },
  {
    _id: "b9", name: "French Toast", category: "breakfast",
    description: "Brioche dipped in cinnamon custard, pan-fried golden — topped with berries & maple.",
    price: 7.95, imageUrl: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, allergens: ["gluten", "eggs", "dairy"] },
    available: true, customizationOptions: [],
  },
  {
    _id: "b10", name: "Kids Breakfast", category: "breakfast",
    description: "1 rasher of bacon, 1 egg & Heinz beans — served with a Fruit Shoot or canned drink.",
    price: 4.95, imageUrl: "https://images.unsplash.com/photo-1558672367-241cd1a01b16?w=600&q=80",
    dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, allergens: ["eggs"] },
    available: true, customizationOptions: [
      { name: "Drink", options: ["Fruit Shoot", "Coke", "Diet Coke", "Sprite", "Apple juice"], additionalPrice: 0 },
    ],
  },
  {
    _id: "b11", name: "Beef Steak Breakfast", category: "breakfast",
    description: "Grilled beef steak patty, 2 sausages, 2 rashers of bacon, 2 fried eggs, grilled tomatoes, mushrooms & fries.",
    price: 12.95, imageUrl: "/images/menu/beef-steak-breakfast.jpg",
    dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, allergens: ["eggs"] },
    available: true, customizationOptions: [
      { name: "Eggs", options: ["Scrambled", "Fried", "Poached"], additionalPrice: 0 },
    ], chefsPick: true,
  },

  // ─── COFFEE ───
  {
    _id: "c1", name: "Espresso", category: "coffee",
    description: "A short, intense shot of our signature house blend — bold and chocolatey.",
    price: 2.50, imageUrl: "https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: true, glutenFree: true, allergens: [] },
    available: true, customizationOptions: [
      { name: "Shots", options: ["Single", "Double"], additionalPrice: 0.50 },
    ],
  },
  {
    _id: "c2", name: "Flat White", category: "coffee",
    description: "Two ristretto shots with velvety steamed milk — silky and rich.",
    price: 3.50, imageUrl: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: true, allergens: ["dairy"] },
    available: true, customizationOptions: [
      { name: "Milk", options: ["Whole", "Semi-skimmed", "Oat", "Almond", "Soy"], additionalPrice: 0.40 },
      { name: "Size", options: ["Regular", "Large"], additionalPrice: 0.50 },
    ], popular: true,
  },
  {
    _id: "c3", name: "Cappuccino", category: "coffee",
    description: "Equal parts espresso, steamed milk and thick foam with a dusting of cocoa.",
    price: 3.20, imageUrl: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: true, allergens: ["dairy"] },
    available: true, customizationOptions: [
      { name: "Milk", options: ["Whole", "Semi-skimmed", "Oat", "Almond", "Soy"], additionalPrice: 0.40 },
    ],
  },
  {
    _id: "c4", name: "Americano", category: "coffee",
    description: "Smooth espresso topped up with hot water — black or with milk on the side.",
    price: 2.80, imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: true, glutenFree: true, allergens: [] },
    available: true, customizationOptions: [
      { name: "Size", options: ["Regular", "Large"], additionalPrice: 0.40 },
    ],
  },
  {
    _id: "c5", name: "Latte", category: "coffee",
    description: "A generous pour of steamed milk over a double shot of espresso.",
    price: 3.30, imageUrl: "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: true, allergens: ["dairy"] },
    available: true, customizationOptions: [
      { name: "Milk", options: ["Whole", "Semi-skimmed", "Oat", "Almond", "Soy"], additionalPrice: 0.40 },
      { name: "Syrup", options: ["None", "Vanilla", "Caramel", "Hazelnut", "Biscoff"], additionalPrice: 0.50 },
    ], popular: true,
  },
  {
    _id: "c6", name: "Mocha", category: "coffee",
    description: "Espresso with rich dark chocolate, steamed milk, and a swirl of cream.",
    price: 3.80, imageUrl: "https://images.unsplash.com/photo-1618576230663-9714aecfb99a?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: true, allergens: ["dairy"] },
    available: true, customizationOptions: [
      { name: "Milk", options: ["Whole", "Semi-skimmed", "Oat", "Almond", "Soy"], additionalPrice: 0.40 },
    ],
  },
  {
    _id: "c7", name: "Hot Chocolate", category: "coffee",
    description: "Real Belgian chocolate melted into steamed milk, topped with cream & marshmallows.",
    price: 3.50, imageUrl: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: true, allergens: ["dairy"] },
    available: true, customizationOptions: [
      { name: "Milk", options: ["Whole", "Oat", "Almond"], additionalPrice: 0.40 },
    ],
  },
  {
    _id: "c8", name: "Matcha Latte", category: "coffee",
    description: "Ceremonial-grade matcha whisked with steamed oat milk and a touch of honey.",
    price: 4.20, imageUrl: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: true, allergens: ["dairy"] },
    available: true, customizationOptions: [
      { name: "Sweetness", options: ["None", "Honey", "Vanilla syrup"], additionalPrice: 0 },
    ], popular: true, chefsPick: true,
  },
  {
    _id: "c9", name: "Chai Latte", category: "coffee",
    description: "Spiced black tea infused with cardamom, cinnamon & ginger — steamed with milk.",
    price: 3.80, imageUrl: "https://images.unsplash.com/photo-1578899952107-9c390f1af1b7?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: true, allergens: ["dairy"] },
    available: true, customizationOptions: [
      { name: "Milk", options: ["Whole", "Oat", "Almond", "Soy"], additionalPrice: 0.40 },
    ],
  },

  // ─── MAINS ───
  {
    _id: "l1", name: "Lamb Chops & Mash", category: "lunch",
    description: "Three tender lamb cutlets, freshly made mash, mixed vegetables & rich gravy.",
    price: 14.95, imageUrl: "/images/menu/lamb-chops-mash.jpg",
    dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, allergens: ["dairy", "gluten"] },
    available: true, customizationOptions: [], chefsPick: true, popular: true,
  },
  {
    _id: "l2", name: "Cod & Chips", category: "lunch",
    description: "Freshly battered cod fillet, golden chips, garden peas & mixed salad. Tartare on the side.",
    price: 10.95, imageUrl: "https://images.unsplash.com/photo-1580217593608-61931cefc821?w=600&q=80",
    dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, allergens: ["gluten", "fish", "eggs"] },
    available: true, customizationOptions: [], popular: true,
  },
  {
    _id: "l3", name: "Beef Lasagne", category: "lunch",
    description: "Slow-cooked beef ragu layered with pasta sheets and béchamel, baked until golden.",
    price: 11.95, imageUrl: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=600&q=80",
    dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, allergens: ["gluten", "dairy", "eggs"] },
    available: true, customizationOptions: [],
  },
  {
    _id: "l4", name: "Loaded Jacket Potato", category: "lunch",
    description: "Oven-baked jacket potato with butter, your choice of filling, and a side salad.",
    price: 8.95, imageUrl: "https://images.unsplash.com/photo-1665931040985-88ceff0fd38e?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: true, allergens: ["dairy"] },
    available: true, customizationOptions: [
      { name: "Filling", options: ["Beans & cheese", "Tuna mayo & sweetcorn", "Chilli con carne", "Coleslaw"], additionalPrice: 0 },
    ],
  },
  {
    _id: "l5", name: "Beans & Beyond Burger", category: "lunch",
    description: "6oz beef patty, smoked cheese, crispy onion rings, lettuce, tomato & house burger sauce in a sesame brioche bun. Served with curly fries and a side of beans.",
    price: 11.95, imageUrl: "/images/menu/bb-burger.jpg",
    dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, allergens: ["gluten", "dairy", "eggs", "sesame"] },
    available: true, customizationOptions: [
      { name: "Add", options: ["None", "Bacon (+£1.50)", "Extra patty (+£3)", "Halloumi (+£2)"], additionalPrice: 0 },
    ], popular: true, chefsPick: true,
  },
  {
    _id: "l6", name: "Peri Peri Chicken Burger", category: "lunch",
    description: "Grilled chicken fillet glazed in peri peri sauce, lettuce, tomato & garlic mayo in a brioche bun. With fries.",
    price: 10.95, imageUrl: "/images/menu/peri-peri-chicken-burger.jpg",
    dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, allergens: ["gluten", "eggs", "dairy", "sesame"] },
    available: true, customizationOptions: [
      { name: "Heat", options: ["Lemon & herb", "Mild", "Medium", "Hot", "Extra hot"], additionalPrice: 0 },
    ], popular: true,
  },
  {
    _id: "l7", name: "Halloumi Burger", category: "lunch",
    description: "Thick-cut grilled halloumi, roasted red peppers, rocket & sweet chilli mayo. Served with fries.",
    price: 9.95, imageUrl: "https://images.unsplash.com/photo-1610440042657-612c34d95e9f?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, allergens: ["gluten", "dairy", "eggs", "sesame"] },
    available: true, customizationOptions: [],
  },
  {
    _id: "l8", name: "Halloumi Wrap", category: "lunch",
    description: "Grilled halloumi, roasted peppers, spinach, hummus & sweet chilli in a warm tortilla.",
    price: 8.95, imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, allergens: ["gluten", "dairy", "sesame"] },
    available: true, customizationOptions: [],
  },
  {
    _id: "l9", name: "Club Sandwich", category: "lunch",
    description: "Triple-decker with grilled chicken, turkey bacon, egg, lettuce, tomato & mayo on toasted bread. With fries.",
    price: 9.45, imageUrl: "https://images.unsplash.com/photo-1528736235302-52922df5c122?w=600&q=80",
    dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, allergens: ["gluten", "eggs", "dairy"] },
    available: true, customizationOptions: [], popular: true,
  },
  {
    _id: "l10", name: "Chicken Caesar Salad", category: "lunch",
    description: "Grilled chicken breast, crisp romaine, shaved parmesan, croutons & house Caesar dressing.",
    price: 9.95, imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80",
    dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, allergens: ["gluten", "eggs", "dairy", "fish"] },
    available: true, customizationOptions: [],
  },
  {
    _id: "l11", name: "Soup of the Day", category: "lunch",
    description: "Ask your server — freshly made daily, served with crusty bread & butter.",
    price: 5.95, imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, allergens: ["gluten", "dairy"] },
    available: true, customizationOptions: [],
  },
  {
    _id: "l12", name: "Unlimited Burger", category: "lunch",
    description: "Grand-opening offer — eat as much as you can. One sitting. No conditions.",
    price: 10.00, imageUrl: "https://images.unsplash.com/photo-1632898658005-af95f6fa589c?w=600&q=80",
    dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, allergens: ["gluten", "dairy", "eggs", "sesame"] },
    available: true, customizationOptions: [], popular: true,
  },
  {
    _id: "l13", name: "Grilled Lamb Cutlets", category: "lunch",
    description: "Four chargrilled lamb cutlets marinated in herbs & spices, served on creamy mash with diced tomato salsa & fresh parsley.",
    price: 16.95, imageUrl: "/images/menu/grilled-lamb-cutlets.jpg",
    dietaryInfo: { vegetarian: false, vegan: false, glutenFree: true, allergens: ["dairy"] },
    available: true, customizationOptions: [], chefsPick: true,
  },
  {
    _id: "l14", name: "BB Mixed Grill", category: "lunch",
    description: "Grilled chicken shish, lamb shish & seekh kebab on a bed of vermicelli rice with hummus, fresh salad & garlic sauce.",
    price: 15.95, imageUrl: "/images/menu/mixed-grill.jpg",
    dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, allergens: ["sesame", "dairy"] },
    available: true, customizationOptions: [], popular: true, chefsPick: true,
  },
  {
    _id: "l15", name: "Seekh Kebab Platter", category: "lunch",
    description: "Two chargrilled lamb seekh kebabs on vermicelli rice with hummus, mixed salad, pickled carrot & lemon.",
    price: 12.95, imageUrl: "/images/menu/seekh-kebab-platter.jpg",
    dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, allergens: ["sesame", "dairy"] },
    available: true, customizationOptions: [], popular: true,
  },
  {
    _id: "l16", name: "Chicken Shish Pitta", category: "lunch",
    description: "Marinated grilled chicken cubes with grilled peppers, fries, fresh salad & warm pitta bread.",
    price: 11.95, imageUrl: "/images/menu/chicken-shish-pitta.jpg",
    dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, allergens: ["gluten", "sesame"] },
    available: true, customizationOptions: [
      { name: "Sauce", options: ["Garlic mayo", "Chilli", "Mint yoghurt", "BBQ"], additionalPrice: 0 },
    ],
  },
  {
    _id: "l17", name: "BBQ Chicken & Rice", category: "lunch",
    description: "Tender grilled chicken fillets glazed in smoky BBQ sauce, served on vermicelli pilaf rice with cucumber, tomato & red cabbage salad.",
    price: 10.95, imageUrl: "/images/menu/bbq-chicken-rice.jpg",
    dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, allergens: ["gluten"] },
    available: true, customizationOptions: [], popular: true,
  },
  {
    _id: "l18", name: "Grilled Chicken Pasta", category: "lunch",
    description: "Grilled chicken strips over penne in a rich tomato sauce, finished with chimichurri & served with toasted garlic bread.",
    price: 11.95, imageUrl: "/images/menu/grilled-chicken-pasta.jpg",
    dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, allergens: ["gluten", "dairy"] },
    available: true, customizationOptions: [
      { name: "Sauce", options: ["Tomato", "Creamy alfredo", "Arrabbiata (spicy)"], additionalPrice: 0 },
    ], chefsPick: true,
  },
  {
    _id: "l19", name: "Cajun Chicken & Garlic Bread", category: "lunch",
    description: "Pan-seared cajun-spiced chicken bites with sautéed peppers, served with golden garlic bread.",
    price: 10.95, imageUrl: "/images/menu/cajun-chicken-garlic-bread.jpg",
    dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, allergens: ["gluten", "dairy"] },
    available: true, customizationOptions: [],
  },
  {
    _id: "l20", name: "Spicy Chicken Noodles", category: "lunch",
    description: "Wok-tossed noodles with chicken, peppers, chilli & garlic — served with cucumber and tomato.",
    price: 10.95, imageUrl: "/images/menu/spicy-chicken-noodles.jpg",
    dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, allergens: ["gluten", "soy", "sesame"] },
    available: true, customizationOptions: [
      { name: "Heat", options: ["Mild", "Medium", "Hot", "Extra hot"], additionalPrice: 0 },
    ],
  },
  {
    _id: "l21", name: "Chicken Parmigiana", category: "lunch",
    description: "Breaded chicken escalope topped with mozzarella & tomato sugo, served with fries, slaw & fresh salad.",
    price: 11.95, imageUrl: "/images/menu/chicken-parmigiana.jpg",
    dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, allergens: ["gluten", "dairy", "eggs"] },
    available: true, customizationOptions: [],
  },
  {
    _id: "l22", name: "Beans & Beyond Special Platter", category: "lunch",
    description: "Our house feast — spiced fried chicken, beef mince curry, chickpea stew, pilaf rice, cucumber salad with seasonal fruit & dates.",
    price: 15.95, imageUrl: "/images/menu/bb-special-platter.jpg",
    dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, allergens: ["gluten"] },
    available: true, customizationOptions: [], chefsPick: true,
  },

  // ─── SNACKS ───
  {
    _id: "s1", name: "Butter Croissant", category: "snacks",
    description: "Freshly baked, golden, buttery croissant — perfect with a coffee.",
    price: 2.80, imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, allergens: ["gluten", "dairy", "eggs"] },
    available: true, customizationOptions: [],
  },
  {
    _id: "s2", name: "Pain au Chocolat", category: "snacks",
    description: "Flaky pastry with two dark chocolate batons baked in the centre.",
    price: 3.20, imageUrl: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, allergens: ["gluten", "dairy", "eggs"] },
    available: true, customizationOptions: [], popular: true,
  },
  {
    _id: "s3", name: "Banana & Walnut Loaf", category: "snacks",
    description: "Moist, home-style banana loaf with toasted walnuts — served warm with butter.",
    price: 3.50, imageUrl: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, allergens: ["gluten", "dairy", "eggs", "nuts"] },
    available: true, customizationOptions: [], chefsPick: true,
  },
  {
    _id: "s4", name: "Granola Bowl", category: "snacks",
    description: "House granola with thick Greek yoghurt, honey, and fresh seasonal fruit.",
    price: 4.50, imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, allergens: ["gluten", "dairy", "nuts"] },
    available: true, customizationOptions: [],
  },
  {
    _id: "s5", name: "Scone with Jam & Cream", category: "snacks",
    description: "Warm fruit scone served with strawberry jam and Cornish clotted cream.",
    price: 3.95, imageUrl: "https://images.unsplash.com/photo-1593954134618-5f29b4bd5433?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, allergens: ["gluten", "dairy", "eggs"] },
    available: true, customizationOptions: [],
  },
  {
    _id: "s6", name: "House Coleslaw", category: "snacks",
    description: "Crisp cabbage, carrot & red onion in a creamy mayo dressing — perfect with burgers and grills.",
    price: 2.50, imageUrl: "/images/menu/coleslaw.jpg",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: true, allergens: ["eggs", "dairy"] },
    available: true, customizationOptions: [],
  },

  // ─── COLD DRINKS ───
  {
    _id: "d1", name: "Fresh Orange Juice", category: "cold-drinks",
    description: "Freshly squeezed Valencian oranges — pure sunshine in a glass.",
    price: 3.50, imageUrl: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: true, glutenFree: true, allergens: [] },
    available: true, customizationOptions: [],
  },
  {
    _id: "d2", name: "Iced Latte", category: "cold-drinks",
    description: "Double espresso over ice with cold milk — refreshing and energising.",
    price: 4.20, imageUrl: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: true, allergens: ["dairy"] },
    available: true, customizationOptions: [
      { name: "Milk", options: ["Whole", "Oat", "Almond", "Soy"], additionalPrice: 0.40 },
      { name: "Syrup", options: ["None", "Vanilla", "Caramel", "Biscoff"], additionalPrice: 0.50 },
    ], popular: true,
  },
  {
    _id: "d3", name: "Iced Matcha", category: "cold-drinks",
    description: "Ceremonial matcha shaken over ice with cold oat milk.",
    price: 4.50, imageUrl: "https://images.unsplash.com/photo-1717603545758-88cc454db69b?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: true, glutenFree: true, allergens: [] },
    available: true, customizationOptions: [],
  },
  {
    _id: "d4", name: "Mango & Passion Smoothie", category: "cold-drinks",
    description: "Frozen mango, passion fruit, and coconut water blended fresh to order.",
    price: 4.80, imageUrl: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: true, glutenFree: true, allergens: [] },
    available: true, customizationOptions: [], popular: true,
  },
  {
    _id: "d5", name: "Berry Blast Smoothie", category: "cold-drinks",
    description: "Strawberries, blueberries, raspberry, banana & apple juice blended thick.",
    price: 4.80, imageUrl: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: true, glutenFree: true, allergens: [] },
    available: true, customizationOptions: [],
  },
  {
    _id: "d6", name: "Vanilla Milkshake", category: "cold-drinks",
    description: "Thick vanilla ice-cream shake topped with whipped cream and a wafer.",
    price: 4.50, imageUrl: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, allergens: ["dairy", "gluten"] },
    available: true, customizationOptions: [
      { name: "Flavour", options: ["Vanilla", "Chocolate", "Strawberry", "Oreo", "Biscoff"], additionalPrice: 0 },
    ], popular: true,
  },
  {
    _id: "d7", name: "Mint Lemonade", category: "cold-drinks",
    description: "Fresh lemon juice, garden mint, and a hint of agave over crushed ice.",
    price: 3.80, imageUrl: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: true, glutenFree: true, allergens: [] },
    available: true, customizationOptions: [],
  },
  {
    _id: "d8", name: "Soft Drink", category: "cold-drinks",
    description: "Coke, Diet Coke, Sprite, Fanta, or sparkling water — 330ml can.",
    price: 1.95, imageUrl: "https://images.unsplash.com/photo-1665485765436-696f45219ed6?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: true, glutenFree: true, allergens: [] },
    available: true, customizationOptions: [
      { name: "Choice", options: ["Coke", "Diet Coke", "Sprite", "Fanta", "Sparkling water"], additionalPrice: 0 },
    ],
  },

  // ─── DESSERTS ───
  {
    _id: "ds1", name: "Chocolate Brownie", category: "desserts",
    description: "Warm gooey brownie with a scoop of vanilla ice cream and chocolate sauce.",
    price: 5.95, imageUrl: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, allergens: ["gluten", "eggs", "dairy"] },
    available: true, customizationOptions: [], popular: true,
  },
  {
    _id: "ds2", name: "Cheesecake of the Day", category: "desserts",
    description: "Ask your server for today's baked cheesecake — Biscoff, vanilla berry, or salted caramel.",
    price: 5.50, imageUrl: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, allergens: ["gluten", "eggs", "dairy"] },
    available: true, customizationOptions: [],
  },
  {
    _id: "ds3", name: "Carrot Cake", category: "desserts",
    description: "Spiced carrot cake with cream cheese frosting, walnuts & a dusting of cinnamon.",
    price: 4.95, imageUrl: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, allergens: ["gluten", "eggs", "dairy", "nuts"] },
    available: true, customizationOptions: [], chefsPick: true,
  },
  {
    _id: "ds4", name: "Sticky Toffee Pudding", category: "desserts",
    description: "Date sponge soaked in warm toffee sauce, served with vanilla ice cream.",
    price: 5.95, imageUrl: "https://images.unsplash.com/photo-1604423907382-6eaa8b5ccb3a?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, allergens: ["gluten", "eggs", "dairy"] },
    available: true, customizationOptions: [],
  },
  {
    _id: "ds5", name: "Tiramisu", category: "desserts",
    description: "Coffee-soaked sponge layered with mascarpone cream and dusted with cocoa. Alcohol-free.",
    price: 5.50, imageUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, allergens: ["gluten", "eggs", "dairy"] },
    available: true, customizationOptions: [],
  },
  {
    _id: "ds6", name: "Baklava (3 pieces)", category: "desserts",
    description: "Layered filo with pistachios, walnuts & honey syrup — served with Turkish coffee on the side, optional.",
    price: 4.95, imageUrl: "https://images.unsplash.com/photo-1617806501553-d3a6a3a7b227?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, allergens: ["gluten", "dairy", "nuts"] },
    available: true, customizationOptions: [], popular: true,
  },
  {
    _id: "ds7", name: "Affogato", category: "desserts",
    description: "A double shot of hot espresso poured over a scoop of vanilla ice cream.",
    price: 4.50, imageUrl: "https://images.unsplash.com/photo-1568901839119-631418a3910d?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: true, allergens: ["dairy"] },
    available: true, customizationOptions: [],
  },
];

export const REVIEWS: Review[] = [
  {
    id: "r1", author: "Sarah M.", rating: 5,
    text: "Absolutely love this place! The flat white is the best I've had in East London. The atmosphere is warm and inviting — my go-to spot for working remotely.",
    date: "2025-03-10", avatar: "",
  },
  {
    id: "r2", author: "James T.", rating: 5,
    text: "The veggie breakfast is incredible. Fresh, generous portions and the staff are always so friendly. Been coming here every Saturday for over a year!",
    date: "2025-02-28", avatar: "",
  },
  {
    id: "r3", author: "Priya K.", rating: 5,
    text: "Hidden gem on Commercial Road. The matcha latte is phenomenal and the avocado toast is perfectly seasoned. Highly recommend to anyone nearby.",
    date: "2025-03-02", avatar: "",
  },
  {
    id: "r4", author: "David L.", rating: 4,
    text: "Great coffee and food at reasonable prices. The brownie is dangerously good. Gets busy on weekday mornings but always worth the short wait.",
    date: "2025-01-15", avatar: "",
  },
  {
    id: "r5", author: "Emma R.", rating: 5,
    text: "Best breakfast spot in E14 hands down. I've tried everything on the menu and never been disappointed. They really care about quality here.",
    date: "2025-03-18", avatar: "",
  },
  {
    id: "r6", author: "Omar H.", rating: 4,
    text: "Really solid halal café — hard to find quality like this in the area. The eggs benedict is excellent. Parking can be tricky but worth it.",
    date: "2025-02-05", avatar: "",
  },
  {
    id: "r7", author: "Chloe W.", rating: 3,
    text: "Good food and nice atmosphere. Service was a bit slow on the Saturday I visited — understandable given how busy it was. The pancakes were lovely though.",
    date: "2025-01-22", avatar: "",
  },
];

export const USPS = [
  { icon: "🌿", title: "Fresh Daily",      desc: "All food is prepared fresh every morning using quality, locally-sourced ingredients." },
  { icon: "🥦", title: "Veggie-Friendly",  desc: "Extensive vegetarian and vegan options clearly labelled on every menu." },
  { icon: "🏡", title: "Local Ingredients",desc: "We partner with local suppliers and markets to keep it seasonal and sustainable." },
  { icon: "♻️", title: "Eco-Conscious",    desc: "Compostable packaging, reusable cup discounts, and a zero food-waste kitchen." },
];

export const SERVICE_CHARGE_PERCENT = 0.1; // 10%
export const DELIVERY_FEE = 2.99;
export const FREE_DELIVERY_THRESHOLD = 20;
