import Link from 'next/link'
import GlobalStyle from "../style/components/GlobalStyle"
import Title from "../style/components/Title"

export default function Index() {
  return (
    <>
      <GlobalStyle/>
      <Title>Kernowave</Title>
      <Link href="/about">
        <a>About Page</a>
      </Link>
      <Link href="/beach/8">
        <a>Praa Sands</a>
      </Link>
      <Link href="/beach/3">
        <a>Gwithian</a>
      </Link>
    </>
  )
}
