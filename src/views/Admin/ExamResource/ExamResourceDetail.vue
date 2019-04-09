<template lang="html">
  <div class="admin-exam-resource-detail content-container">
    <Card dis-hover class="exam-detail-card">
      <p slot="title">{{ this.examTitle }}</p>
      <p slot="extra" class="exam-detail-title" @click="backToExam">
          <Icon type="md-arrow-back" size="20"/> 
          返回测验列表
      </p>
      <div class="upload-button-container">
        
        <Button icon="md-add" :style="{ marginRight: '20px', float: 'left' }" @click="uploadModal = true">
          快速添加
        </Button>
        
        <!-- <Button size="large" icon="md-search" type="primary" :style="{ marginRight: '20px' }" @click="uploadModal = true">
          从题库中搜索
        </Button> -->
        
        <!-- 从题库中添加的搜索框 -->
        <!-- <AutoComplete
          v-model="searchValue"
          icon="md-search"
          :data="searchResultArr"
          placeholder="从题库中搜索添加"
          style="width:300px"
          @on-search="OnSearch"
          :filter-method="filterMethod"
        >
          <div class="demo-auto-complete-item">
            <Option v-for="option in searchResult" :value="option.title" :key="option.title">
              <span class="demo-auto-complete-title">{{ option.title }}</span>
              <Button size="small" class="demo-auto-complete-count">添加</Button>
            </Option>
          </div>
        </AutoComplete> -->
        
        <Select
          v-model="selectedArr"
          transfer
          placement="bottom"
          placeholder="请从题库中搜索添加(可多选)"
          style="width: 500px"
          multiple
          filterable
          remote
          :remote-method="remoteMethod"
          :loading="selectLoading"
        >
          <Option v-for="(option, index) in options2" :value="option.value" :key="index">
            {{option.label}}
          </Option>
        </Select>
        
        <Button type="primary" icon="md-add" :style="{ marginLeft: '20px' }" @click="submitSearchResult">
          确认添加
        </Button>
        
      </div>
      <Table stripe :columns="questionsColumn" :data="questionsData">
        <template slot-scope="{ row, index }" slot="action">
          <!-- <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button> -->
          <Button type="primary" size="small" style="margin-right: 5px" @click="edit(index)">编辑</Button>
          <Button type="error" size="small" @click="remove(index)">删除</Button>
        </template>
      </Table>
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
export default {
  data () {
    return {
      eid: '',
      examTitle: '',
      selectedArr: [],
      selectLoading: false,
      options2: [],
      list: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming'],
      uploadModal: false,
      questionsColumn: [{
        title: '序号',
        key: 'id'
      },
      {
        title: '题目',
        key: 'title'
      },
      {
        title: '类型',
        key: 'type'
      },
      {
        title: 'Action',
        slot: 'action',
        width: 170,
        align: 'center'
      }],
      questionsData: [
        {
          id: 1,
          type: 'single',
          title: 'ssssss1111',
          options: [
            {
              text: 'Apple'
            },
            {
              text: 'Android'
            },
            {
              text: 'Windows'
            }
          ],
          status: false,
          answer: 0,
        },
        {
          id: 2,
          type: 'multiple',
          title: 'ssssss2222',
          options: [
            {
              text: 'Apple2'
            },
            {
              text: 'Android2'
            },
            {
              text: 'Windows2'
            },
          ],
          status: false,
          answer: []
        },
        {
          id: 3,
          type: 'essay',
          title: 'ssssss3333',
          status: false,
          answer: ''
        },
        {
          id: 4,
          type: 'essay',
          title: 'ssssss',
          status: false,
          answer: ''
        },
        {
          id: 5,
          type: 'essay',
          title: 'ssssss',
          status: false,
          answer: ''
        },
        {
          id: 6,
          type: 'essay',
          title: 'ssssss',
          status: false,
          answer: ''
        },
        {
          id: 7,
          type: 'essay',
          title: 'ssssss',
          status: false,
          answer: ''
        },
        {
          id: 8,
          type: 'essay',
          title: 'ssssss',
          status: false,
          answer: ''
        },
        {
          id: 9,
          type: 'essay',
          title: 'ssssss',
          status: false,
          answer: ''
        },
      ],
      // searchResult: [
      //   {
      //     id: '1232',
      //     title: 'question11111',
      //     desc: 'hhhhhh1111',
      //   },
      //   {
      //     id: '12322',
      //     title: 'question22222',
      //     desc: 'hhhhh22222',
      //   },
      //   {
      //     id: '12325',
      //     title: 'question33333',
      //     count: 'hhhhh33333',
      //   }
      // ],
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
  // computed: {
  //   searchResultArr () {
  //     return this.searchResult.map((item) => {
  //       return item.title
  //     })
  //   }
  // },
  mounted () {
    if (!this.$route.params.eid || !this.$route.params.examTitle) {
      this.$router.push({ name: 'exam-resource' })
    } else {
      this.eid = this.$route.params.eid
      this.examTitle = this.$route.params.examTitle
      this.nowId = 1
    }
  },
  methods: {
    backToExam () {
      // this.saveAnswer()
      this.$router.push({ name: 'exam-resource' })
    },
    // filterMethod (value, option) {
    //   return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
    // },
    // OnSearch(val) {
    //   console.log(val);
    // },
    remoteMethod (query) {
      if (query !== '') {
        this.selectLoading = true;
        setTimeout(() => {
          this.selectLoading = false;
          const list = this.list.map(item => {
            return {
              value: item,
              label: item
            };
          });
          this.options2 = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
        }, 200);
      } else {
        this.options2 = [];
      }
    },
    submitSearchResult () {
      console.log('submitSearchResult');
      console.log(this.selectedArr);
    },
    remove (index) {
      this.questionsData.splice(index, 1)
    },
    edit (index) {
      console.log(this.questionsData[index].type);
      this.uploadModal = true
      const optionItems = (this.questionsData[index].type === 'single' || this.questionsData[index].type === 'multiple') ? this.questionsData[index].options.map((item, i) => {
        return {
          value: item.text,
          index: i + 1,
          status: 1
        }
      }) : []
                          
      this.uploadForm.data = Object.assign({}, this.uploadForm.data, {
        name: this.questionsData[index].title,
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
  .exam-detail-title {
    // text-align: left;
    font-size: 15px;
    cursor: pointer;
    &:hover {
      color: #2d8cf0;
    }
  }
  
  .upload-button-container {
    text-align: right;
    margin-bottom: 15px;
  }
  
  .demo-auto-complete-title {
    float: left;
    display: inline-block;
    width: 40%;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .ivu-select-item {
    overflow: hidden;
    max-width: 500px;
    text-overflow: ellipsis;
    white-space: nowrap;
    // font-size: 16px !important;
    // vertical-align: middle;
  }
  
  // .exam-resource-card-search-option-btn {
  //   float: right;
  // }
</style>
