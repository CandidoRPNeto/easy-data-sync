import { PoolClient, QueryResult } from "pg";
import { Row } from "../data_files/File";
import { Query } from "./Query";
  
export class PGInsert implements Query {
    private query: string;
    private values: string[] = [];

    constructor(table: string, { fields, values }: Row) {
        const columns = fields.join(",");
        this.query = `INSERT INTO ${table}(${columns}) VALUES(${fields.map(
        (_, i) => "$" + (i + 1)
        )}) RETURNING id`;
        this.values = values;
    }

    execute(client: PoolClient): Promise<QueryResult<any>> {
        let query = `${this.query};`;
        return client.query(query, this.values);
    }
}