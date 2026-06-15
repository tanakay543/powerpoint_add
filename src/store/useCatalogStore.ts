import { create } from 'zustand';
import { Category } from '../catalog';

/**
 * カタログの状態管理
 */
interface CatalogStore {
  /** 選択中のカテゴリ */
  selectedCategory: Category | null;
  /** カテゴリを選択 */
  selectCategory: (category: Category | null) => void;
  /** 検索キーワード（将来実装） */
  searchQuery: string;
  /** 検索キーワードを設定 */
  setSearchQuery: (query: string) => void;
  /** 優先度フィルター */
  priorityFilter: string | null;
  /** 優先度フィルターを設定 */
  setPriorityFilter: (priority: string | null) => void;
}

/**
 * カタログのグローバルストア
 */
export const useCatalogStore = create<CatalogStore>((set) => ({
  selectedCategory: null,
  selectCategory: (category) => set({ selectedCategory: category }),

  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  priorityFilter: '★★★', // Phase 1 では ★★★ のみ
  setPriorityFilter: (priority) => set({ priorityFilter: priority }),
}));
