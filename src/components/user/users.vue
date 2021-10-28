<template>
  <div>
    <!--  面包屑导航区  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--  卡片视图区  -->
    <cardview :userlist="userlist"
              :queryInfo="queryInfo"
              :total="total">

      <!--  搜索输入框    -->
      <template v-slot:ipt>
        <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="_getUserList">
          <el-button slot="append" icon="el-icon-search" @click="_getUserList"></el-button>
        </el-input>
      </template>

      <!--  添加用户按钮    -->
      <template v-slot:addbtn>
        <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
      </template>

      <!--   分页栏   -->
      <template v-slot:pagination>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[1, 2, 5, 10]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </template>

    </cardview>


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
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import {getUserlist, addUserInfo} from "@/network/users";
import cardview from '@/components/user/CardView'


export default {
  name: "users",
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
      queryInfo: {
        query: '',
        // 当前页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 10
      },
      userlist: [],
      total: 0,
      // 开关添加用户对话框
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        username: '123132',
        password: '123123',
        email: '154@qq.com',
        mobile: '18773226869'
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
      }
    }
  },
  components: {
    cardview,
  },
  created() {
    this._getUserList()

  },
  methods: {
    _getUserList() {
      let {query, pagenum, pagesize} = this.queryInfo
      getUserlist(query, pagenum, pagesize).then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error({
            message: '获取用户列表失败',
            showClose: true
          })
        }
        this.userlist = res.data.users
        this.total = res.data.total

      })
    },
    // 监听pagesize 改变的事件
    handleSizeChange(newsize) {
      // console.log(newsize)
      this.queryInfo.pagesize = newsize
      this._getUserList()
    },
    //  监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.queryInfo.pagenum = newPage
      this._getUserList()
    },
    //  监听添加用户对话框的事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 点击按钮，添加新用户
    addUser() {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) return
        // 如果验证通过，则发起添加用户的网络请求
        addUserInfo(this.addForm).then(res => {
          if (res.meta.status !== 201) {
            this.$message.error({
              message: res.meta.msg,
              showClose: true
            })
          } else {
            this.$message.success({
              message: res.meta.msg,
              showClose: true
            })
            // 隐藏用户对话框
            this.addDialogVisible = false
            //  重新获取用户列表
            this._getUserList()
          }
        })

      })
      this.addDialogVisible = false
    }
  }
}
</script>

<style scoped>

</style>