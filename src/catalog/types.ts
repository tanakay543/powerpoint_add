import type { ReactNode } from 'react';

/**
 * カタログのカテゴリ
 */
export type Category = 'quick' | 'diagrams' | 'frameworks' | 'compare' | 'it';

/**
 * オブジェクトの優先度
 */
export type Priority = '★★★' | '★★☆' | '★☆☆';

/**
 * 挿入関数の型
 */
export type InsertionHandler = () => Promise<void>;

/**
 * カタログオブジェクトの定義
 */
export interface CatalogObject {
  /** オブジェクトID */
  id: string;
  /** 表示名 */
  name: string;
  /** カテゴリ */
  category: Category;
  /** 優先度 */
  priority: Priority;
  /** 説明 */
  description: string;
  /** サムネイル画像（SVGコンポーネントまたはReactNode） */
  thumbnail?: ReactNode;
  /** 挿入処理ハンドラ */
  insertHandler?: InsertionHandler;
}

/**
 * カテゴリ情報
 */
export interface CategoryInfo {
  id: Category;
  name: string;
  /** アイコン（Fluent UI Icon コンポーネントまたは文字列） */
  icon: ReactNode;
  description: string;
}
