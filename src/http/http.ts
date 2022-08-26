import axios from "axios";


const isDev = process.env.REACT_APP_NODE_ENV === "dev" ?
  process.env.REACT_APP_DEV_URL
  :
  process.env.REACT_APP_PROD_URL

const $http = axios.create({
  withCredentials:true,
  baseURL:isDev,
})

$http.interceptors.response.use((config)=>{
  return config
},async (error) => {
  const originalRequest = error.config

  if(error.response.status === 401 && error.config && !error.config._isRetry){
    originalRequest._isRetry = true
    try{
      const response = await axios.get(`${isDev}/user/refresh`)
      localStorage.setItem('token',response.data.tokens.accessToken)
      return $http.request(originalRequest)
    }catch (e){
      console.log(e)
    }
  }
})

export {
  $http
}