import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

// 路由懒加载
// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// const About = () => import(/* webpackChunkName: "about" */ './views/About.vue')

// Admin
const Admin = () => import(/* webpackChunkName: "admin" */ './views/Admin/index.vue')
const AdminHome = () => import(/* webpackChunkName: "admin-home" */ './views/Admin/Home.vue')
const CourseResource = () => import(/* webpackChunkName: "course-resource" */ './views/Admin/CourseResource.vue')
const ExamResource = () => import(/* webpackChunkName: "exam-resource" */ './views/Admin/ExamResource/index.vue')
const ExamResourceDetail = () => import(/* webpackChunkName: "exam-resource-detail" */ './views/Admin/ExamResource/ExamResourceDetail.vue')
const AnswerManage = () => import(/* webpackChunkName: "answer-manage" */ './views/Admin/AnswerManage.vue')
const QuestionBank = () => import(/* webpackChunkName: "question-bank" */ './views/Admin/QuestionBank.vue')
const Info = () => import(/* webpackChunkName: "info" */ './views/Admin/Info.vue')
const UserInfo = () => import(/* webpackChunkName: "user-info" */ './views/Admin/UserInfo.vue')

// User
const User = () => import(/* webpackChunkName: "user" */ './views/User/index.vue')
const UserHome = () => import(/* webpackChunkName: "user-home" */ './views/User/Home.vue')
const ResourceDownload = () => import(/* webpackChunkName: "resource-download" */ './views/User/ResourceDownload.vue')
const Exam = () => import(/* webpackChunkName: "exam" */ './views/User/Exam/index.vue')
const ExamDetail = () => import(/* webpackChunkName: "exam-detail" */ './views/User/Exam/ExamDetail.vue')
const Chat = () => import(/* webpackChunkName: "chat" */ './views/User/Chat.vue')

// Others
const Login = () => import(/* webpackChunkName: "login" */ './views/Login.vue')
const Register = () => import(/* webpackChunkName: "register" */ './views/Register.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      redirect: '/admin/admin-home',
      children: [
        {
          path: 'admin-home',
          name: 'admin-home',
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
          path: 'exam-resource-detail/:eid',
          name: 'exam-resource-detail',
          component: ExamResourceDetail
        },
        {
          path: 'answer-manage',
          name: 'answer-manage',
          component: AnswerManage
        },
        {
          path: 'question-bank',
          name: 'question-bank',
          component: QuestionBank
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
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      redirect: '/user/user-home',
      children: [
        {
          path: 'user-home',
          name: 'user-home',
          component: UserHome
        },
        {
          path: 'resource-download',
          name: 'resource-download',
          component: ResourceDownload
        },
        {
          path: 'exam',
          name: 'exam',
          component: Exam,
        },
        {
          path: 'exam-detail/:eid',
          name: 'exam-detail',
          component: ExamDetail
        },
        {
          path: 'chat',
          name: 'chat',
          component: Chat
        }
      ]
    }
  ]
})
