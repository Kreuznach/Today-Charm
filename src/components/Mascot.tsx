/**
 * 앱 친구 "말랑이" — 둥근 떡 모양에 이마에 작은 부적이 붙어 있어요.
 */
import React from 'react';
import styles from './Mascot.module.css';

interface MascotProps {
  size?: number;
  float?: boolean;
}

export function charmImageUrl(name: string): string {
  return `${import.meta.env.BASE_URL}charms/${name}.png`;
}

export default function Mascot({ size = 112, float = true }: MascotProps) {
  return (
    <img
      className={[styles.mascot, float ? styles.float : ''].join(' ')}
      src={charmImageUrl('mallang')}
      width={size}
      height={size}
      alt=""
      aria-hidden
      draggable={false}
    />
  );
}
