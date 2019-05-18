<template>
  <div class="homework-upload">
    <Form ref="uploadForm" :model="uploadForm.data" :rules="uploadForm.rule" :label-width="80">
      <FormItem label="文件" prop="file">
        <Upload
          multiple
          type="drag"
          action="//localhost:3000/uploadFile"
          :on-success="fileSuccess"
          :on-error="fileSuccess"
          :on-remove="removeFile"
          :default-file-list="uploadForm.fileList"
        >
          <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击或拖动上传文件</p>
            <slot name='upload-desc'></slot>
          </div>
        </Upload>
      </FormItem>
      <FormItem label="标题" prop="name">
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
    },
    notice: {
      type: String,
      default: '作业提交成功'
    },
    submitUrl: {
      type: String,
      required: true
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
          // file: [
          //   { required: true, message: '请上传文件', trigger: 'blur' }
          // ],
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
          console.log(this.uploadForm.fileList);
          const filesArr = this.uploadForm.fileList.map((item) => {
            return {
              name: item.name,
              fileType: item.fileType,
              url: item.url
            }
          })
          // this.$Message.success('Success!')
          // console.log(this.$http.post);
          this.$http({
            method: 'post',
            url: this.submitUrl,
            data: {
              uri: Date.now(),
              name: this.uploadForm.data.name,
              content: this.uploadForm.data.desc,
              desc: this.uploadForm.data.desc,
              files: filesArr
            }
          }).then((res) => {
            
            console.log(res);
            
            this.$Notice.success({
              title: this.notice,
              desc: '可以休息一会儿啦~'
            })
            // this.uploadModal = false
            this.$emit('success', this.uploadForm.data)
            this.uploadForm.data = {
              file: '',
              fileType: '',
              name: '',
              desc: ''
            }
          })
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    removeFile (file, list) {
      this.uploadForm.fileList.splice(this.uploadForm.fileList.indexOf(file), 1)
    },
    fileSuccess (res, f, file) {
      console.log(res, f, file);
      this.uploadForm.data.file = res.name
      this.uploadForm.data.fileType = res.mimetype
      this.uploadForm.fileList.push({
        name: res.name,
        url: res.path,
        fileType: res.mimetype,
        uid: f.uid
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
