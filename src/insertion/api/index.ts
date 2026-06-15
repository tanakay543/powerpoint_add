/**
 * API ベースの図形挿入
 *
 * Office.js API を使用して動的に図形を生成・挿入
 */

export {
  insertStraightLine,
  insertArrow,
  insertGrayEllipse,
  insertDividerLine,
  insertCard,
  insert4x4Table,
  insertIconWithLabel,
} from './basicShapes';

export {
  insert2x2Matrix,
  insertRiskMap,
  insertProcessFlow,
} from './diagrams';

export {
  insertBeforeAfter,
  insertAsIsToBe,
  insertComparisonTable,
  insertKPIHighlight,
  insertKeyTakeaway,
} from './compare';

export { insertRoadmap, insertGanttChart } from './schedule';
