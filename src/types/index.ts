// ─────────────────────────────────────────────
// Beans & Beyond – Shared TypeScript Types
// ─────────────────────────────────────────────

export type DietaryInfo = {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  allergens: string[];
};

export type CustomizationOption = {
  name: string;
  options: string[];
  additionalPrice: number;
};

export type MenuItem = {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
  dietaryInfo: DietaryInfo;
  available: boolean;
  customizationOptions: CustomizationOption[];
  popular?: boolean;
  chefsPick?: boolean;
};

export type MenuCategory = {
  _id: string;
  name: string;
  slug: string;
  displayOrder: number;
  icon: string;
  description?: string;
};

export type CartItem = {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  customizations: Record<string, string>;
};

export type OrderType = "dine-in" | "takeaway" | "delivery";

export type OrderStatus =
  | "received"
  | "preparing"
  | "ready"
  | "delivered"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed";

export type Address = {
  street: string;
  city: string;
  postcode: string;
  isDefault?: boolean;
};

export type ContactInfo = {
  name: string;
  phone: string;
  email: string;
};

export type Order = {
  _id: string;
  orderNumber: string;
  userId?: string;
  items: CartItem[];
  orderType: OrderType;
  tableNumber?: string;
  deliveryAddress?: Address;
  pickupTime?: string;
  subtotal: number;
  serviceCharge: number;
  deliveryFee: number;
  total: number;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  orderStatus: OrderStatus;
  specialInstructions?: string;
  contactInfo: ContactInfo;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  addresses: Address[];
  orderHistory: string[];
  favoriteItems: string[];
  dietaryPreferences: string[];
  role: "user" | "admin";
  createdAt: string;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
};

export type CheckoutFormData = {
  name: string;
  phone: string;
  email: string;
  orderType: OrderType;
  tableNumber?: string;
  pickupTime?: string;
  deliveryAddress?: Address;
  specialInstructions?: string;
  paymentMethod: string;
  promoCode?: string;
};
