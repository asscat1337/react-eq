export interface IService{
    letter:string,
    serviceName:string,
    pointer:number,
    status:boolean,
    start_time:string,
    end_time:string
}
export interface IServiceUser {
    user_id:number,
    service_id:number
}
