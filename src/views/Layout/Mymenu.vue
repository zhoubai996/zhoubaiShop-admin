<style lang="less" scoped>
@duration: 0.3s;
.Mymenu-container {
  .el-menu {
    border-right: 0;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>
<template>
  <div class="Mymenu-container">
    <el-menu
      :default-active="$router.path"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      router
      :collapse='isCollapse'
      active-text-color="#ffd04b">
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <i class="el-icon-document"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="/goods">
        <i class="el-icon-document"></i>
        <span slot="title">商品管理</span>
      </el-menu-item>
      <el-menu-item index="/goodsclass">
        <i class="el-icon-setting"></i>
        <span slot="title">分类管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Mymenu',
  props: ['setFlod'],
  data() {
    return {
      isShow: false
    }
  },
  mounted() {
    
  },
  created() {
    
  },
  computed: {
    isCollapse() {
      return this.isShow = this.setFlod
    }
  },
  methods: {
  },
}
</script>


