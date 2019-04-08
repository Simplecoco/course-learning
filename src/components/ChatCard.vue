<template>
  <div class="chat-card">
    <div class="chat-content">
      <Card class="chat-card-inner" style="max-height: 100%; overflow: scroll">
        <div class="chatting-item-blank"  v-if="chattingRecords.length === 0">
          还没有任何消息哦~~~
        </div>
        <div class="chatting-item" v-for="item in chattingRecords" :key="item.cid" v-else>
          <Divider :orientation="item.user.uid !== currentUser.uid ? 'left' : 'right'">
            <Avatar :class="item.user.uid !== currentUser.uid ? 'other-avatar' : 'me-avatar'">
              {{ item.user.userName.slice(0, 1).toUpperCase() }}
            </Avatar>
            {{ item.user.userName }}
          </Divider>
          <p>{{ item.content }}</p>
        </div>
      </Card>
    </div>
    <div class="chat-input">
      <Input search enter-button="发送" v-model="inputValue" placeholder="Enter something..." @on-search="submitMessage" />
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  data () {
    return {
      inputValue: '',
      currentUser: {},
      chattingRecords: []
    }
  },
  mounted () {
    console.log('wawawa');
    this.$nextTick(() => {
      this.startSocketIo()
    })
  },
  methods: {
    startSocketIo () {
      const socket = io('http://localhost:3000')
      this.socket = socket
      this.chatCardInner = document.getElementsByClassName('chat-card-inner')[0]
      // console.log(this.chatCardInner);
      // 拿到vm实例
      const vm = this
      
      this.socket.on('connected', (loginUser) => {
        console.log(loginUser);
        vm.currentUser = loginUser
      })
      
      this.socket.on('chat message', function (record) {
        console.log("chat message");
        vm.chattingRecords.push({
          cid: vm.chattingRecords.length + 1,
          ...record
        })
        vm.$emit('recieve')
        // console.log(vm.chattingRecords);
        vm.$nextTick(() => {
          // 使聊天滚动保持在底端
          vm.chatCardInner.scrollTop = vm.chatCardInner.scrollHeight - vm.chatCardInner.clientHeight
        })
      });
    },
    submitMessage (val) {
      console.log(val);
      const vm = this
      this.socket.emit('chat message', {
        user: vm.currentUser,
        content: val
      })
      this.inputValue = ''
    },
    disconnect () {
      this.socket.disconnect()
    }
  }
}
</script>

<style lang="less">
  .ivu-divider-horizontal.ivu-divider-with-text-left, .ivu-divider-horizontal.ivu-divider-with-text-right {
    margin: 10px 0;
  }

  .chat-content {
    height: 450px;
  }

  .chat-input {
    margin-top: 15px;
  }
  
  .ivu-avatar.other-avatar {
    color: white; 
    background-color: #2d8cf0; 
    font-weight: bold; 
    font-size: 17px;
  }
    
  .ivu-avatar.me-avatar {
    color: white;
    background-color: #87d068;
    font-weight: bold;
    font-size: 17px;
  }
  
  // 全局头像字体设置，注意
  .ivu-avatar-string {
    position: static !important;
  }
</style>
