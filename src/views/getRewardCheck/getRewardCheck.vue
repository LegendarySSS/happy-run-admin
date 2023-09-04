<template>
  <div>
    <div>
      <h1 style="color: gray; margin-bottom:1% ;">待审核信息</h1>
    </div>
    <template>
      <el-table :data="tableData"
                border
                :header-cell-style="headClass"
                :row-style="{height:0+'px'}"
                :cell-style="rowClass">
        <el-table-column align="center"
                         prop="yuyuNickName"
                         label="用户"
                         width="180"></el-table-column>
        <el-table-column align="center"
                         prop="yuyuName"
                         label="姓名"
                         min-width="100"></el-table-column>
        <el-table-column align="center"
                         prop="yuyuSex"
                         label="性别">
          <template slot-scope="scope">
            <span v-if="scope.row.yuyuSex==0">男</span>
            <span v-if="scope.row.yuyuSex==1">女</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         prop="yuyuCard"
                         label="身份证"
                         min-width="180">
        </el-table-column>
        <el-table-column align="center"
                         prop="yuyuSfzFrontPath"
                         label="学生证"
                         width="180">
          <template slot-scope="scope">
            <el-image :src="'api'+scope.row.yuyuSfzFrontPath"
                      :lazy="true"></el-image>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         prop="yuyuPhoneNumber"
                         label="电话"
                         width="180"></el-table-column>
        <el-table-column align="center"
                         prop="yuyuCreateTime"
                         label="日期"
                         width="180"></el-table-column>
        <el-table-column align="center"
                          prop="date"
                         label="操作"
                         width="60"
                         fixed="right">
          <template slot-scope="scope">
            <el-button @click="getInfo(scope.row)"
                       type="text">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
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
    <div>
      <infoDialog :user1="user"
                  :index1="id"
                  :showModel="showModel"
                  @changeShow="changeShow"
                  @changeIndex="chageIndex"
                  @change="changeData"></infoDialog>
    </div>
  </div>
</template>

<script>
import user from '../../utils/api/user/user'
import infoDialog from '../getRewardCheck/component/dialog'
export default {
  components: { infoDialog },
  data() {
    return {
      user: {},
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
    init() {
      user.findGetRewardUserByPage(this.page)
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
    getInfo(e) {
      this.user = e
      this.showModel = true
      console.log(this.showModel)
    }
  },
  created() {
    this.init()
  },
}
</script>

<style>
.pagination {
  text-align: center;
  margin-top: 20px;
}
</style>