/**
 * src/pages/HomePage.tsx
 * 홈 — 오늘 부적 미리보기, 연속 방문, 알림 받기
 */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../components/PrimaryButton';
import CharmArt from '../components/CharmArt';
import { getTodayKST, formatDateKST } from '../lib/date';
import { getTodayRecord, getStreak, getCollection } from '../lib/storage';
import { getNotifyPref, requestDailyReminder, setNotifyPref } from '../lib/notify';
import { CHARMS } from '../data/charms';
import type { DailyCharmRecord } from '../types/charm';
import styles from './HomePage.module.css';

export default function HomePage() {
  const navigate = useNavigate();
  const today = getTodayKST();
  const [record, setRecord] = useState<DailyCharmRecord | null>(null);
  const [streak, setStreak] = useState(0);
  const [owned, setOwned] = useState(0);
  const [notifyOn, setNotifyOn] = useState(false);
  const [notifyHint, setNotifyHint] = useState('');

  useEffect(() => {
    setRecord(getTodayRecord(today));
    setStreak(getStreak(today));
    setOwned(getCollection().length);
    setNotifyOn(getNotifyPref()?.wanted === true);
  }, [today]);

  const lockedLeft = CHARMS.length - owned;

  async function handleNotify() {
    if (notifyOn) {
      setNotifyPref(false);
      setNotifyOn(false);
      setNotifyHint('알림을 꺼 두었어요.');
      return;
    }
    await requestDailyReminder();
    setNotifyOn(true);
    setNotifyHint('내일부터 “아직 안 뽑았어요” 알림을 받을게요. 토스 검수가 끝나야 실제로 옵니다.');
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span className={styles.logo}>❀</span>
        <h1 className={styles.title}>오늘의 말랑부적</h1>
        <p className={styles.date}>{formatDateKST(today)}</p>
      </div>

      {streak > 0 && (
        <p className={styles.streak}>
          {streak}일 연속으로 뽑았어요
        </p>
      )}

      <div className={styles.heroCard}>
        {record ? (
          <>
            <CharmArt
              imageKey={record.finalCharm.charmImageKey}
              category={record.finalCharm.charmCategory}
              rarity={record.finalCharm.rarity}
              size="lg"
            />
            <h2 className={styles.heroTitle}>오늘 뽑은 부적이 있어요</h2>
            <p className={styles.heroDesc}>
              오늘은 <strong>{record.finalCharm.charmName}</strong>이에요.
            </p>
            <p className={styles.heroQuote}>{record.finalCharm.mainMessage}</p>
          </>
        ) : (
          <>
            <div className={styles.heroEmoji}>🎴</div>
            <h2 className={styles.heroTitle}>오늘의 부적을 뽑아 봐요</h2>
            <p className={styles.heroDesc}>
              하루에 한 번, 오늘을 가볍고 귀엽게 버틸 부적을 뽑아 보세요.
            </p>
          </>
        )}
      </div>

      <div className={styles.actions}>
        {record ? (
          <PrimaryButton onClick={() => navigate('/today')}>
            오늘의 말랑부적 보기
          </PrimaryButton>
        ) : (
          <PrimaryButton onClick={() => navigate('/today')}>
            오늘의 말랑부적 뽑기
          </PrimaryButton>
        )}
      </div>

      <p className={styles.collectionHint}>
        도감 {owned} / {CHARMS.length}장
        {lockedLeft > 0 ? ` · 아직 ${lockedLeft}장이 잠겨 있어요` : ' · 다 모았어요'}
      </p>

      <button type="button" className={styles.notifyBtn} onClick={handleNotify}>
        {notifyOn ? '내일 알림 끄기' : '내일 안 뽑으면 알려 주기'}
      </button>
      {notifyHint && <p className={styles.notice}>{notifyHint}</p>}

      <p className={styles.notice}>
        하루 한 번 뽑을 수 있어요 · 광고를 보면 한 번 더 뽑을 수도 있어요
      </p>
    </div>
  );
}
