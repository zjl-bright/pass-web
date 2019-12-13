<template>
  <div class="part-container">
    <div class="part-container-head">
      <div class="part-container-head__name" :style="{ background: getColor(index) }">
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
          size="mini"
          placeholder="环境"
          style="width: 100px;"
        >
          <el-option
            v-for="(item, index) in part.envs"
            :key="index"
            :label="item.name"
            :value="item.branchName"
          ></el-option>
        </el-select>
        <i class="el-icon-setting" @click="handleSettingEnv"></i>
      </div>
      <div class="part-container-head__btn">
        <span class="btn-span" @click="handleAddModule">添加</span>
        <span class="btn-span delete" @click="handleDelPart(part._id)">移除</span>
      </div>
    </div>
    <div class="part-container-body">
      <ul>
        <li v-for="item in part.modules" :key="item._id">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { delPart } from '@/api/part'
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
      currentEnv: ''
    }
  },
  methods: {
    handleAddModule() {
      this.$emit('addModule', {
        id: this.part._id
      })
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
    padding: 0 20px 20px;

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
    }
  }
</style>