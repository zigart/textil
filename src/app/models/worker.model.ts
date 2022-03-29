export class worker{
    constructor(
        public name:string, 
        public activeDivider:boolean, 
        public activeReviewer:boolean, 
        public lastDivition:string, 
        public lastReview:string,
        public password:string
    ){}
}