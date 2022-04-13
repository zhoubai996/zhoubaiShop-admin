<style lang="less" scoped>
.GoodsClass-container {
  margin: 20px;
  .header {
    display: flex;
    width: 100%;
    button {
      margin-left: 20px;
    }
  }
  .wrapper {
    display: flex;
    width: 100%;
    margin: 20px auto;
  }
}
</style>
<template>
  <div class="GoodsClass-container">
    <!-- 搜索区域 -->
    <div class="header">
      <el-button type="primary" @click="levelOne">一级分类</el-button>
      <el-button type="primary" @click="levelTwo">二级分类</el-button>
      <el-button type="primary" @click="goodsClassDialog">添加分类</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="wrapper">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
         <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          fixed
          prop="id"
          label="分类ID"
          width="120">
        </el-table-column>
        <el-table-column
          prop="cla_name"
          label="分类名称"
          show-overflow-tooltip
          width="120">
        </el-table-column>
        <el-table-column
          prop="cla_level"
          label="分类级别"
          show-overflow-tooltip
          width="120">
        </el-table-column>
        <el-table-column
          prop="cla_parentId"
          label="父类ID"
          show-overflow-tooltip
          width="120">
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="添加时间"
          width="300">
        </el-table-column>
        <el-table-column
          prop="updatedAt"
          label="更新时间"
          show-overflow-tooltip
          width="300">
        </el-table-column>
        <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="page">
      <Paging :total="total" :pageSize="pageSize" @changePage="changePage"></Paging>
    </div>
    <!-- 弹窗 -->
    <GoodsClassDialog ref="dialog" :title="title" :row="row" :addButton="addButton"></GoodsClassDialog>
  </div>
</template>

<script>
// 分页器
import Paging from '@/components/Paging'
// 商品弹窗
import GoodsClassDialog from '@/views/GoodsClass/GoodsClassDialog'
import {mapGetters} from 'vuex'
export default {
  name: 'GoodsClass',
  data() {
    return {
      // 分类等级
      level: 1,
      // 初始pageNum
      paNum: 1,
      // 初始pageSize
      paSize: 10,
      // 弹窗控制是否显示
      dialogShow: false,
      // 弹窗标题
      title: '',
      // 传递给弹窗的商品信息
      row: {},
      addButton: ''

    }
  },
  components: {
    Paging,
    GoodsClassDialog
  },
  mounted() {
    this.getGoodsClassData()
  },
  computed: {
    ...mapGetters(['goodsClassList', 'goodsClassTotal', 'goodsClassSize']),
    // ...mapState(['goodsInfo']),
    // 商品列表
    tableData() {
      return this.goodsClassList
    },
    // 商品总数
    total() {
      return this.goodsClassTotal
    },
    // 商品一页数量
    pageSize() {
      return parseInt(this.goodsClassSize)
    }
  },
  inject: ['reload'],
  methods: {
    // 获取分类
    getClass() {
      let level = 1
      let paNum = 1
      let paSize = 20
      this.$store.dispatch('getGoodsClass', {level, paNum, paSize})
    },
    // 将获取数据封装为一个函数
    getGoodsClassData() {
      const {level, paNum, paSize} = this
      this.$store.dispatch('getGoodsClass', {paNum, paSize, level})
    },
    // 编辑按钮
    handleEdit(index, row) {
      this.getClass()
      this.$refs.dialog.dialogShow = true
      this.title = '编辑分类',
      this.addButton = '立即修改'
      this.row = row
    },
    // 删除按钮
    handleDelete(index, {id}) {
      // console.log(id)
       this.$confirm('此操作将删除该分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('deleteClass', id)
          this.$message({
            type: 'success',
            message: `删除成功,删除分类ID:${id}`
          });
          this.reload()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })         
        })
    },
    // 获取页码
    changePage(pageNum) {
      this.paNum = pageNum
      this.getGoodsClassData()
    },
    // 显示弹窗
    goodsClassDialog() {
      this.$refs.dialog.dialogShow = true
      this.title = '添加分类',
      this.addButton = '立即添加'
    },
    // 一级分类
    levelOne() {
      this.level = 1
      this.getGoodsClassData()
    },
    // 二级分类
    levelTwo() {
      this.level = 2
      this.getGoodsClassData()
    }
  },
}
</script>
