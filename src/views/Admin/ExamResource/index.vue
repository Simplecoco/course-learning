<template lang="html">
  <div class="admin-exam-resource content-container">
      <Card dis-hover>
        <p slot="title" class="exam-title"><Icon type="md-paper" size="20"/> 课程测验管理</p>
        <Row :gutter="15">
          <Col span="8" v-for="item in cards" :key="item.eid">
            <Card class="exam-card">
              <p slot="title">
                {{ item.title }} 
              </p>
              <p>考试时间：{{ item.time }}</p>
              <div slot="extra">
                <i-switch v-model="item.open" size="small" @on-change="switchExam" />
                <Divider type="vertical" />
                <Button shape="circle" size="small" @click.native="openExamCard(item)">
                  <Icon type="md-create" />
                </Button>
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
          open: true
        },
        {
          title: 'The standard card 2',
          time: '2019-4-3',
          eid: 2,
          open: false
        },
        {
          title: 'The standard card 3',
          time: '2019-4-3',
          eid: 3,
          open: true
        },
        {
          title: 'The standard card 4',
          time: '2019-4-3',
          eid: 4,
          open: false
        },
        {
          title: 'The standard card 5',
          time: '2019-4-3',
          eid: 5,
          open: false
        }
      ]
    }
  },
  methods: {
    openExamCard({ eid, title: examTitle }) {
      this.$router.push({ name: 'exam-resource-detail', params: { eid, examTitle } })
    },
    switchExam(val) {
      console.log(val);
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
