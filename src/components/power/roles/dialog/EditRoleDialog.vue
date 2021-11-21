<template>
  <el-dialog
      title="修改角色"
      :visible.sync="editRoleDialogVisible"
      @close="editRoleDialogClosed"
      width="50%">
    <el-form :model="editRoleForm" :rules="editRoleFormRules" ref="editRoleFormRef" label-width="100px">
      <!--      -->
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="editRoleForm.roleName"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc">
        <el-input v-model="editRoleForm.roleDesc"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="editRoleDialogVisibleChange">取 消</el-button>
    <el-button type="primary" @click="editRoleInfo">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
import {queryRoleInfo, editRoleInfo} from "@/network/power/roles";

export default {
  name: "EditRoleDialog",
  data() {
    return {
      //  开关修改角色对话框
      editRoleDialogVisible: false,
      //  查询到的角色信息对象
      editRoleForm: {
        roleName: '',
        roleDesc: '',
      },
      //  验证规则
      editRoleFormRules: {
        roleName: [
          {required: true, message: '请输入角色名称', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
        ],
        roleDesc: [
          {required: true, message: '请输入角色描述', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
        ],
      }
    }
  },
  methods:{
    // 关闭对话框事件
    editRoleDialogVisibleChange() {
      this.editRoleDialogVisible = false
    },
    //  监听修改对话框的关闭事件
    editRoleDialogClosed() {
      this.$refs.editRoleFormRef.resetFields()
    },
    // 编辑信息事件
    editRoleInfo(){
      this.$refs.editRoleFormRef.validate(valid=>{
        if (!valid) return
        let {roleId,roleName,roleDesc} = this.editRoleForm
        editRoleInfo(roleId,roleName,roleDesc).then(res=>{
          if (res.meta.status !== 200) {
            // 错误提示
            this.$message.error({
              message: res.meta.msg,
              showClose: true
            })
          } else {
            //  关闭对话框
            this.editRoleDialogVisibleChange()
            //  刷新用户列表
            this.$emit('updateRoleList')
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
    // 接收事件总线中的事件
    this.$Bus.$on('showEditRoleDialog', id => {
      queryRoleInfo(id).then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error({
            message: res.meta.msg,
            showClose: true
          })
        } else {
          this.editRoleForm = res.data
        }
      })
      this.editRoleDialogVisible = true
    })
  }
}
</script>

<style scoped>

</style>