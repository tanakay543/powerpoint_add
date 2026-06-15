import { runPowerPoint } from './runner';
import type {
  ShapeOptions,
  LineOptions,
  TableOptions,
  Position,
  Size,
} from './types';

/* global PowerPoint */

/**
 * アクティブなスライドを取得
 *
 * PowerPoint API には直接 "現在選択中のスライド" を取得する方法がないため、
 * getSelectedSlides() で選択中のスライドを取得する
 */
async function getActiveSlideInContext(
  context: PowerPoint.RequestContext
): Promise<PowerPoint.Slide> {
  const presentation = context.presentation;

  // 選択中のスライドを取得
  const selectedSlides = presentation.getSelectedSlides();
  selectedSlides.load('items');
  await context.sync();

  // 選択中のスライドがあればそれを返す
  if (selectedSlides.items.length > 0) {
    return selectedSlides.items[0];
  }

  // 選択中がなければ最初のスライドを返す（フォールバック）
  const slides = presentation.slides;
  slides.load('items');
  await context.sync();

  return slides.getItemAt(0);
}

/**
 * 矩形を挿入
 */
export async function insertRectangle(
  options: ShapeOptions
): Promise<PowerPoint.Shape> {
  return runPowerPoint(async (context) => {
    const slide = await getActiveSlideInContext(context);
    const shapes = slide.shapes;

    const shape = shapes.addGeometricShape(
      PowerPoint.GeometricShapeType.rectangle
    );
    shape.left = options.rect.x;
    shape.top = options.rect.y;
    shape.width = options.rect.width;
    shape.height = options.rect.height;

    // 色設定
    if (options.colors?.fill) {
      shape.fill.setSolidColor(options.colors.fill);
    }
    if (options.colors?.stroke) {
      shape.lineFormat.color = options.colors.stroke;
    } else {
      // strokeが指定されていない場合は枠線を非表示
      shape.lineFormat.visible = false;
    }

    // テキスト設定
    if (options.text) {
      const textFrame = shape.textFrame;
      textFrame.textRange.text = options.text;

      if (options.colors?.text) {
        textFrame.textRange.font.color = options.colors.text;
      }
      if (options.fontFamily) {
        textFrame.textRange.font.name = options.fontFamily;
      }
      if (options.fontSize) {
        textFrame.textRange.font.size = options.fontSize;
      }

      // 中央揃え
      textFrame.verticalAlignment = PowerPoint.TextVerticalAlignment.middle;
    }

    await context.sync();
    return shape;
  });
}

/**
 * 楕円を挿入
 */
export async function insertEllipse(
  options: ShapeOptions
): Promise<PowerPoint.Shape> {
  return runPowerPoint(async (context) => {
    const slide = await getActiveSlideInContext(context);
    const shapes = slide.shapes;

    const shape = shapes.addGeometricShape(
      PowerPoint.GeometricShapeType.ellipse
    );
    shape.left = options.rect.x;
    shape.top = options.rect.y;
    shape.width = options.rect.width;
    shape.height = options.rect.height;

    // 色設定
    if (options.colors?.fill) {
      shape.fill.setSolidColor(options.colors.fill);
    }
    if (options.colors?.stroke) {
      shape.lineFormat.color = options.colors.stroke;
    } else {
      // strokeが指定されていない場合は枠線を非表示
      shape.lineFormat.visible = false;
    }

    // テキスト設定
    if (options.text) {
      const textFrame = shape.textFrame;
      textFrame.textRange.text = options.text;

      if (options.colors?.text) {
        textFrame.textRange.font.color = options.colors.text;
      }
      if (options.fontFamily) {
        textFrame.textRange.font.name = options.fontFamily;
      }
      if (options.fontSize) {
        textFrame.textRange.font.size = options.fontSize;
      }

      textFrame.verticalAlignment = PowerPoint.TextVerticalAlignment.middle;
    }

    await context.sync();
    return shape;
  });
}

/**
 * 三角形を挿入（矢印の先端として使用）
 *
 * @param position 三角形の基準位置（先端の位置）
 * @param size 三角形のサイズ（一辺の長さ）
 * @param direction 三角形の向き ('right', 'left', 'up', 'down')
 * @param color 三角形の色
 */
