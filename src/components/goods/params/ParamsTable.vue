<template>
  <el-table :data="TableList" border stripe>
<!--  展开行  -->
    <el-table-column type="expand"></el-table-column>
<!--   索引列   -->
    <el-table-column label="#" type="index"></el-table-column>
    <el-table-column label="参数名称" prop="attr_name"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <!--    编辑按钮      -->
        <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditParamsDialog(scope.row)">编辑</el-button>
        <!--    删除按钮      -->
        <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeParams(scope.row.attr_id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {deleteParamsById} from "@/network/goods/params";

export default {
  name: "ParamsTable",
  props:{
    TableList:Array,
    cateId:Number,
    titleText:String
  },
  mounted() {

  },
  methods:{
    showEditParamsDialog(value){
      console.log(this.cateId)
      console.log(this.titleText)
      this.$Bus.$emit('showEditParamsDialog',this.titleText,value)
    },

    /**
     * 删除参数
     */
    async removeParams(attr_id){
      let result = await this.$confirm('此操作将永久删除该参数, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res => res).catch(err => err)
      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消删除，则返回值为字符串 cancel
      // 删除功能的业务逻辑
      if (result !== 'confirm') {
        return this.$message.info({
          message: '已经取消删除',
          showClose: true
        })
      }else {
        deleteParamsById(this.cateId,attr_id).then(res=>{
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
            this._getParamsList()
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>