<template>
  <el-dialog
      title="添加角色"
      :visible.sync="addRoleDialogVisible"
      @close="addRoleDialogClosed"
      width="50%">
    <el-form :model="addRoleForm" :rules="addRoleFormRules" ref="addRoleFormRef" label-width="100px">
      <!--   角色名称    -->
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="addRoleForm.roleName"></el-input>
      </el-form-item>
      <!--   角色描述     -->
      <el-form-item label="角色描述" prop="roleDesc">
        <el-input v-model="addRoleForm.roleDesc"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="setRoleDialogVisibleChange">取 消</el-button>
    <el-button type="primary" @click="addRole">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
import {addRoleInfo} from "@/network/power/roles";

export default {
  name: "AddRoleDialog",
  data() {
    return {
      addRoleDialogVisible: false,
      // 添加角色的表单数据
      addRoleForm: {
        roleName: '',
        roleDesc: '',
      },
      // 添加角色表单的验证规则对象
      addRoleFormRules: {
        roleName: [
          {required: true, message: '请输入角色名称', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
        ],
        roleDesc: [
          {required: true, message: '请输入角色描述', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
        ],
      },
    }
  },
  mounted() {
    this.$Bus.$on('showAddRoleDialog', () => {
      this.addRoleDialogVisible = true
    })
  },
  methods: {
    //  监听添加用户对话框的事件
    addRoleDialogClosed() {
      this.$refs.addRoleFormRef.resetFields()
    },
    // 关闭对话框事件
    setRoleDialogVisibleChange() {
      this.addRoleDialogVisible = false
    },
    addRole() {
      this.$refs.addRoleFormRef.validate(valid => {
        if (!valid) return
        addRoleInfo(this.addRoleForm).then(res => {
          if (res.meta.status !== 201) {
            // 发布失败信息
            return this.$message.error({
              message: res.meta.msg,
              showClose: true
            })
          } else {
            //  关闭用户对话框
            this.setRoleDialogVisibleChange()
            //  刷新用户列表
            this.$emit('updateRoleList')
            // 发布成功信息
            this.$message.success({
              message: res.meta.msg,
              showClose: true
            })
          }
        })
      })
    }
  },
}
</script>

<style scoped>

</style>