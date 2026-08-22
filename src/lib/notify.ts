/**
 * 하루 한 번 알림을 받고 싶은지 앱이 기억합니다.
 * 진짜 토스 푸시는 콘솔에서 문구 검수를 받은 뒤에만 보낼 수 있습니다.
 */

const KEY = 'charm_notify_pref';

export type NotifyPref = {
  wanted: boolean;
  updatedAt: string;
};

export function getNotifyPref(): NotifyPref | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as NotifyPref) : null;
  } catch {
    return null;
  }
}

export function setNotifyPref(wanted: boolean): NotifyPref {
  const pref: NotifyPref = { wanted, updatedAt: new Date().toISOString() };
  localStorage.setItem(KEY, JSON.stringify(pref));
  return pref;
}

/**
 * 토스 SDK가 있으면 동의 창을 열어 보고, 없으면 앱 안 기억만 합니다.
 */
export async function requestDailyReminder(): Promise<boolean> {
  try {
    const mod = await import('@apps-in-toss/web-framework');
    const request = (mod as { requestNotificationAgreement?: (opts: unknown) => unknown })
      .requestNotificationAgreement;
    const templateCode = import.meta.env.VITE_NOTIFY_TEMPLATE_CODE;
    if (typeof request === 'function' && templateCode) {
      request({ templateCode });
    }
  } catch {
    // 브라우저에서는 조용히 넘어갑니다.
  }
  setNotifyPref(true);
  return true;
}
