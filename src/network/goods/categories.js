import {request} from "@/network/request";

// 获取商品分分类数据列表
export function getCategories(type,pagenum,pagesize){
    return request({
        method:'get',
        url:'/categories',
        params:{
            type,
            pagenum,
            pagesize
        }
    })
}

// 添加分类
export function addCategories(cat_pid,cat_name,cat_level){
    return request({
        method:'post',
        url:`/categories`,
        data:{
            cat_pid,
            cat_name,
            cat_level
        }
    })
}

// 通过id查询分类信息
export function queryCateInfo(id){
    return request({
        method:'get',
        url:`/categories/${id}`
    })
}

// 编辑分类信息
export function editCateInfo(cat_pid,cat_name){
    return request({
        method:'put',
        url:`/categories/${cat_pid}`,
        data:{
            cat_name,
        }
    })
}

// 删除分类信息
export function deleteCateInfo(id){
    return request({
        method:'delete',
        url:`/categories/${id}`
    })
}