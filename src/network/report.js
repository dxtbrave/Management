import {request} from "@/network/request";

export function getReport(){
    return request({
        method:'get',
        url:`reports/type/1`
    })
}