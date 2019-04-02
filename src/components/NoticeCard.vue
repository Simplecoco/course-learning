<template>
  <div class="notice-card">
    <Card style="max-height: 100%; overflow: scroll">
      <!-- <Divider orientation="left">
        <Icon size="25" type="md-list-box" style="vertical-align: top" color="#2d8cf0" />
        公告 & 信息
      </Divider> -->
      <p slot="title">
          <Icon type="md-list-box"></Icon>
          公告 & 信息
      </p>
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
    >
      <!-- <h3>{{ modal.name }}</h3> -->
      <p class="modal-content">{{ `title: ${modal.name}` }}</p>
      <p class="modal-content">{{ `content: ${modal.content}` }}</p>
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
    noticeList: {
      type: Array,
      default: function () {
        return [
          {
            uri: 1,
            name: 'test1',
            date: '2019-3-4',
            content: 'test1111 content'
          },
          {
            uri: 2,
            name: 'test2',
            date: '2019-3-4',
            content: 'test2222 content'
          },
          {
            uri: 3,
            name: 'test3',
            date: '2019-3-4',
            content: 'test3333 content'
          }
        ]
      }
    }
  },
  data () {
    return {
      uploadModal: false,
      // uploadLoading: true,
      modal: {
        name: '',
        content: ''
      }
    }
  },
  methods: {
    openModal (item) {
      this.uploadModal = true
      this.modal.name = item.name
      this.modal.content = item.content
    },
    cancelModal () {
      this.uploadModal = false
      // this.modal = Object.assign({}, this.modal, {
      //   name: '',
      //   content: ''
      // })
    },
  }
}
</script>

<style scoped lang="less">
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
