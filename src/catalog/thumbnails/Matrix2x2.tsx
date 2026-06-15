/**
 * 2×2マトリクスのサムネイル
 */

export const Matrix2x2Thumbnail = () => (
  <svg width="120" height="80" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
    {/* 背景 */}
    <rect width="120" height="80" fill="#F9F9F9" />

    {/* 4つのセル */}
    {/* 左上 */}
    <rect x="15" y="10" width="45" height="30"
          fill="#FFFFFF" stroke="#616161" strokeWidth="1.5"/>
    {/* 右上 */}
    <rect x="65" y="10" width="45" height="30"
          fill="#FFFFFF" stroke="#616161" strokeWidth="1.5"/>
    {/* 左下 */}
    <rect x="15" y="45" width="45" height="30"
          fill="#FFFFFF" stroke="#616161" strokeWidth="1.5"/>
    {/* 右下 */}
    <rect x="65" y="45" width="45" height="30"
          fill="#FFFFFF" stroke="#616161" strokeWidth="1.5"/>

    {/* ラベル */}
    <text x="37.5" y="28" fontSize="12" fill="#616161" textAnchor="middle" fontFamily="sans-serif">2</text>
    <text x="87.5" y="28" fontSize="12" fill="#616161" textAnchor="middle" fontFamily="sans-serif">1</text>
    <text x="37.5" y="63" fontSize="12" fill="#616161" textAnchor="middle" fontFamily="sans-serif">3</text>
    <text x="87.5" y="63" fontSize="12" fill="#616161" textAnchor="middle" fontFamily="sans-serif">4</text>
  </svg>
);
