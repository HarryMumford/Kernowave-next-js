import Link from 'next/link'
import GlobalStyle from "../style/components/GlobalStyle"
import Heading from "../style/components/Heading"
import Section from "../style/components/Section"
import Header from "../style/components/Header"
import Subheading from "../style/components/Subheading"

export default function Index() {
  return (
    <>
      <GlobalStyle/>
      <Header>
        <Heading>Kernowave</Heading>
      </Header>
      <Section>
        <Link href="/beach/8">
          <Subheading>Praa Sands</Subheading>
        </Link>
        <Link href="/beach/3">
          <a>Gwithian</a>
        </Link>
      </Section> 
    </>
  )
}




