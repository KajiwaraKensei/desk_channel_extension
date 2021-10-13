import conf from "~/conf";

const blockImageConf = conf.blockImage;
/**
 * トークの画像を非表示に
 * @param nest ループのカウント
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
  console.log(blockImageConf.query);
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
  console.log(blockImageConf.query, 1);

  // リストのクラス名を取得
  const targetClassName = getList(document.querySelector(blockImageConf.query));
  console.log(targetClassName);

  // wrapの単語が含まれていなければもう一度
  if (targetClassName.indexOf("wrap") < 0) {
    setTimeout(disableImage, blockImageConf.timeout);
    return;
  }
  console.log("create!!!!");

  // スタイルタグを作成　画像を無効化
  const styleElement = document.createElement("style");
  styleElement.innerText = `.${targetClassName} > div > div:nth-child(2) img { filter: blur(12px);}`;
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
