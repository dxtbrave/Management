import {request} from "@/network/request";

// 获取商品分类数据列表
export function getCateList(){
    return request({
        method:'get',
        url:`/categories`
    })
}

// 获取对应参数的列表
export function getParamsList(cateId,sel){
    return request({
        method:'get',
        url:`categories/${cateId}/attributes`,
        params:{
            sel
        }
    })
}

// 添加动态参数或者静态属性
export function addParams(cateId,attr_name,attr_sel){
    return request({
        method:'post',
        url:`/categories/${cateId}/attributes`,
        data:{
            attr_name,
            attr_sel
        }
    })
}

// 根据 ID 查询参数
export function queryParamsById(cat_id,attr_id,attr_sel){
    return request({
        method:'get',
        url:`/categories/${cat_id}/attributes/${attr_id},`,
        params:{
            attr_sel
        }
    })
}

// 编辑提交参数
export function editParams(cat_id,attr_id,attr_name,attr_sel,attr_vals){
    return request({
        method:'put',
        url:`/categories/${cat_id}/attributes/${attr_id}`,
        data:{
            attr_name,
            attr_sel,
            attr_vals
        }
    })
}

// 根据Id删除对应的参数
export function deleteParamsById(cat_id,attr_id){
    return request({
        method:'delete',
        url:`/categories/${cat_id}/attributes/${attr_id}`
    })
}