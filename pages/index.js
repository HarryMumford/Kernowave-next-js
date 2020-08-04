import Link from "next/link"
import GlobalStyle from "../style/components/GlobalStyle"
import Heading from "../style/components/Heading"
import BeachesContainer from "../style/components/BeachesContainer"
import Header from "../style/components/Header"
import { Helmet } from "react-helmet"
import BeachContainer from "../style/components/BeachContainer"
import { location } from "../constants"

export default function Index() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Kernowave</title>
        <link
          href="https://fonts.googleapis.com/css?family=Norican|Noto+Serif+SC&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <GlobalStyle />
      <Header>
        <Heading>Kernowave</Heading>
      </Header>
      <BeachesContainer>
        {Object.keys(location).map(spotId => {
          const name = location[spotId].name

          return (
            <Link href="/beach/[spot]" as={`/beach/${spotId}`}>
              <BeachContainer>{name}</BeachContainer>
            </Link>
          )
        })}
      </BeachesContainer>
    </>
  )
}
