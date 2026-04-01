import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, event_type, guest_count, event_date, budget, message } = body;

    // ── Validate ──────────────────────────────────────────────────────────
    if (!name?.trim())       return NextResponse.json({ error: "name is required" },       { status: 400 });
    if (!email?.trim())      return NextResponse.json({ error: "email is required" },      { status: 400 });
    if (!event_type?.trim()) return NextResponse.json({ error: "event_type is required" }, { status: 400 });

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("catering_enquiries")
      .insert({
        name:        name.trim(),
        email:       email.trim().toLowerCase(),
        phone:       phone?.trim()      || null,
        event_type:  event_type.trim(),
        guest_count: guest_count ? Number(String(guest_count).split(" ")[0]) : null,
        event_date:  event_date?.trim() || null,
        budget:      budget?.trim()     || null,
        message:     message?.trim()    || null,
        status:      "new",
      })
      .select("id")
      .single();

    if (error) {
      console.error("[API /catering] insert error:", error);
      return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 });
    }

    return NextResponse.json({ enquiryId: data.id }, { status: 201 });

  } catch (err) {
    console.error("[API /catering] unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
