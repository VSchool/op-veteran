import React, {useState} from 'react'
import styled from 'styled-components'
import StatusMessage from '../../../components/StatusMessage'
import {SponsorshipCard} from '../../../components/SponsorshipCard'
import {perkList, sponsorshipLevels} from '../../../components/SponsorshipCard/utils'
import {
  LandingContainer,
  Logo,
  Subheader,
  Header,
  HeaderWrapper,
  ButtonWrapper,
  FormWrapper,
  Wrapper,
  Row,
  Container
} from "../../../Elements/basic";

// const Container = styled.div`     box-sizing: border-box;     display: flex;
//   flex-direction: column;     justify-content: space-evenly;     margin:
// auto;     padding: 0 24px 88px 24px; `

const CardsContainer = styled.div `
        width: 100%;
        box-sizing: border-box;
        //padding: 20px;
        /* display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between; */
        // border: 2px dotted black;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(288px, 300px)); 
        gap: 8px; 
        place-content: center;
`

export default function SponsorshipSelection(props) {
  const [data,
    setData] = useState(props.data)
  const {changeState, states} = props
  const sponsorships = sponsorshipLevels.map(level => {
    return <SponsorshipCard
      key={level.name}
      changeState={changeState}
      states={states}
      name={level.name}
      perks={level.perks}/>
  })
  return (
    <Wrapper>
      <Container height="auto" width="auto">
        <StatusMessage
          className={'status-message'}
          message={"Thanks! Now let's find the correct sponsorship level for your organization."}/>
        <HeaderWrapper>
          <Header>{'Sponsorship level selection'}.</Header>
          <Subheader className={'subtitle'}>Choose the right sponsorship package for your organization.
          </Subheader>
        </HeaderWrapper>
      </Container>
      <CardsContainer className={'cards-container'}>
        {sponsorships}
      </CardsContainer>
    </Wrapper>
  )
}
