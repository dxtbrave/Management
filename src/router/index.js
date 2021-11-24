import Vue from "vue";
import VueRouter from "vue-router"


// 导入组件
import login from '@/components/login/Login'
import home from "@/components/home/Home";
import welcome from "@/components/welcome/Welcome";
import users from "@/components/user/Users";
import roles from "@/components/power/roles/Roles"
import rights from "@/components/power/rights/Rights"
import cate from "@/components/goods/categories/Cate";
import params from "@/components/goods/params/Params"
import list from "@/components/goods/list/List"
import add from "@/components/goods/add/Add"
import order from "@/components/order/Order";
import report from "@/components/report/Report"

Vue.use(VueRouter)
const routes = [
    {path: '', redirect: '/Login'},
    {path: '/Login', component: login,},
    {
        path: '/Home',
        component: home,
        redirect: '/Welcome',
        children: [
            {path: '/Welcome', component: welcome},
            {path: '/users', component: users},
            {path: '/roles', component: roles,},
            {path: '/rights', component: rights,},
            {path: '/categories', component: cate},
            {path: '/params', component: params},
            {path: '/goods', component: list},
            {path: '/goods/add', component: add},
            {path: '/orders', component: order},
            {path: '/reports', component: report}
        ]
    },


]

const router = new VueRouter({
    routes,
    mode: 'history'
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {

    // NProgress.set(0.7)
    /**
     * to 将要访问的路径
     * from 代表从哪个路径跳转而来
     * next 是一个函数，表示放行
     *  next() 放行 next('/Login')强制跳转
     */
    if (to.path === '/Login') {
        return next()
    }

    if (to.path === '/Welcome') {
        window.sessionStorage.setItem('activePath', '/Welcome')
    }

    // 获取token
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) {
        return next('/Login')
    }
    next()
})

router.afterEach(() => {
    setTimeout(() => {
        // NProgress.done(true)
    }, 500)

})

export default router