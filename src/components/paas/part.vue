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
      </div>
      <div class="part-container-head__btn">
        <span class="btn-span" @click="handleAddPart">添加</span>
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
import { delModule } from '@/api/module'
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
          icon: 'el-icon-coffee-cup'
        },
        {
          color: '#03A9F4',
          icon: 'el-icon-collection-tag'
        },
        {
          color: '#0faf14',
          icon: 'el-icon-goblet-square'
        }
      ]
    }
  },
  methods: {
    handleAddPart() {
      this.$emit('addModule', {
        id: this.part._id
      })
    },
    confirmDelPart(id) {
      delModule(id).then(res => {
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