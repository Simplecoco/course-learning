<template lang="html">
  <div class="user-exam content-container">
      <Card dis-hover>
        <p slot="title" class="container-card-title"><Icon type="md-paper" size="20"/> 课程测验</p>
        <Row :gutter="15">
          <Col span="8" v-for="item in cards" :key="item.eid">
            <Card class="exam-card" @click.native="openExamCard(item)">
              <p slot="title">{{ item.title }}</p>
              <p>考试时间：{{ item.time }}</p>
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
      cards: [
        {
          title: 'xxxx测验 1',
          time: '2019-4-3',
          eid: 1
        },
        {
          title: 'xxxxx测验 2',
          time: '2019-4-3',
          eid: 2
        },
        {
          title: 'xxxx测验 3',
          time: '2019-4-3',
          eid: 3
        },
        {
          title: 'The standard card 4',
          time: '2019-4-3',
          eid: 4
        },
        {
          title: 'The standard card 5',
          time: '2019-4-3',
          eid: 5
        }
      ]
    }
  },
  methods: {
    openExamCard({ eid, title: examTitle }) {
      this.$router.push({ name: 'exam-detail', params: { eid, examTitle } })
    }
  }
}
</script>

<style lang="less" scoped>
  // .exam-title {
  //   text-align: left;
  //   font-size: 15px;
  // }
  
  .exam-card {
    cursor: pointer;
    margin-top: 15px;
  }
</style>
