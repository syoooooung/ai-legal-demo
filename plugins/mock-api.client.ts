// Mock API 플러그인 - 실제 백엔드 대신 고정된 응답을 반환
export default defineNuxtPlugin(() => {
  // Mock 데이터
  const mockResponses = {
    precedent_search: {
      result: {
        result: {
          llm: `## 법률 분석 결과

### 관련 판례 검토

귀하의 질의와 관련하여 다음과 같은 판례를 검토하였습니다.

**1. 대법원 2020다12345 판결**
- 사실관계: 근로자가 회사의 부당해고에 대해 제기한 사건
- 판단: 정당한 사유 없는 해고는 무효이며, 근로자는 복직을 청구할 수 있음
- 의의: 근로기준법상 해고의 정당성 판단 기준 제시

**2. 서울고등법원 2019나56789 판결**
- 사실관계: 임금 체불 관련 분쟁
- 판단: 사용자는 근로 제공에 대한 임금 지급 의무가 있으며, 체불 시 지연이자 발생
- 의의: 임금채권의 우선변제권 인정

### 법률적 검토

위 판례들을 종합하면, 귀하의 경우 다음과 같은 권리를 주장할 수 있습니다:

1. **부당해고 구제 신청**: 노동위원회에 구제 신청 가능
2. **임금 청구**: 미지급 임금에 대한 청구권 행사
3. **손해배상 청구**: 부당해고로 인한 정신적 손해 배상 가능

### 권고사항

- 신속한 법률 상담을 통한 구체적 권리 확인
- 관련 증거자료 확보 (근로계약서, 급여명세서 등)
- 노동위원회 구제신청 기한(해고일로부터 3개월) 유의`,
          redefined_questions: [
            "부당해고의 정당성 판단 기준은 무엇인가요?",
            "임금 체불 시 근로자의 구제 방법은?",
            "해고무효 확인 소송의 절차는 어떻게 되나요?"
          ],
          // OpenSearch hits 형식
          hits: [
            {
              _source: {
                source_id: "PREC_2020DA12345",
                case_title: "부당해고 무효확인 및 임금지급청구",
                case_number: "2020다12345",
                court_name: "대법원",
                judgment_date: "2020-06-15",
                case_type: "민사",
                score: 0.92,
                summary: "근로기준법상 정당한 사유 없는 해고는 무효이며, 근로자는 복직 및 임금 지급을 청구할 수 있다.",
                fact_summary: "원고는 피고 회사에서 5년간 근무하던 중, 경영상 이유로 해고통지를 받았으나 실제로는 정리해고의 요건을 충족하지 못한 사안.",
                legal_issue: "정리해고의 정당성 여부 및 해고무효 시 법률효과",
                judgment: "해고무효, 원고 승소",
                detail_link: "https://casenote.kr/search/decision_view.html?caseNum=2020DA12345"
              }
            },
            {
              _source: {
                source_id: "PREC_2019NA56789",
                case_title: "임금 및 퇴직금 청구의 소",
                case_number: "2019나56789",
                court_name: "서울고등법원",
                judgment_date: "2019-11-20",
                case_type: "민사",
                score: 0.87,
                summary: "사용자의 임금 체불 시 근로자는 체불임금에 대한 지연이자를 포함하여 청구할 수 있다.",
                fact_summary: "원고는 피고 회사로부터 3개월간 임금을 지급받지 못하여 이를 청구한 사건.",
                legal_issue: "임금채권의 소멸시효 및 지연손해금 기산일",
                judgment: "원고 일부 승소, 지연이자 포함 지급 명령",
                detail_link: "https://casenote.kr/search/decision_view.html?caseNum=2019NA56789"
              }
            },
            {
              _source: {
                source_id: "PREC_2021GU98765",
                case_title: "부당해고 구제재심판정 취소",
                case_number: "2021구98765",
                court_name: "서울행정법원",
                judgment_date: "2021-03-10",
                case_type: "행정",
                score: 0.85,
                summary: "노동위원회의 부당해고 구제명령은 사용자가 정당한 해고 사유를 입증하지 못한 경우 유지된다.",
                fact_summary: "피고(사용자)가 원고(근로자)를 징계해고 하였으나, 노동위원회에서 부당해고로 판정되어 이를 다투는 사건.",
                legal_issue: "징계해고의 정당성 및 절차적 적법성",
                judgment: "원고(사용자) 패소, 구제명령 유지",
                detail_link: "https://casenote.kr/search/decision_view.html?caseNum=2021GU98765"
              }
            }
          ]
        }
      },
      description: "판례 검색 완료"
    },
    fee_prediction: {
      result: {
        result: {
          '소송 구분': '민사소송',
          '사건 구분': '손해배상청구',
          '소가': 50000000,
          '심급': '1심',
          '사건 종류': '근로관계',
          '당사자 수': 2,
          '정신적 고통으로 빠른 종결 희망': true,
          '지속적 경제적 손해로 빠른 종결 필요': false,
          '증거 빈약': false,
          '상대방 법인 여부': true,
          '분석 근거': [
            '소가 5천만원 기준 대한변호사협회 보수기준 적용',
            '근로관계 사건의 평균 소송 기간 6개월~1년 고려',
            '법인 상대 소송으로 증거 수집 및 절차 복잡도 반영',
            '경제적 손실 규모 및 긴급성을 종합 고려'
          ]
        }
      },
      description: "수임료 예측 완료"
    },
    complaint_generation: {
      result: {
        choices: [
          {
            message: {
              content: `## 소 장

**사건**: 2024가합12345 손해배상청구의 소

**원고**: 홍길동
**피고**: 주식회사 OO

---

### 청구취지

1. 피고는 원고에게 금 50,000,000원 및 이에 대하여 2024년 1월 1일부터 다 갚는 날까지 연 12%의 비율로 계산한 돈을 지급하라.

2. 소송비용은 피고가 부담한다.

3. 제1항은 가집행할 수 있다.

라는 판결을 구합니다.

---

### 청구원인

#### 1. 당사자의 지위

원고는 피고 회사에 2019년 3월 1일부터 2023년 12월 31일까지 근무한 전 직원입니다.

#### 2. 사실관계

가. 원고는 위 기간 동안 성실히 근무하여 왔으나, 피고는 2023년 10월 경영상 이유를 들어 원고에게 해고를 통보하였습니다.

나. 그러나 피고의 해고는 근로기준법 제24조의 정리해고 요건을 충족하지 못한 부당해고입니다.

다. 피고는 또한 2023년 10월부터 12월까지 3개월간의 임금 총 15,000,000원을 지급하지 않았습니다.

#### 3. 손해배상청구권의 발생

가. 피고의 부당해고로 인해 원고는 정신적 고통을 받았으며, 이에 대한 위자료로 20,000,000원이 상당합니다.

나. 미지급 임금 15,000,000원

다. 부당해고 기간 동안의 임금 상당액 15,000,000원

라. 합계 50,000,000원

#### 4. 결론

따라서 원고는 피고를 상대로 위 손해배상금 및 지연손해금의 지급을 구하기 위하여 이 사건 소를 제기합니다.

---

### 입증방법

1. 갑 제1호증: 근로계약서
2. 갑 제2호증: 해고통지서
3. 갑 제3호증: 급여명세서 (2023년 7월~9월)

---

2024년 4월 9일

원고 홍길동 (인)

서울중앙지방법원 귀중`
            }
          }
        ]
      },
      description: "소장 생성 완료"
    },
    draft_request: {
      result: {
        choices: [
          {
            message: {
              content: `## 법률 자문 의뢰서 (초안)

---

### 의뢰인 정보
- **성명**: 홍길동
- **생년월일**: 1985년 5월 15일
- **주소**: 서울특별시 강남구 테헤란로 123
- **연락처**: 010-1234-5678
- **이메일**: hong@example.com

---

### 의뢰 사건 개요

**사건 유형**: 부당해고 및 임금 체불

**1. 사실관계**

저는 2019년 3월 1일부터 (주)OO에서 마케팅 팀장으로 근무해 왔습니다. 5년간 성실히 근무하며 회사 발전에 기여해 왔으나, 2023년 10월 회사로부터 갑작스러운 해고 통보를 받았습니다.

회사는 경영상 이유를 들었으나, 실제로는 제가 회사의 부당한 업무 지시를 거부한 것에 대한 보복성 해고로 판단됩니다.

**2. 구체적 경위**

- 2023년 9월: 회사의 부당한 업무 지시 거부
- 2023년 10월 15일: 구두로 해고 통보
- 2023년 10월 20일: 서면 해고 통지
- 2023년 10월 ~ 12월: 임금 미지급 (3개월분, 총 15,000,000원)

**3. 문제점**

가. 해고의 부당성
- 정당한 사유 없는 해고
- 근로기준법상 정리해고 절차 미준수
- 해고 예고 기간 미준수

나. 임금 체불
- 3개월간 임금 미지급
- 퇴직금 미지급

**4. 증거자료**

- 근로계약서
- 급여명세서 (최근 6개월)
- 해고 통지서
- 업무 관련 이메일 및 메신저 대화 내역

---

### 자문 및 의뢰 사항

1. **부당해고 여부 검토**: 제 해고가 부당해고에 해당하는지 법률적 검토 요청

2. **권리 구제 방안**: 노동위원회 구제신청, 민사소송 등 가능한 법적 조치 안내

3. **임금 청구**: 미지급 임금 및 퇴직금 청구 방법

4. **손해배상**: 부당해고로 인한 정신적 피해에 대한 손해배상 청구 가능성

5. **소송 대리**: 필요시 소송 대리 의뢰

---

### 희망 사항

신속한 법률 검토를 통해 제 권리를 회복하고, 미지급 임금을 받을 수 있도록 도움을 요청드립니다.

---

2024년 4월 9일

의뢰인: 홍길동 (서명)`
            }
          }
        ]
      },
      description: "의뢰서 초안 생성 완료"
    }
  };

  // 원래의 fetch를 저장
  const originalFetch = window.fetch;

  // fetch를 오버라이드
  window.fetch = async (url: string | URL | Request, options?: RequestInit) => {
    const urlString = typeof url === 'string' ? url : url.toString();

    // /legal/predict 엔드포인트를 가로채기
    if (urlString.includes('/legal/predict')) {
      console.log('[DEMO MODE] Intercepting API call:', urlString);

      // FormData에서 service 타입 추출
      let serviceType = 'precedent_search';
      if (options?.body instanceof FormData) {
        serviceType = options.body.get('service') as string || 'precedent_search';
      }

      // 약간의 지연 효과로 실제 API처럼 보이게
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

      // Mock 응답 반환
      const mockData = mockResponses[serviceType as keyof typeof mockResponses] || mockResponses.precedent_search;

      return new Response(JSON.stringify(mockData), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // /legal/feedback 엔드포인트 (피드백)
    if (urlString.includes('/legal/feedback')) {
      console.log('[DEMO MODE] Intercepting feedback call');
      await new Promise(resolve => setTimeout(resolve, 500));

      return new Response(JSON.stringify({
        result: { status: 'success', message: '피드백이 저장되었습니다 (데모 모드)' },
        description: '피드백 저장 완료'
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // /legal/precedent 관련 엔드포인트 (판례 상세 정보)
    if (urlString.includes('/legal/precedent/annotated/') ||
        urlString.includes('/legal/precedent/analysis/') ||
        urlString.includes('/legal/precedent/')) {
      console.log('[DEMO MODE] Intercepting precedent detail call');
      await new Promise(resolve => setTimeout(resolve, 800));

      return new Response(JSON.stringify({
        result: {
          case_title: "부당해고 무효확인 및 임금지급청구",
          case_number: "2020다12345",
          court_name: "대법원",
          judgment_date: "2020-06-15",
          case_type: "민사",
          full_text: `【판시사항】\n\n근로기준법 제23조 제1항에서 정한 '정당한 이유' 없이 근로자를 해고한 경우, 그 해고는 무효이다.\n\n【판결요지】\n\n사용자가 근로자를 해고하기 위해서는 사회통념상 고용관계를 계속할 수 없을 정도의 객관적이고 합리적인 이유가 있어야 한다. 이러한 정당한 이유 없이 이루어진 해고는 무효이며, 근로자는 근로관계의 존속을 전제로 임금 지급을 청구할 수 있다.\n\n본 사건에서 피고 회사는 경영상 이유로 정리해고를 실시하였다고 주장하나, 긴박한 경영상의 필요성이 인정되지 않고, 해고회피 노력을 다하였다고 보기 어려우며, 합리적이고 공정한 해고 대상자 선정 기준을 적용하지 않았다.\n\n따라서 이 사건 해고는 근로기준법 제24조의 정리해고 요건을 충족하지 못한 부당해고로서 무효이고, 원고는 피고에게 해고 기간 동안의 임금 상당액을 청구할 수 있다.\n\n【참조조문】\n\n근로기준법 제23조(해고 등의 제한), 제24조(경영상 이유에 의한 해고의 제한)\n\n【참조판례】\n\n대법원 2018다271645 판결\n대법원 2019다235531 판결`,
          fact_summary: "원고는 피고 회사에서 5년간 근무하던 중, 경영상 이유로 해고통지를 받았으나 실제로는 정리해고의 요건을 충족하지 못한 사안.",
          legal_issue: "정리해고의 정당성 여부 및 해고무효 시 법률효과",
          case_summary: "정당한 이유 없는 해고는 무효이며, 근로자는 복직 및 임금 지급을 청구할 수 있다.",
          reasoning: "정리해고의 요건(긴박한 경영상 필요성, 해고회피노력, 공정한 대상자 선정)을 충족하지 못하였으므로 해고는 무효이다.",
          judgment_info: "해고무효 확인, 임금 지급 명령"
        },
        description: "판례 상세 정보 조회 완료"
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // 기타 모든 API 호출은 원래 fetch로 전달
    return originalFetch(url, options);
  };

  console.log('[DEMO MODE] Mock API plugin initialized');
});
