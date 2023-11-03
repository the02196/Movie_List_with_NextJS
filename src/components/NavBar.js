import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  return (
    <nav>
      <img src="/vercel.svg" />
      <div>
        <Link href="/" className={router.pathname === "/" ? "active" : ""}>
          Home
        </Link>
        <Link
          href="/about"
          className={router.pathname === "/about" ? "active" : ""}
        >
          About
        </Link>
      </div>
      <style jsx>{`
        nav {
          display: flex;
          gap: 10px;
          flex-direction: column;
          align-items: center;
          padding-top: 20px;
          padding-bottom: 10px;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
            rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
        }
        img {
          max-width: 100px;
          margin-bottom: 5px;
        }
        nav a {
          font-weight: 600;
          font-size: 18px;
        }
        .active {
          color: tomato;
        }
        nav div {
          display: flex;
          gap: 10px;
        }
      `}</style>
    </nav>
  );
}
/* 

페이지 간 클라이언트 측 경로 전환을 활성화하고 single-page app 경험을 제공하려면 Link컴포넌트가 필요합니다.

변경 전
< a href="/about">About Us< /a>

변경 후
import Link from 'next/link'

<Link href="/about">About Us</Link>
```

*/

/*

<Link href="/" className={`${styles.link} ${router.pathname === "/" && styles.active}`} style={{color: router.pathname === "/" ? "red" : "blue"}}>Home</Link> 
<Link href="/about" className={`${styles.link} ${router.pathname === "/about" && styles.active}`} style={{color: router.pathname === "/about" ? "red" : "blue"}}><p>about</p></Link> 
      <Link
        href="/"
        className={[
          styles.link,
          router.pathname === "/" ? styles.active : "",
        ].join(" ")}
        style={{ color: router.pathname === "/" ? "red" : "blue" }}
      >
        Home
      </Link>
      <Link
        href="/about"
        className={[
          styles.link,
          router.pathname === "/about" ? styles.active : "",
        ].join(" ")}
        style={{ color: router.pathname === "/about" ? "red" : "blue" }}
      >
        <p>about</p>
      </Link> 

*/
