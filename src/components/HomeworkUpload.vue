<template>
  <div class="homework-upload">
    <Form ref="uploadForm" :model="uploadForm.data" :rules="uploadForm.rule" :label-width="80">
      <FormItem label="文件" prop="file">
        <Upload
          multiple
          type="drag"
          action="//jsonplaceholder.typicode.com/posts/"
          :on-success="fileSuccess"
          :on-error="fileSuccess"
          :default-file-list="uploadForm.fileList"
        >
          <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击或拖动上传文件</p>
          </div>
        </Upload>
      </FormItem>
      <FormItem label="作业标题" prop="name">
        <Input v-model="uploadForm.data.name" placeholder="Enter your name"></Input>
      </FormItem>
      <FormItem label="描述 or 备注" prop="desc">
          <Input v-model="uploadForm.data.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem v-if="isSubmitBtn">
        <Button type="success" @click.native="asyncOK('uploadForm')" long>提交</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  props: {
    isSubmitBtn: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      uploadForm: {
        data: {
          file: '',
          fileType: '',
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
            { required: false, message: '请输入描述 or 备注', trigger: 'blur' },
            { type: 'string', min: 6, message: 'Introduce no less than 6 words', trigger: 'blur' }
          ]
        },
        fileList: []
      }
    }
  },
  methods: {
    asyncOK (name = 'uploadForm') {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
          // this.uploadModal = false
          this.$emit('success', this.uploadForm.data)
          this.uploadForm.data = {
            file: '',
            fileType: '',
            name: '',
            desc: ''
          }
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    fileSuccess (res, f, file) {
      console.log(res, f, file);
      this.uploadForm.data.file = file.name
      this.uploadForm.data.fileType = file.type
      this.uploadForm.fileList.push({
        name: file.name,
        url: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
