/**
 * ブランド設定の型定義
 */
export interface BrandConfig {
  /** プライマリカラー (HEX形式: #RRGGBB) */
  primary: string;
  /** セカンダリカラー (HEX形式: #RRGGBB) */
  secondary: string;
  /** 和文フォント名 */
  fontJa: string;
  /** 英文フォント名 */
  fontEn: string;
}

/**
 * デフォルトブランド設定
 */
export const defaultBrandConfig: BrandConfig = {
  primary: '#0078D4',
  secondary: '#50E6FF',
  fontJa: 'Yu Gothic',
  fontEn: 'Segoe UI',
};
