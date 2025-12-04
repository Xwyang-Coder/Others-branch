<template>
  <div id="Welcome" name="Welcome">
    <el-container v-show="$route.meta.showMenu !== false">
      <!-- 主要区域容器 -->
      <el-main class="main-container">
        <el-row :gutter="15">
          <!-- 左侧主要内容区域 -->
          <el-col :span="18">
            <!-- 原有的广告轮播 -->
            <el-row>
              <el-col :span="24">
                <el-carousel height="200px">
                  <el-carousel-item v-for="item in menuNews" :key="item">
                    <!-- <img :src="item" alt="" width="214px" height="120px" /> -->
                    <el-image
                      style="width: 400px; height: 200px"
                      :src="item"
                      :fit="contain"
                    ></el-image>
                  </el-carousel-item>
                </el-carousel>
              </el-col>
            </el-row>
            
            <!-- 原有的案例区域和任务列表 -->
            <el-row class="case-area">
              <!-- 任务接单区 -->
              <el-col :span="24">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="最新" name="first">
                    <div class="task-list">
                      <el-row :gutter="20">
                        <el-col :span="8" v-for="task in tasks" :key="task.id">
                          <div class="task-card" @click="handleTaskClick(task)">
                            <div class="task-header">
                              <span class="task-title">{{ task.title }}</span>
                              <span class="task-budget">{{ task.budget }}</span>
                            </div>
                            <div class="task-meta">
                              <span>{{ task.id }} Python 1-3月</span>
                            </div>
                            <el-divider></el-divider>
                            <div class="task-content">
                              <p>{{ task.description }}</p>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="排序" name="second">配置管理</el-tab-pane>
                  <el-tab-pane label="领域理" name="third">角色管理</el-tab-pane>
                  <el-tab-pane label="待补充偿" name="fourth">
                    定时任务补偿
                  </el-tab-pane>
                </el-tabs>
              </el-col>
            </el-row>
          </el-col>

          <!-- 新增右侧栏 -->
          <el-col :span="6">
            <div class="right-sidebar">
              <el-card class="success-cases">
                <div class="ranking-lists">
                  <!-- 任务单成功 -->
                  <div class="ranking-section">
                    <div class="ranking-header">
                      <span>任务单成功</span>
                      <a href="#" class="more-link" @click.prevent="handleMoreClick('任务单')">更多</a>
                    </div>
                    <ul class="ranking-items">
                      <li>
                        <span class="rank-num rank-1">1</span>
                        <span class="rank-text">成功交易案例一</span>
                      </li>
                      <li>
                        <span class="rank-num rank-2">2</span>
                        <span class="rank-text">成功交易案例二</span>
                      </li>
                      <li>
                        <span class="rank-num rank-3">3</span>
                        <span class="rank-text">成功交易案例三</span>
                      </li>
                    </ul>
                  </div>

                  <!-- 问题单成功 -->
                  <div class="ranking-section">
                    <div class="ranking-header">
                      <span>问题单成功</span>
                      <a href="#" class="more-link" @click.prevent="handleMoreClick('问题单')">更多</a>
                    </div>
                    <ul class="ranking-items">
                      <li>
                        <span class="rank-num rank-1">1</span>
                        <span class="rank-text">成功交易案例一</span>
                      </li>
                      <li>
                        <span class="rank-num rank-2">2</span>
                        <span class="rank-text">成功交易案例二</span>
                      </li>
                      <li>
                        <span class="rank-num rank-3">3</span>
                        <span class="rank-text">成功交易案例三</span>
                      </li>
                    </ul>
                  </div>

                  <!-- 游戏单成功 -->
                  <div class="ranking-section">
                    <div class="ranking-header">
                      <span>游戏单成功</span>
                      <a href="#" class="more-link" @click.prevent="handleMoreClick('游戏单')">更多</a>
                    </div>
                    <ul class="ranking-items">
                      <li>
                        <span class="rank-num rank-1">1</span>
                        <span class="rank-text">成功交易案例一</span>
                      </li>
                      <li>
                        <span class="rank-num rank-2">2</span>
                        <span class="rank-text">成功交易案例二</span>
                      </li>
                      <li>
                        <span class="rank-num rank-3">3</span>
                        <span class="rank-text">成功交易案例三</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </el-card>

              <el-card class="success-tabs">
                <div class="ranking-lists">
                  <!-- 年度交易案例榜单 -->
                  <div class="ranking-section">
                    <div class="ranking-header">
                      <span>年度交易案例榜单</span>
                      <a href="#" class="more-link" @click.prevent="handleMoreClick('年度交易案例')">更多</a>
                    </div>
                    <ul class="ranking-items">
                      <li>
                        <span class="rank-num rank-1">1</span>
                        <span class="rank-text">成功交易案例1</span>
                      </li>
                      <li>
                        <span class="rank-num rank-2">2</span>
                        <span class="rank-text">成功交易案例2</span>
                      </li>
                      <li>
                        <span class="rank-num rank-3">3</span>
                        <span class="rank-text">成功交易案例3</span>
                      </li>
                    </ul>
                  </div>

                  <!-- 月度交易案例榜单 -->
                  <div class="ranking-section">
                    <div class="ranking-header">
                      <span>月度交易案例榜单</span>
                      <a href="#" class="more-link" @click.prevent="handleMoreClick('月度交易案例')">更多</a>
                    </div>
                    <ul class="ranking-items">
                      <li>
                        <span class="rank-num rank-1">1</span>
                        <span class="rank-text">成功交易案例1</span>
                      </li>
                      <li>
                        <span class="rank-num rank-2">2</span>
                        <span class="rank-text">成功交易案例2</span>
                      </li>
                      <li>
                        <span class="rank-num rank-3">3</span>
                        <span class="rank-text">成功交易案例3</span>
                      </li>
                    </ul>
                  </div>

                  <!-- 每周交易案例榜单 -->
                  <div class="ranking-section">
                    <div class="ranking-header">
                      <span>每周交易案例榜单</span>
                      <a href="#" class="more-link" @click.prevent="handleMoreClick('每周交易案例')">更多</a>
                    </div>
                    <ul class="ranking-items">
                      <li>
                        <span class="rank-num rank-1">1</span>
                        <span class="rank-text">成功交易案例1</span>
                      </li>
                      <li>
                        <span class="rank-num rank-2">2</span>
                        <span class="rank-text">成功交易案例2</span>
                      </li>
                      <li>
                        <span class="rank-num rank-3">3</span>
                        <span class="rank-text">成功交易案例3</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-main>
      <!-- 主要区域容器END -->

    </el-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import * as cartsAPI from '@/api/carts'
