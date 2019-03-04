<template>
  <div class="notice-card">
    <Card style="max-height: 100%; overflow: scroll">
      <!-- <Divider orientation="left">
        <Icon size="25" type="md-list-box" style="vertical-align: top" color="#2d8cf0" />
        公告 & 信息
      </Divider> -->
      <p slot="title">
          <Icon type="md-list-box"></Icon>
          公告 & 信息
      </p>
      <ul>
          <li class="notice-li" v-for="item in noticeList" :key="item.uri">
              <a class="notice-title" :title="item.name" :href="item.url" target="_blank">{{ item.name }}</a>
              <span class="motice-date" style="float: right">
                  {{ item.date }}
              </span>
          </li>
      </ul>
    </Card>
  </div>
</template>

<script>
export default {
  props: {
    noticeList: {
      type: Array,
      default: function () {
        return [
          {
            uri: 1,
            name: 'test1',
            date: '2019-3-4'
          },
          {
            uri: 2,
            name: 'test2',
            date: '2019-3-4'
          },
          {
            uri: 3,
            name: 'test3',
            date: '2019-3-4'
          }
        ]
      }
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="less">
  .notice-li {
    list-style: none;
    text-align: left;
  }

  .notice-title {
    display: inline-block;
    max-width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .notice-date {
    float: right;
  }
</style>
