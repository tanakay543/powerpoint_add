/**
 * 基本図形挿入（直線・矢印・楕円）
 *
 * FR-11: クイック挿入用の基本図形
 * デザイントークンのグレーベースカラーで統一されたデザインを実現
 */

import {
  insertLine,
  insertTriangle,
  insertEllipse,
  insertRectangle,
  insertTextBox,
  getCenterPosition,
  MARGINS,
  SLIDE_SIZE,
  runPowerPoint,
} from '../../powerpoint';
import type { LineOptions } from '../../powerpoint';
import { colors, objectDefaults } from '../../styles/tokens';

/**
 * デフォルトサイズ定数（デザイントークンから取得）
 */
const DEFAULT_LINE_LENGTH = objectDefaults.shapes.lineLength;
const DEFAULT_ELLIPSE_SIZE = objectDefaults.shapes.ellipseDiameter;

/**
 * 直線を挿入（グレー固定）
 *
 * スライド中央に水平な直線を挿入
 */
export async function insertStraightLine(): Promise<void> {
  const center = getCenterPosition({
    width: DEFAULT_LINE_LENGTH,
    height: 0,
  });
  const startX = center.x;
  const centerY = center.y;
  const endX = startX + DEFAULT_LINE_LENGTH;

  const options: LineOptions = {
    start: { x: startX, y: centerY },
    end: { x: endX, y: centerY },
    type: 'straight',
    color: colors.neutral.gray600,
    width: 2,
  };

  await insertLine(options);
}

/**
 * 矢印を挿入（グレー固定）
 *
 * スライド中央に右向きの矢印を挿入（直線 + 三角形）
 */
export async function insertArrow(): Promise<void> {
  await runPowerPoint(async () => {
    const triangleSize = 10; // 三角形のサイズ
    const center = getCenterPosition({
      width: DEFAULT_LINE_LENGTH,
      height: 0,
    });
    const startX = center.x;
    const centerY = center.y;
    const endX = startX + DEFAULT_LINE_LENGTH - triangleSize;

    // 直線を描画
    const options: LineOptions = {
      start: { x: startX, y: centerY },
      end: { x: endX, y: centerY },
      type: 'straight',
      color: colors.neutral.gray600,
      width: 2,
    };
    await insertLine(options);

    // 矢印の先端（三角形）
    await insertTriangle(
      { x: endX, y: centerY },
      triangleSize,
      'right',
      colors.neutral.gray600
    );
  });
}

/**
 * 楕円を挿入（グレー固定）
 *
 * スライド中央に円（正方形の楕円）を挿入
 */
export async function insertGrayEllipse(): Promise<void> {
  const size = {
    width: DEFAULT_ELLIPSE_SIZE,
    height: DEFAULT_ELLIPSE_SIZE,
  };

  const position = getCenterPosition(size);

  await insertEllipse({
    rect: {
      ...position,
      ...size,
    },
    colors: {
      fill: colors.neutral.gray200,
    },
  });
}

/**
 * 横線（区切り線）を挿入
 *
 * スライド幅いっぱいに細い横線を挿入
 */
export async function insertDividerLine(y: number = 270): Promise<void> {
  const options: LineOptions = {
    start: { x: MARGINS.MEDIUM, y },
    end: { x: SLIDE_SIZE.WIDTH - MARGINS.MEDIUM, y },
    type: 'straight',
    color: colors.neutral.gray400,
    width: 1.5,
  };

  await insertLine(options);
}

/**
 * カード（円＋テキスト）を挿入
 *
 * 円形の背景にテキストラベルを配置したカード図形
 * テキストはオプションで指定可能（デフォルト: "Label"）
 */
export async function insertCard(text: string = 'Label'): Promise<void> {
  const cardSize = 100; // カードのサイズ (正円)
  const position = getCenterPosition({
    width: cardSize,
    height: cardSize,
  });

  await insertEllipse({
    rect: {
      ...position,
      width: cardSize,
      height: cardSize,
    },
    colors: {
      fill: colors.neutral.gray200,
      text: colors.neutral.gray600,
    },
    text,
    fontSize: 16,
    fontFamily: 'Yu Gothic',
  });
}

/**
 * 4×4テーブルを挿入
 *
 * 各セルを個別の四角形オブジェクトで構成
 * セル間にギャップを設けて構造を表現（枠線なし）
 * すべてのセルにテキスト入力可能
 * ヘッダー行は濃いグレー、データ行は薄いグレー
 */
export async function insert4x4Table(): Promise<void> {
  await runPowerPoint(async () => {
    const rows = 4;
    const cols = 4;
    const cellWidth = 150;
    const cellHeight = 50;
    const gap = 5; // セル間の間隔
    const tableWidth = cellWidth * cols + gap * (cols - 1);
    const tableHeight = cellHeight * rows + gap * (rows - 1);

    const position = getCenterPosition({
      width: tableWidth,
      height: tableHeight,
    });

    const headers = ['列1', '列2', '列3', '列4'];

    // 各セルを個別の矩形として作成
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = position.x + col * (cellWidth + gap);
        const y = position.y + row * (cellHeight + gap);
        const isHeader = row === 0;

        // セルの矩形（枠線なし、テキスト入力可能）
        await insertRectangle({
          rect: {
            x,
            y,
            width: cellWidth,
            height: cellHeight,
          },
          colors: {
            fill: isHeader ? colors.neutral.gray300 : colors.neutral.gray100,
            text: isHeader ? '#FFFFFF' : colors.neutral.gray700,
          },
          text: isHeader ? headers[col] : '', // ヘッダーはテキスト設定、データ行は空
          fontSize: isHeader ? 13 : 12,
          fontFamily: 'Yu Gothic',
        });
      }
    }
  });
}

/**
 * アイコン＋ラベルを挿入
 *
 * 小さい円（アイコン）とその下にテキストラベルを配置
 */
export async function insertIconWithLabel(
  label: string = 'Label'
): Promise<void> {
  await runPowerPoint(async () => {
    const iconSize = 60;
    const labelHeight = 30;
    const totalHeight = iconSize + 10 + labelHeight; // アイコン + 間隔 + ラベル

    const centerPos = getCenterPosition({
      width: iconSize,
      height: totalHeight,
    });

    // アイコン（円）を挿入
    await insertEllipse({
      rect: {
        x: centerPos.x,
        y: centerPos.y,
        width: iconSize,
        height: iconSize,
      },
      colors: {
        fill: colors.neutral.gray400,
      },
    });

    // ラベル（テキストボックス）を挿入
    await insertTextBox(
      {
        x: centerPos.x,
        y: centerPos.y + iconSize + 10,
      },
      {
        width: iconSize,
        height: labelHeight,
      },
      label,
      {
        fontSize: 12,
        fontFamily: 'Yu Gothic',
        color: colors.neutral.gray600,
      }
    );
  });
}
