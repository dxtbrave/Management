<template>
  <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisible"
      @close="setRightDialogClosed"
      width="50%">
    <!--  树形控件  -->
    <el-tree :data="rightlist"
             :props="treeProps"
             :show-checkbox="true"
             :default-expand-all="true"
             :default-checked-keys="defKeys"
             ref="treeRef"
             node-key="id"></el-tree>
    <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
import {getRightsTree, updateRight} from "@/network/power/rights";

export default {
  name: "SetRightDialog",
  data() {
    return {
      // 控制分配权限对话框的显示与隐藏
      setRightDialogVisible: false,
      //  所有权限的数据
      rightlist: [],
      //  树形控件属性绑定对象
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      //  默认选中的节点Id值
      defKeys: [],
      // 当前即将分配权限的角色id
      roleId: ''
    }
  },
  mounted() {
    // 接收事件总线中的事件
    this.$Bus.$on('showSetRoleDialog', scopeRow => {
      //   // 将即将分配的角色id保存
      this.roleId = scopeRow.id
      //
      //   // 获取所有权限列表
      this._getRightTree()
      //
      //   // 递归获取三级节点的Id
      this.getLeafKeys(scopeRow, this.defKeys)
      //
      this.setRightDialogVisible = true
    })
  },
  methods: {
    _getRightTree() {
      getRightsTree().then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error({
            message: res.meta.msg,
            showClose: true
          })
        }
        // 把获取的权限数据保存到data中
        this.rightlist = res.data
      })
    },


    /**
     *  通过递归的形式，获取角色下所有三级权限的id,并保存到 defKeys 数组中
     */
    getLeafKeys(node, arr) {
      // 如果当前node节点不包含 children 属性，则是三级节点
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => {
        this.getLeafKeys(item, arr)
      })
    },

    /**
     * 监听分配权限对话框的关闭事件
     */
    setRightDialogClosed() {
      this.defKeys = []
    },

    /**
     * 点击为角色分配权限
     */
    allotRights() {

      // 获取权限id数组
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]

      // 将id数组 转化成 字符串
      const idStr = keys.join(',')

      // 分配权限
      this._updateRight(this.roleId, idStr)

      this.setRightDialogVisible = false

    },

    _updateRight(roleId, idStr) {
      updateRight(roleId, idStr).then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error({
            message: res.meta.msg,
            showClose: true
          })
        }
        this.$message.success({
          message: res.meta.msg,
          showClose: true
        })

        // 提醒父组件 更新List
        this.$emit('updateRoleList')
      })
    },
  }
}
</script>

<style scoped>

</style>