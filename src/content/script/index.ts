// ______________________________________________________
// root
import { browser } from "webextension-polyfill-ts";
import "../styles.css";

import { blockImage } from "./blockImage";
import { download } from "./excelDownload";

// backgroundからのメッセージを受け取る
browser.runtime.onMessage.addListener((message) => {
  const action = {
    copyAll: () => {
      download()
        .then((text) => {
          browser.runtime.sendMessage({ type: "copy_txt_p", txt: text });
        })
        .catch((err) => {
          browser.runtime.sendMessage({ type: "copy_txt_p_e", error: err });
        }); // チャンネルのメッセージを通信でダウンロード
    },
  };

  action[message.type] && action[message.type](message);
});

// 画像を無効化
blockImage();
