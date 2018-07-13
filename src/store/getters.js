export default {
// 购物车中所有food的数量
  totalCount(state){
    return state.cartFoods.reduce((preTotal,food)=>preTotal+food.count,0)
  },
  // 购物车中所有food的总价格
  totalPrice(state){
    return state.cartFoods.reduce((preTotal,food)=>preTotal+food.count*food.price,0)
  }
}
