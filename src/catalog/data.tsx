import type { CatalogObject } from './types';
import {
  insertStraightLine,
  insertArrow,
  insertGrayEllipse,
  insertCard,
  insert4x4Table,
  insertIconWithLabel,
  insert2x2Matrix,
  insertRiskMap,
  insertProcessFlow,
  insertBeforeAfter,
  insertAsIsToBe,
  insertComparisonTable,
  insertKPIHighlight,
  insertKeyTakeaway,
  insertRoadmap,
  insertGanttChart,
} from '../insertion';
import {
  Matrix2x2Thumbnail,
  RiskMapThumbnail,
  ProcessFlowThumbnail,
  StraightLineThumbnail,
  ArrowThumbnail,
  GanttChartThumbnail,
} from './thumbnails';

/**
 * Phase 1 で実装する ★★★ 優先度のオブジェクト（16個）
 */
export const catalogObjects: CatalogObject[] = [
  // クイック挿入カテゴリ (3個)
  {
    id: 'quick-line',
    name: '直線',
    category: 'quick',
    priority: '★★★',
    description: '水平な直線（グレー）',
    thumbnail: <StraightLineThumbnail />,
    insertHandler: insertStraightLine,
  },
  {
    id: 'quick-arrow',
    name: '矢印',
    category: 'quick',
    priority: '★★★',
    description: '右向きの矢印（グレー）',
    thumbnail: <ArrowThumbnail />,
    insertHandler: insertArrow,
  },
  {
    id: 'quick-ellipse',
    name: '楕円',
    category: 'quick',
    priority: '★★★',
    description: '円形の楕円（グレー）',
    insertHandler: insertGrayEllipse,
  },
  {
    id: 'quick-card',
    name: 'カード',
    category: 'quick',
    priority: '★★★',
    description: '円＋テキストラベル（グレー）',
    insertHandler: insertCard,
  },
  {
    id: 'quick-table',
    name: '4×4テーブル',
    category: 'quick',
    priority: '★★★',
    description: '4行4列の標準テーブル（罫線グレー）',
    insertHandler: insert4x4Table,
  },
  {
    id: 'quick-icon-label',
    name: 'アイコン＋ラベル',
    category: 'quick',
    priority: '★★★',
    description: '小さい円とテキストラベルの組み合わせ',
    insertHandler: insertIconWithLabel,
  },

  // 図解カテゴリ (3個)
  {
    id: 'a1-2x2-matrix',
    name: '2×2マトリクス',
    category: 'diagrams',
    priority: '★★★',
    description: '4象限に分類する基本的なマトリクス図',
    thumbnail: <Matrix2x2Thumbnail />,
    insertHandler: insert2x2Matrix,
  },
  {
    id: 'a3-risk-map',
    name: 'リスクマップ',
    category: 'diagrams',
    priority: '★★★',
    description: '影響度×発生確率でリスクを可視化',
    thumbnail: <RiskMapThumbnail />,
    insertHandler: insertRiskMap,
  },
  {
    id: 'a8-process-flow',
    name: 'プロセスフロー',
    category: 'diagrams',
    priority: '★★★',
    description: '矢羽連結でプロセスを表現',
    thumbnail: <ProcessFlowThumbnail />,
    insertHandler: insertProcessFlow,
  },

  // フレームワークカテゴリ (0個 - Phase 2)

  // 比較・スケジュールカテゴリ (7個)
  {
    id: 'c1-before-after',
    name: 'Before/After',
    category: 'compare',
    priority: '★★★',
    description: '変化を対比させる2カラム構成',
    insertHandler: insertBeforeAfter,
  },
  {
    id: 'c2-asis-tobe',
    name: 'As-Is/To-Be',
    category: 'compare',
    priority: '★★★',
    description: '矢印付きの変革前後の対比',
    insertHandler: insertAsIsToBe,
  },
  {
    id: 'c3-comparison-table',
    name: '比較表',
    category: 'compare',
    priority: '★★★',
    description: '最大6×6の比較マトリクス',
    insertHandler: insertComparisonTable,
  },
  {
    id: 'c4-kpi-highlight',
    name: 'KPIハイライト',
    category: 'compare',
    priority: '★★★',
    description: '重要指標を強調表示',
    insertHandler: insertKPIHighlight,
  },
  {
    id: 'c5-key-takeaway',
    name: 'Key Takeaway',
    category: 'compare',
    priority: '★★★',
    description: 'まとめを目立たせるボックス',
    insertHandler: insertKeyTakeaway,
  },
  {
    id: 'd1-roadmap',
    name: 'ロードマップ',
    category: 'compare',
    priority: '★★★',
    description: '時系列バーでマイルストーンを表示',
    insertHandler: insertRoadmap,
  },
  {
    id: 'd3-gantt-chart',
    name: 'ガントチャート',
    category: 'compare',
    priority: '★★★',
    description: '四半期/週次/日次の日付付きスケジュール',
    thumbnail: <GanttChartThumbnail />,
    insertHandler: insertGanttChart,
  },

  // IT特化カテゴリ (6個)
  {
    id: 'it1-system-architecture',
    name: 'システム構成図',
    category: 'it',
    priority: '★★★',
    description: '3階層のシステム構成',
  },
  {
    id: 'it2-layer-diagram',
    name: 'レイヤー図',
    category: 'it',
    priority: '★★★',
    description: 'アーキテクチャの階層構造',
  },
  {
    id: 'it3-data-flow',
    name: 'データフロー図',
    category: 'it',
    priority: '★★★',
    description: 'データの流れを可視化',
  },
  {
    id: 'it4-wbs',
    name: 'WBS',
    category: 'it',
    priority: '★★★',
    description: '作業分解構造の表形式',
  },
  {
    id: 'it5-raci',
    name: 'RACI表',
    category: 'it',
    priority: '★★★',
    description: '役割分担マトリクス',
  },
  {
    id: 'it6-issue-tracker',
    name: '課題管理表',
    category: 'it',
    priority: '★★★',
    description: '課題のステータス管理表',
  },
];

/**
 * カテゴリ別にオブジェクトを取得
 */
export function getObjectsByCategory(category: string, priorityFilter?: string) {
  return catalogObjects.filter(
    (obj) =>
      obj.category === category &&
      (!priorityFilter || obj.priority === priorityFilter)
  );
}
