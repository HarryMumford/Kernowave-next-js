import Link from 'next/link'
import GlobalStyle from "../style/components/GlobalStyle"
import Heading from "../style/components/Heading"
import BeachesContainer from "../style/components/BeachesContainer"
import Header from "../style/components/Header"
import Subheading from "../style/components/Subheading"
import { Helmet } from "react-helmet";
import BeachContainer from "../style/components/BeachContainer"

export default function Index() {
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Kernowave</title>
        <link href="https://fonts.googleapis.com/css?family=Norican|Noto+Serif+SC&display=swap" rel="stylesheet"/>
      </Helmet>
      <GlobalStyle/>
      <Header>
        <Heading>Kernowave</Heading> 
      </Header>
      <BeachesContainer>
        <Link href="/beach/8">
          <BeachContainer>Praa Sands</BeachContainer>
        </Link>
        <Link href="/beach/3">
          <BeachContainer>Gwithian</BeachContainer>
        </Link>
      </BeachesContainer>
    </>
  )
}




