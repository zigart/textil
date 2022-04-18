import { machine } from "./machine.model";
import { worker } from "./worker.model";

export class divide {
    constructor(
        public work:string,
        public worker:worker,
        public machine: machine,
        public date:string,
        public colth: number,
        public failed:number
        
    ){}
}