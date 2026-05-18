# 배포 가이드 — 오늘의 말랑부적

## 1. 사전 준비

### 1.1 Toss 파트너 콘솔 접근
- 접속: [https://partners-apps-in-toss.toss.im](https://partners-apps-in-toss.toss.im)
- 앱 ID: `today-charm`
- 앱 이름: 오늘의 말랑부적

### 1.2 필수 발급 항목

| 항목 | 설명 | 위치 |
|------|------|------|
| 앱 아이콘 URL | 96×96px, 심사 통과용 | 파트너 콘솔 → 앱 설정 |
| 리워드 광고 그룹 ID | `ait.v2.live.*` 형식 | 파트너 콘솔 → 광고 |

---

## 2. 로컬 환경 설정

```bash
# 1. 의존성 설치
npm install

# 2. 환경 변수 파일 생성
copy .env.example .env.local

# 3. .env.local 수정
# VITE_AD_ENV=test  (개발 중에는 test 유지)
```

---

## 3. 빌드 절차

### 3.1 개발 빌드 (테스트)

```bash
npm run build
npm run preview  # http://localhost:4173 에서 미리보기
```

### 3.2 AIT 번들 생성

```bash
# .env.local에서 VITE_AD_ENV=production 으로 변경 후
npm run build:ait
# → today-charm.ait 파일 생성
```

### 3.3 .ait 파일 내용 검증

```bash
# _ait_inspect/ 폴더 자동 생성됨
# 해당 폴더에서 index.html 을 브라우저로 열어 최종 확인
```

---

## 4. 심사 제출 체크리스트

### 4.1 코드 점검

- [ ] `granite.config.ts` → `brand.icon` 실제 URL로 교체
- [ ] `src/lib/config.ts` → `AD_GROUP_ID_PROD` 실제 ID로 교체
- [ ] `VITE_AD_ENV=production` 설정 확인
- [ ] `npm run typecheck` 오류 없음 확인

### 4.2 정책 준수 확인

- [ ] 운세/점술/효험 암시 없음
- [ ] 금전 보상 없음
- [ ] 광고 후 재뽑기 하루 1회 제한 동작 확인
- [ ] 미성년자 보호 문구 없음
- [ ] 개인정보 수집 없음 (localStorage만 사용)

### 4.3 UI/UX 점검

- [ ] 360px ~ 430px 화면에서 정상 표시
- [ ] 하단 탭 정상 동작
- [ ] 뒤로가기 버튼 동작 (Android 하드웨어 버튼)
- [ ] 다크모드 시 깨짐 없음 (라이트모드 고정)

---

## 5. 파트너 콘솔 업로드

1. Toss 파트너 콘솔 로그인
2. `today-charm` 앱 선택
3. **새 버전 등록** → `today-charm.ait` 업로드
4. 스크린샷 첨부 (최소 2장)
5. 업데이트 노트 작성
6. **심사 신청**

---

## 6. 버전 관리

| 버전 | 날짜 | 변경 사항 |
|------|------|-----------|
| 1.0.0 | 2026-05-18 | 최초 MVP 릴리즈 |

---

## 7. 긴급 대응

### 광고 로드 실패 시
- `config.ts`의 `showRewardAd()` 함수에서 catch → false 반환
- 재뽑기 버튼 비활성화 처리 (UI 레벨)

### localStorage 손상 시
- 브라우저 캐시 초기화 → 데이터 초기화됨 (MVP 수준)
- 추후 Supabase 마이그레이션으로 해결 예정
