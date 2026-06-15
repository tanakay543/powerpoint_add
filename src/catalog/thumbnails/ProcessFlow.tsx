/**
 * プロセスフローのサムネイル
 */

export const ProcessFlowThumbnail = () => (
  <svg width="120" height="80" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
    {/* 背景 */}
    <rect width="120" height="80" fill="#F9F9F9" />

    {/* 4つのステップ（グラデーション） */}
    {/* ステップ1 */}
    <rect x="5" y="25" width="22" height="30"
          fill="#C8C8C8" stroke="#616161" strokeWidth="1.2"/>
    <text x="16" y="43" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontFamily="sans-serif">1</text>

    {/* 矢印1 */}
    <path d="M 27 40 L 32 40" stroke="#616161" strokeWidth="1.5" fill="none"/>
    <polygon points="32,40 29,38 29,42" fill="#616161"/>

    {/* ステップ2 */}
    <rect x="34" y="25" width="22" height="30"
          fill="#A0A0A0" stroke="#616161" strokeWidth="1.2"/>
    <text x="45" y="43" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontFamily="sans-serif">2</text>

    {/* 矢印2 */}
    <path d="M 56 40 L 61 40" stroke="#616161" strokeWidth="1.5" fill="none"/>
    <polygon points="61,40 58,38 58,42" fill="#616161"/>

    {/* ステップ3 */}
    <rect x="63" y="25" width="22" height="30"
          fill="#808080" stroke="#616161" strokeWidth="1.2"/>
    <text x="74" y="43" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontFamily="sans-serif">3</text>

    {/* 矢印3 */}
    <path d="M 85 40 L 90 40" stroke="#616161" strokeWidth="1.5" fill="none"/>
    <polygon points="90,40 87,38 87,42" fill="#616161"/>

    {/* ステップ4 */}
    <rect x="92" y="25" width="22" height="30"
          fill="#616161" stroke="#616161" strokeWidth="1.2"/>
    <text x="103" y="43" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontFamily="sans-serif">4</text>
  </svg>
);
