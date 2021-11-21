import {request} from "@/network/request";

// 获取所有商品列表
export function getGoodsList(query, pagenum, pagesize){
    return request({
        method:'get',
        url:`/goods`,
        params:{
            query,
            pagenum,
            pagesize
        }
    })
}

// 删除商品信息
export function deleteGoodsInfo(goods_id){
    return request({
        method:'delete',
        url:`/goods/${goods_id}`
    })
}

// 添加商品信息
export function submitGoodsInfo(form){
    return request({
        method:'post',
        url:'/goods',
        data:form
    })
}

// 根据ID查询商品信息
export function queryGoodsInfoById(goods_id){
    return request({
        method:'get',
        url:`goods/${goods_id}`
    })
}
// 修改商品信息
export function editGoodsInfo(id,goods_name,goods_price,goods_number,goods_weight){
    return request({
        method:'put',
        url:`goods/${id}`,
        data:{
            goods_name,
            goods_price,
            goods_number,
            goods_weight
        }
    })
}