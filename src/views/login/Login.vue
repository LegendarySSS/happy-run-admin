<template>
  <div class="login">
    <div class="container">
      <div class="logo"><img src="@/assets/img/logo2.png"></div>
      <div class="content">
        <el-form label-width="100px"
                 :model="ruleForm"
                 :rules="loginRules"
                 ref="loginForm">
          <el-form-item label="用户名"
                        prop="yuyuUsername">
            <el-input v-model="ruleForm.yuyuUsername"
                      placeholder="请输入用户名"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="密码"
                        prop="yuyuPassword">
            <el-input v-model="ruleForm.yuyuPassword"
                      type="password"
                      placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="onSubmit">登陆</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
// import { loginAxios } from '@/network/request'
// import admin from '../../utils/api/user/user'
import admin from '../../utils/api/admin/admin'
export default {
  data() {
    return {
      ruleForm: {
        yuyuUsername: '123456',
        yuyuPassword: '123456'
      },
      loginRules: {
        yuyuUsername: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        yuyuPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 重置
    onReset() {
      this.$refs.loginForm.resetFields()
    },
    // 提交表单
    onSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (!valid) {
          this.$message.error('用户名和密码不符合规则')
        }
        admin.login(this.ruleForm)
          .then(res => {
            if (res.code != 200) {
              this.$message.error(res.message)
              return
            }
            window.sessionStorage.setItem("token", res.token)
            this.$router.push('/home')
          })
          .catch(err => {
            console.log(err)
          })
      })
      // },
      //   loginAxios(this.ruleForm).then((res) => {
      //     res.data.code === '200' ? this.$message({ message: '登录成功', type: 'success' }) : this.$message.error(res.data.txt)
      //     if (res.data.code === '200') {
      //       sessionStorage.setItem('token', res.data.token)
      //       this.$router.push('/home')
      //     }
      //   })
      // })
      //   admin.login(this.ruleForm)
      //   .then(res=>{
      //     console.console.log(res);
      //   })
      //   .catch(err=>{
      //     console.console.log(err);
      //   })
      //   this.$router.push('/home')

    }
  }
}
</script>

<style lang="less">
.login {
  background-color: #d3dcf2;
  height: 100%;
  position: relative;
  .container {
    width: 460px;
    height: 300px;
    background-color: #fff;
    border-radius: 8px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -230px;
    margin-top: -150px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
  .logo {
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      position: absolute;
      left: calc(50% - 50px);
      top: -50px;
    }
  }
  .content {
    padding-top: 80px;
    padding-right: 80px;
  }
}
</style>
