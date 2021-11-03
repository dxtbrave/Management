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