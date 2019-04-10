<template>
  <div class="user">
    <Layout :menuItems="menuItems" :userName="this.userName">
      <router-view/>
    </Layout>
    <div class="chat-drawer">
      <div class="drawer-btn-homework-con">
        <Tooltip content="打开作业提交">
          <Button 
            @click="HomeworkDrawer.show = true"
            class="drawer-btn"
            type="primary" 
            size="large"
            icon="md-cloud-upload"
            style="width: 42px; height: 42px; font-size: 18px; padding: 5px"
          >
          </Button>
        </Tooltip>
      </div>
      <div class="drawer-btn-con">
        <Badge :count="drawer.unreadNum">
          <Tooltip content="打开在线交流">
            <Button class="drawer-btn"
              @click="drawer.show = true" 
              type="success" 
              shape="circle"
              size="large"
              icon="logo-twitch"
              style="width: 45px; height: 45px"
            >
            </Button>
          </Tooltip>
        </Badge>
      </div>
      <Drawer title="在线交流" width="35" :closable="false" v-model="drawer.show" @on-visible-change="resetUnreadNum">
        <chat-card ref="chat-card" @recieve="setUnreadNum"></chat-card>
      </Drawer>
      <Drawer title="作业提交" placement="left" width="35" :closable="false" v-model="HomeworkDrawer.show">
        <homework-upload></homework-upload>
      </Drawer>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Layout from '@/components/Layout.vue'
import ChatCard from '@/components/ChatCard.vue'
import HomeworkUpload from '@/components/HomeworkUpload.vue'

export default {
  name: 'user',
  components: {
    Layout,
    ChatCard,
    HomeworkUpload
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
      userName: '',
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
      },
      HomeworkDrawer: {
        // unreadNum: 0,
        show: false
      }
    }
  },
  mounted () {
    this.userName = this.$route.query.user
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
  
  .drawer-btn-homework-con {
    position: fixed;
    bottom: 37px;
    right: 100px;
    z-index: 99;
    padding: 5px;
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
