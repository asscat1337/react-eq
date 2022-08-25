type TransferUser = {
  id:number,
  label:string,
}

export interface IDashboard{
  transferNumber:number,
  transferUser:TransferUser[],
  loading:boolean
}