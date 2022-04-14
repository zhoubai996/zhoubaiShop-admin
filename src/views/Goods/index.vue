<style lang="less" scoped>
.Goods-container {
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
  <div class="Goods-container">
    <!-- 搜索区域 -->
    <div class="header">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button type="primary" @click="goodSearch">搜索</el-button>
      <!-- <router-link to="/add-goods">
      <el-button type="primary">添加(页面)</el-button>
      </router-link> -->
      <el-button type="primary" @click="goodsDialog">添加商品</el-button>
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
          label="商品ID"
          width="120">
        </el-table-column>
        <el-table-column
          prop="goods_name"
          label="商品名称"
          show-overflow-tooltip
          width="120">
        </el-table-column>
        <el-table-column
          prop="goods_price"
          label="商品价格"
          show-overflow-tooltip
          width="120">
        </el-table-column>
        <el-table-column
          prop="goods_num"
          label="商品数量"
          show-overflow-tooltip
          width="120">
        </el-table-column>
        <el-table-column
          prop="goods_classification"
          label="商品类别"
          width="120">
        </el-table-column>
        <el-table-column
          prop="goods_img"
          label="商品图片"
          show-overflow-tooltip
          width="300">
          <!-- <img :src="`http://localhost:8000/${tableData[0].goods_img}`" width="100px" height="80px"> -->
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="添加时间"
          show-overflow-tooltip
          width="200">
        </el-table-column>
        <el-table-column
          prop="updatedAt"
          label="修改时间"
          show-overflow-tooltip
          width="200">
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
    <GoodsDialog ref="dialog" :title="title" :row="row" :addButton="addButton"></GoodsDialog>
  </div>
</template>

<script>
// 分页器
import Paging from '@/components/Paging'
// 商品弹窗
import GoodsDialog from '@/views/Goods/GoodsDialog.vue'
import {mapGetters} from 'vuex'
export default {
  name: 'Goods',
  data() {
    return {
      // 搜索关键字
      input: '',
      // 初始pageNum
      paNum: 1,
      // 初始pageSize
      paSize: 10,
      // 控制是否是搜索的数据
      goodsSearch: true,
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
    GoodsDialog
  },
  mounted() {
    this.getGoodsData()
  },
  computed: {
    ...mapGetters(['goodsList', 'goodsTotal', 'goodsSize', 'goodsSearchList', 'goodsSearchTotal', 'goodsSearchSize', 'classification']),
    // ...mapState(['goodsInfo']),
    // 商品列表
    tableData() {
      // this.goodsList.forEach(item1 => {
      //   let newArr = this.classification.filter(item2 => {
      //     return item1.goods_classification === item2.id
      //   })
      //   item1.goods_classification = newArr[0].cla_name
      // })
      return this.goodsSearch ? this.goodsList : this.goodsSearchList
    },
    // 商品总数
    total() {
      return this.goodsSearch ? this.goodsTotal : this.goodsSearchTotal
    },
    // 商品一页数量
    pageSize() {
      return this.goodsSearch ? parseInt(this.goodsSize) : parseInt(this.goodsSearchSize)
    }
  },
  inject:['reload'],
  methods: {
    // 将获取数据封装为一个函数
    getGoodsData() {
      let {paNum, paSize} = this
      this.$store.dispatch('getGoodsInfo', {paNum, paSize})
    },
    // 编辑按钮
    handleEdit(index, row) {
      this.$refs.dialog.dialogShow = true
      this.title = '编辑商品',
      this.addButton = '立即修改'
      this.row = row
    },
    // 删除按钮
    handleDelete(index, {id}) {
      // console.log(id)
        this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('shelvesGood', id)
          this.$message({
            type: 'success',
            message: `删除成功,删除商品ID:${id}`
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
      if (this.goodsSearch) {
        this.getGoodsData()
      } else {
        this.goodSearch()
      }
    },
    // 搜索商品
    goodSearch() {
      let {paNum, paSize, input} = this
      if (input) {
        paNum = 1
        this.$store.dispatch('goodsSearch', {paNum, paSize, input})
        this.goodsSearch = false
      } else {
        paNum = 1
        this.$store.dispatch('getGoodsInfo', {paNum, paSize})
        this.goodsSearch = true
      }
      // console.log(this.tableData)
    },
    // 显示弹窗
    goodsDialog() {
      this.$refs.dialog.dialogShow = true
      this.title = '添加商品',
      this.addButton = '立即添加'
    },
  },
}
</script>

