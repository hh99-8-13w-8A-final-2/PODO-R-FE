import axios, { AxiosInstance } from 'axios';

//토큰 없는 경우 


  const URI = {
    baseURL : process.env.REACT_APP_BASE_URI 
  }

  export const baseApi = axios.create({
    baseURL : process.env.REACT_APP_BASE_URI 
  })

  const axiosApi = axios.create({
    baseURL: process.env.REACT_APP_BASE_URI,
    timeout: 3000,
  })
  


//리이슈 관련 인터셉터 설정
axiosApi.interceptors.request.use(
  async config => {
    
    const token = window.localStorage.getItem("accessToken")
    if(token){
      config.headers.Authorization = token
    }
    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
)
axiosApi.interceptors.response.use(
  response => {

    return response;
  },
   async (error) => {
    if(error.response?.status === 401){
      console.log(error.config)
      const refreshToken = window.localStorage.getItem("refreshToken")
      const reissue = {"Refresh-Token" : refreshToken}

      const res = await axios.post(`${URI.baseURL}/api/reissue`,{} ,{headers : reissue})
        .catch((err)=>{
          localStorage.clear();
          alert(err.response.data)
          window.location.replace("/")
        }) 
        localStorage.setItem("accessToken", res.headers.authorization);
        localStorage.setItem("refreshToken", res.headers[`refresh-token`]);
        
        return await axiosApi.request(error.config).catch((error) => {
          return Promise.reject(error);
        });
    }
    return Promise.reject(error)
  }
);

export default axiosApi;