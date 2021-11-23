<template>
  <el-dialog
      title="图片预览"
      :visible.sync="previewVisible"
      width="50%">
    <img :src="previewPath" alt="" class="previewImage">
  </el-dialog>
</template>

<script>
export default {
  name: "PreviewDialog",
  data() {
    return {
      previewVisible: false,
      previewPath: ''
    }
  },
  mounted() {
    this.$Bus.$on('showPreviewVisible', previewPath => {
      this.previewPath = previewPath
      this.previewVisible = true
    })
  }
}
</script>

<style scoped>
.previewImage {
  width: 100%;
}
</style>