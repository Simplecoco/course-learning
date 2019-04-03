<template>
  <div class="user">
    <Layout :menuItems="menuItems">
      <router-view/>
    </Layout>
    <div class="chat-drawer">
      <Button class="drawer-btn"
        @click="drawer.show = true" 
        type="success" 
        shape="circle"
        size="large"
        icon="logo-twitch"
        style="width: 50px; height: 50px"
      >
      </Button>
      <Drawer title="在线交流" width="35" :closable="false" v-model="drawer.show">
        <chat-card></chat-card>
      </Drawer>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Layout from '@/components/Layout.vue'
import ChatCard from '@/components/ChatCard.vue'

export default {
  name: 'user',
  components: {
    Layout,
    ChatCard
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
          name: 'resource-download'
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
      ],
      drawer: {
        show: false
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .drawer-btn {
    position: fixed;
    bottom: 40px;
    right: 40px;
    z-index: 99;
    box-shadow: 3px 3px 10px #dcdee2;
    transform: scale(1);
    transition: transform .3s;
    &:hover {
      transform: scale(1.2);
    }
  }
</style>
