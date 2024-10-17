
import { Pool } from "pg";
import { Query } from "./Query";
import * as fs from 'fs';
import * as path from 'path';

export class DB {
    private pool!: Pool;
    private queries: Query[] = [];

    public postgres(host: string, port: number, user: string, database: string, password: string): DB {
        this.pool = new Pool({ user, host, database, password, port });
        return this;
    }

    public mysql(host: string, port: number, user: string, database: string, password: string): DB {
        this.pool = new Pool({ user, host, database, password, port });
        return this;
    }
    
    public addQuery(query:Query){
        this.queries.push(query);
    }

    public async runQueries(){
        this.prepareEssentialDir();
        const client = await this.pool.connect();
        for (let q of this.queries) { q.execute(client); }
        client.release();
    }
    
    private prepareEssentialDir() {
        const logDir = path.join(__dirname, 'log');
        const listDir = path.join(__dirname, 'list');
        if (!fs.existsSync(logDir))  fs.mkdirSync(logDir);
        if (!fs.existsSync(logDir))  fs.mkdirSync(listDir);
    }
}