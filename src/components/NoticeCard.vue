<template>
  <div class="notice-card">
    <Card style="max-height: 100%; overflow: scroll">
      <p slot="title" class="container-card-title">
          <Icon type="md-list-box" size='20'></Icon>
          公告 & 信息
      </p>
      
      <!-- 轮播 -->
      <Carousel 
        v-model="carouselValule" 
        class="notice-card-carousel" 
        @click.native="($event) => { openModal('carousel', $event) }"
        :autoplay-speed="3500" 
        loop 
        autoplay
      >
        <CarouselItem v-for="item in noticeList">
          <div class="demo-carousel">
            <template v-if="!item.imgUrl">{{ item.name }}</template>
            <img class="demo-carousel-img" :src="item.imgUrl" :alt="item.name" v-else>
          </div>
        </CarouselItem>
      </Carousel>
      
      <ul>
          <li class="notice-li" v-for="item in noticeList" :key="item.uri" @click="openModal(item)">
              <a class="notice-title" :title="item.name" :href="item.url" target="_blank">{{ item.name }}</a>
              <span class="motice-date" style="float: right">
                {{ item.date }}
              </span>
          </li>
      </ul>
    </Card>
    <Modal
      :value="uploadModal"
      :title="modal.name"
      :closable="false"
      :mask-closable="false"
      :width="60"
    >
      <div class="demo-carousel" v-if="modal.imgUrl" style="height: 250px">
        <h2 v-if="!modal.imgUrl">{{ modal.name }}</h2>
        <img class="demo-carousel-img" :src="modal.imgUrl" :alt="modal.name" v-else>
      </div>
      <Alert show-icon>
          {{ modal.name }}
          <Icon type="ios-bulb-outline" slot="icon"></Icon>
          <template slot="desc">{{ modal.content }}</template>
      </Alert>
      <!-- <p class="modal-content">{{ `${modal.content}` }}</p> -->
      <!-- <Form ref="uploadForm" :model="uploadForm.data" :rules="uploadForm.rule" :label-width="80">
        <FormItem label="标题" prop="name">
          <Input v-model="uploadForm.data.name" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="内容" prop="desc">
            <Input v-model="uploadForm.data.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
      </Form> -->
      <template slot="footer">
        <Button type="default" style="margin-right: 5px" @click="cancelModal">取消</Button>
        <Button type="primary" @click="cancelModal">确定</Button>
      </template>
    </Modal>
  </div>
</template>

<script>
export default {
  props: {
    carouselList: {
      type: Array,
      default: function () {
        return []
      }
    },
    noticeList: {
      type: Array,
      default: function () {
        return [
          {
            uri: 1,
            name: 'test1',
            date: '2019-3-4',
            content: 'test1111 content',
            imgUrl: 'https://www.uestc.edu.cn/public/2019/04/007.png'
          },
          {
            uri: 2,
            name: 'test2',
            date: '2019-3-4',
            content: 'test2222 content',
            imgUrl: 'https://www.uestc.edu.cn/public/2019/04/006.png'
          },
          {
            uri: 3,
            name: 'test3',
            date: '2019-3-4',
            content: 'test3333 content',
            imgUrl: 'https://www.uestc.edu.cn/public/2019/04/004.png'
          },
          {
            uri: 4,
            name: 'test4',
            date: '2019-3-5',
            content: 'test4444 content test4444 contenttest4444 contenttest4444 contenttest4444 contenttest4444 content test4444 contenttest4444 content'
          }
        ]
      }
    }
  },
  data () {
    return {
      carouselValule: 0,
      
      uploadModal: false,
      // uploadLoading: true,
      modal: {
        name: '',
        content: ''
      }
    }
  },
  methods: {
    openModal (item, e) {
      if (e) {
        if ((e.target.className.indexOf('demo-carousel') === -1) && (e.target.className.indexOf('demo-carousel-img') === -1)) {
          return
        }  
      }
      if (item !== 'carousel') {
        this.modal = Object.assign({}, this.modal, item)  
      } else {
        this.modal = Object.assign({}, this.modal, this.noticeList[this.carouselValule])
      }
      this.uploadModal = true
    },
    cancelModal () {
      this.uploadModal = false
      this.modal = {}
      // this.modal = Object.assign({}, this.modal, {
      //   name: '',
      //   content: ''
      // })
    },
  }
}
</script>

<style scoped lang="less">
  .notice-card-carousel {
    margin-bottom: 30px;
  }

  .demo-carousel {
    height: 300px;
    width: 100%;
    line-height: 200px;
    text-align: center;
    color: #fff;
    font-size: 20px;
    background: #506b9e;
    cursor: pointer;
  }
  
  .demo-carousel-img {
    width: 100%;
  }

  // .notice-container-title {
  //   text-align: left;
  //   font-size: 15px;
  // }
    
  .notice-li {
    position: relative;
    list-style: none;
    text-align: left;
    padding: 0 10px;
    font-size: 16px;
    line-height: 1.6;
    &:hover {
      background: rgb(232, 234, 236);
    } 
  }

  .notice-title {
    display: inline-block;
    max-width: 80%;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
  
  .notice-date {
    float: right;
  }
  
  .modal-content {
    font-size: 15px;
  }
</style>
