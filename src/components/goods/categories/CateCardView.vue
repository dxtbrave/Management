<template>
  <el-card shadow="hover">
    <el-row>
      <!--  添加分类按钮区域    -->
      <el-col>
        <slot name="addCate"></slot>
      </el-col>
    </el-row>

    <!--  表格  -->
    <tree-table class="treeTable"
                :data="cateList"
                :columns="columns"
                :selection-type="false"
                :expand-type="false"
                :show-index="true"
                index-text="#"
                :border="true"
                :show-row-hover="false">
      <!--  是否有效 模板   -->
      <template slot="isOk" slot-scope="scope">
        <i class="el-icon-success"
           v-if="scope.row.cat_deleted  === false"
           style="color:lightgreen;"></i>
        <i class="el-icon-error"
           v-else
           style="color:red;"></i>
      </template>

      <!--  排序 模板   -->
      <template slot="order" slot-scope="scope">
        <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
        <el-tag size="mini" v-else-if="scope.row.cat_level === 1" type="success">二级</el-tag>
        <el-tag size="mini" v-else type="warning">三级</el-tag>
      </template>
      <!-- 操作 模板 -->
      <template slot="option" slot-scope="scope">
        <!--    编辑按钮      -->
        <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditCateDialog(scope.row.cat_id)">编辑</el-button>
        <!--    删除按钮      -->
        <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteRoleById(scope.row.cat_id)">删除</el-button>
      </template>
    </tree-table>

    <!--  分页区域  -->
    <slot name="pagination"></slot>

  </el-card>
</template>

<script>
import {deleteCateInfo} from "@/network/goods/categories";

export default {
  name: "CateCardView",
  data() {
    return {
      columns: [
        //  第一列
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        //  第二列
        {
          label: '是否有效',
          // 表示将当前列 定义为模板列
          type: 'template',
          // 表示当前这一列使用的模板名称
          template: 'isOk',
        },
        //  第三列
        {
          label: '排序',
          type: 'template',
          template: 'order'
        },
        //  第四列
        {
          label: '操作',
          type: 'template',
          template: 'option'
        },
      ]
    }
  },
  props: {
    cateList: Array,
  },
  created() {
    // this.getParentCateList()
  },
  methods:{

    /**
     *  显示修改分类名称弹窗
     */

    showEditCateDialog(roleId) {
      this.$Bus.$emit('showEditCateDialog', roleId)
    },


    /**
     *  删除分类弹窗
     * @param cateId
     * @returns {Promise<ElMessageComponent>}
     */

    async deleteRoleById(cateId) {
      let result = await this.$confirm('此操作将永久删除该分类, 是否继续?', '警告', {
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
        deleteCateInfo(cateId).then(res => {
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
            this.$emit('updateCateList')
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.treeTable{
  margin-top: 15px;
}
</style>