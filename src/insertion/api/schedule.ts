/**
 * スケジュール系カテゴリの挿入関数
 *
 * ロードマップ、ガントチャート等
 * デザイントークンで統一されたグレーベースのデザイン
 */

import {
  insertRectangle,
  insertTextBox,
  getCenterPosition,
  runPowerPoint,
  insertLine,
  insertEllipse,
  SLIDE_SIZE,
} from '../../powerpoint';
import { colors } from '../../styles/tokens';

/**
 * ロードマップを挿入
 *
 * D1: 時系列バーでマイルストーンを表示
 * 4つのフェーズを横方向に配置
 */
export async function insertRoadmap(): Promise<void> {
  await runPowerPoint(async () => {
    const phaseCount = 4;
    const phaseWidth = 140;
    const phaseHeight = 80;
    const gap = 15;
    const timelineY = 50; // タイムラインの垂直位置

    const totalWidth = phaseWidth * phaseCount + gap * (phaseCount - 1);
    const startPos = getCenterPosition({
      width: totalWidth,
      height: phaseHeight + timelineY,
    });

    // タイムライン（横線）
    await insertLine({
      start: { x: startPos.x, y: startPos.y + timelineY },
      end: { x: startPos.x + totalWidth, y: startPos.y + timelineY },
      type: 'straight',
      color: colors.neutral.gray600,
      width: 2,
    });

    const phases = [
      { name: 'Phase 1', period: 'Q1 2026', color: '#4CAF50' },
      { name: 'Phase 2', period: 'Q2 2026', color: '#2196F3' },
      { name: 'Phase 3', period: 'Q3 2026', color: '#FF9800' },
      { name: 'Phase 4', period: 'Q4 2026', color: '#9C27B0' },
    ];

    for (let i = 0; i < phaseCount; i++) {
      const x = startPos.x + i * (phaseWidth + gap);

      // マイルストーンマーカー（タイムライン上の点）
      await insertEllipse({
        rect: {
          x: x + phaseWidth / 2 - 8,
          y: startPos.y + timelineY - 8,
          width: 16,
          height: 16,
        },
        colors: {
          fill: phases[i].color,
          stroke: colors.neutral.gray600,
        },
      });

      // フェーズボックス
      await insertRectangle({
        rect: {
          x,
          y: startPos.y + timelineY + 25,
          width: phaseWidth,
          height: phaseHeight,
        },
        colors: {
          fill: '#FFFFFF',
          stroke: colors.neutral.gray600,
        },
      });

      // フェーズ名
      await insertTextBox(
        { x, y: startPos.y + timelineY + 30 },
        { width: phaseWidth, height: 30 },
        phases[i].name,
        {
          fontSize: 14,
          fontFamily: 'Yu Gothic',
          color: phases[i].color,
          bold: true,
        }
      );

      // 期間
      await insertTextBox(
        { x, y: startPos.y + timelineY + 65 },
        { width: phaseWidth, height: 25 },
        phases[i].period,
        {
          fontSize: 11,
          fontFamily: 'Yu Gothic',
          color: colors.neutral.gray600,
        }
      );
    }
  });
}

export interface GanttChartParams {
  pattern: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  startDate: string;
  endDate: string;
  includeMilestones: boolean;
}

/**
 * 期間ラベルの構造化データ
 */
interface PeriodLabel {
  primary: string; // メインラベル（Q1, 6/2, 1月など）
  secondary?: string; // 第2行ラベル（2026年度, 2026年など）
  startDate?: Date; // この期間の開始日
}

/**
 * 日付範囲から期間ラベルを生成
 */
