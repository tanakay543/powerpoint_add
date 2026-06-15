/**
 * PowerPoint API ユーティリティの型定義
 */

/**
 * 座標とサイズ
 */
export interface Position {
  /** X座標 (ポイント) */
  x: number;
  /** Y座標 (ポイント) */
  y: number;
}

export interface Size {
  /** 幅 (ポイント) */
  width: number;
  /** 高さ (ポイント) */
  height: number;
}

export interface Rect extends Position, Size {}

/**
 * 色指定（HEX形式）
 */
export interface ColorSpec {
  /** 塗りつぶし色 */
  fill?: string;
  /** 枠線色 */
  stroke?: string;
  /** テキスト色 */
  text?: string;
}

/**
 * 図形の基本プロパティ
 */
export interface ShapeOptions {
  /** 位置とサイズ */
  rect: Rect;
  /** 色指定 */
  colors?: ColorSpec;
  /** テキスト */
  text?: string;
  /** フォント名 */
  fontFamily?: string;
  /** フォントサイズ (pt) */
  fontSize?: number;
}

/**
 * 線の種類
 */
export type LineType = 'straight' | 'arrow';

/**
 * 線のオプション
 */
export interface LineOptions {
  /** 開始点 */
  start: Position;
  /** 終了点 */
  end: Position;
  /** 線の種類 */
  type?: LineType;
  /** 線の色 */
  color?: string;
  /** 線の太さ (pt) */
  width?: number;
}

/**
 * テーブルのオプション
 */
export interface TableOptions {
  /** 位置 */
  position: Position;
  /** 行数 */
  rows: number;
  /** 列数 */
  cols: number;
  /** セルのデフォルト幅 */
  cellWidth?: number;
  /** セルのデフォルト高さ */
  cellHeight?: number;
  /** ヘッダー行のテキスト */
  headers?: string[];
}

/**
 * PowerPoint.run のエラー
 */
export class PowerPointError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = 'PowerPointError';
  }
}
