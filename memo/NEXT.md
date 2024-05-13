# NEXT에 대한 스터디

## app 디렉터리

### layout.tsx

- RootLayout 함수
  - 이 프로젝트에서 단 하나만 존재할 수 있다.

## components 디렉터리

- 공통으로 사용하는 리액트 컴포넌트를 담아놓는다.

## lib 디렉터리

- utils.ts
  - 각종 유틸리티 함수를 담아 넣는다.

## providers 디렉터리

- 프로젝트 페이지 전반에 걸친 테마 같은 것들을 넣어준다.

## public 디렉터리

- 정적 파일들을 넣어준다.

---

## queryString

예제 : http://localhost:3000/playlist?list=10

- URL에 추가적인 정보를 입력했다라고 생각하면된다.
- 물음표 뒤에 오는 URI
  - `list=10` queryString

## pageRoute

- app 디렉터리 아래에 OOOO 폴더를 만들고 page.tsx 라고 만들면 자동으로 라우팅 경로가 잡힌다.

  - app/test/page.tsx 생성
  - localhost:3000/test 경로가 생김

- `app/channel/[id]/page.tsx` 라고 만들면 명확한 표현용어는 모르겠다.. 아마도 동적 라우팅? 다이나믹 페이지 라우팅? 이라고 부르지 않을까?
- 즉 대괄호 `[ ]` 를 이용해서 변수 입력같은 역할을 수행할 수 있다.
  - 예시1 : localhost:3000/channel/1
  - 예시2 : localhost:3000/channel/hello
