<template>
  <div class="app-container">
    <div class="page-title">
      <span>应用列表
        <span v-if="envOptions && envOptions.length">
        <el-select
          v-model="totalEnvs"
          size="mini"
          placeholder="环境"
          style="width: 100px;"
          @change="handleChangeEnv"
        >
          <el-option key="10086" label="ALL" value=""></el-option>
          <el-option
            v-for="(item, index) in envOptions"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </span>
      </span>
      <span class="btn-box">
        <el-button size="mini" @click="handleAddPart" plain>添加应用</el-button>
      </span>
      <add-part-dialog
        v-if="addPartDialogVisible"
        :visible.sync="addPartDialogVisible"
        :part="currentPart"
        @refresh="render"
      />
    </div>
    <part-container
      ref="partContainer"
      v-for="(item, index) in part"
      :key="item._id"
      :part="item"
      :index="index"
      @addModule="addModule"
      @refresh="render"
      @updateEnv="updateEnv"
      @updatePart="updatePartBaseInfo"
    />

    <!-- maintain-env-dialog -->
    <update-env-dialog
      v-if="updateEnvDialogVisible"
      :visible.sync="updateEnvDialogVisible"
      :part="currentPart"
      @updatePart="updatePartDetail"
    />

    <!-- add-module-dialog -->
    <add-module-dialog
      :visible.sync="addModuleDialogVisible"
      :module="currentModule"
      @refresh="render"
    />
  </div>
</template>

<script>
import { getPart, updatePart } from '@/api/part'
import addPartDialog from '@/components/paas/addPart'
import addModuleDialog from '@/components/paas/addModule'
import partContainer from '@/components/paas/part'
import updateEnvDialog from '@/components/paas/env'

export default {
  components: {
    addPartDialog,
    partContainer,
    addModuleDialog,
    updateEnvDialog
  },
  data() {
    return {
      part: [],
      currentModule: {},
      listLoading: true,
      addPartDialogVisible: false,
      addModuleDialogVisible: false,
      currentPart: {},
      updateEnvDialogVisible: false,
      envOptions: [],
      totalEnvs: ''
    }
  },
  created() {
    this.render()
  },
  methods: {
    render() {
      const projectId = this.$route.query.projectId

      getPart(projectId).then(res => {
        if (res.success) {
          this.part = res.result

          this.initEnvSelect(res.result)

          this.listLoading = false
        } else {
          this.$message.error(res.message)
        }
      })
    },
    initEnvSelect(data) {
      const map = new Set()
      data.forEach(item => {
        if (item.envs && item.envs.length) {
          item.envs.forEach(j => {
            map.add(j.name)
          })
        }
      })

      this.envOptions = [...map]
    },
    handleChangeEnv(val) {
      this.$refs.partContainer.forEach(item => {
        item.selectKey(val)
      })
    },
    updatePartDetail(params) {
      updatePart(params).then(res => {
        if (res.success) {
          this.$notify({
            title: "Success",
            message: "修改成功!",
            type: "success",
            duration: 2000
          })
          this.render()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    updatePartBaseInfo(data) {
      this.currentPart = data
      this.addPartDialogVisible = true
    },
    handleAddPart() {
      this.currentPart = {}
      this.addPartDialogVisible = true
    },
    addModule(data) {
      this.currentModule = data
      this.addModuleDialogVisible = true
    },
    updateEnv(part) {
      this.currentPart = part
      this.updateEnvDialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
  .operation-container {
    text-align: right;
    .module-btn {
      margin: 0 24px;
    }
  }

  .page-title {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    color: #666666;
  }
</style>

