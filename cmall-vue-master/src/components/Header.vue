<template>
  <el-header class="fixed-header">
    <div class="header-container">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="14">
          <div class="grid-content bg-purple">
            <ul class="custom-menu">
              <li class="logo">
                <router-link to="/">
                  <img
                    src="../assets/imgs/mylogo.png"
                    alt=""
                    class="logo-image"
                  />
                </router-link>
              </li>
              <li
                v-for="item in menuItems"
                :key="item.index"
                :class="{ active: activeIndex === item.index }"
              >
                <a @click.prevent="handleNavClick(item)">{{ item.label }}</a>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple-light">
            <ul class="custom-menu">
              <li>
                <el-input
                  class="input-box"
                  placeholder="请输入搜索内容"
                  v-model="search"
                >
                  <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="searchClick"
                  ></el-button>
                </el-input>
              </li>
              <li class="font">
                <a @click.prevent="handleNavClick({ index: '/sendorder', label: '发需求' })">发需求</a>
              </li>
              <li class="font">
                <a @click.prevent="handleNavClick({ index: '/takeorder', label: '接任务' })">接任务</a>
              </li>
              <li :class="getNum > 0 ? 'shopCart-full' : 'shopCart'">
                <div style="margin-top: 0px">
                  <a @click.prevent="handleNavClick({ index: '/cart', label: '消息' })">
                    <i class="el-icon-shopping-cart-full"></i>
                    消息
                    <span>({{ getNum }})</span>
                  </a>
                </div>
              </li>
              <li v-if="!this.$store.getters.getUser">
                <div style="font-size: 14px">
                  <router-link to="/login">登录/注册</router-link>
                </div>
              </li>
              <li v-else class="header-user-con">
                <!-- 用户头像 -->
                <div class="user-avator">
                  <!-- <img :src="this.$store.getters.getUser.avatar" /> -->
                  <img src="test_imgs/logo_user.png" />
                </div>
                <!-- 用户名下拉菜单 -->
                <div class="user-name">
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      {{ this.$store.getters.getUser.nickname }}
                      <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <a
                        href="https://github.com/congz666/cmall-go"
                        target="_blank"
                      >
                        <el-dropdown-item>项目仓库</el-dropdown-item>
                      </a>
                      <router-link to="/center">
                        <el-dropdown-item>个人中心</el-dropdown-item>
                      </router-link>
                      <a @click="logout">
                        <el-dropdown-item>退出登录</el-dropdown-item>
                      </a>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-header>
  <!-- 顶部导航栏END -->
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import * as cartsAPI from '@/api/carts'
import * as userAPI from '@/api/users'
import authMixin from '@/mixins/authMixin'

export default {
  name: 'Header',
  mixins: [authMixin],
  beforeUpdate() {
    this.activeIndex = this.$route.path
  },
  data() {
    return {
      activeIndex: '',
      search: '',
      activeName: 'first',
      menuItems: [
        { index: '/home', label: '首页' },
        { index: '/recommends', label: '推荐' },
        { index: '/about', label: '需求栏' },
        { index: '/goods', label: '提问栏' },
        { index: '/goods', label: '游戏栏' },
        { index: '/goods', label: '社区' },
      ],
    }
  },
  beforeCreate() {
    document.body.style.background = '#f5f5f5'
  },
  created() {
    userAPI.checkToken(localStorage.getItem('token')).then((res) => {
      if (res.status === 200) {
        this.setUser(JSON.parse(localStorage.getItem('user')))
      } else {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      }
    })
    this.activeName = 'first'
  },
  computed: {
    ...mapGetters(['getUser', 'getNum']),
    key() {
      return this.$route.path + Math.random()
    }
  },
  watch: {
    getUser(val) {
      if (!val) {
        this.setShoppingCart([])
      } else {
        cartsAPI.showCarts(val.id).then((res) => {
          if (res.status === 200) {
            this.setShoppingCart(res.data || [])
          } else if (res.status === 20001) {
            this.loginExpired(res.msg)
          } else {
            this.$notify.error({
              title: '购物车获取失败',
              message: res.msg,
            })
          }
        }).catch(err => Promise.reject(err))
      }
    },
  },
  methods: {
    ...mapActions(['setUser', 'setShoppingCart']),
    login() {
      this.$router.push({ name: 'Login' })
    },
    logout() {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      this.setUser('')
      // 退出后统一返回欢迎页
      this.$router.push({ name: 'Welcome' })
      this.notifySucceed('登出成功')
    },
    register() {
      this.$router.push({ name: 'Register' })
    },
    searchClick() {
      // 搜索功能也需要登录检查
      if (!this.checkLogin(() => {
        if (this.search) {
          this.$router.push({ path: '/goods', query: { search: this.search } })
          this.search = ''
        }
      }, '搜索功能需要登录后才能使用，是否前往登录？')) {
        return
      }
    },
    // 处理导航链接点击
    handleNavClick(item) {
      // 检查登录状态
      if (!this.checkLogin(() => {
        // 已登录，执行路由跳转
        this.$router.push(item.index)
      }, `访问"${item.label}"需要登录，是否前往登录？`)) {
        return
      }
    },
  },
}
</script>

<style>
/* 全局CSS */
* {
  padding: 0;
  margin: 0;
  border: 0;
  list-style: none;
}
.header-user-con {
  display: flex;
  height: 50px;
  align-items: center;
}
.user-name {
  margin-left: 10px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #0c0000;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
.el-dropdown-item:hover {
  color: #ff6700;
}

.el-header {
  background-color: #ffffff;
  height: 50px !important;
  align-items: center;
  overflow: hidden;
  margin-bottom: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.el-header .el-row {
  height: 50px;
  line-height: 50px;
}

.el-footer {
  padding: 0;
}
a,
a:hover {
  text-decoration: none;
}
/* 全局CSS END */

/* 顶部导航栏CSS */
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Header 内容容器，与页面内容区域对齐 */
.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
  box-sizing: border-box;
}

/* 响应式设计 */
@media screen and (max-width: 1200px) {
  .header-container {
    padding: 0 40px;
  }
}

@media screen and (max-width: 768px) {
  .header-container {
    padding: 0 20px;
  }
}

.logo-image {
  height: 70px; /* 根据需要调整 logo 的尺寸 */
  width: auto;
  display: block;
}

.custom-menu {
  display: flex;
  justify-content: start;
  align-items: center;
  height: 50px;
  list-style: none;
  font-size: 14px;
}

.custom-menu li {
  color: #b0b0b0;
  line-height: 50px;
  margin: 0px 10px;
  white-space: nowrap; /* 禁止文本自动换行 */
}

.custom-menu li a {
  color: #0c0000;      /* 导航栏字体颜色 */
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; /* 保持在单行显示 */
}

.custom-menu li a:hover {
  color: #409eff;
}

.custom-menu li.active a {
  color: #409eff;
  font-size: 15px;
  font-weight: bold;
}

.custom-menu .input-box {
  height: 30px;
}

.custom-menu .input-box .el-input__inner {
  height: 30px; /* 设置搜索框高度为30px */
  width: 100px; /* 设置搜索框宽度为200px */
  background-color: #f9f9f9; /* 设置搜索框背景为浅白色 */
}
/* 顶部导航栏CSS END */
</style>
