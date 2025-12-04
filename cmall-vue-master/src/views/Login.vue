<template>
  <div class="page-container">
    <div class="container">
      <div class="sidebar">
        <div class="logo">
          <img class="logo-img_require" src="../assets/imgs/require_2.png">
        </div>
        <div class="sidebar-top">
          <button :class="{ active: activeButton === 'demand' }" @click="handleDemandSide">我是需求方</button>
        </div>
        <div class="logo">
          <img class="logo-img_technology" src="../assets/imgs/technology.png">
        </div>
        <div class="sidebar-bottom">
          <button :class="{ active: activeButton === 'expert' }" @click="handleExpert">我是大牛</button>
        </div>
      </div>
      <div class="login">
        <el-card class="box-card">
          <div class="clearfix">
            <span>验证码或密码登录/注册</span>
          </div>
          <div class="item">
            <ul class="identity-tab">
              <li :class="{ active: loginType === 'phone' }" @click="loginType = 'phone'">手机号登录</li>
              <li :class="{ active: loginType === 'username' }" @click="loginType = 'username'">用户名登录</li>
              <div class="slider" :style="{ left: sliderLeft }"></div>
            </ul>
            <el-form :model="form" :rules="rules" ref="form">
              <el-form-item prop="phone" v-if="loginType === 'phone'">
                <div class="phone-input-wrapper">
                  <span class="dropdown-select" @click="toggleDropdown">
                    {{ selectedCountry }} <i class="fas fa-caret-down"></i>
                  </span>
                  <span class="ipt-wrap">
                    <input type="tel" v-model="form.phone" placeholder="手机号" class="phone-input"/>
                  </span>
                  <div class="dropdown-menu" v-show="isDropdownOpen">
                    <ul>
                      <li @click="selectCountry('+86')">
                        <span class="num">+86</span> 中国大陆
                      </li>
                      <li @click="selectCountry('+other')">
                        <span class="num"></span> 非中国大陆号
                      </li>
                    </ul>
                  </div>
                </div>
              </el-form-item>
              <el-form-item prop="user_name" v-if="loginType === 'username'">
                <el-input v-model="form.user_name" placeholder="用户名"></el-input>
              </el-form-item>
              <el-form-item prop="password" v-if="loginType !== 'phone'">
                <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
              </el-form-item>
              <el-form-item prop="sms_code" v-if="loginType === 'phone'">
                <el-input type="text" v-model="form.sms_code" placeholder="短信验证码" maxlength="6">
                  <template slot="suffix">
                    <div class="btn-sms" @click="sendSmsCode" :disabled="isCountingDown">
                      <span v-if="isCountingDown">{{ countdown }} 秒后重发</span>
                      <span v-else>发送验证码</span>
                  </div>
                  </template>
                </el-input>
              </el-form-item>
            </el-form>
            <div id="captcha">
              <p id="wait">正在加载验证码...</p>
            </div>
            <div style="margin-top:15px">
              <button type="submit" ka="signup_submit_button_click" class="sure-btn btn-gradient-login" @click="login('form')">登录</button>
            </div>
            <el-link type="primary" href="/#/register" style="float:right;margin-bottom:6px;margin-top:15px;">没有账号？请先注册></el-link>
          </div>
          <div class="line"></div>
          <div class="login-policy-wrapper">
            <span class="agree-policy-wrapper">
              <input type="checkbox" class="agree-policy" id="agree-policy-checkbox" ref="agree-policy-checkbox">
              <label for="agree-policy-checkbox"><i class="checkbox-edging"></i></label>
            </span> 已阅读并同意XW
            <a href="https://about.zhipin.com/agreement?id=registerprotocol" target="_blank" class="user-agreement">《用户协议》</a>
            <a href="https://about.zhipin.com/agreement?id=personalinfopro" target="_blank" class="user-agreement">《隐私政策》</a>,
            允许XW统一管理本人账号信息
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import * as userAPI from '@/api/users'

