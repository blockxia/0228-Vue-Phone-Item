import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS, RECEIVE_GOODS, RECEIVE_INFO, RECEIVE_RATINGS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RESET_USER,
  DECERMENT_FOOD_COUNT,
  INCERMENT_FOOD_COUNT,
  CLEAR_CART
} from './mutation-types'
import {
  reqAddress,
  reqFoodTypes,
  reqShops,
  reqUser,
  reqLogout,
  reqShopGoods,
  reqShopRatings,
  reqShopInfo
} from  '../api'
export default {
//异步获取地址信息的异步action
  async getAddress({commit,state}){
    const {latitude,longitude}=state
    const geohash=`${latitude},${longitude}`
    //发送异步请求，得到相应数据
   const result=await reqAddress(geohash)
    if(result.code===0){
      // 提交mutation
      const address=result.data
      commit(RECEIVE_ADDRESS,{address})
    }
  },
  // 异步获取分类列表的异步action
  async getCategorys({commit}){
    const result=await reqFoodTypes()
    if(result.code===0){
      const categorys=result.data
      commit(RECEIVE_CATEGORYS,{categorys})
    }
  },


// 异步获取商家列表的异步action
  async getShops({commit,state}){
    const {latitude,longitude}=state
    const result=await reqShops({latitude,longitude})
    if(result.code===0){
      const shops=result.data
      commit(RECEIVE_SHOPS,{shops})
    }
  },
//同步保存user
  saveUser({commit},user){
    commit(RECEIVE_USER,{user})
  },
//自动登录实现，获取user_id,传给服务器session，保存cookies的maxAge时间
  async getUser({commit}){
    const result = await reqUser()
    if(result.code===0){
      const user=result.data
      commit(RECEIVE_USER,{user})
    }
  },
  //异步请求退出登陆
  async logout({commit}){
    const result=await reqLogout()
    if(result.code===0){
      commit(RESET_USER)
    }
  },
  // 异步获取商品列表
   async getShopGoods({commit},cb){
      const result=await reqShopGoods()
     if(result.code===0){
        const goods=result.data
        commit(RECEIVE_GOODS,{goods})
        cb && cb()
     }
   },

  // 异步获取评价列表
  async getShopRatings({commit},cb){
    const result=await reqShopRatings()
    if(result.code===0){
      const ratings=result.data
      commit(RECEIVE_RATINGS,{ratings})
      cb && cb()
    }
  },

  // 异步获取商家信息
  async getShopInfo({commit},cb){
    const result=await reqShopInfo()
    if(result.code===0){
      const info=result.data
      commit(RECEIVE_INFO,{info})
      cb && cb()
    }
  },
  // 同步更新指定food数量
  updateFoodCount({commit},{isAdd,food}){
    if(isAdd){
      commit(INCERMENT_FOOD_COUNT,{food})
    }else{
      commit(DECERMENT_FOOD_COUNT,{food})
    }
  },

  clearCart({commit}){
    commit(CLEAR_CART)
  }
}
