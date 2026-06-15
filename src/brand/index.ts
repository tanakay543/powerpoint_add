/**
 * ブランド設定・カラー適用モジュール
 *
 * ブランドカラー（Primary/Secondary）とフォント設定を管理し、
 * 選択中のシェイプに適用する機能を提供する。
 */

export type { BrandConfig } from './types';
export { defaultBrandConfig } from './types';
export { loadBrand, saveBrand } from './storage';
export {
  applyPrimaryColor,
  applySecondaryColor,
  applyTextColor,
} from './apply';
