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
    }
  },
  data () {
    return {
      carouselValule: 0,
      uploadModal: false,
      // uploadLoading: true,
      noticeList: [
        // {
        //   uri: 1,
        //   name: 'test1',
        //   date: '2019-3-4',
        //   content: 'test1111 content test1111 content test1111 content test1111 content test1111 content test1111 content test1111 content test1111 content test1111 content',
        //   imgUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAGSAfQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD5/ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACnvG0YXcCNwBGRjg0ynM5YAHtQA2iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiijBHUUAFFFFABRRRQAUUUUAFFFFABRRiigAooooAKKKKACijFFABRRRg0AFFGD6UYPpQAUUYNFABRRg+lFABRRRQAUUUUAFFFFABRRiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDR0WxTUdYtLWVisckoVivXHfFfWafB3wFsAPh+JsDGTPLz/AOPV8hWt1LZ3MVxA22WJg6n0Ir11P2jvEyIF/snSWI7lZP8A4ujqHU9i/wCFO+AP+hch/wC/8v8A8VR/wp3wB/0LkP8A3/l/+Krx/wD4aR8Tf9AfSf8AvmT/AOLpR+0h4mJ/5BGk/wDfMn/xdAHr/wDwp3wB/wBC5D/3/l/+Ko/4U74A/wChch/7/wAv/wAVXR+GdVl1vw1p+pToiS3MIkZUztBPpmuH+LPxJ1P4fvpg06ztLj7WJC/2gMcbduMbSPWgRq/8Kd8Af9C5D/3/AJf/AIqj/hTvgD/oXIf+/wBL/wDFV4//AMNI+Jv+gPpP/fMn/wAXR/w0j4m/6A+k/wDfMn/xdAzZ+NHw78MeG/B8OpaNpws51ulibZI7B1ZWPO4n+7XgI5Nd/wCNvi3rfjnSotOvbWytrdJPMIt1bLkDAzuJ6ZP51wA60CPov4UfCnwxq/gq11nWLM3095uIV5WVUUMV4Ckc5U9zXdf8Kd8Af9C7D/3/AJf/AIqmfBv/AJJNoX+5L/6Oeofip471DwHpdneafa207zSMrLcBsADHTBHrQF7Fn/hTvgD/AKFyH/v/AC//ABVH/Cnf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ZvEl8qOUMwQKwJIB4+8K+bNxxjJozxigVhKKKKBhQOtFFAHv3wD8YaHpOi3uk6lqMFlO9z56G4cIrgqARuPHG31717L/AMJj4W/6GPR//A6L/wCKr4dycYzSUAfcf/CZeFv+hk0f/wADov8A4ql/4TLwt/0Mmj/+B0X/AMVXw3RQB9yf8Jl4W/6GTR//AAOi/wDiqa/jLwvsOPEmkf8AgdF/8VXw7RmgDf8AG1/bap401i9s9ht5rp2jKdCM9R9etYFGaKAPoH9nXV9OsdO1i1ur63gnlmjeOOSQKWAU5IBPNdX8bNa0t/h7cWq6hbNcSyLsiEqlm69ADmvlTcQOpoyfWgVgNJQaKBjlO1s19WfB7xvY6t4NtbO81G3jvrIGExSSBXZBjawBPIwcfhXyjS5PrQB9b/FXxzp2i+DL23tb+3fULpfJjjjlDMAeC2Ac4xmvklzlie+aTcfU0lABSg0lFAHvf7Omq6fYrrltd3tvBNM0LRRySBS4AfOM9cV2vxo13Sm+Gmp2S6jatdXHlCKJZQWfEiscAeymvlDJx1o3H1NArAaSgnNFAwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP//Z'
        // },
        // {
        //   uri: 2,
        //   name: 'test2',
        //   date: '2019-3-4',
        //   content: 'test2222 content',
        //   imgUrl: 'http://localhost:3000/public/images/1558167748294-%E6%96%B0%E6%96%B0%E6%96%B0.jpg'
        // },
        // {
        //   uri: 3,
        //   name: 'test3',
        //   date: '2019-3-4',
        //   content: 'test3333 content',
        //   imgUrl: 'https://www.uestc.edu.cn/public/2019/04/004.png'
        // },
        // {
        //   uri: 4,
        //   name: 'test4',
        //   date: '2019-3-5',
        //   content: 'test4444 content test4444 contenttest4444 contenttest4444 contenttest4444 contenttest4444 content test4444 contenttest4444 content'
        // }
      ],
      modal: {
        name: '',
        content: ''
      }
    }
  },
  mounted () {
    this.getNotices()
  },
  methods: {
    getNotices () {
      this.$http.get('/all/notice/list').then((res) => {
        console.log(res);
        if (res.code === 0) {
          const newList = res.data.map((item) => {
            const { name, date, uri, files, content } = item
            var imgUrl
            if (item.files.length !== 0) {
              imgUrl = item.files[0].url
            } else {
              imgUrl = ''
            }
            return { name, date, uri, imgUrl, content }
          })
          this.noticeList = Object.assign({}, this.noticeList, newList)
        }
      })
    },
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
    overflow: hidden;
    margin-bottom: 15px;
    line-height: 200px;
    text-align: center;
    color: #fff;
    font-size: 20px;
    background: #506b9e;
    cursor: pointer;
  }
  
  .demo-carousel-img {
    // width: 100%;
    height: 100%;
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
