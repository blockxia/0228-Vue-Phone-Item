import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  DECERMENT_FOOD_COUNT,
  INCERMENT_FOOD_COUNT,
  CLEAR_CART
}from './mutation-types'
import Vue from 'vue'

export default {
  [RECEIVE_ADDRESS](state,{address}){
    state.address=address
  },
  [RECEIVE_CATEGORYS](state,{categorys}){
    state.categorys=categorys
  },
  [RECEIVE_SHOPS](state,{shops}){
    state.shops=shops
  },
  [RECEIVE_USER](state,{user}){
    state.user=user
  },
  [RESET_USER](state){
    state.user={}
  },

  [RECEIVE_INFO](state,{info}){
    state.info=info
  },
  [RECEIVE_RATINGS](state,{ratings}){
    state.ratings=ratings
  },
  [RECEIVE_GOODS](state,{goods}){
    state.goods=goods
  },
  [INCERMENT_FOOD_COUNT](state,{food}){
    if(!food.count){// 第一次点+
      //给food添加一个新的属性(没有数据绑定)
      Vue.set(food,'count',1)// 增加set方法，新添加的属性就有数据绑定
      state.cartFoods.push(food)
    }else{
      food.count++
    }
  },
  [DECERMENT_FOOD_COUNT](state,{food}){
    if(food.count){
      food.count--
      if(food.count===0){
        state.cartFoods.splice(state.cartFoods.indexOf(food),1)
      }
    }
  },
  [CLEAR_CART](state){
    // 所有food的count置为0
    state.cartFoods.forEach(food=>food.count=0)
    // 重置购物车food数组
    state.cartFoods=[]
  }

}
