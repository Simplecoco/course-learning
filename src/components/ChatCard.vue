<template>
  <div class="chat-card">
    <div class="chat-content">
      <Card style="max-height: 100%; overflow: scroll">
        <Divider orientation="left">
          <Avatar
            style="color: white; background-color: #2d8cf0; font-weight: bold; font-size: 17px"
          >
            L
          </Avatar>
          Left Text
        </Divider>
        <p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>
        <Divider orientation="right">
          Right Text
          <Avatar
            style="color: white; background-color: #2d8cf0; font-weight: bold; font-size: 17px"
          >
            R
          </Avatar>
        </Divider>
        <p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>
      </Card>
    </div>
    <div class="chat-input">
      <Input search enter-button="发送" placeholder="Enter something..." />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
  .ivu-divider-horizontal.ivu-divider-with-text-left, .ivu-divider-horizontal.ivu-divider-with-text-right {
    margin: 10px 0;
  }

  .chat-content {
    height: 450px;
  }

  .chat-input {
    margin-top: 15px;
  }
</style>
