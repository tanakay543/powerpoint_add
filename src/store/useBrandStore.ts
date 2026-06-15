import { create } from 'zustand';
import { BrandConfig, defaultBrandConfig } from '../brand';
import { applyBrandConfig } from '../styles/tokens';

/**
 * ブランド設定の状態管理
 */
interface BrandStore {
  /** 現在のブランド設定 */
  config: BrandConfig;
  /** ブランド設定を更新 */
  setConfig: (config: BrandConfig) => void;
  /** ブランド設定をリセット */
  resetConfig: () => void;
  /** 個別フィールドを更新 */
  updateConfig: (updates: Partial<BrandConfig>) => void;
}

/**
 * ブランド設定のグローバルストア
 *
 * 設定変更時にデザイントークンも自動更新される
 */
export const useBrandStore = create<BrandStore>((set) => ({
  config: defaultBrandConfig,

  setConfig: (config) => {
    applyBrandConfig(config); // デザイントークンに反映
    set({ config });
  },

  resetConfig: () => {
    applyBrandConfig(defaultBrandConfig); // デザイントークンをリセット
    set({ config: defaultBrandConfig });
  },

  updateConfig: (updates) =>
    set((state) => {
      const newConfig = { ...state.config, ...updates };
      applyBrandConfig(newConfig); // デザイントークンに反映
      return { config: newConfig };
    }),
}));
