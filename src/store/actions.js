import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from './mutation-types'
import {
  reqAddress,
  reqFoodTypes,
  reqShops
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
  }
}
