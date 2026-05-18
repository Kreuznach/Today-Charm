# 아키텍처 문서 — 오늘의 말랑부적

## 1. 프로젝트 개요

| 항목 | 값 |
|------|-----|
| 서비스명 | 오늘의 말랑부적 |
| 앱 ID | today-lucky-charm |
| 플랫폼 | Toss in App (AIT) Mini-App |
| 기술 스택 | React 18 + Vite 6 + TypeScript 5 |

---

## 2. 디렉터리 구조

```
today-lucky-charm/
├── src/
│   ├── types/
│   │   └── charm.ts          # 공유 TypeScript 타입 정의
│   ├── data/
│   │   └── charms.ts         # 부적 24종 데이터 & 유틸리티
│   ├── lib/
│   │   ├── date.ts           # KST 날짜 유틸리티
│   │   ├── storage.ts        # localStorage 추상화 레이어
│   │   └── config.ts         # AIT SDK 래퍼 (광고 추상화)
│   ├── components/
│   │   ├── PrimaryButton.tsx / .module.css
│   │   ├── BottomNav.tsx / .module.css
│   │   └── CharmCard.tsx / .module.css
│   ├── pages/
│   │   ├── HomePage.tsx / .module.css      # /
│   │   ├── TodayPage.tsx / .module.css     # /today
│   │   ├── HistoryPage.tsx / .module.css   # /history
│   │   └── CollectionPage.tsx / .module.css # /collection
│   ├── App.tsx               # 라우팅 진입점 (HashRouter)
│   ├── main.tsx              # React 마운트
│   └── index.css             # 글로벌 CSS (CSS 변수 정의)
├── docs/                     # 운영/개발 문서
│   ├── INTRODUCTION.md       # 서비스 기획 문서
│   ├── ARCHITECTURE.md       # 현재 파일
│   ├── DEPLOYMENT.md         # 배포 가이드
│   └── CHANGELOG.md          # 변경 이력
├── granite.config.ts         # AIT 미니앱 설정
├── vite.config.ts            # Vite 빌드 설정
├── tsconfig.json             # TypeScript 설정
├── package.json
└── .gitignore
```

---

## 3. 화면 구조 & 라우팅

```
HashRouter
├── / → HomePage
│         홈 화면 (날짜, 오늘 상태, 뽑기 CTA)
├── /today → TodayPage
│         오늘 부적 뽑기 (Phase State Machine)
├── /history → HistoryPage
│         최근 7일 기록
└── /collection → CollectionPage
          부적 24종 도감
```

> **HashRouter 선택 이유**: `.ait` WebView 환경에서 BrowserRouter의 HTML5 History API가 동작하지 않기 때문에 HashRouter를 사용합니다.

---

## 4. 핵심 모듈 상세

### 4.1 `src/types/charm.ts` — 타입 정의

```typescript
type CharmCategory = 'daily' | 'spending' | 'social' | 'meal' | 'cute'
type CharmRarity = 'basic' | 'special' | 'seasonal'

interface CharmResult { ... }      // 부적 1종의 전체 데이터
interface DailyCharmRecord { ... } // 하루치 뽑기 기록
interface CharmCollectionItem { ... } // 도감 수집 현황
```

### 4.2 `src/data/charms.ts` — 부적 데이터

- `CHARMS`: 24종 부적 배열
- `drawRandomCharm(excludeId?)`: 가중치 없는 랜덤 뽑기 (재뽑기 시 이전 부적 제외)
- `getCategoryEmoji()`, `getCategoryLabel()`, `getCharmEmoji()`: 렌더링 헬퍼

### 4.3 `src/lib/date.ts` — KST 날짜

- 외부 라이브러리 없이 UTC+9 오프셋을 수동 적용
- `getTodayKST()` → `'YYYY-MM-DD'` 형식의 당일 KST 날짜
- 일별 날짜 키로 localStorage 레코드를 식별

### 4.4 `src/lib/storage.ts` — 스토리지 레이어

```
localStorage
├── 'charm_records'     → DailyCharmRecord[]  (날짜별 뽑기 기록)
└── 'charm_collection'  → CharmCollectionItem[] (누적 도감 데이터)
```

`saveTodayRecord()` 호출 시 `updateCollection()` 을 내부적으로 호출하여 도감 동기화.

