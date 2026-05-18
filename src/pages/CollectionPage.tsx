/**
 * src/pages/CollectionPage.tsx
 * 전체 부적 24종 도감 — 획득/미획득 표시
 */
import React, { useEffect, useState } from 'react';
import { CHARMS, getCategoryEmoji, getCategoryLabel, getCharmEmoji } from '../data/charms';
import { getCollection } from '../lib/storage';
import type { CharmCollectionItem } from '../types/charm';
import styles from './CollectionPage.module.css';

export default function CollectionPage() {
  const [collection, setCollection] = useState<CharmCollectionItem[]>([]);

  useEffect(() => {
    setCollection(getCollection());
  }, []);

  const acquiredIds = new Set(collection.map(c => c.charmId));
  const acquiredCount = acquiredIds.size;
  const total = CHARMS.length;
  const pct = Math.round((acquiredCount / total) * 100);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>부적 도감</h1>

      {/* 획득률 */}
      <div className={styles.progress}>
        <div className={styles.progressHeader}>
          <span className={styles.progressLabel}>획득률</span>
          <span className={styles.progressValue}>{acquiredCount} / {total}</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${pct}%` }} />
        </div>
        <span className={styles.progressPct}>{pct}%</span>
      </div>

      {/* 그리드 */}
      <div className={styles.grid}>
        {CHARMS.map(charm => {
          const acquired = acquiredIds.has(charm.charmId);
          const item = collection.find(c => c.charmId === charm.charmId);
          return (
            <div
              key={charm.charmId}
              className={[styles.cell, acquired ? styles.acquired : styles.locked].join(' ')}
            >
              <span className={styles.cellEmoji}>
                {acquired ? getCharmEmoji(charm.charmImageKey) : '🔒'}
              </span>
              <span className={styles.cellName}>
                {acquired ? charm.charmName : '???'}
              </span>
              {acquired && item && (
                <span className={styles.cellCount}>{item.acquiredCount}회</span>
              )}
              {acquired && (
                <span className={styles.categoryTag}>
                  {getCategoryEmoji(charm.charmCategory)} {getCategoryLabel(charm.charmCategory)}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
