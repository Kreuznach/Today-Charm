/**
 * src/components/PrimaryButton.tsx
 * Toss 스타일의 메인 CTA 버튼
 */
import React from 'react';
import styles from './PrimaryButton.module.css';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
  loading?: boolean;
}

export default function PrimaryButton({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  fullWidth = true,
  loading = false,
}: PrimaryButtonProps) {
  return (
    <button
      className={[
        styles.btn,
        styles[variant],
        fullWidth ? styles.fullWidth : '',
        loading ? styles.loading : '',
      ].join(' ')}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? <span className={styles.spinner} /> : children}
    </button>
  );
}
