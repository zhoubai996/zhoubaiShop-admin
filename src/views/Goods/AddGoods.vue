<style lang="less" scoped>
.addGoods-container {
  margin: 20px;
  .title {
    padding: 10px;
    background-color: #fff;
    border: 1px solid #eee;
    margin-bottom: 10px;
  }
  .form-data {
    width: calc(100% - 40px);
    padding: 20px;
    background-color: #fff;
    border: 1px solid #eee;
  }
}
.line {
  text-align: center;
}
</style>
<template>
  <div class="addGoods-container">
    <!-- 面包屑 -->
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/goods' }">商品管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/add-goods' }">商品添加</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 表单数据 -->
    <div class="form-data">
      <!-- 内容区域 -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="ruleForm.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="goods_price">
          <el-input v-model="ruleForm.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="商品库存" prop="goods_num">
          <el-input v-model="ruleForm.goods_num"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="goods_img">
          <el-upload
            class="upload-demo"
            action="/api/goods/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="uploadSuccess"
            :file-list="fileList"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品分类" prop="goods_classification">
          <el-select v-model="ruleForm.goods_classification" placeholder="请选择商品分类">
            <el-option label="分类一" value="1"></el-option>
            <el-option label="分类二" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddGoods',
  data() {
    return {
      fileList: [],
      ruleForm: {
          goods_name: '',
          goods_price: '',
          goods_num: '',
          goods_img: '',
          goods_classification: 0,
      },
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        goods_num: [
          { required: true, message: '请输入商品数量', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        goods_classification: [
          { required: true, message: '请选择商品分类', trigger: 'change' }
        ],
      }
    }
  },
  created() {
  },
  computed: {
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$notify({
          title: '创建成功',
          message: '创建成功',
          type: 'success'
        })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
      // 添加商品方法
      this.$store.dispatch('addGoods', this.ruleForm)
      this.$emit('changeDialog')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    // 上传图片成功回调
    uploadSuccess(response, file, fileList) {
      if (response.code === 0) {
        this.ruleForm.goods_img = response.data.goods_img
        this.$notify({
          title: `${response.message}`,
          message: `${response.data.goods_img}`,
          type: 'success'
        })
      } else {
        this.$notify({
          title: `${response.message}`,
          message: `${file.name}`,
          type: 'warning'
        })
      }
    }
  }
}
</script>


