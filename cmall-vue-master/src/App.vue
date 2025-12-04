<template>
  <div id="app" name="app">
    <Header v-show="$route.meta.showMenu !== false" />
    <div id="page">
        <router-view></router-view>
    </div>
    <Footer v-show="$route.meta.showMenu !== false" />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}

#page {
  min-height: calc(100vh - 50px);
  margin-top: 50px; /* 为固定导航栏留出空间 */
}

</style>