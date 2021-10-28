<template>
  <div class="login_container">
    <div class="login_box">
      <!--   头像区域   -->
      <div class="avatar_box">
        <img src="@/assets/logo.png" alt="">
      </div>
      <!--   表单输入区域   -->
      <el-form :model="ruleForm"
               :rules="rules"
               ref="loginFormRef"
               label-width="70px"
               :hide-required-asterisk="true"
               class="login-form">
        <!--     用户名     -->
        <el-form-item label="用户名" prop="name">
            <el-input prefix-icon="iconfont icon-user" v-model="ruleForm.name"></el-input>
          </el-form-item>
        <!--     密码     -->
        <el-form-item label="密码" prop="psw">
          <el-input prefix-icon="iconfont icon-wendang" v-model="ruleForm.psw" type="password" show-password></el-input>
        </el-form-item>
        <!--     按钮区域     -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="primary" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {getLogin} from "@/network/login";

export default {
  name: "login",
  data(){
    return{
      show:true,
      ruleForm:{
        name:'admin',
        psw:'123456',
      },
      rules:{
        name:[
          {required:true,message:'请输入用户名',trigger:'blur'},
        ],
        psw:[
          {required:true,message:'请输入密码',trigger:'blur'},
        ]
      }
    }
  },
  methods:{
    // 点击重置按钮，重置登录表单
    resetLoginForm(){
      this.$message.success({
        message:'用户名、密码已清空',
        showClose:true
      })
      this.$refs.loginFormRef.resetFields()
    },
    // 点击登录按钮
    login(){
      this.$refs.loginFormRef.validate(async (valid)=>{
        if (!valid){
          return
        }
        getLogin(this.ruleForm.name,this.ruleForm.psw).then(res=>{
          if (res.meta.status == 200){
            // 登录成功时提示
            this.$message.success({
              message:res.meta.msg,
              showClose:true
            })
            this.LoginSuccess(res.data.token)
          }else{
            // 登录错误时弹窗提示
            this.$message.error({
              message:res.meta.msg,
              showClose:true
            })
          }
        })
      })
    },
    LoginSuccess(token){
      /**
       * 1. 将登录成功之后的token，保存到客户端的sessionStorage中
       *    1.1 项目中除了登录之外的其他API接口，必须在登陆之后才能访问
       *    1.2 token 只应在当前网站打开期间生效，所以将token保存在sessionStorage
       * 2. 通过编程式导航跳转到后台主页，路由地址是 /Home
       */
      window.sessionStorage.setItem('token',token)
      this.$router.push('/Home')
    }
  }
}
</script>

<style lang="less" scoped>
  .login_container{
    background-color: #2b4b6b;
    height: 100%;
  }
  .login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .avatar_box{
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background-color: #fff;
    img{
      width: 100%;
      height: 100%;
      background-color: #eee;
      border-radius: 50%;
    }
  }

  .login-form{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-55%,-30%);
    width: 85%;
    //padding: 0 10px;
  }

  .btns{
    display: flex;
    justify-content: right;
  }
</style>