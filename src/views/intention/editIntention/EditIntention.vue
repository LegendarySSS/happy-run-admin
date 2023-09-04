<template>
  <div class="edit-intention">
    <el-dialog title="收货地址"
               :visible.sync="showDialog"
               width="60%"
               @open="handleOpen"
               @close="handleClose">
      <el-form ref="form"
               :model="tableForm"
               :rules="ruleForm"
               label-width="80px"
               status-icon>
        <el-form-item label="客户名称"
                      prop="nickname">
          <el-input v-model.trim="tableForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="联系电话"
                      prop="contact">
          <el-input v-model.trim="tableForm.contact"></el-input>
        </el-form-item>
        <el-form-item label="QQ"
                      prop="qq">
          <el-input v-model.trim="tableForm.qq"></el-input>
        </el-form-item>
        <el-form-item label="微信"
                      prop="weixin">
          <el-input v-model.trim="tableForm.weixin"></el-input>
        </el-form-item>
        <el-form-item label="咨询专业"
                      prop="zhuanye">
          <el-input placeholder="请输入内容"
                    v-model.trim="tableForm.infoclass"
                    class="input-with-select">
            <el-select v-model="tableForm.zhuanye"
                       slot="prepend"
                       placeholder="请选择">
              <el-option v-for="item in zhuanyeArray"
                         :value="item.classname"
                         :label="item.classname"
                         :key="item.id"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="信息来源"
                      prop="laiyuan">
          <el-input v-model.trim="tableForm.laiyuan"></el-input>
        </el-form-item>
        <el-form-item label="所在地区"
                      prop="dizhi">
          <el-input v-model.trim="tableForm.dizhi"></el-input>
        </el-form-item>
        <el-form-item label="客服"
                      prop="kefu">
          <el-select v-model="tableForm.kefu"
                     multiple
                     filterable
                     allow-create
                     class="kefu-select">
            <el-option v-for="item in kefuArray"
                       :value="item.classname"
                       :label="item.classname"
                       :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitData">立即提交</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { validateForm, searchData, editData } from '@/network/request'
export default {
  data() {
    const validateData = (rule, value, callback) => {
      const userForm = JSON.parse(sessionStorage.getItem('userForm'))
      const myObj = { keyword: value, field: rule.field }
      validateForm(myObj).then((res) => {
        if (res.data.code === 403 && userForm.contact !== value && userForm.weixin !== value && userForm.qq !== value) {
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
          } else if (res.data.code === 403 && userForm.contact !== value) {
            return callback(new Error('手机号已经存在'))
          }
          return callback()
        } else if (rule.field === 'qq') {
          const myreg = /^[1-9][0-9]{4,14}/
          if (!value) {
            return callback()
          } else if (!(myreg.test(value))) {
            return callback(new Error('QQ号格式不正确'))
          } else if (res.data.code === 403 && userForm.qq !== value) {
            return callback(new Error('QQ号已经存在'))
          }
          return callback()
        } else if (rule.field === 'weixin') {
          const myreg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/
          if (!value) {
            return callback()
          } else if (!(myreg.test(value))) {
            return callback(new Error('微信号格式不正确'))
          } else if (res.data.code === 403 && userForm.weixin !== value) {
            return callback(new Error('微信号已经存在'))
          }
          return callback()
        }
      })
    }
    return {
      showDialog: false,
      rowId: 0,
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
    init() {
      searchData(this.rowId).then((res) => {
        this.tableForm = res.data.results
        this.tableForm.kefu = res.data.results.kefu.split('-')
        const userForm = JSON.stringify(this.tableForm)
        sessionStorage.setItem('userForm', userForm)
      })
    },
    handleOpen() {
      this.init()
    },
    handleClose() {
      if (sessionStorage.getItem('userForm')) {
        sessionStorage.removeItem('userForm')
      }
    },
    submitData() {
      editData(this.tableForm).then((res) => {
        if (res.data.code === '200') {
          this.showDialog = false
          this.$parent.init()
          this.$message({ type: 'success', message: '修改成功!' })
        }
      })
    },
    reset() {
      this.$refs.form.resetFields()
      this.init()
    }
  }
}
</script>

<style lang="less" scoped>
.el-select {
  width: 130px;
}
</style>
