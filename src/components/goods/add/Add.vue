<template>
  <div>
    <!--  面包屑导航区  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <!--  卡片视图区  -->
    <add-card-view/>

<!--  图片预览Dialog  -->
    <preview-dialog/>
  </div>
</template>

<script>
import AddCardView from "@/components/goods/add/AddCardView";
import PreviewDialog from "@/components/goods/add/dialog/PreviewDialog";

export default {
  name: "Add",
  components: {
    AddCardView,
    PreviewDialog
  }
}
</script>

<style scoped>

</style>