function generatePeriodLabels(
  startDate: string,
  endDate: string,
  pattern: GanttChartParams['pattern']
): PeriodLabel[] {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // 日付の妥当性チェック
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error(`無効な日付形式です: start=${startDate}, end=${endDate}`);
  }

  if (start > end) {
    throw new Error('開始日は終了日より前に設定してください');
  }

  const labels: PeriodLabel[] = [];

  if (pattern === 'quarterly') {
    // 四半期パターン: 年度（4月始まり）の下に四半期を表示
    const current = new Date(start);
    let currentFiscalYear = -1;

    while (current <= end && labels.length < 12) {
      // 会計年度計算（4月始まり）
      const month = current.getMonth();
      const fiscalYear =
        month >= 3 ? current.getFullYear() : current.getFullYear() - 1;

      // 四半期計算（4-6月=Q1, 7-9月=Q2, 10-12月=Q3, 1-3月=Q4）
      const quarter = Math.floor(((month + 9) % 12) / 3) + 1;

      labels.push({
        primary: `Q${quarter}`,
        // 年度が変わる最初の四半期のみ年度表示
        secondary:
          fiscalYear !== currentFiscalYear ? `${fiscalYear}年度` : undefined,
        startDate: new Date(current),
      });

      currentFiscalYear = fiscalYear;
      current.setMonth(current.getMonth() + 3);
    }
  } else if (pattern === 'weekly') {
    // 週次パターン: 月（2行目）と日付（1行目）を分けて表示
    const current = new Date(start);
    let currentMonth = -1;

    // 月曜日に調整
    const dayOfWeek = current.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    current.setDate(current.getDate() + mondayOffset);

    while (current <= end && labels.length < 12) {
      const month = current.getMonth();

      labels.push({
        primary: `${current.getDate()}`, // 日付のみ（例: "2", "9", "16"）
        // 月が変わる最初の週のみ月表示（例: "6月"）
        secondary: month !== currentMonth ? `${month + 1}月` : undefined,
        startDate: new Date(current),
      });

      currentMonth = month;
      current.setDate(current.getDate() + 7);
    }
  } else if (pattern === 'monthly') {
    // 月次パターン: 年が変わる最初の月のみ年表示
    const current = new Date(start);
    let currentYear = -1;

    while (current <= end && labels.length < 12) {
      const year = current.getFullYear();

      labels.push({
        primary: `${current.getMonth() + 1}月`,
        // 年が変わる最初の月のみ年表示
        secondary: year !== currentYear ? `${year}年` : undefined,
        startDate: new Date(current),
      });

      currentYear = year;
      current.setMonth(current.getMonth() + 1);
    }
  } else if (pattern === 'daily') {
    // 日次パターン: 月が変わる最初の日のみ月表示
    const current = new Date(start);
    let currentMonth = -1;

    while (current <= end && labels.length < 12) {
      const month = current.getMonth();

      labels.push({
        primary: `${current.getDate()}`,
        // 月が変わる最初の日のみ月表示
        secondary:
          month !== currentMonth ? `${current.getMonth() + 1}月` : undefined,
        startDate: new Date(current),
      });

      currentMonth = month;
      current.setDate(current.getDate() + 1);
    }
  }

  // 期間ラベルが生成されなかった場合のエラー
  if (labels.length === 0) {
    throw new Error('期間が短すぎるため、ガントチャートを生成できません');
  }

  // 12列を超える場合は警告（最大12列まで）
  if (labels.length >= 12) {
    console.warn(`期間が長すぎます。最大12列までしか表示されません（現在: ${labels.length}列）`);
  }

  return labels;
}

/**
 * ガントチャートを挿入
 *
 * D3: 四半期/週次/日次の日付付きスケジュール
 * タスクとその期間をバーで表示
 */
