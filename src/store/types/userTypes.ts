type User = {
  login:string,
  user_id:number,
  terminal:string,
  expired:number,
  sendNotice:boolean
}
type Tokens = {
  refreshToken:string,
  accessToken:string
}

export interface IUser {
    user:User,
    loading:boolean,
    auth:boolean,
    tokens:Tokens
}