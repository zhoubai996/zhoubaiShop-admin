<style lang="less" scoped></style>
<template>
  <div class="goodsdialog-container">
    <el-dialog :title="title" :visible.sync="dialogShow" width="70%">
      <!-- 内容区域 -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="分类名称" prop="cla_name">
          <el-input v-model="ruleForm.cla_name"></el-input>
        </el-form-item>
        <el-form-item label="分类级别" prop="cla_level">
          <el-select v-model="ruleForm.cla_level" placeholder="请选择商品分类">
            <el-option label="一级分类" value="1"></el-option>
            <el-option label="二级分类" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="父级分类" prop="cla_parentId">
          <el-select v-model="ruleForm.cla_parentId" placeholder="请选择商品分类">
            <el-option label="默认" value="0"></el-option>
            <el-option v-for="item in goodsClassList" :label="`名称: ${item.cla_name}    ID: ${item.id}`" :value="item.id" :key="item.id"></el-option>
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
      default: '添加分类',
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
      dialogShow: false,
      ruleForm: {
        cla_name: '',
        cla_level: 1,
        cla_parentId: 0,
      },
      rules: {
        cla_name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
        cla_level: [{ required: true, message: '请选择分类等级', trigger: 'change' }],
        cla_parentId: [{ required: true, message: '请选择父级分类', trigger: 'change' }],
      },
    }
  },
  watch: {
    row(val) {
      this.ruleForm.cla_name = val.cla_name
      this.ruleForm.cla_level = parseInt(val.cla_level)
      this.ruleForm.cla_parentId = parseInt(val.cla_parentId)
    },
  },
  created() {},
  inject: ['reload'],
  computed: {
    ...mapGetters(['goodsClassList']),
  },
  methods: {
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
      if (this.title === '添加分类') {
        // 添加分类方法
        this.ruleForm.cla_level = parseInt(this.ruleForm.cla_level)
        this.ruleForm.cla_parentId = parseInt(this.ruleForm.cla_parentId)
        this.$store.dispatch('addCla', this.ruleForm)
        this.reload()
      } else {
        // 修改分类
        let id = this.row.id
        this.ruleForm.cla_level = parseInt(this.ruleForm.cla_level)
        this.ruleForm.cla_parentId = parseInt(this.ruleForm.cla_parentId)
        let claInfo = this.ruleForm
        console.log(id)
        this.$store.dispatch('alterCla', { id, claInfo })
        this.ruleForm = {
          cla_name: '',
          cla_level: 1,
          cla_parentId: 0,
        }
      }
      this.dialogShow = false
      this.reload()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    dialogShows() {
      this.dialogShow = false
      this.ruleForm = {
        cla_name: '',
        cla_level: 1,
        cla_parentId: 0,
      }
    },
  },
}
</script>