export async function insertTriangle(
  position: Position,
  size: number,
  direction: 'right' | 'left' | 'up' | 'down',
  color: string
): Promise<PowerPoint.Shape> {
  return runPowerPoint(async (context) => {
    const slide = await getActiveSlideInContext(context);
    const shapes = slide.shapes;

    const shape = shapes.addGeometricShape(
      PowerPoint.GeometricShapeType.rightTriangle
    );

    // 向きに応じて位置とサイズを調整
    switch (direction) {
      case 'right':
        shape.left = position.x;
        shape.top = position.y - size / 2;
        shape.width = size;
        shape.height = size;
        shape.rotation = 0;
        break;
      case 'left':
        shape.left = position.x - size;
        shape.top = position.y - size / 2;
        shape.width = size;
        shape.height = size;
        shape.rotation = 180;
        break;
      case 'up':
        shape.left = position.x - size / 2;
        shape.top = position.y - size;
        shape.width = size;
        shape.height = size;
        shape.rotation = -90;
        break;
      case 'down':
        shape.left = position.x - size / 2;
        shape.top = position.y;
        shape.width = size;
        shape.height = size;
        shape.rotation = 90;
        break;
    }

    // 色設定（塗りつぶしのみ、枠線なし）
    shape.fill.setSolidColor(color);
    shape.lineFormat.visible = false;

    await context.sync();
    return shape;
  });
}

/**
 * 線を挿入
 *
 * 矢印の場合は GeometricShape の rightArrow を使用
 * 直線の場合は Connector を使用
 */
export async function insertLine(
  options: LineOptions
): Promise<PowerPoint.Shape> {
  return runPowerPoint(async (context) => {
    const slide = await getActiveSlideInContext(context);
    const shapes = slide.shapes;

    let shape: PowerPoint.Shape;

    // 矢印の場合は幾何学図形の矢印を使用
    if (options.type === 'arrow') {
      shape = shapes.addGeometricShape(
        PowerPoint.GeometricShapeType.rightArrow
      );

      // 矢印の位置とサイズ
      const dx = options.end.x - options.start.x;
      const dy = options.end.y - options.start.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      shape.left = options.start.x;
      shape.top = options.start.y - 10; // 矢印の高さの半分だけ上にオフセット
      shape.width = length;
      shape.height = 20; // 矢印の太さ
      shape.rotation = angle;

      // 色設定
      if (options.color) {
        shape.fill.setSolidColor(options.color);
        shape.lineFormat.color = options.color;
      }
    } else {
      // 直線の場合
      shape = shapes.addLine(PowerPoint.ConnectorType.straight);

      // 位置とサイズを設定
      shape.left = options.start.x;
      shape.top = options.start.y;
      shape.width = options.end.x - options.start.x;
      shape.height = options.end.y - options.start.y;

      // 色設定
      if (options.color) {
        try {
          shape.lineFormat.color = options.color;
        } catch {
          // API制限により設定できない場合はスキップ
        }
      }

      // 太さ設定
      if (options.width) {
        try {
          shape.lineFormat.weight = options.width;
        } catch {
          // API制限により設定できない場合はスキップ
        }
      }
    }

    await context.sync();
    return shape;
  });
}

/**
 * テキストボックスを挿入
 */
export async function insertTextBox(
  position: Position,
  size: Size,
  text: string,
  options?: {
    fontFamily?: string;
    fontSize?: number;
    color?: string;
    bold?: boolean;
  }
): Promise<PowerPoint.Shape> {
  return runPowerPoint(async (context) => {
    const slide = await getActiveSlideInContext(context);
    const shapes = slide.shapes;

    const textBox = shapes.addTextBox(text, {
      left: position.x,
      top: position.y,
      height: size.height,
      width: size.width,
    });

    const textFrame = textBox.textFrame;
    const textRange = textFrame.textRange;

    if (options?.fontFamily) {
      textRange.font.name = options.fontFamily;
    }
    if (options?.fontSize) {
      textRange.font.size = options.fontSize;
    }
    if (options?.color) {
      textRange.font.color = options.color;
    }
    if (options?.bold) {
      textRange.font.bold = true;
    }

    await context.sync();
    return textBox;
  });
}

/**
 * テーブルを挿入
 *
 * Note: PowerPoint API の addTable は行数と列数のみ指定可能
 * セルの内容は後で設定が必要（現行APIでは制限あり）
 */
export async function insertTable(
  options: TableOptions
): Promise<PowerPoint.Shape> {
  return runPowerPoint(async (context) => {
    const slide = await getActiveSlideInContext(context);
    const shapes = slide.shapes;

    // addTable は行数と列数のみ指定
    const table = shapes.addTable(options.rows, options.cols);

    // 位置とサイズを設定
    const cellWidth = options.cellWidth || 100;
    const cellHeight = options.cellHeight || 40;

    table.left = options.position.x;
    table.top = options.position.y;
    table.width = cellWidth * options.cols;
    table.height = cellHeight * options.rows;

    // Note: 現行の PowerPoint API ではセルへのアクセスが制限されており
    // ヘッダーテキストの設定は後で手動設定が必要

    await context.sync();
    return table;
  });
}

/**
 * テーブルのセルにテキストを設定
 */
