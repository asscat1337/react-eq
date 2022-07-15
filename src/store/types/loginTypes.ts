type Login = {
  user_id:number,
  login:string,
  terminal:string
}


export interface ILogin {
  data:Login[],
  loading:boolean,
  current:Login
}