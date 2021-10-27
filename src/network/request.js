import axios from "axios";

export function request(config){
//    1.创建axios实例
    const instance = axios.create({
        baseURL:'http://127.0.0.1:8888/api/private/v1/',
        timeout:5000,
    })
//    2.axios的拦截器
//    响应拦截
    instance.interceptors.response.use(res=>{
        return res.data
    },err=>{
        return err
    })
//    3.发送真正的网络请求
    return instance(config)
}