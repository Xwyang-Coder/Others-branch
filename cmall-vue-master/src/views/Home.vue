<!--
 * @Descripttion: 首页组件
 * @Author: congz
 * @Date: 2020-06-04 11:22:40
 * @LastEditors: congz
 * @LastEditTime: 2020-08-12 21:20:08
--> 

<template>
  <div class="home" id="home" name="home">
    <Header />
    <!-- 主要区域容器 -->
    <el-main class="main-container">
      <!-- 搜索内容区 -->
      <div class="main-search">
        <el-input
          class="input-box"
          placeholder="请输入搜索内容"
          v-model="search"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            class="search-button"
            @click="searchClick"
          >搜索</el-button>
        </el-input>
      </div>

      <!-- 内容导航区 -->
      <el-row class="category-scroll-classify">
          <!-- 需求单卡片 -->
          <el-col>
            <div class="category-card">
              <h3>需求单</h3>
              <el-divider></el-divider>
              <div class="tag-group">
                <span class="tag">互联网 <small>ML DL RL C++ Java PHP Go C# ...</small></span>
                <span class="tag">电气/通信</span>
                <span class="tag">物理/化学</span>
              </div>
            </div>
          </el-col>

          <el-col>
            <!-- 问题单卡片 -->
            <div class="category-card">
              <h3>问题单</h3>
              <el-divider></el-divider>
              <div class="tag-group">
                <span class="tag">高通 <small>SNPE 星芯 ...</small></span>
                <span class="tag">海思</span>
                <span class="tag">TensorRT <small>异构优化 效率优化 ...</small></span>
              </div>
            </div>
          </el-col>

          <el-col>
            <!-- 游戏单卡片 -->
            <div class="category-card">
              <h3>游戏单</h3>
              <el-divider></el-divider>
              <div class="tag-group">
                <span class="tag">王者荣耀 <small>QQ飞车 魔兽世界</small></span>
                <span class="tag">英雄联盟 <small>和平精英 梦幻西游</small></span>
                <span class="tag">原神 <small>明日之后 地下城勇士</small></span>
              </div>
            </div>
          </el-col>
      </el-row>

      <!-- 需求列表内容区 -->

      <!-- 原有的案例区域和任务列表 -->
      <el-row class="case-area">
        <!-- 任务接单区 -->
        <el-col :span="24">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="热推榜" name="first">
              <div class="task-list">
                <el-row :gutter="20">
                  <el-col :span="6" v-for="task in tasks" :key="task.id">
                    <div class="task-card">
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

            <el-tab-pane label="需求单" name="second">需求单</el-tab-pane>
            <el-tab-pane label="问题单" name="third">问题单</el-tab-pane>
            <el-tab-pane label="游戏单" name="fourth">游戏单</el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>

    </el-main>
    <!-- 主要区域容器END -->
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
  name: 'Home',
  components: {
    Header
  },
  data() {
    return {
      activeIndex: '',
      search: '',
      activeName: 'first',
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
  mounted() {
    // 强制重新计算布局，解决登录跳转后搜索框位置不正确的问题
    this.$nextTick(() => {
      // 触发浏览器重新计算布局
      const searchElement = document.querySelector('.main-search')
      if (searchElement) {
        // 强制重排
        searchElement.style.display = 'none'
        searchElement.offsetHeight // 触发重排
        searchElement.style.display = 'flex'
      }
    })
  },
  methods: {
    searchClick() {
      if (this.search) {
        this.$router.push({ path: '/goods', query: { search: this.search } })
        this.search = ''
      }
    },
    handleClick(tab) {
      // 处理标签页切换
      console.log('切换到标签页:', tab.name)
    }
  }
}
</script>

<style scoped>
/* 主题内容容器CSS */
.main-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f5f7fcd3;
  min-height: calc(100vh - 50px - 200px); /* 减去头部和底部的高度 */
}

/* 1.下面的样式是搜索区域样式优化 */
.main-search {
  margin: 5px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 54px;
  width: 800px;
  max-width: calc(100% - 40px); /* 减去容器的 padding */
  background-color: #409EFF;
  border-radius: 10px;
  padding: 2px;
  overflow: hidden;
  box-sizing: border-box;
}

.input-box {
  width: 800px;
}

.input-box :deep(.el-input__inner) {
  height: 50px;
  line-height: 50px;
  border: none;
  background-color: white;
  color: #606266;
  border-radius: 10px 0 0 10px;  /* 只设置左侧圆角 */
  padding-left: 14px;  /* 输入框文字缩进 */
}

.input-box :deep(.el-input__inner::placeholder) {
  color: #909399;
}

.input-box :deep(.el-input-group__append) {
  border: none;
  background: transparent;
  padding: 0;
}

.search-button {
  background-color: transparent;
  color: white !important;
  width: 120px;
  height: 50px !important;
  padding: 0 15px;
  line-height: 50px;
  border: none;
  border-radius: 0 10px 10px 0;
  transition: all 0.3s ease;
  font-size: 16px;
  font-weight: bold;
}

.search-button :deep(i) {
  color: white;
  font-weight: bold;
}

.search-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: scale(1.05);
}

/* 2.下面的样式是任务分类区 */
.category-scroll-classify {
  width: 100%;
  overflow: hidden;
  position: relative;
  padding: 20px 0;
  display: flex;
  gap: 20px;
  margin: 0 auto;
}

.category-card {
  flex: 0 0 300px;
  background: white;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
}

.category-card h3 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 10px 0;
  color: #333;
  font-size: 16px;
  font-weight: bold;
}

.tag-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tag {
  color: #606266;
  font-size: 14px;
  line-height: 1.4;
  font-weight: bold;
}

.tag small {
  color: #909399;
  font-size: 12px;
  margin-left: 5px;
  font-weight: normal;
}

/* 3.下面的样式是内容区中任务列表及卡片区 */
.case-area {
  margin: 0px 0;
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
/* 主题内容容器CSS END */
</style>
