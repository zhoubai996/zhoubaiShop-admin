<style lang="less" scoped>
.User-container {
  margin: 20px;
  .wrapper {
    display: flex;
    width: 100%;
    margin: 20px auto;
  }
}
</style>
<template>
  <div class="User-container">
    <!-- 表格区域 -->
    <div class="wrapper">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="id" label="用户ID" width="300"> </el-table-column>
        <el-table-column prop="user_name" label="用户账号" show-overflow-tooltip width="300"> </el-table-column>
        <el-table-column prop="is_admin" label="管理员" show-overflow-tooltip width="200"> </el-table-column>
        <el-table-column prop="phone" label="电话号码" show-overflow-tooltip width="300"> </el-table-column>
        <el-table-column prop="deletedAt" label="封禁状态" width="200"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="page">
      <Paging :total="total" :pageSize="pageSize" @changePage="changePage"></Paging>
    </div>
  </div>
</template>

<script>
// 分页器
import Paging from '@/components/Paging'
import { mapGetters } from 'vuex'
export default {
  name: 'User',
  data() {
    return {
      // 搜索关键字
      input: '',
      // 初始pageNum
      paNum: 1,
      // 初始pageSize
      paSize: 10,
      // 弹窗控制是否显示
      dialogShow: false,
    }
  },
  components: {
    Paging,
  },
  mounted() {
    this.getUserData()
  },
  inject: ['reload'],
  computed: {
    ...mapGetters(['userList', 'userTotal', 'userSize']),
    // ...mapState(['goodsInfo']),
    // 商品列表
    tableData() {
      this.userList.forEach((item) => {
        let admin = item.is_admin ? '是' : '否'
        item.deletedAt = '否'
        item.is_admin = admin
      })
      return this.userList
    },
    // 商品总数
    total() {
      return this.userTotal
    },
    // 商品一页数量
    pageSize() {
      return parseInt(this.userSize)
    },
  },
  methods: {
    // 将获取数据封装为一个函数
    getUserData() {
      const { paNum, paSize } = this
      this.$store.dispatch('userAllInfo', { paNum, paSize })
    },
    // 删除按钮
    handleDelete(index, { user_name }) {
      // console.log(id)
      this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$store.dispatch('shelvesUserInfo', user_name)
          this.$message({
            type: 'success',
            message: `删除成功,删除用户账号:${user_name}`,
          })
          this.reload()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    // 获取页码
    changePage(pageNum) {
      this.paNum = pageNum
      this.getUserData()
    },
  },
}
</script>
