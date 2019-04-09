<template lang="html">
  <div class="admin-exam-resource content-container">
      <Card dis-hover>
        <p slot="title" class="exam-title"><Icon type="md-create" size="20"/> 课程测验管理</p>
        <Row :gutter="15">
          <Col span="8" v-for="item in cards" :key="item.eid">
            <Card class="exam-card">
              <p slot="title">
                {{ item.title }} 
              </p>
              <p>考试时间：{{ item.time }}</p>
              <DatePicker 
                type="date" 
                placeholder="Select date" 
                style="width: 150px; margin-right: 15px" 
                :disabled="!item.isDatePicker"
                @on-change="(date) => {dateChange(date, item)}"
              >
              </DatePicker>
              <Tooltip content="修改考试时间" v-if="!item.isDatePicker">
                <Button size="small" @click.native="editDate(item)">
                  <Icon type="md-create" />
                </Button>
              </Tooltip>
              <Button v-else size="small" @click.native="submitDate(item)">
                <span >确定</span>
              </Button>
              <div slot="extra">
                <Tooltip content="是否开启考试">
                  <i-switch v-model="item.open" size="small" @on-change="switchExam" />
                </Tooltip>
                <Divider type="vertical" />
                <Tooltip content="编辑试题">
                  <Button shape="circle" size="small" @click.native="openExamCard(item)">
                    <Icon type="md-create" />
                  </Button>
                </Tooltip>
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
      switch1: false,
      cards: [
        {
          title: 'The standard card 1sldkfjksdjl',
          time: '2019-4-3',
          eid: 1,
          open: true,
          isDatePicker: false
        },
        {
          title: 'The standard card 2',
          time: '2019-4-3',
          eid: 2,
          open: false,
          isDatePicker: false
        },
        {
          title: 'The standard card 3',
          time: '2019-4-3',
          eid: 3,
          open: true,
          isDatePicker: false
        },
        {
          title: 'The standard card 4',
          time: '2019-4-3',
          eid: 4,
          open: false,
          isDatePicker: false
        },
        {
          title: 'The standard card 5',
          time: '2019-4-3',
          eid: 5,
          open: false,
          isDatePicker: false
        }
      ]
    }
  },
  methods: {
    openExamCard ({ eid, title: examTitle }) {
      this.$router.push({ name: 'exam-resource-detail', params: { eid, examTitle } })
    },
    switchExam (val) {
      console.log(val);
    },
    editDate (item) {
      item.isDatePicker = true
    },
    dateChange (date, item) {
      console.log(date, item);
      item.tmpDate = `${date}`
    },
    submitDate (item) {
      item.isDatePicker = false
      if (item.tmpDate) {
        // 发请求
        item.time = item.tmpDate
        // 写法可优化
      }
    } 
  }
}
</script>

<style lang="less">
  .admin-exam-resource {
    .exam-title {
      text-align: left;
      font-size: 15px;
      width: 100%;
      display: block;
    }
    
    .exam-card {
      cursor: pointer;
      margin-top: 15px;
    }
    
    // .exam-card-title-btn {
    //   float: right;
    // }
    // 
    // .exam-card-title-icon {
    //   float: right;
    // }
    
    .ivu-card-head {
      text-align: left;
    }
    
    .ivu-card-head p, .ivu-card-head-inner {
      // float: left;
      // text-align: left;
      width: 68%;
    }
  }
</style>
