<template lang="html">
  <div class="admin-question-bank content-container">
    
    <Card dis-hover>
      <p slot="title" class="container-card-title"><Icon type="md-albums" size="20"/> 题库管理</p>
      <div class="upload-button-container">
        <Button size="large" icon="md-cloud-upload" type="primary" :style="{ marginRight: '20px' }" @click="uploadModal = true">
          添加题目
        </Button>
      </div>
      
      <div class="admin-question-bank-table">
        <Table :columns="questionsColumn" :data="questionsData" stripe size="small">
          <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <!-- <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button> -->
            <Button type="primary" size="small" style="margin-right: 5px" @click="edit(index)">编辑</Button>
            <Button type="error" size="small" @click="remove(index)">删除</Button>
          </template>
        </Table>
      </div>
    </Card>
    
    <Modal
      :value="uploadModal"
      title="添加题目"
      :closable="false"
      :mask-closable="false"
    >
      <Form ref="uploadForm" :model="uploadForm.data" :rules="uploadForm.rule" :label-width="80">
        <FormItem label="题目" prop="name">
          <Input v-model="uploadForm.data.name" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="类型" prop="type">
          <RadioGroup v-model="uploadForm.data.type">
            <Radio label="single">single</Radio>
            <Radio label="multiple">multiple</Radio>
            <Radio label="essay">essay</Radio>
          </RadioGroup>
        </FormItem>
        
        <FormItem
          v-for="(item, index) in uploadForm.data.items"
          v-if="item.status"
          :key="index"
          :label="'选项 ' + item.index"
          :prop="`items.${index}.value`"
          :rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}"
          v-show="uploadForm.data.type === 'single' || uploadForm.data.type === 'multiple'"
        >
          <Row>
            <Col span="18">
              <Input type="text" v-model="item.value" placeholder="Enter something..."></Input>
            </Col>
            <Col span="4" offset="1">
              <Button @click="handleRemove(index)">Delete</Button>
            </Col>
          </Row>
        </FormItem>
        
        <FormItem v-show="uploadForm.data.type === 'single' || uploadForm.data.type === 'multiple'">
          <Row>
            <Col span="12">
              <Button type="dashed" long @click="handleAdd" icon="md-add">Add item</Button>
            </Col>
          </Row>
        </FormItem>
                
        <FormItem label="描述" prop="desc">
          <Input v-model="uploadForm.data.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
      </Form>
      <template slot="footer">
        <Button type="default" style="margin-right: 5px" @click="cancelModal">取消</Button>
        <Button type="primary" @click="asyncOK('uploadForm')">确定</Button>
      </template>
    </Modal>
  </div>
</template>

<script>
import ExpandRow from '@/components/ExpandRow.vue'

export default {
  data () {
    return {
      uploadModal: false,
      uploadLoading: true,
      questionsColumn: [
      {
        type: 'expand',
        width: 30,
        render: (h, params) => {
          return h(ExpandRow, {
            props: {
              row: params.row
            }
          })
        }
      },
      {
        title: '题目',
        slot: 'name'
      },
      {
        title: '类型',
        key: 'type'
      },
      {
        title: '描述',
        key: 'desc'
      },
      {
        title: 'Action',
        slot: 'action',
        width: 170,
        align: 'center'
      }],
      questionsData: [{
        name: 'John Brown',
        qid: 1,
        type: 'single',
        options: ['dddd', 'sdfdsf', 'eeeeee'],
        desc: 'New York No. 1 Lake Park'
      },
      {
        name: 'Jim Green',
        qid: 2,
        type: 'multiple',
        options: ['dddd2', 'sdfdsf2', 'eeeeee2'],
        desc: 'New York No. 1 Lake Park'
      },
      {
        name: 'Joe Black',
        qid: 3,
        type: 'essay',
        desc: 'New York No. 1 Lake Park'
      },
      {
        name: 'Jon Snow',
        qid: 4,
        type: 'essay',
        desc: 'New York No. 1 Lake Park'
      }],
      uploadForm: {
        data: {
          name: '',
          type: '',
          desc: '',
          index: 1,
          items: [
            {
              value: '',
              index: 1,
              status: 1
            }
          ]
          // formDynamic: {
          //   index: 1,
          //   items: [
          //     {
          //       value: '',
          //       index: 1,
          //       status: 1
          //     }
          //   ]
          // },
        },
        rule: {
          name: [
            { required: true, message: '题目不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '类型不能为空', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
            { type: 'string', min: 6, message: 'Introduce no less than 6 words', trigger: 'blur' }
          ]
        }
      }
    }
  },
  components: { ExpandRow },
  methods: {
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.questionsData[index].name}<br>Description：${this.questionsData[index].desc}`
      })
    },
    remove (index) {
      this.questionsData.splice(index, 1)
    },
    edit (index) {
      console.log(this.questionsData[index].type);
      this.uploadModal = true
      const optionItems = (this.questionsData[index].type === 'single' || this.questionsData[index].type === 'multiple') ? this.questionsData[index].options.map((item, i) => {
        return {
          value: item,
          index: i + 1,
          status: 1
        }
      }) : []
                          
      this.uploadForm.data = Object.assign({}, this.uploadForm.data, {
        name: this.questionsData[index].name,
        desc: this.questionsData[index].desc,
        type: this.questionsData[index].type,
        index: 1,
        items: optionItems
      })
    },
    cancelModal () {
      this.uploadForm.data = {
        name: '',
        type: '',
        desc: '',
        index: 1,
        items: [
          {
            value: '',
            index: 1,
            status: 1
          }
        ]
      }
      console.log(this.uploadForm.data);
      this.uploadModal = false
    },
    handleAdd () {
      this.uploadForm.data.index++
      this.uploadForm.data.items.push({
        value: '',
        index: this.uploadForm.data.index,
        status: 1
      })
    },
    handleRemove (index) {
      this.uploadForm.data.items[index].status = 0
    },
    asyncOK (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          console.log(this.uploadForm.data);
          this.$Message.success('Success!')
          this.uploadModal = false
          this.uploadForm.data = Object.assign({}, this.uploadForm.data, {
            name: '',
            desc: '',
            type: '',
            index: 1,
            items: [
              {
                value: '',
                index: 1,
                status: 1
              }
            ]
          })
        } else {
          console.log('fail')
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

  .admin-question-bank-table {
    margin-top: 15px;
  }
</style>
