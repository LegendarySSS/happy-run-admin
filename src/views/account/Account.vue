<template>
  <div class="add-account">
    <el-card shadow="never" class="add-account-card">
      <i class="el-icon-s-custom"></i>
      <span class="add-account-title">添加最新用户资料</span>
    </el-card>
    <el-card shadow="never" class="add-account-content">
      <el-row>
        <el-col :span="16" :offset="2">
          <el-form ref="form" :model="tableForm" :rules="ruleForm" label-width="80px" status-icon>
            <el-form-item label="客户名称" prop="nickname">
              <el-input v-model.trim="tableForm.nickname"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="contact">
              <el-input v-model.trim="tableForm.contact"></el-input>
            </el-form-item>
            <el-form-item label="QQ" prop="qq">
              <el-input v-model.trim="tableForm.qq"></el-input>
            </el-form-item>
            <el-form-item label="微信" prop="weixin">
              <el-input v-model.trim="tableForm.weixin"></el-input>
            </el-form-item>
            <el-form-item label="咨询专业" prop="zhuanye">
              <el-input placeholder="请输入内容" v-model.trim="tableForm.infoclass" class="input-with-select">
                <el-select v-model="tableForm.zhuanye" slot="prepend" placeholder="请选择">
                  <el-option v-for="item in zhuanyeArray" :value="item.classname" :label="item.classname" :key="item.id"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item label="信息来源" prop="laiyuan">
              <el-input v-model.trim="tableForm.laiyuan"></el-input>
            </el-form-item>
            <el-form-item label="所在地区" prop="dizhi">
              <el-input v-model.trim="tableForm.dizhi"></el-input>
            </el-form-item>
            <el-form-item label="客服" prop="kefu">
              <el-select v-model="tableForm.kefu" multiple filterable allow-create>
                <el-option v-for="item in kefuArray" :value="item.classname" :label="item.classname" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm">立即提交</el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getAccountDate, addAccount, validateForm } from '@/network/request'
export default {
  data () {
    const validateData = (rule, value, callback) => {
      const myObj = { keyword: value, field: rule.field }
      validateForm(myObj).then((res) => {
        if (res.data.code === 403) {
          const txt =
           `系统中存在<span style="color:red">${value}</span><br>
            名字为<span style="color:red">${res.data.content.nickname}</span><br>
            QQ号为<span style="color:red">${res.data.content.qq}</span><br>
            微信为<span style="color:red">${res.data.content.weixin}</span><br>
            电话号为<span style="color:red">${res.data.content.contact}</span><br>`
          this.$confirm(txt, '提示', {
            showConfirmButton: false,
            showCancelButton: false,
            dangerouslyUseHTMLString: true,
            type: 'warning'
          })
        }
        if (rule.field === 'contact') {
          const myreg = /^[1][3,5,7,8][0-9]{9}$/
          if (!value) {
            return callback()
          } else if (!(myreg.test(value))) {
            return callback(new Error('手机号格式不正确'))
          } else if (res.data.code === 403) {
            return callback(new Error('手机号已经存在'))
          }
          return callback()
        } else if (rule.field === 'qq') {
          const myreg = /^[1-9][0-9]{4,14}/
          if (!value) {
            return callback()
          } else if (!(myreg.test(value))) {
            return callback(new Error('QQ号格式不正确'))
          } else if (res.data.code === 403) {
            return callback(new Error('QQ号已经存在'))
          }
          return callback()
        } else if (rule.field === 'weixin') {
          const myreg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/
          if (!value) {
            return callback()
          } else if (!(myreg.test(value))) {
            return callback(new Error('微信号格式不正确'))
          } else if (res.data.code === 403) {
            return callback(new Error('微信号已经存在'))
          }
        }
      })
    }
    return {
      zhuanyeArray: [],
      kefuArray: [],
      tableForm: {
        nickname: '',
        contact: '',
        qq: '',
        weixin: '',
        laiyuan: '',
        dizhi: '',
        kefu: [],
        zhuanye: '',
        infoclass: ''
      },
      ruleForm: {
        nickname: [{ required: true, message: '请输入客户名称', trigger: 'blur' }],
        laiyuan: [{ required: true, message: '信息来源为必填项', trigger: 'blur' }],
        zhuanye: [{ required: true, message: '咨询单位为必填项', trigger: 'blur' }],
        kefu: [{ type: 'array', required: true, message: '请至少选择一个客服人员', trigger: 'change' }],
        contact: [{ validator: validateData, trigger: 'blur' }],
        qq: [{ validator: validateData, trigger: 'blur' }],
        weixin: [{ validator: validateData, trigger: 'blur' }]
      }
    }
  },
  methods: {
    init () {
      getAccountDate().then((res) => {
        this.zhuanyeArray = res.data.infoclass
        this.kefuArray = res.data.kefu
      })
    },
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          this.$message.error('校验不通过')
          return false
        }
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        setTimeout(() => {
          addAccount(this.tableForm)
          this.$message({ type: 'success', message: '添加成功!' })
          loading.close()
          this.$router.push('/intention')
        }, 2000)
      })
    },
    resetForm () {
      this.$refs.form.resetFields()
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="less" scoped>
  .add-account {
    .add-account-card{
      font-size: 20px;
      color: #4C9FFF;
      .add-account-title{
        padding-left: 10px;
      }
    }
    .add-account-content{
      margin-top: 30px;
      ::v-deep .el-form-item {
        padding: 10px 0;
      }
      .el-select {
        width: 130px;
      }
    }
  }
</style>
