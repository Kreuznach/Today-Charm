# 변경 이력 (CHANGELOG)

## [1.2.0] — 2026-05-18

### 앱 ID 변경 및 UX/광고 개선

**변경된 사항:**
- `appName`: `today-charm` → `today-lucky-charm` (AIT 중복 등록 방지)
- 빌드 결과물: `today-charm.ait` → `today-lucky-charm.ait`
- `package.json` name 필드 동기화

**추가된 기능:**
- 광고 ID 2종 분리 관리 (`.env.example`, `.env.local`)
  - `VITE_REWARD_AD_ID`: 재뽑기 리워드 광고 (`ait.v2.live.5c06ff01e75a4884`)
  - `VITE_BANNER_AD_ID`: 기록 페이지 하단 배너 광고 (`ait.v2.live.41ce280c1bfe4683`)
- `BannerAd` 컴포넌트 추가 — `HistoryPage` 하단 배너 광고 영역
- `favicon.ico` 추가 — 분홍 둥근 사각형 + 흰 십자 부적 형상 (16×32×48px)
- `scripts/generate-favicon.cjs` — favicon 재생성 유틸리티
- PC 브라우저 스크롤바: 앱 내부 우측 끝 표시 (`scrollbar-gutter: stable`, 4px thin)

**변경된 파일:**
- `granite.config.ts` — appName 변경
- `package.json` — name 변경
- `src/lib/config.ts` — REWARD_AD_ID, BANNER_AD_ID 분리, `BANNER_AD_ID` export 추가
- `src/components/BannerAd.tsx` + `BannerAd.module.css` — 신규
- `src/pages/HistoryPage.tsx` — BannerAd 임포트 및 하단 배치
- `src/pages/HistoryPage.module.css` — `.banner` 클래스 추가
- `src/index.css` — 스크롤바 스타일 추가
- `index.html` — favicon 링크 추가
- `.env.example`, `.env.local` — 광고 ID 2종 추가
- `public/favicon.ico` — 신규

---

## [1.1.0] — 2026-05-19

### 뽑기 애니메이션 추가

**추가된 기능:**
- `drawing` 중간 Phase: 뽑기 버튼 클릭 후 1200ms 로딩 화면 (🎴 회전+펄스 + 점 이어지기 효과)
- `rerolling` 중간 Phase: 광고 시청 후 재뽑기 시 800ms 로딩 화면 (✨ Y축 회전+골드 글로우)
- CharmCard `animationType` prop 추가 (`'fade'` | `'reveal'` | `'burst'`)
  - `reveal`: 첫 뽑기 등장 — 위에서 내려오며 스프링 바운스 (620ms, cubic-bezier)
  - `burst`: 재뽑기 등장 — 중심에서 확대+회전 (540ms, cubic-bezier)
  - `fade`: 기본값 — 히스토리/도감 목록 아이템 페이드인 (400ms)

**변경된 파일:**
- `src/components/CharmCard.tsx` — `animate` prop → `animationType` prop
- `src/components/CharmCard.module.css` — `.reveal`, `.burst` 키프레임 추가
- `src/pages/TodayPage.tsx` — Phase 타입 확장, handleDraw/handleReroll setTimeout 로직
- `src/pages/TodayPage.module.css` — `.drawingState`, `.drawingCard`, `.rerollingCard`, `.drawingText`, `.dots` 추가

---

## [1.0.0] — 2026-05-18

### 최초 MVP 릴리즈

**추가된 기능:**
- 홈 화면 (오늘 날짜, 뽑기 버튼, 상태 표시)
- 오늘 부적 뽑기 화면 (CharmCard, 저장, 재뽑기)
- 최근 7일 기록 화면 (HistoryPage)
- 부적 24종 도감 (CollectionPage)
- 하단 탭 네비게이션 (BottomNav)
- localStorage 기반 스토리지 레이어 (storage.ts)
- KST 기준 날짜 유틸 (date.ts)
- Toss in App SDK 연동 (GoogleAdMob 리워드 광고 추상화)
- 광고 mock 지원 (개발 환경에서 자동 true 반환)
- 부적 24종 데이터 (charms.ts)

**기술 스택:**
- React 18 + Vite 6 + TypeScript 5
- React Router v6 (HashRouter)
- CSS Modules
- @apps-in-toss/web-framework ^2.1.0

**부적 24종 목록:**
| # | 이름 | 카테고리 | 희귀도 |
|---|------|--------|--------|
| 1 | 기상 성공 부적 | 일상 | 기본 |
| 2 | 집중력 소환 부적 | 일상 | 기본 |
| 3 | 귀찮음 퇴치 부적 | 일상 | 기본 |
| 4 | 멘탈 방어 부적 | 일상 | 특별 |
| 5 | 체력 보존 부적 | 일상 | 기본 |
| 6 | 잠깨움 부적 | 일상 | 기본 |
| 7 | 지갑 방어 부적 | 소비 | 기본 |
| 8 | 충동구매 봉인 부적 | 소비 | 특별 |
| 9 | 혜택 발견 부적 | 소비 | 기본 |
| 10 | 카페값 절제 부적 | 소비 | 기본 |
| 11 | 배달앱 봉인 부적 | 소비 | 특별 |
| 12 | 구독 정리 부적 | 소비 | 시즌 |
| 13 | 말실수 방지 부적 | 인간관계 | 기본 |
| 14 | 답장 용기 부적 | 인간관계 | 기본 |
| 15 | 눈치 상승 부적 | 인간관계 | 기본 |
| 16 | 회의 생존 부적 | 인간관계 | 특별 |
| 17 | 칭찬 수집 부적 | 인간관계 | 기본 |
| 18 | 평온한 인간관계 부적 | 인간관계 | 시즌 |
| 19 | 점심 선택 부적 | 식사 | 기본 |
| 20 | 저녁 메뉴 결정 부적 | 식사 | 기본 |
| 21 | 매운맛 조절 부적 | 식사 | 기본 |
| 22 | 든든한 한 끼 부적 | 식사 | 특별 |
| 23 | 고양이 기운 부적 | 귀여움 | 시즌 |
| 24 | 말랑행운 부적 | 귀여움 | 특별 |

---

## 향후 계획 (Backlog)

- [ ] Supabase 또는 Apps in Toss Storage 마이그레이션
- [ ] 부적 공유 기능 (Toss 친구에게 공유)
- [ ] 시즌 한정 부적 추가 (계절별)
- [ ] 연속 뽑기 기록 뱃지
- [ ] 실제 이미지 에셋 추가
