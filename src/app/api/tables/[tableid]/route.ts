import { NextResponse } from "next/server";
import Knex from "knex";
import { getKnexClient } from "../../knex";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

type Data = {
  name: string;
};
//    `);
const knex = getKnexClient();

const getTableSchema = (tableName: string) =>
  knex.raw(`SELECT column_name, column_default, is_nullable, data_type 
FROM information_schema.columns 
WHERE table_name = '${tableName}' 
ORDER BY 
  ordinal_position`);

const getTablePrimaryKeys = (tableName: string) =>
  knex.raw(`SELECT               
pg_attribute.attname, 
format_type(pg_attribute.atttypid, pg_attribute.atttypmod) 
FROM pg_index, pg_class, pg_attribute, pg_namespace 
WHERE 
pg_class.oid = '${tableName}'::regclass AND 
indrelid = pg_class.oid AND 
nspname = 'public' AND 
pg_class.relnamespace = pg_namespace.oid AND 
pg_attribute.attrelid = pg_class.oid AND 
pg_attribute.attnum = any(pg_index.indkey)
AND indisprimary`);

export async function GET(req: Request, { params }) {
  // const queryRes = await knex.raw(`SELECT *
  // FROM information_schema.columns
  //  WHERE table_schema = 'public' AND table_name = '${req.query.tablename}'

  const tableName = params.tableid;

  // TODO: maybe UNION all this into a single SQL query
  const [rows, schema, primaryKeys] = await Promise.all([
    knex.select("*").from(tableName),
    getTableSchema(tableName),
    getTablePrimaryKeys(tableName),
  ]);
  return NextResponse.json({
    data: { rows, schema: schema?.rows, primaryKeys: primaryKeys?.rows },
  });
}

export async function POST(req: Request, { params }) {
  const { tableid: tableName } = params;
  const json = await req.json();

  try {
    const res = await knex.insert(json).into(tableName).returning("*");
    return NextResponse.json({ data: json });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: String(err) }, { status: 400 });
  }
}

export async function PATCH(req: Request, { params }) {
  const { tableid: tableName } = params;
  const { where, ...updateObj } = await req.json();

  // check where values to make sure not defined
  if (where == null) {
    return NextResponse.json(
      { error: `Must pass "where" object` },
      { status: 403 }
    );
  }

  try {
    const res = await knex
      .update(updateObj)
      .into(tableName)
      .where(where)
      .returning("*");
    return NextResponse.json({ data: res });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: String(err) }, { status: 400 });
  }
}
