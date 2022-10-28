import axios from 'axios';
import {getToken} from '@/utils/setToken.js'
import { Message } from 'element-ui';

const service = axios.create({
    baseURL: '/api',
    timeout: 3000
})

//添加请求拦截器
service.interceptors.request.use((config)=>{
    //请求前获取并设置token
    config.headers['token'] = getToken('token')
    return config
}, (error) =>{
    return Promise.reject(error)
})

//添加响应拦截器
service.interceptors.response.use((response)=>{
   
    let {status,message} = response.data
    if(status !=200){
         Message({message: message || 'error', type: 'warning'})
    }
    return response
},(error) =>{
    return Promise.reject(error)
})

export default service

