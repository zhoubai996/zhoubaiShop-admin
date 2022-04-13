<style lang="less" scoped>
.Home-container {
  margin: 20px;
  .header {
    width: 100%;
    height: 40px;
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 5px;
    line-height: 40px;
    font-size: 24px;
    text-align: center;
  }
  .content {
    width: 100%;
    height: 400px;
    margin-bottom: 40px;
    div {
      float: left;
      margin-right: 20px;
    }
    .box1 {
      width: 400px;
      height: 400px;
      padding: 10px;
      background-color: #fff;
      border-radius: 5px;
    }
    .box2 {
      width: 400px;
      height: 400px;
      padding: 10px;
      background-color: #fff;
      border-radius: 5px;
    }
  }
  .footer {
    width: 100%;
    height: 400px;
    background-color: #fff;
    border-radius: 5px;
    .title {
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 20px;
    }
    .left {
      float: left;
      width: 400px;
      height: 400px;
      padding: 20px;
    }
  }
}
</style>
<template>
  <div class="Home-container">
    <div class="header">
      <span>昼白后台数据统计</span>
    </div>
    <div class="content">
      <div class="box1" ref="box1"></div>
      <div class="box2" ref="box2"></div>
      <div class="box3"></div>
      <div class="box4"></div>
    </div>
    <div class="footer">
      <div class="title">技术栈</div>
      <div class="left">
        <ul>
        <li>vue</li>
        <li>vue-router</li>
        <li>vuex</li>
        <li>element ui</li>
        <li>axios</li>
      </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'Home',
  data() {
    return {
      data: [
        { value: 0, name: '商品数量' },
        { value: 0, name: '用户数量' },
      ],
      dataClass: [
        { value: 0, name: '一级分类' },
        { value: 0, name: '二级分类' },
      ]
    }
  },
  mounted() {
    this.goodsNum()
    this.userNum()
    this.goodsCla()
    this.goodsClass()
    this.dataStatistics()
    this.dataCla()
  },
  computed: {
    ...mapGetters(['goodsTotal', 'userTotal', 'goodsClassTotal'])
  },
  methods: {
    // 获取商品数据
    goodsNum() {
      let paNum = 1
      let paSize = 10
      this.$store.dispatch('getGoodsInfo', {paNum, paSize})
      this.data[0].value = this.goodsTotal
    },
    // 获取用户数量
    userNum() {
      let paNum = 1
      let paSize = 10
      this.$store.dispatch('userAllInfo', {paNum, paSize})
      this.data[1].value = this.userTotal
    },
    // 获取分类数量1
    goodsCla() {
      let paNum = 1
      let paSize = 10
      let level = 1
      this.$store.dispatch('userAllInfo', {paNum, paSize, level})
      this.dataClass[0].value = this.goodsClassTotal
    },
    // 获取分类数量2
    goodsClass() {
      let paNum = 1
      let paSize = 10
      let level = 2
      this.$store.dispatch('userAllInfo', {paNum, paSize, level})
      this.dataClass[1].value = this.goodsClassTotal
    },
    // 全局数据统计
    dataStatistics() {
      let box1 = this.$refs.box1
      let myBox1 = this.$echarts.init(box1)
      let option = {
        title: {
          text: '用户/商品',
          subtext: '实时数据',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '网站数据',
            type: 'pie',
            radius: '50%',
            data: this.data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      option && myBox1.setOption(option)
    },
    dataCla() {
      let box2 = this.$refs.box2
      let myBox2 = this.$echarts.init(box2)
      let option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '网站数据',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.dataClass
          }
        ]
      }
      option && myBox2.setOption(option);
    }
  },
}
</script>


