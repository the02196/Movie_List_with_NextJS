import NavBar from "@/components/NavBar";
import styles from "../styles/globals.css";
import Layout from "@/components/Layout";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

// global로 import 하게 될 것들이 많을 거야! 구글 애날리틱스, 검색엔진에 관한 것, 스크립트 분석에 관한 것 등등.
// 그러니까 아주 큰 react.js component를 사용하기보다는, Layout 이라는 작은 컴포넌트를 만들어주는게 좋다.

// Layout 안에 뭘 넣든 간에 Layout 컴포넌트의 children props으로 넘어가게 된다. children prop은 react.js에서 제공한다. 하나의 컴포넌트를 또 다른 컴포넌트 안에 넣을 떄 쓸 수 있다.

// 프레임워크는 나의 코드를 불러온다. Next.js는 _app.js를 불러오고, APP 함수를 자동으로 불러온다.
// Component 프롭 - 만약 내가 about페이지를 렌더링 하고 싶다면 Next.js는 about.js로 가서 나의 컴포넌트를 가져다가 Component 프롭에 넣어 줄 것이다.
// 즉, 이 경우 페이지에 만들어놓은 컴포넌트를 내가 직접 가져다가 붙여넣기 하는 일은 절대로!! 없을 것이다.

/* 
예시)

export default function App({ about, pageProps }) {
  return (
    <div>
      <about {...pageProps} />
      <span>hello</span>
    </div>
  );
}

*/
