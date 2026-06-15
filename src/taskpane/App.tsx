import { useState } from 'react';
import { CatalogView } from './views/CatalogView';
import { FavoritesView } from './views/FavoritesView';
import { BrandView } from './views/BrandView';
import { SettingsView } from './views/SettingsView';

type ViewKey = 'catalog' | 'favorites' | 'brand' | 'settings';

/**
 * メインアプリケーション（Tailwind CSS版）
 * Stitchデザインに基づく洗練されたUI
 */
export const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewKey>('catalog');

  return (
    <div className="w-full h-screen flex flex-col bg-surface">
      {/* ヘッダー */}
      <header className="px-md py-sm border-b border-outline-variant flex justify-between items-center bg-surface">
        <div className="flex items-center space-x-sm">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-[20px]">
              auto_awesome
            </span>
          </div>
          <h1 className="font-display text-[18px] font-bold text-on-surface tracking-tight">
            SlideStream
          </h1>
        </div>
      </header>

      {/* タブナビゲーション */}
      <div className="px-md py-sm bg-surface-container-low border-b border-outline-variant">
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveView('catalog')}
            className={`whitespace-nowrap px-md py-sm rounded-full text-label-sm font-bold transition-colors ${
              activeView === 'catalog'
                ? 'bg-primary text-white'
                : 'bg-surface-container-highest text-on-surface'
            }`}
          >
            カタログ
          </button>
          <button
            onClick={() => setActiveView('favorites')}
            className={`whitespace-nowrap px-md py-sm rounded-full text-label-sm font-bold transition-colors ${
              activeView === 'favorites'
                ? 'bg-primary text-white'
                : 'bg-surface-container-highest text-on-surface'
            }`}
          >
            お気に入り
          </button>
          <button
            onClick={() => setActiveView('brand')}
            className={`whitespace-nowrap px-md py-sm rounded-full text-label-sm font-bold transition-colors ${
              activeView === 'brand'
                ? 'bg-primary text-white'
                : 'bg-surface-container-highest text-on-surface'
            }`}
          >
            ブランド
          </button>
          <button
            onClick={() => setActiveView('settings')}
            className={`whitespace-nowrap px-md py-sm rounded-full text-label-sm font-bold transition-colors ${
              activeView === 'settings'
                ? 'bg-primary text-white'
                : 'bg-surface-container-highest text-on-surface'
            }`}
          >
            設定
          </button>
        </div>
      </div>

      {/* コンテンツエリア */}
      <main className="flex-1 overflow-y-auto bg-[#F9F9FB]">
        {activeView === 'catalog' && <CatalogView />}
        {activeView === 'favorites' && <FavoritesView />}
        {activeView === 'brand' && <BrandView />}
        {activeView === 'settings' && <SettingsView />}
      </main>

      {/* フッター */}
      <footer className="px-md py-3 border-t border-outline-variant bg-surface flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-label-sm text-secondary font-medium">
            ワークスペース同期済み
          </span>
        </div>
        <span className="text-label-sm text-secondary">v2.4.0</span>
      </footer>
    </div>
  );
};
