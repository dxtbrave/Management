<template>
  <el-dialog
      :title="'修改' + titleText"
      :visible.sync="editParamsDialogVisible"
      @close="editParamsDialogClosed"
      width="50%">
    <el-form :model="editParamsForm" :rules="editParamsFormRules" ref="editParamsFormRef" label-width="100px">
      <!--      -->
      <el-form-item :label="titleText" prop="attr_name">
        <el-input v-model="editParamsForm.attr_name"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="editParamsDialogVisibleChange">取 消</el-button>
    <el-button type="primary" @click="editParamsInfo">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
import {queryParamsById,editParams} from "@/network/goods/params";

export default {
  name: "EditParamsDialog",
  data(){
    return{
      // 开关修改参数对话框
      editParamsDialogVisible: false,
      // 查询到的角色信息对象
      editParamsForm: {
        attr_name:''
      },
      //   验证规则
      editParamsFormRules: {
        attr_name: [
          {required: true, message: '请输入要修改的信息', trigger: 'blur'},
        ]
      },
      titleText:'',
      rowList :{}
    }
  },
  mounted() {
    this.$Bus.$on('showEditParamsDialog',(titleText,row)=>{
      this.editParamsDialogVisible =  true
      this.titleText = titleText
      this.editParamsForm.attr_name = row.attr_name
      this.rowList = row
    })
  },
  methods:{
    // 关闭对话框事件
    editParamsDialogVisibleChange(){
      this.editParamsDialogVisible = false
    },
    //  监听修改对话框的关闭事件
    editParamsDialogClosed() {
      this.editParamsForm.attr_name = ''
      this.$refs.editParamsFormRef.resetFields()
    },
    // 根据id查询信息
    _queryParamsById(){
      let {cat_id,attr_id,attr_sel}  = this.rowList
      queryParamsById(cat_id,attr_id,attr_sel).then(res=>{
        console.log(res)
      })
    },
    //  提交成功按钮，修改参数名称
    editParamsInfo(){
      this.$refs.editParamsFormRef.validate(valid=>{
        if (!valid)return
        let {cat_id,attr_id,attr_sel} = this.rowList
        let attr_name = this.editParamsForm.attr_name
        let attr_vals = this.rowList.attr_vals.join(' ')
        console.log(attr_vals)
        editParams(cat_id,attr_id,attr_name,attr_sel,attr_vals).then(res=>{
          if (res.meta.status !== 200) {
            // 错误提示
            this.$message.error({
              message: res.meta.msg,
              showClose: true
            })
          } else {
            //  关闭对话框
            this.editParamsDialogVisibleChange()
            //  刷新用户列表
            this.$Bus.$emit('updateParamsList')
            //  提示成功信息
            this.$message.success({
              message: res.meta.msg,
              // message:'修改成功',
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