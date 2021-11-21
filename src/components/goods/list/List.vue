<template>
  <div>
    <!--  面包屑导航区  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--  卡片视图区  -->
    <list-card-view :goodsList="goodslist"
                    @updateGoodsList="_getGoodsList">
      <!--  搜索输入框    -->
      <template v-slot:ipt>
        <el-input placeholder="请输入内容"
                  v-model="queryInfo.query"
                  clearable
                  @clear="_getGoodsList">
          <el-button slot="append" icon="el-icon-search" @click="_getGoodsList"></el-button>
        </el-input>
      </template>
      <!--  添加用户按钮    -->
      <template v-slot:addGoods>
        <el-button type="primary" @click="goAddPage">添加商品</el-button>
      </template>

      <!--   分页栏   -->
      <template v-slot:pagination>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[1, 2, 5, 7]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </template>

    </list-card-view>

<!--  修改商品信息Dialog  -->
    <edit-goods-dialog @updateGoodsList="_getGoodsList"/>
  </div>
</template>

<script>
import ListCardView from "@/components/goods/list/ListCardView";
import EditGoodsDialog from "@/components/goods/list/dialog/EditGoodsDialog";

import {getGoodsList} from "@/network/goods/list";

export default {
  name: "List",
  components:{
    ListCardView,
    EditGoodsDialog
  },
  data() {
    return {
      queryInfo: {
        query: '',
        // 当前页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 7
      },
      goodslist: [],
      total: 0,
    }
  },
  created() {
    this._getGoodsList()
  },
  methods: {
    /**
     * 获取商品列表数据
     * @private
     */
    _getGoodsList(){
      let {query, pagenum, pagesize} = this.queryInfo
      getGoodsList(query,pagenum,pagesize).then(res=>{
        if (res.meta.status !== 200) {
          return this.$message.error({
            message: res.meta.msg,
            showClose: true
          })
        }
        this.goodslist = res.data.goods
        this.total = res.data.total
      })
    },
    // 监听pagesize 改变的事件
    handleSizeChange(newsize) {
      this.queryInfo.pagesize = newsize
      this._getGoodsList()
    },
    //  监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.queryInfo.pagenum = newPage
      this._getGoodsList()
    },
    /**
     *
     */
    goAddPage() {
      this.$router.push('/goods/add')
    }
  },
}
</script>

<style scoped>

</style>