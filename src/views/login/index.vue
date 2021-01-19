<template>
  <div class="choose-login">
    <div class="top">
      <div class="header">
        <el-link href="http://www.baidu.com" :underline="false">
          <img src="../../assets/logo.png" class="img-logo" alt="logo">
          <span class="title">绿洲Oasis</span>
        </el-link>
      </div>
      <p class="desc">来绿洲发现美好世界～</p>
      <el-row>
        <el-button style="width: 350px" size="large" type="primary" @click="sina_login()">请使用新浪口袋扫描登录</el-button>
      </el-row>
      <el-button type="text" class="other-login" @click="dialogFormVisible = true">外包员工及实习生登录</el-button>
      <el-dialog
        title="登录"
        center
        width="400px"
        :visible.sync="dialogFormVisible"
      >
        <el-form
          ref="dataForm"
          class="dialog_form"
          :rules="rules"
          :model="login_form"
        >
          <el-form-item
            label="手机号:"
            :label-width="formLabelWidth"
            prop="phone"
          >
            <el-input v-model="login_form.phone" style="width: 200px" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码:" :label-width="formLabelWidth" prop="password">
            <el-input v-model="login_form.password" style="width: 200px" type="password" autocomplete="off" />
          </el-form-item>
        </el-form>
        <el-row style="padding-left: 125px">
          <!--          <el-button type="primary" size="small" style="width: 150px" @click="dialogFormVisible = false">登 陆</el-button>-->
          <el-button type="primary" size="small" style="width: 150px" @click="logins()">登 陆</el-button>
        </el-row>
        <el-row style="padding-left: 22%; margin-top: 15px">
          <a class="text-tips">忘记密码？联系fangjie3@staff.weibo.com</a>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      title: '绿洲Oasis',
      redirect: undefined,
      loading: false,
      background_image: 'https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg',
      dialogFormVisible: false,
      formLabelWidth: '120px',
      login_form: {
        phone: '',
        password: ''
      },
      rules: {
        phone: [
          {
            required: true, message: '请输入手机号', trigger: 'blur'
          }
        ],
        password: [
          {
            required: true, message: '请输入密码', trigger: 'blur'
          }
        ]
      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    },
    // data:'dialogFormVisible'
    init() {
      if (this.dialogFormVisible) {
        this.rules = {}
        this.login_form = {}
      }
    }
  },
  methods: {
    logins() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$store.dispatch('user/login', this.login_form).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          })
          // const loginData = this.login_form
          // user_login(loginData).then(res => {
          //   const _data = res.data
          //   if (_data.status === 'SUCCEED') {
          //     const token = _data.data['token']
          //     // 存储token
          //     this.$cookies.set('token', token, '100s') // vue-cookie
          //     // 登录成功，页面跳转
          //     this.$message.success('登录成功')
          //     // this.$router.push({path: ''})
          //     setTimeout(() => {
          //       this.$router.push('/home')
          //     }, 1500)
          //   } else if (_data.status === 'FAILED') {
          //     this.$message.error(_data.errorMessage)
          //   }
          // })
        }
      })
      console.log('login is:')
    },
    sina_login() {
      this.$message.error('抱歉，暂未开放')
    }
  }
}
</script>

<style scoped>
  .choose-login {
    background: #f0f2f5;
    background-image: url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg');
    width: 100%;
    min-height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    padding: 110px 0 144px 0;
    position: relative;
  }
  .top {
    text-align: center;
  }
  .header {
    height: 44px;
    line-height: 44px;
  }
  a {
    text-decoration: none;
  }
  .img-logo {
    height: 44px;
    vertical-align: top;
    margin-right: 16px;
  }
  .title {
    font-size: 33px;
    color: rgba(0, 0, 0, 0.85);
    font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
    font-weight: 600;
    position: relative;
    top: 2px;
  }

  .desc {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    margin-top: 12px;
    margin-bottom: 40px;
  }

  .other-login {
    margin-top: 20px;
  }

  .text-tips {
    font-size: 11px;
  }

</style>

<!--
<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="phone">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="phone"
          v-model="loginForm.phone"
          placeholder="Username"
          name="phone"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

      <div class="tips">
        <span style="margin-right:20px;">phone: admin</span>
        <span> password: any</span>
      </div>

    </el-form>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        phone: '',
        password: ''
      },
      loginRules: {
        phone: [{ required: true, trigger: 'blur', message: '请输入手机号' }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          console.log('123')
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
-->
