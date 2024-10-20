import { PoolClient, QueryResult } from "pg";
import { Row } from "../data_files/File";
import { Query } from "./Query";
  
export class PGUpdate implements Query {
    private query: string;
    private values: string[] = [];

    constructor(table: string, { fields, values }: Row) {
        let query = `UPDATE ${table} SET`;
        for  (let i = 0; i < fields.length; i++) {
            query = `${query} ${fields[i]} = $${i + 1},`;
        }
        this.query = query.slice(0, -1);
        this.values = values;
    }

    add_id_where(id:string): PGUpdate {
        this.values.push(id);
        this.query = `${this.query} WHERE id = $${this.values.length}`;
        return this;
    }

    add_where(column:string, value:string): PGUpdate {
        this.values.push(value);
        if(this.query.includes("WHERE"))
            this.query = `${this.query} AND ${column} = $${this.values.length}`;
        else
            this.query = `${this.query} WHERE ${column} = $${this.values.length}`;
        return this;
    }

    execute(client: PoolClient): Promise<QueryResult<any>> {
        let query = `${this.query};`;
        return client.query(query, this.values);
    }
}