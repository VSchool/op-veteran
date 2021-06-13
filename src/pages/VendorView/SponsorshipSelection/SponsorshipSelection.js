import React, {useState, useContext, useEffect} from 'react'
import styled from 'styled-components'
import StatusMessage from '../../../components/StatusMessage'
import {SponsorshipCard} from '../../../components/SponsorshipCard'
import VendorContext from '../../../context/VendorProvider'
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

// const CardsContainer = styled.div `
//         width: 100%;
//         box-sizing: border-box;
//         //padding: 20px;
//         /* display: flex;
//         flex-direction: column;
//         align-items: center;
//         justify-content: space-between; */
//         // border: 2px dotted black;
//         display: grid;
//         grid-template-columns: repeat(auto-fit, minmax(288px, 300px)); 
//         gap: 8px; 
//         place-content: center;
// `
const Holder = styled.div`
  height: ${props=>props.portrait ? "500px" : "500px"};
  width:  ${props=>props.portrait ? "320px" : "80vw"};
  margin: auto;
  padding: 0px;
  position: relative;
  display: flex;
  flex-direction:  ${props=>props.portrait ? "column" : "row"};
  overflow-y: ${props=>props.portrait ? "hidden" : "hidden"};
  overflow-x: ${props=>props.portrait ? "hidden" : "scroll"};
  `
const Slider = styled.div`
  width: fit-content;
  height: 100%;
  display: flex;
  flex-direction: ${props=>props.portrait ? "column" : "row "};
  position: absolute;
  overflow-y: ${props=>props.portrait ? "scroll" : "hidden"};
  overflow-x: ${props=>props.portrait ? "hidden" : "scroll"};
`
 
export default function SponsorshipSelection(props) {
  const [data, setData] = useState(props.data)
  const {changeState, states} = props
  const [cart, setCart] = useState([])  
  const [portrait, setPortrait] = useState(false);
  const addItemToCart = (item) =>{
    setCart(prev=>[...prev, item])
  }
  const removeItemFromCart = (itemId) =>{
  const filtered = cart.filter(i=>i.id !==itemId)
  setCart(filtered) 
  }
  const sponsorships = sponsorshipLevels.map(level => {
    return <SponsorshipCard
    addItemToCart={addItemToCart} 
    removeItemFromCart ={removeItemFromCart}
      key={level.name}
      changeState={changeState}
      states={states}
      name={level.name}
      perks={level.perks}
      portrait={portrait}
      />
  })
  useEffect(() => {
  let container = document.querySelector('#root');
  let containerWidth = container.offsetWidth
  if (containerWidth <500) {
    setPortrait(true)
  }
  }, [])
  return (
    <Wrapper>
      <Container height="auto" width="auto">
        <StatusMessage
          className={'status-message'}
          message={"Thanks! Now let's find the correct sponsorship level for your organization."}/>
        <HeaderWrapper>
          <Header>{'Sponsorship level selection'}.</Header>
        </HeaderWrapper>
      <Holder portrait={portrait}>
        <Slider portrait={portrait}>
          {sponsorships}
        </Slider>
      </Holder>
      </Container>
    </Wrapper>
  )
}
          // <Subheader className={'subtitle'}>Choose the right sponsorship package for your organization.
          // </Subheader>

      //<CardsContainer className={'cards-container'}>
      //   {sponsorships}
      // </CardsContainer>