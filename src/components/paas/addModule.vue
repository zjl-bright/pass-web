<template>
  <el-dialog
    :title="title"
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
    module: {
      type: Object
    }
  },
  data() {
    const form = Object.assign({
      partId: this.module.id,
      name: '',
      target: '',
      cmd: ''
    }, JSON.parse(JSON.stringify(this.module)))

    return {
      rules: {

      },
      moduleForm: form
    }
  },
  computed: {
    title() {
      return this.moduleForm._id ? '修改配置' : '添加模块' 
    }
  },
  watch: {
    module(val) {
      this.moduleForm = Object.assign({
        partId: val.id,
        name: '',
        target: '',
        cmd: ''
      }, JSON.parse(JSON.stringify(val)))
    }
  },
  methods: {
    submit() {
      const params = JSON.parse(JSON.stringify(this.moduleForm))
      
      addModule(params).then(res => {
        if (res.success) {
          this.$emit('refresh')
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
