import { worker } from "./worker.model";

export class reviews {
    constructor(
        public worker:worker,
        public date:string,
        public colth: number,
        public failed: number
    ){}
}