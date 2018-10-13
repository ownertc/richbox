/**
 * 获取已上架商品
 */
    function getFoodsList(params){
        return request()({
            url:"/FoodGoods/byShelf",
            method:"get",
            params
        })
    }
/**
 * 获取商品详情
 */
function getFoodsDetail(id){
    return request()({
        url:"/FoodGoods/"+id,
        method:"get"
     
    })
}
/**
 * 下单
 */
function pushOrder(data){
    return request()({
        url:"/FoodOrder/",
        method:"post",
        data

     
    })
}
/**
 * 订单详情查询
 */
function foodsOrderDetail(orderNumber){
    return request()({
        url:"/FoodOrder/byOrderNumber/"+orderNumber,
        method:"get"
    })
}
/**
 * 获取地址列表
 */
function addressList(params){
    return request()({
        url:"/FoodReceiver",
        method:"get",
        params
    })
}