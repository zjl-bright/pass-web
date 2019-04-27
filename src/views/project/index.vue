<template>
  <div class="app-container">
    <div class="project-item" v-for="(item, index) in project" :key="index" >
      <el-card shadow="always">
        <div class="project-item-detail">
          <img role="presentation" src="http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/upload/images/fd479181-7e85-41a1-a524-dcb46132ba57.jpg">
        </div>
        <div class="project-item-title">
          {{ item.id }}: {{ item.name }}
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      project: [
        { id: '1', name: '测试项目1', des: '项目描述1' },
        { id: '2', name: '测试项目2', des: '项目描述2' },
        { id: '3', name: '测试项目3', des: '项目描述3' }
      ]
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

