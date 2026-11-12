/**
 * src/pages/HistoryPage.tsx
 * 최근 7일 부적 기록
 */
import React, { useEffect, useState } from 'react';
import { getRecentRecords } from '../lib/storage';
import { getRecentDates, formatDateKST, getTodayKST } from '../lib/date';
import type { DailyCharmRecord } from '../types/charm';
import CharmArt from '../components/CharmArt';
import Mascot from '../components/Mascot';
import { getCharmSay } from '../data/funText';
import BannerAd from '../components/BannerAd';
import styles from './HistoryPage.module.css';

export default function HistoryPage() {
  const [records, setRecords] = useState<(DailyCharmRecord | null)[]>([]);
  const dates = getRecentDates(7);
  const today = getTodayKST();

  useEffect(() => {
    const loaded = getRecentRecords(dates);
    const mapped = dates.map(d => loaded.find(r => r.date === d) ?? null);
    setRecords(mapped);
  }, []);

  const hasAny = records.some(r => r !== null);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>최근 7일 기록</h1>

      {!hasAny ? (
        <div className={styles.empty}>
          <Mascot size={96} />
          <p className={styles.emptyText}>🍡 아직 텅 비었어요.</p>
          <p className={styles.emptySubText}>첫 부적을 데려와 볼까요?</p>
        </div>
      ) : (
        <ul className={styles.list}>
          {dates.map((date, i) => {
            const rec = records[i];
            const isToday = date === today;
            return (
              <li key={date} className={styles.item}>
                <div className={styles.dateBadge}>
                  <span className={styles.dateText}>
                    {isToday ? '오늘' : formatDateKST(date)}
                  </span>
                  {isToday && <span className={styles.todayMark}>TODAY</span>}
                </div>
                {rec ? (
                  <div className={styles.recordCard}>
                    <CharmArt
                      imageKey={rec.finalCharm.charmImageKey}
                      category={rec.finalCharm.charmCategory}
                      rarity={rec.finalCharm.rarity}
                      size="sm"
                    />
                    <div className={styles.recordInfo}>
                      <p className={styles.recordName}>{rec.finalCharm.charmName}</p>
                      <p className={styles.recordMsg}>“{getCharmSay(rec.finalCharm.charmId)}”</p>
                      {rec.usageDone && <p className={styles.recordMsg}>✅ 오늘 해 볼 일 완료</p>}
                    </div>
                    {rec.rerolled && (
                      <span className={styles.rerolledBadge}>재뽑기</span>
                    )}
                  </div>
                ) : (
                  <div className={[styles.emptyRecord, isToday ? styles.missToday : ''].join(' ')}>
                    <span className={styles.emptyRecordIcon}>{isToday ? '🍡' : '💤'}</span>
                    <span className={styles.emptyRecordText}>
                      {isToday ? '오늘은 아직 안 뽑았어요' : '이 날은 말랑이가 낮잠 잤어요'}
                    </span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
      {/* 하단 배너 광고 */}
      <BannerAd className={styles.banner} />
    </div>
  );
}
