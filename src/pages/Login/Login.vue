 <template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button  class="get_verification" :class="{right_phone_number:isRightPhone}"
                       @click.prevent="sendCode">
                {{computeTime>0 ? `已发送(${computeTime}s)`: '获取验证码' }}
                </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input :type="isHide? 'password' : 'text'" maxlength="8" placeholder="密码" v-model="pwd">
                <div class="switch_button" :class="isHide? 'off' :'on'"  @click="isHide=!isHide">
                  <div class="switch_circle" :class="{right:!isHide}"></div>
                  <span class="switch_text">{{isHide? '':'abc'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha"
                  @click="changeCaptcha" ref="captcha"
                >
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:;" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <AlertTip v-show="isShowAlert" :alertText="alertText" @closeTip="closeTip"/>
  </section>
</template>

<script>
  import {reqSendCode,reqSmsLogin,reqPwdLogin} from '../../api'
  import AlertTip from '../../components/AlertTip/AlertTip.vue'
  export default {
    data(){
      return{
        loginWay:true,//true:短信
        phone:'',
        computeTime:0,
        isHide:true,
        alertText:'',
        code:'',
        name:'',
        pwd:'',
        captcha:'',
        isShowAlert:false
      }
    },
    computed:{
      isRightPhone(){
        return /^1\d{10}$/.test(this.phone)
      }
    },
    methods:{
      async sendCode(){
        // 如果是正确的手机号并且没有计时, 才开始倒计时
        if(this.isRightPhone && this.computeTime===0){
          this.computeTime=30
          // 启动循环定时器
          const timer=setInterval(()=>{
            this.computeTime--
            if(this.computeTime<=0){
              // 清除定时器
              clearInterval(timer)
              this.computeTime=0
            }
          },1000)
          // 发送ajax请求发送验证码短信
          const result=await reqSendCode(this.phone)
          if(result.code===1){
            this.showTip(result.msg)
            this.computeTime=0
          }else{
            console.log('发送成功!!!');
          }
        }
      },
      closeTip(){
        this.isShowAlert=false
        this.alertText=''
      },
      showTip(text){
        this.isShowAlert=true
        this.alertText=text
      },
      async login(){
          let result
            const {phone,code,isRightPhone}=this
            if(this.loginWay){
              if(!isRightPhone){
                this.showTip('请输入正确手机号')
                return
              }else if(!/^\d{6}/.test(code)){
                this.showTip('请输入正确验证码')
                return
              }
              result= await reqSmsLogin({phone,code})
            }else{
              const {name,pwd,captcha}=this
              if(!name){
                this.showTip('请输入用户名')
                return
              }else if(!pwd){
                this.showTip('请输入密码')
                return
              }else if(!captcha){
                this.showTip('请输入验证码')
                return
              }

              result =await reqPwdLogin(name,pwd,captcha)
              if(result.code===1){
                this.changeCaptcha()
              }
            }
          if(result.code===1){
            this.showTip(result.msg)
          }else{
            const user=result.data
            this.$store.dispatch('saveUser',user)
            this.$router.replace('/profile')
          }
      },
      changeCaptcha(){
        this.$refs.captcha.src='http://localhost:4000/captcha?now='+Date.now()
      }

    },
    components:{
      AlertTip
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                outline none
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone_number
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
