# 코드가 어떻게 나뉘어 있나요?

이 문서는 **오늘의 말랑부적** 코드가 어디에 있고, 어떻게 이어지는지 설명합니다.
프로그래밍을 조금 아는 사람이면 따라올 수 있게 썼어요.

| 항목 | 값 |
|------|-----|
| 앱 이름 | 오늘의 말랑부적 |
| 앱 ID | `today-lucky-charm` |
| 어디서 열리나 | 토스 앱 안 웹뷰 (AIT) |
| 만든 도구 | React 18 + Vite 6 + TypeScript 5 |
| 앱인토스 SDK | `@apps-in-toss/web-framework` 3.4.0 (토스 권장 최소 버전 3.1 이상) |

---

## 2. 폴더는 이렇게 나뉩니다

```
today-lucky-charm/
├── src/
│   ├── types/charm.ts            # 자료 모양
│   ├── data/charms.ts            # 부적 24종
│   ├── lib/
│   │   ├── date.ts               # 한국 시간 날짜
│   │   ├── storage.ts            # 브라우저 저장, 연속 방문
│   │   ├── season.ts             # 시즌 부적이 열리는 계절
│   │   ├── share.ts              # 부적 보내기
│   │   ├── referrer.ts           # 들어온 문 기억
│   │   ├── notify.ts             # 알림 받기 기억
│   │   └── config.ts             # 광고, 앱 닫기
│   ├── components/
│   │   ├── PrimaryButton.tsx
│   │   ├── BottomNav.tsx         # 떠 있는 알약 탭바
│   │   ├── CharmArt.tsx          # 부적 문양
│   │   ├── CharmCard.tsx
│   │   └── BannerAd.tsx
│   ├── pages/                    # 화면 네 장
│   ├── App.tsx                   # 화면 연결
│   ├── main.tsx                  # 앱을 화면에 붙이는 시작점
│   └── index.css                 # 공통 색과 레이아웃
├── docs/                         # 설명 문서
├── apps-in-toss.config.ts        # 토스 미니앱 설정
├── vite.config.ts                # 빌드 설정
└── package.json
```

---

## 3. 화면은 어떻게 이어지나요?

```
HashRouter
├── /            → HomePage        홈
├── /today       → TodayPage       뽑기와 결과
├── /history     → HistoryPage     최근 7일
└── /collection  → CollectionPage  도감
```

주소 앞에 `#`이 붙는 `HashRouter`를 씁니다.
토스 웹뷰에서는 일반 브라우저처럼 주소를 바꾸기 어려워서, `#` 뒤만 바꿉니다.

아래쪽 탭은 [src/components/BottomNav.tsx](../src/components/BottomNav.tsx)입니다.
토스 메인 탭과 헷갈리지 않게, 화면 맨 아래에 붙이지 않고 **둥근 알약**이 떠 있게 그립니다.
탭은 오늘 / 기록 / 도감 3개입니다. 규칙상 2~5개만 쓸 수 있습니다.

---

## 4. 중요한 파일

### 4.1 [src/types/charm.ts](../src/types/charm.ts) — 자료 모양

```typescript
type CharmCategory = 'daily' | 'spending' | 'social' | 'meal' | 'cute'
type CharmRarity = 'basic' | 'special' | 'seasonal'

interface CharmResult { ... }         // 부적 한 장
interface DailyCharmRecord { ... }    // 하루 기록
interface CharmCollectionItem { ... } // 도감 한 칸
```

### 4.2 [src/data/charms.ts](../src/data/charms.ts) — 부적 목록

- `CHARMS`: 부적 24장
- `drawRandomCharm(excludeId?, date?)`: 아무거나 하나 뽑기. 다시 뽑을 때는 방금 나온 부적은 빼요. 시즌이 아니면 시즌 부적도 빼요.
- `getCharmStory()`: 같은 부적을 다시 만나면 다른 한 줄을 줘요.
- `getCategoryEmoji()`, `getCategoryLabel()`, `getCharmEmoji()`: 작은 표시용 도우미

### 4.3 [src/lib/date.ts](../src/lib/date.ts) — 한국 시간

다른 날짜 라이브러리는 쓰지 않습니다.
지금 시각에 9시간을 더해 한국 날짜(`YYYY-MM-DD`)를 만듭니다.
이 날짜가 저장소의 열쇠입니다.

### 4.4 [src/lib/storage.ts](../src/lib/storage.ts) — 저장소

