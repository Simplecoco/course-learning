<template>
    <div>
      <h4>选项</h4>
      <p v-if="row.type === 'single' || row.type === 'multiple'" v-for="(item, index) in row.options">
        <strong>{{ index + 1 }}</strong>
        <span> {{ item }}</span>
      </p>
      <p v-if="row.type === 'essay'">
        这题不是选择题，没有选项哦
      </p>
    </div>
</template>
<script>
export default {
  props: {
    row: Object
  }
};
</script>
<style scoped>
  .expand-row{
    margin-bottom: 16px;
  }
</style>