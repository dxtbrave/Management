import axios from "axios";

export function request(config){
//    1.创建axios实例
    const instance = axios.create({
        // baseURL:'http://127.0.0.1:8888/api/private/v1/',
        baseURL:'http://139.9.131.107:8889/api/private/v1/',
        timeout:5000,
    })
//    2.axios的拦截器
//    请求拦截
    instance.interceptors.request.use(config=>{
    //    为请求头对象，添加Token验证的 Authorization 字段
        config.headers.Authorization = window.sessionStorage.getItem('token')
        // 在最后必须return config
        return config
    })
//    响应拦截
    instance.interceptors.response.use(res=>{
        return res.data
    },err=>{
        return err
    })
//    3.发送真正的网络请求
    return instance(config)
}