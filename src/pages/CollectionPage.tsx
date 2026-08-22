/**
 * src/pages/CollectionPage.tsx
 * 부적 도감 — 실루엣, 시즌 안내
 */
import React, { useEffect, useState } from 'react';
import { CHARMS, getCategoryEmoji, getCategoryLabel } from '../data/charms';
import { getCollection } from '../lib/storage';
import { getTodayKST } from '../lib/date';
import { getCharmSeason, getSeason, getSeasonLabel, isCharmDrawable } from '../lib/season';
import CharmArt from '../components/CharmArt';
import type { CharmCollectionItem } from '../types/charm';
import styles from './CollectionPage.module.css';

export default function CollectionPage() {
  const [collection, setCollection] = useState<CharmCollectionItem[]>([]);
  const today = getTodayKST();
  const season = getSeason(today);

  useEffect(() => {
    setCollection(getCollection());
  }, []);

  const acquiredIds = new Set(collection.map(c => c.charmId));
  const acquiredCount = acquiredIds.size;
  const total = CHARMS.length;
  const pct = Math.round((acquiredCount / total) * 100);
  const nextLocked = CHARMS.find(c => !acquiredIds.has(c.charmId));

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>부적 도감</h1>

      <div className={styles.progress}>
        <div className={styles.progressHeader}>
          <span className={styles.progressLabel}>모은 부적</span>
          <span className={styles.progressValue}>{acquiredCount} / {total}</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${pct}%` }} />
        </div>
        <span className={styles.progressPct}>
          {pct}%
          {nextLocked
            ? ` · 다음 빈칸: ${isCharmDrawable(nextLocked, today) ? '지금 뽑을 수 있어요' : `${getSeasonLabel(getCharmSeason(nextLocked.charmId) ?? season)}에 열려요`}`
            : ' · 다 모았어요'}
        </span>
        <p className={styles.seasonHint}>지금은 {getSeasonLabel(season)}이에요. 시즌 부적은 그 계절에만 새로 나와요.</p>
      </div>

      <div className={styles.grid}>
        {CHARMS.map(charm => {
          const acquired = acquiredIds.has(charm.charmId);
          const item = collection.find(c => c.charmId === charm.charmId);
          const charmSeason = getCharmSeason(charm.charmId);
          return (
            <div
              key={charm.charmId}
              className={[styles.cell, acquired ? styles.acquired : styles.locked].join(' ')}
            >
              <CharmArt
                imageKey={charm.charmImageKey}
                category={charm.charmCategory}
                rarity={charm.rarity}
                size="sm"
                locked={!acquired}
              />
              <span className={styles.cellName}>
                {acquired ? charm.charmName : '???'}
              </span>
              {acquired && item && (
                <span className={styles.cellCount}>{item.acquiredCount}번</span>
              )}
              {acquired && (
                <span className={styles.categoryTag}>
                  {getCategoryEmoji(charm.charmCategory)} {getCategoryLabel(charm.charmCategory)}
                </span>
              )}
              {!acquired && charmSeason && (
                <span className={styles.categoryTag}>{getSeasonLabel(charmSeason)} 시즌</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
