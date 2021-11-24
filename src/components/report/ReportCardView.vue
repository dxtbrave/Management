<template>
  <el-card>
    <!--  2.为Echarts 准备一个具备大小的Dom  -->
    <div id="main" ref="main"></div>
  </el-card>
</template>

<script>
// 1. 导入 echarts
import * as echarts from 'echarts'

import {getReport} from "@/network/report";

export default {
  name: "ReportCardView",
  data() {
    return {
      // 需要合并的数据
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  methods: {
  },
  async mounted() {
    //  3.基于准备好的dom,初始化echarts实例
    //   let myChart = echarts.init(document.getElementById('main'))
    let myChart = echarts.init(this.$refs.main)
    let {data} = await getReport()
    let option = Object.assign(this.options, data)
    // 5. 展示数据
    myChart.setOption(option);
  }
}
</script>

<style scoped>
#main {
  width: 750px;
  height: 400px;
}
</style>