<style lang="less" scoped></style>
<template>
  <div class="goodsdialog-container">
    <el-dialog :title="title" :visible.sync="dialogShow" width="70%">
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
          <el-upload class="upload-demo" action="/api/goods/upload" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="uploadSuccess" :file-list="fileList" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品分类" prop="goods_classification">
          <el-select v-model="ruleForm.goods_classification" placeholder="请选择商品分类">
            <el-option v-for="item in classification" :label="`名称: ${item.cla_name}    ID: ${item.id}`" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">{{ addButton }}</el-button>
          <el-button @click="dialogShows">取 消</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'GoodsDialog',
  props: {
    title: {
      type: String,
      default: '添加商品',
    },
    row: {
      type: Object,
      default: function () {
        return {}
      },
    },
    addButton: {
      type: String,
      default: '立即添加',
    },
  },
  data() {
    return {
      url: 'http://localhost:8000',
      dialogShow: false,
      fileList: [],
      ruleForm: {
        goods_name: '',
        goods_price: 0,
        goods_num: 0,
        goods_img: '',
        goods_classification: 0,
      },
      rules: {
        goods_name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        goods_price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
        goods_num: [{ required: true, message: '请输入商品数量', trigger: 'blur' }],
        goods_classification: [{ required: true, message: '请选择商品分类', trigger: 'change' }],
      },
    }
  },
  inject: ['reload'],
  watch: {
    row(val) {
      this.ruleForm.goods_name = val.goods_name
      this.ruleForm.goods_price = parseInt(val.goods_price)
      this.ruleForm.goods_num = parseInt(val.goods_num)
      this.ruleForm.goods_img = val.goods_img
      this.ruleForm.goods_classification = parseInt(val.goods_classification)
      this.fileList = []
      this.fileList.push({ name: '名称', url: `${this.url}/${val.goods_img}` })
    },
  },
  created() {
    this.getClass()
  },
  computed: {
    ...mapGetters(['classification']),
  },
  methods: {
    // 获取分类
    getClass() {
      this.$store.dispatch('getClassification')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$notify({
            title: '创建成功',
            message: '创建成功',
            type: 'success',
          })
        } else {
          this.$notify({
            title: '创建失败',
            message: '创建失败',
            type: 'waring',
          })
          return false
        }
        // this.dialogShow = false
      })
      if (this.title === '添加商品') {
        // 添加商品方法
        this.ruleForm.goods_price = parseInt(this.ruleForm.goods_price)
        this.ruleForm.goods_num = parseInt(this.ruleForm.goods_num)
        this.$store.dispatch('addGoods', this.ruleForm)
        this.reload()
      } else {
        // 修改商品
        let id = this.row.id
        this.ruleForm.goods_price = parseInt(this.ruleForm.goods_price)
        this.ruleForm.goods_num = parseInt(this.ruleForm.goods_num)
        let information = this.ruleForm
        this.$store.dispatch('alterGoodsInfo', { id, information })
        this.ruleForm = {
          goods_name: '',
          goods_price: 0,
          goods_num: 0,
          goods_img: '',
          goods_classification: 0,
        }
      }
      this.dialogShow = false
      this.reload()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    // 上传图片成功回调
    uploadSuccess(response, file, fileList) {
      if (response.code === 0) {
        this.ruleForm.goods_img = response.data.goods_img
        this.$notify({
          title: `${response.message}`,
          message: `${response.data.goods_img}`,
          type: 'success',
        })
      } else {
        this.$notify({
          title: `${response.message}`,
          message: `${file.name}`,
          type: 'warning',
        })
      }
    },
    dialogShows() {
      this.dialogShow = false
      this.ruleForm = {
          goods_name: '',
          goods_price: 0,
          goods_num: 0,
          goods_img: '',
          goods_classification: 0,
        }
    }
  },
}
</script>
