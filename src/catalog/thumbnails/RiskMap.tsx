/**
 * リスクマップのサムネイル
 */

export const RiskMapThumbnail = () => (
  <svg width="120" height="80" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
    {/* 背景 */}
    <rect width="120" height="80" fill="#F9F9F9" />

    {/* 4つのセル（色分け） */}
    {/* 左下 - 低リスク */}
    <rect x="20" y="45" width="40" height="25"
          fill="#E0E0E0" stroke="#616161" strokeWidth="1.5"/>
    {/* 右下 - 中リスク */}
    <rect x="65" y="45" width="40" height="25"
          fill="#C8C8C8" stroke="#616161" strokeWidth="1.5"/>
    {/* 左上 - 中リスク */}
    <rect x="20" y="15" width="40" height="25"
          fill="#C8C8C8" stroke="#616161" strokeWidth="1.5"/>
    {/* 右上 - 高リスク */}
    <rect x="65" y="15" width="40" height="25"
          fill="#A0A0A0" stroke="#616161" strokeWidth="1.5"/>

    {/* ラベル */}
    <text x="40" y="60" fontSize="9" fill="#616161" textAnchor="middle" fontFamily="sans-serif">低</text>
    <text x="85" y="60" fontSize="9" fill="#616161" textAnchor="middle" fontFamily="sans-serif">中</text>
    <text x="40" y="30" fontSize="9" fill="#616161" textAnchor="middle" fontFamily="sans-serif">中</text>
    <text x="85" y="30" fontSize="9" fill="#FFFFFF" textAnchor="middle" fontFamily="sans-serif">高</text>

    {/* 軸ラベル */}
    <text x="10" y="30" fontSize="8" fill="#616161" fontFamily="sans-serif">影</text>
    <text x="10" y="40" fontSize="8" fill="#616161" fontFamily="sans-serif">響</text>
    <text x="60" y="77" fontSize="8" fill="#616161" textAnchor="middle" fontFamily="sans-serif">発生確率</text>
  </svg>
);
