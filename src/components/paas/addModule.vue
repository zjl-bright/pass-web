<template>
  <el-dialog
    title="添加模块"
    :visible="visible"
    width="520px"
    @close="close"
  >
    <el-form
      ref="addModuleForm"
      label-position="right"
      label-width="100px"
      :model="moduleForm"
      :rules="rules"
    >
      <el-form-item prop="name" label="模块名称:">
        <el-input v-model="moduleForm.name" placeholder="请输入模块名称" />
      </el-form-item>
      <el-form-item prop="target" label="目标路径:">
        <el-input v-model="moduleForm.target" placeholder="请输入目标路径" />
      </el-form-item>
      <el-form-item prop="cmd" label="打包命令">
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
    },
    partId: {
      type: String
    }
  },
  data() {
    return {
      rules: {

      },
      moduleForm: {
        partId: this.partId,
        name: '',
        target: '',
        cmd: ''
      }
    }
  },
  watch: {
    partId(val) {
      this.moduleForm.partId = val
    }
  },
  methods: {
    submit() {
      console.log(this.moduleForm)
      // const params = {
      //   _id: this.moduleForm.partId,
      //   modules: [
      //     this.moduleForm
      //   ]
      // }
      
    },
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
