import styled from "styled-components"

export default styled.div`
  width: 50vw;
  font-family: 'Noto Serif SC', serif;
  font-size: 1.5rem;
  color:  #0f4c81;
  display: flex;
  height: 70vh;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #0f4c81;
    color: white;
  }
  @media (max-width: 480px) {
    width: 100vw;
    height: 35vh;
  }
`