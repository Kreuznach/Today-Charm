/**
 * 부적마다 다른 종이 문양. 사진 파일이 없어도 색과 모양으로 얼굴을 구분합니다.
 */
import React from 'react';
import type { CharmCategory, CharmRarity } from '../types/charm';
import styles from './CharmArt.module.css';

const MARK: Record<string, string> = {
  wakeup: '☀',
  focus: '◎',
  motivation: '✓',
  mental: '⛨',
  energy: '⚡',
  awake: '💧',
  wallet: '₩',
  impulse: '✕',
  benefit: '★',
  cafe: '☕',
  delivery: '⤷',
  subscription: '☰',
  speech: '…',
  reply: '✉',
  social_sense: '◉',
  meeting: '▣',
  compliment: '✦',
  relationship: '♡',
  lunch: '🍜',
  dinner: '🍽',
  spicy: '🌶',
  hearty: '♨',
  cat: 'ᴖ̈',
  mallang: '❀',
};

interface CharmArtProps {
  imageKey: string;
  category: CharmCategory;
  rarity: CharmRarity;
  size?: 'sm' | 'md' | 'lg';
  locked?: boolean;
}

export default function CharmArt({
  imageKey,
  category,
  rarity,
  size = 'md',
  locked = false,
}: CharmArtProps) {
  const mark = MARK[imageKey] ?? '❀';
  return (
    <div
      className={[
        styles.seal,
        styles[category],
        styles[rarity],
        styles[size],
        locked ? styles.locked : '',
      ].join(' ')}
      aria-hidden
    >
      <span className={styles.cornerTL} />
      <span className={styles.cornerBR} />
      <span className={styles.mark}>{locked ? '?' : mark}</span>
    </div>
  );
}

export function getCharmMark(imageKey: string): string {
  return MARK[imageKey] ?? '❀';
}
