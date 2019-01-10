import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
// import About from './views/About.vue'

// 路由懒加载
const About = () => import(/* webpackChunkName: "about" */ './views/About.vue')
const Admin = () => import(/* webpackChunkName: "admin" */ './views/Admin/index.vue')
const AdminHome = () => import(/* webpackChunkName: "admin-home" */ './views/Admin/Home.vue')
const CourseResource = () => import(/* webpackChunkName: "course-resource" */ './views/Admin/CourseResource.vue')
const ExamResource = () => import(/* webpackChunkName: "exam-resource" */ './views/Admin/ExamResource.vue')
const Info = () => import(/* webpackChunkName: "info" */ './views/Admin/Info.vue')
const UserInfo = () => import(/* webpackChunkName: "user-info" */ './views/Admin/UserInfo.vue')

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
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
      component: Admin,
      redirect: '/admin/home',
      children: [
        {
          path: 'home',
          name: 'home',
          component: AdminHome
        },
        {
          path: 'course-resource',
          name: 'course-resource',
          component: CourseResource
        },
        {
          path: 'exam-resource',
          name: 'exam-resource',
          component: ExamResource
        },
        {
          path: 'info',
          name: 'info',
          component: Info
        },
        {
          path: 'user-info',
          name: 'user-info',
          component: UserInfo
        }
      ]
    }
  ]
})
