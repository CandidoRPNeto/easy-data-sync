import { PoolClient, QueryResult } from "pg";
import { Row } from "../data_files/File";
import { Query } from "./Query";
  
export class PGInsert implements Query {
    private query: string;
    private values: string[] = [];

    constructor(query: string, values: string[]) {
        this.query = query;
        this.values = values;
    }

    execute(client: PoolClient): Promise<QueryResult<any>> {
        let query = this.query;
        if( query.slice(0, -1) !== ';')
            query = `${query};`
        return client.query(query, this.values);
    }
}