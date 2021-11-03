<template>
  <div>
    <!--  面包屑导航区  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!--  卡片视图区  -->
    <cate-card-view>
      <!--  添加分类按钮区域    -->
      <template v-slot:addCate>
        <el-button type="primary" @click="">添加分类</el-button>
      </template>



      <!--   分页栏   -->
      <template v-slot:pagination>

      </template>

    </cate-card-view>
  </div>
</template>

<script>
import {getCategories} from "@/network/categories";

import CateCardView from "@/components/goods/categories/CateCardView";

export default {
  name: "Cate",
  data(){
    return{
      // 查询条件
      querInfo:{
        type:3,
        pagenum:1,
        pagesize:5
      },
    //  商品分类的数据列表，默认为空
      cateList:[],
    //  总数据条数
      total:0
    }
  },
  created() {
    this._getCategories()
  },
  components:{
    CateCardView,
  },
  methods:{

    /**
     * 获取商品分类数据
     * @private
     */
    _getCategories(){
      let {type,pagenum,pagesize} = this.querInfo
      getCategories(type,pagenum,pagesize).then(res=>{
        if (res.meta.status !== 200){
          return this.$message.error({
            message:res.meta.msg,
            showClose:true
          })
        }
        console.log(res.data)
        // 把数据列表，赋值给 cateList
        this.cateList = res.data.result
        // 为总数据条数赋值
        this.total = res.data.total
      })
    }
  }
}
</script>

<style scoped>

</style>