import Vue from "vue";
import VueRouter from "vue-router"

// 导入组件
import login from '@/components/login/login'
import home from "@/components/home/home";
import welcome from "@/components/welcome/welcome";

Vue.use(VueRouter)
const routes = [
    {
        path:'',
        redirect:'/Login'
    },
    {
        path:'/Login',
        component:login,
    },
    {
        path: '/Home',
        component: home,
        redirect:'/Welcome',
        children:[
            {
                path:'/Welcome',
                component:welcome
            }
        ]
    }
]

const router = new VueRouter({
    routes,
    mode:'history'
})

// 挂载路由导航守卫
router.beforeEach((to,from,next)=>{
    /**
     * to 将要访问的路径
     * from 代表从哪个路径跳转而来
     * next 是一个函数，表示放行
     *  next() 放行 next('/Login')强制跳转
     */
    if (to.path === '/Login'){
        return next()
    }
   // 获取token
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr){
        return next('/Login')
    }
    next()
})

export default router