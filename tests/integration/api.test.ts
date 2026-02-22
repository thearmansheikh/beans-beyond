// Integration tests for the Express API
// Run with: npx jest tests/integration/
// Requires backend to be running on localhost:5000

const BASE = "http://localhost:5000/api";

describe("GET /api/health", () => {
  it("returns status ok", async () => {
    const res  = await fetch(`${BASE}/health`);
    const json = await res.json() as { status: string };
    expect(res.status).toBe(200);
    expect(json.status).toBe("ok");
  });
});

describe("GET /api/menu", () => {
  it("returns an array of menu items", async () => {
    const res  = await fetch(`${BASE}/menu`);
    const json = await res.json() as { success: boolean; data: unknown[] };
    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(Array.isArray(json.data)).toBe(true);
  });
});

describe("POST /api/auth/login", () => {
  it("rejects invalid credentials", async () => {
    const res = await fetch(`${BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "fake@fake.com", password: "wrong" }),
    });
    expect(res.status).toBe(401);
  });
});
