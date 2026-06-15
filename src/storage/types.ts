/**
 * ストレージキーの定義
 */
export const STORAGE_KEYS = {
  BRAND_CONFIG: 'brand_config',
  USER_PREFERENCES: 'user_preferences',
  RECENT_OBJECTS: 'recent_objects',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

/**
 * ストレージエラー
 */
export class StorageError extends Error {
  constructor(
    message: string,
    public readonly key: string,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = 'StorageError';
  }
}
