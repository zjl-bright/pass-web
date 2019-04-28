<template>
  <div class="app-container">
    <a v-for="(item, index) in project" :key="index" class="project-item" href="/#/project/module">
      <el-card shadow="always">
        <div class="project-item-detail">
          <img role="presentation" src="http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/upload/images/fd479181-7e85-41a1-a524-dcb46132ba57.jpg">
        </div>
        <div class="project-item-title">
          {{ item.id }}: {{ item.name }}
        </div>
      </el-card>
    </a>
  </div>
</template>

<script>
import { getProject } from '@/api/project'

export default {
  data() {
    return {
      project: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getProject().then(response => {
        this.project = response.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .project-item {
    margin: 20px;
    width: 300px;
    display: inline-block;
    cursor: pointer;

    .project-item-detail {
      text-align: center;
      padding: 40px 0;
      height: 180px;
      -webkit-transition: .3s;
      transition: .3s;  

      img {
        width: 100px; 
        height: 100px;
        -webkit-transition: .3s;
        transition: .3s;  
      }

      &:hover {
        padding: 0;

        img {
          width: 200px; 
          height: 200px;
        }
      }
    }

    .project-item-title {
      text-align: center;
    }
  }
</style>

