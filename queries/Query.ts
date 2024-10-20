
import { PoolClient } from "pg";

export interface Query {
    execute(client: PoolClient): string;
}