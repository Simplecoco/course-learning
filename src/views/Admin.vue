<template>
  <div class="admin">
    <Layout :menuItems="menuItems"></Layout>
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
          icon: 'md-home'
        },
        {
          text: '资源管理',
          icon: 'md-cloud-upload',
          children: [
            {
              text: '课程资源管理',
              icon: 'md-create'
            },
            {
              text: '考试管理',
              icon: 'md-create'
            }
          ]
        },
        {
          text: '信息发布',
          icon: 'ios-megaphone'
        },
        {
          text: '用户管理',
          icon: 'md-people'
        }
      ]
    }
  }
}
</script>
