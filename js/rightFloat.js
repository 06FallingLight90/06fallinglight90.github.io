// 右悬浮窗点击/拖拽特效：点击迸出彩色小星星，按住拖动产生星星拖尾
window.addEventListener('load', () => {
  const floatBox = document.querySelector('.rightFloat');
  if (!floatBox) return;

  // 星星颜色池
  const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#B983FF', '#FF9F45', '#48DBFB'];

  // 在指定坐标迸出星星
  // count: 本次生成的星星数量；power: 迸射距离系数（拖尾用较小值）
  function spawnStars(x, y, count, power = 1) {
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      const size = 8 + Math.random() * 10; // 星星大小
      const color = colors[Math.floor(Math.random() * colors.length)];
      const shape = Math.random() > 0.5;

      // 随机飞出方向与旋转
      const angle = Math.random() * Math.PI * 2;
      const distance = (50 + Math.random() * 90) * power;
      const duration = 500 + Math.random() * 500;
      const rotate = (Math.random() - 0.5) * 540;

      // 以鼠标为锚点
      star.style.position = 'fixed';
      star.style.left = x + 'px';
      star.style.top = y + 'px';
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      star.style.zIndex = '99999';
      star.style.pointerEvents = 'none';
      star.style.background = color;
      star.style.boxShadow = `0 0 ${size * 0.6}px ${color}`;
      star.style.transform = 'translate(-50%, -50%)';

      // 圆形或正五角星
      if (shape) {
        star.style.borderRadius = '50%';
      } else {
        star.style.clipPath =
          'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
      }

      // 平移飞出 + 旋转 + 淡出
      star.style.transition = `transform ${duration}ms ease-out, opacity ${duration * 0.9}ms ease-in`;
      star.style.opacity = '1';

      floatBox.appendChild(star);

      requestAnimationFrame(() => {
        star.style.transform =
          `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) rotate(${rotate}deg)`;
        star.style.opacity = '0';
      });

      // 兜底清理，防止节点残留
      setTimeout(() => star.remove(), duration + 100);
    }
  }

  // 点击：原地迸出一簇星星
  floatBox.addEventListener('click', (e) => {
    spawnStars(e.clientX, e.clientY, 5 + Math.floor(Math.random() * 10));
  });

  // ---------- 按住拖拽：持续产生星星拖尾 ----------
  let isDragging = false;
  let lastTime = 0;   // 上次产生星星的时刻（节流）
  let lastX = 0;
  let lastY = 0;

  floatBox.addEventListener('mousedown', (e) => {
    e.preventDefault(); // 避免触发拖拽选中
    isDragging = true;
    lastTime = performance.now();
    lastX = e.clientX;
    lastY = e.clientY;
    // 按下时先来一小簇
    spawnStars(e.clientX, e.clientY, 4, 0.7);
  });

  // 按住鼠标在页面任意位置移动，都在光标处拖出星星
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const now = performance.now();
    const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
    // 时间节流 + 距离节流：避免一次生成太多节点
    if (now - lastTime < 40 || dist < 10) return;

    lastTime = now;
    lastX = e.clientX;
    lastY = e.clientY;
    // 间距越长星星越密，最多 3 颗
    const n = Math.min(3, 1 + Math.floor(dist / 20));
    spawnStars(e.clientX, e.clientY, n, 0.7);
  });

  // 松开鼠标停止拖尾
  window.addEventListener('mouseup', () => {
    isDragging = false;
  });
});