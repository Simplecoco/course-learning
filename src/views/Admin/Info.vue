<template lang="html">
  <div class="admin-info content-container">
    <Card dis-hover>
      <p slot="title" class="container-card-title"><Icon type="ios-megaphone" size="20"/> 信息发布</p>
      <div class="upload-button-container">
        <Button size="large" icon="md-cloud-upload" type="primary" :style="{ marginRight: '20px' }" @click="uploadModal = true">
          发布公告
        </Button>
      </div>
      <div class="admin-info-table">
        <Table :columns="columns12" :data="data6" stripe>
          <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
            <Button type="error" size="small" @click="remove(index)">删除</Button>
          </template>
        </Table>
      </div>
    </Card>
    <Modal
      :value="uploadModal"
      title="发布公告"
      :closable="false"
      :mask-closable="false"
    >
      <upload-form 
        ref="upload-form" 
        @success="success" 
        :isSubmitBtn="false" 
        notice="信息提交成功"
        submitUrl="/admin/createNotice"
      >
        <p slot="upload-desc">只支持图片文件(jpg, jpeg, png)</p>
      </upload-form>
      <template slot="footer">
        <Button type="default" style="margin-right: 5px" @click="cancelModal">取消</Button>
        <Button type="primary" @click="asyncOK('uploadForm')">确定</Button>
      </template>
    </Modal>
  </div>
</template>

<script>
import HomeworkUpload from '@/components/HomeworkUpload'

export default {
  data () {
    return {
      uploadModal: false,
      uploadLoading: true,
      columns12: [{
        title: '标题',
        slot: 'name'
      },
      {
        title: '内容',
        key: 'desc'
      },
      {
        title: 'Action',
        slot: 'action',
        width: 150,
        align: 'center'
      }],
      data6: [],
      // uploadForm: {
      //   data: {
      //     name: '',
      //     desc: ''
      //   },
      //   rule: {
      //     name: [
      //       { required: true, message: '标题不能为空', trigger: 'blur' }
      //     ],
      //     desc: [
      //       { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
      //       { type: 'string', min: 6, message: 'Introduce no less than 6 words', trigger: 'blur' }
      //     ]
      //   }
      // }
    }
  },
  components: {
    UploadForm: HomeworkUpload
  },
  mounted () {
    this.getNotices()
  },
  methods: {
    getNotices () {
      this.$http.get('/all/notice/list').then((res) => {
        console.log(res);
        if (res.code === 0) {
          this.data6 = res.data.map((item) => {
            const { name, date, uri, files, content: desc } = item
            return { name, date, uri, files, desc }
          })
        }
      })
    },
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.data6[index].name}<br>Description：${this.data6[index].desc}<br><img class="modal-img" src=${this.data6[index].files[0].url}>`
      })
    },
    remove (index) {
      this.data6.splice(index, 1)
    },
    cancelModal () {
      this.uploadModal = false
    },
    asyncOK () {
      this.$refs['upload-form'].asyncOK()
    },
    success (data) {
      this.uploadModal = false
      this.getNotices()
      // this.data6.push(data)
    }
    // asyncOK (name) {
    //   this.$refs[name].validate((valid) => {
    //     if (valid) {
    //       this.$Message.success('Success!')
    //       this.uploadModal = false
    //       this.uploadForm.data = Object.assign({}, this.uploadForm.data, {
    //         name: '',
    //         desc: ''
    //       })
    //     } else {
    //       console.log('fail')
    //       this.$Message.error('Fail!')
    //     }
    //   })
    // }
  }
}
</script>

<style lang="less">
  .upload-button-container {
    text-align: right;
  }

  .admin-info-table {
    margin-top: 15px;
  }
  
  .modal-img {
    height: 80px;
    transform: scale(1);
    transition: transform .3s;
    cursor: pointer;
    &:hover {
      transform: scale(2.5);
    }
  }
</style>
