<template>
  <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      @close="addDialogClosed"
      width="50%">
    <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
      <!--   用户名    -->
      <el-form-item label="用户名" prop="username">
        <el-input v-model="addForm.username"></el-input>
      </el-form-item>
      <!--   密码     -->
      <el-form-item label="密码" prop="password">
        <el-input v-model="addForm.password"></el-input>
      </el-form-item>
      <!--    邮箱    -->
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addForm.email"></el-input>
      </el-form-item>
      <!--   手机号     -->
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="addForm.mobile"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="setUserDialogVisibleChange">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
import {addUserInfo} from "@/network/users";

export default {
  name: "AddDialog",
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
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加用户表单的验证规则对象
      addFormRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {validator: checkEmail, trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {validator: checkMobile, trigger: 'blur'}
        ]
      },
    }
  },
  mounted() {
    this.$Bus.$on('showAddDialog', () => {
      this.addDialogVisible = true
    })
  },
  methods: {
    //  监听添加用户对话框的事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 关闭对话框事件
    setUserDialogVisibleChange() {
      this.addDialogVisible = false
    },
    //  添加用户事件
    addUser() {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) return
        addUserInfo(this.addForm).then(res => {
          if (res.meta.status !== 201) {
            // 发布失败信息
            this.$message.error({
              message: res.meta.msg,
              showClose: true
            })
          } else {
            //  关闭用户对话框
            this.setUserDialogVisibleChange()
            //  刷新用户列表
            this.$emit('updateUserList')
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