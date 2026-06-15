/**
 * ガントチャートのサムネイル
 */

export const GanttChartThumbnail = () => (
  <svg width="120" height="80" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
    {/* 背景 */}
    <rect width="120" height="80" fill="#F9F9F9" />

    {/* タスクバー */}
    {/* タスク1 */}
    <rect x="15" y="12" width="40" height="10"
          fill="#A0A0A0" stroke="#616161" strokeWidth="0.5"/>
    <text x="10" y="20" fontSize="7" fill="#616161" textAnchor="end" fontFamily="sans-serif">T1</text>

    {/* タスク2 */}
    <rect x="45" y="27" width="35" height="10"
          fill="#A0A0A0" stroke="#616161" strokeWidth="0.5"/>
    <text x="10" y="35" fontSize="7" fill="#616161" textAnchor="end" fontFamily="sans-serif">T2</text>

    {/* タスク3 */}
    <rect x="25" y="42" width="50" height="10"
          fill="#A0A0A0" stroke="#616161" strokeWidth="0.5"/>
    <text x="10" y="50" fontSize="7" fill="#616161" textAnchor="end" fontFamily="sans-serif">T3</text>

    {/* タスク4 */}
    <rect x="65" y="57" width="30" height="10"
          fill="#A0A0A0" stroke="#616161" strokeWidth="0.5"/>
    <text x="10" y="65" fontSize="7" fill="#616161" textAnchor="end" fontFamily="sans-serif">T4</text>

    {/* タイムライングリッド */}
    <line x1="15" y1="10" x2="15" y2="70" stroke="#E0E0E0" strokeWidth="0.5"/>
    <line x1="45" y1="10" x2="45" y2="70" stroke="#E0E0E0" strokeWidth="0.5"/>
    <line x1="75" y1="10" x2="75" y2="70" stroke="#E0E0E0" strokeWidth="0.5"/>
    <line x1="105" y1="10" x2="105" y2="70" stroke="#E0E0E0" strokeWidth="0.5"/>

    {/* 月ラベル */}
    <text x="30" y="78" fontSize="6" fill="#616161" textAnchor="middle" fontFamily="sans-serif">Q1</text>
    <text x="60" y="78" fontSize="6" fill="#616161" textAnchor="middle" fontFamily="sans-serif">Q2</text>
    <text x="90" y="78" fontSize="6" fill="#616161" textAnchor="middle" fontFamily="sans-serif">Q3</text>
  </svg>
);
