<template>
  <div style="height: 86vh">
    <el-scrollbar style="height: 100%">
<!--   关于卡片   -->
      <el-card :body-style="{fontSize: '13px'}" id="about-card">
        <div slot="header">
          <b>关于</b>
        </div>
        <div>
          基于<b>Vue2、Vuex、Vue-Router、VueCLI、ElementUI、Echart5、Gsap </b>等后台系统解决方案。
        </div>
      </el-card>
<!--   技术栈卡片   -->
      <el-card style="margin-top: 10px" :body-style="{fontSize: '13px',
      padding:'0px'}" id="content-card">
        <div slot="header">
          <b>技术栈</b>
        </div>
        <div>
<!--   技术栈列表       -->
          <ul>
            <li v-for="item in liList" :key="item.title" class="content-li">
              <strong>{{item.title}}:</strong>
              <el-link type="primary" :underline="false">{{ item.content }}</el-link>
            </li>
          </ul>
<!--   生产依赖       -->
          <save-dependence :save-list="saveList"/>
<!--   开发依赖       -->
          <dev-dependence :dev-list="devList"/>
        </div>
      </el-card>
    </el-scrollbar>
  </div>
</template>

<script>
import SaveDependence from "./SaveDependence";
import DevDependence from "./DevDependence";
export default {
  name: "welcome",
  components:{
    SaveDependence,
    DevDependence
  },
  data(){
    return {
      liList:[
        {title:'开发工具', content:'WebStorm'},
        {title:'编程语言',content: 'JavaScript'},
        {title:'构建工具',content: 'VueCli 4.x'},
        {title:'前端框架',content: 'Vue 2.x'},
        {title: '路由工具',content: 'Vue Router 3.x'},
        {title: '状态管理',content: 'Vuex 3.x'},
        {title: 'UI框架',content: 'Element UI'},
        {title: '动画特效库',content: 'Gsap'},
        {title:'富文本',content: 'Vue-Quill-Editor'},
        {title: '可视化',content: 'Echarts 5.x'},
        {title: 'HTTP工具',content: 'Axios'}
      ],
      saveList:{
        title:'生产依赖',
        column:2,
        list:[
          {label:'vue', content:'^2.15.6'},
          {label: 'vue-router',content: '^3.5.2'},
          {label: 'vuex',content: '^3.6.2'},
          {label: 'axios',content: '^0.24.0'},
          {label: 'echarts',content: '^5.2.2'},
          {label: 'element-ui',content: '^2.15.6'},
          {label: 'gsap',content: '^3.8.0'},
          {label: 'vue-quill-editor',content: '^3.0.6'},
          {label: 'vueTableWithTreeGrid',content: '^0.2.4'},
          {label: 'core-js',content: '^3.6.5'},
          {label: 'nprogress',content: '^0.2.0'},
          {label: 'pace-js',content: '^1.2.4'}
        ]
      },
      devList:{
        title: '开发依赖',
        column: 2,
        list:[
          {label:'@babel/plugin-syntax-dynamic-import',content:'^7.8.3'},
          {label: '@vue/cli-plugin-babel',content:'^4.5.0'},
          {label: '@vue/cli-service',content: '^4.5.0'},
          {label: 'less',content: '^4.1.2'},
          {label: 'less-loader',content: '^6.0.0'},
          {label: 'vue-template-compiler',content: '^2.6.11'},
        ]
      }
    }
  }
}
</script>

<style scoped>
.content-li{
  height: 30px;
  line-height: 30px;
}
.content-li strong{
  margin-right: 20px;
}
.el-link{
  vertical-align: center;
}
</style>