<!--
 * @Descripttion: 全部商品页面组件
 * @Author: congz
 * @Date: 2020-06-04 11:22:40
 * @LastEditors: congz
 * @LastEditTime: 2020-08-12 20:56:01
--> 

<template>
    <div class="recommends" id="recommends" name="recommends">
      <el-row :gutter="20">
        <!-- 左侧任务列表区域 - 占据1/4宽度 -->
        <el-col :span="9">
          <div class="case-area">
            <el-tabs v-model="tastActiveName" @tab-click="handleClick">
              <el-tab-pane label="推荐榜" name="first">
                <div class="task-list">
                  <div v-for="task in tasks" :key="task.id" class="task-item" :class="{ active: selectedTask && selectedTask.id === task.id }" @click="selectTask(task)">
                    <div class="task-item-header">
                      <span class="task-title">{{ task.title }}</span>
                      <span class="task-budget">{{ task.budget }}</span>
                    </div>
                    <div class="task-meta">
                      <span>{{ task.id }}</span>
                      <span>交付中</span>
                      <span>1-3月</span>
                      <span>软件</span>
                      <span class="status-tag">在线</span>
                      <span class="payment-tag">已支付</span>
                    </div>
                  </div>
                </div>
              </el-tab-pane>

              <el-tab-pane label="需求单" name="second">需求单</el-tab-pane>
              <el-tab-pane label="问题单" name="third">问题单</el-tab-pane>
              <el-tab-pane label="游戏单" name="fourth">游戏单</el-tab-pane>
            </el-tabs>
          </div>
        </el-col>

        <!-- 右侧任务详情区域 - 占据3/4宽度 -->
        <el-col :span="15">
          <div class="task-detail-card" v-if="selectedTask">
            <div class="task-header">
              <h3>{{ selectedTask.title }} <span class="budget"> {{ selectedTask.budget }}</span></h3>
              <el-button type="primary" size="small" @click="applyTask">立即沟通</el-button>
            </div>
            <div class="task-description">
              <h4>需求描述</h4>
              <ol>
                <li>xxxxxxxxxxxxx</li>
                <li>xxxxxxxxxxxxx</li>
                <li>xxxxxxxxxxxxx</li>
                <li>xxxxxxxxxxxxx</li>
                <li>xxxxxxxxxxxxx</li>
                <li>xxxxxxxxxxxxx</li>
                <li>xxxxxxxxxxxxx</li>
                <li>xxxxxxxxxxxxx</li>
                <li>xxxxxxxxxxxxx</li>
              </ol>
              <div class="attachment">
                <el-button size="small" type="text">查看附件</el-button>
                <el-button size="small" type="text">收藏</el-button>
                <el-button size="small" type="text">喜欢</el-button>
                <el-button size="small" type="text">点赞</el-button>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </template>

  <script>
  import * as productAPI from '@/api/products'
  import * as categoryAPI from '@/api/categories'
  import axios from 'axios'
  
  export default {
    data() {
      return {
        categoryList: '', //分类列表
        categoryID: [], // 分类id
        product: '', // 商品列表
        productList: '',
        total: 0, // 商品总量
        pageSize: 15, // 每页显示的商品数量
        currentPage: 1, //当前页码
        activeName: '-1', // 分类列表当前选中的id
        search: '', // 搜索条件
        start: 0,
        limit: 15,

        tastActiveName: 'first',
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
      selectedTask: null
      }
    },
    created() {
      // 获取分类列表
      this.getCategory()
      // 默认选中第一个任务
      if (this.tasks.length > 0) {
        this.selectedTask = this.tasks[0]
      }
    },
    activated() {
      this.activeName = '-1' // 初始化分类列表当前选中的id为-1
      this.total = 0 // 初始化商品总量为0
      this.currentPage = 1 //初始化当前页码为1
      // 如果路由没有传递参数，默认为显示全部商品
      if (Object.keys(this.$route.query).length == 0) {
        this.categoryID = []
        this.activeName = '0'
        return
      }
      // 如果路由传递了categoryID，则显示对应的分类商品
      if (this.$route.query.categoryID != undefined) {
        this.categoryID = this.$route.query.categoryID
        if (this.categoryID.length == 1) {
          this.activeName = '' + this.categoryID[0]
        }
        return
      }
      // 如果路由传递了search，则为搜索，显示对应的分类商品
      if (this.$route.query.search != undefined) {
        this.search = this.$route.query.search
      }
    },
    watch: {
      // 监听点击了哪个分类标签，通过修改分类id，响应相应的商品
      activeName: function(val) {
        if (val == 0) {
          this.categoryID = []
        }
        if (val > 0) {
          this.categoryID = [Number(val)]
        }
        // 初始化商品总量和当前页码
        this.total = 0
        this.currentPage = 1
        // 更新地址栏链接，方便刷新页面可以回到原来的页面
        this.$router.push({
          path: '/recommends',
          query: { categoryID: this.categoryID }
        })
      },
      // 监听搜索条件，响应相应的商品
      search: function(val) {
        if (val != '') {
          this.getProductBySearch(val)
        }
      },
      // 监听分类id，响应相应的商品
      categoryID: function() {
        this.getData()
        this.search = ''
      },
      // 监听路由变化，更新路由传递了搜索条件
      $route: function(val) {
        if (val.path == '/recommends') {
          if (val.query.search != undefined) {
            this.activeName = '-1'
            this.currentPage = 1
            this.total = 0
            this.search = val.query.search
          }
        }
      }
    },
    methods: {
      // 返回顶部
      backtop() {
        const timer = setInterval(function() {
          const top =
            document.documentElement.scrollTop || document.body.scrollTop
          const speed = Math.floor(-top / 5)
          document.documentElement.scrollTop = document.body.scrollTop =
            top + speed
  
          if (top === 0) {
            clearInterval(timer)
          }
        }, 20)
      },
      handleCurrentChange(val) {
        this.start = this.limit * (val - 1) // val 页面
        this.getData()
      },
      // 向后端请求分类列表数据
      getCategory() {
        categoryAPI
          .listCategories()
          .then(res => {
            if (res.status === 200) {
              const val = {
                category_id: 0,
                category_name: '全部'
              }
              const cate = res.data
              cate.unshift(val)
              this.categoryList = cate
            } else {
              this.notifyError('获取分类失败', res.msg)
            }
          })
          .catch(err => {
            this.notifyError('获取分类失败', err)
          })
      },
      // 向后端请求全部商品或分类商品数据
      getData() {
        // 如果分类列表为空则请求全部商品数据，否则请求分类商品数据
        if (this.categoryID.length === 0) {
          productAPI
            .listProducts(0, this.start, this.limit)
            .then(res => {
              if (res.status === 200) {
                this.product = res.data.items
                this.total = res.data.total
              } else {
                this.notifyError('获取商品失败', res.msg)
              }
            })
            .catch(err => {
              this.notifyError('获取商品失败', err)
            })
        } else {
          let id = this.categoryID[0]
          productAPI
            .listProducts(id, this.start, this.limit)
            .then(res => {
              if (res.status === 200) {
                this.product = res.data.items
                this.total = res.data.total
              } else {
                this.notifyError('获取分类商品失败', res.msg)
              }
            })
            .catch(err => {
              this.notifyError('获取分类商品失败', err)
            })
        }
      },
      // 通过搜索条件向后端请求商品数据
      getProductBySearch() {
        var form = {
          search: this.search
        }
        productAPI
          .searchProducts(form)
          .then(res => {
            if (res.status === 200) {
              this.product = res.data
            } else {
              this.notifyError('搜索失败', res.msg)
            }
          })
          .catch(err => {
            this.notifyError('搜索失败', err)
          })
      },
      selectTask(task) {
        this.selectedTask = task;
      },
      applyTask() {
        // Implement communication logic
        this.$message.success('已发送沟通请求');
      }
    }
  }
  </script>
  
  <style scoped>
  .recommends {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
    background-color: #f5f7fcd3;
  }

  /* 内容区中任务列表 */
  .case-area {
    border-radius: 8px;
    padding: 5px;
    height: 100%;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  }

    /* 确保列表区域可以滚动 */
    .task-list {
    padding: 0px 5px;
    max-height: calc(100vh - 200px);
    overflow-y: auto;
  }

  /* 优化滚动条样式 */
  .task-list::-webkit-scrollbar {
    width: 6px;
  }

  .task-list::-webkit-scrollbar-thumb {
    background-color: #dcdfe6;
    border-radius: 3px;
  }

  .task-list::-webkit-scrollbar-track {
    background-color: #f5f7fa;
  }

  .task-item {
    background: #fff;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 15px;
    cursor: pointer;
    transition: all 0.3s;
    border: 1px solid #ebeef5;
  }

  .task-item:last-child {
    margin-bottom: 0;
  }

  .task-item:hover {
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  }

  .task-item.active {
    border: 1px solid #409eff;
    background-color: #dbe9fa;
  }

  .task-item-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
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
  /* 内容区中任务列表 END*/

  /* 单个任务卡片详细展示区 */
  .task-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: #909399;
  }

  .task-meta span {
    padding: 2px 6px;
    border-radius: 4px;
    background-color: #f5f7fa;
  }

  .task-meta .status-tag {
    color: #67c23a;
    background-color: #f0f9eb;
    border: 1px solid #e1f3d8;
  }

  .task-meta .payment-tag {
    color: #409eff;
    background-color: #ecf5ff;
    border: 1px solid #d9ecff;
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

  .task-detail-card {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  }

  .task-detail-card .task-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .task-detail-card .budget {
    color: #f56c6c;
    margin-left: 20px;
  }

  .task-description h4 {
    margin-bottom: 15px;
  }

  .task-description ol {
    padding-left: 20px;
    line-height: 1.8;
  }

  .attachment {
    margin-top: 20px;
  }
  /* 单个任务卡片详细展示区 END*/

  </style>