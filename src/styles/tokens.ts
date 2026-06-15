/**
 * デザイントークン定義
 *
 * UIと挿入オブジェクトの両方で使用する統一されたデザイン値
 * ブランド設定と連携し、一体感のあるビジュアルを実現
 */

import type { BrandConfig } from '../brand/types';
import { defaultBrandConfig } from '../brand/types';

/**
 * カラーパレット
 */
export const colors = {
  /**
   * ブランドカラー（ユーザー設定可能）
   * 実行時にBrandConfigから注入される
   */
  brand: {
    primary: defaultBrandConfig.primary, // #0078D4 (Microsoft Blue)
    secondary: defaultBrandConfig.secondary, // #50E6FF (Light Blue)
  },

  /**
   * ニュートラルカラー（グレースケール）
   * UI背景、枠線、テキストなどに使用
   */
  neutral: {
    white: '#FFFFFF',
    gray50: '#F9F9F9',
    gray100: '#F0F0F0',
    gray200: '#E0E0E0',
    gray300: '#C8C8C8',
    gray400: '#A0A0A0',
    gray500: '#808080',
    gray600: '#616161',
    gray700: '#424242',
    gray800: '#303030',
    gray900: '#1A1A1A',
    black: '#000000',
  },

  /**
   * セマンティックカラー
   * 状態表示（成功/エラー/警告/情報）に使用
   */
  semantic: {
    success: '#107C10', // 緑
    error: '#D13438', // 赤
    warning: '#FFB900', // オレンジ
    info: '#0078D4', // 青（Primaryと同じ）
  },

  /**
   * オブジェクト挿入用のアクセントカラー
   * リスクマップ、ガントチャートなどの色分けに使用
   */
  accent: {
    red: '#D13438',
    orange: '#FFB900',
    yellow: '#FFF100',
    green: '#107C10',
    teal: '#008272',
    blue: '#0078D4',
    purple: '#881798',
    magenta: '#E3008C',
  },
} as const;

/**
 * タイポグラフィ
 */
export const typography = {
  /**
   * フォントファミリー（ユーザー設定可能）
   * 実行時にBrandConfigから注入される
   */
  fontFamily: {
    ja: defaultBrandConfig.fontJa, // 和文: Yu Gothic
    en: defaultBrandConfig.fontEn, // 英文: Segoe UI
    code: 'Consolas, Monaco, "Courier New", monospace',
  },

  /**
   * フォントサイズ（pt）
   * UI要素とPowerPointオブジェクトの両方で使用
   */
  fontSize: {
    xs: 10, // 補足テキスト
    sm: 12, // 説明文、ラベル
    base: 14, // 標準テキスト
    md: 16, // 見出し小
    lg: 18, // 見出し中
    xl: 20, // 見出し大
    xxl: 24, // タイトル
    xxxl: 32, // 大きなタイトル
  },

  /**
   * フォントウェイト
   */
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  /**
   * 行高（line-height）
   */
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.8,
  },
} as const;

/**
 * スペーシング（px または pt）
 */
export const spacing = {
  /**
   * UI要素の間隔（px）
   */
  ui: {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    xxxl: 48,
  },

  /**
   * PowerPointオブジェクトの間隔（pt）
   */
  object: {
    cellGap: 10, // セル間の間隔
    labelMargin: 8, // ラベルとオブジェクトの間隔
    sectionGap: 20, // セクション間の間隔
  },
} as const;

/**
 * サイジング
 */
export const sizing = {
  /**
   * アイコンサイズ（px）
   */
  icon: {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
  },

  /**
   * ボーダー幅（px または pt）
   */
  border: {
    thin: 1,
    medium: 2,
    thick: 3,
  },

  /**
   * ボーダーラジウス（px）
   */
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999, // 完全な円形
  },

  /**
   * サムネイル画像サイズ（px）
   */
  thumbnail: {
    width: 120,
    height: 80,
  },
} as const;

/**
 * PowerPointオブジェクト固有の設定
 */
export const objectDefaults = {
  /**
   * 基本図形のデフォルトサイズ（pt）
   */
  shapes: {
    lineLength: 200, // 直線・矢印の長さ
    ellipseDiameter: 100, // 楕円の直径
    rectangleWidth: 160, // 矩形の幅
    rectangleHeight: 120, // 矩形の高さ
    cardDiameter: 80, // カードの円の直径
  },

  /**
   * マトリクス・テーブルの設定（pt）
   */
  matrix: {
    cellWidth: 160,
    cellHeight: 120,
    cellGap: 10,
    axisLabelWidth: 40,
    axisLabelHeight: 30,
  },

  /**
   * チャート・ダイアグラムの設定（pt）
   */
  chart: {
    barHeight: 20, // ガントチャートのバー高さ
    barGap: 5, // バー間の間隔
    processBoxWidth: 120, // プロセスフローのボックス幅
    processBoxHeight: 60, // プロセスフローのボックス高さ
    arrowGap: 20, // 矢印の間隔
  },

  /**
   * テーブルの設定
   */
  table: {
    defaultRows: 4,
    defaultColumns: 4,
    cellWidth: 100,
    cellHeight: 40,
    headerHeight: 50,
  },
} as const;

/**
 * PowerPointスライドの標準サイズ（pt）
 */
export const slideSize = {
  '16:9': {
    width: 960,
    height: 540,
  },
  '4:3': {
    width: 720,
    height: 540,
  },
} as const;

/**
 * マージン設定（pt）
 */
export const margins = {
  top: 50,
  bottom: 50,
  left: 50,
  right: 50,
} as const;

/**
 * ブランド設定を適用してトークンを更新
 *
 * アドイン起動時またはブランド設定変更時に呼び出す
 */
export function applyBrandConfig(config: BrandConfig): void {
  // カラーの更新
  (colors.brand as any).primary = config.primary;
  (colors.brand as any).secondary = config.secondary;

  // フォントの更新
  (typography.fontFamily as any).ja = config.fontJa;
  (typography.fontFamily as any).en = config.fontEn;
}

/**
 * 現在のブランドカラーを取得
 */
export function getBrandColors() {
  return {
    primary: colors.brand.primary,
    secondary: colors.brand.secondary,
  };
}

/**
 * 現在のブランドフォントを取得
 */
export function getBrandFonts() {
  return {
    ja: typography.fontFamily.ja,
    en: typography.fontFamily.en,
  };
}

/**
 * 使用頻度の高いカラーセットをエクスポート
 */
export const commonColors = {
  // テキスト色
  text: {
    primary: colors.neutral.gray900,
    secondary: colors.neutral.gray600,
    tertiary: colors.neutral.gray400,
    inverse: colors.neutral.white,
  },

  // 背景色
  background: {
    primary: colors.neutral.white,
    secondary: colors.neutral.gray50,
    tertiary: colors.neutral.gray100,
    inverse: colors.neutral.gray900,
  },

  // 枠線色
  border: {
    default: colors.neutral.gray300,
    subtle: colors.neutral.gray200,
    strong: colors.neutral.gray600,
  },
} as const;

/**
 * デザイントークン全体をエクスポート
 */
export const designTokens = {
  colors,
  typography,
  spacing,
  sizing,
  objectDefaults,
  slideSize,
  margins,
  commonColors,
} as const;

export default designTokens;
