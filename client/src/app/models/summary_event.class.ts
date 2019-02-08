export class SummaryEvent{
    stt : Number;
    content : String;
    total_collect : Number;
    total_spend : Number;
}

export class SummaryEventExported{
    _id : String;
    funds_group : number;
    total_collect : number;
    total_spend : number;
    event : String;
}