import * as userAPI from '@/api/users'
import authMixin from '@/mixins/authMixin'

export default {
  mixins: [authMixin],
  beforeUpdate() {
    this.activeIndex = this.$route.path
  },
  data() {
    return {
      activeIndex: '',
      search: '',
      activeName: 'first',
      menuNews: [
        '../test_imgs/display1.png',
        '../test_imgs/display2.png',
        '../test_imgs/display3.png',
        '../test_imgs/display4.png',
        '../test_imgs/display5.png',
        '../test_imgs/display6.png',
      ],
      tasks: [
        { id: 2024082500001, title: '需求标题', budget: '8-10K', description: '内容描述' },
        { id: 2024082500002, title: '需求标题', budget: '2.5-30K', description: '内容描述2' },
        { id: 2024082500003, title: '需求标题', budget: '5-6K', description: '内容描述' },
        { id: 2024082500004, title: '需求标题', budget: '1-2K', description: '内容描述' },
        { id: 2024082500005, title: '需求标题', budget: '0.3-0.5K', description: '内容描述' },
        { id: 2024082500006, title: '需求标题', budget: '0.5-0.8K', description: '内容描述' },
        { id: 2024082500007, title: '需求标题', budget: '1-1.5K', description: '内容描述' },
        { id: 2024082500008, title: '需求标题', budget: '0.8-1K', description: '内容描述' },
        { id: 2024082500009, title: '需求标题', budget: '8-10K', description: '内容描述' },
        { id: 2024082500010, title: '需求标题', budget: '2.5-30K', description: '内容描述2' },
        { id: 2024082500011, title: '需求标题', budget: '5-6K', description: '内容描述' },
        { id: 2024082500012, title: '需求标题', budget: '1-2K', description: '内容描述' },
        { id: 2024082500013, title: '需求标题', budget: '0.3-0.5K', description: '内容描述' },
        { id: 2024082500014, title: '需求标题', budget: '0.5-0.8K', description: '内容描述' },
        { id: 2024082500015, title: '需求标题', budget: '1-1.5K', description: '内容描述' },
        { id: 2024082500016, title: '需求标题', budget: '0.8-1K', description: '内容描述' },
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
    // 处理任务卡片点击
    handleTaskClick(task) {
      this.checkLogin(() => {
        // 已登录，可以查看任务详情或执行其他操作
        console.log('查看任务详情:', task)
        // 这里可以添加跳转到任务详情页的逻辑
        // this.$router.push({ name: 'TaskDetails', params: { id: task.id } })
      }, '查看任务详情需要登录，是否前往登录？')
    },
    // 处理标签页切换（标签页切换不需要登录检查，只是查看不同内容）
    handleClick(tab) {
      console.log('切换到标签页:', tab.name)
      // 标签页切换不需要登录，直接执行
    },
    // 处理"更多"链接点击
    handleMoreClick(type) {
      this.checkLogin(() => {
        console.log('查看更多:', type)
        // 已登录，可以查看更多的逻辑
        // this.$router.push({ name: 'MoreList', query: { type } })
      }, `查看${type}更多内容需要登录，是否前往登录？`)
    }
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

#app .el-main {
  padding: 0;
  margin-top: 2px;
}
#app .el-footer {
  padding: 0;
}
a,
a:hover {
  text-decoration: none;
}
/* 全局CSS END */

/* 主题内容容器CSS */
.main-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f5f7fcd3;
  min-height: calc(100vh - 50px - 200px); /* 减去头部和底部的高度 */
}

.case-area {
  margin: 20px 0;
}

.task-list {
  padding: 0px 0px;
}

.task-card {
    background: #fff;      /* 设置背景颜色为白色 */
    padding: 10px;             /* 设置内边距为10像素 */
    border-radius: 8px;        /* 设置圆角为8像素，使卡片四角变圆 */
    margin-bottom: 20px;       /* 设置下外边距为20像素，用于卡片之间的间距 */
    transition: all 0.3s ease; /* 设置所有属性变化时的过渡效果，持续0.3秒，使用ease缓动函数 */
    height: 140px;             /* 设置卡片固定高度为140像素 */
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1); /* 添加阴影效果：- 水平偏移: 0- 垂直偏移: 2px- 模糊半径: 12px- 扩散半径: 0- 颜色: 黑色，透明度0.1*/
    cursor: pointer;           /* 添加鼠标指针样式，表示可点击 */
}

