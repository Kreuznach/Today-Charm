import { defineConfig } from '@apps-in-toss/web-framework/config';

/**
 * granite.config.ts
 * Apps in Toss(WebView) 미니앱 설정 파일
 *
 * 심사에 내기 전에 확인할 것
 * - brand.icon: 토스 파트너 콘솔에서 받은 아이콘 주소로 바꾸기
 * - brand.primaryColor: 색이 정해지면 바꿔도 됩니다
 */
export default defineConfig({
  appName: 'today-lucky-charm',

  brand: {
    displayName: '오늘의 말랑부적',
    // 심사에 쓸 아이콘을 올린 뒤, 토스 콘솔에서 받은 주소로 바꾸세요
    icon: 'https://placehold.co/96x96/FF8FAB/ffffff.png',
    primaryColor: '#FF8FAB',
  },

  web: {
    host: 'localhost',
    port: 5173,
    commands: {
      dev: 'vite',
      build: 'vite build',
    },
  },

  outdir: 'dist',

  permissions: [],

  // 위쪽 뒤로 가기 버튼은 끕니다.
  // 화면 이동은 아래쪽 BottomNav 가 맡습니다.
  navigationBar: {
    withBackButton: false,
  },
});
