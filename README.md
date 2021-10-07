# Chrome 拡張機能

## 環境
  Node@16.9.1    

## Chrome に追加
1. [chrome://extensions/](chrome://extensions/) に移動。
2. 右上のデベロッパーモードをオンにする。
3. 左上の方にあるパッケージされていない拡張期のを読み込むを選択。
4. copy_text のフォルダを選択。
  

## 環境構築
   ```bash
      cd copy_text
      npm install
   ```
## 更新
 1. ビルド
   ```bash
      npm run build
   ```
   2. [chrome://extensions/](chrome://extensions/) に移動。
   3. copy_text のリロードボタンをクリック


## ファイル解説
### *manifest.json*

   chromeに拡張機能を取り込む際, このファイルをもとにソースコードが読み込まれる  
   拡張機能の名前や画像などの情報をここで設定している   

### *package.json*
   主に外部モジュールを管理  

### *tsconfig.json*
   TypeScriptの設定ファイル  

### *webpack.config.js*
   webpack の設定ファイル  
   ここで設定した内容distでフォルダが生成される
