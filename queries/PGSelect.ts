import { PoolClient, QueryResult } from "pg";
import { Row } from "../data_files/File";
import { Query } from "./Query";
  
export class PGSelect implements Query {
    private query: string;
    private table: string;
    private values: string[] = [];

    constructor(table: string, fields: string[]) {
        let columns = fields.length > 0 ? fields.join(",") : "*";
        this.query = `SELECT ${columns} from ${table}`;
        this.table = table;
    }

    add_id_where(id:string): PGSelect {
        this.values.push(id);
        this.query = `${this.query} WHERE id = $${this.values.length}`;
        return this;
    }

    add_where(column:string, value:string): PGSelect {
        this.values.push(value);
        if(this.query.includes("WHERE"))
            this.query = `${this.query} AND ${column} = $${this.values.length}`;
        else
            this.query = `${this.query} WHERE ${column} = $${this.values.length}`;
        return this;
    }

    add_join(join_table:string, foreing_key:string, type:string): PGSelect {
        return this;
    }

    add_order(column:string, order:string): PGSelect {
        return this;
    }

    execute(client: PoolClient): Promise<QueryResult<any>> {
        let query = `${this.query};`;
        return client.query(query, this.values);
    }
}