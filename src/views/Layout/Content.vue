<style lang="less" scoped>
.Content-container {
  position: relative;
  width: 100%;
  height: 100%;
  .header {
    height: 50px;
    line-height: 50px;
    color: #fff;
    background-color: #1e78bf;
    .iconfont {
      position: absolute;
      top: auto;
      left: 10px;
      font-size: 24px;
    }
    .user {
      float: right;
      margin-right: 30px;
    }
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #ffffff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }
}
</style>
<template>
  <div class="Content-container">
    <div class="header">
      <i class="iconfont icon-shousuo" v-if="isFlod" @click="showNav"></i>
      <i class="iconfont icon-zhankai" v-else @click="showNav"></i>
      <div class="user">
        <div class="username">
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">{{username}}<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-switch-button" command="loginout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <!-- 内容区域 -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: 'Content',
  data() {
    return {
      isFlod: true,
    }
  },
  created() {},
  computed: {
    ...mapGetters(['username'])
  },
  methods: {
    ...mapMutations(['CLEARUSERINFO']),
    showNav() {
      this.isFlod = !this.isFlod
      this.$emit('setFlod', { flod: this.isFlod })
    },
    // 退出登录
    handleCommand(command) {
        if (command === 'loginout') {
          // 清空vuex数据
          this.CLEARUSERINFO()
          // 清除本地数据
          localStorage.removeItem('user')
          // 返回登录页面
          this.$router.push('/login')
        }
      }
  },
}
</script>
