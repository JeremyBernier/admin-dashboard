import { NextResponse } from "next/server";
import Knex from "knex";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import "server-only";
import { getKnexClient } from "../knex";

const knex = getKnexClient();

/**
 * const knex = require('knex')({
  client: 'sqlite3', // or 'better-sqlite3'
  connection: {
    filename: "./mydb.sqlite"
  }
});
 */

type Data = {
  name: string;
};

export async function GET() {
  const queryRes = await knex.raw(`SELECT table_name 
  FROM information_schema.tables
  WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'`);
  return NextResponse.json({ data: queryRes });
}
