import { createClient } from "@supabase/supabase-js";

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnon);

// ─── Database Types ────────────────────────────────────────────────────────

export type OrderStatus   = "pending" | "confirmed" | "preparing" | "ready" | "delivered" | "cancelled";
export type OrderType     = "dine-in" | "takeaway" | "delivery";
export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface DbOrder {
  id?: string;
  created_at?: string;
  order_type: OrderType;
  status?: OrderStatus;
  customer_name: string;
  customer_email?: string;
  customer_phone?: string;
  delivery_address?: string;
  table_number?: string;
  subtotal: number;
  delivery_fee?: number;
  service_charge?: number;
  total: number;
  notes?: string;
  promo_code?: string;
  discount?: number;
}

export interface DbOrderItem {
  id?: string;
  order_id: string;
  menu_item_id: string;
  name: string;
  price: number;
  quantity: number;
  customizations?: Record<string, string>;
  subtotal: number;
}

export interface DbBooking {
  id?: string;
  created_at?: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  party_size: number;
  notes?: string;
  status?: BookingStatus;
}

export interface DbNewsletterSubscriber {
  id?: string;
  created_at?: string;
  email: string;
  subscribed?: boolean;
}

export interface DbContactMessage {
  id?: string;
  created_at?: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  read?: boolean;
}

export interface DbCateringEnquiry {
  id?: string;
  created_at?: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  event_type?: string;
  event_date?: string;
  guest_count?: number;
  budget?: string;
  message?: string;
  status?: string;
}