export async function insertGanttChart(
  params?: GanttChartParams
): Promise<void> {
  // デフォルトパラメータ
  const defaultParams: GanttChartParams = {
    pattern: 'monthly',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0], // 6ヶ月後
    includeMilestones: false,
  };

  const config = params || defaultParams;

  const taskCount = 4;
  const periodLabels = generatePeriodLabels(
    config.startDate,
    config.endDate,
    config.pattern
  );
  const periodCount = periodLabels.length;

  const rowHeight = 40;
  const milestoneCount = config.includeMilestones ? 1 : 0;

  // 2行ヘッダーが必要かチェック
  const hasSecondaryLabels = periodLabels.some(
    (label) => label.secondary !== undefined
  );
  const headerRows = hasSecondaryLabels ? 2 : 1;
  const headerHeight1 = hasSecondaryLabels ? rowHeight * 0.6 : rowHeight;
  const headerHeight2 = hasSecondaryLabels ? rowHeight * 0.9 : 0;
  const headerHeight = hasSecondaryLabels ? rowHeight * 1.5 : rowHeight;

  // 表のサイズ計算
  const totalRows = headerRows + taskCount + milestoneCount;
  const totalCols = 1 + periodCount; // タスク列 + 期間列

  // ガントチャート専用の余白設定（左右1.5cm = 約42.52pt）
  const GANTT_MARGIN = 42.52;

  // 利用可能な幅を計算
  const availableWidth = SLIDE_SIZE.WIDTH - (GANTT_MARGIN * 2);
  const labelWidth = 120;

  // 期間列の総幅を計算
  const totalPeriodWidth = availableWidth - labelWidth;

  // 各期間列の幅を計算（端数は最後の列で吸収）
  const baseCellWidth = totalPeriodWidth / periodCount;
  const periodColumnWidths = Array.from({ length: periodCount }, (_, index) => {
    if (index === periodCount - 1) {
      // 最後の列は残り幅で調整
      const usedWidth = baseCellWidth * (periodCount - 1);
      return totalPeriodWidth - usedWidth;
    }
    return baseCellWidth;
  });

  // チャートの高さを計算
  const chartHeight =
    (hasSecondaryLabels ? rowHeight * 1.5 : rowHeight) +
    rowHeight * (taskCount + milestoneCount);

  // 位置を設定（左右の余白を考慮、高さは中央配置）
  const position = {
    x: GANTT_MARGIN,
    y: (SLIDE_SIZE.HEIGHT - chartHeight) / 2,
  };

  // 期間列の左端座標を取得するヘルパー関数
  const getPeriodColumnLeft = (periodIndex: number): number => {
    return (
      position.x +
      labelWidth +
      periodColumnWidths
        .slice(0, periodIndex)
        .reduce((sum, width) => sum + width, 0)
    );
  };

  // 期間列の幅を取得するヘルパー関数
  const getPeriodColumnWidth = (periodIndex: number): number => {
    return periodColumnWidths[periodIndex];
  };

  try {
    await runPowerPoint(async (context) => {
    // スライドを取得
    const slide = context.presentation.getSelectedSlides();
    slide.load('items');
    await context.sync();

    const shapes = slide.items[0].shapes;

    // テーブルを作成（基本の白罫線1.5pt）
    const tableShape = shapes.addTable(totalRows, totalCols, {
      uniformCellProperties: {
        borders: {
          top: { color: '#FFFFFF', weight: 1.5, dashStyle: 'Solid' },
          bottom: { color: '#FFFFFF', weight: 1.5, dashStyle: 'Solid' },
          left: { color: '#FFFFFF', weight: 1.5, dashStyle: 'Solid' },
          right: { color: '#FFFFFF', weight: 1.5, dashStyle: 'Solid' },
        },
      },
    });
    tableShape.left = position.x;
    tableShape.top = position.y;
    // 高さのみ設定（幅は列幅で決まる）
    tableShape.height = chartHeight;

    await context.sync();

    // ShapeからTableオブジェクトを取得
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const table = (tableShape as any).getTable();
    table.load();
    await context.sync();

    // 列幅を調整（列幅の合計がavailableWidthになるように設定）
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const columns = (table as any).columns;
    columns.load('items');
    await context.sync();

    // 1列目: タスク名列
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const col0 = (columns as any).getItemAt(0);
    col0.width = labelWidth;

    // 2列目以降: 期間列（配列で定義した幅を設定）
    for (let i = 1; i <= periodCount; i++) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const col = (columns as any).getItemAt(i);
      col.width = periodColumnWidths[i - 1];
    }
    await context.sync();

    // ヘッダー行の高さを調整
    if (hasSecondaryLabels) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rows = (table as any).rows;
      rows.load('items');
      await context.sync();

      rows.getItemAt(0).height = headerHeight1;
      rows.getItemAt(1).height = headerHeight2;
      await context.sync();
    }

    // タスク名列ヘッダー
    const taskHeaderRow = hasSecondaryLabels ? 1 : 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const taskHeaderCell = (table as any).getCellOrNullObject(
      taskHeaderRow,
      0
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (taskHeaderCell as any).text = 'タスク';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (taskHeaderCell as any).fill.setSolidColor(colors.neutral.gray400);
    await context.sync();

    if (hasSecondaryLabels) {
      // 1行目のタスク列も同じ色に
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cell = (table as any).getCellOrNullObject(0, 0);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (cell as any).fill.setSolidColor(colors.neutral.gray400);
      await context.sync();
    }

    // 期間ヘッダー
    if (hasSecondaryLabels) {
      // 1行目: 年度/年/月（セルを結合）
      let lastSecondary: string | undefined;
      let startCol = 0;

      for (let i = 0; i <= periodCount; i++) {
        const label = i < periodCount ? periodLabels[i] : null;
        const currentSecondary = label?.secondary;

        // 年度/年が変わるか、最後の列に達したら設定
        if (
          i === periodCount ||
          (currentSecondary && currentSecondary !== lastSecondary)
        ) {
          if (lastSecondary && i > startCol) {
            const columnSpan = i - startCol; // この年度/年が占める列数

            // 最初のセルを取得してリサイズ（結合）
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const cell = (table as any).getCellOrNullObject(0, startCol + 1);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (cell as any).resize(1, columnSpan); // 1行 × columnSpan列に結合
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (cell as any).text = lastSecondary;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (cell as any).font.color = '#FFFFFF'; // 文字色を白に
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (cell as any).fill.setSolidColor(colors.neutral.gray400);
          }
          lastSecondary = currentSecondary;
          startCol = i;
        }
      }
      await context.sync();

      // 2行目: Q1, Q2, 日付など
      for (let i = 0; i < periodCount; i++) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const cell = (table as any).getCellOrNullObject(1, i + 1);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (cell as any).text = periodLabels[i].primary;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (cell as any).font.color = '#FFFFFF'; // 文字色を白に
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (cell as any).fill.setSolidColor(colors.neutral.gray400);
      }
      await context.sync();
    } else {
      // 単一行ヘッダー
      for (let i = 0; i < periodCount; i++) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const cell = (table as any).getCellOrNullObject(0, i + 1);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (cell as any).text = periodLabels[i].primary;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (cell as any).font.color = '#FFFFFF'; // 文字色を白に
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (cell as any).fill.setSolidColor(colors.neutral.gray400);
      }
      await context.sync();
    }

    // マイルストーン行（ヘッダー直下に配置）
    const milestoneRowOffset = config.includeMilestones ? 1 : 0;
    if (config.includeMilestones) {
      const rowIndex = headerRows;

      // マイルストーンラベル（絵文字なし、グレー色）
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const milestoneCell = (table as any).getCellOrNullObject(rowIndex, 0);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (milestoneCell as any).text = 'マイルストーン';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (milestoneCell as any).fill.setSolidColor(colors.neutral.gray300);

      // 期間セルの背景（グレー）
      for (let col = 0; col < periodCount; col++) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const cell = (table as any).getCellOrNullObject(rowIndex, col + 1);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (cell as any).fill.setSolidColor(colors.neutral.gray100);
      }
      await context.sync();

      // サンプルマイルストーン（中間地点）
      const milestonePos = Math.floor(periodCount / 2);

      // マイルストーンマーカーの絶対位置を計算
      const milestoneColumnLeft = getPeriodColumnLeft(milestonePos);
      const milestoneColumnWidth = getPeriodColumnWidth(milestonePos);
      const markerLeft = milestoneColumnLeft + milestoneColumnWidth / 2 - 8;
      const markerTop = position.y + headerHeight + rowHeight / 2 - 8;

      // 上向き三角形のマーカーを挿入（グレー）
      const marker = shapes.addGeometricShape(
        PowerPoint.GeometricShapeType.triangle
      );
      marker.left = markerLeft;
      marker.top = markerTop;
      marker.width = 16;
      marker.height = 16;
      marker.fill.setSolidColor(colors.neutral.gray500);
      marker.lineFormat.visible = false; // 線を非表示

      // マイルストーン名のテキストボックス（マーカーの右側に配置）
      const textBoxLeft = markerLeft + 16 + 5; // マーカーの右側に5pt余白
      const textBoxTop = markerTop - 2; // 垂直方向の中央揃えのため少し上に
      const textBoxWidth = 150;
      const textBoxHeight = 20;

      const textBox = shapes.addTextBox('ここにマイルストーン名を追加');
      textBox.left = textBoxLeft;
      textBox.top = textBoxTop;
      textBox.width = textBoxWidth;
      textBox.height = textBoxHeight;

      // テキストの書式設定
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const textFrame = (textBox as any).textFrame;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const textRange = (textFrame as any).textRange;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (textRange as any).font.size = 10;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (textRange as any).font.name = 'Yu Gothic';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (textRange as any).font.color = colors.neutral.gray600;

      await context.sync();
    }

    // タスク行（期間列全体に均等に配置）
    const taskWidths = Array.from({ length: taskCount }, (_, i) => {
      const baseWidth = Math.floor(periodCount / taskCount);
      const remainder = periodCount % taskCount;
      return baseWidth + (i < remainder ? 1 : 0);
    });

    let taskStartCol = 0;
    const tasks = [
      { name: '要件定義', start: taskStartCol, duration: taskWidths[0], color: '#4CAF50' },
      { name: '設計', start: (taskStartCol += taskWidths[0]), duration: taskWidths[1], color: '#2196F3' },
      { name: '開発', start: (taskStartCol += taskWidths[1]), duration: taskWidths[2], color: '#FF9800' },
      { name: 'テスト', start: (taskStartCol += taskWidths[2]), duration: taskWidths[3], color: '#9C27B0' },
    ];

    for (let i = 0; i < taskCount; i++) {
      const rowIndex = headerRows + milestoneRowOffset + i;

      // タスク名
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const taskCell = (table as any).getCellOrNullObject(rowIndex, 0);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (taskCell as any).text = tasks[i].name;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (taskCell as any).fill.setSolidColor(colors.neutral.gray200);

      // 期間セルの背景を薄いグレーに
      for (let col = 0; col < periodCount; col++) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const cell = (table as any).getCellOrNullObject(rowIndex, col + 1);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (cell as any).fill.setSolidColor(colors.neutral.gray100);
      }
    }
    await context.sync();

    // タスクバーを挿入（表の外に図形として配置）
    for (let i = 0; i < taskCount; i++) {
      const barStartCol = tasks[i].start;
      const barHeight = rowHeight - 16;

      // タスクバーの絶対位置を計算（マイルストーン行を考慮）
      const barLeft = getPeriodColumnLeft(barStartCol) + 5;
      const barWidth =
        periodColumnWidths
          .slice(barStartCol, barStartCol + tasks[i].duration)
          .reduce((sum, width) => sum + width, 0) - 10;
      const barTop = position.y + headerHeight + milestoneRowOffset * rowHeight + i * rowHeight + 8;

      // ホームベース型のブロック矢印を挿入
      const barShape = shapes.addGeometricShape(
        PowerPoint.GeometricShapeType.homePlate
      );
      barShape.left = barLeft;
      barShape.top = barTop;
      barShape.width = barWidth;
      barShape.height = barHeight;
      barShape.fill.setSolidColor(colors.neutral.gray400);
      barShape.lineFormat.visible = false; // 線を非表示
    }
    await context.sync();
    });
  } catch (error) {
    console.error('ガントチャート挿入エラー:', error);
    if (error instanceof Error) {
      console.error('エラーメッセージ:', error.message);
      console.error('エラースタック:', error.stack);
    }
    throw error;
  }
}
