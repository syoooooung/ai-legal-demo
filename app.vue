<template>
  <div class="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
    <!-- 데모 모드 배너 -->
    <div class="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white py-2 px-8 text-center font-semibold text-sm shadow-md">
      <div class="flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
        </svg>
        <span>🎬 데모 모드 | 이 사이트는 포트폴리오 시연용입니다. 모든 응답은 미리 설정된 샘플 데이터입니다.</span>
      </div>
    </div>

    <!-- 상단 헤더 -->
    <header class="bg-white/90 backdrop-blur-xl shadow-lg py-3 px-8 border-b border-blue-200/50">
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-3">
          <img src="/favicon.ico" alt="WISE" class="w-10 h-10 rounded-xl shadow-lg" />
          <div class="flex flex-col">
            <span class="text-3xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 bg-clip-text text-transparent tracking-tight">WISE 법률 리서치 어시스턴트</span>
            <span class="text-xs text-orange-600 font-bold mt-0.5">DEMO VERSION</span>
          </div>
        </div>
        <div class="hidden md:flex items-center gap-2 text-sm text-slate-600 font-medium ml-4">
          <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold shadow-sm">실시간 법률상담</span>
          <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold shadow-sm">출처 기반 응답</span>
          <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold shadow-sm">유사 판례 제공</span>
        </div>
      </div>
    </header>

    <main class="flex-1 flex flex-col md:flex-row min-h-0">
      <!-- 왼쪽(대화기록) 사이드바 -->
      <aside v-if="showLeftSidebar" 
             :style="{ width: leftSidebarWidth + 'px', minWidth: '200px', maxWidth: '600px' }"
             class="bg-white/70 backdrop-blur-xl text-slate-800 border-r border-blue-200/50 flex-shrink-0 flex flex-col relative shadow-xl">
        <div class="flex items-center justify-between px-4 py-2 border-b border-blue-200/50 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
            </svg>
            <span class="font-bold text-lg text-slate-800">대화 기록</span>
          </div>
          <button @click="showLeftSidebar = false" class="p-2 text-slate-500 hover:text-slate-700 hover:bg-white/80 rounded-lg transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        <div class="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          <div v-for="(chat, index) in chatHistory" :key="chat.id"
               class="group p-3 rounded-lg cursor-pointer hover:bg-blue-50/80 transition-all duration-200 relative border border-transparent hover:border-blue-200/50 backdrop-blur-sm"
               :class="{'bg-gradient-to-r from-blue-100/80 to-indigo-100/80 border-blue-300/50 shadow-md': currentChatIndex === index}">
            <div @click="loadChat(index)" class="flex-1 min-w-0">
              <div class="text-sm font-semibold text-slate-800 break-words overflow-hidden" 
                   :style="{ display: '-webkit-box', '-webkit-line-clamp': '2', '-webkit-box-orient': 'vertical' }">
                {{ chat.title || '새로운 대화' }}
              </div>
              <div class="text-xs text-slate-500 mt-2 flex items-center gap-1">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clip-rule="evenodd"/>
                </svg>
                {{ formatDate(chat.timestamp) }}
              </div>
            </div>
            <div class="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
              <button @click.stop="deleteChat(index)" class="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all duration-150">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <button @click.stop="resetToSingleChat(index)" class="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-all duration-150" title="이 대화로 초기화">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="p-3">
          <button @click="startNewChat" class="w-full p-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
            </svg>
            새 대화 시작
          </button>
        </div>
        
        <!-- 왼쪽 사이드바 리사이즈 핸들 -->
        <div @mousedown="startResizeLeft" 
             class="absolute top-0 right-0 w-1 h-full cursor-col-resize bg-transparent hover:bg-blue-300/50 transition-colors duration-200 z-10">
        </div>
      </aside>
      <button v-else @click="showLeftSidebar = true" class="fixed left-0 top-[100px] z-50 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-r-2xl px-4 py-3 shadow-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 flex items-center group backdrop-blur-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <span class="font-semibold">대화기록</span>
      </button>

      <!-- 중앙 챗봇 대화 영역 -->
      <section class="flex-1 flex flex-col bg-gradient-to-b from-white/50 via-blue-50/30 to-indigo-50/50 relative backdrop-blur-sm">
        <div class="flex-1 overflow-y-auto px-6 py-8 md:px-16 md:py-12">
          <div class="max-w-4xl mx-auto space-y-8">
            <div v-for="message in messages" :key="message.id" class="flex group" :class="message.isUser ? 'justify-end' : 'justify-start'">
              <div :class="[
                'rounded-2xl px-6 py-4 shadow-lg max-w-[85%] transition-all duration-200 group-hover:shadow-xl',
                message.isUser ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-tr-md backdrop-blur-sm' : 'bg-white/90 text-slate-800 border border-blue-200/50 rounded-tl-md backdrop-blur-sm'
              ]">
                <div v-if="message.isUser" class="whitespace-pre-wrap">
                  <!-- 사용된 서비스 표시 (상단) -->
                  <div v-if="message.service" class="mb-2 pb-2 border-b border-blue-300/30">
                    <div class="flex items-center gap-2 text-xs text-blue-100">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <span>{{ getServiceName(message.service) }}</span>
                    </div>
                  </div>
                  {{ message.text }}
                  <!-- 첨부된 파일 정보 표시 (하단) -->
                  <div v-if="message.attachedFile" class="mt-2 pt-2 border-t border-blue-300/30">
                    <div class="flex items-center gap-2 text-xs text-blue-100">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                      <span>{{ message.attachedFile.name }} ({{ formatFileSize(message.attachedFile.size) }})</span>
                    </div>
                  </div>
                </div>
                <div v-else class="whitespace-pre-wrap" v-html="renderMarkdown(message.text)"></div>
                <div v-if="!message.isUser && message.text && !isLoading" class="mt-3 pt-3 border-t border-slate-200/50" :class="feedbackState.messageId === message.id ? 'min-h-[120px]' : 'flex items-center justify-end gap-2 h-9'">
                  <!-- Thank You View -->
                  <div v-if="feedbackSubmittedId === message.id" class="text-sm text-slate-500 italic flex items-center gap-1">
                    <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    소중한 의견 감사합니다
                  </div>
                  <!-- Confirmation View -->
                  <div v-else-if="feedbackState.messageId === message.id" class="w-full">
                    <div class="flex flex-col gap-3 text-sm bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <!-- 별점 선택 -->
                      <div class="flex items-center justify-between">
                        <span class="text-slate-700 font-medium">별점을 선택해주세요:</span>
                        <div class="flex items-center gap-1">
                          <button
                            v-for="star in 5"
                            :key="star"
                            @click="feedbackState.score = star"
                            class="cursor-pointer p-1 transition-all duration-200"
                            :class="star <= (feedbackState.score || 0) ? 'text-yellow-400' : 'text-slate-300 hover:text-yellow-300'"
                          >
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                          </button>
                        </div>
                      </div>

                      <!-- 의견 입력 -->
                      <div class="text-xs text-slate-600">
                        의견을 남겨주세요 (선택사항):
                      </div>
                      <textarea
                        v-model="feedbackState.comment"
                        placeholder="이 응답에 대한 의견을 입력해주세요..."
                        class="w-full p-2 border border-slate-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        rows="2"
                        maxlength="500"
                      ></textarea>

                      <!-- 제출 버튼 -->
                      <div class="flex items-center justify-between">
                        <span class="text-xs text-slate-500">{{ feedbackState.comment?.length || 0 }}/500</span>
                        <div class="flex gap-2">
                          <button
                            @click="confirmFeedback"
                            :disabled="!feedbackState.score"
                            :class="['px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm', feedbackState.score ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md' : 'bg-slate-300 text-slate-500 cursor-not-allowed']"
                          >
                            제출
                          </button>
                          <button @click="cancelFeedback" class="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium transition-all duration-200 text-sm">취소</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Default View -->
                  <div v-else class="flex items-center gap-1">
                    <button @click="handleFeedback(message.id, 'thumbs_up')" title="좋은 응답" aria-label="좋음 응답" class="cursor-pointer p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-200 flex items-center justify-center">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                      </svg>
                    </button>
                    <button @click="handleFeedback(message.id, 'thumbs_down')" title="별로인 응답" aria-label="싫어요 응답" class="cursor-pointer p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 flex items-center justify-center">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.106-1.79l-.05-.025A4 4 0 0011.057 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- 추천 질문 섹션 (해당 메시지에 추천 질문이 있는 경우만 표시) -->
                <div v-if="!message.isUser && message.text && !isLoading && message.redefinedQuestions && message.redefinedQuestions.length > 0" class="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 shadow-sm">
                  <div class="flex items-center gap-2 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 class="text-sm font-bold text-blue-800">추천 질문</h3>
                  </div>
                  <div class="space-y-2">
                    <button
                      v-for="(question, qIndex) in message.redefinedQuestions"
                      :key="qIndex"
                      @click="handleRedefinedQuestion(question)"
                      class="w-full text-left p-3 text-sm bg-white hover:bg-blue-50 border border-blue-200 hover:border-blue-300 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md group"
                    >
                      <div class="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-500 mt-0.5 group-hover:text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-gray-700 group-hover:text-blue-700 leading-relaxed">{{ question }}</span>
                      </div>
                    </button>
                  </div>
                </div>

                <div v-if="!message.isUser && message.text && !isLoading" class="mt-3 text-xs text-slate-500 flex items-center gap-1">
                  <svg class="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                  </svg>
                  출처: WISENUT
                </div>
              </div>
            </div>
            <div v-if="isLoading" class="flex justify-start group">
              <div class="bg-white/90 backdrop-blur-sm text-slate-700 rounded-2xl px-6 py-4 shadow-lg border border-blue-200/50 rounded-tl-md max-w-[85%]">
                <div class="flex items-center space-x-3">
                  <div class="flex space-x-1">
                    <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                    <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
                  </div>
                  <span class="text-sm font-medium text-slate-600">답변을 준비하고 있습니다...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 하단 입력창/안내문구 -->
        <div class="bg-white/80 backdrop-blur-xl border-t border-blue-200/50 px-6 py-4 md:px-16 shadow-xl">
          <!-- 서비스 선택 버튼 -->
          <div class="max-w-4xl mx-auto mb-4">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                @click="selectedService = 'complaint_generation'"
                :class="[
                  'px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-300 border-2 backdrop-blur-sm transform hover:scale-105',
                  selectedService === 'complaint_generation'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-blue-600 shadow-lg'
                    : 'bg-white/70 text-slate-700 border-slate-200 hover:bg-blue-50/70 hover:border-blue-300'
                ]"
              >
                <div class="flex items-center justify-center gap-2">
                  <span class="text-lg">📝</span>
                  <span>소장 생성</span>
                </div>
              </button>

              <button
                @click="selectedService = 'draft_request'"
                :class="[
                  'px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-300 border-2 backdrop-blur-sm transform hover:scale-105',
                  selectedService === 'draft_request'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-blue-600 shadow-lg'
                    : 'bg-white/70 text-slate-700 border-slate-200 hover:bg-blue-50/70 hover:border-blue-300'
                ]"
              >
                <div class="flex items-center justify-center gap-2">
                  <span class="text-lg">📋</span>
                  <span>의뢰서 초안</span>
                </div>
              </button>

              <button
                @click="selectedService = 'fee_prediction'"
                :class="[
                  'px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-300 border-2 backdrop-blur-sm transform hover:scale-105',
                  selectedService === 'fee_prediction'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-blue-600 shadow-lg'
                    : 'bg-white/70 text-slate-700 border-slate-200 hover:bg-blue-50/70 hover:border-blue-300'
                ]"
              >
                <div class="flex items-center justify-center gap-2">
                  <span class="text-lg">💰</span>
                  <span>수임료 예측</span>
                </div>
              </button>

              <button
                @click="selectedService = 'precedent_search'"
                :class="[
                  'px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-300 border-2 backdrop-blur-sm transform hover:scale-105',
                  selectedService === 'precedent_search'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-blue-600 shadow-lg'
                    : 'bg-white/70 text-slate-700 border-slate-200 hover:bg-blue-50/70 hover:border-blue-300'
                ]"
              >
                <div class="flex items-center justify-center gap-2">
                  <span class="text-lg">⚖️</span>
                  <span>판례 분석</span>
                </div>
              </button>
            </div>
          </div>

          <!-- 선택된 파일 표시 -->
          <div v-if="selectedFile" class="max-w-4xl mx-auto mb-3">
            <div class="flex items-center justify-between bg-blue-50/80 backdrop-blur-sm border border-blue-200/50 rounded-xl px-4 py-3 shadow-md">
              <div class="flex items-center gap-3 text-sm text-blue-700 font-medium">
                <div class="p-2 bg-blue-100 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <div class="font-semibold">{{ selectedFile.name }}</div>
                  <div class="text-xs text-blue-600">({{ formatFileSize(selectedFile.size) }})</div>
                </div>
              </div>
              <button @click="removeFile" class="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div class="max-w-4xl mx-auto flex gap-3 items-end">
            <textarea
              ref="inputTextarea"
              v-model="inputMessage"
              @keydown="handleKeyDown"
              @compositionstart="handleCompositionStart"
              @compositionend="handleCompositionEnd"
              placeholder="질문을 입력하세요..."
              class="flex-1 p-4 border-2 border-blue-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white/90 backdrop-blur-sm text-slate-800 placeholder-slate-400 font-medium transition-all duration-300 shadow-lg resize-none"
              :disabled="isLoading"
              rows="1"
              style="min-height: 56px; max-height: 200px;"
            ></textarea>

            <!-- 파일 업로드 버튼 -->
            <div class="relative">
              <button
                type="button"
                @click="() => fileInput?.click()"
                class="px-4 py-4 bg-white/90 backdrop-blur-sm text-slate-600 rounded-2xl hover:bg-slate-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-slate-200 hover:border-slate-300 shadow-lg"
                :disabled="isLoading"
                title="파일 업로드 (.txt, .pdf, .docx, 최대 10MB)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>
              <input
                type="file"
                ref="fileInput"
                @change="handleFileSelect"
                accept=".txt,.pdf,.docx"
                class="hidden"
                :disabled="isLoading"
              />
            </div>

            <button @click="sendMessage" class="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2" :disabled="isLoading">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
              </svg>
              전송
            </button>
          </div>
          <div class="text-xs text-slate-500 text-center mt-4 flex items-center justify-center gap-1">
            <svg class="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
            <span class="font-medium">정확한 법률 자문은 반드시 변호사와 상담하세요</span>
          </div>
        </div>
      </section>

      <!-- 우측 유사 판례/헌재/법령/행정 탭 -->
      <aside v-if="showRightSidebar" 
             :style="{ width: rightSidebarWidth + 'px', minWidth: '250px', maxWidth: '700px' }"
             class="bg-white/70 backdrop-blur-xl border-l border-blue-200/50 flex-shrink-0 flex flex-col relative shadow-xl">
        <div class="border-b border-blue-200/50">
          <div class="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
              </svg>
              <span class="font-bold text-lg text-slate-800">관련 자료</span>
            </div>
            <button @click="showRightSidebar = false" class="p-2 text-slate-500 hover:text-slate-700 hover:bg-white/80 rounded-lg transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div class="flex border-t border-gray-200/50 grid-cols-4">
            <button
              @click="activeRightTab = 'precedent'"
              id="btn-precedent-tab"
              :class="['w-1/4 py-2 px-2 text-sm font-semibold text-center border-r border-gray-200/50 transition-all duration-300', activeRightTab === 'precedent' ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md' : 'bg-white/50 text-slate-700 hover:bg-blue-50/80']">
              유사 판례
            </button>
            <button
              @click="activeRightTab = 'constitutional'"
              id="btn-constitutional-tab"
              :class="['w-1/4 py-2 px-2 text-sm font-semibold text-center border-r border-gray-200/50 transition-all duration-300', activeRightTab === 'constitutional' ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md' : 'bg-white/50 text-slate-700 hover:bg-blue-50/80']">
              헌재결정례
            </button>
            <button
              @click="activeRightTab = 'interpretation'"
              id="btn-interpretation-tab"
              :class="['w-1/4 py-2 px-2 text-sm font-semibold text-center border-r border-gray-200/50 transition-all duration-300', activeRightTab === 'interpretation' ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md' : 'bg-white/50 text-slate-700 hover:bg-blue-50/80']">
              법령해석례
            </button>
            <button
              @click="activeRightTab = 'appeal'"
              id="btn-appeal-tab"
              :class="['w-1/4 py-3 px-2 text-sm font-semibold text-center transition-all duration-300', activeRightTab === 'appeal' ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md' : 'bg-white/50 text-slate-700 hover:bg-blue-50/80']">
              행정심판례
            </button>
          </div>
        </div>
        <div class="flex-1 overflow-y-auto px-4 py-4">
          <!-- 유사 판례 탭 -->
          <div v-if="activeRightTab === 'precedent'" id="precedent-panel" data-panel-type="precedent">
            <div v-for="(result, index) in currentSearchResults"
                 :key="index"
                 class="mb-4 p-4 bg-[#f7fafd] rounded-lg shadow-sm border border-[#e2e8f0]">
              
              <!-- TODO: 현재 응답에 해당 필드가 없어서 더미 데이터 사용 중. API 응답 업데이트 후 실제 필드로 변경 필요 -->
              <!-- 판례 헤더 정보 -->
              <div class="mb-3 pb-2 border-b border-gray-200">
                <div class="flex items-center justify-between">
                  <div class="flex-1 min-w-0 pr-2">
                    <!-- 법원명, 선고일자, 사건명 표시 -->
                    <div class="text-sm text-gray-600 mb-1">
                      <span class="font-medium">{{ result.법원명 }}</span>
                      <span class="mx-2">·</span>
                      <span>{{ result.선고일자 }}</span>
                    </div>
                    <div class="text-base font-semibold text-[#2b6cb0] mb-1">
                      <a :href="result.상세링크"
                         target="_blank"
                         rel="noopener noreferrer"
                         class="hover:underline truncate block w-full"
                         :title="result.사건명">
                        {{ result.사건명 }}
                      </a>
                    </div>
                  </div>
                  <!-- 미리 보기 버튼 -->
                  <button @click="openPreviewModal(result, 'precedent')"
                          class="ml-3 p-2 text-gray-500 hover:text-[#2b6cb0] hover:bg-gray-100 rounded-lg transition-colors"
                          title="판례 미리 보기">
                    <!-- 대각선 화살표 아이콘 (확대 의미) -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                </div>

              </div>
              
              <div
                  v-for="[key, value] in Object.entries(result).filter(([k]) => !shouldHideContentLabel(k))"
                  :key="key"
                  class="mb-1"
              >
                <span class="text-sm font-semibold text-[#2b6cb0]">{{ key }}:</span>
                <span class="text-sm text-gray-700 ml-1 block max-h-24 overflow-y-auto whitespace-pre-line break-words">
                  {{ formatValue(value, key) }}
                </span>
              </div>

              <!-- 관련성, 관련 이유, 키워드 해시태그를 함께 표시 -->
              <div v-if="result.relevance_level || (result.relevance_reasons && result.relevance_reasons.length > 0) || (result.key_matches && result.key_matches.length > 0)" class="mt-3 pt-2 border-t border-gray-200 space-y-2">
                <!-- 관련성과 관련 이유 버튼을 같은 줄에 -->
                <div class="flex items-center gap-2 flex-wrap">
                  <!-- 관련성 표시 -->
                  <div v-if="result.relevance_level" class="flex items-center gap-1">
                    <span class="text-xs text-gray-500">관련성:</span>
                    <span class="px-2 py-0.5 bg-red-50 text-red-600 text-xs font-semibold rounded-full">
                      {{ result.relevance_level === '상' ? '높음' :
                           result.relevance_level === '중' ? '중간' :
                           result.relevance_level === '하' ? '낮음' : result.relevance_level }}
                    </span>
                  </div>

                  <!-- 관련 이유 버튼 -->
                  <div v-if="result.relevance_reasons && result.relevance_reasons.length > 0" class="relative">
                    <button
                      @mouseenter="showTooltip[`${index}-reasons`] = true"
                      @mouseleave="showTooltip[`${index}-reasons`] = false"
                      class="px-2 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-medium transition-colors flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      AI 판단 근거
                    </button>
                    <!-- Tooltip 내용 -->
                    <div v-if="showTooltip[`${index}-reasons`]"
                         class="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-gray-800 text-white rounded-md p-1.5 shadow-lg border border-gray-600"
                         style="width: 280px; max-width: 280px; font-size: 12px; line-height: 1.3;">
                      <div class="font-medium mb-1 text-blue-200" style="font-size: 12px;">AI 판단 근거</div>
                      <ul class="space-y-0.5">
                        <li v-for="(reason, idx) in result.relevance_reasons" :key="idx" class="flex items-start gap-1">
                          <span class="text-blue-400" style="font-size: 10px; margin-top: 1px;">•</span>
                          <span class="leading-tight" style="font-size: 12px;">{{ reason }}</span>
                        </li>
                      </ul>
                      <!-- 화살표 -->
                      <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                    </div>
                  </div>

                  <!-- 쿼리 유사도 -->
                  <div v-if="result.score" class="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span class="text-xs text-gray-500">쿼리 유사도:</span>
                    <div class="px-2 py-0.5 bg-purple-50 text-purple-700 text-xs font-semibold rounded-md border border-purple-200">
                      {{ !isNaN(parseFloat(result.score)) ? parseFloat(result.score).toFixed(2) : result.score }}점
                    </div>
                  </div>
                </div>

                <!-- 키워드 해시태그 -->
                <div v-if="result.key_matches && result.key_matches.length > 0" class="flex flex-wrap gap-1">
                  <span v-for="keyword in result.key_matches"
                        :key="keyword"
                        class="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                    #{{ keyword }}
                  </span>
                </div>
              </div>

              <div class="text-xs text-gray-300 mt-1">출처: WISENUT</div>
            </div>
            <div v-if="!currentSearchResults.length" class="text-gray-400 text-center py-4">
              검색 결과가 없습니다.
            </div>
          </div>

          <!-- 헌재결정례 탭 -->
          <div v-if="activeRightTab === 'constitutional'" id="constitutional-panel" data-panel-type="constitutional">
            <div v-for="(result, index) in constitutionalResults"
                 :key="index"
                 class="mb-4 p-4 bg-[#f0f9ff] rounded-lg shadow-sm border border-[#bfdbfe]">
              
              <!-- 헌재 결정례 헤더 정보 -->
              <div class="mb-3 pb-2 border-b border-blue-200">
                <div class="flex items-center justify-between">
                  <div class="flex-1 min-w-0 pr-2">
                    <!-- 재판부명, 선고일자, 사건명 표시 -->
                    <div class="text-sm text-gray-600 mb-1">
                      <span>{{ getDecisionDate(result) }}</span>
                    </div>
                    <div class="text-base font-semibold text-[#1e40af] mb-1">
                      <a :href="getLawUrl(result)"
                         target="_blank"
                         rel="noopener noreferrer"
                         class="hover:underline truncate block w-full" 
                         :title="getTitle(result)">
                        {{ getTitle(result) }}
                      </a>
                    </div>
                  </div>
                  <!-- 미리 보기 버튼 -->
                  <button @click="openPreviewModal(result, 'constitutional')" 
                          class="ml-3 p-2 text-gray-500 hover:text-[#1e40af] hover:bg-blue-100 rounded-lg transition-colors"
                          title="헌재결정례 미리 보기">
                    <!-- 대각선 화살표 아이콘 (확대 의미) -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div
                  v-for="[key, value] in Object.entries(result).filter(([k]) => !shouldHideContentLabel(k))"
                  :key="key"
                  class="mb-1"
              >
                <span class="text-sm font-semibold text-[#1e40af]">{{ key }}:</span>
                <span class="text-sm text-gray-700 ml-1 block max-h-24 overflow-y-auto whitespace-pre-line break-words">
                  {{ formatValue(value, key) }}
                </span>
              </div>
            </div>
            <div v-if="!constitutionalResults.length" class="text-gray-400 text-center py-4">
              헌재결정례 검색 결과가 없습니다.
            </div>
          </div>

          <!-- 법령해석례 탭 -->
          <div v-if="activeRightTab === 'interpretation'" id="interpretation-panel" data-panel-type="interpretation">
            <div v-for="(result, index) in interpretationResults"
                 :key="index"
                 class="mb-4 p-4 bg-[#f0fdf4] rounded-lg shadow-sm border border-[#bbf7d0]">

              <!-- 법령해석례 헤더 정보 -->
              <div class="mb-3 pb-2 border-b border-green-200">
                <div class="flex items-center justify-between">
                  <div class="flex-1 min-w-0 pr-2">
                    <!-- 기관명, 해석일자, 해석제목 표시 -->
                    <div class="text-sm text-gray-600 mb-1">
                      <span class="font-medium">{{ getCourtName(result) }}</span>
                      <span class="mx-2">·</span>
                      <span>{{ getDecisionDate(result) }}</span>
                    </div>
                    <div class="text-base font-semibold text-[#166534] mb-1">
                      <a :href="getLawUrl(result)"
                         target="_blank"
                         rel="noopener noreferrer"
                         class="hover:underline truncate block w-full"
                         :title="getTitle(result)">
                        {{ getTitle(result) }}
                      </a>
                    </div>
                  </div>
                  <!-- 미리 보기 버튼 -->
                  <button @click="openPreviewModal(result, 'interpretation')"
                          class="ml-3 p-2 text-gray-500 hover:text-[#166534] hover:bg-green-100 rounded-lg transition-colors"
                          title="법령해석례 미리 보기">
                    <!-- 대각선 화살표 아이콘 (확대 의미) -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                </div>
              </div>

              <div
                  v-for="[key, value] in Object.entries(result).filter(([k]) => !shouldHideContentLabel(k))"
                  :key="key"
                  class="mb-1"
              >
                <span class="text-sm font-semibold text-[#166534]">{{ key }}:</span>
                <span class="text-sm text-gray-700 ml-1 block max-h-24 overflow-y-auto whitespace-pre-line break-words">
                  {{ formatValue(value, key) }}
                </span>
              </div>
            </div>
            <div v-if="!interpretationResults.length" class="text-gray-400 text-center py-4">
              법령해석례 검색 결과가 없습니다.
            </div>
          </div>

          <!-- 행정심판례 탭 -->
          <div v-if="activeRightTab === 'appeal'" id="admin-appeal-panel" data-panel-type="appeal">
            <div v-for="(result, index) in appealResults"
                 :key="index"
                 class="mb-4 p-4 bg-[#fef3c7] rounded-lg shadow-sm border border-[#fde047]">

              <!-- 행정심판례 헤더 정보 -->
              <div class="mb-3 pb-2 border-b border-yellow-200">
                <div class="flex items-center justify-between">
                  <div class="flex-1 min-w-0 pr-2">
                    <!-- 심판위원회명, 재결일자, 사건명 표시 -->
                    <div class="text-sm text-gray-600 mb-1">
                      <span class="font-medium">{{ getCourtName(result) }}</span>
                      <span class="mx-2">·</span>
                      <span>{{ getDecisionDate(result) }}</span>
                    </div>
                    <div class="text-base font-semibold text-[#92400e] mb-1">
                      <a :href="getLawUrl(result)"
                         target="_blank"
                         rel="noopener noreferrer"
                         class="hover:underline truncate block w-full"
                         :title="getTitle(result)">
                        {{ getTitle(result) }}
                      </a>
                    </div>
                  </div>
                  <!-- 미리 보기 버튼 -->
                  <button @click="openPreviewModal(result, 'appeal')"
                          class="ml-3 p-2 text-gray-500 hover:text-[#92400e] hover:bg-yellow-100 rounded-lg transition-colors"
                          title="행정심판례 미리 보기">
                    <!-- 대각선 화살표 아이콘 (확대 의미) -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                </div>
              </div>

              <div
                  v-for="[key, value] in Object.entries(result).filter(([k]) => !shouldHideContentLabel(k))"
                  :key="key"
                  class="mb-1"
              >
                <span class="text-sm font-semibold text-[#92400e]">{{ key }}:</span>
                <span class="text-sm text-gray-700 ml-1 block max-h-24 overflow-y-auto whitespace-pre-line break-words">
                  {{ formatValue(value, key) }}
                </span>
              </div>
            </div>
            <div v-if="!appealResults.length" class="text-gray-400 text-center py-4">
              행정심판례 검색 결과가 없습니다.
            </div>
          </div>
        </div>
        
        <!-- 우측 사이드바 리사이즈 핸들 -->
        <div @mousedown="startResizeRight" 
             class="absolute top-0 left-0 w-1 h-full cursor-col-resize bg-transparent hover:bg-blue-300/50 transition-colors duration-200 z-10">
        </div>
      </aside>
      <button v-else @click="showRightSidebar = true" class="fixed right-0 top-[100px] z-50 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-l-2xl px-4 py-3 shadow-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 flex items-center group backdrop-blur-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        <span class="font-semibold">관련자료</span>
      </button>
    </main>

    <!-- Footer -->
    <footer class="py-1 bg-gradient-to-r from-slate-800 via-blue-900 to-indigo-900 border-t border-blue-200/20 flex items-center justify-center text-slate-300 text-xs backdrop-blur-xl flex-shrink-0">
      <div class="flex items-center gap-2">
        <span>© <span class="font-semibold text-blue-300">WISE</span> 법률 리서치 어시스턴트. All rights reserved.</span>
      </div>
    </footer>

    <!-- 판례 미리 보기 모달 -->
    <div v-if="showPreviewModal" 
         id="case-preview-modal" 
         class="fixed inset-0 flex items-center justify-center z-50 p-4" 
         style="background-color: rgba(0, 0, 0, 0.7);" 
         @click="closePreviewModal">
      <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full h-[70vh] overflow-hidden flex flex-col" @click.stop>
        <!-- 모달 헤더 -->
        <div :class="[getModalHeaderClasses(), 'text-white p-6']">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <h2 class="text-xl font-bold mb-2" v-if="previewData">
                <a href="#" @click.prevent="openFullCaseLawUrl(previewData)" 
                   class="hover:underline text-white" 
                   :title="previewData.title">
                  {{ previewData.title }}
                </a>
              </h2>
              <div class="text-sm opacity-90" v-if="previewData">
                <span class="font-medium">{{ previewData.court }}</span>
                <span class="mx-2">·</span>
                <span>{{ previewData.date }}</span>
                <span class="mx-2">·</span>
                <span>사건번호: {{ previewData.sourceId }}</span>
              </div>
            </div>
            <button @click="closePreviewModal" class="ml-4 text-white hover:text-gray-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- 모달 내용 -->
        <div class="flex-1 overflow-y-auto p-6" style="min-height: 0;">
          <div v-if="previewData" class="prose max-w-none">
            <!-- 판례 해석 섹션 (판례인 경우만 표시) -->
            <div v-if="currentModalPanelType === 'precedent'" class="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <div class="flex items-center gap-2 mb-4">
                <!-- AI 스타일 아이콘 -->
                <div class="flex items-center justify-center w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
                  <span class="text-white text-xs font-bold">AI</span>
                </div>
                <h3 class="text-lg font-bold text-blue-800 m-0">판례 해석</h3>
              </div>

              <!-- 로딩 중일 때 -->
              <div v-if="previewData.isLoading || !previewData.annotation" class="flex items-center justify-center py-8">
                <div class="flex items-center gap-3">
                  <div class="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span class="text-blue-700 font-medium">판례 분석 중...</span>
                </div>
              </div>

              <!-- 해석 데이터가 로드된 후 -->
              <div v-else-if="previewData.annotation" class="space-y-4">
                <!-- 나머지 항목들을 정해진 순서로 표시 (사건종류 포함) -->
                <template v-for="key in ['사건종류', '전체요약', '판결정보', '판결사유', '쟁점', '사실관계']" :key="key">
                  <div v-if="previewData.annotation[key]" class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div class="flex items-center gap-2 mb-2">
                      <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <h4 class="font-semibold text-gray-800 text-base m-0">{{ key }}</h4>
                    </div>
                    <div class="text-gray-700 leading-relaxed" v-html="renderAnnotatedText(previewData.annotation[key])"></div>
                  </div>
                </template>
              </div>
            </div>

            <!-- 판례 본문 -->
            <div class="p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div class="flex items-center gap-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 class="text-lg font-bold text-gray-800 m-0">
                  {{ currentModalPanelType === 'precedent' ? '판례 본문' :
                     currentModalPanelType === 'constitutional' ? '헌재결정례 본문' :
                     currentModalPanelType === 'interpretation' ? '법령해석례 본문' :
                     currentModalPanelType === 'appeal' ? '행정심판례 본문' : '본문' }}
                </h3>
              </div>

              <!-- 로딩 중일 때 -->
              <div v-if="previewData.isLoading || !previewData.content" class="flex items-center justify-center py-8">
                <div class="flex items-center gap-3">
                  <div :class="['w-5 h-5 border-2 border-t-transparent rounded-full animate-spin', getModalSpinnerClasses()]"></div>
                  <span class="text-gray-600 font-medium">{{ getModalLoadingText() }}</span>
                </div>
              </div>

              <!-- 본문이 로드된 후 -->
              <div v-else class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div class="whitespace-pre-line text-gray-800 leading-relaxed">{{ previewData.content }}</div>
              </div>
            </div>
          </div>
          <div v-else class="flex items-center justify-center py-12">
            <div class="flex items-center gap-3">
              <div :class="['w-6 h-6 border-2 border-t-transparent rounded-full animate-spin', getModalSpinnerClasses()]"></div>
              <span class="text-gray-600">{{ getModalLoadingText() }}</span>
            </div>
          </div>
        </div>

        <!-- 모달 하단 -->
        <div class="bg-gray-50 px-6 py-4 border-t flex-shrink-0">
          <div class="flex items-center justify-between">
            <div class="text-xs text-gray-500">
              {{ getModalFooterText() }}
            </div>
            <button @click="closePreviewModal" 
                    :class="['px-4 py-2 text-white rounded-lg transition-colors font-medium', getModalButtonClasses()]">
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {nextTick, onMounted, ref, watch} from 'vue'
import fieldMapping from '~/data/field_mapping.json';

