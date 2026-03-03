window.onload = function () {
  // 获取图片
  const flyer = document.getElementById('flyer');
  if (!flyer) return;

  // 基础样式
  flyer.style.position = 'fixed';
  flyer.style.width = '100px';
  flyer.style.height = '100px';
  flyer.style.zIndex = '99999';
  flyer.style.borderRadius = '50%';
  flyer.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
  flyer.style.cursor = 'pointer';
  flyer.style.transition = 'transform 0.2s';

  // 局部变量
  let x = Math.random() * (window.innerWidth - 100);
  let y = Math.random() * (window.innerHeight - 100);
  let speedX = (Math.random() + 1) * (Math.random() > 0.5 ? 1 : -1);
  let speedY = (Math.random() + 1) * (Math.random() > 0.5 ? 1 : -1);
  let isPaused = false;  // 局部暂停标志

  // 设置初始位置
  flyer.style.left = x + 'px';
  flyer.style.top = y + 'px';

  // 鼠标悬停：放大并暂停移动
  flyer.addEventListener('mouseenter', () => {
    flyer.style.transform = 'scale(1.1)';
    isPaused = true;  // 修改局部变量
  });

  // 鼠标离开：恢复大小并继续移动
  flyer.addEventListener('mouseleave', () => {
    flyer.style.transform = 'scale(1)';
    isPaused = false;  // 修改局部变量
  });

  // 动画循环
  function moveImage() {
    if (!isPaused) {  // 检查局部变量
      x += speedX;
      y += speedY;

      const maxX = window.innerWidth - 100;
      const maxY = window.innerHeight - 100;

      if (x <= 0) { x = 0; speedX = Math.abs(speedX); }
      if (x >= maxX) { x = maxX; speedX = -Math.abs(speedX); }
      if (y <= 0) { y = 0; speedY = Math.abs(speedY); }
      if (y >= maxY) { y = maxY; speedY = -Math.abs(speedY); }

      flyer.style.left = x + 'px';
      flyer.style.top = y + 'px';
    }

    requestAnimationFrame(moveImage);
  }

  moveImage();

  window.addEventListener('resize', () => {
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 100;
    x = Math.min(x, maxX);
    y = Math.min(y, maxY);
    flyer.style.left = x + 'px';
    flyer.style.top = y + 'px';
  });
};