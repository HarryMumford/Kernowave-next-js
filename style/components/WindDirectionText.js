import styled from "styled-components"
import { colors } from '../../constants'

export default styled.div`
  font-size: 0.8rem;
  margin-right: auto;
  color: ${props => colors[props.windDirection]};
`