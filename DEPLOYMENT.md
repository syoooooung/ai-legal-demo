# GitHub Pages 배포 가이드

## 준비사항

1. GitHub 계정
2. Git 설치
3. Node.js 20 이상

## 배포 단계

### 1. GitHub Repository 생성

GitHub에서 새 repository를 생성합니다:

- Repository name: `ai-legal-demo` (또는 원하는 이름)
- Public 또는 Private 선택
- README, .gitignore 추가하지 않음 (이미 로컬에 있음)

### 2. Repository URL 확인

생성된 repository URL을 확인합니다:
```
https://github.com/USERNAME/ai-legal-demo
```

배포 후 접속할 URL:
```
https://USERNAME.github.io/ai-legal-demo/
```

### 3. Base URL 설정 (repository name을 사용하는 경우)

`nuxt.config.ts` 파일 수정:

```typescript
app: {
  baseURL: '/ai-legal-demo/', // repository 이름과 동일하게
}
```

**주의**:
- Custom domain을 사용하거나 `USERNAME.github.io`를 repository 이름으로 하는 경우 `baseURL: '/'`로 설정
- Repository 이름이 다르면 그에 맞춰 수정

### 4. Git 초기화 및 푸시

```bash
# 현재 디렉토리에서 실행
cd /Users/syoung82/projects/legal/ai-legal-demo

# Git 초기화
git init

# 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: AI Legal Demo for portfolio"

# Remote 추가 (본인의 GitHub username으로 변경)
git remote add origin https://github.com/USERNAME/ai-legal-demo.git

# 푸시
git branch -M main
git push -u origin main
```

### 5. GitHub Pages 활성화

1. GitHub repository 페이지 이동
2. **Settings** 탭 클릭
3. 왼쪽 메뉴에서 **Pages** 클릭
4. **Source** 섹션에서:
   - Source: **GitHub Actions** 선택
5. 자동으로 Actions 탭에서 배포 시작

### 6. 배포 확인

1. **Actions** 탭에서 워크플로우 실행 확인
2. 완료되면 녹색 체크 표시
3. 배포 URL로 접속:
   ```
   https://USERNAME.github.io/ai-legal-demo/
   ```

## 배포 후 업데이트

코드 수정 후:

```bash
git add .
git commit -m "Update: 설명"
git push
```

푸시하면 자동으로 재배포됩니다.

## 로컬 테스트

배포 전 로컬에서 테스트:

```bash
# 빌드
npm run generate

# 미리보기 (빌드된 정적 파일 확인)
npm run preview
```

http://localhost:3000 에서 확인

## 문제 해결

### 1. 404 Not Found

**원인**: Base URL 설정 오류

**해결**:
- `nuxt.config.ts`의 `baseURL`을 repository 이름과 일치시키기
- Custom domain 사용 시 `baseURL: '/'`

### 2. CSS/JS 로드 실패

**원인**: Base URL 설정 오류

**해결**: 위와 동일

### 3. GitHub Actions 실패

**원인**:
- Node version 불일치
- 의존성 설치 실패

**해결**:
- `.github/workflows/deploy.yml`의 Node version 확인
- `package-lock.json` 커밋 확인

### 4. Pages 설정이 없음

**원인**: Repository settings에서 Pages 비활성화

**해결**:
- Settings → Pages에서 Source를 "GitHub Actions"로 설정

## Custom Domain 사용

### 1. DNS 설정

도메인 제공업체에서 A 레코드 추가:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

또는 CNAME 레코드:
```
USERNAME.github.io
```

### 2. GitHub 설정

1. Settings → Pages → Custom domain
2. 도메인 입력 (예: `demo.example.com`)
3. DNS 확인 완료까지 대기

### 3. Base URL 수정

`nuxt.config.ts`:
```typescript
app: {
  baseURL: '/', // custom domain 사용 시
}
```

## 참고

- GitHub Pages는 정적 사이트만 지원
- 이 데모는 SPA 모드로 빌드되어 GitHub Pages에 최적화됨
- Mock API를 사용하므로 백엔드 서버 불필요
- 무료 호스팅 (Public repo) 또는 Pro 계정 필요 (Private repo)

## 추가 리소스

- [Nuxt 3 Documentation](https://nuxt.com)
- [GitHub Pages Documentation](https://docs.github.com/pages)
- [GitHub Actions Documentation](https://docs.github.com/actions)
