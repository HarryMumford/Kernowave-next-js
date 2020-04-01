import styled from "styled-components"
import { colors } from "../../constants"

export default styled.div`
  font-size: 0.8rem;
  margin-left: auto;
  color: ${props => colors[props.windSpeed]};
` 