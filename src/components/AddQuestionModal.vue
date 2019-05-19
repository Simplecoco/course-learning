<template>
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
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
</style>
