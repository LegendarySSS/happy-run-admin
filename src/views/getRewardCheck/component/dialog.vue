<template>
  <div>
    <el-dialog :visible.sync="show"
               width="30%"
               title="用户信息"
               @close="close">
      <div class="bod">
        <el-form ref="form"
                 :model="info"
                 label-width="80px"
                 status-icon
                 style="  margin-left: -10%;">
          <el-form-item>
            <span>客户昵称:</span>
            <span class="text">{{info.yuyuNickName}}</span>
          </el-form-item>
          <el-form-item>
            <span>客户姓名:</span>
            <span class="text">{{info.yuyuName}}</span>
          </el-form-item>
          <el-form-item>
            <span>身份证号:</span>
            <span class="text"> {{info.yuyuCard}}</span>
          </el-form-item>
          <el-form-item>
            <span>电话:</span>
            <span class="text">{{info.yuyuPhoneNumber}}</span>
          </el-form-item>
          <el-form-item>
            <span>邮箱:</span>
            <span class="text">{{info.yuyuMail}}</span>
          </el-form-item>
          <el-form-item>
            <div style="display: flex">
              <span style="margin-top:20%;">学生证:</span>
              <el-image style="width: 50%;margin-left: 4%;"
                        :src="'api'+info.yuyuSfzFrontPath"
                        :lazy="true" />
            </div>
          </el-form-item>
          <el-form-item>
            <div style="padding-bottom: 5%;"
                 v-if="index==1">
              <el-button @click="submitData(1)">拒绝申请</el-button>
              <el-button data-type="2"
                         @click="submitData(2)"
                         type="primary">同意申请</el-button>
            </div>
            <div style="padding-bottom: 5%;"
                 v-if="index==0">
              <img style="width: 25px;"
                   src="../../../assets/img/2.png" />
              审核完成!
            </div>
          </el-form-item>
        </el-form>
      </div>

    </el-dialog>
  </div>
</template>
<script>
import user from '../../../utils/api/user/user'
export default {

  ruleForm: {
  },
  props: {
    showModel: {
      type: Boolean,
      default: false
    }, user1: {
    }
  },
  watch: {
    showModel: function (newValue) {
      this.show = this.showModel
    },
    user1: function (newValue) {
      this.info = this.user1
    },
    index1: function (newValue) {
      this.index = this.index1
    }
  },
  data() {
    return {
      index: 1,
      tableForm: {},
      name: 'infoDialog',
      show: false,
      show1: true,
      info: {},
      path: "../../../assets/img/2.png"
    }
  },

  methods: {
    close() {
      this.index = 1
      this.$emit('changeShow', 'false')
    },
    reset() {
    },
    submitData(params) {
      var that = this
      if (that.index != 1) {
        this.$message.error("请勿重复提交")
        return
      }
      var userInfo = that.info
      const type = params
      if (type === 1) {
        userInfo.yuyuWorkStatus = 3
      } else if (type === 2) {
        userInfo.yuyuWorkStatus = 1
      } else {
        that.$message.error("操作失败")
        console.log(params)
        return
      }
      user.updateUser(userInfo)
        .then(res => {
          if (res.code != 200) {
            taht.$message.error("操作失败")
            return
          }
          that.$message.success("操作成功")
          that.index = 0
          that.$emit("changeIndex", 0)
          that.$emit("change")
        })
        .catch(err => {
          console.log(err)
          that.$message.error("操作失败")
        })
    },
  },
  created() {
    this.index = 1
  },
}
</script>

<style>
.text {
  margin-left: 3%;
  letter-spacing: 1.5px;
  font-size: 13px;
  color: rgb(139, 138, 138);
}
.bod {
  width: 100%;
  height: 100%;
  background-color: rgb(226, 234, 241);
  margin: 0;
  padding: 0;
  border-radius: 5px;
}
</style>