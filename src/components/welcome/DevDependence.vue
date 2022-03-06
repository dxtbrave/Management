<template>
  <div class="dev-dependence">
    <el-descriptions :title="devList.title"
                     :column="devList.column"
                     border

    >
      <el-descriptions-item v-for="item in dataList" :key="item.label" :label="item.label">
        <el-tag size="small">{{item.content}}</el-tag>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
name: "DevDependence",
  props:{
    devList:{
      type:Object,
      default:()=>{}
    }
  },
  computed:{
    dataList(){
      let list = this.devList.list
      return list
    }
  }
}
</script>

<style scoped>
.dev-dependence{
  padding: 20px;
}
</style>