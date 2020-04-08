import { colors } from '../../constants'
import styled from "styled-components"

export default styled.h2`
  color: ${props => colors[props.quality]};
  font-family: 'Noto Serif SC', serif;
  font-size: 3rem;
`