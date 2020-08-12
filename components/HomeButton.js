import HomeIcon from "../style/components/HomeIcon"
import HomeLink from "../style/components/HomeLink"
import { faHome } from "@fortawesome/free-solid-svg-icons"

export const HomeButton = React.forwardRef(({ onClick, href }, ref) => {
  return (
    <HomeLink href={href} onClick={onClick} ref={ref}>
      <HomeIcon icon={faHome} />
    </HomeLink>
  )
})
