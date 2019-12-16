<template>
  <el-dialog
    title="维护环境"
    :visible="visible"
    custom-class="component-env-dialog"
    @close="close"
  >
    <div class="btn-container">
      <el-button type="primary" size="mini" @click="addEnv">添加</el-button>

      <!-- add -->
      <el-dialog
        :visible="addEnvVisible"
        title="新增环境"
        :append-to-body="true"
        width="440px"
        @close="addEnvVisible = false"
      >
        <el-form :model="form" label-position="right" label-width="80px">
          <el-form-item label="环境名:">
            <el-input v-model="form.name" placeholder="请输入环境名" maxlength="12" />
          </el-form-item>
          <el-form-item label="分支名:">
            <el-input v-model="form.branchName" placeholder="请输入分支名" maxlength="12" />
          </el-form-item>
          <el-form-item label="ip:">
            <el-input v-model="form.ip" placeholder="请输入ip" />
          </el-form-item>
          <el-form-item>
            <el-button @click="addEnvVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitAddEnv">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <el-table
      ref="dragTable"
      :data="curPart.envs"
      border
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="序号" min-width="8%">
        <template slot-scope="scope">
          {{ scope.$index + 1 }} 
        </template>
      </el-table-column>
      <el-table-column label="环境名" prop="name" min-width="30%"></el-table-column>
      <el-table-column label="分支名" prop="branchName" min-width="22%"></el-table-column>
      <el-table-column label="ip" prop="ip" min-width="25%"></el-table-column>
      <el-table-column label="操作" min-width="15%">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" type="primary" @click="editEnvItem(scope.$index, scope.row)" size="mini" plain></el-button>
          <el-button icon="el-icon-delete" type="danger" @click="delEnvItem(scope.$index)" size="mini" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
// import Sortable from 'sortablejs'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    part: {
      type: Object
    }
  },
  data() {
    const part = JSON.parse(JSON.stringify(this.part))

    return {
      curPart: part,
      form: {
        name: '',
        branchName: '',
        ip: ''
      },
      addEnvVisible: false,
      sortable: null,
      oldList: [],
      newList: [],
      envIndex: null
    }
  },
  // created() {
  //   this.render()
  // },
  watch: {
    part(val) {
      console.log('----env-watch-----')
      console.log(val)
      this.curPart = JSON.parse(JSON.stringify(val))
    }
  },
  methods: {
    // render() {
    //   this.oldList = this.curPart.envs.map(v => v.id)
    //   this.newList = this.oldList.slice()
    //   this.$nextTick(() => {
    //     this.setSort()
    //   })
    // },
    // setSort() {
    //   const el = this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
    //   this.sortable = Sortable.create(el, {
    //     ghostClass: 'sortable-ghost',
    //     setData: function(dataTransfer) {
    //       dataTransfer.setData('Text', '')
    //     },
    //     onEnd: evt => {
    //       const targetRow = this.curPart.envs.splice(evt.oldIndex, 1)[0]
    //       this.curPart.envs.splice(evt.newIndex, 0, targetRow)

    //       const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
    //       this.newList.splice(evt.newIndex, 0, tempIndex)
    //       console.log(this.curPart.envs)
    //     }
    //   })
    // },
    addEnv() {
      this.form = {
        name: '',
        branchName: '',
        ip: ''
      }
      this.envIndex = null
      this.envType = 'create'
      this.addEnvVisible = true
    },
    submitAddEnv() {
      const params = JSON.parse(JSON.stringify(this.curPart))
      
      if (this.envType === 'create') {
        const formData = {
          name: this.form.name,
          branchName: this.form.branchName,
          ip: this.form.ip
        }
        params["envs"].push(formData)
      } else {
        params["envs"][this.envIndex] = this.form
      }

      this.$emit('updatePart', params)
      this.curPart["envs"] = params["envs"]
      this.addEnvVisible = false
    },
    // env
    editEnvItem(index, row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.envIndex = index
      this.envType = 'edit'
      this.addEnvVisible = true
    },
    delEnvItem(index) {
      // const params = JSON.parse(JSON.stringify(this.curPart))
      const params = this.curPart
      params["envs"].splice(index, 1)

      this.$emit('updatePart', params)
    },
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss">
  .component-env-dialog {
    .el-dialog__header {
      border-bottom: 1px solid #EBEEF5;
    }
    
    .el-dialog__body {
      padding: 10px 20px 30px 20px;

      .btn-container {
        margin-bottom: 10px;
      }
    }
  }
</style>
