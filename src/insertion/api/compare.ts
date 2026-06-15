/**
 * 比較・スケジュール系カテゴリの挿入関数
 *
 * Before/After、As-Is/To-Be、比較表、KPI、Key Takeaway等
 * デザイントークンで統一されたグレーベースのデザイン
 */

import {
  insertRectangle,
  insertTextBox,
  getCenterPosition,
  runPowerPoint,
  insertLine,
  insertTriangle,
  insertEllipse,
} from '../../powerpoint';
import type { LineOptions } from '../../powerpoint';
import { colors } from '../../styles/tokens';

/**
 * Before/After を挿入
 *
 * C1: 変化を対比させる2カラム構成
 * 左側にBefore、右側にAfterを配置し、中央に矢印を表示
 */
export async function insertBeforeAfter(): Promise<void> {
  await runPowerPoint(async () => {
    const boxWidth = 240;
    const boxHeight = 180;
    const gap = 90; // 2つのボックス間の間隔
    const headerHeight = 45; // ヘッダー部分の高さ

    const totalWidth = boxWidth * 2 + gap;
    const startPos = getCenterPosition({
      width: totalWidth,
      height: boxHeight,
    });

    // Beforeボックス（左側）
    const beforeX = startPos.x;
    const afterX = startPos.x + boxWidth + gap;

    // Before ヘッダー
    await insertRectangle({
      rect: {
        x: beforeX,
        y: startPos.y,
        width: boxWidth,
        height: headerHeight,
      },
      colors: {
        fill: colors.neutral.gray400,
      },
    });

    await insertTextBox(
      { x: beforeX + 10, y: startPos.y + 5 },
      { width: boxWidth - 20, height: headerHeight - 10 },
      'Before',
      {
        fontSize: 16,
        fontFamily: 'Yu Gothic',
        color: '#FFFFFF',
        bold: true,
      }
    );

    // Before コンテンツエリア
    await insertRectangle({
      rect: {
        x: beforeX,
        y: startPos.y + headerHeight,
        width: boxWidth,
        height: boxHeight - headerHeight,
      },
      colors: {
        fill: '#FFFFFF',
        stroke: colors.neutral.gray600,
      },
    });

    await insertTextBox(
      { x: beforeX + 10, y: startPos.y + headerHeight + 10 },
      { width: boxWidth - 20, height: boxHeight - headerHeight - 20 },
      '現状の説明',
      {
        fontSize: 12,
        fontFamily: 'Yu Gothic',
        color: colors.neutral.gray600,
      }
    );

    // After ヘッダー
    await insertRectangle({
      rect: {
        x: afterX,
        y: startPos.y,
        width: boxWidth,
        height: headerHeight,
      },
      colors: {
        fill: '#4CAF50', // 緑系で改善を示す
      },
    });

    await insertTextBox(
      { x: afterX + 10, y: startPos.y + 5 },
      { width: boxWidth - 20, height: headerHeight - 10 },
      'After',
      {
        fontSize: 16,
        fontFamily: 'Yu Gothic',
        color: '#FFFFFF',
        bold: true,
      }
    );

    // After コンテンツエリア
    await insertRectangle({
      rect: {
        x: afterX,
        y: startPos.y + headerHeight,
        width: boxWidth,
        height: boxHeight - headerHeight,
      },
      colors: {
        fill: '#FFFFFF',
        stroke: colors.neutral.gray600,
      },
    });

    await insertTextBox(
      { x: afterX + 10, y: startPos.y + headerHeight + 10 },
      { width: boxWidth - 20, height: boxHeight - headerHeight - 20 },
      '改善後の説明',
      {
        fontSize: 12,
        fontFamily: 'Yu Gothic',
        color: colors.neutral.gray600,
      }
    );

    // 中央に矢印を配置（直線 + 三角形）
    const triangleSize = 10;
    const arrowY = startPos.y + boxHeight / 2;
    const arrowStartX = beforeX + boxWidth + 15;
    const arrowEndX = afterX - 15 - triangleSize;

    // 直線
    const arrowOptions: LineOptions = {
      start: { x: arrowStartX, y: arrowY },
      end: { x: arrowEndX, y: arrowY },
      type: 'straight',
      color: colors.neutral.gray600,
      width: 2,
    };
    await insertLine(arrowOptions);

    // 矢印の先端（三角形）
    await insertTriangle(
      { x: arrowEndX, y: arrowY },
      triangleSize,
      'right',
      colors.neutral.gray600
    );
  });
}

