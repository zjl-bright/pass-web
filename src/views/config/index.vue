<template>
  <div class="app-container form-container">
    <el-radio-group v-model="labelPosition" size="small">
      <el-radio-button label="left">左对齐</el-radio-button>
      <el-radio-button label="right">右对齐</el-radio-button>
      <el-radio-button label="top">顶部对齐</el-radio-button>
    </el-radio-group>
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" class="module-config-form">
      <el-form-item label="目标路径">
        <el-input v-model="formLabelAlign.target" placeholder="请输入目标路径" />
      </el-form-item>
      <el-form-item label="打包命令">
        <el-input v-model="formLabelAlign.buildCmd" placeholder="请输入打包命令" />
      </el-form-item>
      <el-form-item label="Dockerfile">
        <el-radio-group v-model="formLabelAlign.dockerFileType">
          <el-radio label="填写内容" />
          <el-radio label="指定路径" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="formLabelAlign.dockerFileContent" type="textarea" :autosize="{ minRows: 6, maxRows: 10}" placeholder="请输入内容" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Submit</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        target: '',
        buildCmd: '',
        dockerFileType: '',
        dockerFileContent: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
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
