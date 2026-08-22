/**
 * 토스가 넘겨 주는 입구 이름(referrer)을 기억합니다.
 * 화면에 보여 주지 않고, 나중에 “어느 문으로 많이 왔나”만 볼 때 씁니다.
 */

const KEY = 'charm_referrer_log';
const MAX = 30;

export type ReferrerEntry = {
  referrer: string;
  at: string;
};

function readLog(): ReferrerEntry[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ReferrerEntry[]) : [];
  } catch {
    return [];
  }
}

function queryFromLocation(): URLSearchParams {
  const hash = window.location.hash ?? '';
  if (hash.includes('?')) {
    return new URLSearchParams(hash.slice(hash.indexOf('?')));
  }
  return new URLSearchParams(window.location.search);
}

export function captureReferrer(): string | null {
  const params = queryFromLocation();
  const referrer = params.get('referrer') ?? params.get('ref');
  if (!referrer) return null;

  const log = readLog().filter(item => item.referrer !== referrer || item.at.slice(0, 10) !== new Date().toISOString().slice(0, 10));
  log.unshift({ referrer, at: new Date().toISOString() });
  localStorage.setItem(KEY, JSON.stringify(log.slice(0, MAX)));
  return referrer;
}

export function getReferrerLog(): ReferrerEntry[] {
  return readLog();
}
