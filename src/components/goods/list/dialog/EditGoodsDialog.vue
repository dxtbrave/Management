<template>
  <el-dialog
      title="修改角色"
      :visible.sync="editGoodsDialogVisible"
      @close="editRoleDialogClosed"
      width="50%">
    <el-form :model="editGoodsForm" :rules="editGoodsFormRules" ref="editGoodsFormRef" label-width="100px">
      <!--      -->
      <el-form-item label="商品名称" prop="goods_name">
        <el-input v-model="editGoodsForm.goods_name"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="goods_price">
        <el-input v-model="editGoodsForm.goods_price"></el-input>
      </el-form-item>
      <el-form-item label="商品数量" prop="goods_number">
        <el-input v-model="editGoodsForm.goods_number"></el-input>
      </el-form-item>
      <el-form-item label="商品重量" prop="goods_weight">
        <el-input v-model="editGoodsForm.goods_weight"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="editGoodsDialogVisibleChange">取 消</el-button>
    <el-button type="primary" @click="editGoodsInfo">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
import {queryGoodsInfoById,editGoodsInfo} from "@/network/goods/list";

export default {
  name: "EditGoodsDialog",
  data(){
    return{
      editGoodsDialogVisible:false,
      editGoodsForm:{
        id:'',
        goods_name:'',
        goods_price:'',
        goods_number:'',
        goods_weight:''
      },
      //  验证规则
      editGoodsFormRules: {
        goods_name: [
          {required: true, message: '请输入商品名称', trigger: 'blur'},
        ],
        goods_price: [
          {required: true, message: '请输入商品价格', trigger: 'blur'},
        ],
        goods_number: [
          {required: true, message: '请输入商品数量', trigger: 'blur'},
        ],
        goods_weight: [
          {required: true, message: '请输入商品重量', trigger: 'blur'},
        ],
      }
    }
  },
  methods:{
    //  监听修改对话框的关闭事件
    editRoleDialogClosed(){
      this.$refs.editGoodsFormRef.resetFields()
    },
    // 关闭对话框事件
    editGoodsDialogVisibleChange(){
      this.editGoodsDialogVisible = false
    },
    // 编辑信息事件
    editGoodsInfo(){
      this.$refs.editGoodsFormRef.validate(valid=>{
        if (!valid) return
        let { id,goods_name,goods_price,goods_number,goods_weight} = this.editGoodsForm
        editGoodsInfo(id,goods_name,goods_price,goods_number,goods_weight).then(res=>{
          if (res.meta.status !== 200) {
            // 错误提示
            this.$message.error({
              message: res.meta.msg,
              showClose: true
            })
          }else {
            //  关闭对话框
            this.editGoodsDialogVisibleChange()
            //  刷新用户列表
            this.$emit('updateGoodsList')
            //  提示成功信息
            this.$message.success({
              // message: res.meta.msg,
              message:'修改成功',
              showClose: true
            })
          }
        })
      })
    }
  },
  mounted() {
    this.$Bus.$on('showEditGoodsDialog',id=>{
      queryGoodsInfoById(id).then(res=>{
        if (res.meta.status !== 200) {
          return this.$message.error({
            message: res.meta.msg,
            showClose: true
          })
        } else {
          this.editGoodsForm.goods_name = res.data.goods_name
          this.editGoodsForm.goods_price = res.data.goods_price
          this.editGoodsForm.goods_number = res.data.goods_number
          this.editGoodsForm.goods_weight = res.data.goods_weight
          this.editGoodsForm.id = res.data.goods_id
        }
      })
      this.editGoodsDialogVisible = true
    })
  }
}
</script>

<style scoped>

</style>