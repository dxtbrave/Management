<template>
  <el-card shadow="hover">
    <el-row>
      <!--  添加分类按钮区域    -->
      <el-col>
        <slot name="addCate"></slot>
      </el-col>
    </el-row>

<!--  表格  -->


<!--  分页区域  -->
    <slot name="pagination"></slot>

  </el-card>
</template>

<script>
export default {
name: "CateCardView"
}
</script>

<style scoped>

</style>