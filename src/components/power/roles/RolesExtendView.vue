<template>
  <div>
    <el-row v-for="(item1,index1) in scoperow.children"
            :key="item1.id"
            :class="['bdbottom',index1 === 0 ? 'bdtop' : '','vcenter']">
      <!--  渲染一级权限  -->
      <el-col :span="5">
        <el-tag closable
                @close="removeRightById(scoperow,item1.id)">{{ item1.authName }}</el-tag>
        <i class="el-icon-caret-right"></i>
      </el-col>
      <!--  渲染二级和三级权限  -->
      <el-col :span="19">
        <!--   通过for循环，嵌套渲染二级权限   -->
        <el-row :class="[index2 === 0 ? '':'bdtop' ,'vcenter']" v-for="(item2,index2) in item1.children"
                :key="item2.id">
          <el-col :span="6">
            <el-tag type="success" closable
                    @close="removeRightById(scoperow,item2.id)">{{ item2.authName }}</el-tag>
            <i class="el-icon-caret-right"></i>
          </el-col>

          <el-col :span="18">
            <!--   通过for循环，嵌套渲染三级权限   -->
            <el-tag v-for="(item3,index3) in item2.children"
                    :key="item3.id"
                    type="warning"
                    closable
                    @close="removeRightById(scoperow,item3.id)">
              {{ item3.authName }}
            </el-tag>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>

</template>

<script>

import {deleteRoles} from "@/network/power/roles";

export default {
  name: "RolesExtendView",
  props: {
    scoperow: Object
  },
  methods: {
    // 根据ID删除对应的权限
    async removeRightById(role, rightId) {
      //  弹框提示用户是否需要删除
      const result = await this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (result === 'cancel') {
        this.$message.info({
          message: '已经取消删除',
          showClose: true
        })
      }
      deleteRoles(role.id, rightId).then(res => {
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
        this.scoperow.children = res.data
      })
    },
  }
}
</script>

<style scoped>
.el-tag {
  margin: 7px;
}

.vcenter {
  display: flex;
  align-items: center;
}

.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}
</style>