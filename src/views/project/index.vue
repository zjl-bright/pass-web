<template>
  <div class="app-container">
    <div class="btn-container">
      <el-button type="primary" size="medium" @click="addProject">新增</el-button>
      <add-project-dialog
        v-if="addProjectDialogVisible"
        :visible.sync="addProjectDialogVisible"
        :item="currentItem"
        @refresh="render"
      />
    </div>
    <div class="project-container">
      <a v-for="(item, index) in project" :key="index" class="project-item" :href="'/#/project/module?projectId=' + item._id">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <div class="project-item-title">
              {{ index + 1 }}: {{ item.name }}
              <span class="btn-box">
                <i class="el-icon-setting" @click.prevent="handleSet(item)"></i>
                <i class="el-icon-delete" @click.prevent="handleDel(item._id)"></i>
              </span>
            </div>
          </div>
          <div class="project-item-detail">
            <img role="presentation" :src="(item.logo && item.logo.indexOf('http') > -1) ? item.logo : imgSrc">
          </div>
          <!-- <div class="project-item-title">
            {{ index + 1 }}: {{ item.name }}
          </div> -->
        </el-card>
      </a>
    </div>
  </div>
</template>

<script>
import { getProject, delProject } from '@/api/project'
import addProjectDialog from '@/components/paas/addProject'

export default {
  components: {
    addProjectDialog
  },
  data() {
    return {
      project: [],
      currentItem: {},
      addProjectDialogVisible: false,
      imgSrc: "http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/upload/images/fd479181-7e85-41a1-a524-dcb46132ba57.jpg"
    }
  },
  created() {
    this.render()
  },
  methods: {
    render() {
      getProject().then(response => {
        this.project = response.result
      })
    },
    addProject() {
      this.currentItem = {}
      this.addProjectDialogVisible = true
    },
    handleSet(item) {
      const project = {
        _id: item._id,
        name: item.name,
        desc: item.desc,
        dirName: item.dirName,
        types: item.types && item.types.length ? item.types : [],
        logo: [
          {
            url: item.logo.indexOf('http') > -1 ? item.logo : this.imgSrc
          }
        ]
      }
      this.currentItem = project
      this.addProjectDialogVisible = true
    },
    handleDel(id) {
      this.$confirm('确认删除该项目?', 'Confirm', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const res = await delProject(id)
          if (res.success) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.render()
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(err => { })
    }
  }
}
</script>

<style lang="scss" scoped>

  .btn-container {
    padding: 0 20px;
  }

  .project-item {
    margin: 20px;
    width: 300px;
    height: 240px;
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
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      .btn-box {
        float: right;

        i {
          &:hover {
            cursor: pointer;
            color: #03A9F4;
          }
        }
      }
    }
  }
</style>

