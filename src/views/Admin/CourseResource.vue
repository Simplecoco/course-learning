<template lang="html">
  <div class="admin-course-resource content-container">
    
    <Card dis-hover>
      <p slot="title" class="container-card-title"><Icon type="md-book" size="20"/> 课程资源管理</p>
      <div class="upload-button-container">
        <Button size="large" icon="md-cloud-upload" type="primary" :style="{ marginRight: '20px' }" @click="uploadModal = true">
          上传资源
        </Button>
      </div>
      <div class="admin-course-resource-table">
        <Table border :columns="columns12" :data="data6">
          <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
            <Button type="default" size="small" style="margin-right: 5px" @click="download(index)">下载</Button>
            <Button type="error" size="small" @click="remove(index)">删除</Button>
          </template>
        </Table>
      </div>
    </Card>
  
    <Modal
      :value="uploadModal"
      title="上传课程资源"
      :closable="false"
      :mask-closable="false"
    >
      <upload-form 
        ref="upload-form" 
        @success="success" 
        :isSubmitBtn="false" 
        notice="信息提交成功"
        submitUrl="/admin/resource/submit" 
      >
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
        title: 'Name',
        slot: 'name'
      },
      {
        title: '文件类型',
        key: 'fileType',
        filters: [
          {
            label: 'pdf',
            value: 'pdf'
          },
          {
            label: 'ppt',
            value: 'ppt'
          },
          {
            label: 'pptx',
            value: 'pptx'
          },
          {
            label: 'doc',
            value: 'doc'
          },
          {
            label: 'docx',
            value: 'docx'
          },
          {
            label: 'else',
            value: 'else'
          }
        ],
        filterMethod (value, row) {
          if (value === 'else') {
            const fileTypeArr = this.filters.map((item) => {
              return item.value
            })
            return fileTypeArr.indexOf(row.fileType) === -1
          } else {
            return row.fileType.indexOf(value) > -1
          }
        }
      },
      {
        title: '描述',
        key: 'desc'
      },
      {
        title: 'Action',
        slot: 'action',
        width: 180,
        align: 'center'
      }],
      data6: []
    }
  },
  components: {
    UploadForm: HomeworkUpload
  },
  mounted () {
    this.getResources()
  },
  methods: {
    getResources () {
      this.$http.get('/all/resource/list').then((res) => {
        console.log(res);
        if (res.code === 0) {
          console.log(res);
          this.data6 = res.data.map((item) => {
            const { name, date, uri, files, desc } = item
            const tmpArr = files[0].url.split('.')
            const fileType = tmpArr[tmpArr.length - 1]
            const downloadUrl = files[0].url
            return { name, date, uri, files, desc, fileType, downloadUrl }
          })
        }
      })
    },
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `名称：${this.data6[index].name}<br>描述：${this.data6[index].desc}<br>类型：${this.data6[index].fileType}`
      })
    },
    download (index) {
      console.log('下载')
      let aTag = document.createElement('a')
      aTag.target="_blank"
      aTag.download = this.data6[index].name
      aTag.href = this.data6[index].downloadUrl
      aTag.click()
    },
    cancelModal () {
      this.uploadModal = false
    },
    remove (index) {
      this.data6.splice(index, 1)
    },
    asyncOK () {
      this.$refs['upload-form'].asyncOK()
    },
    success (data) {
      this.uploadModal = false
      this.data6.push(data)
    }
  }
}
</script>

<style lang="less" scoped>
  .upload-button-container {
    text-align: right;
  }

  .admin-course-resource-table {
    margin-top: 15px;
  }
</style>
