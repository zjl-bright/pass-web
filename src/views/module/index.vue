<template>
  <div class="app-container">
    <div class="page-title">
      <span>应用列表</span>
      <span class="btn-box">
        <el-button size="mini" @click="handleAddPart" plain>添加应用</el-button>
      </span>
      <add-part-dialog
        v-if="addPartDialogVisible"
        :visible.sync="addPartDialogVisible"
        @refresh="render"
      />
    </div>
    <part-container
      v-for="(item, index) in part"
      :key="item._id"
      :part="item"
      :index="index"
      @addModule="addModule"
      @refresh="render"
      @updateEnv="updateEnv"
    />

    <!-- maintain-env-dialog -->
    <update-env-dialog
      :visible.sync="updateEnvDialogVisible"
      :part="currentPart"
      @updatePart="updatePartDetail"
    />

    <!-- add-module-dialog -->
    <add-module-dialog
      :visible.sync="addModuleDialogVisible"
      :partId="currentPartId"
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
      currentPartId: '',
      listLoading: true,
      addPartDialogVisible: false,
      addModuleDialogVisible: false,
      currentPart: {},
      updateEnvDialogVisible: false
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
          // console.log(res.result)
          this.part = res.result
          this.listLoading = false
        } else {
          this.$message.error(res.message)
        }
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
    handleAddPart() {
      this.addPartDialogVisible = true
    },
    addModule(data) {
      this.currentPartId = data.id
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

