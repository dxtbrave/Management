// 数组深拷贝
export function arrCloneDeep(arr1){
    let arr2 = []
    for (let i = 0 ; i < arr1.length;i++){
        arr2.push(arr1[i])
    }
    return arr2
}
// 对象深拷贝
export function objCloneDeep(obj){
    return JSON.parse(JSON.stringify(obj))
}