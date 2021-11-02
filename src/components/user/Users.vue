<template>
  <div>
    <!--  面包屑导航区  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--  卡片视图区  -->
    <cardview :userlist="userlist"
              :queryInfo="queryInfo"
              @updateUserList="_getUserList"
              :total="total">

      <!--  搜索输入框    -->
      <template v-slot:ipt>
        <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="_getUserList">
          <el-button slot="append" icon="el-icon-search" @click="_getUserList"></el-button>
        </el-input>
      </template>

      <!--  添加用户按钮    -->
      <template v-slot:addbtn>
        <el-button type="primary" @click="showAddRightDialog">添加用户</el-button>
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

    <!--  添加用户对话框  -->
    <add-dialog @updateUserList="_getUserList"/>

    <!--  修改用户对话框  -->
    <edit-dialog @updateUserList="_getUserList"/>
  </div>
</template>

<script>
import {getUserlist, addUserInfo} from "@/network/users";
import cardview from '@/components/user/UserCardView'
import EditDialog from "@/components/user/dialog/EditDialog";
import AddDialog from "@/components/user/dialog/AddDialog";

export default {
  name: "Users",
  data() {
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
    }
  },
  components: {
    cardview,
    EditDialog,
    AddDialog,
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
      this.queryInfo.pagesize = newsize
      this._getUserList()
    },
    //  监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.queryInfo.pagenum = newPage
      this._getUserList()
    },

    /**
     *  显示添加角色权限弹窗
     */
    showAddRightDialog() {
      this.$Bus.$emit('showAddDialog')
    },


  }
}
</script>

<style scoped>

</style>