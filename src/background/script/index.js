// ______________________________________________________
// バックグラウンド

// コンテクストメニュー作成
function createContextMenus() {
  chrome.contextMenus.create({
    title: "コピー",
    id: "copy_all",
    contexts: ["all"],
  });
}

// インストール時
chrome.runtime.onInstalled.addListener(function () {
  //createContextMenus();
});

// コンテクストメニュークリック時
//chrome.contextMenus.onClicked.addListener(function () {
//  sendContextMessage();
//});

function sendContextMessage() {
  chrome.tabs.query({ active: true }, (result) => {
    chrome.tabs.sendMessage(result[0].id, {
      type: "open",
    });
  });
}

chrome.runtime.onMessage.addListener(function (message) {
  switch (message.type) {
    case "newConfig":
      chrome.tabs.create({
        url: "chrome://extensions/?options=" + chrome.runtime.id,
      });
      break;
    case "newTab":
      chrome.tabs.create({ url: message.url });
  }
});