const messages = ref([])
const inputMessage = ref('')
const searchType = ref('keyword')
const isTutorialVisible = ref(false)
const isLoading = ref(false)
const chatContainer = ref(null)
const isComposing = ref(false)

// 파일 업로드 관련 상태
const selectedFile = ref(null)
const fileInput = ref(null)
const inputTextarea = ref(null)

// 사이드바 토글 상태
const showLeftSidebar = ref(true)
const showRightSidebar = ref(true)

// 사이드바 크기 조절 상태
const leftSidebarWidth = ref(320) // 기본값 320px (w-80 = 20rem = 320px)
const rightSidebarWidth = ref(384) // 기본값 384px (w-96 = 24rem = 384px)
const isResizingLeft = ref(false)
const isResizingRight = ref(false)

// 채팅 히스토리 관련 상태
const chatHistory = ref([])
const currentChatIndex = ref(-1)

// API 엔드포인트 설정 (데모 모드 - Mock API 사용)
// 모든 API 호출은 plugins/mock-api.client.ts에서 가로채기됩니다
const API_BASE_URL = ""

// API 테스트 관련 상태
const showApiTest = ref(false)
const testQuery = ref('')
const testSearchType = ref('keyword')
const testResults = ref(null)
const isTesting = ref(false)

// 현재 검색 결과를 저장할 상태 추가
const currentSearchResults = ref([])

