<template>
  <div>
    <!--  面包屑导航区  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--  卡片视图区  -->
    <rights-card-view :rights-list="rightsList"/>
  </div>
</template>

<script>
import {getRightsList} from "@/network/power/rights";

import RightsCardView from "@/components/power/rights/RightsCardView";

export default {
  name: "Rights",
  data(){
    return{
      rightsList:[]
    }
  },
  components: {
    RightsCardView,
  },
  created() {
  //  获取所有的权限列表
    this._getRightsList()
  },
  methods:{
    // 获取权限列表
    _getRightsList(){
      getRightsList().then(res=>{
        if (res.meta.status !== 200){
          this.$message.error({
            message:res.meta.msg,
            showClose:true
          })
        }else{
          this.rightsList = res.data
        }
      })

    }
  }
}
</script>

<style scoped>

</style>