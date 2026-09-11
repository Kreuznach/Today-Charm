# 무엇이 바뀌었나요?

이 파일은 버전이 올라갈 때마다 무엇을 고쳤는지 적습니다.
위에서부터 가장 최근 내용입니다.

## [1.5.0] — 2026-09-11

### 앱인토스 SDK를 최신 버전으로 올렸어요

**왜 고쳤나**

이 앱은 "앱인토스(Apps in Toss) SDK"라는 도구를 빌려서 토스 앱 안에서 열립니다.
토스에서 "SDK를 3.1 버전 이상으로 써 주세요"라고 안내했는데,
우리 앱은 **2.5.1** 버전을 쓰고 있었습니다. 그래서 최신 버전으로 바꿨습니다.

**무엇을 바꿨나**

- SDK(`@apps-in-toss/web-framework`)를 2.5.1 → **3.4.0**으로 올렸습니다.
- 앱을 만드는 도구(`@apps-in-toss/cli`)도 3.4.0으로 같이 올렸습니다.
- SDK가 3버전으로 바뀌면서 설정 파일 이름과 모양이 달라졌습니다.
  - `granite.config.ts` → `apps-in-toss.config.ts`로 이름이 바뀌었습니다.
  - 앱 아이콘 주소는 이제 이 파일이 아니라 **토스 파트너 콘솔**에서 등록합니다.
  - 이 변환은 토스가 만든 `ait migrate v3` 명령으로 자동으로 처리했습니다.
- 개발할 때 브라우저에서 토스 SDK 흉내를 내주는 `@apps-in-toss/devtools`를 새로 추가했습니다.
- 타입 검사(`npm run typecheck`), 웹 빌드(`npm run build`), 배포 파일 빌드(`npm run build:ait`)를
  모두 다시 실행해서 잘 되는지 확인했습니다.

**바뀐 파일**

- [package.json](../package.json)
- [apps-in-toss.config.ts](../apps-in-toss.config.ts) (예전 이름: `granite.config.ts`)
- [vite.config.ts](../vite.config.ts)
- [README.md](../README.md), [ARCHITECTURE.md](ARCHITECTURE.md), [DEPLOYMENT.md](DEPLOYMENT.md), [IMPROVEMENT_PLAN.md](IMPROVEMENT_PLAN.md)

**올릴 때 꼭 확인할 것**

- SDK 3.x는 한 번 올리면 2.x로 되돌릴 수 없습니다. 꼭 QR 테스트를 먼저 해 보세요.
- 토스 파트너 콘솔의 Origin(주소) 허용 목록에 아래 두 주소를 추가해야 합니다.
  - `https://today-lucky-charm.web.tossmini.com`
  - `https://today-lucky-charm.private-web.tossmini.com`

## [1.4.1] — 2026-08-22

### 아래쪽 탭을 떠 있는 알약 모양으로

**왜 고쳤나**

토스 검수에서 “탭바를 쓰면 플로팅 형태를 써야 한다”는 피드백을 받았습니다.
예전 탭은 화면 맨 아래에 붙은 **긴 막대**였습니다.
이 모양은 토스 앱 본래의 아래 탭과 비슷해서, 지금 어디인지 헷갈릴 수 있습니다.

**무엇을 바꿨나**

- 탭을 화면에서 살짝 띄운 **둥근 알약**으로 바꿨습니다.
- 왼쪽·오른쪽·아래쪽에 여백을 두어, 배경 화면이 탭 뒤로 보이게 했습니다.
- 이모지 대신 단순한 아이콘을 썼습니다. 고른 탭은 진하게, 안 고른 탭은 회색입니다.
- 탭은 그대로 3개입니다. (오늘 / 기록 / 도감)

**바뀐 파일**

- [src/components/BottomNav.tsx](../src/components/BottomNav.tsx)
- [src/components/BottomNav.module.css](../src/components/BottomNav.module.css)
- [src/index.css](../src/index.css)
- 각 화면의 아래 여백 CSS

## [1.4.0] — 2026-08-22

### 디자인, 다시 오기, 보내기

**화면**

- 부적마다 다른 종이 문양과 종류별 색을 넣었습니다.
- 특별 부적과 시즌 부적은 테두리가 다릅니다.
- 홈에서 오늘 부적을 바로 볼 수 있습니다.
- 연속으로 뽑은 날 수가 보입니다.
- “오늘 해 볼 일”에 체크할 수 있습니다.
- 부적을 친구에게 보낼 수 있습니다. 돈이나 포인트는 주지 않습니다.
- 같은 부적을 다시 뽑으면 두 번째 문장이 나옵니다.
- 시즌 부적은 그 계절에만 새로 나옵니다.
- 도감의 잠긴 칸은 실루엣으로 보입니다.
- 홈에서 내일 알림을 받고 싶은지 고를 수 있습니다. 진짜 알림은 토스 검수 뒤에 갑니다.

**문서**

- [IMPROVEMENT_PLAN.md](IMPROVEMENT_PLAN.md)의 할 일을 지금 코드에 맞게 고쳤습니다.

**바뀐 파일**

