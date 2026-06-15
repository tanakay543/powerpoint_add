/**
 * PowerPoint API ユーティリティ
 *
 * Office.js PowerPoint API のラッパーとヘルパー関数を提供
 */

// Types
export type {
  Position,
  Size,
  Rect,
  ColorSpec,
  ShapeOptions,
  LineType,
  LineOptions,
  TableOptions,
} from './types';
export { PowerPointError } from './types';

// Runner
export {
  runPowerPoint,
  getActiveSlide,
  addNewSlide,
  getSelectedShapes,
} from './runner';

// Shapes
export {
  insertRectangle,
  insertEllipse,
  insertLine,
  insertTriangle,
  insertTextBox,
  insertTable,
  setTableCellText,
  setTableCellFill,
  setTableRowHeight,
  insertShapeInTableCell,
  groupShapes,
} from './shapes';

// Utils
export {
  SLIDE_SIZE,
  MARGINS,
  getCenterPosition,
  getGridPositions,
  distributeHorizontally,
  distributeVertically,
  getRectCenter,
  getDistance,
  getAngle,
  pointsToPixels,
  pixelsToPoints,
} from './utils';
