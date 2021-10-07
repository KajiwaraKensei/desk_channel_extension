import conf from "~/conf";

const copyConf = conf.copyAll;
/**
 * メッセージを一番上までスクロールしてコピーします。
 */
export async function copyAll() {
  // スクロールする要素を取得
  const element = getScrollDom(document.querySelector(copyConf.query));

  // 一番上までスクロール
  await toTop(element);
  return element.innerText;
}

export default copyAll;

/**
 * スクロールできる要素を取得します
 * @param target - ルートのエレメント
 * @param nest - 無限ループ回避
 * @returns スクロールが可能なエレメント
 */
function getScrollDom(target: HTMLElement, nest?: number): HTMLElement {
  // 引数チェック
  if (!target || copyConf.nest > 15) {
    throw "要素が見つかりません";
  }

  // スタイル取得
  const css = getComputedStyle(target);

  // overflow-y が autoだったら
  if (css.getPropertyValue("overflow-y") === "auto") {
    return target;
  }

  // 小要素の値で取得
  return getScrollDom(target.children.item(0) as HTMLElement, (nest || 0) + 1);
}

/**
 * 一番上までスクロールします
 */
async function toTop(element: HTMLElement) {
  // 一番上か？
  if (element.scrollTop === 0) {
    return;
  }
  // 一番上に設定
  element.scroll({
    top: 0,
    behavior: "smooth",
  });

  // 待ってからもう一度実行
  await sleep(copyConf.sleep);
  return toTop(element);
}

/**
 * スリープ
 * @param seconde - 待つ
 */
function sleep(seconde: number) {
  return new Promise((resolve) => setTimeout(resolve, seconde));
}
