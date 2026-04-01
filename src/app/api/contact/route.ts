import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";
import { sendEmail } from "@/lib/emails/resend";
import { adminAlertHtml, adminAlertSubject } from "@/lib/emails/adminAlert";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name?.trim())    return NextResponse.json({ error: "name is required" },    { status: 400 });
    if (!email?.trim())   return NextResponse.json({ error: "email is required" },   { status: 400 });
    if (!message?.trim()) return NextResponse.json({ error: "message is required" }, { status: 400 });

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("contact_messages")
      .insert({
        name:    name.trim(),
        email:   email.trim().toLowerCase(),
        phone:   phone?.trim()   || null,
        subject: subject?.trim() || null,
        message: message.trim(),
        read:    false,
      })
      .select("id")
      .single();

    if (error) {
      console.error("[API /contact] insert error:", error);
      return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }

    const adminUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/admin`;

    // Admin alert
    await sendEmail({
      to:      process.env.ADMIN_EMAIL ?? "admin@bbcafe.co.uk",
      subject: adminAlertSubject("contact", subject?.trim() || name.trim()),
      html:    adminAlertHtml("contact", [
        { label: "Name",    value: name.trim() },
        { label: "Email",   value: email.trim() },
        ...(phone   ? [{ label: "Phone",   value: phone.trim() }]   : []),
        ...(subject ? [{ label: "Subject", value: subject.trim() }] : []),
        { label: "Message", value: message.trim() },
      ], adminUrl),
    });

    return NextResponse.json({ messageId: data.id }, { status: 201 });

  } catch (err) {
    console.error("[API /contact] unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
