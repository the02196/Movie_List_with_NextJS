import { useEffect, useState } from "react";
import Seo from "../components/Seo";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home({ results }) {
  const router = useRouter();
  const onClick = (id, title) => {
    router.push(`/movies/${title}/${id}`)
    
    // router.push(
    //   {
    //     pathname: `/movies/${id}`,
    //     // 이 부분은 URL을 설정하고 정보를 얹어주는 부분이었고,
    //     query: {
    //       title,
    //       // title 만 적으면 title = title 과 같다.
    //     },
    //   },
    //   `/movies/${id}`
    // );
    // 이 부분은 (내가 원한다면) 이 방식을 통해 브라우저에 보이는 URL을 마스킹 할 수 있다.
    // 마스킹 된 이후, url은 http://localhost:3000/movies/507089 이렇게 뜬다.
    // 하지만 router를 들여다보면 우리가 담아준 데이터를 확인할 수 있다.
  };
  // const [movies, setMovies] = useState();
  // useEffect(() => {
  //   (async () => {
  //     const { results } = await (await fetch(`/api/movies`)).json();
  //     // fake fatching URL
  //     setMovies(results);
  //   })();
  // }, []);
  return (
    <div className="container">
      <Seo title="Home" />
      {!results && <h4>Loading...</h4>}
      {/* movies에서 results로 바꿨다. 부분 CSR, 부분 SSR에서 => 100% SSR로 바꾼 것. 
      이제 더 이상 로딩이 일어나지 않는다! 왜? "이미 다 렌더를 한 다음"에 가져오기 때문! 
      즉, "results가 없을 경우는 없기" 때문에, !results라는 조건은 성립되지 않는다. 
      소스 코드를 확인해 보면, loading 만 있던 html에서 영화에 대한 정보들이 html에 추가된 것을 확인할 수 있다.
      (정보들 === react component의 render result)

      알다시피 CSR로 불러와진 정보는 소스 코드에 출력되지 않고, 오직 SSR을 통해 pre-rendering된 정보들만 소스 코드, 
      즉 html에 출력되기 때문이다. 이것은 더 이상 reactJS가 아니고 HTMl이다.

      언제 CSR렌더 SSR을 선택하는가? 그 첫 번째 기준이 바로 이것이다.
      데이터가 유효할 때만 화면이 보여지게 되는 것이 좋은가? (SSR) / (CSR) 아니면 로딩 화면을 보여준 다음에 데이터를 받는 것이 좋은가?
      Loading 화면 없이 API가 완료되도록 기다린 후에 모든 정보를 보여주는 것? (SSR) / (CSR) nav bar와 footer, 그리고 가운데에 loading을 보여주는 것? 

      더 이상 loading은 없는 대신에, 만약 API load가 느려진다면???
      유저가 아무것도 보지 못한 채로 오래 기다려야 한다는(SSR) 단점이 있다.
      
      이런 부분에서 잘 협상을 하면서 개발해야 한다.

      노마드 코더는 "static shell"을 사용해서 자신의 페이지를 렌더한다고 하는데, 이게 뭘까? 찾아보자.
      
      */}
      {results?.map((movie) => (
        // <Link
        //   onClick={() => {
        //     onClick(movie.id, movie.original_title);
        //   }}
        //   key={movie.id}
        //   href={{
        //     pathname: `/movies/${movie.id}`,
        //     query: {
        //       title: movie.original_title,
        //     },
        //   }}
        //   as={`/movies/${movie.id}`}
        //   // url을 마스킹 하는 이유는 간단하다. url이 훨씬 직관적이고 예쁘게 보이고 restful 하잖아!
        // >
        <Link 
          href={`/movies/${movie.original_title}/${movie.id}`}
        >
          <div className="movie" key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
            <h4>{movie.original_title}</h4>
          </div>
        </Link>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
          margin: 0 auto;
        }
        .movie {
          cursor: pointer;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

// 이 함수를 활성화 하지 않으면 사전 생성(pre-render)된 html에 데이터가 포함되지 않아서 빈 박스만 보인다.
// (그래서 데이터가 오기 전까지 loading을 출력 했던 것.)
// (누군가 홈페이지를 접속했을 때, reactJS가 처리를 마치기 전까지는 실제로 html 소스 코드를 보면 "loading" 중인 것으 확인할 수 있을 것이다.)
// 그 뒤 ReactJS는 useEffect, useState

export async function getServerSideProps() {
  // 여기서 /api/movies(라우터만 적어주는 경우)에는 프론트엔드에서만 작동된다. 서버에서는 작동되지 않는다.
  // http://localhost:3000/api/movies 를 적어주면 작동한다! abosolute url이기 때문이다.
  const { results } = await (
    await fetch(`http://localhost:3000/api/movies`)
  ).json();
  return {
    props: {
      results,
    },
  };
}
// getServerSideProps()는 object 하나를 리턴하게 되고, object안에는 props라는 키가 들어있다. props에는 내가 원하는 데이터를 어떤 것이든 넣을 수 있다.
// getServerSideProps()는 server 에서 실행 될 것이다. 그리고 여기서 무엇을 리턴하던지, props로써 page에 주게 된다.
// 자, 이제 우리가 원한다면 server side를 통해, props를 page로 보낼 수 있다.

/*
순서 

1. nextJS가 Home을 받아서 render 하기 위해 _app.js에 component 프롭에 넘길 것이고, 
2. <Layout><Component {...pageProps}/></Layout>에서 <Component> 부분에 호출 될 것이다.
3. 그리고 next.js는 우리가 getServerSideProps()를 쓰고 있다는 것을 알게 될 것이고,
4. 우리는 이곳에 API에서 뭔가를 호출 할 것이다.
5. 그 후에 이곳에서 props에 그 값 results를 담아 리턴하게 될 것이다.
6. <Layout><Components {...pageProps}/></Layout>에서 {...pageProps} 부분에 호출 될 것이다.

정리 : 
1. nextJS가 (getServerSideProps()를 사용하여) 백엔드에서 받아온 props를 return해서 {...pageProps}에 가져다 주면, 
reactJS가 그 props를 가져와서 result array를 뽑아준다.

이 result array를 가지고는 프론트엔드에서 아무거나 다 할 수 있다!

결국 우리가 하는 건, page가 유저에게 보여지기 전에, props를 받아오는 function을 만드는 것이다.
여기에서 뭐가 return되던, 우리 페이지의 props값으로 사용 될 것이다.

nextJS가 자동으로 props들을 넣어주고, reactJS가 받아다가 "흡수 (hydration)"한다고 말할 수 있다. 

nextJS 13 에서는 getServerSideProps 과 getStaticProps도 지양한다고 한다.

fetch의 cache, revalidate 옵션을 사용하여 대체하는 듯 하다.
*/
