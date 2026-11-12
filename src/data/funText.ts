/**
 * 재미 문구 모음 — 부적 한마디, 만남 배지, 화분, 시간·요일 인사, 도감 칭호.
 * 모두 표시용 글입니다. 점수·포인트·확률과는 관계가 없습니다.
 */
import type { CharmCategory } from '../types/charm';

/** 부적마다 붙는 얼굴 이모지 */
export const CHARM_FACE: Record<string, string> = {
  'charm-01': '🌅⏰', 'charm-02': '🎯📚', 'charm-03': '🧹💨', 'charm-04': '🛡️🫧',
  'charm-05': '🔋🐢', 'charm-06': '💧👀', 'charm-07': '👛🛡️', 'charm-08': '🛒🔒',
  'charm-09': '🔍🎁', 'charm-10': '☕🧊', 'charm-11': '🛵💤', 'charm-12': '📺✂️',
  'charm-13': '🤐🍯', 'charm-14': '💬💪', 'charm-15': '👂✨', 'charm-16': '🗣️🧃',
  'charm-17': '🌟🧺', 'charm-18': '🕊️🌿', 'charm-19': '🍱🎲', 'charm-20': '🍲🌙',
  'charm-21': '🌶️🥛', 'charm-22': '🍚💛', 'charm-23': '🐱☀️', 'charm-24': '🍡🍀',
};

/** 부적이 직접 말하는 한마디 (응원일 뿐, 효과를 약속하지 않습니다) */
export const CHARM_SAY: Record<string, string> = {
  'charm-01': '이불 밖도 생각보다 괜찮아!',
  'charm-02': '딱 10분만 나랑 같이 집중해 보자.',
  'charm-03': '제일 작은 일 하나만 먼저 해 볼까?',
  'charm-04': '속상한 말은 비눗방울처럼 톡!',
  'charm-05': '오늘은 거북이 속도도 충분해.',
  'charm-06': '물 한 잔 마시고 기지개 쭉!',
  'charm-07': '지갑아, 오늘은 푹 쉬어.',
  'charm-08': '장바구니에 하루만 재워 두자.',
  'charm-09': '이미 가진 것 중에 좋은 걸 찾아보자.',
  'charm-10': '오늘은 집에서 만든 음료도 멋져.',
  'charm-11': '냉장고 속 재료가 너를 부르고 있어.',
  'charm-12': '안 보는 건 살짝 정리해 볼까?',
  'charm-13': '말하기 전에 꿀처럼 한 번 천천히.',
  'charm-14': '짧은 답장도 충분히 반가워.',
  'charm-15': '친구 표정을 한 번 더 살펴보자.',
  'charm-16': '한 문장만 말해도 오늘은 성공!',
  'charm-17': '칭찬 하나 주면, 하나 돌아올지도?',
  'charm-18': '오늘은 다툼 대신 웃음 한 번.',
  'charm-19': '고민될 땐 따뜻한 걸로!',
  'charm-20': '오늘 저녁은 너의 첫 느낌을 믿어.',
  'charm-21': '매운 건 한 단계만 낮춰도 맛있어.',
  'charm-22': '밥 한 공기가 오늘의 힘이야.',
  'charm-23': '햇볕에서 고양이처럼 쉬어도 돼.',
  'charm-24': '오늘도 말랑하게, 너답게!',
};

export const CATEGORY_NICK: Record<CharmCategory, string> = {
  daily: '하루 지킴이',
  spending: '지갑 수호대',
  social: '마음 배달부',
  meal: '냠냠 탐험대',
  cute: '말랑 클럽',
};

export const CATEGORY_STICKER: Record<CharmCategory, string> = {
  daily: '☀️',
  spending: '🐷',
  social: '💌',
  meal: '🍙',
  cute: '🐾',
};

/** 아직 못 만난 부적 칸에 보여 주는 힌트 */
export const LOCKED_HINT: Record<CharmCategory, string> = {
  daily: '아침에 힘이 되는 부적이래요…',
  spending: '지갑을 지켜 주는 친구 같아요…',
  social: '마음을 전해 주는 부적이래요…',
  meal: '냄새가 맛있는 부적…?',
  cute: '말랑말랑 귀여운 친구래요…',
};

export function getCharmFace(charmId: string): string {
  return CHARM_FACE[charmId] ?? '🍡';
}

export function getCharmSay(charmId: string): string {
  return CHARM_SAY[charmId] ?? '오늘도 말랑하게!';
}

