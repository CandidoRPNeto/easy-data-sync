import { Pool } from "pg";
import { Query } from "./Query";
import * as fs from 'fs';
import * as path from 'path';
import { ConnectInfo, DBQueue } from "./DBQueue";

export interface PGConnectInfo extends ConnectInfo{
    host: string;
    port: number;
    user: string;
    database: string;
    password: string;
}

export class PGQueue implements DBQueue{
    private pool!: Pool;
    private queries: Query[] = [];

    public db_connect(connect: PGConnectInfo): DBQueue {
        this.pool = new Pool(connect);
        return this;
    }
    
    public add_query(query:Query) {
        this.queries.push(query);
    }

    public async run_queries() {
        this.prepare_essential_dir();
        const client = await this.pool.connect();
        for (let q of this.queries) { q.execute(client); }
        client.release();
    }
    
    private prepare_essential_dir() {
        const logDir = path.join(__dirname, 'log');
        const listDir = path.join(__dirname, 'list');
        if (!fs.existsSync(logDir))  fs.mkdirSync(logDir);
        if (!fs.existsSync(logDir))  fs.mkdirSync(listDir);
    }
}