/**
 * As-Is/To-Be を挿入
 *
 * C2: 矢印付きの変革前後の対比
 * Before/Afterより戦略的な変革を示す
 */
export async function insertAsIsToBe(): Promise<void> {
  await runPowerPoint(async () => {
    const boxWidth = 260;
    const boxHeight = 190;
    const gap = 70;
    const headerHeight = 50;

    const totalWidth = boxWidth * 2 + gap;
    const startPos = getCenterPosition({
      width: totalWidth,
      height: boxHeight,
    });

    const asIsX = startPos.x;
    const toBeX = startPos.x + boxWidth + gap;

    // As-Is ヘッダー
    await insertRectangle({
      rect: {
        x: asIsX,
        y: startPos.y,
        width: boxWidth,
        height: headerHeight,
      },
      colors: {
        fill: '#FF9800', // オレンジ（課題を示す）
      },
    });

    await insertTextBox(
      { x: asIsX + 10, y: startPos.y + 5 },
      { width: boxWidth - 20, height: headerHeight - 10 },
      'As-Is（現状）',
      {
        fontSize: 16,
        fontFamily: 'Yu Gothic',
        color: '#FFFFFF',
        bold: true,
      }
    );

    // As-Is コンテンツ
    await insertRectangle({
      rect: {
        x: asIsX,
        y: startPos.y + headerHeight,
        width: boxWidth,
        height: boxHeight - headerHeight,
      },
      colors: {
        fill: '#FFF3E0', // 薄いオレンジ
      },
    });

    await insertTextBox(
      { x: asIsX + 10, y: startPos.y + headerHeight + 10 },
      { width: boxWidth - 20, height: boxHeight - headerHeight - 20 },
      '現状の課題・\n問題点を記載',
      {
        fontSize: 12,
        fontFamily: 'Yu Gothic',
        color: colors.neutral.gray600,
      }
    );

    // To-Be ヘッダー
    await insertRectangle({
      rect: {
        x: toBeX,
        y: startPos.y,
        width: boxWidth,
        height: headerHeight,
      },
      colors: {
        fill: '#2196F3', // 青（目標を示す）
      },
    });

    await insertTextBox(
      { x: toBeX + 10, y: startPos.y + 5 },
      { width: boxWidth - 20, height: headerHeight - 10 },
      'To-Be（目標）',
      {
        fontSize: 16,
        fontFamily: 'Yu Gothic',
        color: '#FFFFFF',
        bold: true,
      }
    );

    // To-Be コンテンツ
    await insertRectangle({
      rect: {
        x: toBeX,
        y: startPos.y + headerHeight,
        width: boxWidth,
        height: boxHeight - headerHeight,
      },
      colors: {
        fill: '#E3F2FD', // 薄い青
      },
    });

    await insertTextBox(
      { x: toBeX + 10, y: startPos.y + headerHeight + 10 },
      { width: boxWidth - 20, height: boxHeight - headerHeight - 20 },
      'あるべき姿・\n目指す状態を記載',
      {
        fontSize: 12,
        fontFamily: 'Yu Gothic',
        color: colors.neutral.gray600,
      }
    );

    // 変革を示す矢印（直線 + 三角形）
    const triangleSize = 12;
    const arrowY = startPos.y + boxHeight / 2;
    const arrowStartX = asIsX + boxWidth + 5;
    const arrowEndX = toBeX - 5 - triangleSize;

    // 直線
    const arrowOptions: LineOptions = {
      start: { x: arrowStartX, y: arrowY },
      end: { x: arrowEndX, y: arrowY },
      type: 'straight',
      color: colors.neutral.gray600,
      width: 2,
    };
    await insertLine(arrowOptions);

    // 矢印の先端（三角形）- グレーで統一
    await insertTriangle(
      { x: arrowEndX, y: arrowY },
      triangleSize,
      'right',
      colors.neutral.gray600
    );

    // 矢印の上に「変革」ラベル
    await insertTextBox(
      { x: asIsX + boxWidth + 10, y: arrowY - 30 },
      { width: gap - 20, height: 20 },
      '変革',
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
 * 比較表を挿入
 *
 * C3: 最大6×6の比較マトリクス
 * ヘッダー行・列付きの標準的な比較表
 */
export async function insertComparisonTable(): Promise<void> {
  await runPowerPoint(async () => {
    const rows = 4; // ヘッダー含む（3データ行+1ヘッダー行）
    const cols = 4; // 項目列含む（3比較列+1項目列）
    const cellWidth = 150;
    const cellHeight = 50;

    const tableWidth = cellWidth * cols;
    const tableHeight = cellHeight * rows;

    const position = getCenterPosition({
      width: tableWidth,
      height: tableHeight,
    });

    // ヘッダー行の背景
    await insertRectangle({
      rect: {
        x: position.x,
        y: position.y,
        width: tableWidth,
        height: cellHeight,
      },
      colors: {
        fill: colors.neutral.gray400,
      },
    });

    // 項目列の背景
    await insertRectangle({
      rect: {
        x: position.x,
        y: position.y + cellHeight,
        width: cellWidth,
        height: tableHeight - cellHeight,
      },
      colors: {
        fill: colors.neutral.gray200,
      },
    });

    // データエリアの背景
    await insertRectangle({
      rect: {
        x: position.x + cellWidth,
        y: position.y + cellHeight,
        width: tableWidth - cellWidth,
        height: tableHeight - cellHeight,
      },
      colors: {
        fill: '#FFFFFF',
        stroke: colors.neutral.gray600,
      },
    });

    // ヘッダーテキスト
    const headers = ['項目', '選択肢A', '選択肢B', '選択肢C'];
    for (let col = 0; col < cols; col++) {
      await insertTextBox(
        { x: position.x + col * cellWidth + 10, y: position.y + 5 },
        { width: cellWidth - 20, height: cellHeight - 10 },
        headers[col],
        {
          fontSize: 13,
          fontFamily: 'Yu Gothic',
          color: '#FFFFFF',
          bold: true,
        }
      );
    }

    // 項目列テキスト
    const items = ['機能', 'コスト', '期間'];
    for (let row = 0; row < rows - 1; row++) {
      await insertTextBox(
        { x: position.x + 10, y: position.y + (row + 1) * cellHeight + 5 },
        { width: cellWidth - 20, height: cellHeight - 10 },
        items[row],
        {
          fontSize: 12,
          fontFamily: 'Yu Gothic',
          color: colors.neutral.gray600,
          bold: true,
        }
      );
    }

    // グリッド線を描画
    // 縦線
    for (let col = 1; col < cols; col++) {
      const x = position.x + col * cellWidth;
      await insertLine({
        start: { x, y: position.y },
        end: { x, y: position.y + tableHeight },
        type: 'straight',
        color: colors.neutral.gray600,
        width: 1.5,
      });
    }

    // 横線
    for (let row = 1; row < rows; row++) {
      const y = position.y + row * cellHeight;
      await insertLine({
        start: { x: position.x, y },
        end: { x: position.x + tableWidth, y },
        type: 'straight',
        color: colors.neutral.gray600,
        width: 1.5,
      });
    }
  });
}

/**
 * KPIハイライトを挿入
 *
 * C4: 重要指標を強調表示
 * 大きな数値と説明文を含むカード形式
 */
export async function insertKPIHighlight(): Promise<void> {
  await runPowerPoint(async () => {
    const cardCount = 3;
    const cardWidth = 180;
    const cardHeight = 140;
    const gap = 40;

    const totalWidth = cardWidth * cardCount + gap * (cardCount - 1);
    const startPos = getCenterPosition({
      width: totalWidth,
      height: cardHeight,
    });

    const kpiData = [
      { value: '85%', label: '顧客満足度', color: '#4CAF50' },
      { value: '¥120M', label: '売上高', color: '#2196F3' },
      { value: '-15%', label: 'コスト削減', color: '#FF9800' },
    ];

    for (let i = 0; i < cardCount; i++) {
      const x = startPos.x + i * (cardWidth + gap);

      // カード背景
      await insertRectangle({
        rect: {
          x,
          y: startPos.y,
          width: cardWidth,
          height: cardHeight,
        },
        colors: {
          fill: '#FFFFFF',
          stroke: colors.neutral.gray600,
        },
      });

      // アクセント帯（上部）
      await insertRectangle({
        rect: {
          x,
          y: startPos.y,
          width: cardWidth,
          height: 8,
        },
        colors: {
          fill: kpiData[i].color,
        },
      });

      // 数値（大きく表示）
      await insertTextBox(
        { x, y: startPos.y + 25 },
        { width: cardWidth, height: 50 },
        kpiData[i].value,
        {
          fontSize: 32,
          fontFamily: 'Segoe UI',
          color: kpiData[i].color,
          bold: true,
        }
      );

      // ラベル（説明文）
      await insertTextBox(
        { x, y: startPos.y + 80 },
        { width: cardWidth, height: 30 },
        kpiData[i].label,
        {
          fontSize: 12,
          fontFamily: 'Yu Gothic',
          color: colors.neutral.gray600,
        }
      );
    }
  });
}

/**
 * Key Takeaway を挿入
 *
 * C5: まとめを目立たせるボックス
 * 左側にアイコン、右側にテキストエリアを配置
 */
export async function insertKeyTakeaway(): Promise<void> {
  await runPowerPoint(async () => {
    const boxWidth = 600;
    const boxHeight = 120;
    const iconSize = 70;
    const padding = 25;

    const position = getCenterPosition({
      width: boxWidth,
      height: boxHeight,
    });

    // 背景ボックス
    await insertRectangle({
      rect: {
        x: position.x,
        y: position.y,
        width: boxWidth,
        height: boxHeight,
      },
      colors: {
        fill: '#FFF9C4', // 薄い黄色（ハイライト）
      },
    });

    // 左側のアイコンエリア（電球マーク的な円）
    await insertEllipse({
      rect: {
        x: position.x + padding,
        y: position.y + (boxHeight - iconSize) / 2,
        width: iconSize,
        height: iconSize,
      },
      colors: {
        fill: '#FFC107',
      },
      text: '!',
      fontSize: 32,
      fontFamily: 'Segoe UI',
    });

    // ヘッダーテキスト
    await insertTextBox(
      {
        x: position.x + padding + iconSize + 15,
        y: position.y + padding,
      },
      { width: boxWidth - iconSize - padding * 2 - 15, height: 25 },
      'Key Takeaway',
      {
        fontSize: 14,
        fontFamily: 'Yu Gothic',
        color: '#F57C00',
        bold: true,
      }
    );

    // コンテンツテキスト
    await insertTextBox(
      {
        x: position.x + padding + iconSize + 15,
        y: position.y + padding + 30,
      },
      { width: boxWidth - iconSize - padding * 2 - 15, height: 45 },
      'ここに重要なポイント・まとめを記載',
      {
        fontSize: 12,
        fontFamily: 'Yu Gothic',
        color: colors.neutral.gray600,
      }
    );
  });
}
