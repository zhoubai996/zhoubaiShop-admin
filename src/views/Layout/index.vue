<style lang="less" scoped>
@duration: 0.3s;
.layout-container {
  display: flex;
  .menu {
    position: fixed;
    width: 200px;
    height: 100%;
    background-color: #545C64;
    transition: width @duration ease-in-out;
  }
  .content {
    width: 100%;
    margin-left: 200px;
    transition: margin-left @duration ease-in-out;
    // flex: 1;
  }
}
</style>
<template>
  <div class="layout-container">
    <!-- 左侧导航 -->
    <Mymenu class="menu" :style="{width: headerMargin}" :setFlod="flod"></Mymenu>
    <!-- 右侧内容 -->
    <Content class="content" :style="{marginLeft: headerMargin}" @setFlod="onSetFlod"></Content>
  </div>
</template>

<script>
import Mymenu from './Mymenu.vue'
import Content from './Content.vue'
export default {
  name: 'Layout',
  data() {
    return {
      headerMargin: '200px',
      flod: false
    }
  },
  components: {
    Mymenu,
    Content
  },
  created() {
  },
  computed: {
  },
  methods: {
    onSetFlod(val) {
      console.log(val.flod);
      this.flod = !val.flod
      val.flod ? this.headerMargin = '200px' : this.headerMargin = '64px'
    }
  },
}
</script>


