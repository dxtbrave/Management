<template>
  <el-card shadow="hover">
    <el-row>
      <!--  添加角色按钮区域    -->
      <el-col>
        <slot name="addUser"></slot>
      </el-col>
    </el-row>
    <!--  角色列表区域  -->
    <el-table :data="rolelist" border stripe>
      <!--  展开列    -->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <roles-extend-view :scoperow="scope.row"/>
        </template>
      </el-table-column>
      <!--  索引列  -->
      <el-table-column align="center" label="#" type="index"></el-table-column>
      <el-table-column align="center" label="角色名称" prop="roleName"></el-table-column>
      <el-table-column align="center" label="角色描述" prop="roleDesc"></el-table-column>
      <el-table-column align="center" label="操作" width="300px">
        <template slot-scope="scope">
          <!--    编辑按钮      -->
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditRoleDialog(scope.row.id)">编辑
          </el-button>
          <!--    删除按钮      -->
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteRoleById(scope.row.id)">删除
          </el-button>
          <!--    分配权限按钮      -->
          <el-button size="mini" type="warning" icon="el-icon-setting" @click="showSetRightDialog(scope.row)">分配权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>


  </el-card>
</template>

<script>
import {deleteRoleInfo} from "@/network/power/roles";

import RolesExtendView from "@/components/power/roles/RolesExtendView";


export default {
  name: "RolesCardView",
  data() {
    return {}
  },
  components: {
    RolesExtendView,
  },
  props: {
    rolelist: Array,
  },
  methods: {
    /**
     *  显示分配角色权限弹窗
     */
    showSetRightDialog(scopeRow) {
      this.$Bus.$emit('showSetRoleDialog', scopeRow)
    },

    /**
     *  显示编辑角色弹窗
     */

    showEditRoleDialog(roleId) {
      this.$Bus.$emit('showEditRoleDialog', roleId)
    },


    /**
     *  删除角色弹窗
     * @param roleId
     * @returns {Promise<ElMessageComponent>}
     */

    async deleteRoleById(roleId) {
      let result = await this.$confirm('此操作将永久删除该角色, 是否继续?', '警告', {
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
        deleteRoleInfo(roleId).then(res => {
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
            this.$emit('updateRoleList')
          }
        })
      }
    }
  },

}
</script>

<style scoped>

</style>