// 재정의된 질문 리스트
const redefinedQuestions = ref([])

// 추가 탭 결과 저장 상태
const constitutionalResults = ref([])
const interpretationResults = ref([])
const appealResults = ref([])
const activeRightTab = ref('precedent')

// 선택된 서비스 타입
const selectedService = ref('precedent_search')

// 날짜 포맷 함수
const formatDate = (date) => {
  return new Date(date).toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 청크 필드 키워드 (내용일부는 레이블로 표시하지 않지만 포맷팅은 적용)
const CHUNK_FIELD_KEYWORDS = ['내용', 'chunk', '내용일부']

const formatValue = (value, key = null) => {
  if (Array.isArray(value)) {
    return value.join(', ')
  } else if (typeof value === 'object' && value !== null) {
    return JSON.stringify(value)
  } else {
    // 청크 내용 필드인 경우 특별 처리
    if (key && CHUNK_FIELD_KEYWORDS.some(keyword => key.includes(keyword))) {
      let content = String(value)
      // BR 태그만 라인브레이크로 변환
      content = content.replace(/<br\s*\/?>/gi, '\n')
      // 다른 HTML 태그 제거
      content = content.replace(/<[^>]*>/g, '')
      // 앞뒤에 ... 추가
      return `...${content}...`
    }
    return value
  }
}

// 마크다운 렌더링 함수
const renderMarkdown = (text) => {
  if (!text) return ''

  let html = text
    // Headers: # ## ### #### ##### ######
    .replace(/^######\s+(.+)$/gm, '<h6 class="text-sm font-semibold text-gray-700 mt-2 mb-1">$1</h6>')
    .replace(/^#####\s+(.+)$/gm, '<h5 class="text-base font-semibold text-gray-700 mt-2 mb-1">$1</h5>')
    .replace(/^####\s+(.+)$/gm, '<h4 class="text-lg font-semibold text-gray-800 mt-2 mb-1">$1</h4>')
    .replace(/^###\s+(.+)$/gm, '<h3 class="text-xl font-semibold text-gray-800 mt-2 mb-1">$1</h3>')
    .replace(/^##\s+(.+)$/gm, '<h2 class="text-2xl font-bold text-[#2b6cb0] mt-3 mb-2">$1</h2>')
    .replace(/^#\s+(.+)$/gm, '<h1 class="text-3xl font-bold text-[#232946] mt-3 mb-2">$1</h1>')
    // Bold: **text** or __text__
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>')
    // Italic: *text* or _text_
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    // Code: `code`
    .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>')

  // Process lists (ordered and unordered with 2 depth support)
  html = html.replace(/^(\s*)([\d]+\.|\-|\*|\+)\s+(.+)$/gm, (match, indent, marker, content) => {
    const depth = Math.floor(indent.length / 2)
    const isOrdered = /^\d+\./.test(marker)
    const listClass = depth === 0 ? 'ml-4' : 'ml-8'
    const bulletStyle = isOrdered
      ? (depth === 0 ? 'list-decimal' : 'list-decimal')
      : (depth === 0 ? 'list-disc' : 'list-circle')

    return `<li class="${listClass} ${bulletStyle}">${content}</li>`
  })

  // 리스트 아이템을 ul/ol 태그로 래핑하는 헬퍼 함수
  const wrapListItems = (html, listType, bulletStyle, marginClass, indentClass) => {
    const tagName = listType === 'decimal' ? 'ol' : 'ul'
    const pattern = new RegExp(`(<li class="${indentClass} list-${bulletStyle}">.*?<\\/li>)(?:\\n<li class="${indentClass} list-${bulletStyle}">.*?<\\/li>)*`, 'g')
    return html.replace(pattern, (match) => {
      return `<${tagName} class="list-${bulletStyle} ${indentClass} ${marginClass}">${match.replace(new RegExp(`class="${indentClass} list-${bulletStyle}"`, 'g'), '')}</${tagName}>`
    })
  }

  // 리스트 래핑 적용
  html = wrapListItems(html, 'unordered', 'disc', 'my-1', 'ml-4')
  html = wrapListItems(html, 'decimal', 'decimal', 'my-1', 'ml-4')
  html = wrapListItems(html, 'unordered', 'circle', 'my-0.5', 'ml-8')
  html = wrapListItems(html, 'decimal', 'decimal', 'my-0.5', 'ml-8')

  // Line breaks
  html = html.replace(/\n/g, '<br>')

  return html
}

const feedbackState = ref({ messageId: null, type: null, score: null, comment: '' });
const feedbackSubmittedId = ref(null);

// 메시지별 정보 저장 (이제 메시지 객체에 직접 저장하므로 불필요)
// const messageMetadata = ref(new Map());

// 미리 보기 모달 상태
const showPreviewModal = ref(false);
const previewData = ref(null);
const currentModalPanelType = ref('precedent');

// Tooltip 상태 관리
const showTooltip = ref({});

const handleFeedback = (messageId, feedbackType) => {
  // 초기 별점 설정 (좋아요: 5점, 싫어요: 1점으로 시작)
  const initialScore = feedbackType === 'thumbs_up' ? 5 : 1;
  feedbackState.value = { messageId, type: feedbackType, score: initialScore, comment: '' };
};

const confirmFeedback = async () => {
  if (!feedbackState.value.messageId) return;

  const { messageId, type } = feedbackState.value;

  try {
    // 해당 메시지 찾기
    const botMessage = messages.value.find(m => m.id === messageId);
    if (!botMessage) {
      console.error('메시지를 찾을 수 없음:', messageId);
      return;
    }

    const metadata = botMessage.metadata;
    console.log('피드백 제출 - 메시지 ID:', messageId, '메타데이터:', metadata);

    if (!metadata || !metadata.serviceLogId) {
      console.error('필수 메타데이터가 없음:', metadata);
      return;
    }

    // 사용자 메시지 찾기 (봇 응답의 바로 이전 메시지)
    const messageIndex = messages.value.findIndex(m => m.id === messageId);
    let userMessage = null;
    for (let i = messageIndex - 1; i >= 0; i--) {
      if (messages.value[i].isUser) {
        userMessage = messages.value[i];
        break;
      }
    }

    if (!userMessage) return;

    // 피드백 데이터 준비 (FormData 형식)
    const formData = new FormData();
    formData.append('rating', type);
    formData.append('score', feedbackState.value.score.toString());
    formData.append('service_log_id', metadata.serviceLogId);

    if (metadata.loggingId) formData.append('user_id', metadata.loggingId);
    if (feedbackState.value.comment) {
      formData.append('comment', feedbackState.value.comment);
    } else {
      formData.append('comment', type === 'thumbs_up' ? '유용한 검색결과였습니다' : '검색결과를 개선해주세요');
    }
    formData.append('service_type', userMessage.service || 'precedent_search');
    formData.append('query', userMessage.text);
    formData.append('response_content', botMessage.text || '');

    // query_log_id는 판례검색일 때만 추가
    if (metadata.queryLogId && userMessage.service === 'precedent_search') {
      formData.append('query_log_id', metadata.queryLogId);
    }

    console.log('피드백 전송 데이터:', Object.fromEntries(formData));

    // API 호출
    const response = await fetch(API_BASE_URL + '/legal/feedback', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'x-token': 'wisenut'
      },
      body: formData
    });

    if (!response.ok) {
      console.error('피드백 제출 실패:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      // 에러가 발생해도 UI는 정상 처리 (사용자 경험 우선)
    } else {
      console.log('피드백 제출 성공');
    }

  } catch (error) {
    console.error('피드백 제출 중 오류 발생:', error);
    // 에러가 발생해도 UI는 정상 처리
  }

  // UI 업데이트
  feedbackSubmittedId.value = messageId;
  feedbackState.value = { messageId: null, type: null, score: null, comment: '' };

  setTimeout(() => {
    if (feedbackSubmittedId.value === messageId) {
      feedbackSubmittedId.value = null;
    }
  }, 3000);
};

const cancelFeedback = () => {
  feedbackState.value = { messageId: null, type: null, score: null, comment: '' };
};

// 파일 업로드 관련 메소드
const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // 파일 확장자 검사
  const allowedExtensions = ['.txt', '.pdf', '.docx'];
  const fileExtension = '.' + file.name.split('.').pop().toLowerCase();

  if (!allowedExtensions.includes(fileExtension)) {
    alert('지원하지 않는 파일 형식입니다. .txt, .pdf, .docx 파일만 업로드 가능합니다.');
    event.target.value = '';
    return;
  }

  // 파일 크기 검사 (10MB = 10 * 1024 * 1024 bytes)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    alert('파일 크기가 너무 큽니다. 최대 10MB까지 업로드 가능합니다.');
    event.target.value = '';
    return;
  }

  selectedFile.value = file;
};

const removeFile = () => {
  selectedFile.value = null;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// 텍스트 영역 자동 높이 조절
const adjustTextareaHeight = () => {
  if (!inputTextarea.value) return;

  const textarea = inputTextarea.value;
  const maxHeight = 200; // max-height와 일치
  const minHeight = 56; // min-height와 일치

  // 높이 초기화
  textarea.style.height = 'auto';
  const scrollHeight = textarea.scrollHeight;
  const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);

  // 새로운 높이 적용
  textarea.style.height = newHeight + 'px';

  // 스크롤바 동적 제어
  if (newHeight >= maxHeight && scrollHeight > maxHeight) {
    // 스크롤이 필요한 경우
    textarea.style.overflowY = 'auto';
  } else {
    // 스크롤이 필요 없는 경우
    textarea.style.overflowY = 'hidden';
  }
};

// Composition 이벤트 핸들링 (한글 입력 처리)
const handleCompositionStart = () => {
  isComposing.value = true;
};

const handleCompositionEnd = () => {
  isComposing.value = false;
};

// 키보드 이벤트 핸들링
const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
    // 한글 입력 중일 때는 Enter 무시
    if (isComposing.value) {
      return;
    }
    
    if (event.shiftKey) {
      // Shift + Enter: 줄바꿈
      return;
    } else {
      // Enter: 메시지 전송
      event.preventDefault();
      sendMessage();
    }
  }
};

// 사이드바 너비에 따른 제목 길이 계산
const getTitleLength = () => {
  // 사이드바 너비에 따라 표시할 문자 수를 동적으로 계산
  // 200px(최소) -> 20자, 400px -> 60자, 600px(최대) -> 100자
  const minWidth = 200
  const maxWidth = 600
  const minChars = 20
  const maxChars = 100

  const ratio = (leftSidebarWidth.value - minWidth) / (maxWidth - minWidth)
  const clampedRatio = Math.max(0, Math.min(1, ratio))
  return Math.round(minChars + (maxChars - minChars) * clampedRatio)
}

// 메시지 전송 시 히스토리 업데이트
const updateChatHistory = (message) => {
  // 검색 결과를 제거한 메시지 복사본 생성
  const messageForHistory = {
    ...message,
    searchResults: undefined // 검색 결과 제거
  }

  const titleLength = getTitleLength()
  const title = message.text.slice(0, titleLength) + (message.text.length > titleLength ? '...' : '')

  if (currentChatIndex.value === -1) {
    // 새 대화 시작
    const newChat = {
      id: Date.now(),
      title: title,
      messages: [messageForHistory],
      timestamp: new Date().toISOString()
    }
    chatHistory.value = [newChat, ...chatHistory.value] // 기존 대화 기록 유지하면서 새 대화 추가
    currentChatIndex.value = 0
  } else {
    // 기존 대화에 메시지 추가
    const updatedHistory = [...chatHistory.value]
    updatedHistory[currentChatIndex.value] = {
      ...updatedHistory[currentChatIndex.value],
      messages: [...updatedHistory[currentChatIndex.value].messages, messageForHistory]
    }
    if (message.isUser) {
      updatedHistory[currentChatIndex.value].title = title
    }
    chatHistory.value = updatedHistory
  }
}

// 재정의된 질문 클릭 핸들러
const handleRedefinedQuestion = (question) => {
  // 입력창에 질문을 설정하고 자동으로 전송
  inputMessage.value = question
  nextTick(() => {
    sendMessage()
  })
}

// 가장 최근 봇 메시지인지 확인하는 함수
const isLastBotMessage = (messageId) => {
  // 메시지 배열을 역순으로 순회하여 첫 번째 봇 메시지를 찾음
  for (let i = messages.value.length - 1; i >= 0; i--) {
    const message = messages.value[i]
    if (!message.isUser) {
      return message.id === messageId
    }
  }
  return false
}

// 새 대화 시작
const startNewChat = () => {
  messages.value = []
  currentChatIndex.value = -1
  inputMessage.value = ''
  currentSearchResults.value = []
  redefinedQuestions.value = []

  // 추가 탭 결과 초기화
  constitutionalResults.value = []
  interpretationResults.value = []
  appealResults.value = []
}

// 대화 불러오기
const loadChat = (index) => {
  currentChatIndex.value = index
  const selectedChat = chatHistory.value[index]
  if (selectedChat) {
    messages.value = [...selectedChat.messages]
    // 검색 결과 초기화 (대화기록에는 검색 결과가 저장되지 않음)
    currentSearchResults.value = []
    redefinedQuestions.value = []
    // 입력창 초기화
    inputMessage.value = ''
  }
}

const showTutorial = () => {
  isTutorialVisible.value = true
}

const hideTutorial = () => {
  isTutorialVisible.value = false
}

const setSearchType = (type) => {
  searchType.value = type
}

// 채팅 컨테이너 스크롤을 항상 최하단으로 유지
const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

const sendMessage = async () => {
  if (!inputMessage.value.trim() || isLoading.value) return

  const userMessage = inputMessage.value
  
  // 사용자 메시지 추가
  const userMessageObj = {
    id: Date.now(),
    text: userMessage,
    isUser: true,
    attachedFile: selectedFile.value ? {
      name: selectedFile.value.name,
      size: selectedFile.value.size,
      type: selectedFile.value.type
    } : null,
    service: selectedService.value
  }

  messages.value.push(userMessageObj)
  updateChatHistory(userMessageObj)

  // 입력창과 파일 초기화
  inputMessage.value = ''
  const currentFile = selectedFile.value
  selectedFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }

  // 텍스트 영역 높이 초기화
  nextTick(() => {
    if (inputTextarea.value) {
      inputTextarea.value.style.height = '56px'
    }
  })

  // 로딩 상태 시작
  isLoading.value = true
  scrollToBottom()

  // 추출된 재정의 질문을 저장할 변수 (판례검색에서만 사용)
  let extractedRedefinedQuestions = []

  try {
    const endpoint = API_BASE_URL + '/legal/predict';
    // const endpoint = "http://localhost:8001" + '/legal/predict';

    const formData = new FormData();
    formData.append('service', selectedService.value);
    formData.append('input_text', userMessage);
    
    if (currentFile) {
      formData.append('input_file', currentFile);
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'x-token': 'wisenut'
      },
      body: formData
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('API Error Response:', errorText)
      
      // JSON 형태의 에러 메시지 파싱 시도
      let errorMessage
      try {
        const errorData = JSON.parse(errorText)
        errorMessage = errorData.error_message || errorData.message || errorText
      } catch (parseError) {
        console.error('Error parsing JSON response:', parseError)
        // JSON 파싱 실패 시 원본 에러 텍스트 사용
        errorMessage = errorText
      }
      throw new Error(errorMessage)
    }

    const contentType = response.headers.get('content-type')
    let responseData
    let responseText = ''

    try {
      responseText = await response.text()
      if (contentType && contentType.includes('application/json')) {
        responseData = JSON.parse(responseText)
      } else {
        console.error('API 응답이 JSON이 아님:', responseText.slice(0, 500))
        throw new Error('API 응답이 JSON 형식이 아닙니다. (콘솔에서 원본 확인)')
      }
    } catch (e) {
      console.error('Response parsing error:', e, '\nRaw response:', responseText.slice(0, 500))
      throw new Error('API 응답을 파싱할 수 없습니다. (콘솔에서 원본 확인)')
    }

    // 응답 처리
    if (!responseData) {
      console.error('Response data is null or undefined')
      throw new Error('API 응답이 없습니다.')
    }

    console.log('API Response Data:', responseData)

    // 응답에서 필요한 ID들 추출
    const loggingId = responseData.logging_id || responseData.result?.logging_id || null;
    const serviceLogId = responseData.result?.service_log_id || responseData.service_log_id || null;
    const queryLogId = responseData.result?.query_log_id || responseData.query_log_id || null;
    console.log('응답 메타데이터:', { loggingId, serviceLogId, queryLogId });

    let botMessageText = ''

    // 서비스 타입별 응답 처리
    if (selectedService.value === 'precedent_search') {
      // 판례 검색 처리 (기존 로직)
      if (responseData.result){
        responseData = responseData.result
      }

      // redefined_questions 추출 (나중에 메시지에 저장)
      if (responseData.result && responseData.result.redefined_questions) {
        extractedRedefinedQuestions = responseData.result.redefined_questions
      } else if (responseData.redefined_questions) {
        extractedRedefinedQuestions = responseData.redefined_questions
      }

      // hits 배열이 없는 경우 빈 배열로 처리
      let hits = []
      if (responseData.result && Array.isArray(responseData.result.hits)) {
        hits = responseData.result.hits
      } else if (Array.isArray(responseData)) {
        hits = responseData
      }

      if (hits.length === 0) {
        const botMessageObj = {
          id: Date.now(),
          text: '검색 결과가 없습니다.',
          isUser: false,
          searchResults: []
        }
        messages.value.push(botMessageObj)
        updateChatHistory(botMessageObj)
        return
      }

      const results = hits.map(hit => {
        const sourceObj = hit._source || hit
        const in_result = Object.entries(sourceObj).reduce((acc, [key, value]) => {
          const translatedKey = fieldMapping[key] || key;
          acc[translatedKey] = value;
          return acc;
        }, {});
        return in_result
      })

      // 현재 검색 결과 업데이트
      currentSearchResults.value = results

      // relevance_analysis 데이터 저장
      const searchInfo = responseData.result?.result?.search_info || responseData.result?.search_info || responseData.search_info
      if (searchInfo && searchInfo.relevance_analysis) {
        // relevance_analysis를 result_index별로 매핑
        const relevanceMap = {}
        searchInfo.relevance_analysis.forEach(analysis => {
          relevanceMap[analysis.result_index] = analysis
        })

        // 각 결과에 relevance 정보 추가
        currentSearchResults.value = results.map((result, index) => {
          const relevance = relevanceMap[index]
          return {
            ...result,
            relevance_level: relevance?.relevance_level,
            relevance_reasons: relevance?.relevance_reasons,
            key_matches: relevance?.key_matches,
            relevance_explanation: relevance?.relevance_explanation,
            score: relevance?.score
          }
        })
      }

      // detc_expc_decc 필드 처리
      if (responseData.result && responseData.result.detc_expc_decc) {
        const detcExpcDecc = responseData.result.detc_expc_decc

        // 헌재 결정례 처리
        if (detcExpcDecc['alias-detc-search']) {
          constitutionalResults.value = detcExpcDecc['alias-detc-search'].map(item => {
            const sourceObj = item._source || item
            const processed = Object.entries(sourceObj).reduce((acc, [key, value]) => {
              const translatedKey = fieldMapping[key] || key
              acc[translatedKey] = value
              return acc
            }, {})
            return processed
          })
        }

        // 법령해석례 처리
        if (detcExpcDecc['alias-expc-search']) {
          interpretationResults.value = detcExpcDecc['alias-expc-search'].map(item => {
            const sourceObj = item._source || item
            const processed = Object.entries(sourceObj).reduce((acc, [key, value]) => {
              const translatedKey = fieldMapping[key] || key
              acc[translatedKey] = value
              return acc
            }, {})
            return processed
          })
        }

        // 행정심판례 처리
        if (detcExpcDecc['alias-decc-search']) {
          appealResults.value = detcExpcDecc['alias-decc-search'].map(item => {
            const sourceObj = item._source || item
            const processed = Object.entries(sourceObj).reduce((acc, [key, value]) => {
              const translatedKey = fieldMapping[key] || key
              acc[translatedKey] = value
              return acc
            }, {})
            return processed
          })
        }
      }

      botMessageText = responseData.result?.llm || ''
      console.log('[DEBUG] precedent_search botMessageText:', botMessageText ? botMessageText.substring(0, 100) + '...' : '(비어있음)')

    } else if (selectedService.value === 'complaint_generation' || selectedService.value === 'draft_request') {
      // 소장 생성 / 의뢰서 초안 작성 처리 (OpenAI chat completion 형태)
      console.log('Chat completion response:', responseData)

      responseData = responseData.result || responseData

      // 여러 가능한 경로에서 content 추출 시도
      let content = null
      
      if (responseData.choices && responseData.choices[0] && responseData.choices[0].message) {
        content = responseData.choices[0].message.content
      } else if (responseData.result && responseData.result.choices) {
        content = responseData.result.choices[0]?.message?.content
      } else if (responseData.content) {
        content = responseData.content
      } else if (responseData.result && responseData.result.content) {
        content = responseData.result.content
      } else if (responseData.message) {
        content = responseData.message
      }
      
      // <think> 태그 제거 - AI가 생각하는 과정을 사용자에게 보여주지 않음
      if (content && content.includes('<think>')) {
        const thinkEndIndex = content.lastIndexOf('</think>')
        if (thinkEndIndex !== -1) {
          content = content.substring(thinkEndIndex + 8).trim()
        }
      }
      
      botMessageText = content || '응답을 불러올 수 없습니다.'
      console.log('Extracted content:', botMessageText.substring(0, 200) + '...')
      
      // 검색 결과 초기화 (소장/의뢰서는 검색 결과가 없음)
      currentSearchResults.value = []
      redefinedQuestions.value = []
      constitutionalResults.value = []
      interpretationResults.value = []
      appealResults.value = []
      
    } else if (selectedService.value === 'fee_prediction') {
      // 수임료 예측 처리 - 중첩된 result 구조 처리
      const result = responseData.result?.result || responseData.result || {}
      
      console.log('Fee prediction result:', result)
      
      // 수임료 분석 결과를 텍스트로 포맷팅
      let analysisText = '### 수임료 분석 결과\n\n'
      
      const fields = [
        { key: '소송 구분', label: '소송 구분' },
        { key: '사건 구분', label: '사건 구분' },
        { key: '소가', label: '소가' },
        { key: '심급', label: '심급' },
        { key: '사건 종류', label: '사건 종류' },
        { key: '당사자 수', label: '당사자 수' },
      ]
      
      analysisText += '### 사건 정보\n'
      fields.forEach(field => {
        const value = result[field.key] || '정보 없음'
        // 소가가 숫자인 경우 원화로 포맷
        if (field.key === '소가' && value && value !== '정보 없음' && !isNaN(value)) {
          const formattedAmount = parseInt(value).toLocaleString('ko-KR')
          analysisText += `- **${field.label}**: ${formattedAmount}원\n`
        } else {
          analysisText += `- **${field.label}**: ${value || '정보 없음'}\n`
        }
      })
      
      // 특별 상황
      analysisText += '\n### 특별 상황\n'
      analysisText += `- **정신적 고통으로 빠른 종결 희망**: ${result['정신적 고통으로 빠른 종결 희망'] ? '✅ 예' : '❌ 아니오'}\n`
      analysisText += `- **지속적 경제적 손해로 빠른 종결 필요**: ${result['지속적 경제적 손해로 빠른 종결 필요'] ? '✅ 예' : '❌ 아니오'}\n`
      analysisText += `- **증거 빈약**: ${result['증거 빈약'] ? '✅ 예' : '❌ 아니오'}\n`
      analysisText += `- **상대방 법인 여부**: ${result['상대방 법인 여부'] ? '✅ 예' : '❌ 아니오'}\n`

      // 분석 근거
      if (result['분석 근거'] && Array.isArray(result['분석 근거']) && result['분석 근거'].length > 0) {
        analysisText += '\n### 분석 근거\n'
        result['분석 근거'].forEach((reason, index) => {
          analysisText += `${index + 1}. ${reason}\n`
        })
      }
      
      botMessageText = analysisText
      
      // 검색 결과 초기화 (수임료 예측은 검색 결과가 없음)
      currentSearchResults.value = []
      redefinedQuestions.value = []
      constitutionalResults.value = []
      interpretationResults.value = []
      appealResults.value = []
    }

    const botMessageId = Date.now();

    // 메시지 메타데이터를 메시지 객체에 직접 저장
    const metadata = {
      loggingId,
      serviceLogId,
      queryLogId: selectedService.value === 'precedent_search' ? queryLogId : null
    };
    console.log('메시지 ID', botMessageId, '에 메타데이터 저장됨:', metadata);

    console.log('[DEBUG] Final botMessageText length:', botMessageText.length)
    console.log('[DEBUG] Final botMessageText preview:', botMessageText.substring(0, 100))

    const botMessageObj = {
      id: botMessageId,
      text: botMessageText,
      isUser: false,
      searchResults: [],
      metadata: serviceLogId ? metadata : null,
      redefinedQuestions: selectedService.value === 'precedent_search' ? extractedRedefinedQuestions : []
    }

    console.log('[DEBUG] botMessageObj:', { id: botMessageObj.id, textLength: botMessageObj.text.length, hasText: !!botMessageObj.text })

    messages.value.push(botMessageObj)
    updateChatHistory(botMessageObj)

    } catch (error) {
      console.error('Error in sendMessage:', error)
      const errorMessageObj = {
        id: Date.now(),
        text: `검색 중 오류가 발생했습니다: ${error.message}`,
        isUser: false
      }
      messages.value.push(errorMessageObj)
      updateChatHistory(errorMessageObj)
    } finally {
      isLoading.value = false
      scrollToBottom()
    }
}

