import Seo from "@/components/Seo";
import { useRouter } from "next/router";

export default function Detail({ params }) {
  const router = useRouter();
  const [title, id] = params || [];
  // const [title, id] = router.query.param || [];
  // router.query.params는 서버에서 아직 배열이 아니기 때문에, 그냥 주소만 입력해서 들어갔을 때, 에러가 날 것이다. 그래서 or 연산자로 에러를 방지해준다.
  console.log(router);
  return (
    <div>
      <Seo title={title} />
      {/* <h4>{router.query.title || "Loading..."}</h4> */}
      <h4>{title}</h4>
    </div>
  );
}

export function getServerSideProps({ params }) {
  console.log(params);
  return {
    props: params,
  };
}

// 이전에는 Detail 컴포넌트 내부에서 router를 사용했었다. 컴포넌트 내부에서 router를 사용하면 router는 "프론트(클라이언트 사이드)"에서만 실행이 된다.
// 만약 URL에 들어있는 영화 제목을 사용해서 구글 SEO에 최적화 하고, 유저가 접속하기 전에 탭 제목을 바꾸고 싶고, 기본저긍로 그냥 이 페이지를 pre-render 하고 싶다면,
// 그때에는 server-side에서 정보를 얻기 위한 getServerSideProps를 실행하면 된다.
// 지금의 경우에는 이전에 사용했던 함수 (getServerSideProps)로 URL 정보를 가져오는 데에만 사용했다.
// server-side에서 받아온 정보를 페이지로 넘겨주면, 페이지는 그 정보를 받아서 보여주는 것이다. 그럼 server-side에서 pre-render된 꼴이 되는 것이다.
// 유저에게 보이기 까지의 시간이 조금 걸릴 수도 있지만,이 경우에서는 API에 요청을 보내는게 아니니까 느려질 가능성은 거의 없을 것 같다.
// index 페이지는 느려질 수 있다. API의 응답이 느리면 유저에게는 아무것도 보이지 않을테니까. 브라우저에 로딩이 돌고 있는 것만 보게 될 것이다. 그건 좋지 않다.

/*

Dynamic Routes (Dynamic url)

Next.js에서는 page에 대괄호([param])를 추가하여 Dynamic Route를 생성할 수 있습니다.
/movies/1, /movies/abc 등과 같은 모든 경로는 pages/movies/[id].js와 일치합니다.
```
const router = useRouter()
const { id } = router.query
```
https://nextjs.org/docs/routing/dynamic-routes

Catch all routes
대괄호 안에 세 개의 점(...)을 추가하여 모든 경로를 포착하도록 Dynamic Routes를 확장할 수 있습니다. 
pages/movies/[...id].js는 /movies/1와 일치하지만 /movies/1/2, /movies/1/ab/cd 등과도 일치합니다. 
일치하는 매개변수는 페이지에 쿼리 매개변수로 전송되며 항상 배열이므로 /movies/a 경로에는 다음 쿼리 개체가 있습니다.

ex) { "id": ["a"] }
https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes


*/
