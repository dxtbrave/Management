import {request} from "@/network/request";

export function getRolesList(){
    return request({
        method:'get',
        url:'/roles'
    })
}

// 删除指定角色的指定权限
export function deleteRoles(roleId,rightId){
    return request({
        method:'delete',
        url:`/roles/${roleId}/rights/${rightId}`
    })
}

// 添加角色
export function addRoleInfo(roleInfo){
    let {roleName,roleDesc} = roleInfo
    return request({
        method:'post',
        url:'/roles',
        data:{
            roleName,
            roleDesc
        }
    })
}

// 通过id查询角色信息
export function queryRoleInfo(id){
    return request({
        method:'get',
        url:`/roles/${id}`
    })
}

// 编辑角色信息
export function editRoleInfo(id,roleName,roleDesc){
    return request({
        method:'put',
        url:`/roles/${id}`,
        data:{
            roleName,
            roleDesc
        }
    })
}

// 删除角色信息
export function deleteRoleInfo(id){
    return request({
        method:'delete',
        url:`/roles/${id}`
    })
}