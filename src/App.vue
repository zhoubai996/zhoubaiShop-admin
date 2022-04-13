<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      isRouterAlive: true,
    }
  },
  components: {},
  provide() {
    return {
      reload: this.reload,
    }
  },
  methods: {
    // 刷新页面方法
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
  },
}
</script>

<style></style>
