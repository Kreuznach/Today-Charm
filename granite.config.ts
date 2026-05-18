import { defineConfig } from '@apps-in-toss/web-framework/config';

/**
 * granite.config.ts
 * Apps in Toss(WebView) 미니앱 설정 파일
 *
 * [심사 제출 전 확인 사항]
 * - brand.icon: Toss 파트너 콘솔에서 심사용 아이콘을 업로드하고 발급된 URL로 교체 필요
 * - brand.primaryColor: 디자인 확정 후 변경 가능
 */
export default defineConfig({
  appName: 'today-charm',

  brand: {
    displayName: '오늘의 말랑부적',
    // NOTE: 심사 통과용 아이콘 업로드 후 Toss 콘솔에서 발급된 URL로 교체
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

  // 내비게이션 바 뒤로가기 버튼 비활성화:
  // 앱 내 BottomNav 로 화면 전환을 처리합니다.
  navigationBar: {
    withBackButton: false,
  },
});
