<template>
  <div class="user">
    <Layout :menuItems="menuItems">
      <router-view/>
    </Layout>
    <div class="chat-drawer">
      <div class="drawer-btn-con">
        <Badge :count="drawer.unreadNum">
          <Button class="drawer-btn"
            @click="drawer.show = true" 
            type="success" 
            shape="circle"
            size="large"
            icon="logo-twitch"
            style="width: 50px; height: 50px"
          >
          </Button>
        </Badge>
      </div>
      <Drawer title="在线交流" width="35" :closable="false" v-model="drawer.show" @on-visible-change="resetUnreadNum">
        <chat-card ref="chat-card" @recieve="setUnreadNum"></chat-card>
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
  beforeRouteLeave (to, from, next) {
    // 当离开当前chat所在路由时，主动断开连接
    console.log(from, to);
    if (from.matched[0].path === '/user' && to.matched[0].path === '/admin') {
      this.$refs['chat-card'].disconnect()
    }
    next()
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
        // {
        //   text: '在线交流',
        //   icon: 'md-chatboxes',
        //   name: 'chat'
        // }
      ],
      drawer: {
        unreadNum: 0,
        show: false
      }
    }
  },
  methods: {
    setUnreadNum () {
      if (!this.drawer.show) {
        this.drawer.unreadNum++
      }
    },
    resetUnreadNum (val) {
      if (val === true && this.drawer.unreadNum !== 0) {
        this.drawer.unreadNum = 0
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .drawer-btn-con {
    position: fixed;
    bottom: 40px;
    right: 40px;
    z-index: 99;
  }
  
  .drawer-btn {
    box-shadow: 3px 3px 10px #a1a3a9;
    transform: scale(1);
    transition: transform .3s;
    &:hover {
      transform: scale(1.2);
    }
  }
</style>
