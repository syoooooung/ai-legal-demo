# WISE 법률 리서치 어시스턴트 - 데모 버전

> 🎬 이 프로젝트는 포트폴리오 시연용 데모입니다.

## 개요

AI 기반 법률 리서치 및 문서 생성 어시스턴트의 데모 버전입니다. 실제 프로젝트의 UI와 기능을 보여주기 위해 Mock 데이터를 사용합니다.

### 주요 기능

- **판례 검색**: AI 기반 법률 판례 검색 및 분석
- **수임료 예측**: 사건 유형별 변호사 수임료 예측
- **소장 생성**: AI를 활용한 법률 문서(소장) 자동 생성
- **의뢰서 초안**: 법률 자문 의뢰서 초안 작성 지원

## 기술 스택

### Frontend
- **Nuxt 3** - Vue.js 프레임워크
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 유틸리티 기반 스타일링

### 데모 특징
- **SPA (Single Page Application)** - 정적 호스팅에 최적화
- **Mock API** - 실제 백엔드 없이 동작하는 시연용 API
- **GitHub Pages** - 무료 정적 호스팅

## 설치 및 실행

### 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

개발 서버: http://localhost:3000

### 빌드

```bash
# 정적 사이트 생성
npm run generate

# 빌드 결과 미리보기
npm run preview
```

## GitHub Pages 배포

### 자동 배포 (GitHub Actions)

1. GitHub repository 생성
2. 코드 푸시
3. GitHub Actions가 자동으로 빌드 및 배포

### 수동 배포

```bash
# 빌드
npm run generate

# .output/public 디렉토리를 GitHub Pages에 배포
```

### Repository 설정

1. **Settings** → **Pages**
2. **Source**: GitHub Actions 선택
3. `.github/workflows/deploy.yml` 자동 실행

## 설정

### Base URL 변경

GitHub Pages의 URL 구조에 맞춰 `nuxt.config.ts`의 `baseURL` 수정:

```typescript
// https://username.github.io/ai-legal-demo/ 로 배포하는 경우
app: {
  baseURL: '/ai-legal-demo/'
}
```

루트 도메인에 배포하는 경우 `baseURL: '/'` 유지

## 데모 모드 특징

### Mock API
- `plugins/mock-api.client.ts`에서 모든 API 호출을 가로채기
- 실제 백엔드 없이 미리 정의된 응답 반환
- 실제 API 호출과 동일한 지연 시간 시뮬레이션

### 데모 표시
- 상단에 데모 모드 배너 표시
- 헤더에 "DEMO VERSION" 표시
- robots.txt로 검색엔진 인덱싱 방지

## 원본 프로젝트

이 데모는 다음 프로젝트들의 축소 버전입니다:

- **Frontend**: [ai-legal-chat-ui](../ai-legal-chat-ui)
- **Backend**: [ai-legal](../ai-legal)

원본 프로젝트는:
- OpenSearch 벡터 검색
- LLM 기반 법률 분석 (Gemini, GPT 등)
- Langfuse 모니터링
- MinIO 문서 저장
- PostgreSQL 피드백 시스템

등의 실제 백엔드 인프라를 사용합니다.

## 라이선스

이 데모는 포트폴리오 시연 목적으로 제작되었습니다.

## 연락처

- GitHub: [@syoung82](https://github.com/syoung82)
- Email: syoung82@example.com

---

Made with ❤️ for Portfolio Demonstration
