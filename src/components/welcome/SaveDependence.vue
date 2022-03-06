<template>
  <div class="save-dependence">
    <el-descriptions :title="saveList.title"
                     :column="saveList.column"
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
name: "SaveDependence",
  props:{
    saveList:{
      type:Object,
      default:()=>{}
    }
  },
  computed:{
    dataList(){
      let list = this.saveList.list
      return list
    }
  }
}
</script>

<style scoped>
.save-dependence{
  padding: 20px;
}
</style>