// 메시지가 추가될 때마다 스크롤을 최하단으로 이동
watch(messages, () => {
  nextTick(() => {
    scrollToBottom()
  })
})

// 입력 메시지가 변경될 때마다 텍스트 영역 높이 조절
watch(inputMessage, () => {
  nextTick(() => {
    adjustTextareaHeight()
  })
})


// 컴포넌트 마운트 시 로컬 스토리지에서 대화 기록 불러오기
onMounted(() => {
  const savedHistory = localStorage.getItem('chatHistory')
  if (savedHistory) {
    try {
      const parsedHistory = JSON.parse(savedHistory)
      chatHistory.value = Array.isArray(parsedHistory) ? parsedHistory : []
    } catch (e) {
      console.error('Failed to load chat history:', e)
      chatHistory.value = []
    }
  }

  // 초기 채팅이 없으면 자동으로 새 채팅 시작
  if (chatHistory.value.length === 0) {
    // 빈 초기 상태로 시작 (사용자가 첫 메시지를 보낼 때 새 채팅 생성)
    currentChatIndex.value = -1
  }
})

// 대화 기록이 변경될 때마다 로컬 스토리지에 저장
watch(chatHistory, (newHistory) => {
  try {
    localStorage.setItem('chatHistory', JSON.stringify(newHistory))
  } catch (e) {
    console.error('Failed to save chat history:', e)
  }
}, { deep: true })

