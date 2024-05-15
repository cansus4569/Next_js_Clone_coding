# 메모짱

## 목차

- [Versel](#vercel-버셀)
- [CI/CD란?](#cicd-란)
- [HTML + CSS + VanillaJS vs React vs NextJS 차이점](#html--css--vanillajs-vs-react-vs-nextjs-차이점)
- [렌더링 종류 - CSR, SSR, Hydration](#렌더링-종류---csr-ssr-hydration)
- [컴포넌트 종류 - RSC, RCC, use client](#컴포넌트-종류---rsc-rcc-use-client)
- [React Suspense](#react-suspense-streaming-progressive-hydration)
- [Tailwind CSS](#tailwind-css)

---

## Vercel (버셀)

- Next.js 를 쉽게 배포할 수 있는 하나의 배포 도구

---

## CI/CD 란?

<strong>CI/CD (지속적 통합 및 지속적 배포)</strong>
CI/CD는 소프트웨어 개발 프로세스를 자동화하고 지속적인 업데이트를 가능하게 하는 개발 방법론이다.

1. 지속적 통합 (Continuous Integration - CI)

- 개발자들이 코드를 주기적으로 공유하고, 이를 자동으로 빌드하고 테스트하는 과정입니다.
- 주로 코드 변경이 발생할 때마다 자동으로 통합 테스트가 실행되어 코드 품질을 유지하고 버그를 빠르게 찾아내도록 도와줍니다.

2. 지속적 배포 (Continuous Deployment - CD)

- 코드가 통합 테스트를 통과하면 자동으로 스테이징 또는 프로덕션 환경으로 배포되는 과정입니다.
- 개발자가 코드를 작성하고 푸시할 때마다 자동으로 프로덕션 환경에서 변경 사항이 반영되어 신속한 업데이트를 가능케 합니다.

### 다양한 CI/CD 구성

1. SASS 형태

- vercel : 가장 쉬운 방법

2. AWS

- AWS EC2 : nextjs github pull > build (EC2 node.js 설치) > start
- \*EC2 public IP -> Port 4000 Server 실행 -> PortBind 저희 nextjs 접속 가능 !!

3. AWS + docker

- nextjs > docker image > docker hub push > EC2 > docker image pull > docker run

4. AWS + docker + CI/CD

- github push > docker image (CI) > portainer (CD) > docker container run

5. AWS + docker + k8s + CI/CD

- github push > docker image (CI) > k8s > docker container

---

## HTML + CSS + VanillaJS vs React vs NextJS 차이점

### HTML + CSS + VanillaJS

- 기본기 > 작은 프로젝트나 간단한 웹 페이지
- 단일 페이지 애플리케이션(SPA)을 구축 어렵
  - 사용자 인터렉션, pop-over, 캘린더
  - 만들수는 있지만, 번거롭다.
  - 손이 많이가는 것에 비해 결과물이 좋지 않다. 시간이 많이 든다.
- 결과물 : HTML + CSS + JS
- 장점 : 브라우저에서 렌더링이 가장 빠르다.
  - but, 큰 프로젝트 개발이 어렵다.

### React

- SPA(Single Page Application, Angular, Vue, React - 현재 FE 개발 트렌드, Svelte)
- 페이스북에서 만든 JavaScript 라이브러리
- 언제 사용 ? SEO 상관없는 인터렉션이 많은 모든 웹 (어드민 페이지, B2B 페이지, Gmail, 지도 앱)
- 결과물 : JS 정적 파일 (+html, css)
- 장점 : 웹에서 앱처럼 UI 상호작용이 가능한 웹사이트 개발 가능
  - but, SEO 불리 및 초기 JS 로딩이 느리다. (빈 화면 보임)

### NextJS

- MPA(Multiple Page Application)
- React 기반의 서버 사이드 렌더링(SSR) 및 정적 사이트 생성(Static Site Generation, SSG)을 지원하는 프레임워크입니다.
- 언제사용 ?
  - SEO 최적화
  - 초기 로딩 속도 향상 > B2C
- FullStack 가능 (서버 API, DB조회 등)
- 결과물 : 서버 Application (+ html 정적 파일)
  - but, 웹 + 서버 전반의 지식 필요

---

## 렌더링 종류 - CSR, SSR, Hydration

### type1. html + css + js

![type1](https://github.com/cansus4569/Next_js_Clone_coding/assets/63139527/5e6f50f1-46aa-44ec-8c27-9156cc16ad50)

- html > Real DOM
  ![브라우저 렌더링 과정](https://github.com/cansus4569/Next_js_Clone_coding/assets/63139527/6642770e-382f-4bcd-9475-b14d1490d3be)
- 자세한 정보 : https://medium.com/개발자의품격/브라우저의-렌더링-과정-5c01c4158ce

### type2. react.js

![type2](https://github.com/cansus4569/Next_js_Clone_coding/assets/63139527/ffd01efb-8618-49b4-bf14-23c69b3f78de)

1. index.html (빈 화면)

```
2. js bundle download (React Code)
```

3. CSR
   - React > VirtualDOM > RealDOM

### type3. next.js (PageRouter)

![type3](https://github.com/cansus4569/Next_js_Clone_coding/assets/63139527/4a9c427d-35fc-41db-8713-981c860440de)

1. SSR (React > html)
2. html + css + js

```
3. js bundle download (React Code)
4. `hydration` (html > React)
```

5. CSR
   - React > VirtualDOM > RealDOM

### type4. next.js (AppRouter)

- 특징 : 부분적으로 `hydration`을 진행한다.
  - 병렬로 hydration 을 진행하거나 우선순위를 정할 수 있음.

![type4](https://github.com/cansus4569/Next_js_Clone_coding/assets/63139527/8097a046-a6d6-4705-a4d7-3f8b8ba06649)

1. SSR (React > html)
2. html + css + js

```
3. Streaming Server Rendering : Page를 부분적으로 나누어서 SSR을 진행 후, 완성되는 순서대로 사용자 화면에 뿌려준다.
   - Progressive Hydration : 이는 점진적인 hydration 과정이 필요함
   - Selective Hydration : 우선순위가 높은 UI 먼저 hydration
   - Partial Hydration : 일부분만 hydration 진행
   - 참고 : 전체 페이지를 쪼개서 각자의 렌더링을 싸이클이 진행될 수 있는 이유는 React Suspense 덕분.
4-1.
    js bundle1 download (React Code)
    'hydration' (html > React)
4-2.
    js bundle2 download (React Code)
    'hydration' (html > React)
```

5. CSR
   - JSX > VirtualDOM > RealDOM

### 핵심은 다음 2가지 이다!

There <font color='red'>are</font> two ways you implement streaming <font color='red'>in</font> Next.js:

1. <font color='red'>At</font> the page level, <font color='red'>with</font> the loading.tsx file.
2. <font color='red'>For specific</font> components, <font color='red'>with</font> \<Suspense\>.

---

## 컴포넌트 종류 - RSC, RCC, use client

### Goal

- RSC, RCC 2개 비교하기
- 서버 컴포넌트, 클라이언트 컴포넌트는 각각 언제 사용하는가?
- 'use client'의 진정한 의미

### RSC vs RCC

- Server Component : `SSR`에 관여 가능
- Client Component : `SSR` + `CSR`에 관여 가능

![RSC vs RCC](https://github.com/cansus4569/Next_js_Clone_coding/assets/63139527/9954c913-bf4c-4bef-863d-1c7e465c0293)

### use client

- NextJS 에서 컴포넌트 작성시 기본적으로 `RSC`로 작동되어진다.
  - SSR
- `'use client`' 지시어를 작성해주면, `RCC`로 작동되어진다.
  - SSR
  - CSR (Hydration 과정을 진행하게 된다.)

![use client](https://github.com/cansus4569/Next_js_Clone_coding/assets/63139527/94bb9921-e306-4173-9ac4-5fece58d4785)

---

## React Suspense (Streaming, Progressive Hydration)

- [Nextjs 공식문서 - Streaming with Suspense](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#example)

![image](https://github.com/cansus4569/Next_js_Clone_coding/assets/63139527/60cea144-eeb5-420c-a749-90b38491633c)

![image](https://github.com/cansus4569/Next_js_Clone_coding/assets/63139527/af1e4fd0-9258-44f2-b223-608ad9cf17a2)

- Selective Hydration을 가능하게 만드는 핵심

### 서버 컴포넌트에서의 React Suspense

- 서버에서 데이터를 불러오는 작업이 끝나기 전에 클라이언트에게 서버 렌더링된 마크업을 전송할 수 있습니다.
- 초기 로딩 시간을 최적화하고 사용자 경험을 향상시킬 수 있습니다.

```jsx
import { Suspense } from 'react';
import { PostFeed, Weather } from './Components';

export default function Posts() {
  return (
    <section>
      <Suspense fallback={<p>Loading feed...</p>}>
        <PostFeed />
      </Suspense>
      <Suspense fallback={<p>Loading weather...</p>}>
        <Weather />
      </Suspense>
    </section>
  );
}
```

### 클라이언트 컴포넌트에서의 React Suspense

- 비동기적으로 데이터를 불러오는 동안 사용자에게 로딩 상태를 표시
- fallback 컴포넌트를 렌더링할 수 있습니다.
- 이는 주로 lazy loading이나 동적으로 불러오는 컴포넌트에서 유용합니다.

```jsx
// 클라이언트 컴포넌트에서의 예시
import { lazy, Suspense } from 'react';

const LazyLoadedComponent = lazy(() => import('./LazyLoadedComponent'));

function ClientComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyLoadedComponent />
    </Suspense>
  );
}

export default ClientComponent;
```

---

## Tailwind CSS

### playground

- 플레이그라운드 https://play.tailwindcss.com

### Tailwind CSS 정리1

#### 단위 체계

tailwind css 에서는 rem 단위를 사용한다.

- 1은 0.25rem, 4는 1rem 이다.
- 디폴트 값으로 1rem은 16px 이다.
  - font-size에 따라 1rem 값은 유동적으로 변할 수 있다.
- 고정된 px단위도 사용 가능하다.

```html
<!-- 1.rem, px-->
<div class="w-4 w-[10rem] w-[20px]">111</div>

<!--
  w-4 => width: 1rem
  w-[20px] => width: 20px
  w-[10rem] => width: 10rem
-->
```

### Tailwind CSS 정리2

#### bg, border, border-color, rounded

```
className="bg-red-200"
className="bg-red-200 bg-opacity-50"
className="border border-solid border-red-300"
className="border-2 border-red-300"
className="rounded-full"
className="border border-transparent rounded-full"
className="cursor-pointer rounded-full hover:opacity-75 transition"

eg)
<div class="h-40 w-40 cursor-pointer rounded-full border border-transparent bg-red-200 transition-colors hover:bg-red-300"></div>
```

#### w, h, p, m (width, height, padding, margin)

```
# extrinsic
className="h-auto h-5 h-[40px]"
# intrinsic - 내부 요소에 의해 크기 결정
className="h-fit h-min h-max"
className="w-auto w-full w-5 w-[40px]"
className="p-8 p-[40px] px-8 py-8"
className="m-8 m-[40px] mx-8 my-8"
```

#### text-color, text-size, font-bold, cursor

```
# color
className="text-green-500"

# font-size (text-sm, text-md, text-lg..)
className="text-sm text-md text-2xl text-[50px]"

# weight, font-bold(700)
className="font-medium font-[500] font-bold font-[700]"

className="cursor-pointer"
```

#### flex, flex-col, justify, items, gap

```
# display:flex
className="flex"

# justify-content(main-axis)
className="flex justify-between"

# align-items(cross-axis)
className="flex items-center"

# direction
className="flex flex-row"
className="flex flex-col"

# gap
className="flex flex-col gap-y-4"

# flex:1 1 0%
className="flex flex-1"

# eg)
<div class="flex flex-row items-center justify-between gap-[5px]">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
```

#### hover, transition, :disabled

```
className="transition"
className="hover:text-white"
className="disabled:cursor-not-allowed disabled:opacity-50"
```

#### relative, absolute

```html
<!-- Next Image + gradient -->
<div class="w-[400px] h-[400px] relative">
  <img class="w-full h-full" src="" />
  <div class="w-full h-full bg-black opacity-40 absolute top-0"></div>
  <div class="w-full h-full absolute top-0 bg-gradient-to-t from-black"></div>
</div>
```

### Tailwind CSS 정리3

#### 픽토그램 - 신호등 + 횡단보도, group

```html
<section
  class="flex h-[300px] flex-row items-center justify-between bg-neutral-600 group"
>
  <div class="flex flex-row gap-3 group-hover:bg-pink-400">
    <div class="h-[150px] w-4 bg-white"></div>
    <div class="h-[150px] w-4 bg-white"></div>
    <div class="h-[150px] w-4 bg-white"></div>
    <div class="h-[150px] w-4 bg-white"></div>
    <div class="h-[150px] w-4 bg-white"></div>
  </div>
  <div class="flex flex-row items-center justify-center gap-4">
    <div
      class="h-[200px] w-[200px] rounded-full border-4 border-black bg-red-500 transition hover:bg-red-300"
    ></div>
    <div
      class="h-[200px] w-[200px] rounded-full border-4 border-black bg-yellow-500 transition hover:bg-yellow-300"
    ></div>
    <div
      class="h-[200px] w-[200px] rounded-full border-4 border-black bg-green-500 transition hover:bg-green-300"
    ></div>
  </div>
  <div class="flex flex-row gap-3 group-hover:bg-yellow-400">
    <div class="h-[150px] w-4 bg-white"></div>
    <div class="h-[150px] w-4 bg-white"></div>
    <div class="h-[150px] w-4 bg-white"></div>
    <div class="h-[150px] w-4 bg-white"></div>
    <div class="h-[150px] w-4 bg-white"></div>
  </div>
</section>
```

---

## meta, favicon

공식 : https://nextjs.org/docs/app/building-your-application/optimizing/metadata#static-metadata

### 메타 데이터의 3종류

- Static Metadata
- Dynamic Metadata
- File-based metadata
  - favicon.ico / apple-icon.jpg / icon.jpg
  - opengraph-image.jpg / twitter-image.jpg
  - robots.txt
  - sitemap.xml

---

## page, params, searchParams

공식 : https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes

### 설명해보기

- params(Dynamic Route) vs searchParams

- params(Dynamic Route)

  - URL Path 라고 생각하면 될듯(?)

- searchParams
  - queryString
  - 즉, 해당 URL Path 에서 필요한 정보값들이라고 생각하면 될듯(?)

---

## group folder

- app router에서는 디렉터리 구조에 따라서 앱의 URL에 따른 페이지가 결정된다.
  - app/library/page.tsx
  - app/playlist/page.tsx
- 그룹 폴더는 페이지 경로에 영향을 미치지 않고 폴더를 정리하고 싶을 때 사용한다.

  - 폴더 정리, 폴더를 그룹핑할 때 소괄호 `( )`를 사용하게되면 해당 경로의 영향을 받지 않도록 폴더를 구성할 수 있다.
  - app/(site)/ 아래에 페이지는 경로에 영향을 미치지 않는다.
  - 즉, localhost:3000 로 접속할 때 보여지는 index.html 역할을 한다.

- [Route Group](https://nextjs.org/docs/app/building-your-application/routing/route-groups)
  - 소괄호 `( )` 를 이용해서 폴더를 생성하면된다.
  - URL 경로에 영향을 주지 않고 경로를 구성할 수 있게 된다.
  - 멀티 루트 레이아웃을 만들어 구성할 수 있다. 또는 특정 group folder만 레이아웃을 따로 만들어 사용할 수 있다.
- [app-router playground](https://app-router.vercel.app/)

---

## DataFetching 전략에 따라서 아래 4가지 방식으로 SSR을 구현한다.

- Streaming with Suspense
- Static Data
- Dynamic Data
- Incremental Static Regeneration

```
면접 질문 : 4가지 방식들의 차이점은?
```

- Refs : https://app-router.vercel.app/streaming

## layout file

- Root Layout vs Nesting Layouts
- Refs : https://nextjs.org/docs/app/building-your-application/routing/pages#layouts

- root layout은 오직 하나이며, 최상단에 위치하고 있다.
- 각 route 마다 layout과 page를 가질 수 있다.

  - app/layout.tsx <--- Root Layout
  - app/test/layout.tsx
  - app/test/page.tsx

- layout이 먼저 렌더링되고 다음 page가 렌더링된다.
  - layout에 정의된 `{children}` 이 곧 page 이다.
  - 즉, layout 부모 / page 자식 관계 인듯하다.

---

## loading, error

### 설명해보기 - 서버 컴포넌트가 아닌 경우 로딩 애니메이션이 안나오는 이유는...?

- 애니메이션 동작 여부는 useState로 관리되는 라이브러리 이기때문에
- 서버 사이드 랜더링 이후 애니메이션이 작동하지 않아요. 어떻게 해결 할것인가 ?
  - css 파일에 정의하여 사용하면 가능함!

### 더 알아보기

- Next.js 에서 사용하는 약속된 특수파일 리스트
- 참조 : https://nextjs.org/docs/getting-started/project-structure#routing-files

---

## RootLayout 에서 피해야할 것

- RootLayout의 지연은 전체 App의 느려지는 현상으로 번진다.

### 성능 테스트 해보기

```
< case1 >
rootLayout 4초 지연
homeLayout 2초 지연
-> UI가 보여지기 까지 총 4초 걸림
< case2 >
rootLayout 2초 지연
homeLayout 4초 지연
-> 2초 지연 -> home loading... 2초 -> home page UI 보임
< case3 >
rootLayout 4초 지연
homeLayout 2초 지연
-> 4초 지연 -> home page UI 보임
```

---

## Sidebar > Logo

- 아래 코드 작성시 에러가 발생함

```jsx
const Logo = () => {
  const onClickLogo = () => {
    // home 이동 하는 로직
  };
  return (
    <section className="flex flex-row items-center gap-3">
      <div>
        <RxHamburgerMenu size={24} />
      </div>
      <div className="cursor-pointer" onClick={onClickLogo}>
        <Image alt="logo" width={100} height={30} src={'/main-logo.svg'} />
      </div>
    </section>
  );
};
```

![위의 코드 에러](https://github.com/cansus4569/Next_js_Clone_coding/assets/63139527/b17e6535-6663-446a-b5df-a9b6475c48e7)

- 에러의 원인 : Event Handler 처리는 서버 컴포넌트에서 불가하다. 클라이언트 컴포넌트에서 가능하다.
- 해결 방법 : 최상단에 `'use client'`를 선언해서 클라이언트/서버 컴포넌트로 사용할 수 있게 정의한다.

### useRouter 2종류 차이

- next/router
  - PageRouter 사용시 용도
- next/navigation
  - AppRouter를 사용시 용도

## ![useRouter](https://github.com/cansus4569/Next_js_Clone_coding/assets/63139527/9b96227c-d843-4450-89a5-89e4ed8edd48)

## Sidebar > Navigator

### usePathname

- 현재 경로를 알 수 있다.

```js
import { usePathname } from 'next/navigation';
const pathname = usePathname();
```

- 클라이언트 컴포넌트에서만 사용할 수 있다.

### useParams, useSearchParams, useRouter

- 클라이언트 컴포넌트에서만 사용할 수 있다.
