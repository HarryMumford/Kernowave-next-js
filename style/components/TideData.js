import { colors } from "../../constants"
import styled from "styled-components"

export default styled.p`
  color: ${props => colors[props.tide]};
  font-family: "Noto Serif SC", serif;
  font-size: 1rem;
  word-spacing: 8rem;
`