// 대화 기록 삭제 함수 추가
const deleteChat = (index) => {
  if (confirm('이 대화를 삭제하시겠습니까?')) {
    chatHistory.value = chatHistory.value.filter((_, i) => i !== index)
    if (currentChatIndex.value === index) {
      startNewChat()
    } else if (currentChatIndex.value > index) {
      currentChatIndex.value--
    }
  }
}

// 대화기록에서 '이 대화로 초기화' 기능
const resetToSingleChat = (index) => {
  const selected = chatHistory.value[index]
  if (selected && confirm('이 대화만 남기고 모두 삭제할까요?')) {
    chatHistory.value = [selected]
    currentChatIndex.value = 0
    messages.value = [...selected.messages]
    // 검색 결과 초기화
    currentSearchResults.value = []
    // 입력창 초기화
    inputMessage.value = ''
  }
}


const getCourtName = (result) => {
  const keys = ['법원명', '해석기관명', '처분청', '재결청']
  const key = keys.find(k => result[k])
  return key ? result[key] : ''
}

const getDecisionDate = (result) => {
  const keys = ['결정일자', '해석일자', '선고일자']
  const key = keys.find(k => result[k])

  if (!key) {
    return ``
  }

  let dateStr = result[key]

  if (!dateStr || dateStr.length !== 8) return dateStr;
  
  const year = dateStr.substring(0, 4);
  const month = dateStr.substring(4, 6);
  const day = dateStr.substring(6, 8);
  return `${year}.${month}.${day}`;
}