> **설계 의도**: 인터페이스 레이어로 추상화되어 있어 향후 Supabase 또는 Apps in Toss Storage 로 교체 시 이 파일만 수정하면 됩니다.

### 4.5 `src/lib/config.ts` — AIT SDK 래퍼

```typescript
// 항상 프로덕션 광고 ID 사용 (테스트/프로덕션 분기 없음)
// AIT 미지원 환경(개발/브라우저)에서는 리워드 광고 Mock 반환

closeApp()              // AIT WebView 닫기
showRewardAd()          // 리워드 광고 (재뽑기용), mock 지원
REWARD_AD_ID            // 리워드 광고 ID export
BANNER_AD_ID            // 배너 광고 ID export
isBannerAdSupported()   // TossAds.attachBanner.isSupported() 래퍼
```

**광고 ID 구성:**

| 환경변수 | 용도 | 기본값 (프로덕션 ID) |
|----------|------|---------------------|
| `VITE_REWARD_AD_ID` | 광고 시청 후 재뽑기 (리워드) | `ait.v2.live.5c06ff01e75a4884` |
| `VITE_BANNER_AD_ID` | 기록 페이지 하단 배너 (노출형) | `ait.v2.live.41ce280c1bfe4683` |

### 4.6 `src/components/BannerAd.tsx` — 배너 광고 컴포넌트

- AIT 환경: `TossAds.attachBanner(adGroupId, target, options)` 로 배너 삽입
  - `onAdFailedToRender` / `onNoFill` 콜백 → 광고 영역 자동 숨김
  - cleanup: `result.destroy()` 호출 (컴포넌트 언마운트 시)
- 개발/브라우저: placeholder 영역 표시
- `HistoryPage` 하단에 마운트됨

---

## 5. TodayPage 상태 머신

```
'idle'
  ↓ handleDraw() — 즉시
'drawing' (뽑기 로딩 화면, 1200ms)
  ↓ setTimeout 완료
'first' (첫 뽑기 완료, animationType='reveal')
  ├── "저장" → 'saved' (finalCharm = firstCharm, rerolled: false)
  └── "광고 보고 한 번 더" → showRewardAd() → 'rerolling' (800ms)
'saved'
  └── "광고 보고 한 번 더" → showRewardAd() → 'rerolling' (800ms)
'rerolling' (재뽑기 로딩 화면, 800ms)
  ↓ setTimeout 완료
'final' (재뽑기 완료, animationType='burst', 더 이상 행동 없음)
```

### 애니메이션 상세

| Phase 전환 | 로딩 화면 | 카드 등장 |
|------------|----------|----------|
| idle → drawing → first | 🎴 회전+펄스 (1200ms) | `reveal`: 위에서 내려오며 스프링 |
| first/saved → rerolling → final | ✨ Y축 회전+글로우 (800ms) | `burst`: 중심에서 확대+회전 |
| 기타(히스토리·도감) | — | `fade`: 아래에서 페이드인 |

---

## 6. 빌드 파이프라인

```
npm run build
  └── vite build
        ├── base: './'
        ├── manualChunks: undefined (단일 번들)
        └── → dist/

npm run build:ait
  └── ait build
        └── dist/ → today-lucky-charm.ait
```

> AIT 빌드 결과물: `today-lucky-charm.ait` (appName 기준)

---

## 7. 색상 팔레트 (CSS 변수)

| 변수 | 값 | 용도 |
|------|----|------|
| `--pink` | `#FF8FAB` | 메인 포인트 색상 |
| `--pink-dark` | `#E0637E` | 그림자, hover |
| `--pink-light` | `#FFD6E0` | 배경, secondary |
| `--cream` | `#FFF8F0` | 앱 배경 |
| `--text-main` | `#3D2B1F` | 본문 텍스트 |
| `--text-sub` | `#8B7355` | 보조 텍스트 |

---

## 8. 보안 고려사항

- **개인정보 없음**: localStorage에 부적 기록만 저장, 사용자 식별 정보 없음
- **광고 ID 관리**: 항상 프로덕션 광고 ID 사용; 환경변수(`VITE_REWARD_AD_ID`, `VITE_BANNER_AD_ID`)로 오버라이드 가능
- **XSS 방지**: 모든 렌더링은 React JSX를 통해 자동 이스케이프
- **외부 네트워크 없음**: 모든 데이터는 로컬, API 호출 없음