```
localStorage
├── 'charm_records'     → 날짜별 뽑기 기록
└── 'charm_collection'  → 도감
```

`getStreak()`은 하루도 안 빼고 뽑은 날 수를 셉니다.
`setTodayUsageDone()`은 “오늘 해 볼 일” 체크만 기억합니다.
`saveTodayRecord()`를 부르면 도감도 같이 고칩니다.
나중에 저장 방식을 바꿔도, 이 파일의 함수 이름만 같으면 화면 코드는 거의 안 건드려도 됩니다.

### 4.5 [src/lib/config.ts](../src/lib/config.ts) — 광고와 앱 닫기

항상 실제 광고 ID를 씁니다. 테스트용 ID로 나누지 않습니다.
컴퓨터 브라우저처럼 토스 SDK가 없으면, 광고는 연습용으로 성공한 것처럼 처리합니다.

| 이름 | 하는 일 |
|------|---------|
| `closeApp()` | 미니앱 닫기 |
| `showRewardAd()` | 다시 뽑기용 광고 |
| `REWARD_AD_ID` | 다시 뽑기 광고 ID |
| `BANNER_AD_ID` | 배너 광고 ID |
| `isBannerAdSupported()` | 배너를 붙일 수 있는지 |

| 환경 변수 | 쓰는 곳 |
|-----------|---------|
| `VITE_REWARD_AD_ID` | 광고 보고 다시 뽑기 |
| `VITE_BANNER_AD_ID` | 기록 화면 아래 배너 |

### 4.6 [src/components/BannerAd.tsx](../src/components/BannerAd.tsx) — 배너

토스 안에서는 `TossAds.attachBanner`로 배너를 붙입니다.
광고가 안 나오면 자리를 숨깁니다.
화면이 사라질 때 `destroy()`로 정리합니다.
컴퓨터 브라우저에서는 “광고 자리”만 보여 줍니다.
기록 화면 아래에 붙어 있습니다.

---

## 5. 오늘 화면의 상태

`TodayPage`는 지금 어느 단계인지 `phase`로 기억합니다.

```
idle          아직 안 뽑음
  ↓ 뽑기
drawing       1.2초 동안 뽑는 중
  ↓
first         첫 부적. 저장하거나 다시 뽑기
  ├── 저장 → saved
  └── 광고  → rerolling
saved         저장함. 그래도 한 번 더 뽑을 수 있음
  └── 광고  → rerolling
rerolling     0.8초 동안 다시 찾는 중
  ↓
final         오늘의 부적. 더 이상 못 바꿈
```

| 언제 | 기다리는 화면 | 카드가 나타나는 방법 |
|------|---------------|----------------------|
| 처음 뽑을 때 | 🎴 1.2초 | `reveal` 위에서 내려옴 |
| 다시 뽑을 때 | ✨ 0.8초 | `burst` 가운데에서 커짐 |
| 그 외 | 없음 | `fade` 아래에서 서서히 |

---

## 6. 완성본을 만드는 방법

```
npm run build
  └── vite가 dist/ 폴더를 만듭니다.
      JS와 CSS는 되도록 한 파일로 묶습니다.

npm run build:ait
  └── dist/를 today-lucky-charm.ait 로 묶습니다.
```

파일 이름은 [apps-in-toss.config.ts](../apps-in-toss.config.ts)의 `appName`을 따릅니다.

---

## 7. 색깔

공통 색은 [src/index.css](../src/index.css)의 CSS 변수입니다.

| 변수 | 값 | 쓰는 곳 |
|------|----|---------|
| `--pink` | `#FF8FAB` | 중요한 색 |
| `--pink-dark` | `#E0637E` | 그림자, 손가락을 올렸을 때 |
| `--pink-light` | `#FFD6E0` | 연한 배경 |
| `--cream` | `#FFF8F0` | 앱 배경 |
| `--text-main` | `#3D2B1F` | 본문 |
| `--text-sub` | `#8B7355` | 보조 글 |

---

## 8. 안전하게 지키려는 것

- 이름, 전화번호 같은 개인정보는 저장하지 않습니다. 부적 기록만 남깁니다.
- 광고 ID는 코드에 있는 실제 ID를 쓰되, 환경 변수로 바꿀 수 있습니다.
- 화면에 글자를 그릴 때는 React JSX를 써서, 이상한 코드가 그대로 실행되지 않게 합니다.
- 부적 데이터는 앱 안에 들어 있습니다. 기록을 위해 다른 서버로 보내지 않습니다.
