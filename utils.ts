import { Data } from "./type";
import { PoolClient } from "pg";

export const insertData = async (
  table: string,
  { fields, values }: Data,
  client: PoolClient
) => {
  const columns = fields.join(",");
  const query = `INSERT INTO ${table}(${columns}) VALUES(${fields.map(
    (_, i) => "$" + (i + 1)
  )}) RETURNING id`;
  const result = await client.query(query, values);
  return result;
};