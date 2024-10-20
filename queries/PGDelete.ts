import { PoolClient, QueryResult } from "pg";
import { Row } from "../data_files/File";
import { Query } from "./Query";
  
export class PGDelete implements Query {
    private query: string;
    private values: string[] = [];

    constructor(table: string) {
        this.query = `DELETE FROM ${table}`;
    }

    add_id_where(id:string): PGDelete {
        this.values.push(id);
        this.query = `${this.query} WHERE id = $${this.values.length}`;
        return this;
    }

    add_where(column:string, value:string): PGDelete {
        this.values.push(value);
        if(this.query.includes("WHERE"))
            this.query = `${this.query} AND ${column} = $${this.values.length}`;
        else
            this.query = `${this.query} WHERE ${column} = $${this.values.length}`;
        return this;
    }

    execute(client: PoolClient): Promise<QueryResult<any>> {
        let query = `${this.query};`;
        return client.query(query,this.values);
    }
}