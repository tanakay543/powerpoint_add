import { StorageKey, StorageError } from './types';

// OfficeRuntime の型定義
declare const OfficeRuntime: {
  storage: {
    getItem(key: string): Promise<string | null>;
    setItem(key: string, value: string): Promise<void>;
    removeItem(key: string): Promise<void>;
  };
};

/**
 * OfficeRuntime.storage が利用可能かチェック
 */
function isOfficeStorageAvailable(): boolean {
  return (
    typeof OfficeRuntime !== 'undefined' &&
    OfficeRuntime.storage !== undefined
  );
}

/**
 * フォールバック用のlocalStorage実装
 * 開発時やOffice環境外でのテスト用
 */
const localStorageFallback = {
  async getItem(key: string): Promise<string | null> {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },

  async setItem(key: string, value: string): Promise<void> {
    localStorage.setItem(key, value);
  },

  async removeItem(key: string): Promise<void> {
    localStorage.removeItem(key);
  },
};

/**
 * 使用するストレージを取得
 */
function getStorage() {
  return isOfficeStorageAvailable()
    ? OfficeRuntime.storage
    : localStorageFallback;
}

/**
 * ストレージからデータを読み込む
 */
export async function getItem<T>(key: StorageKey): Promise<T | null> {
  try {
    const storage = getStorage();
    const value = await storage.getItem(key);

    if (!value) {
      return null;
    }

    return JSON.parse(value) as T;
  } catch (error) {
    console.warn(`Failed to get item from storage: ${key}`, error);
    throw new StorageError(`Failed to get item: ${key}`, key, error);
  }
}

/**
 * ストレージにデータを保存する
 */
export async function setItem<T>(key: StorageKey, value: T): Promise<void> {
  try {
    const storage = getStorage();
    const serialized = JSON.stringify(value);
    await storage.setItem(key, serialized);
  } catch (error) {
    console.error(`Failed to set item in storage: ${key}`, error);
    throw new StorageError(`Failed to set item: ${key}`, key, error);
  }
}

/**
 * ストレージからデータを削除する
 */
export async function removeItem(key: StorageKey): Promise<void> {
  try {
    const storage = getStorage();
    await storage.removeItem(key);
  } catch (error) {
    console.error(`Failed to remove item from storage: ${key}`, error);
    throw new StorageError(`Failed to remove item: ${key}`, key, error);
  }
}

/**
 * デフォルト値付きでデータを読み込む
 */
export async function getItemWithDefault<T>(
  key: StorageKey,
  defaultValue: T
): Promise<T> {
  const value = await getItem<T>(key);
  return value !== null ? value : defaultValue;
}

/**
 * ストレージが利用可能かチェック
 */
export function isStorageAvailable(): boolean {
  return isOfficeStorageAvailable() || typeof localStorage !== 'undefined';
}
