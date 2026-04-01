import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { order, items } = body;

    // ── Validate required fields ──────────────────────────────────────────
    if (!order?.customer_name?.trim()) {
      return NextResponse.json({ error: "customer_name is required" }, { status: 400 });
    }
    if (!order?.order_type || !["dine-in", "takeaway", "delivery"].includes(order.order_type)) {
      return NextResponse.json({ error: "Invalid order_type" }, { status: 400 });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Order must contain at least one item" }, { status: 400 });
    }
    if (order.order_type === "delivery" && !order.delivery_address?.trim()) {
      return NextResponse.json({ error: "delivery_address is required for delivery orders" }, { status: 400 });
    }

    const supabase = createAdminClient();

    // ── Insert order ──────────────────────────────────────────────────────
    const { data: orderData, error: orderErr } = await supabase
      .from("orders")
      .insert({
        order_type:       order.order_type,
        customer_name:    order.customer_name.trim(),
        customer_email:   order.customer_email?.trim() || null,
        customer_phone:   order.customer_phone?.trim() || null,
        delivery_address: order.delivery_address?.trim() || null,
        table_number:     order.table_number?.trim() || null,
        subtotal:         Number(order.subtotal) || 0,
        delivery_fee:     Number(order.delivery_fee) || 0,
        service_charge:   Number(order.service_charge) || 0,
        total:            Number(order.total) || 0,
        notes:            order.notes?.trim() || null,
        promo_code:       order.promo_code?.trim() || null,
        discount:         Number(order.discount) || 0,
      })
      .select("id")
      .single();

    if (orderErr || !orderData) {
      console.error("[API /orders] order insert error:", orderErr);
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }

    // ── Insert order items ────────────────────────────────────────────────
    const orderItems = items.map((item: {
      menuItemId: string;
      name: string;
      price: number;
      quantity: number;
      customizations?: Record<string, string>;
    }) => ({
      order_id:       orderData.id,
      menu_item_id:   item.menuItemId,
      name:           item.name,
      price:          Number(item.price),
      quantity:       Number(item.quantity),
      customizations: item.customizations ?? {},
      subtotal:       Number(item.price) * Number(item.quantity),
    }));

    const { error: itemsErr } = await supabase.from("order_items").insert(orderItems);
    if (itemsErr) {
      console.error("[API /orders] order_items insert error:", itemsErr);
      // Order created but items failed — still return orderId so front-end can show confirmation
    }

    return NextResponse.json({ orderId: orderData.id }, { status: 201 });

  } catch (err) {
    console.error("[API /orders] unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
