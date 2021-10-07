export async function getChatList() {
  // 現在のURLをスラッシュで区切る
  const urls = document.URL.split("/");
  let channel = "";
  let chat = "";

  // channelsID と chatID の取得
  urls.forEach((value, i) => {
    if (value === "channels") {
      channel = urls[i + 1];
    }

    if (value === "user_chats") {
      chat = urls[i + 1];
    }
  });

  const url = `https://desk-api.channel.io/desk/channels/${channel}/user-chats/${chat}/messages?sortOrder=asc&limit=10000`;

  // データ取得
  const r = await fetch(url, { credentials: "include" }).then((r) => r.json());

  return r;
}
