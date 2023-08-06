import { NextResponse } from "next/server";

import "server-only";

export async function GET() {
  return NextResponse.json({ data: { hello: "world" } });
}
