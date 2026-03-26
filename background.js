// 插件安装时创建右键菜单
chrome.runtime.onInstalled.addListener(() => {
  // 清空旧菜单，防止重复
  chrome.contextMenus.removeAll();

  // 创建菜单：只在腾讯视频显示
  chrome.contextMenus.create({
    id: "vip-video-menu",
    title: "VIP视频",
    contexts: ["page"],
    documentUrlPatterns: ["https://v.qq.com/*","https://www.youku.com/*","https://www.iqiyi.com/*"]
  });
});

// 监听菜单点击（最稳定写法）
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "vip-video-menu") {
    // 后台打印日志（不会报错）
    console.log("菜单点击成功！页面：", info.pageUrl);

    // 方式1：打开新网页（最实用、不报错）
    chrome.tabs.create({
      url: "https://video.isyour.love/player/getplayer?url="+info.pageUrl
    });

    // 方式2：你也可以换成 输出日志 不打开页面
    // 只用下面这行就行，上面的chrome.tabs.create注释掉
    // console.log("右键菜单正常工作啦！");
  }
});