/**
 * 오늘 나온 부적을 자랑용으로 보냅니다.
 * 돈, 포인트, 쿠폰은 주지 않습니다.
 */
import type { CharmResult } from '../types/charm';
import { getCharmFace, getCharmSay } from '../data/funText';

export type ShareResult = 'shared' | 'copied' | 'failed';

export function buildShareText(charm: CharmResult): string {
  return [
    `🍡 오늘 나는 [${charm.charmName}] ${getCharmFace(charm.charmId)}`,
    `“${getCharmSay(charm.charmId)}”`,
    '너의 오늘 부적은 뭐야? 한 장 뽑아 봐!',
    '',
    '진짜 운세가 아니에요. 오늘을 가볍게 버티는 카드예요.',
  ].join('\n');
}

export async function shareCharm(charm: CharmResult): Promise<ShareResult> {
  const text = buildShareText(charm);
  const deepLink = `intoss://today-lucky-charm/today`;

  try {
    const mod = await import('@apps-in-toss/web-framework');
    const getTossShareLink = (mod as { getTossShareLink?: (url: string, og?: string) => Promise<string> })
      .getTossShareLink;
    const share = (mod as { share?: (opts: { message: string }) => Promise<void> }).share;
    if (typeof getTossShareLink === 'function' && typeof share === 'function') {
      const link = await getTossShareLink(deepLink);
      await share({ message: `${text}\n\n${link}` });
      return 'shared';
    }
  } catch {
    // 토스 밖에서는 아래 방법으로 이어갑니다.
  }

  try {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      await navigator.share({ title: '오늘의 말랑부적', text });
      return 'shared';
    }
  } catch {
    // 공유 창을 닫으면 클립보드로 넘어가지 않습니다.
    return 'failed';
  }

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return 'copied';
    }
  } catch {
    return 'failed';
  }

  return 'failed';
}
