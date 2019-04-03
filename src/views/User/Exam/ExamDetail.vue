<template lang="html">
  <div class="user-exam-detail content-container">
    <Card dis-hover>
      <p slot="title" class="exam-detail-title" @click="backToExam"><Icon type="md-arrow-back" size="20"/> 返回测验列表</p>
      <Divider>
        {{ this.examTitle }}
      </Divider>
      <!-- <Row :gutter="15">
        <Col span="8" v-for="item in cards">
          <Card class="exam-card" @click.native="openExamCard(item.eid)">
            <p slot="title">{{ item.title }}</p>
            <p>考试时间：{{ item.time }}</p>
          </Card>
        </Col>
      </Row> -->
    </Card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      eid: '',
      examTitle: ''
    }
  },
  mounted() {
    this.eid = this.$route.params.eid
    this.examTitle = this.$route.params.examTitle
  },
  methods: {
    backToExam() {
      this.$router.push({ name: 'exam' })
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
</style>
