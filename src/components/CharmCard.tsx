/**
 * src/components/CharmCard.tsx
 * 부적 카드 UI 컴포넌트
 */
import React from 'react';
import type { CharmResult } from '../types/charm';
import { getCategoryEmoji, getCategoryLabel, getCharmEmoji } from '../data/charms';
import styles from './CharmCard.module.css';

interface CharmCardProps {
  charm: CharmResult;
  /** 카드 등장 애니메이션 종류 */
  animationType?: 'fade' | 'reveal' | 'burst';
}

const RARITY_LABEL: Record<string, string> = {
  basic: '기본',
  special: '특별 ✨',
  seasonal: '시즌 🌙',
};

export default function CharmCard({ charm, animationType = 'fade' }: CharmCardProps) {
  const animClass = animationType === 'reveal'
    ? styles.reveal
    : animationType === 'burst'
    ? styles.burst
    : styles.fadeIn;

  return (
    <div className={[styles.card, animClass].join(' ')}>
      {/* 헤더 */}
      <div className={styles.header}>
        <span className={styles.category}>
          {getCategoryEmoji(charm.charmCategory)} {getCategoryLabel(charm.charmCategory)}
        </span>
        <span className={styles.rarity}>{RARITY_LABEL[charm.rarity] ?? charm.rarity}</span>
      </div>

      {/* 이모지 심볼 */}
      <div className={styles.symbol}>{getCharmEmoji(charm.charmImageKey)}</div>

      {/* 부적명 */}
      <h2 className={styles.name}>{charm.charmName}</h2>

      {/* 메인 메시지 */}
      <p className={styles.mainMessage}>{charm.mainMessage}</p>

      <hr className={styles.divider} />

      {/* 상세 정보 */}
      <ul className={styles.details}>
        <li>
          <span className={styles.detailLabel}>부적 효과</span>
          <span className={styles.detailValue}>{charm.charmEffect}</span>
        </li>
        <li>
          <span className={styles.detailLabel}>오늘의 사용법</span>
          <span className={styles.detailValue}>{charm.todayUsage}</span>
        </li>
        <li>
          <span className={styles.detailLabel}>피해야 할 것</span>
          <span className={styles.detailValue}>{charm.avoidPoint}</span>
        </li>
        <li>
          <span className={styles.detailLabel}>행운 포인트</span>
          <span className={styles.detailValue}>{charm.luckyPoint}</span>
        </li>
      </ul>
    </div>
  );
}
