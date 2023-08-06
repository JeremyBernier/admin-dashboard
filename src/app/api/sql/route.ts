import { NextResponse } from "next/server";

import "server-only";

import { getKnexClient } from "../knex";
const knex = getKnexClient();

export async function POST(req: Request, { params }) {
  const json = await req.json();

  const queryRes = await knex.raw(json.sql);
  return NextResponse.json({ data: queryRes });
}
