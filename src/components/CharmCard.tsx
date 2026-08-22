/**
 * src/components/CharmCard.tsx
 * 부적 카드 — 종류마다 색이 다르고, 특별/시즌은 테두리가 다릅니다.
 */
import React from 'react';
import type { CharmResult } from '../types/charm';
import { getCategoryEmoji, getCategoryLabel } from '../data/charms';
import CharmArt from './CharmArt';
import styles from './CharmCard.module.css';

interface CharmCardProps {
  charm: CharmResult;
  animationType?: 'fade' | 'reveal' | 'burst';
  story?: string;
}

const RARITY_LABEL: Record<string, string> = {
  basic: '기본',
  special: '특별',
  seasonal: '시즌',
};

export default function CharmCard({ charm, animationType = 'fade', story }: CharmCardProps) {
  const animClass = animationType === 'reveal'
    ? styles.reveal
    : animationType === 'burst'
    ? styles.burst
    : styles.fadeIn;

  return (
    <div className={[styles.card, styles[charm.charmCategory], styles[charm.rarity], animClass].join(' ')}>
      <div className={styles.header}>
        <span className={styles.category}>
          {getCategoryEmoji(charm.charmCategory)} {getCategoryLabel(charm.charmCategory)}
        </span>
        <span className={styles.rarity}>{RARITY_LABEL[charm.rarity] ?? charm.rarity}</span>
      </div>

      <CharmArt
        imageKey={charm.charmImageKey}
        category={charm.charmCategory}
        rarity={charm.rarity}
        size="lg"
      />

      <h2 className={styles.name}>{charm.charmName}</h2>

      <p className={styles.mainMessage}>{story ?? charm.mainMessage}</p>

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
          <span className={styles.detailLabel}>오늘의 포인트</span>
          <span className={styles.detailValue}>{charm.luckyPoint}</span>
        </li>
      </ul>
    </div>
  );
}
