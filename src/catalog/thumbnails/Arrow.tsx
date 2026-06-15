/**
 * 矢印のサムネイル
 */

export const ArrowThumbnail = () => (
  <svg width="120" height="80" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
    {/* 背景 */}
    <rect width="120" height="80" fill="#F9F9F9" />

    {/* 矢印 */}
    <line x1="15" y1="40" x2="100" y2="40"
          stroke="#616161" strokeWidth="2" strokeLinecap="round"/>

    {/* 矢印の先端 */}
    <polygon points="100,40 92,36 92,44" fill="#616161"/>
  </svg>
);
