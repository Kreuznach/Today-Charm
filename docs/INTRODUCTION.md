너는 React + Vite + TypeScript 기반의 Toss in App WebView 미니앱을 구현하는 프론트엔드 개발자다.

프로젝트명은 “오늘의 말랑부적”이다.

목표:
하루에 한 번 사용자가 귀여운 부적 카드를 뽑고, 오늘의 응원 메시지와 사용법을 확인하는 Toss in App용 미니앱 MVP를 구현한다.

핵심 컨셉:
- 진짜 운세, 점술, 사주, 무속, 효험 앱이 아니다.
- 하루를 가볍고 귀엽게 버티게 해주는 응원 카드 앱이다.
- “행운 강화”, “대박”, “효과 업그레이드”, “운명을 바꾼다” 같은 표현은 금지한다.
- 현금, 포인트, 쿠폰, 경품 등 재산상 이익은 제공하지 않는다.
- 광고 후 재뽑기는 하루 1회만 가능하다.
- 두 번째 부적은 오늘의 최종 부적으로 저장된다.
- 같은 날짜에는 다시 변경할 수 없다.

기술 스택:
- React
- Vite
- TypeScript
- React Router 사용 가능
- CSS Modules 또는 일반 CSS 사용
- 라이트 모드 기준
- 모바일 WebView 우선
- Toss Design System 느낌의 간결하고 둥근 UI
- localStorage 우선
- 추후 Apps in Toss Storage 또는 Supabase로 교체 가능하도록 storage layer를 분리한다.

필수 화면:
1. HomePage
   - 앱 제목: 오늘의 말랑부적
   - 오늘 날짜 표시
   - 안내 문구
   - “오늘의 말랑부적 뽑기” 버튼
   - 오늘 이미 뽑았다면 오늘의 최종 부적 보기 버튼
   - 하단 탭: 오늘 / 기록 / 도감

2. DrawPage 또는 ResultPage
   - 부적 카드 표시
   - 부적명
   - 카테고리
   - 오늘의 한 줄
   - 부적 효과
   - 오늘의 사용법
   - 피해야 할 것
   - 행운 포인트
   - “오늘 부적으로 저장” 버튼
   - “광고 보고 한 번 더 뽑기” 버튼
   - 단, 재뽑기는 하루 1회만 가능
   - 재뽑기 후에는 두 번째 결과를 최종 저장

3. HistoryPage
   - 최근 7일 부적 기록
   - 날짜, 부적명, 한 줄 메시지 표시
   - 기록이 없으면 빈 상태 UI 표시

4. CollectionPage
   - 전체 부적 24종 도감
   - 획득한 부적은 정상 표시
   - 미획득 부적은 흐림 또는 실루엣 처리
   - 획득률 표시

데이터 구조:
type CharmCategory = "daily" | "spending" | "social" | "meal" | "cute";
type CharmRarity = "basic" | "special" | "seasonal";

type CharmResult = {
  charmId: string;
  charmName: string;
  charmCategory: CharmCategory;
  charmImageKey: string;
  rarity: CharmRarity;
  mainMessage: string;
  charmEffect: string;
  todayUsage: string;
  avoidPoint: string;
  luckyPoint: string;
};

type DailyCharmRecord = {
  date: string;
  firstCharm?: CharmResult;
  finalCharm: CharmResult;
  rerolled: boolean;
  createdAt: string;
};

type CharmCollectionItem = {
  charmId: string;
  firstAcquiredDate: string;
  acquiredCount: number;
};

부적 24종:
1. 기상 성공 부적
2. 집중력 소환 부적
3. 귀찮음 퇴치 부적
4. 멘탈 방어 부적
5. 체력 보존 부적
6. 잠깨움 부적
7. 지갑 방어 부적
8. 충동구매 봉인 부적
9. 혜택 발견 부적
10. 카페값 절제 부적
11. 배달앱 봉인 부적
12. 구독 정리 부적
13. 말실수 방지 부적
14. 답장 용기 부적
15. 눈치 상승 부적
16. 회의 생존 부적
17. 칭찬 수집 부적
18. 평온한 인간관계 부적
19. 점심 선택 부적
20. 저녁 메뉴 결정 부적
21. 매운맛 조절 부적
22. 든든한 한 끼 부적
23. 고양이 기운 부적
24. 말랑행운 부적

구현 요구사항:
- / 경로: 홈
- /today 경로: 오늘 부적 결과
- /history 경로: 최근 7일 기록
- /collection 경로: 부적 도감
- 모바일 우선 360px~430px 화면에서 보기 좋게 구현
- 전체 배경은 밝은 크림색 또는 연분홍 계열
- 카드 UI는 둥근 모서리, 부드러운 그림자
- 버튼은 Toss 스타일처럼 명확하고 큼직하게
- 애니메이션은 과하지 않게 카드가 살짝 등장하는 정도
- 이미지가 없어도 charmImageKey 기반으로 CSS/이모지/심볼 대체 UI를 제공
- 텍스트는 한국어로 작성
- 광고 API는 showRewardAd() 함수로 추상화하고, 현재는 mock으로 true 반환
- storage.ts 파일을 만들어 localStorage 접근을 모듈화
- charms.ts 파일에 24종 결과 사전을 작성
- date.ts 파일에 KST 기준 날짜 유틸을 작성
- README.md에 실행 방법, 빌드 방법, Toss in App 배포 시 고려사항을 정리

금지:
- SSR, 확률, 등급업 같은 표현 금지
- 금전 보상 암시 금지
- 실제 효험/점술 암시 금지
- 어두운 무속/종교적 이미지 금지

최종 산출물:
- 실행 가능한 React + Vite + TypeScript 프로젝트
- src/data/charms.ts
- src/lib/storage.ts
- src/lib/date.ts
- src/pages/HomePage.tsx
- src/pages/TodayPage.tsx
- src/pages/HistoryPage.tsx
- src/pages/CollectionPage.tsx
- src/components/CharmCard.tsx
- src/components/BottomNav.tsx
- src/components/PrimaryButton.tsx
- README.md