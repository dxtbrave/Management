<template>
  <div style="height: 82vh">
    <el-scrollbar style="height: 100%">
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
              <el-button type="primary" icon="el-icon-edit" circle @click="showEditDialog(scope.row.id)"></el-button>
              <!--     删除按钮    -->
              <el-button type="danger" icon="el-icon-delete" circle @click="deleteUserById(scope.row.id)"></el-button>
              <!--     分配角色按钮     -->
              <el-tooltip effect="dark" content="分配角色" placement="top">
                <el-button type="warning" icon="el-icon-star-off" circle @click="setRole(scope.row)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <!--  分页区域  -->
        <slot name="pagination"></slot>
      </el-card>
    </el-scrollbar>
  </div>
</template>

<script>
import {changeUserInfo, deleteUserInfo} from "@/network/users";

export default {
  name: "UserCardView",
  props: {
    userlist: Array,
  },
  methods: {
    userStateChange(userInfo) {
      changeUserInfo(userInfo).then(res => {
        if (res.meta.status !== 200) {
          userInfo.mg_state = !userInfo.mg_state
          return this.$message.error({
            message: res.meta.msg,
            showClose: true
          })
        }
        this.$message.success({
          message: res.meta.msg,
          showClose: true
        })

      })
    },
    // 发送显示修改用户对话框
    showEditDialog(userid) {
      this.$Bus.$emit('showEditDialog', userid)
    },

    // 删除用户弹窗
    async deleteUserById(userid) {
      let result = await this.$confirm('此操作将永久删除该用户, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res => res).catch(err => err)

      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消删除，则返回值为字符串 cancel
      if (result !== 'confirm') {
        return this.$message.info({
          message: '已经取消删除',
          showClose: true
        })
      } else {
        deleteUserInfo(userid).then(res => {
          if (res.meta.status !== 200) {
            this.$message.error({
              message: res.meta.msg,
              showClose: true
            })
          } else {
            this.$message.success({
              message: res.meta.msg,
              showClose: true
            })
            // 发送刷新界面指令
            this.$emit('updateUserList')
          }
        })
      }
    },

    // 分配角色弹窗
    setRole(scopeRow) {
      this.$Bus.$emit('setRole', scopeRow)
    }
  }
}
</script>

<style scoped>

</style>