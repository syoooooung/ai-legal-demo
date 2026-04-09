// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],

  // GitHub Pages 배포 설정
  ssr: false, // SPA 모드

  app: {
    head: {
      title: 'WISE 법률 리서치 어시스턴트 - Demo',
      meta: [
        { name: 'description', content: 'AI 기반 법률 리서치 및 문서 생성 어시스턴트 (데모 버전)' },
        { name: 'robots', content: 'noindex, nofollow' } // 검색엔진 인덱싱 방지
      ]
    },
    baseURL: '/ai-legal-demo/',
  },

  // 정적 생성 설정
  nitro: {
    preset: 'static',
    // devProxy 제거 (데모에서는 불필요)
  },

  // 클라이언트 전용 플러그인 자동 로드
  plugins: [
    '~/plugins/mock-api.client.ts'
  ]
})