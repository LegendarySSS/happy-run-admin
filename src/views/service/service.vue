<template>
  <div class="service-manager">
    <el-table :data="services"
              style="width: 100%"
              :row-key="row => row.id"
              :header-cell-style="headClass"
              :row-style="{height:0+'px'}"
              :cell-style="rowClass">
      <el-table-column prop="yuyuId"
                       label="编号"></el-table-column>
      <el-table-column prop="yuyuName"
                       label="服务名"></el-table-column>
      <el-table-column prop="yuyuImg"
                       label="图片">
        <template slot-scope="scope">
          <div style="background-color: lightblue;">
            <img :src="'api'+scope.row.yuyuImg"
                 alt="Service Image"
                 style="width: 60px; height: 60px;">
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="yuyuPrice"
                       label="服务费用">
        <template slot-scope="scope">
          <span>￥{{ scope.row.yuyuPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="yuyuStatus"
                       label="是否启用">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.yuyuStatus"
                     :active-value=1
                     :inactive-value=0
                     active-color="#13ce66"
                     inactive-color="#ff4949"
                     @change="changeStatus(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="yuyuIsSuggest"
                       label="是否推荐">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.yuyuIsSuggest"
                     :active-value=1
                     :inactive-value=0
                     active-color="#13ce66"
                     inactive-color="#ff4949"
                     @change="changetuijian(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary"
                     size="mini"
                     @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible"
               @close="close"
               title="服务编辑">
      <el-form ref="form"
               :model="form"
               label-width="80px">
        <el-form-item label="服务名"
                      prop="yuyuName">
          <el-input style="width: 50%;"
                    v-model="form.yuyuName"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload :action="uploadUrl"
                     :show-file-list="false"
                     :on-success="handleUploadSuccess"
                     :before-upload="beforeUpload">
            <el-button>点击上传</el-button>
          </el-upload>
          <div style="background-color: lightblue;width: 60px;height: 60px;">
            <img v-if="form.yuyuImg"
                 :src="'api'+form.yuyuImg"
                 alt="Service Image"
                 style="width: 60px; height: 60px;">
          </div>
        </el-form-item>
        <el-form-item label="服务费用"
                      prop="yuyuPrice">
          <el-input-number v-model="form.yuyuPrice"
                           :precision="2"
                           :step="0.01"
                           :controls="false"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import service from '../../utils/api/service/service'
export default {
  data() {
    return {
      services: [
        { id: 1, name: '服务1', image: 'http://placekitten.com/60/60', enabled: true, recommended: true, price: 10.0 },
        { id: 2, name: '服务2', image: 'http://placekitten.com/60/60', enabled: true, recommended: false, price: 20.0 },
        { id: 3, name: '服务3', image: 'http://placekitten.com/60/60', enabled: false, recommended: true, price: 30.0 },
      ],
      dialogVisible: false,
      form: {},
      uploadUrl: 'api' + '/Img/addPicture',
    }
  },
  filters: {
    currency(value) {
      // return `¥ ${value.toFixed(2)}`
    },
  },
  methods: {
    changetuijian(params) {
      const that = this
      service.updateTuijian(params)
        .then(res => {
          if (res.code != 200) {
            that.$message.error(res.message)
            this.init()
            return
          }
          that.$message.success("操作成功")
          this.init()
        })
        .catch(err => {
          that.$message.error("操作失败")
          console.log(err)
        })
    },
    changeStatus(params) {
      const that = this
      service.update(params)
        .then(res => {
          if (res.code != 200) {
            that.$message.error(res.message)
            this.init()
            return
          }
          that.$message.success("操作成功")
          this.init()
        })
        .catch(err => {
          that.$message.error("操作失败")
          console.log(err)
        })
    },
    close() {
      this.form = {}
    },
    headClass() { //表头居中显示
      return "text-align:center"
    },
    rowClass() { //表格数据居中显示
      return "text-align:center"
    },
    init() {
      const that = this
      service.findAll()
        .then(res => {
          if (res.code != 200) {
            this.$message.error("加载失败")
            return
          }
          this.services = res.data
          console.log(res)
        })
        .catch(err => {
          that.$message.error("操作失败")
          console.log(err)
        })
    },
    handleAdd() {
      this.form = {
        id: '',
        name: '',
        image: '',
        enabled: false,
        recommended: false,
        price: 0.0,
      }
      this.dialogVisible = true
    },
    handleEdit(row) {
      this.form = { ...row }
      this.dialogVisible = true
    },
    handleDelete(row) {
      const index = this.services.indexOf(row)
      if (index !== -1) {
        this.services.splice(index, 1)
      }
    },
    handleUploadSuccess(res) {
      const that = this
      if (res.code != 200) {
        that.$message.error("操作失败")
        return
      }
      that.form.yuyuImg = res.data
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isGIF = file.type === 'image/gif'
      const isValidType = isJPG || isPNG || isGIF
      if (!isValidType) {
        this.$message.error('只支持上传 JPG、PNG、GIF 格式的图片')
        return false
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB')
        return false
      }
      return true
    },
    submitForm() {
      const that = this
      service.update(that.form)
        .then(res => {
          if (res.code != 200) {
            that.$message.error(res.message)
            return
          }
          that.$message.success("操作成功")
          that.init()
        })
        .catch(err => {
          that.$message.error("操作失败")
          console.log(err)
        })
    },
  },
  created() {
    this.form = {}
    this.init()
  },
};
</script>

<style>
.btn-group {
  display: flex;
  justify-content: flex-end;
}
.btn-group button {
  margin-left: 10px;
}
.table-action-btn {
  font-size: 12px;
  padding: 6px 16px;
}
.el-switch__core {
  width: 34px;
  height: 18px;
}
.el-switch__button {
  width: 12px;
  height: 12px;
}
</style>


