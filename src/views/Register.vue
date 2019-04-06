<template>
  <div class="register">
    <Row align="middle" type="flex" :style="{ minHeight: '600px' }">
      <Col :sm="8" :xs="2"></Col>
      <Col :sm="8" :xs="20">
        <Form class="register-form" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <Divider>注册课程学习系统</Divider>
          <FormItem label="用户名" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入你的真实姓名"></Input>
          </FormItem>
          <FormItem label="学号" prop="stuId">
            <Input v-model="formValidate.stuId" placeholder="请输入你的学号"></Input>
          </FormItem>
          <FormItem label="邮箱" prop="mail">
            <Input v-model="formValidate.mail" placeholder="请输入你的邮箱"></Input>
          </FormItem>
          <FormItem label="密码" prop="passwd">
            <Input type="password" v-model="formValidate.passwd" placeholder="请输入你的密码"></Input>
          </FormItem>
          <FormItem label="确认密码" prop="passwdCheck">
            <Input type="password" v-model="formValidate.passwdCheck" placeholder="请确认你的密码"></Input>
          </FormItem>
          <!-- <FormItem label="City" prop="city">
            <Select v-model="formValidate.city" placeholder="Select your city">
              <Option value="beijing">New York</Option>
              <Option value="shanghai">London</Option>
              <Option value="shenzhen">Sydney</Option>
            </Select>
          </FormItem> -->
          <!-- <FormItem label="Date">
            <Row>
              <Col span="11">
              <FormItem prop="date">
                <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
              </FormItem>
              </Col>
              <Col span="2" style="text-align: center">-</Col>
              <Col span="11">
              <FormItem prop="time">
                <TimePicker type="time" placeholder="Select time" v-model="formValidate.time"></TimePicker>
              </FormItem>
              </Col>
            </Row>
          </FormItem> -->
          <!-- <FormItem label="Gender" prop="gender">
            <RadioGroup v-model="formValidate.gender">
              <Radio label="male">Male</Radio>
              <Radio label="female">Female</Radio>
            </RadioGroup>
          </FormItem> -->
          <!-- <FormItem label="Hobby" prop="interest">
            <CheckboxGroup v-model="formValidate.interest">
              <Checkbox label="Eat"></Checkbox>
              <Checkbox label="Sleep"></Checkbox>
              <Checkbox label="Run"></Checkbox>
              <Checkbox label="Movie"></Checkbox>
            </CheckboxGroup>
          </FormItem> -->
          <!-- <FormItem label="Desc" prop="desc">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
          </FormItem> -->
          <FormItem :label-width=0>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
          </FormItem>
        </Form>
      </Col>
      <Col :sm="8" :xs="2"></Col>
    </Row>
  </div>
</template>
<script>
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your password'))
      } else {
        if (this.formValidate.passwdCheck !== '') {
          // 对第二个密码框单独验证
          console.log(this.$refs.formValidate)
          this.$refs.formValidate.validateField('passwdCheck')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your password again'))
      } else if (value !== this.formValidate.passwd) {
        callback(new Error('The two input passwords do not match!'))
      } else {
        callback()
      }
    }
    return {
      formValidate: {
        name: '',
        mail: '',
        stuId: '',
        // city: '',
        // gender: '',
        // interest: [],
        passwd: '',
        passwdCheck: ''
        // date: '',
        // time: '',
        // desc: ''
      },
      ruleValidate: {
        name: [{
          required: true,
          message: '用户名不能为空',
          trigger: 'blur'
        }],
        stuId: [{
          required: true,
          message: '学号不能为空',
          trigger: 'blur'
        }, {
          type: 'number',
          message: '学号格式不正确',
          trigger: 'blur'
        }],
        mail: [{
          required: true,
          message: '邮箱不能为空',
          trigger: 'blur'
        },
        {
          type: 'email',
          message: '邮箱格式错误',
          trigger: 'blur'
        }],
        passwd: [{
          required: true,
          validator: validatePass,
          trigger: 'blur'
        }],
        passwdCheck: [{
          required: true,
          validator: validatePassCheck,
          trigger: 'blur'
        }]
        // city: [{
        //   required: true,
        //   message: 'Please select the city',
        //   trigger: 'change'
        // }],
        // gender: [{
        //   required: true,
        //   message: 'Please select gender',
        //   trigger: 'change'
        // }],
        // interest: [{
        //   required: true,
        //   type: 'array',
        //   min: 1,
        //   message: 'Choose at least one hobby',
        //   trigger: 'change'
        // },
        // {
        //   type: 'array',
        //   max: 2,
        //   message: 'Choose two hobbies at best',
        //   trigger: 'change'
        // }],
        // date: [{
        //   required: true,
        //   type: 'date',
        //   message: 'Please select the date',
        //   trigger: 'change'
        // }],
        // time: [{
        //   required: true,
        //   type: 'string',
        //   message: 'Please select time',
        //   trigger: 'change'
        // }],
        // desc: [{
        //   required: true,
        //   message: 'Please enter a personal introduction',
        //   trigger: 'blur'
        // },
        // {
        //   type: 'string',
        //   min: 20,
        //   message: 'Introduce no less than 20 words',
        //   trigger: 'blur'
        // }]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          console.log(this.formValidate, this.ruleValidate)
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>
<style scoped lang="less" media="screen">
  .register-form {
    box-shadow: 1px 2px 8px #80808052;
    padding: 15px;
    border-radius: 4px;
  }
</style>
