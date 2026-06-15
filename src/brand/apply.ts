/**
 * ブランド色の図形への適用
 *
 * 選択中の図形に Primary/Secondary 色を適用
 */

import { getSelectedShapes, runPowerPoint } from '../powerpoint';
import { loadBrand } from './storage';

/**
 * 選択中の図形に Primary 色を適用
 */
export async function applyPrimaryColor(): Promise<void> {
  const config = await loadBrand();

  await runPowerPoint(async (context) => {
    const shapes = await getSelectedShapes();

    if (shapes.length === 0) {
      throw new Error('図形が選択されていません');
    }

    // 各図形に Primary 色を適用
    for (const shape of shapes) {
      try {
        // 塗りつぶし色を設定
        shape.fill.setSolidColor(config.primary);
      } catch (error) {
        console.warn('Failed to apply fill color:', error);
      }

      try {
        // 枠線色を設定
        shape.lineFormat.color = config.primary;
      } catch (error) {
        console.warn('Failed to apply line color:', error);
      }
    }

    await context.sync();
  });
}

/**
 * 選択中の図形に Secondary 色を適用
 */
export async function applySecondaryColor(): Promise<void> {
  const config = await loadBrand();

  await runPowerPoint(async (context) => {
    const shapes = await getSelectedShapes();

    if (shapes.length === 0) {
      throw new Error('図形が選択されていません');
    }

    // 各図形に Secondary 色を適用
    for (const shape of shapes) {
      try {
        // 塗りつぶし色を設定
        shape.fill.setSolidColor(config.secondary);
      } catch (error) {
        console.warn('Failed to apply fill color:', error);
      }

      try {
        // 枠線色を設定
        shape.lineFormat.color = config.secondary;
      } catch (error) {
        console.warn('Failed to apply line color:', error);
      }
    }

    await context.sync();
  });
}

/**
 * 選択中の図形のテキストに色を適用
 */
export async function applyTextColor(color: string): Promise<void> {
  await runPowerPoint(async (context) => {
    const shapes = await getSelectedShapes();

    if (shapes.length === 0) {
      throw new Error('図形が選択されていません');
    }

    // 各図形のテキストに色を適用
    for (const shape of shapes) {
      try {
        const textFrame = shape.textFrame;
        textFrame.load('textRange');
        await context.sync();

        if (textFrame.textRange) {
          textFrame.textRange.font.color = color;
        }
      } catch (error) {
        console.warn('Failed to apply text color:', error);
      }
    }

    await context.sync();
  });
}
