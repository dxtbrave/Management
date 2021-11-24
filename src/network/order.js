import {request} from "@/network/request";

export function getOrderList(query, pagenum, pagesize) {
    return request({
        method: 'get',
        url: `/orders`,
        params: {
            query,
            pagenum,
            pagesize
        }
    })
}

export function getOrderProgress() {
    return request({
        method: 'get',
        url: `/kuaidi/1106975712662`
    })
}