const getTitle = (result) => {
  return result.사건명
}

const getSourceId = (result) => {
  return result.source_id
}

const getLawUrl = (result) => {
  return result.상세링크
}

// 상세 링크 레이블 숨김 처리 함수
const shouldHideContentLabel = (key) => {
  const hideLabels = ['상세링크', 'source_id', 'id', 'timestamp', 'chunk_num', 'relevance_level', 'relevance_reasons', 'key_matches', 'relevance_explanation', 'score'];
  return hideLabels.includes(key);
}

// 미리 보기 모달 열기
const openPreviewModal = async (result, panelType) => {
  const sourceId = getSourceId(result);
  console.log('Opening preview modal for case:', sourceId, 'panel type:', panelType);

  // 모달을 즉시 표시하고 로딩 상태로 설정
  currentModalPanelType.value = panelType;
  previewData.value = {
    sourceId: sourceId,
    title: getTitle(result),
    court: getCourtName(result),
    date: getDecisionDate(result),
    fullUrl: getLawUrl(result),
    content: null, // 로딩 중임을 표시
    annotation: null, // 로딩 중임을 표시
    isLoading: true
  };
  showPreviewModal.value = true;

  try {
    // 백그라운드에서 실제 데이터 로드
    const fullData = await fetchCaseDetails(result, panelType);
    previewData.value = {
      ...fullData,
      isLoading: false
    };
  } catch (error) {
    console.error('Failed to fetch case details:', error);
    const panelTypeName = {
      'precedent': '판례',
      'constitutional': '헌재결정례',
      'interpretation': '법령해석례',
      'appeal': '행정심판례'
    }[panelType] || '문서';

    previewData.value = {
      ...previewData.value,
      content: `${panelTypeName} 본문을 불러오는 중 오류가 발생했습니다.\n\n오류: ${error.message}`,
      annotation: null,
      isLoading: false
    };
  }
}

