import { useState } from 'react';
import { categories, getObjectsByCategory } from '../../catalog';
import { GanttChartDialog, type GanttChartParams } from '../components/GanttChartDialog';
import { insertGanttChart } from '../../insertion';

type CategoryId = string | null;

/**
 * カタログビュー（Tailwind CSS版）
 * Stitchデザインに基づく2列グリッドレイアウト
 */
export const CatalogView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('popular');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);
  const [ganttDialogOpen, setGanttDialogOpen] = useState(false);

  const toggleFavorite = (shapeId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(shapeId)) {
        next.delete(shapeId);
      } else {
        next.add(shapeId);
      }
      return next;
    });
  };

  const handleInsertShape = async (shapeId: string) => {
    const shape = shapes.find((s) => s.id === shapeId);
    if (!shape) return;

    // ガントチャートの場合はダイアログを表示
    if (shapeId === 'd3-gantt-chart') {
      setGanttDialogOpen(true);
      return;
    }

    // 挿入ハンドラーがある場合は実行
    if (shape.insertHandler) {
      try {
        setNotification({ message: `${shape.name} を挿入中...`, type: 'info' });
        await shape.insertHandler();
        setNotification({ message: `${shape.name} を挿入しました`, type: 'success' });
        setTimeout(() => setNotification(null), 3000);
      } catch (error) {
        console.error('Insertion error:', error);
        setNotification({
          message: `エラー: ${shape.name} の挿入に失敗しました`,
          type: 'error',
        });
        setTimeout(() => setNotification(null), 5000);
      }
    } else {
      // 未実装の場合
      setNotification({
        message: `${shape.name} はまだ実装されていません`,
        type: 'info',
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleGanttChartConfirm = async (params: GanttChartParams) => {
    try {
      setNotification({ message: 'ガントチャートを挿入中...', type: 'info' });
      await insertGanttChart(params);
      setNotification({ message: 'ガントチャートを挿入しました', type: 'success' });
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error('Gantt chart insertion error:', error);
      setNotification({
        message: 'エラー: ガントチャートの挿入に失敗しました',
        type: 'error',
      });
      setTimeout(() => setNotification(null), 5000);
    }
  };

  // カテゴリフィルター用のデータ
  const categoryFilters = [
    { id: 'popular', label: '人気' },
    { id: 'framework', label: 'フレームワーク' },
    { id: 'diagram', label: 'ダイアグラム' },
    { id: 'basic', label: '基本図形' },
    { id: 'project', label: 'プロジェクト管理' },
  ];

  // 選択されたカテゴリの図形を取得（人気は★★★のみ）
  const shapes =
    activeCategory === 'popular'
      ? categories.flatMap((cat) =>
          getObjectsByCategory(cat.id, '★★★').map((obj) => ({
            ...obj,
            categoryName: cat.name,
          }))
        )
      : activeCategory
      ? getObjectsByCategory(activeCategory).map((obj) => ({
          ...obj,
          categoryName:
            categories.find((c) => c.id === activeCategory)?.name || '',
        }))
      : [];

  return (
    <div className="flex flex-col h-full">
      {/* ガントチャート設定ダイアログ */}
      <GanttChartDialog
        open={ganttDialogOpen}
        onOpenChange={setGanttDialogOpen}
        onConfirm={handleGanttChartConfirm}
      />

      {/* 通知バナー */}
      {notification && (
        <div
          className={`px-md py-sm border-b flex items-center justify-between ${
            notification.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-800'
              : notification.type === 'error'
              ? 'bg-red-50 border-red-200 text-red-800'
              : 'bg-blue-50 border-blue-200 text-blue-800'
          }`}
        >
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-[18px]">
              {notification.type === 'success'
                ? 'check_circle'
                : notification.type === 'error'
                ? 'error'
                : 'info'}
            </span>
            <span className="text-body-md font-medium">{notification.message}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="material-symbols-outlined text-[18px] hover:opacity-70"
          >
            close
          </button>
        </div>
      )}

      {/* カテゴリフィルター */}
      <div className="px-md py-sm bg-surface border-b border-outline-variant">
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
          {categoryFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveCategory(filter.id)}
              className={`whitespace-nowrap px-md py-sm rounded-full text-label-sm font-bold transition-colors ${
                activeCategory === filter.id
                  ? 'bg-primary text-white'
                  : 'bg-surface-container-highest text-on-surface'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* 図形グリッド */}
      <div className="flex-1 overflow-y-auto p-md">
        <div className="grid grid-cols-2 gap-xs pb-md">
          {shapes.map((shape) => (
            <div
              key={shape.id}
              onClick={() => handleInsertShape(shape.id)}
              className="bg-surface rounded-lg border border-outline-variant transition-shadow duration-300 hover:shadow-level-2 flex flex-col overflow-hidden group cursor-pointer relative"
            >
              <div className="flex flex-col items-center justify-center text-center space-y-md p-md">
                {/* サムネイル */}
                <div className="w-20 h-20 rounded bg-primary/10 flex items-center justify-center text-primary">
                  {shape.thumbnail || (
                    <span className="material-symbols-outlined text-[32px]">
                      {shape.id.includes('matrix')
                        ? 'grid_on'
                        : shape.id.includes('arrow')
                        ? 'arrow_forward'
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

                {/* お気に入りボタン */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(shape.id);
                  }}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center transition-colors hover:bg-primary/20"
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    data-weight={favorites.has(shape.id) ? 'fill' : undefined}
                    style={{
                      color: favorites.has(shape.id) ? '#0043c8' : '#737688',
                    }}
                  >
                    star
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {shapes.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <span className="material-symbols-outlined text-[64px] text-outline mb-4">
              inbox
            </span>
            <p className="text-body-md text-on-surface-variant">
              このカテゴリには図形がありません
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
