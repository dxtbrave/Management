<template>
  <el-container class="home-container">
    <!--  头部区域  -->
    <el-header>
      <div>
        <img src="~@/assets/img/songhongbao.png" alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="primary" round @click="logout">退出</el-button>
    </el-header>
    <!--  页面主题区域  -->
    <el-container>
      <!--  侧边栏  -->
      <el-aside :width="Collapsed ? '64px' : '200px' " >

        <aside-area ref="aside"
                    :menulist="menulist"
                    @collapsedChange="collapsedChange"/>
      </el-aside>
      <!--  右侧内容主题  -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {getMenuList} from "@/network/home";

import asideArea from "@/components/home/asideArea";

export default {
  name: "home",
  data(){
    return{
      menulist:[],
      Collapsed:false
    }
  },
  components:{
    asideArea,
  },
  created() {

    getMenuList().then(res=>{
      if (res.meta.status !== 200){
        return this.$message.error({
          message:res.meta.msg,
          showClose:true
        })
      }else{
        this.menulist = res.data
      }
    })
  },
  mounted() {

  },
  computed:{

  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/Login')
      this.$message.success({
        message:'退出登录',
        showClose:true
      })
    },
    collapsedChange(res){
      this.Collapsed = res
    }
  }
}
</script>

<style scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;

}

.el-header div {
  display: flex;
  align-items: center;
}

.el-header div span {
  margin-left: 15px;
}

.el-header img {
  height: 60px;
}

.el-aside {
  background-color: #333744;
}

.el-main {
  background-color: #eaedf1;
}
</style>