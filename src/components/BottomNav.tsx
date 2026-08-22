/**
 * src/components/BottomNav.tsx
 * 토스 미니앱 브랜딩 가이드의 플로팅 탭바
 *
 * 화면 맨 아래에 붙는 긴 막대는 토스 메인 탭과 헷갈릴 수 있어요.
 * 그래서 둥근 알약 모양이 화면 위에 떠 있게 만들어요.
 * 탭은 2~5개만 쓸 수 있어요. 지금은 오늘 / 기록 / 도감 3개예요.
 */
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './BottomNav.module.css';

const TABS = [
  { to: '/',           label: '오늘', icon: HomeIcon },
  { to: '/history',    label: '기록', icon: HistoryIcon },
  { to: '/collection', label: '도감', icon: BookIcon },
];

export default function BottomNav() {
  return (
    <nav className={styles.dock} aria-label="화면 이동">
      <div className={styles.bar}>
        {TABS.map(tab => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.to === '/'}
            className={({ isActive }) =>
              [styles.tab, isActive ? styles.active : ''].join(' ')
            }
          >
            <tab.icon />
            <span className={styles.label}>{tab.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

function HomeIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3.6 3.8 10.2c-.3.2-.3.7 0 .9l.7.6c.2.1.5.1.7 0L12 6.4l6.8 5.3c.2.1.5.1.7 0l.7-.6c.3-.2.3-.7 0-.9L12 3.6Z" />
      <path d="M6.4 12.2v7.1c0 .6.5 1.1 1.1 1.1h3.1v-4.2c0-.4.3-.7.7-.7h1.4c.4 0 .7.3.7.7v4.2h3.1c.6 0 1.1-.5 1.1-1.1v-7.1L12 7.8 6.4 12.2Z" />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.1 3.4c.5 0 .9.4.9.9V5h6V4.3c0-.5.4-.9.9-.9s.9.4.9.9V5h.7c1.4 0 2.5 1.1 2.5 2.5v11c0 1.4-1.1 2.5-2.5 2.5H6.5C5.1 21 4 19.9 4 18.5v-11C4 6.1 5.1 5 6.5 5h.7V4.3c0-.5.4-.9.9-.9ZM6.5 9.4v9.1c0 .3.2.5.5.5h10c.3 0 .5-.2.5-.5V9.4H6.5Z" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.4 3.8h9.8c1.3 0 2.4 1.1 2.4 2.4v13.2c0 .6-.6 1-1.2.8l-11-2.1c-.8-.2-1.4-.9-1.4-1.7V6.2c0-1.3 1.1-2.4 2.4-2.4Zm1.6 4.2c-.4 0-.7.3-.7.7s.3.7.7.7h6.6c.4 0 .7-.3.7-.7s-.3-.7-.7-.7H8Zm0 3.2c-.4 0-.7.3-.7.7s.3.7.7.7h5.2c.4 0 .7-.3.7-.7s-.3-.7-.7-.7H8Z" />
    </svg>
  );
}
