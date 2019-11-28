<template>
  <el-dialog
    :title="project._id ? '修改项目' : '新增项目'"
    :visible="visible"
    width="520px"
    @close="close"
  >
    <el-form
      ref="addProjectForm"
      label-position="right"
      label-width="100px"
      :model="project"
      :rules="rules"
    >
      <el-form-item prop="name" label="项目名称:">
        <el-input v-model="project.name" placeholder="请输入项目名称" />
      </el-form-item>
      <el-form-item prop="desc" label="项目简介:">
        <el-input v-model="project.desc" type="textarea" placeholder="请输入项目描述" maxlength="100" show-word-limit />
      </el-form-item>
      <el-form-item prop="dirName" label="目录名称:">
        <el-input v-model="project.dirName" placeholder="请输入目录名称" />
      </el-form-item>
      <el-form-item label="项目Logo:">
        <upload :fileList.sync="project.logo" :limit="1" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addProject, editProject } from '@/api/project'
import upload from '@/components/common/upload'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object
    }
  },
  components: {
    upload
  },
  data () {
    let current = Object.assign({
      name: '',
      desc: '',
      dirName: '',
      logo: []
    }, this.item)

    return {
      rules: {
        name: [
          { required: true, message: '', trigger: 'blur' }
        ],
        dirName: [
          { required: true, message: '', trigger: 'blur' }
        ]
      },
      project: current,
      imgSrc: "http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/upload/images/fd479181-7e85-41a1-a524-dcb46132ba57.jpg"
    }
  },
  watch: {
    item(val) {
      this.project = Object.assign({
        name: '',
        desc: '',
        dirName: '',
        logo: []
      }, val)
    }
  },
  methods: {
    submit () {
      let params = {
        name: this.project.name,
        desc: this.project.desc,
        dirName: this.project.dirName,
        logo: 'http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/upload/images/fd479181-7e85-41a1-a524-dcb46132ba57.jpg'
      }

      if (this.project.logo && this.project.logo.length) {
        params.logo = this.project.logo[0].url
      }

      if (this.project._id) {
        params._id = this.project._id

        editProject(params).then(res => {
          if (res.success) {
            this.$emit('refresh')
            this.close()
          } else {
            this.$message.error(res.message)
          }
        })
      } else {
        addProject(params).then(res => {
          if (res.success) {
            this.$emit('refresh')
            this.close()
          } else {
            this.$message.error(res.message)
          }
        })
      }
    },
    close () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
