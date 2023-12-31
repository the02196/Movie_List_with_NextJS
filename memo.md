## Next.js

Next.js의 가장 좋은 기능 중 하나는, 앱에 있는 페이지들이 미리 렌더링 된다는 것이다.
이것은 정적(static)으로 생성된다.

## CSR과 SSR

create-react-app은 client-side render를 하는 앱을 만든다.
root div를 제외하고 어떠한 것도 소스 코드를 통해 볼 수 없다.

client-side rendering은 브라우저가 HTML을 가져올 때, 비어있는 div로 가져온다는 걸 의미한다.
이 경우 브라우저는 react.js 코드가 왔을 때만 UI를 만들 수 있다.
인터넷이 느린 경우 페이지 첫 로딩 때, 흰 화면만 오래 동안 보게 된다? 진짜 별로지 않은가.

Next.js의 경우 SSR로 UI들이 미리 렌더링 된다.
유저가 페이지를 요청하면 그들은 진짜 HTML을 얻게 될 것이다. 

react.js를 프론트엔드 안에서 실행하는 것을 hydration이라고 부른다.

## 하이드레이션 

"하이드레이션"은 서버 사이드 렌더링 (SSR)을 사용하는 React.js 애플리케이션에서 사용되는 개념입니다. 하이드레이션은 서버에서 렌더링된 HTML을 클라이언트에서 React 컴포넌트와 연결시키는 과정을 의미합니다. 이를 통해 페이지가 동적으로 작동하게 됩니다.

하이드레이션의 과정은 다음과 같습니다:

1. 서버에서 페이지의 HTML을 렌더링합니다.
2. 서버에서 렌더링된 HTML을 클라이언트에게 전송합니다.
3. 클라이언트에서 React.js가 로딩됩니다.
4. React.js가 이미 렌더링된 HTML과 연결되어, 동적으로 작동하도록 만듭니다.

* 정리 : 하이드레이션을 사용하면, 사용자가 페이지를 빠르게 볼 수 있도록 초기 로딩 속도를 개선할 수 있습니다. 또한, 검색 엔진 최적화 (SEO)에도 도움이 됩니다.

## Next.js의 작동 원리

Next.js는 Node.js 환경에서 실행되며, 서버 사이드 렌더링 (SSR)을 구현하기 위해 Node.js 서버를 사용합니다. Node.js는 JavaScript를 서버에서 실행할 수 있도록 해주는 런타임 환경입니다. Next.js는 이 Node.js 서버를 사용하여 페이지를 렌더링하고, 클라이언트에게 미리 만들어진 HTML을 전송합니다.

Next.js는 React.js 프레임워크로, 서버 사이드 렌더링 (SSR)을 지원합니다. 이는 쉽게 말해, 페이지의 내용이 서버에서 미리 만들어져서 클라이언트에게 전달되는 것을 의미합니다. 그래서 유저가 페이지를 열었을 때, 자바스크립트와 React.js가 아직 로딩되지 않았더라도 이미 만들어진 HTML 내용을 볼 수 있게 됩니다. 이를 통해 페이지 로딩 속도가 빨라지고, 검색 엔진 최적화 (SEO)에도 도움이 됩니다.

React.js가 로딩되면, Next.js는 이미 만들어진 HTML 내용과 React 컴포넌트들을 연결시켜서 페이지가 동적으로 작동하도록 만듭니다. 이를 통해 사용자가 페이지와 상호작용할 때, 페이지가 실시간으로 업데이트되는 것을 볼 수 있습니다. 이 과정을 "하이드레이션"이라고 합니다.

간단히 말해, Next.js는 서버에서 미리 페이지를 만들어서 보내주고, 클라이언트에서 React.js가 로딩된 후에는 그 페이지가 동적으로 작동하도록 만들어줍니다.


## What is catch-all URL?

무엇이든 catch 해내는 URL이다!
항상은 아니지만 분명 필요할 때가 온다!
우리의 경우 무척이나 필요하다. 왜? url에 영화 제목을 표시하고, 이것은 seo 최적화에 아주 좋으니까!

[...id].js


## 만약에 유저에게 절대 로딩 페이지를 보여주고 싶지 않고, SEO에 아주아주 최적화되게 만들고 싶다면?

getServerSideProps를 써라!!

다만 우리가 한 예제에서는 단순히 영화 제목과 ID를 얻기 위해 getServerSideProps를 사용할 수 있다.

API로 데이터를 fetch 해오기 위함이 아니라, 조금 더 빠르게 데이터를 가져오기 위함이랄까.

