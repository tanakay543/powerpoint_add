import { useState } from 'react';

interface FavoriteShape {
  id: string;
  name: string;
  description: string;
  thumbnail?: React.ReactNode;
}

// サンプルデータ（後でストレージから読み込み）
const sampleFavorites: FavoriteShape[] = [
  {
    id: 'f1-2x2-matrix',
    name: '2x2マトリクス',
    description: '4象限分析',
  },
  {
    id: 'd3-gantt-chart',
    name: 'ガントチャート',
    description: 'スケジュール管理',
  },
];

/**
 * お気に入りビュー（Tailwind CSS版）
 * Stitchデザインに基づく2列グリッドレイアウト
 */
export const FavoritesView: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteShape[]>(sampleFavorites);

  const handleRemove = (shapeId: string) => {
    setFavorites((prev) => prev.filter((shape) => shape.id !== shapeId));
  };

  const handleInsert = (shapeId: string) => {
    console.log('Insert shape:', shapeId);
    // TODO: 実装
  };

  // Empty State
  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-xl">
        <span className="material-symbols-outlined text-[80px] text-outline mb-lg opacity-30">
          star
        </span>
        <h2 className="text-headline-md text-on-surface mb-sm">
          お気に入りを追加しましょう
        </h2>
        <p className="text-body-md text-on-surface-variant mb-lg">
          よく使う図形をお気に入りに追加すると
          <br />
          ここから素早くアクセスできます
        </p>
        <button className="px-lg py-sm bg-primary text-white rounded-lg text-body-md font-medium hover:bg-primary/90 transition-colors">
          カタログを見る
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* ヘッダー */}
      <div className="px-md py-sm bg-surface border-b border-outline-variant">
        <div className="flex items-center space-x-2">
          <span className="material-symbols-outlined text-primary" data-weight="fill">
            star
          </span>
          <h2 className="text-body-lg font-semibold text-on-surface">
            お気に入り
          </h2>
          <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-label-sm font-medium">
            {favorites.length}
          </span>
        </div>
      </div>

      {/* 図形グリッド */}
      <div className="flex-1 overflow-y-auto p-md">
        <div className="grid grid-cols-2 gap-xs pb-md">
          {favorites.map((shape) => (
            <div
              key={shape.id}
              className="bg-surface rounded-lg border border-outline-variant transition-shadow duration-300 hover:shadow-level-2 flex flex-col overflow-hidden group cursor-pointer relative"
              onClick={() => handleInsert(shape.id)}
            >
              <div className="flex flex-col items-center justify-center text-center space-y-md p-md">
                {/* サムネイル */}
                <div className="w-20 h-20 rounded bg-primary/10 flex items-center justify-center text-primary">
                  {shape.thumbnail || (
                    <span className="material-symbols-outlined text-[32px]">
                      {shape.id.includes('matrix')
                        ? 'grid_on'
                        : shape.id.includes('gantt')
                        ? 'calendar_view_month'
                        : 'category'}
                    </span>
                  )}
                </div>

                {/* タイトルと説明 */}
                <div>
                  <h3 className="text-body-md font-medium text-on-surface leading-tight">
                    {shape.name}
                  </h3>
                  <p className="text-label-sm text-on-secondary-container mt-1">
                    {shape.description}
                  </p>
                </div>

                {/* 削除ボタン */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(shape.id);
                  }}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center transition-colors hover:bg-red-50"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline hover:text-red-600">
                    delete
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
