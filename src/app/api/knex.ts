import knex from "knex";
import config from "src/config";

const Knex = knex(config as any);

export function getKnexClient() {
  return Knex;
}
