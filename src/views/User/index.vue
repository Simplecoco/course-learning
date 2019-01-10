<template>
  <div class="user">
    <Layout :menuItems="menuItems">
      <router-view/>
    </Layout>
  </div>
</template>

<script>
// @ is an alias to /src
import Layout from '@/components/Layout.vue'

export default {
  name: 'user',
  components: {
    Layout
  },
  data () {
    return {
      menuItems: [
        {
          text: 'Home',
          icon: 'md-home',
          name: 'user-home'
        },
        {
          text: '资源下载',
          icon: 'md-cloud-download',
          name: 'resource-download',
        },
        {
          text: '课程测验',
          icon: 'md-create',
          name: 'exam'
        },
        {
          text: '在线交流',
          icon: 'md-chatboxes',
          name: 'chat'
        }
      ]
    }
  }
}
</script>