// 미리 보기 모달 닫기
const closePreviewModal = () => {
  showPreviewModal.value = false;
  previewData.value = null;
}

// 패널 타입별 모달 헤더 색상 계산
const getModalHeaderClasses = () => {
  const colorMap = {
    'precedent': 'bg-gradient-to-r from-[#2c5282] to-[#2b6cb0]',
    'constitutional': 'bg-gradient-to-r from-[#1e3a8a] to-[#1e40af]', 
    'interpretation': 'bg-gradient-to-r from-[#065f46] to-[#166534]',
    'appeal': 'bg-gradient-to-r from-[#92400e] to-[#b45309]'
  };
  return colorMap[currentModalPanelType.value] || colorMap['precedent'];
}

// 패널 타입별 모달 스피너 색상 계산
const getModalSpinnerClasses = () => {
  const colorMap = {
    'precedent': 'border-[#2b6cb0]',
    'constitutional': 'border-[#1e40af]',
    'interpretation': 'border-[#166534]',
    'appeal': 'border-[#92400e]'
  };
  return colorMap[currentModalPanelType.value] || colorMap['precedent'];
}

// 패널 타입별 로딩 텍스트
const getModalLoadingText = () => {
  const textMap = {
    'precedent': '판례 내용을 불러오는 중...',
    'constitutional': '헌재결정례 내용을 불러오는 중...',
    'interpretation': '법령해석례 내용을 불러오는 중...',
    'appeal': '행정심판례 내용을 불러오는 중...'
  };
  return textMap[currentModalPanelType.value] || textMap['precedent'];
}

// 패널 타입별 모달 하단 텍스트
const getModalFooterText = () => {
  const textMap = {
    'precedent': '※ 본 판례 내용은 참고용이며, 정확한 법률 자문은 변호사와 상담하세요.',
    'constitutional': '※ 본 헌재결정례 내용은 참고용이며, 정확한 법률 자문은 변호사와 상담하세요.',
    'interpretation': '※ 본 법령해석례 내용은 참고용이며, 정확한 법률 자문은 변호사와 상담하세요.',
    'appeal': '※ 본 행정심판례 내용은 참고용이며, 정확한 법률 자문은 변호사와 상담하세요.'
  };
  return textMap[currentModalPanelType.value] || textMap['precedent'];
}

