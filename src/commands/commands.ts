/**
 * リボンコマンドハンドラー
 *
 * manifest.xml で定義されたリボンボタンのコマンドを処理する。
 */

import { applyPrimaryColor, applySecondaryColor } from '../brand';

// Office.js の初期化
Office.onReady(() => {
  console.log('Commands ready');
});

/**
 * カタログを開くコマンド（タスクペインを表示）
 */
function openCatalog(event: Office.AddinCommands.Event) {
  // タスクペインを開く
  Office.context.ui.displayDialogAsync(
    'https://localhost:3000/taskpane.html',
    { height: 50, width: 30 },
    () => {
      event.completed();
    }
  );
}

/**
 * Primary カラーを適用
 */
async function applyPrimary(event: Office.AddinCommands.Event) {
  try {
    await applyPrimaryColor();
    console.log('Primary color applied');
  } catch (error) {
    console.error('Failed to apply primary color:', error);
    // エラーをユーザーに通知
    if (error instanceof Error) {
      Office.context.ui.displayDialogAsync(
        `data:text/html,<html><body><p>エラー: ${error.message}</p></body></html>`,
        { height: 20, width: 30 }
      );
    }
  } finally {
    event.completed();
  }
}

/**
 * Secondary カラーを適用
 */
async function applySecondary(event: Office.AddinCommands.Event) {
  try {
    await applySecondaryColor();
    console.log('Secondary color applied');
  } catch (error) {
    console.error('Failed to apply secondary color:', error);
    // エラーをユーザーに通知
    if (error instanceof Error) {
      Office.context.ui.displayDialogAsync(
        `data:text/html,<html><body><p>エラー: ${error.message}</p></body></html>`,
        { height: 20, width: 30 }
      );
    }
  } finally {
    event.completed();
  }
}

// グローバルスコープにコマンド関数を登録
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).openCatalog = openCatalog;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).applyPrimary = applyPrimary;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).applySecondary = applySecondary;
