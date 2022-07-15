export type Terminal = {
  name?:string,
  description?:string,
  isActive?:boolean,
  org_name?:string
}
export type Service = {
  service_id?:number,
  pointer?:number,
  start_time?:string,
  end_time?:string,
  letter?:string,
  serviceName?:string,
  status?:boolean,

}


export interface ITerminal {
  data:Terminal,
  loading:boolean
  services:Service[]
}