// 패널 타입별 모달 버튼 색상 계산
const getModalButtonClasses = () => {
  const colorMap = {
    'precedent': 'bg-[#2b6cb0] hover:bg-[#2c5282]',
    'constitutional': 'bg-[#1e40af] hover:bg-[#1e3a8a]',
    'interpretation': 'bg-[#166534] hover:bg-[#065f46]',
    'appeal': 'bg-[#92400e] hover:bg-[#b45309]'
  };
  return colorMap[currentModalPanelType.value] || colorMap['precedent'];
}

// 판례 해석 데이터 조회 함수
const fetchPrecedentAnnotation = async (sourceId) => {
  const apiUrl = API_BASE_URL + `/legal/precedent/annotated/${sourceId}?index_name=alias-prec-analysis`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'x-token': 'wisenut'
      }
    });

    if (!response.ok) {
      throw new Error(`판례 해석 API 요청 실패 (${response.status}): ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData.result || null;

  } catch (error) {
    console.error('판례 해석 API 호출 중 오류 발생:', error);
    return null;
  }
}

const fetchCaseDetails = async (result, panelType) => {
  const sourceId = result.source_id;

  if (!sourceId) {
    throw new Error('source_id가 없습니다.');
  }

  // 패널 타입에 따른 agency_type 매핑
  const agencyTypeMap = {
    'precedent': 'prec',
    'constitutional': 'detc',
    'interpretation': 'expc',
    'appeal': 'decc'
  };

  const agencyType = agencyTypeMap[panelType];
  const apiUrl = API_BASE_URL + `/legal/origin/${sourceId}?agency_type=${agencyType}`;

  try {
    // 판례인 경우 해석 데이터도 함께 조회
    let annotationData = null;
    if (panelType === 'precedent') {
      annotationData = await fetchPrecedentAnnotation(sourceId);
    }

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'x-token': 'wisenut'
      }
    });

    if (!response.ok) {
      throw new Error(`API 요청 실패 (${response.status}): ${response.statusText}`);
    }

    const responseData = await response.json();

    // API 응답에서 실제 본문 내용 추출
    const respResult = responseData.result || result; // result가 없으면 기존 result 사용
    const content = respResult.document?.full_text || respResult.document?.reasoning || '본문 내용을 불러올 수 없습니다.';

    // HTML 태그 제거 및 줄바꿈 처리
    const cleanContent = content.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]*>/g, '');

    return {
      sourceId: sourceId,
      title: getTitle(result),
      court: getCourtName(result),
      date: getDecisionDate(result),
      fullUrl: getLawUrl(result),
      content: cleanContent,
      annotation: annotationData // 판례 해석 데이터 추가
    };

  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);

    // API 호출 실패 시 기본 정보만 반환
    return {
      sourceId: sourceId,
      title: getTitle(result),
      court: getCourtName(result),
      date: getDecisionDate(result),
      fullUrl: getLawUrl(result),
      content: `본문 내용을 불러오는 중 오류가 발생했습니다.\n\n오류: ${error.message}\n\nsource_id: ${sourceId}\nagency_type: ${agencyType}`,
      annotation: null
    };
  }
}

// 모달 내 전체 판례 링크 열기 함수
const openFullCaseLawUrl = (previewData) => {
  const fullUrl = previewData.fullUrl
  console.log('Opening full case law URL:', fullUrl);
  window.open(fullUrl, '_blank');
  // alert(`전체 판례 조회 URL: ${fullUrl}\n(실제 구현 시 새 창에서 열림)`);
}

// 리스트 형태 텍스트 줄바꿈 처리 함수 (최소한으로 처리)
const formatTextWithLineBreaks = (text) => {
  if (!text) return '';

  let formattedText = text;

  // 기존 줄바꿈 문자 처리
  formattedText = formattedText.replace(/\\n/g, '\n');

  // 숫자) 형태만 처리 (1) 2) 3) ...) - 가장 일반적인 법률 문서 형태
  formattedText = formattedText.replace(/(\d+\)\s)/g, '\n$1');

  // 첫 번째 줄의 불필요한 줄바꿈 제거
  formattedText = formattedText.replace(/^\n+/, '');

  return formattedText;
};

// 어노테이션 텍스트 파싱 및 렌더링 함수
const renderAnnotatedText = (text) => {
  if (!text) return '';

  // 어노테이션 태그 매핑 - 재판부 색상 진하게 수정
  const tagColorMap = {
    'plaintiff': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', label: '원고' },
    'defendant': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', label: '피고' },
    'court': { bg: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-400', label: '재판부' }
  };

  let processedText = text;

  // 먼저 어노테이션 태그를 임시 플레이스홀더로 변환
  const placeholders = [];
  let placeholderIndex = 0;

  Object.entries(tagColorMap).forEach(([tag, styles]) => {
    const regex = new RegExp(`<${tag}>(.*?)</${tag}>`, 'g');
    processedText = processedText.replace(regex, (match, content) => {
      const placeholder = `__ANNOTATION_${placeholderIndex}__`;
      placeholders.push({
        placeholder,
        html: `<span class="inline ${styles.bg} ${styles.text} ${styles.border} border px-2 py-0.5 mx-1 rounded-md font-medium relative group">
          ${content}
          <span class="invisible group-hover:visible absolute -top-7 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-20 shadow-lg">
            ${styles.label}
          </span>
        </span>`
      });
      placeholderIndex++;
      return placeholder;
    });
  });

  // 줄바꿈 처리 (최소한으로)
  processedText = processedText.replace(/\\n/g, '\n');
  processedText = processedText.replace(/(\d+\)\s)/g, '\n$1');
  processedText = processedText.replace(/^\n+/, '');

  // 줄바꿈을 <br> 태그로 변환
  processedText = processedText.replace(/\n/g, '<br>');

  // 플레이스홀더를 실제 HTML로 복원
  placeholders.forEach(({ placeholder, html }) => {
    processedText = processedText.replace(placeholder, html);
  });

  return processedText;
};

// 서비스 이름 변환 함수
const getServiceName = (serviceKey) => {
  const serviceNames = {
    'complaint_generation': '소장 생성',
    'draft_request': '의뢰서 초안',
    'fee_prediction': '수임료 예측',
    'precedent_search': '판례 분석'
  }
  return serviceNames[serviceKey] || serviceKey
}

// 사이드바 리사이즈 함수들
const startResizeLeft = (e) => {
  isResizingLeft.value = true
  e.preventDefault()
  
  const startX = e.clientX
  const startWidth = leftSidebarWidth.value
  
  let animationFrame = null
  
  const doResize = (e) => {
    if (animationFrame) cancelAnimationFrame(animationFrame)
    
    animationFrame = requestAnimationFrame(() => {
      const deltaX = e.clientX - startX
      const newWidth = Math.max(200, Math.min(600, startWidth + deltaX))
      leftSidebarWidth.value = newWidth
    })
  }
  
  const stopResize = () => {
    isResizingLeft.value = false
    if (animationFrame) cancelAnimationFrame(animationFrame)
    document.removeEventListener('mousemove', doResize)
    document.removeEventListener('mouseup', stopResize)
    document.body.style.userSelect = ''
    document.body.style.cursor = ''
  }
  
  document.addEventListener('mousemove', doResize)
  document.addEventListener('mouseup', stopResize)
  document.body.style.userSelect = 'none'
  document.body.style.cursor = 'col-resize'
}

const startResizeRight = (e) => {
  isResizingRight.value = true
  e.preventDefault()
  
  const startX = e.clientX
  const startWidth = rightSidebarWidth.value
  
  let animationFrame = null
  
  const doResize = (e) => {
    if (animationFrame) cancelAnimationFrame(animationFrame)
    
    animationFrame = requestAnimationFrame(() => {
      const deltaX = startX - e.clientX // 우측은 반대 방향
      const newWidth = Math.max(250, Math.min(700, startWidth + deltaX))
      rightSidebarWidth.value = newWidth
    })
  }
  
  const stopResize = () => {
    isResizingRight.value = false
    if (animationFrame) cancelAnimationFrame(animationFrame)
    document.removeEventListener('mousemove', doResize)
    document.removeEventListener('mouseup', stopResize)
    document.body.style.userSelect = ''
    document.body.style.cursor = ''
  }
  
  document.addEventListener('mousemove', doResize)
  document.addEventListener('mouseup', stopResize)
  document.body.style.userSelect = 'none'
  document.body.style.cursor = 'col-resize'
}
</script>

<style>
/* Add any custom styles here */

/* 왼쪽/오른쪽 사이드바 스크롤 적용 */
aside {
  max-height: 90vh; /* 화면 높이를 넘지 않도록 제한 */
  overflow-y: auto;  /* 세로 스크롤 자동 */
}

section {
  max-height: 90vh; /* 화면 높이를 넘지 않도록 제한 */
  overflow-y: auto;  /* 세로 스크롤 자동 */
}

/* 텍스트 영역 스크롤바 스타일링 */
textarea::-webkit-scrollbar {
  width: 8px;
}

textarea::-webkit-scrollbar-track {
  background: transparent;
  margin: 12px 4px; /* 위아래, 좌우 여백으로 둥근 모서리 보호 */
}

textarea::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
  border: 2px solid transparent;
  background-clip: content-box; /* 테두리 안쪽만 색칠 */
  min-height: 20px; /* 최소 높이 설정 */
}

textarea::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
  background-clip: content-box;
}

textarea::-webkit-scrollbar-corner {
  background: transparent;
}

/* Firefox 스크롤바 스타일 */
textarea {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
  scrollbar-gutter: stable; /* 스크롤바 공간 예약 */
}

</style>
