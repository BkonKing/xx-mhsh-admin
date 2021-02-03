<template>
  <div class="login">
    <div class="mid">
      <div class="left">
        <div class="top">
          <img src="@/assets/imgs/logo.png"
               alt="">
        </div>
        <div class="bottom">
          美好生活家园后台系统
        </div>
      </div>
      <div class="right">
        <div class="title">欢迎登陆</div>
        <a-form-model class="form"
                      :model='form'
                      ref="form"
                      :rules='rules'
                      :label-col="labelCol"
                      :wrapper-col="wrapperCol">
          <a-form-model-item prop='account'>
            <a-input style="width:380px"
                     v-model="form.account"
                     placeholder="用户名">
              <template #suffix>
                <img v-if="form.account==''"
                     src="@/assets/imgs/user1.png"
                     alt="">
                <img v-else
                     src="@/assets/imgs/user2.png"
                     alt="">
              </template>
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop='password'>
            <a-input style="width:380px"
                     type='password'
                     v-model="form.password"
                     placeholder="密码">
              <template #suffix>
                <img v-if="form.password==''"
                     src="@/assets/imgs/pwd1.png"
                     alt="">
                <img v-else
                     src="@/assets/imgs/pwd2.png"
                     alt="">
              </template>
            </a-input>
          </a-form-model-item>
          <a-form-model-item>
            <a-button style="width:380px"
                      block
                      :class={active:!bol}
                      :disabled="!bol"
                      type='primary'
                      @click="login">
              提交
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
    </div>
  </div>
</template>

<script>
// import { login } from '@/api/user.js'
export default {
  data () {
    return {
      loading: true,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        account: '',
        password: ''
      },
      rules: {
        account: [{ required: true, message: '请输入用户名', trigger: 'change' }],
        password: [{ required: true, message: '请输入密码', trigger: 'change' }]
      }
    }
  },
  computed: {
    bol () {
      return this.form.account && this.form.password
    }
  },
  methods: {
    login () {
      this.$refs.form.validate(async result => {
        if (result) {
          this.$message.success('登录成功')
        } else {
          this.$message.error('验证失败')
        }
      })
    }
  }
}
</script>

<style lang='less'>
.login {
  height: 100%;
  background: url("~@/assets/imgs/bg.png");
  display: flex;
  align-items: center;
  justify-content: center;
  .mid {
    width: 860px;
    height: 500px;
    // background-color: #fff;
    display: flex;
    align-items: center;
    .left {
      height: 100%;
      width: 360px;
      // background-color: pink;
      background: url("~@/assets/imgs/bg2.png");
      .top {
        margin-top: 60px;
        text-align: center;
      }
      .bottom {
        margin-top: 224px;
        text-align: center;
        color: white;
        font-size: 18px;
      }
    }
    .right {
      flex: 1;
      height: 100%;
      background-color: #fff;
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
      padding-left: 60px;
      .title {
        margin-top: 94px;
        font-size: 24px;
        line-height: 56px;
        &::after {
          content: "";
          display: block;
          width: 60px;
          height: 6px;
          background-color: #348fe2;
        }
      }
      .form {
        margin-top: 60px;
        .active {
          background-color: #85bcee;
          border: 1px solid #85bcee;
          color: white;
        }
      }
    }
  }
}
</style>
