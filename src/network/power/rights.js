import {request} from "@/network/request";

// 获取所有权限列表(list形式)
export function getRightsList(){
    return request({
        method:'get',
        url:`/rights/list`
    })
}

// 获取所有权限列表(tree形式)
export function getRightsTree(){
    return request({
        method:'get',
        url:'rights/tree'
    })
}

// 更新角色权限信息
export function updateRight(roleId,rights){
   return request({
       method:'post',
       url:`/roles/${roleId}/rights`,
       data:{
            rids:rights
       }
   })
}