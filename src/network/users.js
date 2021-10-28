import {request} from "@/network/request";

// 查询用户列表
export function getUserlist(query, pagenum, pagesize){
    return request({
        method:'get',
        url:'/users',
        params:{
            query,
            pagenum,
            pagesize
        }
    })
}

// 改变用户状态
export function changeUserInfo(userInfo){
    return request({
        method:'put',
        url:'/users/'+ userInfo.id  +'/state/' + userInfo.mg_state
    })
}

// 添加用户
export function addUserInfo(userInfo){
    let {username,password,email,mobile} = userInfo
    return request({
        method:'post',
        url:'/users',
        data:{
            username,
            password,
            email,
            mobile
        }
    })
}