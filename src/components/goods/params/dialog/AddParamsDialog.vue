<template>
  <el-dialog
      :title="'添加' + titleText"
      :visible.sync="addParamsDialogVisible"
      @close="addParamsDialogClosed"
      width="50%">
    <el-form :model="addParamsForm" :rules="addParamsFormRules" ref="addParamsFormRef" label-width="100px">
      <!--   角色名称    -->
      <el-form-item :label="titleText" prop="attr_name">
        <el-input v-model="addParamsForm.attr_name"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="addParamsDialogVisibleChange">取 消</el-button>
    <el-button type="primary" @click="addParams">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
import {addParams} from "@/network/goods/params";

export default {
  name: "AddParamsDialog",
  data(){
    return{
      titleText:'',
      addParamsDialogVisible:false,
      addParamsForm:{
        attr_name:'',
      },
      addParamsFormRules:{
        attr_name:[
          {required: true, message: '请输入参数的名称', trigger: 'blur'},
        ]
      },
      cateId:0
    }
  },
  methods:{
    /**
     * 监听关闭事件
     */
    addParamsDialogClosed(){
      this.$refs.addParamsFormRef.resetFields()
    },
    // 关闭对话框事件
    addParamsDialogVisibleChange() {
      this.addParamsDialogVisible = false
    },
// 点击确定按钮，添加动态参数或者静态属性
    addParams() {
      this.$refs.addParamsFormRef.validate(valid => {
        if (!valid) return
        addParams(this.cateId, this.addParamsForm.attr_name, this.activeName ).then(res => {
          if (res.meta.status !== 201) {
            return this.$message.error({
              message: res.meta.msg,
              showClose: true
            })
          }
          // 返回成功的消息
          this.$message.success({
            message: '添加成功',
            showClose: true
          })
          //  刷新界面
          this.$Bus.$emit('updateParamsList')
          //  关闭对话框
          this.addParamsDialogVisibleChange()
        })
      })
    }
  },
  mounted() {
    this.$Bus.$on('showAddParamsDialog',(titleText,cateId)=>{
      this.cateId = cateId
      this.titleText = titleText
      this.addParamsDialogVisible = true
    })
  },
  computed:{
    activeName(){
      if (this.titleText === '动态参数'){
        return 'many'
      }
      return 'only'
    }
  }
}
</script>

<style scoped>

</style>