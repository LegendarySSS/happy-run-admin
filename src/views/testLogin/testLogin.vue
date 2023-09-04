<template>
  <div class="user-info">
    <div class="user-info-item">
      <div class="user-info-label">姓名：</div>
      <div class="user-info-value">{{ userInfo.name }}</div>
    </div>
    <div class="user-info-item">
      <div class="user-info-label">邮箱：</div>
      <div class="user-info-value">{{ userInfo.email }}</div>
    </div>
    <div class="user-info-item">
      <div class="user-info-label">图片：</div>
      <div class="user-info-value"><img :src="userInfo.avatar" /></div>
    </div>
    <div class="user-info-item">
      <div class="user-info-label">电话：</div>
      <div class="user-info-value">{{ userInfo.phone }}</div>
    </div>
    <div class="user-info-item">
      <div class="user-info-label">身份证号：</div>
      <div class="user-info-value">{{ userInfo.idCard }}</div>
    </div>
    <div class="user-info-item">
      <div class="user-info-label">用户状态：</div>
      <div class="user-info-value">
        <el-switch v-model="userInfo.isActive"
                   active-color="#13ce66"
                   inactive-color="#ff4949" />
      </div>
    </div>
    <div class="user-info-item">
      <el-button type="primary"
                 @click="dialogVisible = true">查看详情</el-button>
    </div>
    <el-dialog :visible.sync="dialogVisible"
               title="用户详情"
               width="50%">
      <div class="user-info-dialog">
        <div class="user-info-dialog-item">
          <div class="user-info-label">姓名：</div>
          <div class="user-info-value">{{ userInfo.name }}</div>
        </div>
        <div class="user-info-dialog-item">
          <div class="user-info-label">邮箱：</div>
          <div class="user-info-value">{{ userInfo.email }}</div>
        </div>
        <div class="user-info-dialog-item">
          <div class="user-info-label">图片：</div>
          <div class="user-info-value"><img :src="userInfo.avatar" /></div>
        </div>
        <div class="user-info-dialog-item">
          <div class="user-info-label">电话：</div>
          <div class="user-info-value">{{ userInfo.phone }}</div>
        </div>
        <div class="user-info-dialog-item">
          <div class="user-info-label">身份证号：</div>
          <div class="user-info-value">{{ userInfo.idCard }}</div>
        </div>
        <div class="user-info-dialog-item">
          <div class="user-info-label">用户状态：</div>
          <div class="user-info-value">
            <el-switch v-model="userInfo.isActive"
                       active-color="#13ce66"
                       inactive-color="#ff4949" />
          </div>
        </div>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
export default {
  data() {
    return {
      userInfo: {}
    }
  },
}
</script>