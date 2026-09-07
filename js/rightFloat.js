// 右悬浮窗点击特效：鼠标处迸出彩色小星星
window.addEventListener('load', () => {
  const floatBox = document.querySelector('.rightFloat');
  if (!floatBox) return;

  // 星星颜色池
  const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#B983FF', '#FF9F45', '#48DBFB'];

  // 星星是否为正六角形：true=画星形，false=圆形
  function createStar(e) {
    const count = 5 + Math.floor(Math.random() * 10); // 5~14 颗
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      const size = 8 + Math.random() * 10; // 星星大小
      const color = colors[Math.floor(Math.random() * colors.length)];
      const shape = Math.random() > 0.5;

      // 随机飞出方向与旋转
      const angle = Math.random() * Math.PI * 2;
      const distance = 60 + Math.random() * 90; // 迸射距离
      const duration = 600 + Math.random() * 500; // 动画时长
      const rotate = (Math.random() - 0.5) * 540; // 随机旋转角度

      // 设置初始位置（鼠标处）
      star.style.position = 'fixed';
      star.style.left = e.clientX + 'px';
      star.style.top = e.clientY + 'px';
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

      // 无需动画库，直接交给 ends 后的移除
      star.addEventListener('animationend', () => star.remove());

      // 绝对定位转 fixed 后偏移量需换算，这里直接以鼠标为锚点做平移+旋转+淡出
      star.style.transition = `transform ${duration}ms ease-out, opacity ${duration * 0.9}ms ease-in`;
      star.style.opacity = '1';

      floatBox.appendChild(star);

      // 下一帧触发动画
      requestAnimationFrame(() => {
        star.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) rotate(${rotate}deg)`;
        star.style.opacity = '0';
      });

      // 兜底清理：防止 animation 未触发导致节点残留
      setTimeout(() => star.remove(), duration + 100);
    }
  }

  floatBox.addEventListener('click', createStar);
});