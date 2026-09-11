import { defineConfig } from '@apps-in-toss/web-framework/config';

/**
 * apps-in-toss.config.ts
 * Apps in Toss(WebView) 미니앱 설정 파일
 *
 * 심사에 내기 전에 확인할 것
 * - 앱 아이콘·표시 이름은 토스 파트너 콘솔에서 등록/관리합니다 (SDK 3.x부터 config 파일이 아님)
 * - brand.primaryColor: 색이 정해지면 바꿔도 됩니다
 */
export default defineConfig({
  appName: 'today-lucky-charm',

  brand: {
    primaryColor: '#FF8FAB'
  },

  webBundleDir: 'dist',
  permissions: [],

  // 위쪽 뒤로 가기 버튼은 끕니다.
  // 화면 이동은 아래쪽 플로팅 탭바(BottomNav)가 맡습니다.
  navigationBar: {
    withBackButton: false,
  }
});
