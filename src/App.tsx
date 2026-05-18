/**
 * src/App.tsx
 * 최상위 컴포넌트 — React Router 기반 라우팅 + 레이아웃
 */
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { closeView } from '@apps-in-toss/web-framework';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import TodayPage from './pages/TodayPage';
import HistoryPage from './pages/HistoryPage';
import CollectionPage from './pages/CollectionPage';

function AppShell() {
  const location = useLocation();

  // Android 하드웨어 백버튼: 루트(/)이면 앱 종료, 아니면 브라우저 기본 뒤로가기
  useEffect(() => {
    window.history.pushState(null, '');

    function onPopState() {
      if (location.pathname === '/' || location.hash === '#/') {
        closeView().catch(() => {});
      }
      window.history.pushState(null, '');
    }

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [location]);

  return (
    <div className="app-shell">
      <main className="page">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/today" element={<TodayPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/collection" element={<CollectionPage />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppShell />
    </HashRouter>
  );
}
