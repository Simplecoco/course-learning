<template lang="html">
  <div class="user-exam-detail content-container">
    <Card dis-hover class="exam-detail-card">
      <p slot="title" class="exam-detail-title" @click="backToExam">
          <Icon type="md-arrow-back" size="20"/> 
          返回测验列表
      </p>
      <Divider>
        {{ this.examTitle }}
      </Divider>
      <Row :gutter="15" class-name="exam-detail-row">
        <Col span="5" class-name="exam-detail-col">
          <Card class="exam-detail-list-card" dis-hover>
            <div 
              class="exam-detail-list-card-item" 
              :class="item.status ? 'exam-detail-list-card-item-active' : ''" 
              v-for="(item, index) in questions"
              @click="toThisQuestion(item.id)"
            >
              {{ item.id }}
            </div>
          </Card>
        </Col>
        <Col span="19" class-name="exam-detail-col">
          <Card class="exam-detail-content-card" dis-hover>
            <Card class="exam-detail-content-card-content" dis-hover>
              <p class="exam-detail-content-card-content-question" >
                {{ this.nowId }}. <span v-html="this.current.title"></span>
              </p>
              <div class="exam-detail-content-card-content-options">
                <RadioGroup v-model="current.answer" vertical v-if="current.type === 'single'">
                  <Radio :label="item.text" v-for="item in current.options" size="large">
                  </Radio>
                </RadioGroup>
                <CheckboxGroup v-model="current.answer" v-for="item in current.options" size="large" v-if="current.type === 'multiple'">
                  <Checkbox :label="item.text" size="large"></Checkbox>
                </CheckboxGroup>
                <Input v-model="current.answer" size="large" type="textarea" :rows="4" placeholder="Enter something..." v-if="current.type === 'essay'"/>
              </div>
            </Card>
            <div class="exam-detail-content-card-footer">
              <Button type="success" class="exam-detail-content-card-footer-submit" @click.native="submitAnswer">
                提交测验
              </Button>
              <ButtonGroup>
                <Button type="primary" @click.native="toPre">
                  <Icon type="ios-arrow-back" />
                  上一题
                </Button>
                <Button type="primary" @click.native="toNext">
                  下一题
                  <Icon type="ios-arrow-forward" />
                </Button>
              </ButtonGroup>
            </div>
          </Card>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      eid: '',
      examTitle: '',
      nowId: '',
      current: {},
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
  // computed: {
  //   current() {
  //     return this.questions[this.nowId - 1]
  //   }
  // },
  watch: {
    nowId (val) {
      this.current = Object.assign({}, this.current, this.questions[val - 1])
    }
  },
  mounted () {
    if (!this.$route.params.examTitle || !this.$route.params.examTitle) {
      this.$router.push({ name: 'exam' })
    } else {
      this.eid = this.$route.params.eid
      this.examTitle = this.$route.params.examTitle
      this.nowId = 1
    }
  },
  methods: {
    backToExam () {
      this.saveAnswer()
      this.$Modal.confirm({
        title: '提示',
        content: '返回后信息可能将无法保存，确认返回吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          this.$router.push({ name: 'exam' })
        },
        onCancel: () => {
          console.log('取消');
        }
      });
    },
    toPre () {
      if (this.nowId - 1) {
        this.saveAnswer()
        this.nowId--
      }
    },
    toNext () {
      if (this.nowId + 1) {
        this.saveAnswer()
        this.nowId++
      }
    },
    toThisQuestion (id) {
      this.saveAnswer()
      this.nowId = id
    },
    saveAnswer () {
      if (this.current.answer !== 0 && this.current.answer.length !== 0 && this.current.answer.length !== '') {
        this.current.status = true
      } else {
        this.current.status = false
      }
      this.questions[this.nowId - 1] = Object.assign({}, this.questions[this.nowId - 1], this.current)
    },
    submitAnswer () {
      this.saveAnswer()
      this.$forceUpdate()
      this.$Modal.confirm({
        title: '提示',
        content: '提交后将不能再修改，确认提交吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          console.log(this.questions)
        },
        onCancel: () => {
          console.log('取消');
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>
  .exam-detail-title {
    text-align: left;
    font-size: 15px;
    cursor: pointer;
    &:hover {
      color: #2d8cf0;
    }
  }
  
  // .user-exam-detail.content-container {
  //   height: 100%;
  // }
  // 
  // .exam-detail-card {
  //   min-height: 100%;
  // }
  
  // .exam-detail-row {
  //   height: 400px;
  // }
  // 
  // .exam-detail-col {
  //   min-height: 100%;
  // }
  
  .exam-detail-list-card {
    min-height: 400px;
    // display: flex;
    text-align: left;
  }
  
  .exam-detail-list-card-item {
    display: inline-block;
    background: #8080808f;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    font-weight: 500;
    font-size: 18px;
    color: white;
    margin: 5px;
    text-align: center;
    cursor: pointer;
  }
  
  .exam-detail-list-card-item-active {
    background: rgb(135, 208, 104);
  }
  
  .exam-detail-content-card {
    min-height: 400px;
  }
  
  .exam-detail-content-card-content {
    height: 350px;
    overflow: scroll;
  }
  
  .exam-detail-content-card-content-question {
    text-align: left;
    margin-bottom: 15px;
    font-size: 20px;
  }
  
  .exam-detail-content-card-content-options {
    font-size: 18px;
    text-align: left;
    margin-left: 22px;
  }
  
  .exam-detail-content-card-footer {
    margin-top: 10px;
  }
  
  .exam-detail-content-card-footer-submit {
    float: left;
  }
</style>
