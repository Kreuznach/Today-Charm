/**
 * src/components/BottomNav.tsx
 * 하단 탭 네비게이션 (오늘 / 기록 / 도감)
 */
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './BottomNav.module.css';

const TABS = [
  { to: '/',           label: '오늘',  icon: '🌸' },
  { to: '/history',   label: '기록',  icon: '📅' },
  { to: '/collection', label: '도감', icon: '📖' },
];

export default function BottomNav() {
  return (
    <nav className={styles.nav}>
      {TABS.map(tab => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/'}
          className={({ isActive }) =>
            [styles.tab, isActive ? styles.active : ''].join(' ')
          }
        >
          <span className={styles.icon}>{tab.icon}</span>
          <span className={styles.label}>{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
