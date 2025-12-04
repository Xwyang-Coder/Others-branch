/**
 * 登录验证公共 Mixin
 * 用于检查用户登录状态，未登录时提示登录或注册
 */
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getUser']),
    // 判断用户是否已登录
    isLoggedIn() {
      return !!this.getUser
    }
  },
  methods: {
    /**
     * 检查登录状态，如果未登录则提示并跳转到登录页
     * @param {Function} callback - 已登录时的回调函数
     * @param {String} message - 自定义提示信息
     * @returns {Boolean} 是否已登录
     */
    checkLogin(callback, message) {
      if (!this.isLoggedIn) {
        // 显示提示信息
        this.$confirm(
          message || '此功能需要登录后才能使用，是否前往登录？',
          '提示',
          {
            confirmButtonText: '前往登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          // 用户确认，跳转到登录页
          this.$router.push({ name: 'Login' })
        }).catch(() => {
          // 用户取消，不做任何操作
        })
        return false
      }
      // 已登录，执行回调
      if (callback && typeof callback === 'function') {
        callback()
      }
      return true
    },
    
    /**
     * 检查登录状态并执行操作（用于路由跳转）
     * @param {String} routeName - 路由名称
     * @param {Object} routeParams - 路由参数
     * @param {String} message - 自定义提示信息
     */
    checkLoginAndNavigate(routeName, routeParams = {}, message) {
      if (!this.isLoggedIn) {
        this.$confirm(
          message || '此功能需要登录后才能使用，是否前往登录？',
          '提示',
          {
            confirmButtonText: '前往登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          this.$router.push({ name: 'Login' })
        })
        return false
      }
      // 已登录，执行路由跳转
      this.$router.push({ name: routeName, ...routeParams })
      return true
    }
  }
}

