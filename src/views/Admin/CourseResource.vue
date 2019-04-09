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
      v-model="uploadModal"
      title="上传课程资源"
      :loading="uploadLoading"
      @on-ok="asyncOK('uploadForm')">
      <Form ref="uploadForm" :model="uploadForm.data" :rules="uploadForm.rule" :label-width="80">
        <FormItem label="文件" prop="file">
          <Upload
            multiple
            type="drag"
            action="//jsonplaceholder.typicode.com/posts/">
            <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击或拖动上传文件</p>
            </div>
          </Upload>
        </FormItem>
        <FormItem label="文件名" prop="name">
          <Input v-model="uploadForm.data.name" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="描述" prop="desc">
            <Input v-model="uploadForm.data.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
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
      data6: [{
        name: 'John Brown',
        fileType: 'pdf',
        desc: 'New York No. 1 Lake Park'
      },
      {
        name: 'Jim Green',
        fileType: 'ppt',
        desc: 'New York No. 1 Lake Park'
      },
      {
        name: 'Jim Green',
        fileType: 'pptx',
        desc: 'New York No. 1 Lake Park'
      },
      {
        name: 'Jim Green',
        fileType: 'pptx',
        desc: 'New York No. 1 Lake Park'
      },
      {
        name: 'Joe Black',
        fileType: 'doc',
        desc: 'New York No. 1 Lake Park'
      },
      {
        name: 'Joe Black',
        fileType: 'docx',
        desc: 'New York No. 1 Lake Park'
      },
      {
        name: 'Jon Snow',
        fileType: 'jpg',
        desc: 'New York No. 1 Lake Park'
      }],
      uploadForm: {
        data: {
          file: '',
          name: '',
          desc: ''
        },
        rule: {
          file: [
            { required: true, message: '请上传文件', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '文件名不能为空', trigger: 'blur' }
          ],
          desc: [
            { required: false, message: 'Please enter a personal introduction', trigger: 'blur' },
            { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
          ]
        }
      }
    }
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.data6[index].name}<br>Description：${this.data6[index].desc}`
      })
    },
    download (index) {
      console.log('下载')
    },
    remove (index) {
      this.data6.splice(index, 1)
    },
    asyncOK (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
          this.uploadModal = false
        } else {
          this.$Message.error('Fail!')
        }
      })
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
