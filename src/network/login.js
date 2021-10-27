import {request} from "@/network/request";

export function getLogin(username,password){
    return request({
        method:'post',
        url:'/login',
        data:{
            username,
            password
        }
    })
}