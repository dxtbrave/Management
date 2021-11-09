<template>
  <div>
    <!--  面包屑导航区  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!--  卡片视图区  -->
    <cate-card-view :cateList="cateList" @updateCateList="_getCategories">
      <!--  添加分类按钮区域    -->
      <template v-slot:addCate>
        <el-button type="primary" @click="showAddRightDialog">添加分类</el-button>
      </template>


      <!--   分页栏   -->
      <template v-slot:pagination>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[1, 2, 5, 10]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </template>

    </cate-card-view>

    <!--  添加分类对话框  -->
    <add-cate-dialog :parentCateList="parentCateList"
                      @updateCateList="_getCategories"/>

    <!--  修改分类对话框  -->
    <edit-cate-dialog @updateCateList="_getCategories"/>
  </div>
</template>

<script>
import {getCategories} from "@/network/goods/categories";

import CateCardView from "@/components/goods/categories/CateCardView";
import AddCateDialog from "@/components/goods/categories/dialog/AddCateDialog";
import EditCateDialog from "@/components/goods/categories/dialog/EditCateDialog";

export default {
  name: "Cate",
  data() {
    return {
      // 查询条件
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      //  商品分类的数据列表，默认为空
      cateList: [],
      //  总数据条数
      total: 0,
    // 父级分类的列表
      parentCateList:[]
    }
  },
  created() {
    this._getCategories()
  },
  components: {
    CateCardView,
    AddCateDialog,
    EditCateDialog,
  },
  methods: {

    /**
     * 获取商品分类数据
     * @private
     */
    _getCategories() {
      let {type, pagenum, pagesize} = this.queryInfo
      getCategories(type, pagenum, pagesize).then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error({
            message: res.meta.msg,
            showClose: true
          })
        }
        // 把数据列表，赋值给 cateList
        this.cateList = res.data.result
        // 为总数据条数赋值
        this.total = res.data.total
      })
    },

    /**
     * 监听pagesize 改变的事件
     * @param newsize
     */

    handleSizeChange(newsize) {
      this.queryInfo.pagesize = newsize
      this._getCategories()
    },

    /**
     * 监听 页码值 改变的事件
     * @param newPage
     */
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this._getCategories()
    },


    /**
     *  显示添加分类弹窗
     */
    showAddRightDialog() {
      this.getParentCateList()
      this.$Bus.$emit('showAddCateDialog')
    },

    /**
     * 获取父级分类的数据列表
     */
    getParentCateList(){
      getCategories(2).then(res=>{
        if (res.meta.status !== 200){
          return this.$message.error({
            message:res.meta.msg,
            showClose:true
          })
        }
        this.parentCateList = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>