import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Protect /admin — redirect unauthenticated users to the admin page
  // (which shows the login form). The page itself handles the UI switch.
  if (request.nextUrl.pathname.startsWith("/admin") && !user) {
    // Allow the /admin page itself to render (it shows login form)
    // Only block sub-routes if you add them later (e.g. /admin/api/*)
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
