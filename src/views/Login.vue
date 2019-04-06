<template>
  <div class="login" :style="{ minHeight: '980px' }">
    <Row align="middle" type="flex" :style="{ minHeight: '600px' }">
      <Col :sm="8" :xs="2"></Col>
      <Col :sm="8" :xs="20">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" class="login-form">
          <FormItem class="login-forn-title">
            <h2>
              <Icon type="md-bulb" :style="{ verticalAlign: 'baseline' }" />
              课程学习系统
            </h2>
          </FormItem>
          <Tabs>
              <TabPane label="用户登录">
                <FormItem prop="user">
                  <Input type="text" v-model="formInline.user" placeholder="用户名">
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <FormItem prop="password">
                  <Input type="password" v-model="formInline.password" placeholder="密码">
                  <Icon type="ios-lock-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
              </TabPane>
              <TabPane label="管理员登录" :style="{ marginLeft: '1px' }">
                <FormItem prop="user">
                  <Input type="text" v-model="formInline.user" placeholder="用户名">
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <FormItem prop="password">
                  <Input type="password" v-model="formInline.password" placeholder="密码">
                  <Icon type="ios-lock-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
              </TabPane>
          </Tabs>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
          </FormItem>
          <router-link :to="{ name: 'register', params: {} }">还没有账号？点这里注册啦</router-link>
        </Form>
      </Col>
      <Col :sm="8" :xs="2"></Col>
    </Row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [{
          required: true,
          message: 'Please fill in the user name',
          trigger: 'blur'
        }],
        password: [
          {
            required: true,
            message: 'Please fill in the password.',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 6,
            message: 'The password length cannot be less than 6 bits',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  }
}
</script>
<style scoped lang="less" media="screen">
  .login-form {
    box-shadow: 1px 2px 8px #80808052;
    padding: 15px;
    border-radius: 4px;
  }
</style>
