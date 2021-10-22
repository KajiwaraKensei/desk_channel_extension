import conf from "~/conf";

const blockImageConf = conf.blockImage;
/**
 * トークの画像を非表示に
 */
export async function blockImage() {
  await waitLoad();
  disableImage();
}

/**
 * トークが表示されるまで待機
 * @param nest ループのカウント
 */
async function waitLoad(nest: number = 0) {
  if (document.querySelector(blockImageConf.query)) {
    return;
  }

  await sleep(blockImageConf.timeout);
  return waitLoad(nest + 1);
}

/**
 * 画像を無効化
 */
function disableImage() {
  // リストのクラス名を取得
  const targetClassName = getList(document.querySelector(blockImageConf.query));

  // wrapの単語が含まれていなければもう一度
  if (targetClassName.indexOf("wrap") < 0) {
    setTimeout(disableImage, blockImageConf.timeout);
    return;
  }

  // スタイルタグを作成　画像を無効化
  const styleElement = document.createElement("style");
  styleElement.innerText = `
  .${targetClassName} > div > div:nth-child(2) img{ 
    display: none;
  }
  .${targetClassName} div[class*="Image__wrapper"] {
    display: none !important;
    pointer-events: none;
  }

  `;
  document.getElementsByTagName("HEAD").item(0).appendChild(styleElement);
}

/**
 * リストのクラス名を取得
 * @param element - ルートのエレメント
 * @returns リストのクラス名
 */
function getList(element: HTMLElement): string {
  // undefine or null の場合があるためチェック
  if (!element) {
    setTimeout(disableImage, blockImageConf.timeout);
  }

  // 小要素が２より大きい要素をReturn
  if (element.childElementCount > 2) {
    return element.className;
  }

  // さらに小要素の数を取得
  return getList(element.children.item(0) as HTMLElement);
}

/**
 * スリープ
 * @param seconde - 待つ
 */
function sleep(seconde: number) {
  return new Promise((resolve) => setTimeout(resolve, seconde));
}
