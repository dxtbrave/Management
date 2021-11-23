<template>
  <div style="height: 82vh">
    <el-scrollbar style="height: 100%">
      <el-card>
        <el-row>
          <!--   搜索区域   -->
          <el-col :span="8">
            <slot name="ipt"></slot>
          </el-col>
        </el-row>
        <!--  订单列表数据  -->
        <el-table :data="orderList" border stripe>
          <el-table-column align="center" type="index" label="#"></el-table-column>
          <el-table-column align="center" label="订单编号" prop="order_number"></el-table-column>
          <el-table-column align="center" label="订单价格" prop="order_price"></el-table-column>
          <el-table-column align="center" label="付款状态" prop="pay_status">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.pay_status === 1">已付款</el-tag>
              <el-tag type="danger" v-else>未付款</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="发货状态" prop="is_send">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.is_send === '是'">已发货</el-tag>
              <el-tag type="danger" v-else>未发货</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="下单时间" width="140px">
            <template slot-scope="scope">
              {{ scope.row.create_time | dateFormat }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="showBox"></el-button>
              <el-tooltip content="物流进度" placement="top">
              <el-button type="success" icon="el-icon-location" size="mini" @click="showProgressBox"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <!--  分页区域  -->
        <slot name="pagination"></slot>
      </el-card>
    </el-scrollbar>
  </div>

</template>

<script>
import {getOrderProgress} from "@/network/order";

export default {
  name: "OrderCardView",
  props:{
    orderList:Array
  },
  methods:{
    // 显示修改地址的对话框
    showBox(){
      this.$Bus.$emit('showEditOrderDialog')
    },
  //  显示物流展示对话框
    showProgressBox(){
      getOrderProgress().then(res=>{
          if (res.meta.status !== 200){
            return this.$message.error({
              message:res.meta.msg,
              showClose:true
            })
          }
        this.$Bus.$emit('showOrderProgressDialog',res.data)
      })

    }
  }
}
</script>

<style scoped>

</style>