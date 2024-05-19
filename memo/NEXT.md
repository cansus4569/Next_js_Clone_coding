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

## Tailwind CSS 헤더강의 6.2 까지 듣고 느낀점..

- 생각보다,, width와 height 정의를 많이 써야하고, 부모의 width/height 속성값도 신경써야 한다.
- 안그러면, 보이지 않아서 디버깅을 통해 하나하나 확인하면서 왜 화면상에 보이지 않는지 찾아나가야한다.

---

## 경로 재설정

Route 설정은 서버에서 할 수 있으며, 브라우저(클라이언트)에서도 가능하다.

- 클라이언트 컴포넌트에서 Route를 바꾸는 예시는 무엇이 있을까요?
  - useRouter
    - https://nextjs.org/docs/app/api-reference/functions/use-router
- 서버측에서 Route를 바꾸는 예시는 무엇이 있을까요 ?
  - permanentRedirect(path [, type])
    - https://nextjs.org/docs/app/api-reference/functions/permanentRedirect
  - redirect(path [, type])
    - https://nextjs.org/docs/app/api-reference/functions/redirect

---

## ref가 변할 가능성

```jsx
// code1
useEffect(() => {
  const handleScroll = () => {
    const scrollValue = headRef.current?.scrollTop;
    setIsScrolled(scrollValue !== 0);
  };

  headRef.current?.addEventListener('scroll', handleScroll);
  return () => {
    // warning message : The ref value 'headRef.current' will likely have changed by the time this effect cleanup function runs. If this ref points to a node rendered by React, copy 'headRef.current' to a variable inside the effect, and use that variable in the cleanup function.eslintreact-hooks/exhaustive-deps
    headRef.current?.removeEventListener('scroll', handleScroll);
  };
}, []);
```

```jsx
// code1 리팩토링
useEffect(() => {
  const currentHeadRef = headRef.current;

  const handleScroll = () => {
    const scrollValue = currentHeadRef?.scrollTop;
    setIsScrolled(scrollValue !== 0);
  };

  currentHeadRef?.addEventListener('scroll', handleScroll);
  return () => {
    currentHeadRef?.removeEventListener('scroll', handleScroll);
  };
}, []);
```

- code1 에서 warning이 발생함
- Warning 이유

```
React 에서 렌더링된 노드를 가리키는 ref가 변할 가능성이 있음을 알려준다.
이를 해결하기 위해 effect 내부에서 'headRef.current' 값을 변수에 복사하고
그 변수를 cleanup 함수에서 사용해라
```

- 리팩토링 이후 warning이 사라짐
- headRef.current 값은 유동적이다.
  - 예시) headRef.current는 <section> 태그를 지정하면 바라볼 수도 있고, <div> 태그에 지정하면 그것을 바라볼 수도있다.
  - 그래서, const 변수를 선언하여 headRef.current 값을 담고, useEffect 는 최초 렌더링될때 한번만 수행되기 떄문에, 문제가 없는것 같다...
  - 물론 아닐 수도 있다...

---

## react key props

- React에서 map을 순회하여 컴포넌트를 랜더링할 때 key 값을 넘겨야하는 이유

1. `성능 최적화`

- key는 React가 엘리먼트를 식별하는데 사용된다.
- key를 제공하면 React가 각 항목을 고유하게 식별하고 변경된 요소만 다시 렌더링할 수 있다.
- 이렇게 하면 React가 전체 목록을 다시 렌더링하는 대시 변경된 요소만 업데이트하므로 성능이 향상된다.

2. `상태 유지`

- key를 제공하지 않으면 React는 컴포넌트를 재사용하거나 갱신하지 않고 새로운 요소로 인식한다.
- 따라서 컴포넌트의 상태가 보존되지 않고 다시 생성할 수 있다.
- 이는 사용자 입력에 따라 상태를 잃어버리거나 불필요하게 컴포넌트를 다시 렌더링할 수 있다.

3. `독립적인 엘리먼트`

- 각 엘리먼트에 고유한 key를 제공하면 React가 이를 독립적인 욧고로 취급한다.
- 이는 컴포넌트에 대한 식별자로 사용되므로 React가 정확히 어떤 요소가 변경되었는지 파악할 수 있다.

```
따라서 React에서 map을 사용하여 동적으로 컴포넌트를 생성할 때는 각 컴포넌트에 고유한 key를 제공하여 성능을 최적화하고 상태를 유지하는것이 중요하다.
```

---

## ReactElement vs ReactNode vs JSX.Element

- 참조 : https://velog.io/@hanei100/ReactElement-vs-ReactNode-vs-JSX.Element#reactelement-vs-reactnode-vs-jsxelement

### JSX

- JSX는 Javascript의 확장 문법

  - React에서 작성하는 대부분의 코드는 JSX 코드이다.

- `클래스형 컴포넌트`는 render 메소드에서 `ReactNode`를 리턴
- `함수형 컴포넌트`는 `ReactElement`를 리턴

- JSX는 바벨에 의해서 `React.createElement(component, props, ...children)` 함수로 `트랜스파일` 된다.
  - html 처럼 생긴 문법을 리액트 라이브러리의 렌더링 함수로 변환하는 것이다.

```jsx
// jsx
<div>Hello {this.props.toWhat}</div>
<Hello toWhat="World" />
```

```jsx
// transpile
React.createElement('div', null, `Hello ${this.props.toWhat}`);
React.createElement(Hello, { toWhat: 'World' }, null);
```

- 이 React.createElement의 리턴 타입이 바로 `ReactElement`와 `JSX.Element` 이다.

### ReactElement

```tsx
interface ReactElement<
  P = any,
  T extends string | JSONElementConstructor<any> =
    | string
    | JSXElementConstructor<any>
> {
  type: T;
  props: P;
  key: key | null;
}
```

`React.createElement`를 호출하면 이런 타입의 객체가 리턴된다.
단순하게 리액트 컴포넌트를 JSON형태로 표현해놨다고 생각하면 된다.
`ReactElement는 type과 props를 가진 객체`이다.

### ReactNode

```tsx
type ReactText = string | number;
type ReactChild = ReactElement | ReactText;

interface ReactNodeArray extends Array<ReactNode> {}
type ReactFragment = {} | ReactNodeArray;

type ReactNHode =
  | ReactChild
  | ReactFragment
  | ReactPortal
  | boolean
  | null
  | undefined;
```

`ReactNode는 ReactElement의 superset`이다.
ReactNode는 ReactElement일 수 있고
ReactFragment, string, number, ReactNode의 Array, null, undefined, boolean 등의 좀 더 유연한 타입정의라고 할 수 있다.

### JSX.Element

```tsx
declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
  }
}
```

`JSX.Element는 ReactElement의 특정 타입`이라고 생각하면 된다.
JSX.Element는 props와 type이 any인 제네릭 타입을ㅇ 가진 ReactElement이다.
`JSX는 글로벌 네임 스페이스`에 있기 때문에 다양한 라이브러리에서 자체 라이브러리의 방법대로 실행될 수 있다.

---
