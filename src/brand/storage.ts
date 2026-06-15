import { BrandConfig, defaultBrandConfig } from './types';
import { getItemWithDefault, setItem, STORAGE_KEYS } from '../storage';

/**
 * ブランド設定をストレージから読み込む
 *
 * ストレージにデータがない場合はデフォルト値を返す
 */
export async function loadBrand(): Promise<BrandConfig> {
  try {
    return await getItemWithDefault<BrandConfig>(
      STORAGE_KEYS.BRAND_CONFIG,
      defaultBrandConfig
    );
  } catch (error) {
    console.warn('Failed to load brand config, using default:', error);
    return defaultBrandConfig;
  }
}

/**
 * ブランド設定をストレージに保存する
 *
 * @throws {StorageError} 保存に失敗した場合
 */
export async function saveBrand(config: BrandConfig): Promise<void> {
  // バリデーション: HEX形式チェック
  const hexPattern = /^#[0-9A-Fa-f]{6}$/;
  if (!hexPattern.test(config.primary)) {
    throw new Error(`Invalid Primary color format: ${config.primary}`);
  }
  if (!hexPattern.test(config.secondary)) {
    throw new Error(`Invalid Secondary color format: ${config.secondary}`);
  }

  await setItem(STORAGE_KEYS.BRAND_CONFIG, config);
}
