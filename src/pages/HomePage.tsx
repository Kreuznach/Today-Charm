/**
 * src/pages/HomePage.tsx
 * 홈 화면 — 앱 타이틀, 오늘 날짜, 뽑기 버튼
 */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../components/PrimaryButton';
import { getTodayKST, formatDateKST } from '../lib/date';
import { getTodayRecord } from '../lib/storage';
import type { DailyCharmRecord } from '../types/charm';
import styles from './HomePage.module.css';

export default function HomePage() {
  const navigate = useNavigate();
  const today = getTodayKST();
  const [record, setRecord] = useState<DailyCharmRecord | null>(null);

  useEffect(() => {
    setRecord(getTodayRecord(today));
  }, [today]);

  return (
    <div className={styles.page}>
      {/* 앱 헤더 */}
      <div className={styles.header}>
        <span className={styles.logo}>🌸</span>
        <h1 className={styles.title}>오늘의 말랑부적</h1>
        <p className={styles.date}>{formatDateKST(today)}</p>
      </div>

      {/* 메인 카드 */}
      <div className={styles.heroCard}>
        {record ? (
          /* 이미 뽑은 경우 */
          <>
            <div className={styles.heroEmoji}>✅</div>
            <h2 className={styles.heroTitle}>오늘의 부적이 준비됐어요!</h2>
            <p className={styles.heroDesc}>
              오늘의 말랑부적은 <strong>{record.finalCharm.charmName}</strong>이에요.
            </p>
          </>
        ) : (
          /* 아직 안 뽑은 경우 */
          <>
            <div className={styles.heroEmoji}>🎴</div>
            <h2 className={styles.heroTitle}>오늘의 부적을 뽑아봐요</h2>
            <p className={styles.heroDesc}>
              하루에 한 번, 오늘 하루를 가볍고 귀엽게 버틸 수 있는 부적을 뽑아보세요.
            </p>
          </>
        )}
      </div>

      {/* CTA 버튼 */}
      <div className={styles.actions}>
        {record ? (
          <PrimaryButton onClick={() => navigate('/today')}>
            오늘의 말랑부적 보기
          </PrimaryButton>
        ) : (
          <PrimaryButton onClick={() => navigate('/today')}>
            오늘의 말랑부적 뽑기 🎴
          </PrimaryButton>
        )}
      </div>

      {/* 안내 문구 */}
      <p className={styles.notice}>
        ✦ 하루 한 번 뽑을 수 있어요 · 광고 보고 한 번 더 뽑기 가능
      </p>
    </div>
  );
}
