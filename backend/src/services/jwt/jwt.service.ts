import * as jsonwebtoken from "jsonwebtoken";

interface JWTPayload {
  exp: any;
  user_id:string;
  rememberMe:boolean
}

const isRememberMe=(isRemember:boolean)=>{
  return  isRemember ? "365 days" : "30 days"
}

const verifyRefreshToken = (token: string):JWTPayload => {
  const verifyRefresh = jsonwebtoken.verify(token, process.env.REFRESH_TOKEN as string) as JWTPayload;
  return verifyRefresh;
};
const verifyAccessToken = (token: string):JWTPayload => {

  const verifyAccess = jsonwebtoken.verify(token, process.env.ACCESS_TOKEN as string) as JWTPayload;

  return verifyAccess;
};

const generateTokens=(payload:any)=>{
  const {rememberMe} = payload
  const refreshToken = jsonwebtoken.sign(payload,process.env.REFRESH_TOKEN as string,{
    expiresIn:isRememberMe(rememberMe)
  })
  const accessToken = jsonwebtoken.sign(payload,process.env.ACCESS_TOKEN as string,{
    expiresIn:"1hour"
  })
  return {
    refreshToken,
    accessToken
  }
}

export {
  verifyAccessToken,
  verifyRefreshToken,
  generateTokens,
};