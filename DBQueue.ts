import { Query } from "./Query";

export interface ConnectInfo {}

export interface DBQueue {
    db_connect(connect: ConnectInfo): DBQueue;
    add_query(query:Query): void;
    run_queries(): void;
}
