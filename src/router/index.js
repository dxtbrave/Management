import Vue from "vue";
import VueRouter from "vue-router"


// 导入组件
// import login from '@/components/login/Login'
// import home from "@/components/home/Home";
// import welcome from "@/components/welcome/Welcome";
// import users from "@/components/user/Users";
// import roles from "@/components/power/roles/Roles"
// import rights from "@/components/power/rights/Rights"
// import cate from "@/components/goods/categories/Cate";
// import params from "@/components/goods/params/Params"
// import list from "@/components/goods/list/List"
// import add from "@/components/goods/add/Add"
// import order from "@/components/order/Order";
// import report from "@/components/report/Report"

// 路由懒加载
const login = () => import(/* webpackChunkName: "login_home_welcome" */ '@/components/login/Login')
const home = () => import(/* webpackChunkName: "login_home_welcome" */ '@/components/home/Home')
const welcome = () => import(/* webpackChunkName: "login_home_welcome" */ '@/components/welcome/Welcome')

const users = () => import(/* webpackChunkName: "users_rights_roles" */ '@/components/user/Users')
const roles = () => import(/* webpackChunkName: "users_rights_roles" */ '@/components/power/roles/Roles')
const rights = () => import(/* webpackChunkName: "users_rights_roles" */ '@/components/power/rights/Rights')

const cate = () => import(/* webpackChunkName: "cate_params" */ '@/components/goods/categories/Cate')
const params = () => import(/* webpackChunkName: "cate_params" */ '@/components/goods/params/Params')

const list = () => import(/* webpackChunkName: "list_add" */ '@/components/goods/list/List')
const add = () => import(/* webpackChunkName: "list_add" */ '@/components/goods/add/Add')

const order = () => import(/* webpackChunkName: "order_report" */ '@/components/order/Order')
const report = () => import(/* webpackChunkName: "order_report" */ '@/components/report/Report')

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