/**
 * src/pages/TodayPage.tsx
 * 오늘의 부적 뽑기 및 결과 화면
 * - 첫 뽑기 → 결과 표시 + "저장" 버튼 + "광고 보고 한 번 더" 버튼
 * - 재뽑기 후 → 두 번째 결과를 최종 저장, 변경 불가
 */
import React, { useEffect, useState, useCallback } from 'react';
import CharmCard from '../components/CharmCard';
import PrimaryButton from '../components/PrimaryButton';
import { getTodayKST } from '../lib/date';
import { getTodayRecord, saveTodayRecord } from '../lib/storage';
import { drawRandomCharm } from '../data/charms';
import { showRewardAd } from '../lib/config';
import type { CharmResult, DailyCharmRecord } from '../types/charm';
import styles from './TodayPage.module.css';

type Phase =
  | 'idle'        // 아직 뽑지 않음
  | 'drawing'     // 첫 뽑기 애니메이션 중
  | 'first'       // 첫 번째 뽑기 결과
  | 'saved'       // 저장 완료 (재뽑기 전)
  | 'rerolling'   // 재뽑기 애니메이션 중
  | 'final';      // 최종 저장 (재뽑기 후 or 바로 저장)

export default function TodayPage() {
  const today = getTodayKST();
  const [phase, setPhase] = useState<Phase>('idle');
  const [firstCharm, setFirstCharm] = useState<CharmResult | null>(null);
  const [finalCharm, setFinalCharm] = useState<CharmResult | null>(null);
  const [adLoading, setAdLoading] = useState(false);

  // 이미 뽑은 기록이 있으면 복원
  useEffect(() => {
    const record = getTodayRecord(today);
    if (record) {
      setFirstCharm(record.firstCharm ?? record.finalCharm);
      setFinalCharm(record.finalCharm);
      setPhase(record.rerolled ? 'final' : 'saved');
    }
  }, [today]);

  const handleDraw = useCallback(() => {
    // 1. 먼저 뽑기 애니메이션 phase로 전환
    setPhase('drawing');
    // 2. 1200ms 후 실제 부적 공개
    setTimeout(() => {
      const charm = drawRandomCharm();
      setFirstCharm(charm);
      setPhase('first');
    }, 1200);
  }, []);

  const handleSave = useCallback(() => {
    if (!firstCharm) return;
    const record: DailyCharmRecord = {
      date: today,
      firstCharm,
      finalCharm: firstCharm,
      rerolled: false,
      createdAt: new Date().toISOString(),
    };
    saveTodayRecord(record);
    setFinalCharm(firstCharm);
    setPhase('saved');
  }, [firstCharm, today]);

  const handleReroll = useCallback(async () => {
    if (!firstCharm) return;
    setAdLoading(true);
    try {
      const rewarded = await showRewardAd();
      if (!rewarded) {
        setAdLoading(false);
        return;
      }
      // 재뽑기 애니메이션 phase 전환
      setPhase('rerolling');
      setAdLoading(false);
      // 800ms 후 새 부적 공개
      setTimeout(() => {
        const newCharm = drawRandomCharm(firstCharm.charmId);
        const record: DailyCharmRecord = {
          date: today,
          firstCharm,
          finalCharm: newCharm,
          rerolled: true,
          createdAt: new Date().toISOString(),
        };
        saveTodayRecord(record);
        setFinalCharm(newCharm);
        setPhase('final');
      }, 800);
    } finally {
      setAdLoading(false);
    }
  }, [firstCharm, today]);

  // ── 렌더링 ─────────────────────────────────────────────

  if (phase === 'idle') {
    return (
      <div className={styles.page}>
        <div className={styles.emptyState}>
          <span className={styles.emptyEmoji}>🎴</span>
          <h2 className={styles.emptyTitle}>오늘의 말랑부적을 뽑아봐요</h2>
          <p className={styles.emptyDesc}>
            하루에 한 번 뽑을 수 있어요.
            <br />
            광고를 보면 한 번 더 뽑을 수 있지만,
            <br />
            두 번째 결과가 최종 부적이 돼요.
          </p>
          <PrimaryButton onClick={handleDraw}>지금 뽑기 🎴</PrimaryButton>
        </div>
      </div>
    );
  }

  // ── 뽑기 로딩 화면 ───────────────────────────────────
  if (phase === 'drawing') {
    return (
      <div className={styles.page}>
        <div className={styles.drawingState}>
          <span className={styles.drawingCard}>🎴</span>
          <p className={styles.drawingText}>오늘의 부적을 뽑는 중<span className={styles.dots}>...</span></p>
        </div>
      </div>
    );
  }

  // ── 재뽑기 로딩 화면 ─────────────────────────────────
  if (phase === 'rerolling') {
    return (
      <div className={styles.page}>
        <div className={styles.drawingState}>
          <span className={styles.rerollingCard}>✨</span>
          <p className={styles.drawingText}>새로운 부적을 찾는 중<span className={styles.dots}>...</span></p>
        </div>
      </div>
    );
  }

  const displayCharm = phase === 'final' ? finalCharm! : (phase === 'saved' ? finalCharm! : firstCharm!);
  const animationType =
    phase === 'first' ? 'reveal' as const :
    phase === 'final' && finalCharm?.charmId !== firstCharm?.charmId ? 'burst' as const :
    'fade' as const;

  return (
    <div className={styles.page}>
      {/* 상태 배지 */}
      <div className={styles.statusBadge}>
        {phase === 'final'
          ? '✅ 오늘의 최종 부적'
          : phase === 'saved'
          ? '✅ 저장된 부적 · 한 번 더 뽑을 수 있어요'
          : '🎴 오늘의 말랑부적'}
      </div>

      {/* 부적 카드 */}
      <CharmCard
        charm={displayCharm}
        key={displayCharm.charmId + phase}
        animationType={animationType}
      />

      {/* 액션 버튼 */}
      <div className={styles.actions}>
        {phase === 'first' && (
          <>
            <PrimaryButton onClick={handleSave}>
              오늘 부적으로 저장
            </PrimaryButton>
            <PrimaryButton variant="ghost" onClick={handleReroll} loading={adLoading}>
              광고 보고 한 번 더 뽑기
            </PrimaryButton>
          </>
        )}
        {phase === 'saved' && (
          <PrimaryButton variant="ghost" onClick={handleReroll} loading={adLoading}>
            광고 보고 한 번 더 뽑기
          </PrimaryButton>
        )}
        {phase === 'final' && (
          <p className={styles.finalNotice}>
            오늘의 부적은 확정됐어요. 내일 다시 뽑아봐요 🌸
          </p>
        )}
      </div>
    </div>
  );
}
