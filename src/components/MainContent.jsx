import React from 'react'
import styled from 'styled-components'
import svg1 from '../assets/1.svg'
import svg2 from '../assets/2.svg'
import svg3 from '../assets/3.svg'
import svg4 from '../assets/4.svg'

const MainContent = () => {
  return (
    <Root>
      <Section>
        <img src={svg1} alt="svg"></img>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>
      </Section>
      <Section reverse>
        <img src={svg2} alt="svg"></img>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>

      </Section>
      <Section>
        <img src={svg3} alt="svg"></img>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>

      </Section>
    </Root>
  )
}


export default MainContent

const Root = styled.section`
  max-width:1200px;
  margin:0 auto;

`

const Section = styled.div`
  display:flex;
  flex-direction:${props => props.reverse ? "row-reverse" : ""};
  padding:60px 40px;

  @media(max-width:800px){
    flex-direction:column;
    align-items:center;
    padding:60px 0;

  }
  img{
    max-width:50%
  }
  p{
    padding:40px
  }
`