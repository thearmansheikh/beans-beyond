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
  email: "info@bbcafe.co.uk",
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
  { _id: "4", name: "Lunch",      slug: "lunch",      displayOrder: 3, icon: "🥗" },
  { _id: "5", name: "Snacks",     slug: "snacks",     displayOrder: 4, icon: "🥐" },
  { _id: "6", name: "Cold Drinks",slug: "cold-drinks",displayOrder: 5, icon: "🥤" },
  { _id: "7", name: "Desserts",   slug: "desserts",   displayOrder: 6, icon: "🍰" },
];

export const MENU_ITEMS: MenuItem[] = [
  // Breakfast
  {
    _id: "b1", name: "Full English Breakfast", category: "breakfast",
    description: "Two eggs, bacon, sausages, baked beans, grilled tomato, mushrooms & toast.",
    price: 9.99, imageUrl: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&q=80",
    dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, allergens: ["gluten", "eggs", "dairy"] },
    available: true, customizationOptions: [], popular: true,
  },
  {
    _id: "b2", name: "Veggie Breakfast", category: "breakfast",
    description: "Two eggs, halloumi, avocado, baked beans, grilled tomato, mushrooms & toast.",
    price: 9.49, imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, allergens: ["gluten", "eggs", "dairy"] },
    available: true, customizationOptions: [], popular: true,
  },
  {
    _id: "b3", name: "Eggs Benedict", category: "breakfast",
    description: "Poached eggs on toasted English muffin with Canadian bacon and hollandaise.",
    price: 8.99, imageUrl: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=600&q=80",
    dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, allergens: ["gluten", "eggs", "dairy"] },
    available: true, customizationOptions: [], chefsPick: true,
  },
  {
    _id: "b4", name: "Avocado Toast", category: "breakfast",
    description: "Smashed avocado on sourdough with cherry tomatoes, feta & everything bagel seasoning.",
    price: 7.99, imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, allergens: ["gluten", "dairy"] },
    available: true, customizationOptions: [], popular: true,
  },
  {
    _id: "b5", name: "Pancake Stack", category: "breakfast",
    description: "Fluffy American pancakes with maple syrup, fresh berries, and clotted cream.",
    price: 8.49, imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, allergens: ["gluten", "eggs", "dairy"] },
    available: true, customizationOptions: [],
  },
  // Coffee
  {
    _id: "c1", name: "Flat White", category: "coffee",
    description: "Two ristretto shots with velvety steamed milk in a smaller serve.",
    price: 3.50, imageUrl: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: true, allergens: ["dairy"] },
    available: true, customizationOptions: [
      { name: "Milk", options: ["Whole", "Semi-skimmed", "Oat", "Almond", "Soy"], additionalPrice: 0.40 },
      { name: "Size", options: ["Regular", "Large"], additionalPrice: 0.50 },
    ], popular: true,
  },
  {
    _id: "c2", name: "Cappuccino", category: "coffee",
    description: "Equal parts espresso, steamed milk and thick foam with a dusting of cocoa.",
    price: 3.20, imageUrl: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: true, allergens: ["dairy"] },
    available: true, customizationOptions: [
      { name: "Milk", options: ["Whole", "Semi-skimmed", "Oat", "Almond", "Soy"], additionalPrice: 0.40 },
    ],
  },
  {
    _id: "c3", name: "Americano", category: "coffee",
    description: "Smooth espresso diluted with hot water — black or with milk on the side.",
    price: 2.80, imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: true, glutenFree: true, allergens: [] },
    available: true, customizationOptions: [
      { name: "Size", options: ["Regular", "Large"], additionalPrice: 0.40 },
    ],
  },
  {
    _id: "c4", name: "Latte", category: "coffee",
    description: "A generous pour of steamed milk over a double shot of espresso.",
    price: 3.30, imageUrl: "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: true, allergens: ["dairy"] },
    available: true, customizationOptions: [
      { name: "Milk", options: ["Whole", "Semi-skimmed", "Oat", "Almond", "Soy"], additionalPrice: 0.40 },
      { name: "Syrup", options: ["None", "Vanilla", "Caramel", "Hazelnut"], additionalPrice: 0.50 },
    ], popular: true,
  },
  {
    _id: "c5", name: "Matcha Latte", category: "coffee",
    description: "Ceremonial grade matcha whisked with steamed oat milk and a touch of honey.",
    price: 4.20, imageUrl: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: true, allergens: ["dairy"] },
    available: true, customizationOptions: [
      { name: "Sweetness", options: ["None", "Honey", "Vanilla syrup"], additionalPrice: 0 },
    ], popular: true, chefsPick: true,
  },
  // Lunch
  {
    _id: "l1", name: "Club Sandwich", category: "lunch",
    description: "Triple-decker with chicken, bacon, egg, lettuce, tomato & mayo on toasted bread.",
    price: 8.99, imageUrl: "https://images.unsplash.com/photo-1528736235302-52922df5c122?w=600&q=80",
    dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, allergens: ["gluten", "eggs", "dairy"] },
    available: true, customizationOptions: [], popular: true,
  },
  {
    _id: "l2", name: "Halloumi Wrap", category: "lunch",
    description: "Grilled halloumi, roasted peppers, spinach, hummus & sweet chilli in a warm tortilla.",
    price: 8.49, imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, allergens: ["gluten", "dairy"] },
    available: true, customizationOptions: [], chefsPick: true,
  },
  {
    _id: "l3", name: "Chicken Caesar Salad", category: "lunch",
    description: "Grilled chicken, romaine, parmesan, croutons & house Caesar dressing.",
    price: 9.49, imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80",
    dietaryInfo: { vegetarian: false, vegan: false, glutenFree: false, allergens: ["gluten", "eggs", "dairy", "fish"] },
    available: true, customizationOptions: [],
  },
  {
    _id: "l4", name: "Soup of the Day", category: "lunch",
    description: "Ask your server for today's freshly made soup, served with crusty bread.",
    price: 5.99, imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, allergens: ["gluten"] },
    available: true, customizationOptions: [],
  },
  // Snacks
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
  // Cold Drinks
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
    ], popular: true,
  },
  // Desserts
  {
    _id: "ds1", name: "Chocolate Brownie", category: "desserts",
    description: "Warm gooey brownie with a scoop of vanilla ice cream.",
    price: 5.99, imageUrl: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, allergens: ["gluten", "eggs", "dairy"] },
    available: true, customizationOptions: [], popular: true,
  },
  {
    _id: "ds2", name: "Cheesecake of the Day", category: "desserts",
    description: "Ask your server for today's baked cheesecake selection.",
    price: 5.49, imageUrl: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=80",
    dietaryInfo: { vegetarian: true, vegan: false, glutenFree: false, allergens: ["gluten", "eggs", "dairy"] },
    available: true, customizationOptions: [],
  },
];

