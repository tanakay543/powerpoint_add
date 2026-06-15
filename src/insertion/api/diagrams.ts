/**
 * 図解カテゴリの挿入関数
 *
 * 2×2マトリクス、リスクマップ、プロセスフローなど
 * デザイントークンで統一されたグレーベースのデザイン
 */

import {
  insertRectangle,
  insertTextBox,
  getCenterPosition,
  runPowerPoint,
  insertLine,
  insertTriangle,
} from '../../powerpoint';
import type { LineOptions } from '../../powerpoint';
import { colors } from '../../styles/tokens';

/**
 * 2×2マトリクスを挿入
 *
 * A1: 4象限に分類する基本的なマトリクス図
 * 各象限にラベルを配置
 */
export async function insert2x2Matrix(): Promise<void> {
  await runPowerPoint(async () => {
    const cellWidth = 200;
    const cellHeight = 150;
    const gap = 15; // セル間の間隔
    const totalWidth = cellWidth * 2 + gap;
    const totalHeight = cellHeight * 2 + gap;

    // 中央配置の開始位置を計算
    const startPos = getCenterPosition({
      width: totalWidth,
      height: totalHeight,
    });

    // 象限のラベル
    const labels = ['象限2', '象限1', '象限3', '象限4'];

    // 4つのセルを配置（左上から時計回り）
    const positions = [
      { row: 0, col: 0 }, // 左上
      { row: 0, col: 1 }, // 右上
      { row: 1, col: 0 }, // 左下
      { row: 1, col: 1 }, // 右下
    ];

    for (let i = 0; i < 4; i++) {
      const pos = positions[i];
      const x = startPos.x + pos.col * (cellWidth + gap);
      const y = startPos.y + pos.row * (cellHeight + gap);

      // セルの矩形を挿入
      await insertRectangle({
        rect: {
          x,
          y,
          width: cellWidth,
          height: cellHeight,
        },
        colors: {
          fill: '#FFFFFF',
          stroke: colors.neutral.gray600,
        },
      });

      // ラベルを中央に配置
      await insertTextBox(
        { x: x + 10, y: y + 10 },
        { width: cellWidth - 20, height: cellHeight - 20 },
        labels[i],
        {
          fontSize: 14,
          fontFamily: 'Yu Gothic',
          color: colors.neutral.gray600,
        }
      );
    }
  });
}

/**
 * リスクマップを挿入
 *
 * A3: 影響度×発生確率でリスクを可視化
 * 縦軸：影響度（低→高）、横軸：発生確率（低→高）
 */
