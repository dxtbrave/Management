<template>
  <div>
    <!--  面包屑导航区  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--  卡片视图区  -->
    <RolesCardView :rolelist="rolelist" @updateRoleList="_getRolesList">
      <!--  添加角色按钮区域    -->
      <template v-slot:addUser>
        <el-button type="primary" @click="addRoleDialogVisible = true">添加角色</el-button>
      </template>
    </RolesCardView>

    <!--  添加角色对话框  -->
    <add-role-dialog :addRoleDialogVisible="addRoleDialogVisible"
                     @addRoleDialogVisibleChange="addDialogVisibleChange"/>

    <!--  修改角色对话框  -->
    <edit-role-dialog @updateRoleList="_getRolesList"/>

<!--  分配权限对话框  -->
    <set-right-dialog @updateRoleList="_getRolesList"/>

  </div>
</template>

<script>
import RolesCardView from "@/components/power/roles/RolesCardView";
import AddRoleDialog from "@/components/power/roles/dialog/AddRoleDialog";
import EditRoleDialog from "@/components/power/roles/dialog/EditRoleDialog";
import SetRightDialog from "@/components/power/roles/dialog/SetRightDialog";

import {getRolesList} from "@/network/power/roles";

export default {
  name: "Roles",
  data() {
    return {
      //  所有角色列表数据
      rolelist: [],
      // 开关添加角色对话框
      addRoleDialogVisible: false,
    }
  },
  created() {
    this._getRolesList()
  },
  mounted() {
  },
  components: {
    EditRoleDialog,
    RolesCardView,
    AddRoleDialog,
    SetRightDialog
  },
  methods: {
    _getRolesList() {
      getRolesList().then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error({
            message: res.meta.msg,
            showClose: true
          })
        }
        this.rolelist = res.data
      })
    },


    /**
     * 关闭用户对话框
     */

    addDialogVisibleChange(value){
      this.addRoleDialogVisible = false
      if (value){
        this._getRolesList()
      }
    },
  }
}
</script>

<style scoped>

</style>