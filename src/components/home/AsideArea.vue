<template>
  <div>
    <!-- 收缩栏 -->
    <div class="toggle-button" @click="toggleCollapse">|||</div>
    <el-menu
        background-color="#333744"
        text-color="#fff"
        :unique-opened="true"
        :collapse="isCollapsed"
        :collapse-transition="false"
        :router="true"
        :default-active="activePath"
        active-text-color="#409EFF">
      <!-- 一级菜单 -->
      <el-submenu  v-for="item in menulist" :index="item.id + ''" :key="item.id">
        <!-- 一级菜单的模板区域 -->
        <template slot="title">
          <!-- 图标 -->
          <i :class="iconObj[item.id]"></i>
          <!-- 文本 -->
          <span>{{item.authName}}</span>
        </template>

        <!--   二级菜单   -->
        <el-menu-item :index="'/' + subItem.path"
                      v-for="subItem in item.children"
                      :key="subItem.id"
                      @click="saveNavState('/' + subItem.path)">
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-menu"></i>
            <!-- 文本 -->
            <span>{{subItem.authName}}</span>
          </template>
        </el-menu-item>
      </el-submenu>

    </el-menu>
  </div>

</template>

<script>
export default {
  name: "AsideArea",
  data(){
    return{
      iconObj:{
        '125':'iconfont icon-user-group-fill',
        '103':'iconfont icon-databaseset-fill',
        '101':'iconfont icon-shangpin',
        '102':'iconfont icon-danju',
        '145':'iconfont icon-zhexiantu',
      },
      // 是否折叠
      isCollapsed:false,
      // 被激活的链接地址
      activePath:''
    }
  },
  props: {
    menulist:Array
  },
  watch:{
    isCollapsed(){
      this.$emit('collapsedChange',this.isCollapsed)
    }
  },
  methods:{
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse(){
      this.isCollapsed = !this.isCollapsed
    },
  //  保存链接的激活状态
    saveNavState(activePath){
      window.sessionStorage.setItem('activePath',activePath)
      this.activePath = activePath
    }
  },
  created() {
    this.activePath =  window.sessionStorage.getItem('activePath')
  },
  mounted() {
  }
}
</script>

<style scoped>
.toggle-button{
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
  height: 30px;
}

.iconfont{
  margin-right: 10px;
}
.el-menu{
  border-right: none;
}
</style>