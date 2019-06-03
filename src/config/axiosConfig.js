/**
 * Created by luwenwe on 2017/10/11.
 */
import axios from 'axios'
// import { store } from '../store'

class MyAxios {
  constructor () {
    return this.setAxios()
  }

  async setAxios () {
    axios.defaults.timeout = 60000 // 超时时间
    // http请求拦截器
    axios.interceptors.request.use(
      config => {
        // if (config.token !== false) {
        //   const token = store.getState().mockingbird.userInfo.token // 请求头添加token
        //   config.headers.Authorization = token
        // }
        return config
      },
      error => {
        return Promise.reject(error)
      },
    )
    // http响应拦截器
    axios.interceptors.response.use(
      res => {
        return res
      },
      error => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          window.location.href = '#/login'
          return Promise.reject(error)
        }
        if (!error.response) {
          error.response = { data: {message: '网络错误'} }
        } else if (error.response && error.response.status > 500) {
          error.response.data = {message: '网络错误'}
        }
        return Promise.reject(error)
      },
    )

    return axios
  }
}

new MyAxios()

export default axios
