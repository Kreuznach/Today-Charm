/**
 * src/lib/config.ts
 * Toss in App SDK 연동 및 광고 추상화
 */
import { GoogleAdMob, closeView } from '@apps-in-toss/web-framework';

/** 리워드 광고 그룹 ID (AIT 대시보드에서 발급) */
const AD_GROUP_ID_PROD = 'ait.v2.live.today-charm-rewarded'; // TODO: 실제 발급 ID로 교체

/**
 * Toss Ads 공식 테스트 전용 광고 ID (리워드 광고)
 * 참고: https://developers-apps-in-toss.toss.im/ads/develop.html#테스트하기
 */
const AD_GROUP_ID_TEST = 'ait-ad-test-rewarded-id';

const _useTestAd = (() => {
  const adEnv = import.meta.env.VITE_AD_ENV;
  if (adEnv === 'test')       return true;
  if (adEnv === 'production') return false;
  return import.meta.env.DEV;
})();

const AD_GROUP_ID = _useTestAd ? AD_GROUP_ID_TEST : AD_GROUP_ID_PROD;

/**
 * 미니앱 종료 — AIT closeView() 호출
 * AIT 미지원 환경(개발/브라우저)에서는 아무 동작도 하지 않습니다.
 */
export function closeApp(): void {
  closeView().catch(() => {});
}

/**
 * AIT 환경 여부 확인
 */
function _isAitSupported(): boolean {
  try {
    return GoogleAdMob.loadAppsInTossAdMob.isSupported() === true;
  } catch {
    return false;
  }
}

/**
 * 리워드 광고 표시 (재뽑기용)
 * - AIT 환경: loadAppsInTossAdMob → showAppsInTossAdMob 두 단계로 동작
 *   - loaded: 광고 준비 완료
 *   - userEarnedReward: 보상 획득 확정
 *   - dismissed: 광고 종료 (보상 미획득 시 false)
 * - 개발/브라우저: Mock으로 항상 true 반환
 */
export async function showRewardAd(): Promise<boolean> {
  if (!_isAitSupported()) {
    // 개발 환경 Mock
    await new Promise<void>(r => setTimeout(r, 500));
    console.log('[Mock] 광고 시청 완료 (개발 환경)');
    return true;
  }

  // 1단계: 광고 로드
  await new Promise<void>((resolve, reject) => {
    const cleanup = GoogleAdMob.loadAppsInTossAdMob({
      options: { adGroupId: AD_GROUP_ID },
      onEvent: (event) => {
        if (event.type === 'loaded') {
          cleanup();
          resolve();
        }
      },
      onError: (error) => {
        cleanup();
        reject(error);
      },
    });
  });

  // 2단계: 광고 표시 & 보상 확인
  return new Promise<boolean>((resolve) => {
    let rewarded = false;
    GoogleAdMob.showAppsInTossAdMob({
      options: { adGroupId: AD_GROUP_ID },
      onEvent: (event) => {
        if (event.type === 'userEarnedReward') rewarded = true;
        if (event.type === 'dismissed')        resolve(rewarded);
        if (event.type === 'failedToShow')     resolve(false);
      },
      onError: () => resolve(false),
    });
  });
}
