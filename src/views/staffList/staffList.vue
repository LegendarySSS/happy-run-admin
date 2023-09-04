<template>
  <div>
    <div>
      <h1 style="color: gray; margin-bottom:1% ;">接单员列表</h1>
    </div>
    <template>
      <el-table :data="tableData"
                border
                :header-cell-style="headClass"
                :row-style="{height:0+'px'}"
                :cell-style="rowClass">
        <el-table-column prop="yuyuNickName"
                         label="用户"
                         width="180"></el-table-column>
        <el-table-column prop="yuyuName"
                         label="姓名"
                         min-width="100"></el-table-column>
        <el-table-column prop="yuyuSex"
                         label="性别">
          <template slot-scope="scope">
            <span v-if="scope.row.yuyuSex==0">男</span>
            <span v-if="scope.row.yuyuSex==1">女</span>
          </template>
        </el-table-column>
        <el-table-column prop="yuyuCard"
                         label="身份证"
                         min-width="180">
        </el-table-column>
        <el-table-column prop="yuyuSfzFrontPath"
                         label="学生证"
                         width="180">
          <template slot-scope="scope">
            <el-image style="height: 60px;"
                      :src="'api'+scope.row.yuyuSfzFrontPath"
                      :lazy="true"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="yuyuPhoneNumber"
                         label="电话"
                         width="180"></el-table-column>
        <el-table-column prop="yuyuCreateTime"
                         label="日期"
                         width="180"></el-table-column>
        <el-table-column prop="date"
                         label="操作"
                         width="150"
                         fixed="right">
          <template slot-scope="scope">
            <div style="text-align: center; margin-bottom: 3%;">
              <el-button size="mini"
                         class="button"
                         @click="cancelReward(scope.row)"
                         type="danger">取消资格</el-button>
              <el-button size="mini"
                         class="button"
                         @click="award(scope.row)"
                         type="primary">现金奖励</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible.sync="showModel"
                 width="30%"
                 @close="close">
        <div class="bac"
             style="margin: 4%;border-radius: 3px;">
          <div style="margin-left: 30%;">
            <span class="text">用户昵称:</span>
            <span class="text"
                  style="padding-bottom: 0;">{{ info.yuyuNickName }}</span><br>
            <span class="text">用户姓名:</span>
            <span class="text">{{ info.yuyuName }}</span>
          </div>
          <div style="display: flex;margin-left: 30%;">
            <span style="margin-top: 0;">奖励金额:</span>
            <input style="width: 60px;height: 20px;margin-left: 3%;"
                   v-model="number" />
            <img @click="add"
                 style="width: 15px;height: 15px;margin-top: 1%;margin-left: 1%;"
                 src="../../assets/img/加号.png" />
          </div>
          <div style="margin-left: 32%; margin-top: 5%; padding-bottom: 3%;"
               v-if="index==0">
            <el-button size="mini"
                       @click="cancel">取消</el-button>
            <el-button size="mini"
                       type="primary"
                       @click="shureAdd">确定</el-button>
          </div>
          <div style="padding-bottom: 5%; margin-left: 32%;"
               v-if="index==1">
            <img style="width: 30px;"
                 src="../../assets/img/2.png" />
            操作完成!
          </div>
        </div>
      </el-dialog>
      <el-card shadow="never"
               class="pagination">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="1"
                       :page-size="page.pageSize"
                       layout="total, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </el-card>
    </template>
  </div>
</template>

<script>
import user from '../../utils/api/user/user'
export default {
  components: {},
  data() {
    return {
      index: 0,
      user: {},
      info: {},
      number: null,
      tableData: [],
      showModel: false,
      total: 0,
      id: 1,
      page: {
        current: 1,
        pageSize: 5
      }
    }
  },

  methods: {
    headClass() { //表头居中显示
      return "text-align:center"
    },
    rowClass() { //表格数据居中显示
      return "text-align:center"
    },
    shureAdd() {
      var that = this
      if (that.index == 1) {
        that.$message.error("请勿重复提交")
        return
      }
      if (that.number == null) {
        that.$message.error("金额不能为空")
        return
      }
      user.addUserBalance(that.info.yuyuId, this.number)
        .then(res => {
          if (res.code != 200) {
            that.$message.error("操作失败")
            return
          }
          that.init()
          that.index = 1
        })
        .catch(err => {
          that.$message.error("操作失败")
          console.log(err)
        })
    },
    cancel() {
      this.showModel = false
      this.index = 0
    },
    add() {
      this.number++
    },
    close() {
      this.showModel = false
      this.index = 0
    },
    award(params) {
      this.info = params
      this.showModel = true
    },
    init() {
      user.findStaffList(this.page)
        .then(res => {
          if (res.code != 200) {
            this.$message.error("加载失败")
            return
          }
          console.log(res.data.records)
          this.tableData = res.data.records
          this.total = res.data.total
        })
    },
    chageIndex(data) {
      if (data === 0) {
        console.log("index数据" + data)
        this.id = 1
      } else {
        this.id = 0
      }
    },
    changeShow(data) {
      if (data === "false") {
        this.showModel = false
      } else {
        this.showModel = true
      }
    },
    changeData() {
      this.init()
    },
    handleSizeChange() {
    },
    handleCurrentChange(e) {
      this.page.current = e
      this.init()
    },
    cancelReward(e) {
      var that = this
      var userinfo = e
      userinfo.yuyuWorkStatus = 0
      user.updateUser(userinfo)
        .then(res => {
          if (res.code != 200) {
            that.$message.error("操作失败")
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
    }
  },
  created() {
    this.init()
    this.index = 0
  },
}
</script>

<style>
.pagination {
  text-align: center;
  margin-top: 20px;
}
.button {
  font-size: 12px;
  margin-left: 0;
  margin: 2%;
  margin-bottom: 4%;
}
.text {
  display: inline-block;
  letter-spacing: 1px;
  padding: 3%;
  padding-left: 0;
  margin-left: 0;
}
.bac {
  background-color: rgb(224, 232, 241);
}
</style>