import { machine } from "./machine.model";
import { worker } from "./worker.model";

export class reviews {
    constructor(
        public worker:worker,
        public machine: machine,
        public date:string,
        public colth: number,
        public failed: number
    ){}
}