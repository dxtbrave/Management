<template>
  <div>
    <!--  面包屑导航区  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--  卡片视图区  -->
    <order-card-view :order-list="orderList">
      <template slot="ipt">
        <el-input placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
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
    </order-card-view>

    <!--  修改地址对话框  -->
    <edit-order-dialog/>
    <!--  物流展示对话框   -->
    <order-progress-dialog/>
  </div>
</template>

<script>
import {getOrderList} from "@/network/order";

import OrderCardView from "@/components/order/OrderCardView";
import EditOrderDialog from "@/components/order/dialog/EditOrderDialog";
import OrderProgressDialog from "@/components/order/dialog/OrderProgressDialog";

export default {
  name: "Order",
  components: {
    OrderCardView,
    EditOrderDialog,
    OrderProgressDialog
  },
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      // 总数据条数
      total: 0,
      // 订单列表
      orderList: []
    }
  },
  created() {
    this._getOrderList()
  },
  methods: {
    /**
     * 获取订单列表
     */
    _getOrderList() {
      let {query, pagenum, pagesize} = this.queryInfo
      getOrderList(query, pagenum, pagesize).then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error({
            message: res.meta.msg,
            showClose: true
          })
        }
        this.total = res.data.total
        this.orderList = res.data.goods
      })
    },
    // 监听pagesize 改变的事件
    handleSizeChange(newsize) {
      this.queryInfo.pagesize = newsize
      this._getOrderList()
    },
    //  监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.queryInfo.pagenum = newPage
      this._getOrderList()
    },
  }
}
</script>

<style scoped>

</style>