export interface MeetBadge {
  icon: string;
  text: string;
}

/** 같은 부적을 몇 번 만났는지에 따른 배지 (표시만 하고, 부적이 더 세지지는 않습니다) */
export function getMeetBadge(count: number): MeetBadge {
  if (count >= 10) return { icon: '🏅', text: '찐친 부적! 오늘도 같이 가자.' };
  if (count >= 5) return { icon: '💛', text: '단짝 부적이 되었어요!' };
  if (count >= 3) return { icon: '🤝', text: '이제 꽤 친해졌어요.' };
  if (count === 2) return { icon: '👋', text: '어, 또 만났네! 우리 인연인가 봐.' };
  return { icon: '🆕', text: '처음 만났어요! 반가워요.' };
}

export interface Plant {
  icon: string;
  text: string;
}

/** 연속으로 뽑은 날 수를 화분 그림으로 보여 줍니다 */
export function getPlant(streak: number): Plant {
  if (streak >= 30) return { icon: '🌳', text: '작은 나무가 되었어요. 대단해요!' };
  if (streak >= 14) return { icon: '🌻', text: '해바라기만큼 자랐어요.' };
  if (streak >= 7) return { icon: '🌷', text: '일주일 꽃이 피었어요!' };
  if (streak >= 3) return { icon: '🌿', text: '잎이 두 장 생겼어요.' };
  if (streak === 2) return { icon: '🌱', text: '싹이 났어요!' };
  if (streak === 1) return { icon: '🌰', text: '씨앗을 심었어요.' };
  return { icon: '💧', text: '화분이 잠깐 쉬었어요. 오늘 다시 물 줄까요?' };
}

/** 한국 시간의 '시' */
function getKstHour(): number {
  return new Date(Date.now() + 9 * 60 * 60 * 1000).getUTCHours();
}

export function getGreeting(hour: number = getKstHour()): MeetBadge {
  if (hour < 6) return { icon: '🌌', text: '늦은 시간이에요. 부적은 내일 뽑아도 괜찮아요.' };
  if (hour < 11) return { icon: '🌤️', text: '좋은 아침! 오늘의 부적이 기다려요.' };
  if (hour < 14) return { icon: '🍱', text: '점심 먹었어요? 부적 한 장 어때요?' };
  if (hour < 18) return { icon: '☕', text: '오후도 반 왔어요. 조금만 더 힘내요!' };
  if (hour < 22) return { icon: '🌇', text: '오늘 하루 수고했어요.' };
  return { icon: '🌙', text: '오늘도 고생 많았어요. 푹 자요.' };
}

const WEEKDAY_THEME: MeetBadge[] = [
  { icon: '🧺', text: '이번 주 모은 부적을 구경해 볼까요?' },
  { icon: '😪', text: '월요일은 천천히 시동 걸어도 돼요.' },
  { icon: '🔥', text: '어제보다 한 걸음만!' },
  { icon: '💧', text: '물 한 잔 마시고 시작해요.' },
  { icon: '🌳', text: '오늘 목표는 딱 하나만.' },
  { icon: '🎉', text: '주말이 코앞이에요!' },
  { icon: '🛋️', text: '푹 쉬는 것도 할 일이에요.' },
];

/** 'YYYY-MM-DD' 날짜의 요일 테마 (일요일이 0번) */
export function getWeekdayTheme(dateStr: string): MeetBadge {
  const day = new Date(`${dateStr}T00:00:00Z`).getUTCDay();
  return WEEKDAY_THEME[day] ?? WEEKDAY_THEME[0];
}

/** 모은 부적 수에 따른 도감 칭호 */
export function getCollectionTitle(owned: number, total: number): MeetBadge {
  if (owned >= total) return { icon: '👑', text: '말랑 도감 마스터' };
  if (owned >= 20) return { icon: '🔭', text: '부적 박사' };
  if (owned >= 12) return { icon: '📖', text: '도감 반쪽' };
  if (owned >= 5) return { icon: '🎒', text: '부적 탐험가' };
  if (owned >= 1) return { icon: '🐣', text: '새내기 수집가' };
  return { icon: '🥚', text: '아직 알 속에 있어요' };
}

export const DRAW_STEPS = [
  '말랑말랑… 🌀',
  '부적들이 줄을 서는 중… 📜📜📜',
  '오늘 너랑 맞는 부적 찾았다! ✨',
];
