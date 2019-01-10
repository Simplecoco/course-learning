<template>
  <div class="admin">
    <Layout :menuItems="menuItems">
      <router-view/>
    </Layout>
  </div>
</template>

<script>
// @ is an alias to /src
import Layout from '@/components/Layout.vue'

export default {
  name: 'admin',
  components: {
    Layout
  },
  data () {
    return {
      menuItems: [
        {
          text: 'Home',
          icon: 'md-home',
          name: 'home'
        },
        {
          text: '资源管理',
          icon: 'md-cube',
          name: 'resource',
          children: [
            {
              text: '课程资源管理',
              icon: 'md-book',
              name: 'course-resource'
            },
            {
              text: '考试管理',
              icon: 'md-create',
              name: 'exam-resource'
            }
          ]
        },
        {
          text: '信息发布',
          icon: 'ios-megaphone',
          name: 'info'
        },
        {
          text: '用户管理',
          icon: 'md-people',
          name: 'user-info'
        }
      ]
    }
  }
}
</script>
