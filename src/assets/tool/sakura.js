function startSakura() {
  console.log(123);
  // 创建canvas元素
  const canvas = document.createElement('canvas');
  canvas.classList.add('sakura-canvas');

  // 设置canvas的宽度和高度为屏幕的宽度和高度
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // 将canvas添加到body上
  document.body.appendChild(canvas);

  // 获取canvas的上下文
  const ctx = canvas.getContext('2d');

  // 创建樱花花瓣
  const petals = [];
  for (let i = 0; i < 50; i++) {
    const petal = {
      x: Math.random() * canvas.width, // 随机设置花瓣的水平位置
      y: Math.random() * canvas.height, // 随机设置花瓣的垂直位置
      size: Math.random() * 10 + 10, // 随机设置花瓣大小
      fallSpeed: Math.random() * 2 + 1, // 随机设置花瓣下落的速度
    };
    petals.push(petal);
  }

  // 绘制樱花花瓣
  function drawPetals() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'pink'; // 设置花瓣颜色
    petals.forEach(petal => {
      ctx.beginPath();
      ctx.arc(petal.x, petal.y, petal.size, 0, Math.PI * 2);
      ctx.fill();

      // 更新花瓣的位置
      petal.y += petal.fallSpeed;

      // 如果花瓣超出屏幕底部，则重新设置其位置到屏幕顶部
      if (petal.y > canvas.height) {
        petal.y = 0;
        petal.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(drawPetals);
  }

  // 开始绘制樱花花瓣
  drawPetals();
};
export default startSakura;