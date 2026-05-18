/**
 * src/components/BannerAd.tsx
 * AIT 노출형 배너 광고 컴포넌트
 * - AIT 환경: GoogleAdMob.showAppsInTossBannerAd 로 배너 삽입
 * - 개발/브라우저: placeholder 영역 표시
 */
import React, { useEffect, useRef } from 'react';
import { GoogleAdMob } from '@apps-in-toss/web-framework';
import { BANNER_AD_ID } from '../lib/config';
import styles from './BannerAd.module.css';

function _isBannerSupported(): boolean {
  try {
    return (GoogleAdMob as any).showAppsInTossBannerAd?.isSupported?.() === true;
  } catch {
    return false;
  }
}

interface BannerAdProps {
  className?: string;
}

export default function BannerAd({ className }: BannerAdProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!_isBannerSupported() || !containerRef.current) return;

    // AIT 배너 광고 표시
    try {
      const cleanup = (GoogleAdMob as any).showAppsInTossBannerAd({
        options: { adGroupId: BANNER_AD_ID },
        container: containerRef.current,
        onError: () => {
          // 광고 로드 실패 시 컨테이너 숨김
          if (containerRef.current) {
            containerRef.current.style.display = 'none';
          }
        },
      });
      if (typeof cleanup === 'function') {
        cleanupRef.current = cleanup;
      }
    } catch {
      if (containerRef.current) {
        containerRef.current.style.display = 'none';
      }
    }

    return () => {
      cleanupRef.current?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={[styles.bannerContainer, className].filter(Boolean).join(' ')}
      aria-label="광고"
    >
      {!_isBannerSupported() && (
        <div className={styles.placeholder}>
          <span className={styles.adLabel}>AD</span>
          <span className={styles.adText}>오늘의 말랑부적 배너 광고 영역</span>
        </div>
      )}
    </div>
  );
}
