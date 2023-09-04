<template>
  <div class="welcome">
    <div class="content">
      <h1 class="title">欢迎登录乐跑得后台管理系统</h1>
      <p class="subtitle">乐跑得为您服务</p>
      <button class="btn">Get Started</button>
    </div>
    <div class="background"></div>
  </div>
</template>

<script>
import startSakura from "../../assets/tool/sakura";
export default {
  name: 'WelcomePage',
  mounted() {
    startSakura()
  },
}
</script>

<style>
.welcome {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.content {
  margin-left: 35%;
  z-index: 2;
  text-align: center;
  color: #fff;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 2rem;
}

.btn {
  padding: 1rem 2rem;
  font-size: 1.5rem;
  font-weight: 700;
  border: none;
  background-color: #fff;
  color: #333;
  border-radius: 5rem;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

.btn:hover {
  transform: scale(1.1);
}
.sakura-canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../../assets/img/11.png');
  background-size: cover;
  background-position: center;
  filter: blur(10px);
  opacity: 0.8;
  z-index: 1;
  transform: scale(1.1);
  animation: animate 20s ease-in-out infinite alternate;
}

@keyframes animate {
  0% {
    transform: scale(1.1) translate(-10%, -10%);
  }
  100% {
    transform: scale(1.1) translate(10%, 10%);
  }
}
</style>
