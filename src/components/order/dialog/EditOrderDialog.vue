<template>
  <el-dialog
      title="修改地址"
      :visible.sync="editOrderDialogVisible"
      @close="editOrderDialogClosed"
      width="50%">
    <el-form :model="editOrderForm" :rules="editOrderFormRules" ref="editOrderFormRef" label-width="100px">
      <el-form-item label="省市区/县" prop="address1">
        <el-cascader :options="citydata" v-model="editOrderForm.address1"></el-cascader>
      </el-form-item>
      <el-form-item label="详细地址" prop="address2">
        <el-input v-model="editOrderForm.address2"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="editOrderDialogVisibleChange">取 消</el-button>
    <el-button type="primary" @click="editOrderInfo">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
import citydata from "@/common/citydata";

export default {
  name: "EditOrderDialog",
  data() {
    return {
      editOrderDialogVisible: false,
      editOrderForm: {
        address1: [],
        address2: ''
      },
      editOrderFormRules: {
        address1: [
          {required: true, message: '请输入省市区县', trigger: 'blur'},
        ],
        address2: [
          {required: true, message: '请输入详细地址', trigger: 'blur'},
        ]
      },
      citydata,
    }
  },
  methods: {
    //  监听修改对话框的关闭事件
    editOrderDialogClosed() {
      this.$refs.editOrderFormRef.resetFields()
    },
    // 关闭对话框事件
    editOrderDialogVisibleChange() {
      this.editOrderDialogVisible = false
    },
    // 编辑信息事件
    editOrderInfo() {
      this.editOrderDialogVisibleChange()
    }
  },
  mounted() {
    this.$Bus.$on('showEditOrderDialog', id => {
      this.editOrderDialogVisible = true
    })
  }
}
</script>

<style scoped>
.el-cascader{
  width: 100%;
}
</style>