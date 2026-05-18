/**
 * src/components/BannerAd.tsx
 * AIT 노출형 배너 광고 컴포넌트
 *
 * SDK API: TossAds.attachBanner(adGroupId, target, options?)
 *   - AIT 환경에서만 동작 (TossAds.attachBanner.isSupported())
 *   - 개발/브라우저: placeholder 영역 표시
 *   - 광고 미채움(onNoFill) 또는 렌더 실패 시 영역 자동 숨김
 */
import React, { useEffect, useRef, useState } from 'react';
import { TossAds } from '@apps-in-toss/web-framework';
import { BANNER_AD_ID, isBannerAdSupported } from '../lib/config';
import styles from './BannerAd.module.css';

interface BannerAdProps {
  className?: string;
}

export default function BannerAd({ className }: BannerAdProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const destroyRef = useRef<(() => void) | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!isBannerAdSupported() || !containerRef.current) return;

    try {
      const result = TossAds.attachBanner(BANNER_AD_ID, containerRef.current, {
        theme: 'light',
        callbacks: {
          onAdFailedToRender: () => setHidden(true),
          onNoFill: () => setHidden(true),
        },
      });
      destroyRef.current = result.destroy;
    } catch {
      setHidden(true);
    }

    return () => {
      destroyRef.current?.();
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={containerRef}
      className={[styles.bannerContainer, className].filter(Boolean).join(' ')}
      aria-label="광고"
    >
      {!isBannerAdSupported() && (
        <div className={styles.placeholder}>
          <span className={styles.adLabel}>AD</span>
          <span className={styles.adText}>배너 광고 영역 ({BANNER_AD_ID})</span>
        </div>
      )}
    </div>
  );
}