- `src/components/CharmArt.tsx`, `CharmCard.tsx`
- `src/pages/HomePage.tsx`, `TodayPage.tsx`, `HistoryPage.tsx`, `CollectionPage.tsx`
- `src/lib/storage.ts`, `date.ts`, `season.ts`, `share.ts`, `referrer.ts`, `notify.ts`
- `src/data/charms.ts`, `src/App.tsx`
- `public/app-icon.svg`, `docs/*.md`

## [문서] — 2026-08-22

### 맹점 분석과 개발 반영 계획

- [IMPROVEMENT_PLAN.md](IMPROVEMENT_PLAN.md)를 추가했습니다.
- 디자인, 토스 안 유입, 재방문, 흥미의 약한 점과 개발 순서를 쉬운 말로 정리했습니다.

## [1.3.1] — 2026-08-17

### 한글을 더 자연스럽게, 문서를 더 쉽게

**화면 글**

- “오늘의 부적은 확정됐어요”처럼 딱딱한 말을 고쳤습니다.
- 홈, 오늘, 기록, 도감 안내 글을 사람이 말하는 말투에 가깝게 다듬었습니다.
- 부적 설명에서 존댓말과 안내문이 어색하게 섞인 문장을 고쳤습니다.
- 카드의 “행운 포인트”를 “오늘의 포인트”로 바꿨습니다.

**문서**

- [README.md](../README.md), [INTRODUCTION.md](INTRODUCTION.md), [ARCHITECTURE.md](ARCHITECTURE.md), [DEPLOYMENT.md](DEPLOYMENT.md)를 다시 썼습니다.
- 프로그래밍을 조금 아는 초등 고학년도 읽을 수 있게 쉬운 말로 설명했습니다.
- 예전 앱 ID(`today-charm`)와 `VITE_AD_ENV` 안내를 지금 코드에 맞게 고쳤습니다.

**바뀐 파일**

- `src/pages/HomePage.tsx`, `TodayPage.tsx`, `HistoryPage.tsx`, `CollectionPage.tsx`
- `src/components/CharmCard.tsx`
- `src/data/charms.ts`
- `README.md`, `docs/*.md`

---

## [1.3.0] — 2026-05-18

### 광고를 올바른 방식으로 고침

**무엇을 바꿨나**

- 테스트용 광고 ID와 `VITE_AD_ENV`로 나누던 코드를 없앴습니다. 이제 실제 광고 ID만 씁니다.
- 배너가 잘못된 함수를 부르던 것을 `TossAds.attachBanner`로 바꿨습니다.
- 광고가 안 나오면 배너 자리를 숨깁니다.
- 화면이 사라질 때 `destroy()`로 배너를 정리합니다.

**바뀐 파일**

- [src/lib/config.ts](../src/lib/config.ts)
- [src/components/BannerAd.tsx](../src/components/BannerAd.tsx)
- [.env.example](../.env.example)
- [docs/ARCHITECTURE.md](ARCHITECTURE.md)

---

## [1.2.0] — 2026-05-18

### 앱 ID를 바꾸고, 광고 자리를 나눔

**무엇을 바꿨나**

- 앱 ID를 `today-charm`에서 `today-lucky-charm`으로 바꿨습니다. 같은 이름이 겹치지 않게 하려는 것입니다.
- 완성 파일 이름도 `today-lucky-charm.ait`가 됩니다.
- 다시 뽑기 광고와 배너 광고 ID를 따로 두었습니다.
- 기록 화면 아래에 배너를 넣었습니다.
- 분홍 바탕의 작은 아이콘(`favicon.ico`)을 만들었습니다.

**바뀐 파일**

- [granite.config.ts](../granite.config.ts), [package.json](../package.json)
- [src/lib/config.ts](../src/lib/config.ts), [src/components/BannerAd.tsx](../src/components/BannerAd.tsx)
- [src/pages/HistoryPage.tsx](../src/pages/HistoryPage.tsx)

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
- `sr을 때 움직이는 화면

**무엇을 넣었나**

- 처음 뽑으면 1.2초 동안 🎴가 돌아갑니다.
- 다시 뽑으면 0.8초 동안 ✨가 반짝입니다.
- 카드가 나타나는 방법이 세 가지입니다. 위에서 내려오기, 가운데에서 커지기, 아래에서 서서히 나타나기.

**바뀐처음 만든 버전

**무엇이 있었나**

- 홈, 오늘, 기록, 도감 화면
- 아래쪽 탭
- 브라우저에 기록을 남기는 저장소
- 한국 시간 날짜
- 토스 광고를 부르는 자리 (컴퓨터에서는 연습용)
- 부적 24종

**만든 도구**

- React 18 + Vite 6 + TypeScript 5
- React Router v6 (`HashRouter`)
- CSS Modules
- `@apps-in-toss/web-framework`
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
- [나중에 하고 싶은 일

- [ ] 브라우저 저장 대신 토스 저장소나 Supabase 쓰기
- [ ] 부적을 토스 친구에게 보내기
- [ ] 계절마다 다른 부적 넣기
- [ ] 여러 날 연속으로 뽑으면 작은 표시 주기
- [ ] 이모지 대신 진짜 그림 넣기