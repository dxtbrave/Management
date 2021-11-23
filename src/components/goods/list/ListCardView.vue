<template>
  <div style="height: 82vh">
    <el-scrollbar style="height: 100%">
      <el-card shadow="hover">
        <el-row :gutter="20">
          <el-col :span="8">
            <slot name="ipt"></slot>
          </el-col>
          <el-col :span="4">
            <slot name="addGoods"></slot>
          </el-col>
        </el-row>

        <!--  table表格区域  -->
        <el-table :data="goodsList" border stripe>
          <el-table-column align="center" label="#" type="index"></el-table-column>
          <el-table-column label="商品名称" prop="goods_name"></el-table-column>
          <el-table-column align="center" label="商品价格(元)" prop="goods_price" width="95px"></el-table-column>
          <el-table-column align="center" label="商品重量" prop="goods_number" width="70px"></el-table-column>
          <el-table-column align="center" label="创建时间" width="140px">
            <template slot-scope="scope">
              {{ scope.row.add_time | dateFormat }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="130px">
            <template slot-scope="scope">
              <!--     修改按钮     -->
              <el-button type="primary" icon="el-icon-edit" size="mini"
                         @click="editGoodsInfoById(scope.row.goods_id)"></el-button>
              <!--     删除按钮    -->
              <el-button type="danger" icon="el-icon-delete" size="mini"
                         @click="deleteGoodsInfoById(scope.row.goods_id)"></el-button>
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
import {deleteGoodsInfo} from "@/network/goods/list";

export default {
  name: "ListCardView",
  props: {
    goodsList: Array
  },
  methods: {
    /**
     * 删除商品信息
     * @param goods_id
     * @returns {Promise<ElMessageComponent>}
     */
    async deleteGoodsInfoById(goods_id) {
      let result = await this.$confirm('此操作将永久删除该商品, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res => res).catch(err => err)

      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消删除，则返回值为字符串 cancel
      if (result !== 'confirm') {
        return this.$message.info({
          message: '已经取消删除',
          showClose: true
        })
      } else {
        deleteGoodsInfo(goods_id).then(res => {
          if (res.meta.status !== 200) {
            this.$message.error({
              message: res.meta.msg,
              showClose: true
            })
          } else {
            this.$message.success({
              message: res.meta.msg,
              showClose: true
            })
            // 发送刷新界面指令
            this.$emit('updateGoodsList')
          }
        })
      }
    },
    /**
     * 修改商品信息
     */
    editGoodsInfoById(goods_id) {
      this.$Bus.$emit('showEditGoodsDialog', goods_id)
    }
  }
}
</script>

<style scoped>

</style>