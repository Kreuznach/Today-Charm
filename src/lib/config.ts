/**
 * src/lib/config.ts
 * Toss in App SDK 연동 및 광고 추상화
 */
import { GoogleAdMob, TossAds, closeView } from '@apps-in-toss/web-framework';

/**
 * 리워드 광고 그룹 ID — 재뽑기용 (광고 시청 후 새 부적 뽑기)
 * 환경변수 VITE_REWARD_AD_ID로 오버라이드 가능
 */
export const REWARD_AD_ID =
  (import.meta.env.VITE_REWARD_AD_ID as string | undefined) ?? 'ait.v2.live.5c06ff01e75a4884';

/**
 * 배너 광고 그룹 ID — 기록 페이지 하단 노출형 배너
 * 환경변수 VITE_BANNER_AD_ID로 오버라이드 가능
 */
export const BANNER_AD_ID =
  (import.meta.env.VITE_BANNER_AD_ID as string | undefined) ?? 'ait.v2.live.41ce280c1bfe4683';

/**
 * 미니앱 종료 — AIT closeView() 호출
 * AIT 미지원 환경(개발/브라우저)에서는 아무 동작도 하지 않습니다.
 */
export function closeApp(): void {
  closeView().catch(() => {});
}

/**
 * AIT 리워드 광고 환경 여부 확인
 */
function _isRewardAdSupported(): boolean {
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
  if (!_isRewardAdSupported()) {
    // 개발 환경 Mock
    await new Promise<void>(r => setTimeout(r, 500));
    console.log('[Mock] 광고 시청 완료 (개발 환경)');
    return true;
  }

  // 1단계: 광고 로드
  await new Promise<void>((resolve, reject) => {
    const cleanup = GoogleAdMob.loadAppsInTossAdMob({
      options: { adGroupId: REWARD_AD_ID },
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
      options: { adGroupId: REWARD_AD_ID },
      onEvent: (event) => {
        if (event.type === 'userEarnedReward') rewarded = true;
        if (event.type === 'dismissed')        resolve(rewarded);
        if (event.type === 'failedToShow')     resolve(false);
      },
      onError: () => resolve(false),
    });
  });
}

/**
 * TossAds 배너 광고 환경 여부 확인
 */
export function isBannerAdSupported(): boolean {
  try {
    return TossAds.attachBanner.isSupported() === true;
  } catch {
    return false;
  }
}

