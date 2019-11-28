<template>
  <el-dialog
    title="添加应用单元"
    :visible="visible"
    width="520px"
    @close="close"
  >
    <el-form
      ref="addPartForm"
      label-position="right"
      label-width="100px"
      :model="moduleForm"
      :rules="rules"
    >
      <el-form-item prop="name" label="应用名称:">
        <el-input v-model="moduleForm.name" placeholder="请输入应用单元名称" />
      </el-form-item>
      <el-form-item prop="gitPath" label="代码库:">
        <el-input v-model="moduleForm.gitPath" placeholder="请输入git地址" />
      </el-form-item>
      <el-form-item prop="cmd" label="cmd:">
        <el-input v-model="moduleForm.cmd" type="textarea" placeholder="请输入打包命令" maxlength="200" />
      </el-form-item>
      <el-form-item>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { addModule } from '@/api/module'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rules: {

      },
      moduleForm: {
        name: '',
        gitPath: '',
        cmd: '',
        envs: [],
        modules: [],
        projectId: this.$route.query.projectId
      }
    }
  },
  methods: {
    submit() {
      addModule(this.moduleForm).then(res => {
        if (res.success) {
          this.$notify({
            title: "Success",
            message: "新增成功!",
            type: "success",
            duration: 2000
          })
          this.$emit("refresh")
          this.close()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>