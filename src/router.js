import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// import About from './views/About.vue'

// 路由懒加载
const About = () => import(/* webpackChunkName: "about" */ './views/About.vue')
const Admin = () => import(/* webpackChunkName: "admin" */ './views/Admin.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
      component: About
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    }
  ]
})
