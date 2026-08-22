# 무엇이 바뀌었나요?

이 파일은 버전이 올라갈 때마다 무엇을 고쳤는지 적습니다.
위에서부터 가장 최근 내용입니다.

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