require('../assets/gt.js')
var captcha
export default {
  name: 'Login',
  data() {
    return {
      loginType: 'phone',
      sliderLeft: '0%',
      activeButton: 'demand', // 默认选中“我是需求方”
      form: {
        phone: '',
        user_name: '',
        password: '',
        sms_code: '',
        challenge: '',
        validate: '',
        seccode: ''
      },

      watch: {
        loginType(newVal) {
          this.updateSliderPosition(newVal);
        }
      },

      rules: {
        phone: [{ validator: this.validatePhone, trigger: 'blur' }],
        user_name: [{ validator: this.validateUser, trigger: 'blur' }],
        password: [{ validator: this.validatePass, trigger: 'blur' }],
        sms_code: [{ validator: this.validateSmsCode, trigger: 'blur' }]
      },
      isDropdownOpen: false,
      selectedCountry: '+86',
      countdown: 60,    // 倒计时初始值
      isCountingDown: false // 标识是否正在倒计时
    }
  },

  methods: {
    ...mapActions(['setUser']),
    login(formName) {
      if (!this.$refs[formName]) return;

      // 检查复选框是否选中
      if (!this.$refs['agree-policy-checkbox'].checked) {
        this.$message.error('请阅读并同意相关协议');
        return;
      }
      this.$refs[formName].validate(valid => {
        if (!valid) return
        var result = captcha.getValidate()
        if (!result) {
          this.notifyError('请验证', null)
          return
        }
        this.form.challenge = result.geetest_challenge
        this.form.validate = result.geetest_validate
        this.form.seccode = result.geetest_seccode
        userAPI.postLogin(this.form)
          .then(res => {
            if (res.status === 404) {
              this.notifyError('验证失败', res.msg)
            } else if (res.status === 200) {
              localStorage.setItem('user', JSON.stringify(res.data.user))
              localStorage.setItem('token', res.data.token)
              this.setUser(res.data.user)
              this.notifySucceed('登录成功')
              this.$router.push('/home')
            } else {
              this.notifyError('登录失败', res.msg)
            }
          })
          .catch(error => this.notifyError('登录失败', error))
      })
    },

    init_geetest() {
      userAPI.geetest().then(res => {
        window.initGeetest({
          gt: res.gt,
          challenge: res.challenge,
          new_captcha: res.new_captcha,
          offline: !res.success,
          product: 'popup',
          width: '100%'
        }, captchaObj => {
          captcha = captchaObj
          captchaObj.appendTo('#captcha')
          captchaObj.onReady(() => document.getElementById('wait').style.display = 'none')
        })
      })
    },

    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen
    },

    selectCountry(countryCode) {
      this.selectedCountry = countryCode
      this.isDropdownOpen = false
    },

    sendSmsCode() {
      if (!this.form.phone) {
        this.$message.error('请输入手机号');
        return;
      }
      if (!/^\d{11}$/.test(this.form.phone)) {
        this.$message.error('手机号格式不正确');
        return;
      }

      if (this.isCountingDown) return;

      // 发送请求到服务器以获取验证码
      userAPI.sendSmsCode(this.form.phone)
        .then(res => {
          if (res.status === 200) {
            this.$message.success('验证码已发送，请注意查收');
          } else {
            this.$message.error('验证码发送失败，请重试');
          }
        })
        .catch(error => {
          this.$message.error('验证码发送失败，请重试');
        });

        this.startCountdown();
    },

    startCountdown() {
      this.isCountingDown = true;
      this.countdown = 60;
      const interval = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          clearInterval(interval);
          this.isCountingDown = false;
        }
      }, 1000);
    },

    validateUser(rule, value, callback) {
      if (!value) return callback(new Error('请输入用户名'))
      if (value.length < 5 || value.length > 15) return callback(new Error('用户名长度需在5到15之间'))
      callback()
    },

    validatePass(rule, value, callback) {
      if (!value) return callback(new Error('请输入密码'))
      if (value.length < 8 || value.length > 16) return callback(new Error('密码长度需在8到16之间'))
      callback()
    },
    validatePhone(rule, value, callback) {
      if (!value) return callback(new Error('请输入手机号'))
      if (!/^\d{11}$/.test(value)) return callback(new Error('手机号格式不正确'))
      callback()
    },

    validateSmsCode(rule, value, callback) {
      if (!value) return callback(new Error('请输入短信验证码'))
      if (value.length !== 6) return callback(new Error('短信验证码长度应为6位'))
      callback()
    },

    updateSliderPosition(type) {
      this.sliderLeft = type === 'phone' ? '0%' : '50%';
    },

    handleDemandSide() {
      this.activeButton = 'demand';
      console.log('我是需求方');
    },
    handleExpert() {
      this.activeButton = 'expert';
      console.log('我是大牛');
    },
    notifyError(title, message) {
      this.$notify.error({
        title: title,
        message: message || '发生错误'
      });
    },

    notifySucceed(message) {
      this.$notify({
        title: '成功',
        message: message,
        type: 'success'
      });
    }
  },

  mounted() {
    this.init_geetest(),
    this.updateSliderPosition(this.loginType)
  }
}
</script>

<style scoped>
@import '../assets/css/button.css';
.text {
  font-size: 14px;
}

.item {
  margin: 0 auto;
  width: 360px;
  font-size: 14px;
}

.clearfix {
  font-size: 22px;
  margin-bottom: 20px;
}

.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: hsl(214, 41%, 97%);
  background-image: url('../assets/imgs/logo_background.png'); /* 添加背景图片 */
  background-size: cover; /* 使背景图片覆盖整个容器 */
  background-position: center; /* 使背景图片居中 */
  background-repeat: no-repeat; /* 防止背景图片重复 */
}

