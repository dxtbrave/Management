<template>
  <el-dialog
      title="修改角色"
      :visible.sync="editCateDialogVisible"
      @close="editCateDialogClosed"
      width="50%">
    <el-form :model="editCateForm" :rules="editCateFormRules" ref="editCateFormRef" label-width="100px">
      <!--      -->
      <el-form-item label="分类名称" prop="cat_name">
        <el-input v-model="editCateForm.cat_name"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="editCateDialogVisibleChange">取 消</el-button>
    <el-button type="primary" @click="editCateInfo">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
import {queryCateInfo,editCateInfo} from "@/network/categories";

export default {
  name: "EditCateDialog",
  data() {
    return {
      // 开关修改分类对话框
      editCateDialogVisible: false,
      // 查询到的角色信息对象
      editCateForm: {
        cat_name: '',
        cat_id:0
      },
      //   验证规则
      editCateFormRules: {
        cat_name: [
          {required: true, message: '请输入要修改的分类名称', trigger: 'blur'},
        ]
      }
    }
  },
  mounted() {
    this.$Bus.$on('showEditCateDialog',id=>{
      queryCateInfo(id).then(res=>{
        if (res.meta.status !== 200){
          return this.$message.error({
            message: res.meta.msg,
            showClose: true
          })
        }else{
          this.editCateForm = res.data
        }
      })
      this.editCateDialogVisible = true
    })
  },
  methods:{
    // 关闭对话框事件
    editCateDialogVisibleChange(){
      this.editCateDialogVisible = false
    },
    //  监听修改对话框的关闭事件
    editCateDialogClosed() {
      this.$refs.editCateFormRef.resetFields()
    },
  //  提交成功按钮，修改分类名称
    editCateInfo(){
      this.$refs.editCateFormRef.validate(valid=>{
        if (!valid) return
        let {cat_id,cat_name} = this.editCateForm
        editCateInfo(cat_id,cat_name).then(res=>{
          if (res.meta.status !== 200) {
            // 错误提示
            this.$message.error({
              message: res.meta.msg,
              showClose: true
            })
          } else {
            //  关闭对话框
            this.editCateDialogVisibleChange()
            //  刷新用户列表
            this.$emit('updateCateList')
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
  }
}
</script>

<style scoped>

</style>