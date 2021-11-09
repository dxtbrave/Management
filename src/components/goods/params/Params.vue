<template>
  <div>
    <!--  面包屑导航区  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--  卡片视图区  -->
    <ParamsCardView :cate-list="cateList"/>

    <!--  添加参数的对话框  -->
    <add-params-dialog/>

    <!--  修改角色对话框  -->
    <edit-params-dialog/>

  </div>
</template>

<script>
import ParamsCardView from "@/components/goods/params/ParamsCardView";
import AddParamsDialog from "@/components/goods/params/dialog/AddParamsDialog";
import EditParamsDialog from "@/components/goods/params/dialog/EditParamsDialog";

import {getCateList} from "@/network/goods/params";

export default {
name: "Params",
  data(){
    return{
      cateList:[]
     }
  },
  components:{
    ParamsCardView,
    AddParamsDialog,
    EditParamsDialog
  },
  created() {
  this._getCateList()
  },
  methods:{
    /**
     * 获取所有的商品分类列表
     * @private
     */
      _getCateList(){
        getCateList().then(res=>{
          if (res.meta.status !== 200){
            return this.$message.error({
              message:res.meta.msg,
              showClose:true
            })
          }
          this.cateList = res.data
        })
      }
  }
}
</script>

<style scoped>

</style>