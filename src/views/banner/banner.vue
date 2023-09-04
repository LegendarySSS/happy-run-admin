<template>
  <div class="carousel-manager">
    <el-button type="primary"
               icon="el-icon-plus"
               @click="handleAdd">新增</el-button>
    <el-table :data="images"
              border
              stripe>
      <el-table-column label="编号"
                       prop="yuyuId">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column label="图片"
                       width="200">
        <template slot-scope="{ row }">
          <img :src="'api'+row.yuyuImgpath"
               style="max-width: 100%" />
        </template>
      </el-table-column>
      <el-table-column label="描述"
                       prop="yuyuDescription"></el-table-column>
      <el-table-column label="启用状态">
        <template slot-scope="{ row }">
          <el-switch v-model="row.yuyuStatus"
                     :active-value=1
                     :inactive-value=0
                     @change="changeStatus(row)" />
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       width="100">
        <template slot-scope="{ row }">
          <el-button type="danger"
                     size="small"
                     @click="handleDelete(row)">删除</el-button>
          <el-button type="primary"
                     size="small"
                     @click="handleEdit(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible"
               @close="close"
               title="轮播图编辑">
      <el-form ref="form"
               :model="form"
               label-width="80px">
        <el-form-item label="图片">
          <el-upload class="upload-demo"
                     :action="'api'+'/Img/addPicture'"
                     :on-success="handleUploadSuccess">
            <el-button size="medium"
                       type="primary">点击上传</el-button>
          </el-upload>
          <img :src="'api'+form.yuyuImgpath"
               v-if="form.yuyuImgpath"
               style="max-width: 200px" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input style="width: 40%;"
                    v-model="form.yuyuDescription"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import banner from '../../utils/api/banner/banner'
export default {
  data() {
    return {
      images: [],
      idCounter: 1,
      dialogVisible: false,
      form: {},
    }
  },
  methods: {
    close() {
      this.form = {}
    },
    handleUploadSuccess(res) {
      const that = this
      if (res.code != 200) {
        that.$message.error("操作失败")
        return
      }
      that.form.yuyuImgpath = res.data
    },
    changeStatus(params) {
      const that = this
      banner.update(params)
        .then(res => {
          if (res.code != 200) {
            that.$message.error(res.message)
            this.init()
            return
          }
          this.init()
        })
        .catch(err => {
          that.$message.error("操作失败")
        })
      console.log(params)
    },
    // ...
    handleAdd() {
      this.dialogVisible = true
    },
    handleEdit(row) {
      this.form = row
      this.dialogVisible = true
    },
    handleSave() {
      const that = this
      if (that.form.yuyuStatus == null) {
        banner.add(this.form)
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
      } else {
        banner.updateData(this.form)
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
      }

    },
    handleDelete(row) {
      const that = this
      this.$confirm('确定删除该轮播图吗?', '提示', {
        type: 'warning',
      })
        .then(() => {
          banner.delete(row)
            .then(res => {
              if (res.code != 200) {
                that.$message.error(res.message)
                return
              }
              that.$message.success("操作成功")
              that.init()
              console.log(res)
            })
            .catch(err => {
              that.$message.error("操作失败")
              console.log(err)
            })
        })
        .catch((error) => {
          that.$message.error("操作失败")
          console.log(error)
        })
    },
    init() {
      const that = this
      banner.findRotograph()
        .then(res => {
          if (res.code != 200) {
            that.$message.error("加载失败")
            return
          }
          that.images = res.data
          console.log(res)
        })
        .catch(err => {
          that.$message.error("加载失败")
          console.log(err)
        })
    },
  },
  created() {
    this.form = {}
    this.init()
  }
};
</script>
<style scoped>
.carousel-manager {
  max-width: 800px;
  margin: 0 auto;
}
</style>
