<template>
  <div class="home-view">
    <el-container>
      <el-header style="border-bottom: 1px rgb(240, 235, 239) solid;">
        <div class="header-top"
             @click="backHome">
          <img src="@/assets/img/logo2.png">
          <div class="text">乐跑得后台管理系统</div>
        </div>
        <div class="back">
          <el-popconfirm :confirm-button-text='popconfirmText.confirm'
                         :cancel-button-text='popconfirmText.cancel'
                         :title="popconfirmText.sure"
                         @confirm="confirmBack">
            <el-button type="danger"
                       slot="reference">退出登陆</el-button>
          </el-popconfirm>
        </div>
      </el-header>
      <el-container class="home-content">
        <el-aside style="border-right: 1px   rgb(240, 235, 239) solid;"
                  :width="isCollapse?'63px':'180px'"
                  ref="aside">
          <div class="collapse-icon"
               @click="collapseChange">
            <i class="el-icon-d-arrow-left"
               v-show="!isCollapse"></i>
            <i class="el-icon-d-arrow-right"
               v-show="isCollapse"></i>
          </div>
          <el-menu :background-color="asideTheme.bgc"
                   :text-color="asideTheme.tc"
                   :active-text-color="asideTheme.atc"
                   :collapse="isCollapse"
                   :collapse-transition="false"
                   router
                   style="border-right: none">
            <template v-for="menu in menus">
              <template v-if="menu.children">
                <el-submenu class="border"
                            :index="menu.path+''"
                            :key="menu.code"
                            popper-append-to-body>
                  <template #title>
                    <i :class="menu.icon"></i>
                    <span>{{menu.name}}</span>
                  </template>
                  <el-menu-item v-for="(subItem, i) in menu.children"
                                :key="i"
                                :index="subItem.path+''"
                                class="submenu ">
                    <span>{{ subItem.name }}</span>
                  </el-menu-item>
                </el-submenu>
              </template>
              <template v-else>
                <el-menu-item class="border"
                              :index="menu.path+''"
                              :key="menu.code">
                  <i :class="menu.icon"></i>
                  <span>{{ menu.name }}</span>
                </el-menu-item>
              </template>
            </template>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapse: false,
      menus: [
        {
          name: '用户管理',
          code: 'user',
          icon: "el-icon-user-solid",
          path: '/intention',
        },
        {
          name: '接单管理',
          code: 'user1',
          icon: "el-icon-user",
          children: [
            {
              name: '接单审核',
              code: 'user2',
              path: '/getRewardCheck'
            },
            {
              name: '接单员列表',
              code: 'getStaffList',
              path: '/getStaffList'
            }
          ]
        },
        {
          icon: 'el-icon-setting',
          name: '轮播图',
          code: 'picture',
          path: '/banner'
        },
        {
          icon: 'el-icon-setting',
          name: '服务管理',
          code: 'service',
          path: '/service'
        },
        // {
        //   name: '系统设置',
        //   code: 'system',
        //   path: 'system',
        //   icon: 'el-icon-setting',
        //   children: [
        //     {
        //       name: '轮播图',
        //       code: 'picture',
        //       path: '/banner'
        //     },
        //     {
        //       name: '服务管理',
        //       code: 'service',
        //       path: '/service'
        //     },
        //   ]
        // }
      ]
    }
  },
  methods: {
    confirmBack() {
      sessionStorage.removeItem('token')
      setTimeout(() => {
        this.$message({ message: '退出登录成功', type: 'success' })
        this.$router.push('/login')
      }, 1000)
    },
    collapseChange() {
      this.isCollapse = !this.isCollapse
    },
    backHome() {
      this.$router.push('/home')
    }
  },
  computed: {
    // 小弹出框文案
    popconfirmText() {
      return {
        confirm: '确定',
        cancel: '取消',
        sure: '确定退出登陆吗？'
      }
    },
    // 侧边导航栏文案
    asideText() {
      return {
        intentionCustom: '用户管理',
        addCustom: '接单管理',
        dataAnalysis: '系统设置'
      }
    },
    // 侧边栏颜色主题
    asideTheme() {
      return {
        bgc: '#f8f8f8',
        tc: '#908c8c',
        atc: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home-view {
  height: 100%;
  .home-content {
    height: calc(100% - 60px);
  }
}
.el-header {
  // background-color: #fff0f0;
  background-color: #f8f8f8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header-top {
    display: flex;
    align-items: center;
    height: 100%;
    img {
      display: block;
      height: 70%;
    }
    .text {
      font-size: 18px;
      padding-left: 13px;
      color: #908c8c;
      color: rgba(126, 124, 124, 0.7);
    }
  }
}
.el-aside {
  background-color: #f8f8f8;
  height: 100%;
  position: relative;
}
.el-container {
  background-color: #f8f8f8;
  height: 100%;
}
.border {
  //   border-bottom: 0.8px #c7c4c4 solid;
}
.borderTop {
  border-top: 0.8px #c7c4c4 solid;
}
.collapse-icon {
  line-height: 60px;
  font-size: 20px;
  color: rgba(188, 184, 184, 0.7);
  // background-color: #e1e3e8;
  position: absolute;
  right: 0;
  top: calc(50% - 30px);
}
</style>
