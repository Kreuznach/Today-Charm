# 오늘의 말랑부적 (Today Charm)

하루에 한 번, 귀여운 부적 카드를 뽑는 미니앱입니다.

진짜 운세나 점 보는 앱이 아니에요.
오늘 하루를 조금 더 가볍게 버티도록 응원 메시지를 보여 주는 앱입니다.

이 프로젝트는 **React + Vite + TypeScript**로 만들었습니다.
토스 앱 안에서 열리는 작은 웹앱(Apps in Toss, 줄여서 AIT)으로 쓸 수 있게 준비되어 있어요.

---

## 이 앱이 하는 일

1. 사용자는 하루에 한 번 부적을 뽑습니다.
2. 부적 카드에는 응원 말, 오늘 해 볼 일, 피하면 좋은 일이 적혀 있습니다.
3. 광고를 보면 같은 날 한 번 더 뽑을 수 있습니다.
4. 두 번째로 나온 부적이 오늘의 부적이 됩니다.
5. 같은 날에는 더 이상 바꿀 수 없습니다.

돈, 포인트, 쿠폰 같은 보상은 주지 않습니다.

---

## 컴퓨터에서 실행하기

이 폴더에서 아래 명령을 순서대로 입력하세요.

```bash
# 1. 필요한 패키지 설치
npm install

# 2. 개발 서버 켜기 (브라우저에서 http://localhost:5173)
npm run dev

# 3. 타입 오류가 있는지 확인
npm run typecheck
```

### 빌드하기

```bash
# 웹 파일로 만들기 (dist/ 폴더가 생깁니다)
npm run build

# 만든 결과를 미리 보기
npm run preview

# 토스에 올릴 .ait 파일 만들기
npm run build:ait
```

---

## 화면은 이렇게 나뉩니다

| 주소 | 파일 | 하는 일 |
|------|------|---------|
| `/` | HomePage | 앱 이름, 오늘 날짜, 뽑기 버튼 |
| `/today` | TodayPage | 부적 뽑기와 결과 |
| `/history` | HistoryPage | 최근 7일 기록 |
| `/collection` | CollectionPage | 부적 24종 도감 |

아래쪽 탭은 **오늘 / 기록 / 도감**입니다.

주소가 `#/`처럼 보이는 이유는 `HashRouter`를 쓰기 때문입니다.
토스 안의 웹뷰에서는 일반 브라우저처럼 주소를 바꾸기 어려워서, `#` 뒤의 주소를 사용합니다.

---

## 폴더를 이렇게 보면 됩니다

```
src/
├── types/charm.ts           # 부적, 기록, 도감의 자료 모양
├── data/charms.ts           # 부적 24종과 뽑기 함수
├── lib/
│   ├── date.ts              # 한국 시간(KST) 날짜
│   ├── storage.ts           # 브라우저에 기록 저장
│   └── config.ts            # 광고와 앱 닫기
├── components/
│   ├── PrimaryButton.tsx    # 큰 버튼
│   ├── BottomNav.tsx        # 아래쪽 탭
│   ├── CharmCard.tsx        # 부적 카드
│   └── BannerAd.tsx         # 기록 화면 아래 배너 광고
├── pages/                   # 각 화면
└── App.tsx                  # 화면 연결
```

더 자세한 설명은 [docs/INTRODUCTION.md](docs/INTRODUCTION.md)와 [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)를 보세요.

---

## 뽑기가 돌아가는 순서

1. 오늘 처음 들어오면 **뽑기** 버튼이 보입니다.
2. 첫 부적이 나오면 **이 부적 저장하기** 또는 **광고 보고 한 번 더 뽑기**를 고릅니다.
3. 저장하면 그 부적이 오늘의 부적이 됩니다. 그래도 광고를 보면 한 번 더 뽑을 수 있습니다.
4. 다시 뽑으면 새 부적이 바로 오늘의 부적으로 저장됩니다.
5. 같은 날 다시 들어오면 저장해 둔 부적만 보입니다.

기록은 컴퓨터(또는 폰) 안의 `localStorage`에 남습니다.
서버에 보내지 않아서, 브라우저 데이터를 지우면 기록도 같이 사라집니다.

---

## 토스에 올릴 때 꼭 볼 것

### 1. 앱 이름과 아이콘

[granite.config.ts](granite.config.ts)에서 앱 ID는 `today-lucky-charm`입니다.
아이콘은 아직 임시 주소입니다. 토스 파트너 콘솔에서 받은 진짜 아이콘 주소로 바꿔야 합니다.

### 2. 광고 ID

광고 ID는 [src/lib/config.ts](src/lib/config.ts)에 있습니다.

| 환경 변수 | 쓰는 곳 |
|-----------|---------|
| `VITE_REWARD_AD_ID` | 광고 보고 다시 뽑기 |
| `VITE_BANNER_AD_ID` | 기록 화면 아래 배너 |

`.env.example`을 복사해서 `.env.local`을 만들고, 필요한 값만 넣으면 됩니다.
예전처럼 `VITE_AD_ENV`를 쓰지는 않습니다.

컴퓨터 브라우저에서는 진짜 광고 대신 연습용(Mock) 결과가 나옵니다.

### 3. 지키면 좋은 약속

- 진짜로 운이 좋아진다는 말은 쓰지 않습니다.
- 돈이나 선물을 준다는 말도 쓰지 않습니다.
- 광고를 보고 다시 뽑기는 하루에 한 번만 됩니다.
- 무서울 정도로 무속·종교처럼 보이는 그림은 쓰지 않습니다.

---

## 나중에 저장 방식을 바꾸고 싶다면

지금은 [src/lib/storage.ts](src/lib/storage.ts)만 브라우저 저장소를 봅니다.
나중에 토스 저장소나 Supabase로 바꿀 때도, 이 파일의 함수 이름만 유지하면 다른 화면은 거의 손대지 않아도 됩니다.

```ts
getTodayRecord(date)
saveTodayRecord(record)
getRecentRecords(dates)
getCollection()
```

---

## 같이 보면 좋은 문서

- [docs/INTRODUCTION.md](docs/INTRODUCTION.md) — 이 앱이 무엇인지
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — 코드가 어떻게 나뉘어 있는지
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) — 빌드하고 올리는 방법
- [docs/CHANGELOG.md](docs/CHANGELOG.md) — 지금까지 바뀐 내용
