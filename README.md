# 오늘의 말랑부적 (Today Charm)

React + Vite + TypeScript 기반 Toss in App WebView 미니앱

하루에 한 번 귀여운 부적 카드를 뽑고, 오늘의 응원 메시지와 사용법을 확인하는 앱입니다.

---

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 시작 (http://localhost:5173)
npm run dev

# 타입 체크
npm run typecheck
```

## 빌드 방법

```bash
# Vite 빌드 (dist/ 폴더 생성)
npm run build

# Vite 빌드 미리보기
npm run preview

# AIT(.ait) 번들 생성 (Toss 배포용)
npm run build:ait
```

## 프로젝트 구조

```
src/
├── types/
│   └── charm.ts          # 공통 타입 정의
├── data/
│   └── charms.ts         # 부적 24종 사전 + 유틸 함수
├── lib/
│   ├── date.ts           # KST 기준 날짜 유틸
│   ├── storage.ts        # localStorage 스토리지 레이어
│   └── config.ts         # AIT SDK 연동 + 광고 추상화
├── components/
│   ├── PrimaryButton.tsx # 메인 CTA 버튼
│   ├── BottomNav.tsx     # 하단 탭 네비게이션
│   └── CharmCard.tsx     # 부적 카드 UI
├── pages/
│   ├── HomePage.tsx      # 홈 화면 (/)
│   ├── TodayPage.tsx     # 오늘 부적 뽑기/결과 (/today)
│   ├── HistoryPage.tsx   # 최근 7일 기록 (/history)
│   └── CollectionPage.tsx# 부적 도감 (/collection)
└── App.tsx               # 라우팅 설정
```

## 화면 구성

| 경로 | 화면 | 설명 |
|------|------|------|
| `/` | HomePage | 앱 타이틀, 날짜, 뽑기 버튼 |
| `/today` | TodayPage | 부적 뽑기 및 결과 확인 |
| `/history` | HistoryPage | 최근 7일 부적 기록 |
| `/collection` | CollectionPage | 부적 24종 도감 |

## 주요 동작 흐름

1. 오늘 처음 방문 → 뽑기 버튼 → 첫 번째 부적 표시
2. "오늘 부적으로 저장" 버튼 → `DailyCharmRecord` localStorage 저장
3. "광고 보고 한 번 더 뽑기" → `showRewardAd()` 실행 → 새 부적 뽑기 → 자동 최종 저장
4. 같은 날 재접속 시 → 저장된 최종 부적 표시 (변경 불가)

## Toss in App 배포 시 고려사항

### 1. granite.config.ts 설정

```ts
export default defineConfig({
  appName: 'today-charm',
  brand: {
    displayName: '오늘의 말랑부적',
    icon: '실제 아이콘 URL',    // Toss 파트너 콘솔에서 발급
    primaryColor: '#FF8FAB',
  },
});
```

### 2. 광고 ID 교체

`src/lib/config.ts`의 `AD_GROUP_ID_PROD`를 AIT 대시보드에서 발급받은 실제 ID로 교체:

```ts
const AD_GROUP_ID_PROD = 'ait.v2.live.YOUR_ACTUAL_ID';
```

### 3. 환경 변수

```bash
# .env.local 생성
VITE_AD_ENV=production   # 배포 시
```

### 4. AIT 빌드 및 제출

```bash
npm run build:ait
# today-charm.ait 파일 생성 → Toss 파트너 콘솔에 업로드
```

### 5. 정책 준수 확인

- ✅ 실제 효험/점술/운세 암시 없음
- ✅ 금전 보상 없음
- ✅ 광고 후 재뽑기 하루 1회 제한
- ✅ 종교적/무속적 이미지 없음

## 스토리지 레이어 교체

현재 `src/lib/storage.ts`는 `localStorage`를 사용합니다.  
추후 Apps in Toss Storage 또는 Supabase로 교체 시 이 파일만 수정하면 됩니다.

```ts
// storage.ts 인터페이스 유지
export function getTodayRecord(date: string): DailyCharmRecord | null { ... }
export function saveTodayRecord(record: DailyCharmRecord): void { ... }
export function getRecentRecords(dates: string[]): DailyCharmRecord[] { ... }
export function getCollection(): CharmCollectionItem[] { ... }
```