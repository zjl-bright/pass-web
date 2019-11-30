<template>
  <div class="app-container">
    <div class="page-title">
      <span>应用列表</span>
      <span class="btn-box">
        <el-button size="mini" @click="addPart" plain>添加应用</el-button>
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
    />

    <!-- add-module-dialog -->
    <add-module-dialog
      :visible.sync="addModuleDialogVisible"
      :partId="currentPartId"
    />


    <!-- <el-table
      v-loading="listLoading"
      :data="backend_module"
      element-loading-text="Loading"
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="Serial" width="100">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="name">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="path">
        <template slot-scope="scope">
          {{ scope.row.path }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="updateTime" width="200">
        <template>
          tan90°
        </template>
      </el-table-column>
      <el-table-column label="operation">
        <template slot-scope="scope">
          <el-row :gutter="20">
            <el-col :span="4">
              <el-switch v-model="scope.row.available">{{ scope.row.name }}</el-switch>
            </el-col>
            <el-col :span="20" class="operation-container">
              <el-link href="/#/project/config" type="info" class="module-btn">配置</el-link>
              <el-link type="info" class="module-btn">打包</el-link>
              <el-link type="info" class="module-btn">部署</el-link>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table> -->
  </div>
</template>

<script>
import { getModule } from '@/api/module'
import addPartDialog from '@/components/paas/addPart'
import addModuleDialog from '@/components/paas/addModule'
import partContainer from '@/components/paas/part'

export default {
  components: {
    addPartDialog,
    partContainer,
    addModuleDialog
  },
  data() {
    return {
      part: [],
      currentPartId: '',
      listLoading: true,
      addPartDialogVisible: false,
      addModuleDialogVisible: false
    }
  },
  created() {
    this.render()
  },
  methods: {
    render() {
      const projectId = this.$route.query.projectId

      getModule(projectId).then(res => {
        if (res.success) {
          // console.log(res.result)
          this.part = res.result
          this.listLoading = false
        } else {
          this.$message.error(res.message)
        }
      })
    },
    addPart() {
      this.addPartDialogVisible = true
    },
    addModule(data) {
      this.currentPartId = data.id
      this.addModuleDialogVisible = true
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