.task-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.task-title {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.task-budget {
  color: #f56c6c;
  font-weight: bold;
}

.task-meta {
  font-size: 12px;
  color: #909399;
  margin-bottom: 8px;
}

.task-content {
  color: #606266;
  font-size: 14px;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.el-divider--horizontal {
  margin: 2px !important;
  padding: 0 !important;
  background-color: #ccc;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}

/* 主题内容容器CSS END */

/* 新增样式 */
.right-sidebar {
  position: sticky;
  top: 20px;
}

.success-cases {
  margin-bottom: 20px;
}

.success-cases .el-card__header {
  padding: 12px 20px;
  font-weight: bold;
  background-color: #f5f7fa;
}

.case-section {
  padding: 10px 0;
}

.case-section h4 {
  color: #333;
  margin-bottom: 10px;
}

.case-section ul {
  padding-left: 15px;
}

.case-section ul li {
  color: #666;
  font-size: 13px;
  line-height: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 优化主内容区域样式 */
.main-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f5f7fcd3;
}

.case-area {
  margin: 20px 0;
}

.task-card {
  transition: all 0.3s;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px 0 rgba(0,0,0,0.15);
}

/* 调整任务列表布局 */
.task-list {
  gap: 15px;
  padding: 0px;
}

.task-card {
  flex: 0 0 calc(50% - 10px);
  margin-bottom: 15px;
}

/* 添加以下样式 */
.ranking-lists {
  padding: 10px;
}

.ranking-section {
  margin-bottom: 20px;
}

.ranking-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.ranking-header span {
  font-weight: bold;
  color: #333;
}

.more-link {
  color: #999;
  font-size: 12px;
  text-decoration: none;
}

.ranking-items {
  padding: 10px 0;
}

.ranking-items li {
  display: flex;
  align-items: center;
  padding: 8px 0;
}

.rank-num {
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: 50%;
  margin-right: 10px;
  font-size: 12px;
  color: #fff;
}

.rank-1 {
  background-color: #f56c6c;
}

.rank-2 {
  background-color: #e6a23c;
}

.rank-3 {
  background-color: #67c23a;
}

.rank-text {
  color: #666;
  font-size: 14px;
}

/* 调整栅格间距 */
.el-row {
  margin-left: 0 !important;
  margin-right: 0 !important;
}

/* 可选：为小屏幕添加响应式padding */
@media screen and (max-width: 1200px) {
  .main-container {
    padding: 20px 40px;
  }
}

@media screen and (max-width: 768px) {
  .main-container {
    padding: 20px 20px;
  }
}
</style>
