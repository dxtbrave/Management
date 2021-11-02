<template>
  <el-card shadow="hover">
    <el-table :data="rightsList" border stripe>
      <el-table-column align="center" label="#" type="index"></el-table-column>
      <el-table-column align="center" label="权限名称" prop="authName"></el-table-column>
      <el-table-column align="center" label="路径" prop="path"></el-table-column>
      <el-table-column align="center" label="权限等级" prop="level">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.level === '0'">一级</el-tag>
          <el-tag v-if="scope.row.level === '1'" type="success">二级</el-tag>
          <el-tag v-if="scope.row.level === '2'" type="warning">三级</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
name: "RightsCardView",
  props:{
  rightsList:Array,
  }
}
</script>

<style scoped>

</style>