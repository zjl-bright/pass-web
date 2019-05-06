<template>
  <div class="app-container form-container">
    <el-radio-group v-model="labelPosition" size="small">
      <el-radio-button label="left">左对齐</el-radio-button>
      <el-radio-button label="right">右对齐</el-radio-button>
      <el-radio-button label="top">顶部对齐</el-radio-button>
    </el-radio-group>
    <el-form ref="formLabelAlign" :label-position="labelPosition" :model="formLabelAlign" :rules="rules" label-width="80px" class="module-config-form">
      <el-form-item label="目标路径" prop="target">
        <el-input v-model="formLabelAlign.target" placeholder="请输入目标路径" />
      </el-form-item>
      <el-form-item label="打包命令" prop="buildCmd">
        <el-input v-model="formLabelAlign.buildCmd" placeholder="请输入打包命令" />
      </el-form-item>
      <el-form-item label="Dockerfile" prop="dockerFileType">
        <el-radio-group v-model="formLabelAlign.dockerFileType">
          <el-radio label="1">填写内容</el-radio>
          <el-radio label="2">指定路径</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="formLabelAlign.dockerFileType == 1" label="内容" prop="dockerFileContent">
        <el-input v-model="formLabelAlign.dockerFileContent" type="textarea" :autosize="{ minRows: 6, maxRows: 10}" placeholder="请输入内容" />
      </el-form-item>
      <el-form-item v-else label="路径" prop="dockerFilePath">
        <el-input v-model="formLabelAlign.dockerFilePath" placeholder="请输入路径" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('formLabelAlign')">Submit</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    // const clearValidate = () => {
    //   console.log('1')
    // }
    return {
      labelPosition: 'right',
      formLabelAlign: {
        target: '',
        buildCmd: '',
        dockerFileType: '1',
        dockerFileContent: '',
        dockerFilePath: ''
      },
      rules: {
        target: [
          { required: true, message: '请输入目标路径', trigger: 'blur' }
          // { validator: clearValidate, trigger: 'blur' }
        ],
        buildCmd: [
          { required: true, message: '请输入打包命令', trigger: 'blur' }
        ],
        dockerFileContent: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        dockerFilePath: [
          { required: true, message: '请输入路径', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message('submit!')
          console.log(JSON.stringify(this.formLabelAlign))
        } else {
          this.$message({
            message: 'error submit!!',
            type: 'warning'
          })
          return false
        }
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.form-container {
  width: 80%;
  margin: 0 auto;
}
.module-config-form {
  margin-top: 20px;
}
</style>
