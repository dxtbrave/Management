<template>
  <el-dialog
      title="物流进度"
      :visible.sync="orderProgressDialogVisible"
      @close="orderProgressDialogClosed"
      width="50%">
    <!--  时间线  -->
    <el-timeline>
      <el-timeline-item v-for="(activity,index) in progressInfo" :key="index" :timestamp="activity.ftime">
        {{ activity.context }}
      </el-timeline-item>
    </el-timeline>
    <span slot="footer" class="dialog-footer">
    <el-button @click="orderProgressDialogVisibleChange">取 消</el-button>
    <el-button type="primary" @click="orderProgressDialogVisibleChange">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
export default {
  name: "OrderProgressDialog",
  data() {
    return {
      orderProgressDialogVisible: false,
      // 物流信息
      progressInfo: []
    }
  },
  methods: {
    //  监听修改对话框的关闭事件
    orderProgressDialogClosed() {
      this.$refs.orderProgressFormRef.resetFields()
    },
    // 关闭对话框事件
    orderProgressDialogVisibleChange() {
      this.orderProgressDialogVisible = false
    },
  },
  mounted() {
    this.$Bus.$on('showOrderProgressDialog', data => {
      this.progressInfo = data
      this.orderProgressDialogVisible = true
    })
  }
}
</script>

<style scoped>

</style>