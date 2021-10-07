import React, { useState } from "react";
import { browser } from "webextension-polyfill-ts";

export const useChromeMessage = () => {
  const [message, setMessage] = useState<any>({}); // 取得したテキスト

  React.useEffect(() => {
    function listener(message) {
      setMessage(message);
    }
    browser.runtime.onMessage.addListener(listener);
    return () => browser.runtime.onMessage.removeListener(listener);
  }, []);

  return { message };
};