export async function insertRiskMap(): Promise<void> {
  await runPowerPoint(async () => {
    const cellWidth = 200;
    const cellHeight = 150;
    const gap = 15;
    const axisLabelWidth = 50; // 軸ラベルの幅
    const axisLabelHeight = 35; // 軸ラベルの高さ

    const totalWidth = cellWidth * 2 + gap + axisLabelWidth;
    const totalHeight = cellHeight * 2 + gap + axisLabelHeight;

    // 中央配置の開始位置を計算
    const startPos = getCenterPosition({
      width: totalWidth,
      height: totalHeight,
    });

    // マトリクスの開始位置（軸ラベル分オフセット）
    const matrixStartX = startPos.x + axisLabelWidth;
    const matrixStartY = startPos.y;

    // 象限のラベルと色
    const cells = [
      { label: '中リスク', color: '#FFF9C4' }, // 左上：高影響/低確率
      { label: '高リスク', color: '#FFCDD2' }, // 右上：高影響/高確率
      { label: '低リスク', color: '#E8F5E9' }, // 左下：低影響/低確率
      { label: '中リスク', color: '#FFF9C4' }, // 右下：低影響/高確率
    ];

    // 4つのセルを配置（左上から時計回り）
    const positions = [
      { row: 0, col: 0 }, // 左上
      { row: 0, col: 1 }, // 右上
      { row: 1, col: 0 }, // 左下
      { row: 1, col: 1 }, // 右下
    ];

    for (let i = 0; i < 4; i++) {
      const pos = positions[i];
      const x = matrixStartX + pos.col * (cellWidth + gap);
      const y = matrixStartY + pos.row * (cellHeight + gap);

      // セルの矩形を挿入
      await insertRectangle({
        rect: { x, y, width: cellWidth, height: cellHeight },
        colors: {
          fill: cells[i].color,
        },
      });

      // ラベルを配置
      await insertTextBox(
        { x: x + 10, y: y + 10 },
        { width: cellWidth - 20, height: cellHeight - 20 },
        cells[i].label,
        {
          fontSize: 14,
          fontFamily: 'Yu Gothic',
          color: colors.neutral.gray600,
        }
      );
    }

    // 縦軸ラベル（影響度）
    const yAxisLabels = ['高', '低'];
    for (let i = 0; i < 2; i++) {
      await insertTextBox(
        {
          x: startPos.x,
          y: matrixStartY + i * (cellHeight + gap) + cellHeight / 2 - 15,
        },
        { width: axisLabelWidth - 5, height: 30 },
        yAxisLabels[i],
        {
          fontSize: 12,
          fontFamily: 'Yu Gothic',
          color: colors.neutral.gray600,
        }
      );
    }

    // 横軸ラベル（発生確率）
    const xAxisLabels = ['低', '高'];
    for (let i = 0; i < 2; i++) {
      await insertTextBox(
        {
          x: matrixStartX + i * (cellWidth + gap) + cellWidth / 2 - 15,
          y: startPos.y + cellHeight * 2 + gap + 5,
        },
        { width: 30, height: axisLabelHeight - 5 },
        xAxisLabels[i],
        {
          fontSize: 12,
          fontFamily: 'Yu Gothic',
          color: colors.neutral.gray600,
        }
      );
    }

    // 軸タイトル
    await insertTextBox(
      {
        x: startPos.x - 5,
        y: startPos.y - 25,
      },
      { width: axisLabelWidth, height: 20 },
      '影響度',
      {
        fontSize: 11,
        fontFamily: 'Yu Gothic',
        color: colors.neutral.gray600,
        bold: true,
      }
    );

    await insertTextBox(
      {
        x: matrixStartX + cellWidth + gap / 2 - 30,
        y: startPos.y + cellHeight * 2 + gap + axisLabelHeight + 5,
      },
      { width: 60, height: 20 },
      '発生確率',
      {
        fontSize: 11,
        fontFamily: 'Yu Gothic',
        color: colors.neutral.gray600,
        bold: true,
      }
    );
  });
}

/**
 * プロセスフローを挿入
 *
 * A8: 矢羽（シェブロン）連結でプロセスを表現
 * 4つのステップを横方向に配置
 */
export async function insertProcessFlow(): Promise<void> {
  await runPowerPoint(async () => {
    const stepCount = 4;
    const chevronWidth = 180;
    const chevronHeight = 90;
    const overlap = 15; // シェブロンの重なり幅

    const totalWidth =
      chevronWidth * stepCount - overlap * (stepCount - 1);
    const startPos = getCenterPosition({
      width: totalWidth,
      height: chevronHeight,
    });

    // シェブロンの色（グレーのグラデーション）
    const stepColors = [
      colors.neutral.gray300,
      colors.neutral.gray400,
      colors.neutral.gray500,
      colors.neutral.gray600,
    ];

    for (let i = 0; i < stepCount; i++) {
      const x = startPos.x + i * (chevronWidth - overlap);
      const y = startPos.y;

      // シェブロンを挿入（矩形で代用 - PowerPointのchevronは制限あり）
      await insertRectangle({
        rect: {
          x,
          y,
          width: chevronWidth,
          height: chevronHeight,
        },
        colors: {
          fill: stepColors[i],
        },
      });

      // ステップラベル
      await insertTextBox(
        { x: x + 10, y: y + 10 },
        { width: chevronWidth - 20, height: chevronHeight - 20 },
        `ステップ${i + 1}`,
        {
          fontSize: 14,
          fontFamily: 'Yu Gothic',
          color: '#FFFFFF',
          bold: true,
        }
      );
    }

    // 接続矢印を追加（直線 + 三角形）
    const triangleSize = 8;
    for (let i = 0; i < stepCount - 1; i++) {
      const lineStartX = startPos.x + (i + 1) * (chevronWidth - overlap) - 20;
      const lineEndX = lineStartX + 10;
      const arrowY = startPos.y + chevronHeight / 2;

      // 直線
      const arrowOptions: LineOptions = {
        start: { x: lineStartX, y: arrowY },
        end: { x: lineEndX, y: arrowY },
        type: 'straight',
        color: colors.neutral.gray600,
        width: 2,
      };
      await insertLine(arrowOptions);

      // 矢印の先端（三角形）
      await insertTriangle(
        { x: lineEndX, y: arrowY },
        triangleSize,
        'right',
        colors.neutral.gray600
      );
    }
  });
}
