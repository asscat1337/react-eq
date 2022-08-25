import axios from "axios";


const $http = axios.create({
  withCredentials:true,
  baseURL:process.env.REACT_APP_BASE_URL,
})

$http.interceptors.response.use((config)=>{
  return config
},async (error) => {
  const originalRequest = error.config

  if(error.response.status === 401 && error.config && !error.config._isRetry){
    originalRequest._isRetry = true
    try{
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/refresh`)
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