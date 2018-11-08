function request(){
   var service = axios.create({
        baseURL: 'https://plus.richbox.biz/api/', // api 的 base_url
        timeout: 5000 // request timeout
      })
      // request interceptor
service.interceptors.request.use(
    config => {
      // Do something before request is sent
      if(window.localStorage.getItem('userInfo')){
       var userInfo=JSON.parse(window.localStorage.getItem('userInfo'))
        config.headers['X-Token'] = userInfo.token
      }
      return config
    },
    error => {
      // Do something with request error
      console.log(error) // for debug
    }
  )
  
  // response interceptor
  service.interceptors.response.use(
   response => {
     return response.data
   },
    error => {
      console.log('err' + error) // for debug
    }
  )

  return service
  
}