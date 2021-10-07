import XLSX from "xlsx";
import { saveAs } from "file-saver";
import { getChatList } from "./getChatList";

// Xlsxのオプション
const write_opts: XLSX.WritingOptions = {
  type: "binary",
};

//_________________________________________________________-
// メイン処理
export async function download() {
  // チャットのリストを取得
  const r = await getChatList();

  // xlsxのデータ作成
  const wb_out = createExcelData(r);

  // WorkbookからBlobオブジェクトを生成
  const blob = new Blob([s2ab(wb_out)], { type: "application/octet-stream" });

  // xlsxファイルとしてダウンロード
  saveAs(blob, "myExcelFile.xlsx");
}

//_________________________________________________________-
//
function createExcelData(data: any) {
  // ヘッダー
  const array1 = [["personType", "personId", "createdAt", "plainText"]];

  // エクセルデータ作成
  data.messages.forEach(({ personType, personId, createdAt, plainText }) => {
    array1.push([
      personType,
      personId,
      new Date(createdAt).toLocaleString(),
      plainText,
    ]);
  });

  // ArrayをWorkbookに変換する
  const wb = aoa_to_workbook(array1);
  return XLSX.write(wb, write_opts);
}

//_________________________________________________________-
//

// ArrayをWorkbookに変換する
function aoa_to_workbook(data, opts?: XLSX.AOA2SheetOpts) {
  return sheet_to_workbook(XLSX.utils.aoa_to_sheet(data, opts), opts);
}

//_________________________________________________________-
//

// SheetをWorkbookに追加する
function sheet_to_workbook(sheet, opts) {
  var n = opts && opts.sheet ? opts.sheet : "Sheet1";
  var sheets = {};
  sheets[n] = sheet;
  return { SheetNames: [n], Sheets: sheets };
}

//_________________________________________________________-
//

// stringをArrayBufferに変換する
function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
}
