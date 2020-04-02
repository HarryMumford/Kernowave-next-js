import { colors } from '../../constants'
import styled from "styled-components"

export default styled.h3`
  color: ${props => colors[props.quality]};
  font-size: 2rem;
`