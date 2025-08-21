# 🌸 Mizuki  
![Node.js >= 20](https://img.shields.io/badge/node.js-%3E%3D20-brightgreen) 
![pnpm >= 9](https://img.shields.io/badge/pnpm-%3E%3D9-blue) 
![Astro](https://img.shields.io/badge/Astro-5.12.8-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![Mizuki 미리보기](../README.webp)

[Astro](https://astro.build)로 구축된 고급 기능과 아름다운 디자인을 갖춘 현대적이고 기능이 풍부한 정적 블로그 템플릿입니다.

[**🖥️ 라이브 데모**](https://mizuki.mysqil.com/)
[**🔧 Mizuki 공식 사용자 문서**](https://docs.mizuki.mysqil.com/)

🌏 README 언어
[**中文**](../README.md) /
[**English**](../README.en.md) /
[**한국어**](./README.ko.md)

## 🆕 v3.3의 새로운 기능
- **Mermaid 구문 지원:** Mermaid 다이어그램 구문 지원이 추가되어 흐름도, 순서도, 간트 차트 등을 Markdown에 직접 삽입할 수 있습니다.
- **Umami 액세스 통계:** Umami 액세스 통계 지원이 추가되어 웹사이트 트래픽 데이터 분석을 쉽게 통합할 수 있습니다.

![Configuration](configuration.svg)

### 🔧 컴포넌트 구성 시스템 리팩토링
- **통합 구성 아키텍처:** 동적 컴포넌트 관리 및 순서 구성을 지원하는 완전히 새로운 모듈식 컴포넌트 구성 시스템
- **구성 기반 컴포넌트 로딩:** SideBar 컴포넌트를 리팩토링하여 완전히 구성 기반의 컴포넌트 로딩 메커니즘 구현
- **통합 제어 스위치:** 음악 플레이어 및 공지 컴포넌트의 독립적인 활성화 스위치 제거, sidebarLayoutConfig에 의한 통합 제어
- **반응형 레이아웃 적응:** 컴포넌트가 반응형 레이아웃을 지원하고 기기 유형에 따라 자동으로 표시 조정

### 📐 레이아웃 시스템 최적화
- **동적 사이드바 위치 조정:** 좌우 사이드바 전환 지원 및 자동 레이아웃 적응
- **스마트 기사 내비게이션 배치:** 사이드바가 오른쪽에 있을 때 기사 내비게이션이 자동으로 왼쪽으로 이동하여 더 나은 읽기 경험 제공
- **그리드 레이아웃 개선:** CSS 그리드 레이아웃 최적화로 컨테이너 너비 이상 문제 해결

### 🎛️ 구성 파일 형식 표준화
- **표준화된 구성 형식:** 통합된 컴포넌트 구성 파일 형식 사양 생성
- **타입 안전성:** 포괄적인 TypeScript 타입 정의로 구성 타입 안전성 보장
- **확장성:** 사용자 정의 컴포넌트 타입 및 구성 옵션 지원

### 🧹 코드 최적화
- **테스트 파일 정리:** 사용하지 않는 테스트 구성 및 종속성 제거로 프로젝트 크기 감소
- **코드 구조 최적화:** 컴포넌트 아키텍처 개선으로 코드 유지보수성 향상
- **성능 향상:** 컴포넌트 로딩 로직 최적화로 페이지 렌더링 성능 향상

---

## ✨ 기능

### 🎨 디자인 & UI
- [x] [Astro](https://astro.build)와 [Tailwind CSS](https://tailwindcss.com)로 구축
- [x] [Swup](https://swup.js.org/)을 통한 부드러운 애니메이션과 페이지 전환
- [x] 시스템 설정 감지가 포함된 라이트/다크 모드
- [x] 사용자 정의 가능한 테마 색상 및 동적 배너 캐러셀
- [x] 모든 기기에 대응하는 완전 반응형 디자인
- [x] JetBrains Mono 폰트를 사용한 아름다운 타이포그래피

### 🔍 콘텐츠 & 검색
- [x] [Pagefind](https://pagefind.app/)를 통한 고급 검색 기능
- [x] 구문 강조가 포함된 [확장 Markdown 기능](#-markdown-확장-구문)
- [x] 자동 스크롤이 포함된 대화형 목차
- [x] RSS 피드 생성
- [x] 읽기 시간 추정
- [x] 게시물 분류 및 태그 지정

### 🌐 국제화
- [x] **다국어 지원** 및 실시간 번역
- [x] 사용자 설정 기반 **자동 언어 감지**
- [x] Edge Translate 기반 **클라이언트 사이드 번역**
- [x] 10개 이상 언어 지원 (EN, ZH-CN, ZH-TW, JA, KO, ES, TH, VI, ID, TR)

### 📱 특별 페이지
- [x] **애니메이션 추적 페이지** - 평점과 함께 애니메이션 시청 진행 상황 추적
- [x] **친구 링크 페이지** - 아름다운 카드로 친구들의 웹사이트 소개
- [x] **일기/순간 페이지** - 소셜 미디어 게시물처럼 삶의 순간 공유
- [x] **아카이브 페이지** - 정리된 게시물 타임라인 보기
- [x] **소개 페이지** - 사용자 정의 가능한 자기소개

### 🛠 기술적 기능
- [x] [Expressive Code](https://expressive-code.com/)를 통한 **향상된 코드 블록**
- [x] KaTeX 렌더링을 통한 **수학 지원**
- [x] PhotoSwipe 갤러리를 통한 **이미지 최적화**
- [x] 사이트맵과 메타 태그를 통한 **SEO 최적화**
- [x] 지연 로딩과 캐싱을 통한 **성능 최적화**
- [x] **댓글 시스템** 통합 준비 (Twikoo)

## 🚀 시작하기

### 📦 설치

1. **저장소 복제:**
   ```bash
   git clone https://github.com/matsuzaka-yuki/mizuki.git
   cd mizuki
   ```

2. **종속성 설치:**
   ```bash
   # pnpm 설치 (설치되지 않은 경우)
   npm install -g pnpm
   
   # 프로젝트 종속성 설치
   pnpm install
   ```

3. **블로그 구성:**
   - `src/config.ts`를 편집하여 블로그 설정 사용자 정의
   - 사이트 정보, 테마 색상, 배너 이미지, 소셜 링크 업데이트
   - 번역 설정 및 특별 페이지 기능 구성

4. **개발 서버 시작:**
   ```bash
   pnpm dev
   ```
   블로그는 `http://localhost:4321`에서 사용할 수 있습니다

### 📝 콘텐츠 관리

- **새 게시물 생성:** `pnpm new-post <파일명>`
- **게시물 편집:** `src/content/posts/` 내 파일 수정
- **페이지 사용자 정의:** `src/content/spec/` 내 특별 페이지 편집
- **이미지 추가:** `src/assets/` 또는 `public/`에 이미지 배치

### 🚀 배포

정적 호스팅 플랫폼에 블로그 배포:

- **Vercel:** GitHub 저장소를 Vercel에 연결
- **Netlify:** GitHub에서 직접 배포
- **GitHub Pages:** 포함된 GitHub Actions 워크플로 사용
- **Cloudflare Pages:** 저장소 연결

배포 전에 `astro.config.mjs`의 `site` URL을 업데이트하세요.



### 📝 게시물 프론트매터

```yaml
---
title: 나의 첫 번째 블로그 게시물
published: 2023-09-09
description: 이것은 나의 새로운 Astro 블로그의 첫 번째 게시물입니다.
image: ./cover.jpg
tags: [Foo, Bar]
category: 프론트엔드
draft: false
pinned: false
---
```

### 프론트매터 필드

- **title**: 게시물 제목 (필수)
- **published**: 게시 날짜 (필수)
- **description**: SEO 및 미리보기용 게시물 설명
- **image**: 커버 이미지 경로 (게시물 파일 기준 상대 경로)
- **tags**: 분류용 태그 배열
- **category**: 게시물 카테고리
- **draft**: 프로덕션에서 게시물을 숨기려면 `true`로 설정
- **pinned**: 게시물을 목록 상단에 고정하려면 `true`로 설정

### 고정 게시물

`pinned` 필드를 사용하면 중요한 게시물을 블로그 상단에 고정할 수 있습니다. 고정 게시물은 게시 날짜에 관계없이 항상 일반 게시물보다 먼저 나타납니다.

**사용법:**
```yaml
pinned: true  # 이 게시물을 상단에 고정
pinned: false # 일반 게시물 (기본값)
```

**정렬 동작:**
1. 고정 게시물이 먼저 나타나며, 게시 날짜순으로 정렬 (최신순)
2. 일반 게시물이 뒤따르며, 게시 날짜순으로 정렬 (최신순)

## 🧩 Markdown 확장 구문

Mizuki는 표준 GitHub Flavored Markdown을 넘어선 향상된 Markdown 기능을 지원합니다:

### 📝 향상된 작성
- **주의사항:** `> [!NOTE]`, `> [!TIP]`, `> [!WARNING]` 등으로 아름다운 콜아웃 박스 생성
- **수학 방정식:** `$인라인$` 및 `$$블록$$` 구문으로 LaTeX 수학 작성
- **코드 강조:** 줄 번호와 복사 버튼이 있는 고급 구문 강조
- **GitHub 카드:** `::github{repo="사용자/저장소"}`로 저장소 카드 삽입

### 🎨 시각적 요소
- **이미지 갤러리:** 이미지 보기를 위한 자동 PhotoSwipe 통합
- **접을 수 있는 섹션:** 확장 가능한 콘텐츠 블록 생성
- **사용자 정의 구성 요소:** 향상된 콘텐츠를 위한 특별 지시문 사용

### 📊 콘텐츠 구성
- **목차:** 제목에서 자동 생성, 부드러운 스크롤 포함
- **읽기 시간:** 자동 계산 및 표시
- **게시물 메타데이터:** 카테고리와 태그가 포함된 풍부한 프론트매터 지원

## ⚡ 명령어

모든 명령어는 프로젝트 루트에서 실행됩니다:

| 명령어                      | 작업                                               |
|:---------------------------|:---------------------------------------------------|
| `pnpm install`             | 종속성 설치                                         |
| `pnpm dev`                 | `localhost:4321`에서 로컬 개발 서버 시작             |
| `pnpm build`               | `./dist/`에 프로덕션 사이트 빌드                     |
| `pnpm preview`             | 배포 전 로컬에서 빌드 미리보기                       |
| `pnpm check`               | 오류에 대한 Astro 검사 실행                         |
| `pnpm format`              | Biome을 사용하여 코드 포맷                          |
| `pnpm lint`                | 코드 문제 린트 및 수정                              |
| `pnpm new-post <파일명>`   | 새 블로그 게시물 생성                               |
| `pnpm astro ...`           | Astro CLI 명령어 실행                              |

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 라이선스가 부여됩니다 - 자세한 내용은 [LICENSE](../LICENSE) 파일을 참조하세요.

## 🙏 감사의 말

- 원본 [Fuwari](https://github.com/saicaca/fuwari) 템플릿 기반
- [Astro](https://astro.build)와 [Tailwind CSS](https://tailwindcss.com)로 구축
- [Yukina](https://github.com/WhitePaper233/yukina)에서 영감을 받음 - 아름답고 우아한 블로그 템플릿
- 번역 기능은 [translate](https://gitee.com/mail_osc/translate)에서 제공 - AI i18n 자동 HTML 번역 솔루션
- [Iconify](https://iconify.design/)의 아이콘

### 특별한 감사

- **[Yukina](https://github.com/WhitePaper233/yukina)** - 이 프로젝트를 형성하는 데 도움이 된 디자인 영감과 아이디어를 제공해 주셔서 감사합니다. Yukina는 우수한 디자인 원칙과 사용자 경험을 보여주는 우아한 블로그 템플릿입니다.
- **[translate](https://gitee.com/mail_osc/translate)** - 단 두 줄의 JavaScript로 자동 HTML 번역을 가능하게 하는 혁신적인 AI 기반 i18n 솔루션을 제공해 주셔서 감사합니다. 이 오픈소스 도구는 다국어 지원을 매우 간단하고 효율적으로 만들어줍니다.

---

⭐ 이 프로젝트가 도움이 된다고 생각하시면 별표를 주는 것을 고려해 주세요!