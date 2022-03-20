import { machine } from "./machine.model";
import { worker } from "./worker.model";

export class reviews {
    constructor(
        public worker:worker,
        public machine: machine,
        public status: boolean,
        public date:string,
        public problems:string
        
    ){}
}