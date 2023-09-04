<template>
  <div class="intention">
    <el-card shadow="never">
      <el-row>
        <el-col :span="12">
          <el-input placeholder="请输入内容"
                    v-model="searchContent">
            <el-button slot="append"
                       icon="el-icon-search"
                       @click="searchItem"></el-button>
          </el-input>
        </el-col>
      </el-row>
    </el-card>
    <el-card shadow="never"
             class="table-card">
      <el-table :data="tableData"
                :header-cell-style="headClass"
                :row-style="{height:0+'px'}"
                :cell-style="rowClass"
                border
                style="width: 100%">
        <el-table-column prop="yuyuNickName"
                         label="账户"></el-table-column>
        <el-table-column prop="yuyuName"
                         label="姓名"></el-table-column>
        <el-table-column prop="yuyuSex"
                         label="性别">
          <template slot-scope="scope">
            {{ scope.row.yuyuSex==0?'男':'女' }}
          </template>
        </el-table-column>
        <el-table-column label="电话"
                         prop="yuyuPhoneNumber"
                         width="170"></el-table-column>
        <el-table-column label="邮箱"
                         prop="yuyuMail"
                         width="170"></el-table-column>
        <el-table-column prop="yuyuBalance"
                         label="余额">
          <template slot-scope="scope">￥{{ scope.row.yuyuBalance}}</template>
        </el-table-column>
        <el-table-column prop="yuyuCredibility"
                         label="信誉"></el-table-column>
        <el-table-column prop="yuyuAccountStatus"
                         label="账户状态">
          <template slot-scope="scope">
            <div :style="{color:scope.row.yuyuAccountStatus==1?'green':'red'}">{{ scope.row.yuyuAccountStatus==1?'正常':'封禁' }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="yuyuCreateTime"
                         label="日期"
                         width="170"></el-table-column>
        <el-table-column label="操作"
                         min-width="80"
                         fixed="right"
                         width="105">
          <template slot-scope="scope">
            <el-button size="mini"
                       v-if="scope.row.yuyuAccountStatus!=1"
                       @click="handleEdit(scope.row)"
                       class="button2"
                       type="primary">一键解除</el-button>
            <el-button size="mini"
                       v-if="scope.row.yuyuAccountStatus==1"
                       @click="handleEdit(scope.row)"
                       class="button1"
                       type="danger">一键封禁</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
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
    <!-- 弹窗组件 -->
    <edit-intention ref="editRef"></edit-intention>
  </div>
</template>
<script>
import { getIntentionData, deleteIntention } from '@/network/request'
import { formatTime } from '@/assets/tool/havetime'
import EditIntention from './editIntention/EditIntention'
import user from '../../utils/api/user/user'
export default {
  components: { EditIntention },
  data() {
    return {
      tableList: ["账户", "姓名", "性别", "电话", "邮箱", "余额", "信誉", "账户状态"],
      tableData: [],
      total: 0,
      user: {},
      tableDataLength: 0,
      searchContent: '',
      tabelParams: {
        num: 10,
        page: 1,
        keyword: ''
      },
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
    // 初始化
    init() {
      user.findUserByPage(this.page)
        .then(res => {
          if (res.code != 200) {
            this.$message.error(re.message)
            return
          }
          this.tableData = res.data.records
          this.total = res.data.total
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 时间戳格式化
    dateFormat(row) {
      return formatTime(parseInt(row.yuyuCreateTime), 'Y-M-D')
    },
    // 编辑
    handleEdit(row) {
      var user1 = row
      if (user1.yuyuAccountStatus === 1) {
        user1.yuyuAccountStatus = 0
      } else if (user1.yuyuAccountStatus === 0) {
        user1.yuyuAccountStatus = 1
      }
      user.updateUser(user1)
        .then(res => {
          if (res.code == 200) {
            this.init()
            this.$message.success("操作成功")
          } else {
            this.$message.error("操作失败")
          }
        })
        .catch(err => {
          console.log(err)
          this.$message.error("操作失败")
        })
      // this.$refs.editRef.showDialog = true
      // this.$refs.editRef.rowId = row.id
    },
    // 删除
    handleDelete(row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        setTimeout(() => {
          loading.close()
          this.$message({ type: 'success', message: '删除成功!' })
          deleteIntention(row.id)
          this.init()
        }, 2000)
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' })
      })
    },
    // 改变一页显示多少个时
    handleSizeChange(e) {
      // 

    },
    // 改变页数时
    handleCurrentChange(e) {
      this.page.current = e
      this.init()
    },
    searchItem() {
      this.tabelParams.keyword = this.searchContent
      this.init()
    }
  },
  created() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
.table-card {
  position: relative;
  .infoclass {
    position: absolute;
    color: cornflowerblue;
    font-size: 10px;
    top: 0;
    right: 2px;
  }
}

.pagination {
  text-align: center;
  margin-top: 20px;
}
.button1 {
  text-align: center;
  font-size: 12px;
  color: rgb(255, 254, 254);
}
.button2 {
  text-align: center;
  font-size: 12px;
  color: rgb(255, 254, 254);
}
</style>
