<template>
  <div class="upload-container">
    <ul class="el-upload-list el-upload-list--picture-card">
      <li v-for="(item, index) in innerList" :key="index" tabindex="0" class="el-upload-list__item" :class="{ 'selected': item.flag }" @click="handleSelect(index)">
        <img :src="item.url" alt="" class="el-upload-list__item-thumbnail">
        <label class="el-upload-list__item-status-label">
          <i class="el-icon-upload-success el-icon-check"></i>
        </label>
        <!-- <label class="el-upload-list__item-selected-label">
          <span class="el-upload-list__item-selected-span">{{ selectText }}</span>
        </label> -->
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview">
            <i class="el-icon-zoom-in" @click.stop="handleZoomIn(item)"></i>
          </span>
          <span class="el-upload-list__item-delete">
            <i class="el-icon-delete" @click.stop="handleDel(index)"></i>
          </span>
        </span>
      </li>
    </ul>
    <div v-if="limit > innerList.length" tabindex="0" class="el-upload el-upload--picture-card" @click="handleUpload">
      <i class="el-icon-plus"></i>
      <input ref="input" type="file" name="file" class="el-upload__input" id="upload" @change="upLoad()">
    </div>

    <el-dialog :visible="showZoomIn" title="" @close="showZoomIn = false" append-to-body>
      <img width="100%" :src="zoomInPicture" alt>
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
import dateformat from 'dateformat'
import config from '@/cos.js'

export default {
  /*
    ex. fileList: { url, name, flag, size }
  */
  props: {
    fileList: Array,
    selectText: {
      type: String,
      default: '默认图片'
    },
    limit: Number
  },
  data() {
    return {
      innerList: this.fileList,
      showZoomIn: false,
      zoomInPicture: ''
    }
  },
  methods: {
    handleSelect(index) {
      this.innerList.forEach((item, i) => {
        item['flag'] = i === index ? 1 : 0
      })

      this.$emit('update:fileList', this.innerList)
    },
    handleUpload() {
      this.$refs.input.value = null;
      this.$refs.input.click();
    },
    handleZoomIn(item) {
      this.zoomInPicture = item.url
      this.showZoomIn = true
    },
    handleDel(index) {
      this.innerList.splice(index, 1)
      this.$emit('update:fileList', this.innerList)
    },
    successCallback(file, path) {
      const item = {
        name: file.name,
        size: file.size,
        url: path,
        flag: this.innerList.length ? 0 : 1
      }
      this.innerList.push(item)
      this.$emit('update:fileList', this.innerList)
    },
    errorCallback() {
      this.$message({
        message: '上传失败',
        type: 'warning'
      })
    },
    // upload
    upLoad() {
      const fileObj = document.querySelector("#upload").files[0];
      const filename = fileObj.name;
      this.uploadFile(fileObj, filename);
    },
    uploadFile(file, filename) {
      const vm = this
      const cos = new COS({
        SecretId: config.secretID,
        SecretKey: config.secretKey
      })

      const folder = `${config.storeDir}${dateformat(new Date(), "yyyy/mm/dd")}/`

      const loading = this.$loading({
        lock: true,
        text: '图片正在上传,请耐心等待...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });

      cos.putObject({
        Bucket: `${config.bucket}-${config.appId}`,
        Region: config.region,
        Key: folder + filename,
        Body: file,
      }, function (err, data) {
        if (data && data.statusCode === 200) {
        //上传成功得到的资源地址
          const path = `${config.targetHost}${folder}${filename}`
          vm.successCallback(file, path)
        } else {
          vm.errorCallback()
        }
        loading.close();
      });
    },
  }
}
</script>

<style lang="scss">
  .el-upload-list--picture-card {
    .el-upload-list__item.selected {
      border: 1px dashed #03A9F4;

      .el-upload-list__item-status-label {
        display: block !important;
      }

      .el-upload-list__item-selected-label {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: gray;
        color: #333;
        text-align: center;
        opacity: 0.8;
      }
    }
  }
</style>
