import type { Position, Size, Rect } from './types';

/**
 * PowerPoint 座標計算ユーティリティ
 *
 * PowerPoint の座標系は左上が原点 (0, 0)
 * 単位はポイント (1 inch = 72 points)
 */

/**
 * スライドのデフォルトサイズ (16:9, 単位: ポイント)
 */
export const SLIDE_SIZE = {
  WIDTH: 960, // 13.333 inches
  HEIGHT: 540, // 7.5 inches
} as const;

/**
 * よく使う余白
 */
export const MARGINS = {
  SMALL: 20,
  MEDIUM: 40,
  LARGE: 60,
} as const;

/**
 * スライド中央の座標を計算
 */
export function getCenterPosition(size: Size): Position {
  return {
    x: (SLIDE_SIZE.WIDTH - size.width) / 2,
    y: (SLIDE_SIZE.HEIGHT - size.height) / 2,
  };
}

/**
 * グリッド配置の座標を計算
 *
 * @param rows 行数
 * @param cols 列数
 * @param cellSize セルサイズ
 * @param margin セル間の余白
 * @param offset 開始位置のオフセット
 */
export function getGridPositions(
  rows: number,
  cols: number,
  cellSize: Size,
  margin: number = 10,
  offset: Position = { x: MARGINS.MEDIUM, y: MARGINS.MEDIUM }
): Rect[] {
  const positions: Rect[] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      positions.push({
        x: offset.x + col * (cellSize.width + margin),
        y: offset.y + row * (cellSize.height + margin),
        width: cellSize.width,
        height: cellSize.height,
      });
    }
  }

  return positions;
}

/**
 * 等間隔配置の座標を計算（横方向）
 */
export function distributeHorizontally(
  count: number,
  itemWidth: number,
  totalWidth: number = SLIDE_SIZE.WIDTH,
  margin: number = MARGINS.MEDIUM
): Position[] {
  const availableWidth = totalWidth - 2 * margin;
  const spacing = (availableWidth - itemWidth * count) / (count - 1);

  return Array.from({ length: count }, (_, i) => ({
    x: margin + i * (itemWidth + spacing),
    y: 0, // Y座標は別途指定
  }));
}

/**
 * 等間隔配置の座標を計算（縦方向）
 */
export function distributeVertically(
  count: number,
  itemHeight: number,
  totalHeight: number = SLIDE_SIZE.HEIGHT,
  margin: number = MARGINS.MEDIUM
): Position[] {
  const availableHeight = totalHeight - 2 * margin;
  const spacing = (availableHeight - itemHeight * count) / (count - 1);

  return Array.from({ length: count }, (_, i) => ({
    x: 0, // X座標は別途指定
    y: margin + i * (itemHeight + spacing),
  }));
}

/**
 * 矩形の中心座標を取得
 */
export function getRectCenter(rect: Rect): Position {
  return {
    x: rect.x + rect.width / 2,
    y: rect.y + rect.height / 2,
  };
}

/**
 * 2点間の距離を計算
 */
export function getDistance(p1: Position, p2: Position): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * 2点間の角度を計算（ラジアン）
 */
export function getAngle(from: Position, to: Position): number {
  return Math.atan2(to.y - from.y, to.x - from.x);
}

/**
 * ポイントをピクセルに変換 (96 DPI 想定)
 */
export function pointsToPixels(points: number): number {
  return (points * 96) / 72;
}

/**
 * ピクセルをポイントに変換 (96 DPI 想定)
 */
export function pixelsToPoints(pixels: number): number {
  return (pixels * 72) / 96;
}
