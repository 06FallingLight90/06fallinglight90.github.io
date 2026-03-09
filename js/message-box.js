//此文件存储对话框相关的js

//=======================数据部分================================

//背景图片与对应消息
const backgrounds = [
  {
    url: './images/background/library-lwz.jpg',
    message: '李文正图书馆，乃是东南大学的主馆。'
  },
  {
    url: './images/background/forbidden-city.jpg',
    message: '受命于天，既寿永昌！！--摄于北京'
  },
  {
    url: './images/background/auditorium.jpg',
    message: '中央大道的梧桐发枯，那是又过去了一年。'
  },
  {
    url: './images/background/confucius-temple.jpg',
    message: '秦淮灯月，尚可得乎？--摄于南京'
  },
  {
    url: './images/background/canal-museum.jpg',
    message: '若无水殿龙舟事--摄于扬州'
  },
  {
    url: './images/background/jinshan-temple.jpg',
    message: '金山亦绝矣--摄于镇江'
  },
  {
    url: './images/background/xian-sunset.jpg',
    message: '西风残照，汉家陵阙--摄于西安'
  },
  {
    url: './images/background/chongqing-hyd.jpg',
    message: '冷色调的江与山之城--摄于重庆'
  },
  {
    url: './images/background/luoyang.jpg',
    message: '条件艰难的神京车轨--摄于洛阳'
  },
  {
    url: './images/background/fdlz.jpg',
    message: '记得十月要来文科楼ww'
  },
  {
    url: './images/background/autumnsky.jpg',
    message: '"我已经恋上南京的天空了"'
  }
];

// 后续随机消息池
const randomMessages = [
  "谢谢惠顾~",
  "奇怪的话？那是从网上得来的。",
  "试试修改message-box.js!!",
  "联系我获取背景原图！",
  "涧户寂无人，纷纷开且落",
  "点击输入文本",
  "啊啊，法的世界里充满了光辉。",
  "一万年太久，只争朝夕",
  "我心中的宝藏更胜世间荣耀。"
];


//=======================功能部分========================================


const body = document.body;
const messageBox = document.getElementById('messageBox');
const messageText = document.getElementById('messageText');



/**
 * 设置随机背景图（打开时调用）
 */
function setRandomBackground() {
  // 随机选一个背景
  const randomIndex = Math.floor(Math.random() * backgrounds.length);
  const selected = backgrounds[randomIndex];

  // 设置背景图
  body.style.backgroundImage = `url('${selected.url}')`;


  console.log('已选择背景:', selected.message);
  return selected;
}

/**
 * 显示对话框（可指定消息）
 */
function showMessage(msg) {
  messageText.innerText = msg;
  messageBox.classList.add('show');

  // 5秒后隐藏
  setTimeout(() => {
    messageBox.classList.remove('show');
  }, 5000);
}

/**
 * 获取随机消息（从随机池）
 */
function getRandomMessage() {
  const randomIndex = Math.floor(Math.random() * randomMessages.length);
  return randomMessages[randomIndex];
}

/**
 * 获取随机消息（从api）
 */
async function getApiMessage() {
  try {
    const res = await fetch('https://v1.hitokoto.cn/');
    const data = await res.json();
    return data.hitokoto;  // 返回中文句子
  } catch (err) {
    // API失败时的备用消息
    return "检查一下你的网络连接如何？？";
  }
}


window.addEventListener('load', () => {
  // 随机选择背景图
  const selectedBg = setRandomBackground();

  // 延迟一点显示对应对话框
  setTimeout(() => {
    showMessage(selectedBg.message);
  }, 1000);

  // 后续随机播放（15秒间隔）
  setInterval(async () => {
    let msg;

    // 随机决定用API还是本地
    if (Math.random() > 0.5) {
      msg = await getApiMessage();
    } else {
      msg = getRandomMessage();
    }

    showMessage(msg);
  }, 15000);
});