.container {
  width: 600px;
  height: 450px;
  max-height: 90vh;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.container:hover {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.sidebar {
  background-color: rgba(183, 210, 252, 0.984);
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  height: 100%; /* 确保侧边栏高度占满容器 */
}

.logo-img_require {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  margin-top: 100px; /* 与上边框间隔 */
}

.sidebar-top {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* 上下居中 */
  width: 100%; /* 各占一半宽度 */
  margin-top: 5px; /* 与上边框间隔 */
}

.logo-img_technology {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  margin-top: 50px; /* 与上边框间隔 */
}

.sidebar-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* 上下居中 */
  width: 100%; /* 各占一半宽度 */
  margin-top: 5px; /* 与上边框间隔 */
}

.sidebar button {     /* 设置侧框字体等 */
  background-color: rgba(183, 210, 252, 0.984);
  color:#303133;
  border: none;
  cursor: pointer;
  font-weight: bold; /* 使字体加粗 */
  transition: font-size 0.3s ease; /* 添加过渡效果使变化更平滑 */
  font-size: 15px; /* 设置默认字体大小 */
}

.sidebar button.active {
  color: #409EFF; /* 选中时字体颜色为蓝色 */
}

.sidebar button:hover {
  font-size: 14px; /* 鼠标悬停时字体变大 */
  color: #409EFF;
}

.login {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.box-card {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}

.box-card .line {
  height: 30px;
  width: 360px;
  margin: 10px auto;
  border-bottom: 1px solid #c0c0c0;
}

.box-card .logo {
  width: 360px;
  margin: 0 auto;
  height: 30px;
  display: flex;
  align-items: center;
}

.box-card .logo .logo-info {
  color: #757575;
  font-size: 15px;
}

.box-card .logo .logo-login {
  height: 15px;
  padding: 6px; /* 增加内边距 */
  border: 1px solid transparent; /* 添加透明边框 */
}

.sms-form-row {
  position: relative;
}

.phone-input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  height: 40px;
  transition: border-color 0.3s ease;
}

.phone-input-wrapper:focus-within {
  border-color: #409EFF;
}

.dropdown-select {
  cursor: pointer;
  height: 40px;
  width: 60px;
  margin-left: 10px;
}

.dropdown-select:hover {
  color: #409EFF;
}

.ipt-wrap {
  flex-grow: 1;
}

.phone-input-wrapper input {
  border: none;
  outline: none;
  width: 95%;
  padding: 0px 5px;
  height: 40px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  border-radius: 8px;
  background: white;
  border: 1px solid #cccccc;
  z-index: 10;
  font-size: 12px;
}

.dropdown-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-menu li {
  padding: 0px 10px;
  cursor: pointer;
}

.dropdown-menu li:hover {
  color: #409EFF;
}

.btn-sms {
  cursor: pointer;
  margin-right: 14px;
  color: #409EFF;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn-sms[disabled] {
  cursor: not-allowed;
  color: grey;
}

.btn-sms:hover {
  font-size: 13.5px;
}

.placeholder {
  color: #c0c4cc;
}

.phone-input {
  color: #606266; /* 设置输入内容颜色与 .el-input__inner 相同 */
}

.phone-input::placeholder {
  color: #c0c4cc; /* 设置占位符颜色与 .el-input__inner 相同 */
}

.hidden {
  display: none;
}

.custom-input .el-input__inner {
  padding-left: 80px;
}

.identity-tab {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  border-radius: 8px;
  height: 40px;
  background-color: #f2f4fa;
  position: relative; /* 使滑块可以绝对定位 */
}

.identity-tab li {
  flex: 1; /* 使 <li> 元素水平各占一半 */
  display: flex;
  align-items: center; /* 使字体上下居中 */
  justify-content: center; /* 使字体水平居中 */
  cursor: pointer;    /* 鼠标移到选项上时，鼠标样式 */
  border-radius: 4px;
  transition: color 0.3s ease; /* 只过渡颜色变化 */
  position: relative; /* 使滑块可以绝对定位 */
  margin-top: 3px; /* 使选项与边框间隔 */
  margin-left: 3px; /* 添加左外边距 */
  margin-right: 3px; /* 添加右外边距 */
  height: 34px;
}

.identity-tab li.active {
  background-color: white;
  color: #409EFF; 
}

.identity-tab li:hover {
  color: #409EFF; 
}

.identity-tab .slider {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background-color: #409EFF;
  transition: left 0.3s ease;
}

.btn-gradient-login {
  background-color: #0a74df;
  height: 40px;
  width: 360px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* 修改为 background-color */
  border: none; /* 移除默认的按钮边框 */
  color: white; /* 确保文本颜色为白色 */
  border-radius: 4px; /* 添加圆角 */
}

.btn-gradient-login:hover {
  background-color: #409EFF;
}

.login-policy-wrapper {
  text-align: left; /* 改为左对齐 */
  font-size: 14px; /* 设置字体大小 */
  width: 360px; /* 设置与其他内容相同的宽度 */
  margin-left: auto; /* 居中对齐开始 */
  margin-right: auto;
  line-height: 1.6; /* 增加行间距，可以根据需要调整 */
  color: #757575;
}

.agree-policy {
  vertical-align: middle; /* 垂直居中对齐 */
}

.checkbox-edging {
  display: inline-block; /* 使复选框框在同一行 */
  vertical-align: middle; /* 垂直居中对齐 */
}

.user-agreement {
  color: #0a74df; /* 设置链接颜色 */
  text-decoration: none; /* 移除下划线 */
}

.user-agreement:hover {
  text-decoration: underline; /* 悬停时显示下划线 */
}

</style>