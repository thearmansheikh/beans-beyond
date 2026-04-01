import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  try {
    const body  = await req.json();
    const email = body?.email?.trim()?.toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Use upsert — admin client has full access so no RLS conflict
    const { error } = await supabase
      .from("newsletter_subscribers")
      .upsert({ email, subscribed: true }, { onConflict: "email" });

    if (error) {
      console.error("[API /newsletter] upsert error:", error);
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (err) {
    console.error("[API /newsletter] unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
