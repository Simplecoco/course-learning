<template lang="html">
  <div class="admin-exam-resource-detail content-container">
    <Card dis-hover class="exam-detail-card">
      <p slot="title">{{ this.examTitle }}</p>
      <p slot="extra" class="exam-detail-title" @click="backToExam">
          <Icon type="md-arrow-back" size="20"/> 
          返回测验列表
      </p>
      <Table stripe :columns="questionsColumn" :data="questions">
        <template slot-scope="{ row, index }" slot="action">
          <!-- <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button> -->
          <Button type="primary" size="small" style="margin-right: 5px" @click="edit(index)">编辑</Button>
          <Button type="error" size="small" @click="remove(index)">删除</Button>
        </template>
      </Table>
    </Card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      eid: '',
      examTitle: '',
      questionsColumn: [{
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
      questions: [
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
      ]
    }
  },
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
      this.$Modal.confirm({
        title: '提示',
        content: '返回后信息可能将无法保存，确认返回吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          this.$router.push({ name: 'exam-resource' })
        },
        onCancel: () => {
          console.log('取消');
        }
      });
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
</style>
