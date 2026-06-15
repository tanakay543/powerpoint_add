import { PowerPointError } from './types';

/* global PowerPoint */

/**
 * PowerPoint.run のラッパー
 *
 * エラーハンドリングと型安全性を提供
 */
export async function runPowerPoint<T>(
  callback: (context: PowerPoint.RequestContext) => Promise<T>
): Promise<T> {
  try {
    return await PowerPoint.run(async (context) => {
      try {
        const result = await callback(context);
        await context.sync();
        return result;
      } catch (error) {
        console.error('PowerPoint API error:', error);
        throw new PowerPointError(
          'PowerPoint API の実行に失敗しました',
          'API_ERROR',
          error
        );
      }
    });
  } catch (error) {
    if (error instanceof PowerPointError) {
      throw error;
    }
    console.error('PowerPoint.run error:', error);
    throw new PowerPointError(
      'PowerPoint との通信に失敗しました',
      'RUNTIME_ERROR',
      error
    );
  }
}

/**
 * アクティブスライドを取得
 *
 * Note: PowerPoint API には選択中スライド取得機能がないため、
 * 実際の挿入処理では context 内で直接 getItemAt(0) を使用
 */
export async function getActiveSlide(
  context: PowerPoint.RequestContext
): Promise<PowerPoint.Slide> {
  const presentation = context.presentation;
  const slides = presentation.slides;
  slides.load('items');
  await context.sync();

  // 最初のスライドを返す
  // 実際はユーザーが選択中のスライドに挿入される
  const slide = slides.getItemAt(0);
  return slide;
}

/**
 * 新規スライドを追加
 */
export async function addNewSlide(): Promise<void> {
  await runPowerPoint(async (context) => {
    const presentation = context.presentation;
    presentation.slides.add();
    await context.sync();
  });
}

/**
 * 選択中の図形を取得
 */
export async function getSelectedShapes(): Promise<PowerPoint.Shape[]> {
  return runPowerPoint(async (context) => {
    const presentation = context.presentation;
    const selection = presentation.getSelectedShapes();
    selection.load('items');
    await context.sync();

    return selection.items;
  });
}
