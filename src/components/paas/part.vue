<template>
  <div v-show="partVisible" class="part-container">
    <div class="part-container-head">
      <div class="part-container-head__name" :style="{ background: getColor(index) }" @click="handleUpdatePart">
        <i :class="getIcon(index)"></i>&nbsp;
        {{ part.name }}
      </div>
      <div class="part-container-head__gitPath">
        {{ part.gitPath }}
      </div>
      <div class="part-container-head__envs">
        <!-- <span>当前所选环境:</span> -->
        <el-select
          v-model="currentEnv"
          value-key="name"
          size="mini"
          placeholder="环境"
          style="width: 100px;"
        >
          <el-option
            v-for="(item, index) in part.envs"
            :key="index"
            :label="item.name"
            :value="item"
          ></el-option>
        </el-select>
        <i class="el-icon-setting" @click="handleSettingEnv"></i>
      </div>
      <div class="part-container-head__btn">
        <span class="btn-span" @click="handlePackagePart">打包</span>
        <span class="btn-span" @click="handleAddModule">添加</span>
        <span class="btn-span delete" @click="handleDelPart(part._id)">移除</span>
      </div>
    </div>
    <div class="part-container-body">
      <ul>
        <li v-for="item in part.modules" :key="item._id">
          <div class="left-box">
            <span class="module-name">{{ item.name }}</span><br/>
            <span class="module-path">path: {{ item.target }}</span>
          </div>
          <div class="right-box">
            <span class="btn-box">
              <span class="span-btn" @click="handleSetModule(item)">配置</span>
              <span class="span-btn" @click="handlePackage(item._id)">打包</span>
              <span class="span-btn" @click="handlePublish(item._id)">部署</span>
              <span class="span-btn delete" @click="handleDel(item._id)">移除</span>
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { delPart, packagePart } from '@/api/part'
import { delModule, packageModule } from '@/api/module'
export default {
  props: {
    part: {
      type: Object
    },
    index: {
      type: Number
    }
  },
  data() {
    return {
      theme: [
        {
          color: '#fba254',
          // color: 'linear-gradient(45deg, rgb(251,162,84), rgb(255,239,213), rgb(255,165,0))',
          icon: 'el-icon-coffee-cup'
        },
        {
          color: '#03A9F4',
          // color: 'linear-gradient(45deg, rgb(31,89,146), rgb(35,175,230), rgb(29,136,203))',
          icon: 'el-icon-collection-tag'
        },
        {
          color: '#0faf14',
          // color: 'linear-gradient(45deg, rgb(255,69,0), rgb(255,228,225), rgb(178,34,34))',
          icon: 'el-icon-goblet-square'
        }
      ],
      currentEnv: {},
      partVisible: true
    }
  },
  methods: {
    handleUpdatePart() {
      this.$emit('updatePart', this.part)
    },
    handleAddModule() {
      this.$emit('addModule', {
        id: this.part._id
      })
    },
    handlePackagePart() {
      if (this.currentEnv.name) {
        const params = {
          partId: this.part._id,
          branchName: this.currentEnv.branchName,
          ip: this.currentEnv.ip
        }

        packagePart(params).then(res => {
          if (res.success) {
            this.$notify({
              title: "Success",
              message: "开始打包...",
              type: "success",
              duration: 2000
            })
          } else {
            this.$message.error(res.message)
          }
        })
      } else {
        this.$message({
          message: '请选择对应的打包环境',
          type: 'warning'
        })
      }
    },
    selectKey(key) {
      if (key) {
        const option = this.part.envs.find(item => {
          return item.name === key
        })

        if(option) {
          this.currentEnv = option
          this.partVisible = true
        } else {
          this.partVisible = false
        }
      } else {
        this.partVisible = true
      }
    },
    handleSettingEnv() {
      const part = JSON.parse(JSON.stringify(this.part))
      this.$emit('updateEnv', part)
    },
    confirmDelPart(id) {
      delPart(id).then(res => {
        if (res.success) {
          this.$notify({
            title: "Success",
            message: "删除成功!",
            type: "success",
            duration: 2000
          })
          this.$emit("refresh")
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleDelPart(id) {
      const _this = this

      this.$confirm('确认删除该应用?', 'Confirm', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          _this.confirmDelPart(id)
        })
        .catch(err => { })
    },
    // module
    handleSetModule(item) {
      this.$emit('addModule', item)
    },
    handlePackage(id) {
      if (this.currentEnv.name) {
        const params = {
          moduleId: id,
          branchName: this.currentEnv.branchName,
          ip: this.currentEnv.ip
        }

        packageModule(params).then(res => {
          if (res.success) {
            this.$notify({
              title: "Success",
              message: "开始打包...",
              type: "success",
              duration: 2000
            })
          } else {
            this.$message.error(res.message)
          }
        })
      } else {
        this.$message({
          message: '请选择对应的打包环境',
          type: 'warning'
        })
      }
    },
    handlePublish(id) {
      // console.log(id)
      this.$message('todo')
    },
    handleDel(id) {
      const _this = this

      this.$confirm('确认删除该模块?', 'Confirm', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          _this.confirmDelModule(id)
        })
        .catch(err => { })
    },
    confirmDelModule(id) {
      delModule(id).then(res => {
        if (res.success) {
          this.$notify({
            title: "Success",
            message: "删除成功",
            type: "success",
            duration: 2000
          })
          this.$emit("refresh")
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getColor(index) {
      return this.theme[index % this.theme.length].color
    },
    getIcon(index) {
      return this.theme[index % this.theme.length].icon
    }
  }
}
</script>

<style lang="scss" scoped>
  .part-container {
    background: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 6px;
    position: relative;
    margin: 20px;
    padding: 0 20px 20px 0;

    &-head {
      display: flex;
      align-items: baseline;
      position: relative;
      padding: 14px 20px;
      background: rgba(239,242,240,.4);
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;

      > div {
        margin: 0 8px;
      }

      &__name {
        background: #fba254;
        color: #fff;
        padding: 8px 12px;
        border-radius: 7px;
        font-size: 14px;
        width: 120px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        &:hover {
          cursor: pointer;
          background: linear-gradient(45deg, rgb(31,89,146),rgb(35,175,230),rgb(29,136,203)) !important;
          box-shadow: 0 0 0.2rem grey;
        }
      }

      &__envs {
        > i {
          cursor: pointer;
          color: #9e9a9a;

          &:hover {
            color: #3a8ee6;
          }
        }
      }

      &__gitPath,
      &__btn {
        font-size: 12px;
        color: #999999;
      }

      &__btn {
        position: absolute;
        right: 0;
        top: 20px;

        .btn-span {
          margin: 0 4px;

          &:hover {
            cursor: pointer;
            color: #3a8ee6;
          }

          &.delete {
            &:hover {
              color: #F56C6C;
            }
          }
        }
      }
    }

    &-body {
      position: relative;
      padding: 20px 0 15px 20px;

      ul {
        list-style: none;
        margin: 0;
        padding: 0 20px;
        font-size: 14px;

        li {
          position: relative;
          padding: 20px 0 15px 20px;
          color: #606266;

          .left-box {
            .module-name {
              line-height: 24px;
              font-weight: bold;
            }
          }

          .right-box {
            position: absolute;
            right: 0;
            top: 30px;
            color: #909399;

            .span-btn {
              margin: 0 5px;
              cursor: pointer;

              &:hover {
                color: #409EFF;
              }

              &.delete {
                &:hover {
                  color: #F56C6C;
                }
              }
            }
          }
        }
      }
    }
  }
</style>