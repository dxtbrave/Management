import {request} from "@/network/request";

export function getMenuList(){
    return request({
        method:'get',
        url:'/menus',
    })
}