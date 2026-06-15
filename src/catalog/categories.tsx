/**
 * カタログカテゴリの定義
 *
 * Fluent UI Icons を使用したアイコンのため、TSXファイルとして定義
 */

import {
  Flash24Regular,
  Shapes24Regular,
  TableSimple24Regular,
  CalendarLtr24Regular,
  LaptopSettings24Regular,
} from '@fluentui/react-icons';
import type { CategoryInfo } from './types';

/**
 * カテゴリ情報
 * アイコンはFluent UI Icons（24px Regular）で統一
 */
export const categories: CategoryInfo[] = [
  {
    id: 'quick',
    name: 'クイック挿入',
    icon: <Flash24Regular />,
    description: '直線、矢印、楕円などの基本図形',
  },
  {
    id: 'diagrams',
    name: '図解',
    icon: <Shapes24Regular />,
    description: '2×2マトリクス、プロセスフロー、リスクマップ等',
  },
  {
    id: 'frameworks',
    name: 'フレームワーク',
    icon: <TableSimple24Regular />,
    description: 'SWOT、3C、4P、5Forces等',
  },
  {
    id: 'compare',
    name: '比較・スケジュール',
    icon: <CalendarLtr24Regular />,
    description: 'Before/After、ロードマップ、ガントチャート等',
  },
  {
    id: 'it',
    name: 'IT特化',
    icon: <LaptopSettings24Regular />,
    description: 'システム構成図、WBS、RACI表等',
  },
];
