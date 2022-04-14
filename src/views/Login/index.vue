<style lang="less" scoped>
.login-container {
  .body {
    background-image: url(https://img.codestu.cn/2022/04/14/e7951947479a6.jpeg);
    min-height: 1080px;
    .login-box {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0px;
    margin: auto;
    height: 600px;
    width: 800px;
    border-radius: 5px;
    .left-box {
      float: left;
      height: 600px;
      width: 400px;
      background-image: url(https://img.codestu.cn/2022/04/04/78f9fe49a609d.jpg);
      border-radius: 5px 0 0 5px;
      .communication {
        position: absolute;
        left: 100px;
        bottom: 90px;
        width: 250px;
        height: 80px;
        ul {
          list-style: none;
          li {
            float: left;
            width: 50px;
            height: 50px;
            margin-right: 30px;
            border-radius: 50%;
            background-color: #fff;
            i {
              display: block;
              width: 50px;
              height: 50px;
              font-size: 51px;
              line-height: 50px;
            }
            
          }
          li:nth-child(1) a {
              color: #C71D23;
          }
          li:nth-child(2) a {
            color: #4186F5;
          }
          li:nth-child(3) a {
            color: #028CB0;
          }
        }
      }
      .instructions {
        position: absolute;
        left: 80px;
        bottom: 20px;
        width: 250px;
        height: 80px;
        color: #ffffff;
        font-size: 16px;
        line-height: 80px;
        // background-color: blue;
      }
    }
    .right-box {
      position: relative;
      float: right;
      height: 600px;
      width: 400px;
      background-color: #FFFFFF;
      border-radius: 0 5px 5px 0;
      .logo {
        position: absolute;
        top: 160px;
        left: 75px;
        width: 250px;
        height: 90px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .login {
        position: absolute;
        left: 10px;
        bottom: 40px;
        
      }
    }
  }
  }
}
</style>
<template>
  <div class="login-container">
    <div class="body">
      <div class="login-box">
        <div class="left-box">
          <div class="communication">
            <ul>
              <li>
                <a href="https://gitee.com/zhoubaiwl" title="昼白的gitee" target="_blank"><i class="iconfont icon-gitee"></i></a>
              </li>
              <li>
                <a href="https://www.github.com/zhoubai996" title="昼白的github" target="_blank"><i class="iconfont icon-github1"></i></a>
              </li>
              <li>
                <a href="https://www.zhoubaiwl.club" title="昼白的小站" target="_blank"><i class="iconfont icon-wordpress"></i></a>
              </li>
            </ul>
          </div>
          <div class="instructions">
            欢迎访问昼白商城后台管理系统
          </div>
        </div>
        <div class="right-box">
          <div class="logo">
            <img src="https://img.codestu.cn/2021/11/20/cd5a17a89deb0.jpg">
          </div>
          <div class="login">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="账号" prop="user_name">
                <el-input type="text" v-model="ruleForm.user_name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'Login',
  data() {
    var validatepassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'));
      } else {
        if (this.ruleForm.password !== '') {
          this.$refs.ruleForm.validateField('checkpassword');
        }
        callback()
      }
    };
    var validatepassword2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    };
    return {
      ruleForm: {
        user_name: '',
        password: ''
      },
      rules: {
        user_name: [
          { validator: validatepassword, trigger: 'blur' }
        ],
        password: [
          { validator: validatepassword2, trigger: 'blur' }
        ]
      }
    };
  },
  created() {
  },
  computed: {
    ...mapGetters(['isAdmin', 'errorInfo'])
  },
  methods: {
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 验证通过，调用登录接口
            this.$store.dispatch('login', this.ruleForm)
            // 1.存储登录信息/数据持久化(vuex中完成)
            // 2.跳转网页
            // 2.1给时间让vuex存储数据
            setTimeout(() => {
              if (!this.isAdmin) {
              this.$notify.error({
                title: '错误',
                message: '无权限的账号'
              })
              return
              }
              this.$router.push('/')
            }, 1000)
          } else {
            this.$notify.error({
                title: '错误',
                message: '输入的格式有误！'
              })
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
}
</script>
