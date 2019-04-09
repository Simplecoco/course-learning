<template lang="html">
  <div class="admin-user-info content-container">
    
    <Card dis-hover>
      <p slot="title" class="container-card-title"><Icon type="md-people" size="20"/> 用户管理</p>
      <!-- <div class="upload-button-container">
        <Button size="large" icon="md-cloud-upload" type="primary" :style="{ marginRight: '20px' }" @click="uploadModal = true">
          发布公告
        </Button>
      </div> -->
      <div class="admin-user-info-table">
        <Table border :columns="columns12" :data="data6">
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
    <!-- <Modal
      :value="uploadModal"
      title="发布公告"
      :closable="false"
      :mask-closable="false"
    >
      <Form ref="uploadForm" :model="uploadForm.data" :rules="uploadForm.rule" :label-width="80">
        <FormItem label="标题" prop="name">
          <Input v-model="uploadForm.data.name" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="内容" prop="desc">
            <Input v-model="uploadForm.data.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
      </Form>
      <template slot="footer">
        <Button type="default" style="margin-right: 5px" @click="cancelModal">取消</Button>
        <Button type="primary" @click="asyncOK('uploadForm')">确定</Button>
      </template>
    </Modal> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      // uploadModal: false,
      // uploadLoading: true,
      columns12: [{
        title: '姓名',
        slot: 'name'
      },
      {
        title: '学号',
        key: 'desc'
      },
      {
        title: 'Action',
        slot: 'action',
        width: 150,
        align: 'center'
      }],
      data6: [{
        name: 'John Brown',
        desc: '123214342'
      },
      {
        name: 'Jim Green',
        desc: '234234324'
      },
      {
        name: 'Joe Black',
        desc: '23565465465'
      },
      {
        name: 'Jon Snow',
        desc: '893475843345'
      }]
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
  methods: {
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.data6[index].name}<br>Description：${this.data6[index].desc}`
      })
    },
    remove (index) {
      this.data6.splice(index, 1)
    }
    // cancelModal () {
    //   this.uploadModal = false
    // },
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

<style lang="less" scoped>
  .upload-button-container {
    text-align: right;
  }

  .admin-user-info-table {
    margin-top: 15px;
  }
</style>
