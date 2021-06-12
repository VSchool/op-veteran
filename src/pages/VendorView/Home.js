import React, {useContext, useState, useEffect} from 'react'
import styled from 'styled-components'
import {UserContext} from '../../context/UserProvider'
import {VendorContext} from '../../context/VendorProvider'
import {
  Wrapper,
  Header,
  Subheader,
  Paragraph,
  Container,
  HeaderWrapper
} from '../../Elements/basic'

const Header2 = styled.h2 `
    font-family: 'Open Sans';
    font-weight: normal;
    padding: 15px 15px;
    width: 100%;
    height: 2em;
   box-shadow: 0 0px 10px rgba(0, 0, 0, 0.14);
    background-color: #232323;
    color: #ecf0f1;
`
const TodoContainer = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: auto;
    padding: 20px 10px;
   
    width:  clamp(300px, 75%, 600px);
    height: max-content;
`

const List = styled.ol `
    list-style: none;
  counter-reset: steps;
 
`
const ListItem = styled.li `
    counter-increment: steps;
    font-family: 'Open Sans';
    font-size: 1.3em;
    padding: 20px;
    width: 100%;
    height: 3em;
    line-height: 1.3em;
    margin: 5px 0;
    font-weight: ${props => props.current
  ? "bold"
  : "normal"};
    background-color: #ecf0f1;
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 7px rgba(0, 0, 0, 0.12), 0px 2px 3px rgba(0, 0, 0, 0.2);
    z-index: ${props => props.current
    ? 3
    : null};
    text-decoration: ${props => props.complete
      ? "line-through"
      : "none"};
    cursor: ${props => props.current
        ? "pointer"
        : null};
    &::before{
        content: counter(steps);
        margin-right: 0.6rem;
        background: #232323;
        color: #ecf0f1;
        width: 1.3em;
        height: 1.3em;
        border-radius: 50%;
        display: inline-grid;
        place-items: center;
        line-height: 1.2em;
    }
    &:hover{
        background-color: ${props => props.current
          ? "#7c9091"
          : "#ecf0f1"};
    }
    `
const Home = (props) => {
  const {states, changeState} = props
  const {user} = useContext(UserContext)
  const {currentVendor, matchVendor, updateCurrentVendor} = useContext(VendorContext)
  useEffect(() => {
    matchVendor()
  }, [])
  const [items,
    setItems] = useState({
    createAccount: true,
    registerVendor: false,
    uploadLogo: false,
    sponsor: false,
    selectBooth: false,
    completeRegistration: false
  })

  const handleClick = (e) => {
    switch (e.target.innerText) {
      case "Register vendor":
        changeState(states.REGISTER)
        break;
      case "Upload logo":
        break;
      case "Choose sponsorship":
        changeState(states.SPONSOR)
        break;
      case "Select booth":
        changeState(states.SELECT)
        break;
      case "Finalize registration":
        changeState(states.FINALIZE)
        break;

    }
  }
  return (
    <Wrapper>
      <HeaderWrapper>
        <Header>Vendor Registration</Header>
      </HeaderWrapper>
      <TodoContainer>
        <List>
          <Header2>
            To do:
          </Header2>
          <ListItem complete={true}>
            Create account
          </ListItem>
          <ListItem
            complete={currentVendor}
            current={currentVendor == []}
            onClick={(e) => {
            if (currentVendor != []) 
              handleClick(e)
          }}>
            Register vendor
          </ListItem >
          {(currentVendor && !currentVendor.logo)
            ? <ListItem
                complete={currentVendor && currentVendor.logo}
                current={currentVendor && !currentVendor.logo}
                onClick={(e) => {
                if (currentVendor && !currentVendor.logo) 
                  handleClick(e)
              }}>
                Upload logo
              </ListItem>
            : null}
          {(currentVendor.sponsorship && !currentVendor.sponsorship.level && currentVendor.sponsorship.interested)
            ? <ListItem
                onClick={(e) => {
                if (currentVendor.sponsorship && !currentVendor.sponsorship.level) 
                  handleClick(e)
              }}
                complete={(currentVendor.sponsorship && currentVendor.sponsorship.level)}
                current={(currentVendor.sponsorship && !currentVendor.sponsorship.level)}>
                Choose sponsorship
              </ListItem>
            : null}
          <ListItem
            onClick={(e) => {
            if (currentVendor.sponsorship && !currentVendor.sponsorship.level) 
              handleClick(e)
          }}
            complete={(currentVendor.booth && currentVendor.booth.primary.finalized)}
            current={(currentVendor.booth && !currentVendor.booth.primary.finalized)}>
            Select booth
          </ListItem>
          <ListItem>
            Finalize registration
          </ListItem>
        </List>
      </TodoContainer>
    </Wrapper>
  )
}

export default Home