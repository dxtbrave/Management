<template>
  <el-card class="box-card" shadow="hover">

    <el-row :gutter="20">
      <!-- 搜索与添加区域 -->
      <el-col :span="8">
        <slot name="ipt"></slot>
      </el-col>
      <el-col :span="4">
        <slot name="addbtn"></slot>
      </el-col>
    </el-row>
    <!--  用户列表区域  -->
    <!--        <slot name="userlist"></slot>-->
    <el-table :data="userlist" border stripe>
      <el-table-column align="center" label="#" type="index"></el-table-column>
      <el-table-column align="center" label="姓名" prop="username"></el-table-column>
      <el-table-column align="center" label="邮箱" prop="email"></el-table-column>
      <el-table-column align="center" label="电话" prop="mobile"></el-table-column>
      <el-table-column align="center" label="角色" prop="role_name"></el-table-column>
      <el-table-column align="center" label="状态">
        <!--   通过template 的scope.row来获取一行的所有数据     -->
        <template slot-scope="scope">
          <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChange(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="180px">
        <template slot-scope="scope">
          <!--     修改按钮     -->
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <!--     删除按钮    -->
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
          <!--     分配角色按钮     -->
          <el-tooltip effect="dark" content="分配角色" placement="top">
            <el-button type="warning" icon="el-icon-star-off" circle></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
<!--  分页区域  -->
      <slot name="pagination"></slot>
  </el-card>
</template>

<script>
import {changeUserInfo} from "@/network/users";

export default {
  name: "CardView",
  props: {
    userlist: Array,
  },
  methods:{
    userStateChange(userInfo){
      changeUserInfo(userInfo).then(res=>{
        if (res.meta.status !== 200){
          userInfo.mg_state = !userInfo.mg_state
          return this.$message.error({
            message:res.meta.msg,
            showClose:true
          })
        }
        this.$message.success({
          message:res.meta.msg,
          showClose:true
        })

      })
    },
  }
}
</script>

<style scoped>

</style>