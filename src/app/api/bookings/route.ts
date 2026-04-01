import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, date, time, party_size, notes } = body;

    // ── Validate ──────────────────────────────────────────────────────────
    if (!name?.trim())  return NextResponse.json({ error: "name is required" },       { status: 400 });
    if (!email?.trim()) return NextResponse.json({ error: "email is required" },      { status: 400 });
    if (!phone?.trim()) return NextResponse.json({ error: "phone is required" },      { status: 400 });
    if (!date?.trim())  return NextResponse.json({ error: "date is required" },       { status: 400 });
    if (!time?.trim())  return NextResponse.json({ error: "time is required" },       { status: 400 });
    if (!party_size || isNaN(Number(party_size))) {
      return NextResponse.json({ error: "party_size must be a number" }, { status: 400 });
    }

    // Reject past dates
    const bookingDate = new Date(date);
    const today       = new Date(); today.setHours(0, 0, 0, 0);
    if (bookingDate < today) {
      return NextResponse.json({ error: "Booking date cannot be in the past" }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("bookings")
      .insert({
        name:       name.trim(),
        email:      email.trim().toLowerCase(),
        phone:      phone.trim(),
        date:       date.trim(),
        time:       time.trim(),
        party_size: Number(party_size),
        notes:      notes?.trim() || null,
      })
      .select("id")
      .single();

    if (error) {
      console.error("[API /bookings] insert error:", error);
      return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
    }

    return NextResponse.json({ bookingId: data.id }, { status: 201 });

  } catch (err) {
    console.error("[API /bookings] unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
