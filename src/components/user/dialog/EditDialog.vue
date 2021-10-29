<template>
  <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      @close="editDialogClosed"
      width="50%">
    <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="editForm.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="editForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="editForm.mobile"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisibleChange">取 消</el-button>
    <el-button type="primary" @click="editUserInfo">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
import {queryUserInfo, editUserInfo} from "@/network/users";

export default {
  name: "EditDialog",
  data() {

    // 验证邮箱的规则
    let checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则
      const regEmail = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb()
      }
      cb(new Error('请输入正确的邮箱'))
    }

    // 验证手机号的规则
    let checkMobile = (rule, value, cb) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('请输入正确的手机号'))
    }

    return {
      //  开关修改用户对话框
      editDialogVisible: false,
      //  查询到的用户信息对象
      editForm: {},
      //  验证规则
      editFormRules: {
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {validator: checkEmail, trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {validator: checkMobile, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 发送关闭对话框事件
    editDialogVisibleChange() {
      this.editDialogVisible = false
    },
    //  监听修改对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    //  修改用户信息并提交
    editUserInfo() {
      this.$refs.editFormRef.validate(valid => {
        if (!valid) return;
        let {id, email, mobile} = this.editForm
        editUserInfo(id, email, mobile).then(res => {
          if (res.meta.status === 200) {
            //  关闭对话框
            this.editDialogVisibleChange()
            //  刷新用户列表
            this.$emit('updateUserList')
            //  提示成功信息
            this.$message.success({
              message: res.meta.msg,
              showClose: true
            })
          } else {
            // 错误提示
            this.$message.error({
              message: res.meta.msg,
              showClose: true
            })
          }
        })

      })
    }
  },
  mounted() {
    // 接收事件总线中的事件
    this.$Bus.$on('showEditDialog', id => {
      queryUserInfo(id).then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error({
            message: res.meta.msg,
            showClose: true
          })
        } else {
          this.editForm = res.data
        }
      })
      this.editDialogVisible = true
    })
  }
}
</script>

<style scoped>

</style>