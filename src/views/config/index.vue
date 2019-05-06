<template>
  <div class="app-container form-container">
    <el-radio-group v-model="labelPosition" size="small">
      <el-radio-button label="left">左对齐</el-radio-button>
      <el-radio-button label="right">右对齐</el-radio-button>
      <el-radio-button label="top">顶部对齐</el-radio-button>
    </el-radio-group>
    <el-form ref="formLabelAlign" :label-position="labelPosition" :model="formLabelAlign" :rules="rules" label-width="80px" class="module-config-form">
      <!-- 打包配置 -->
      <el-form-item label="目标路径" prop="target">
        <el-tooltip content="执行 Dockerfile 的目标路径, 从工程根目录算起" placement="right" effect="light">
          <el-input v-model="formLabelAlign.target" placeholder="请输入目标路径" />
        </el-tooltip>
      </el-form-item>
      <el-form-item label="打包命令" prop="buildCmd">
        <el-tooltip content="打包应用的命令, 在工程根目录执行, 可以填写多行" placement="right" effect="light">
          <el-input v-model="formLabelAlign.buildCmd" type="textarea" :autosize="{ minRows: 1, maxRows: 10}" placeholder="请输入打包命令" />
        </el-tooltip>
      </el-form-item>
      <el-form-item label="Dockerfile" prop="dockerFileType">
        <el-radio-group v-model="formLabelAlign.dockerFileType">
          <el-radio label="1">填写内容</el-radio>
          <el-radio label="2">指定路径</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="formLabelAlign.dockerFileType == 1" label="内容" prop="dockerFileContent">
        <el-tooltip placement="right" effect="light">
          <div slot="content">
            Dockerfile ，会被复制到目标路径下
            <br>
            执行以便生成 Docker Image
          </div>
          <el-input v-model="formLabelAlign.dockerFileContent" type="textarea" :autosize="{ minRows: 6, maxRows: 10}" placeholder="请输入内容" />
        </el-tooltip>
      </el-form-item>
      <el-form-item v-else label="路径" prop="dockerFilePath">
        <el-tooltip placement="right" effect="light">
          <div slot="content">
            Dockerfile 路径，从工程根目录算起,
            <br>
            会被复制到目标路径下执行以便生成 Docker Image
          </div>
          <el-input v-model="formLabelAlign.dockerFilePath" placeholder="请输入路径" />
        </el-tooltip>
      </el-form-item>
      <!-- 部署配置 -->
      <el-form-item label="端口映射" prop="ports">
        <el-tooltip placement="right" effect="light">
          <div slot="content">
            Docker 内外暴露的端口，格式为[外部端口: ]内部
            <br>
            端口, 例如：'8088: 8080', '8080',
            <br>
            “0”。可写多个，一行一个。
            <br>
            当省略外部端口时, 外部端口将会是一个随机可用
            <br>
            的端口,
            <br>
            并且通过环境变量 TERMINUS_PORT_内部端口=
            <br>
            外部端口 写入 container 内。
            <br>
            当单独写一个 0 时，内外端口都会是一个随机可
            <br>
            用端口，并且通过环境变量 TERMINUS_PORT=
            <br>
            随机端口 写入 container 内。
          </div>
          <el-input v-model="formLabelAlign.ports" type="textarea" :autosize="{ minRows: 2, maxRows: 5}" placeholder="请输入端口" />
        </el-tooltip>
      </el-form-item>
      <el-form-item label="环境变量" prop="env">
        <el-tooltip placement="right" effect="light">
          <div slot="content">
            写入 container 内的环境变量，格式为：
            <br>
            ENV_KEY=env_value 。
            <br>
            可写多个, 一行一个。
            <br>
            平台会内置数个环境变量，包含上述暴露端口中的
            <br>
            TERMINUS_PORT_ 系列，和
            <br>
            TERMINUS_HOST=宿主机IP 。
          </div>
          <el-input v-model="formLabelAlign.env" type="textarea" :autosize="{ minRows: 10, maxRows: 15}" placeholder="请输入环境变量" />
        </el-tooltip>
      </el-form-item>
      <el-form-item label="日志目录" prop="logDir">
        <el-tooltip placement="right" effect="light">
          <div slot="content">
            在这里指定容器内日志的保存位置后,
            <br>
            可通过平台查看容器内日志内容
          </div>
          <el-input v-model="formLabelAlign.logDir" placeholder="请输入日志目录" />
        </el-tooltip>
      </el-form-item>
      <!-- submit -->
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
      // tooltip: true,
      formLabelAlign: {
        target: '',
        buildCmd: '',
        dockerFileType: '1',
        dockerFileContent: '',
        dockerFilePath: '',
        ports: '',
        env: '',
        logDir: ''
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
        ],
        ports: [
          { required: true, message: '请输入端口映射', trigger: 'blur' }
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
  padding-right: 250px;
}
.module-config-form {
  margin-top: 20px;
}
</style>
