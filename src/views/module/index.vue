<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="backend_module"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="Serial" width="100">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
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
    </el-table>
  </div>
</template>

<script>
import { getModule } from '@/api/module'

export default {
  data() {
    return {
      module: null,
      backend_module: null,
      frontend_module: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getModule().then(response => {
        this.module = response.data
        this.backend_module = response.data.backendModule
        this.frontend_module = response.data.frontendModule
        this.listLoading = false
      })
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
</style>