export async function setTableCellText(
  tableShape: PowerPoint.Shape,
  rowIndex: number,
  colIndex: number,
  text: string,
  options?: {
    fontSize?: number;
    fontFamily?: string;
    color?: string;
    bold?: boolean;
    verticalAlignment?: PowerPoint.TextVerticalAlignment;
  }
): Promise<void> {
  return runPowerPoint(async (context) => {
    // ShapeからTableオブジェクトを取得
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const table = (tableShape as any).getTable();
    table.load();
    await context.sync();

    // セルを取得
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cell = (table as any).getCellOrNullObject(rowIndex, colIndex);

    // セルのテキストを設定
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (cell as any).text = text;

    // フォント設定（オプション）
    if (options?.fontSize || options?.fontFamily || options?.color || options?.bold) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const textFrame = (cell as any).textFrame;
      textFrame.load('textRange');
      await context.sync();

      if (options?.fontSize) {
        textFrame.textRange.font.size = options.fontSize;
      }
      if (options?.fontFamily) {
        textFrame.textRange.font.name = options.fontFamily;
      }
      if (options?.color) {
        textFrame.textRange.font.color = options.color;
      }
      if (options?.bold) {
        textFrame.textRange.font.bold = true;
      }
    }

    await context.sync();
  });
}

/**
 * テーブルのセルの背景色を設定
 */
export async function setTableCellFill(
  tableShape: PowerPoint.Shape,
  rowIndex: number,
  colIndex: number,
  color: string
): Promise<void> {
  return runPowerPoint(async (context) => {
    // ShapeからTableオブジェクトを取得
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const table = (tableShape as any).getTable();
    table.load();
    await context.sync();

    // セルを取得
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cell = (table as any).getCellOrNullObject(rowIndex, colIndex);

    // 背景色を設定
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (cell as any).fill.setSolidColor(color);

    await context.sync();
  });
}

/**
 * テーブルの行の高さを設定
 */
export async function setTableRowHeight(
  tableShape: PowerPoint.Shape,
  rowIndex: number,
  height: number
): Promise<void> {
  return runPowerPoint(async (context) => {
    // ShapeからTableオブジェクトを取得
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const table = (tableShape as any).getTable();
    table.load('rows');
    await context.sync();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const row = (table as any).rows.getItemAt(rowIndex);
    row.height = height;

    await context.sync();
  });
}

/**
 * テーブルのセル内に図形を挿入（タスクバー用）
 *
 * TableCellには位置プロパティがないため、表全体の位置と列幅・行高さから計算
 */
export async function insertShapeInTableCell(
  tableShape: PowerPoint.Shape,
  rowIndex: number,
  colIndex: number,
  shapeType: PowerPoint.GeometricShapeType,
  options: {
    offsetX?: number;
    offsetY?: number;
    width: number;
    height: number;
    fill?: string;
    stroke?: string;
    cellWidth: number;  // セルの幅
    cellHeight: number; // セルの高さ
  }
): Promise<PowerPoint.Shape> {
  return runPowerPoint(async (context) => {
    const slide = await getActiveSlideInContext(context);
    const shapes = slide.shapes;

    // テーブルの位置を取得
    tableShape.load('left,top');
    await context.sync();

    // セルの位置を計算（表の左上を基準に）
    const cellLeft = tableShape.left + colIndex * options.cellWidth;
    const cellTop = tableShape.top + rowIndex * options.cellHeight;

    // 図形を作成
    const shape = shapes.addGeometricShape(shapeType);
    shape.left = cellLeft + (options.offsetX || 0);
    shape.top = cellTop + (options.offsetY || 0);
    shape.width = options.width;
    shape.height = options.height;

    if (options.fill) {
      shape.fill.setSolidColor(options.fill);
    }
    if (options.stroke) {
      shape.lineFormat.color = options.stroke;
    }

    await context.sync();
    return shape;
  });
}

/**
 * 図形をグループ化
 *
 * Note: 現行の PowerPoint API ではグループ化機能が制限されています
 * この関数は将来の API 拡張に備えた実装です
 */
export async function groupShapes(
  shapeIds: string[]
): Promise<PowerPoint.Shape> {
  return runPowerPoint(async (context) => {
    const slide = await getActiveSlideInContext(context);
    const shapes = slide.shapes;
    shapes.load('items');
    await context.sync();

    const shapesToGroup: PowerPoint.Shape[] = [];
    shapeIds.forEach((id) => {
      const shape = shapes.getItem(id);
      shapesToGroup.push(shape);
    });

    // Note: addGroup は現行APIでサポートされていない可能性があります
    // 代わりに個別の図形として管理することを推奨
    const group = shapes.addGroup(shapesToGroup);
    await context.sync();

    return group;
  });
}
