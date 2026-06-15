/**
 * ストレージ層
 *
 * OfficeRuntime.storage のラッパーで、型安全なストレージアクセスを提供
 * Office環境外ではlocalStorageにフォールバック
 */

export { STORAGE_KEYS, StorageError } from './types';
export type { StorageKey } from './types';
export {
  getItem,
  setItem,
  removeItem,
  getItemWithDefault,
  isStorageAvailable,
} from './officeStorage';
