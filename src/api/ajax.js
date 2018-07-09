import axios from 'axios'
const baseUrl=''
// const baseUrl = 'http://localhost:4000'
export default  function ajax(url,data={},type='GET') {
  return new Promise(function (reslove,reject) {
    let promise
    url=baseUrl+url
    if(type==='GET'){
      // 拼请求参数串
      // data: {username: tom, password: 123}
      // paramStr: username=tom&password=123
      let paramStr=''
      Object.keys(data).forEach(key=>{
        paramStr+=key+'='+data[key]+'&'
      })
      if(paramStr){
        paramStr='?'+paramStr.substring(0,paramStr.length-1)
      }
      promise=axios.get(url+paramStr)
    }else{
      promise=axios.post(url,data)
    }
    promise.then(response=>{
      reslove(response.data)
    }).catch(error=>{
      reject(error)
    })

  })
}
/*
const response = await ajax('/xxx')
const result = response.data
*/
/*
ajax('/xxx').then(result => {})
const result = await ajax('/xxx')
*/
