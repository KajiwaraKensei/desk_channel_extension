import React, { useState } from "react";
import { browser } from "webextension-polyfill-ts";
import { useChromeMessage } from "./useChromeMessage";

export const useCopyMessage = () => {
  const { message } = useChromeMessage();

  const [loading, setLoading] = React.useState(false); // 取得中
  const [text, setTxt] = useState(""); // 取得したテキスト
  const [err, setErr] = useState(""); // 取得失敗

  // コピー開始
  function get() {
    setLoading(true);
    browser.tabs.query({ active: true }).then((result) => {
      browser.tabs.sendMessage(result[0].id, {
        type: "copyAll",
      });
    });
  }

  // chromeのメッセージ監視
  React.useEffect(() => {
    switch (message.type) {
      case "copy_txt_p":
        setTxt(message.txt);
        setErr("");
        setLoading(false);
        navigator.clipboard.writeText(message.txt);
        break;
      case "copy_txt_p_e":
        setErr(String(message.error));
        setLoading(false);
    }
  }, [message]);

  return {
    loading: {
      state: loading,
      err,
    },
    text,
    fn: {
      get,
    },
  };
};
