export type Service = {
  service_id?:number,
  pointer?:number,
  start_time?:string,
  end_time?:string,
  letter?:string,
  serviceName?:string,
  status?:boolean,

}

export interface IService  {
  data:Service[],
  current:Service,
  loading:boolean,
  modalOpen:boolean
}

