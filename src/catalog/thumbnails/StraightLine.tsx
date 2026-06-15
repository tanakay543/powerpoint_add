/**
 * 直線のサムネイル
 */

export const StraightLineThumbnail = () => (
  <svg width="120" height="80" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
    {/* 背景 */}
    <rect width="120" height="80" fill="#F9F9F9" />

    {/* 水平線 */}
    <line x1="15" y1="40" x2="105" y2="40"
          stroke="#616161" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
