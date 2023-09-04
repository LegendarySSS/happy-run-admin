import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const Login = () => import("@/views/login/Login");
const Home = () => import("@/views/home/Home");
const WelCome = () => import("@/views/welcome/Welcome");
const Intention = () => import("@/views/intention/Intention");
const Account = () => import("@/views/account/Account");
const Analyze = () => import("@/views/analyze/Analyze");
const getRewardCheck = () => import("@/views/getRewardCheck/getRewardCheck");
const getStaffList = () => import("@/views/staffList/staffList");
const banner = () => import("@/views/banner/banner");
const service = () => import("@/views/service/service");
const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/home",
    redirect: "/welcome",
    component: Home,
    children: [
      {
        path: "/welcome",
        component: WelCome,
      },
      {
        path: "/intention",
        component: Intention,
      },
      {
        path: "/account",
        component: Account,
      },
      {
        path: "/analyze",
        component: Analyze,
      },
      {
        path: "/getRewardCheck",
        component: getRewardCheck,
      },
      {
        path: "/getStaffList",
        component: getStaffList,
      },
      {
        path: "/service",
        component: service,
      },
      {
        path: "/banner",
        component: banner,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err);
};
// 导航守卫
router.beforeEach((to, form, next) => {
  const token = sessionStorage.getItem("token");
  if (to.path === "/login") {
    return next();
  }
  token ? next() : next({ path: "/login" });
  next();
});
export default router;