export const REVIEWS: Review[] = [
  {
    id: "r1", author: "Sarah M.", rating: 5,
    text: "Absolutely love this place! The flat white is the best I've had in East London. The atmosphere is warm and inviting — my go-to spot for working remotely.",
    date: "2024-12-10", avatar: "",
  },
  {
    id: "r2", author: "James T.", rating: 5,
    text: "The veggie breakfast is incredible. Fresh, generous portions and the staff are always so friendly. Been coming here every Saturday for over a year!",
    date: "2024-11-28", avatar: "",
  },
  {
    id: "r3", author: "Priya K.", rating: 5,
    text: "Hidden gem on Commercial Road. The matcha latte is phenomenal and the avocado toast is perfectly seasoned. Highly recommend to anyone nearby.",
    date: "2024-12-02", avatar: "",
  },
  {
    id: "r4", author: "David L.", rating: 4,
    text: "Great coffee and food at reasonable prices. The brownie is dangerously good. Gets busy on weekday mornings but always worth the short wait.",
    date: "2024-10-15", avatar: "",
  },
  {
    id: "r5", author: "Emma R.", rating: 5,
    text: "Best breakfast spot in E14 hands down. I've tried everything on the menu and never been disappointed. They really care about quality here.",
    date: "2024-12-18", avatar: "",
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
