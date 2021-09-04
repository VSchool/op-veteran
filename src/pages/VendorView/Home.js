import React, {useContext, useState, useEffect} from 'react'
import styled from 'styled-components'
import {UserContext} from '../../context/UserProvider'
import {VendorContext} from '../../context/VendorProvider'
import {BoothContext} from '../../context/BoothProvider'
import {Button} from '../../components/Button'
import Modal from '../../components/Modal'
import StatusMessage from '../../components/StatusMessage'
import {
  Wrapper,
  Header,
  Subheader,
  Paragraph,
  Container,
  HeaderWrapper,
  FileUploader
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
   
    width:  clamp(300px, 75%, 800px);
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
    @media (max-width: 500px) {
      font-size: 1rem;
    }
    `
const Home = (props) => {
  const tasks = {}
  const [modalMessage, setModalMessage] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [showLogoUploader,
    setShowLogoUploader] = useState(false)
  const {states, changeState} = props
  const {user} = useContext(UserContext)
  const [file,
    setFile] = useState(null)
  const {currentVendor, run, matchVendor, updateCurrentVendor, storeFile, checkProducts, getCartItems, getOrderStatus, clearCart} = useContext(VendorContext)
  const {updateBooth, booths, setNeighbors, newBooths, resetBooth} = useContext(BoothContext)
  
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
  const saveLogo = (file) => {
    const fileName = file.name
    const extension = fileName.split('.')[1]
    const newFileName = currentVendor?.organization.replace(/ /g,'')
    console.log(newFileName)
    storeFile(file, `logos/${newFileName}/${newFileName}.${extension}`) 
  }
  const handleLogoUpload = (e) => {
    setShowLogoUploader(false)
    saveLogo(file)
  }
  const handleClick = (e) => {
    switch (e.target.innerText) {
      case "Register vendor":
        changeState(states.REGISTER)
        break;
      case "Upload logo":
        setShowLogoUploader(!setShowLogoUploader)
        break;
      case "Choose sponsorship":
        changeState(states.SPONSOR)
        break;
      case "Select booth":
        changeState(states.SELECT)
        break;
      case "Finalize registration":
        console.log("Finalize registration")
        changeState(states.FINALIZE)
        break;

    }
  }
  const register = ()=>{
    changeState(states.REGISTER)
  }
  const finalize=() => {
    console.log("Finalize registration")
        changeState(states.FINALIZE)
  }
  const changeBooths = (e)=>{
    console.log("changing booths")
    for (let booth of booths) {
      if (booth?.restriction !== 1 && booth?.restriction !== 2){
      const updatedBooth = {...booth}
      updatedBooth.restriction = 0
      updateBooth(updatedBooth, booth?.id)
      console.log(`updating booth ${booth?.id}`)
    }
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
            complete={currentVendor?.organization}
            current={currentVendor===null} 
            onClick={(e) => {
            if (currentVendor === null) {
              register()
          }}}>
            Register vendor
          </ListItem >
          {(currentVendor && !currentVendor?.logo)
            ? <ListItem
                complete={currentVendor && currentVendor?.logo}
                current={currentVendor && !currentVendor?.logo}
                onClick={(e) => {
                if (currentVendor && !currentVendor?.logo) 
                  setShowLogoUploader(!showLogoUploader)
              }}>
                Upload logo
              </ListItem>
            : null}
          {(currentVendor && !currentVendor?.logo && showLogoUploader)
            ? <Container width="80%"><FileUploader
                onChange={(e) => {
                setFile(e.target.files[0])
              }}
                type="file"/>
                {file === null
                  ? null
                  : <Button
                    buttonText="Upload"
                    buttonStyle="primary"
                    onClick={(e) => {
                    saveLogo(file)
                  }}>
                    Upload file
                  </Button>}
              </Container>
            : null}
          {(currentVendor?.sponsorship && !currentVendor?.sponsorship.level && currentVendor?.sponsorship.interested)
            ? <ListItem
                onClick={(e) => {
                if (currentVendor?.sponsorship && !currentVendor?.sponsorship.level) 
                  handleClick(e)
              }}
                complete={(currentVendor?.sponsorship && currentVendor?.sponsorship.level)}
                current={(currentVendor?.sponsorship && !currentVendor?.sponsorship.level)}>
                Choose sponsorship
              </ListItem>
            : null}
          <ListItem
            onClick={(e) => {
              handleClick(e)
          }}
            complete={(currentVendor?.booth?.primary.status > 0)}
            current={(currentVendor?.booth?.primary.status === 0)}>
            Select booth
          </ListItem>
          <ListItem
            current={currentVendor?.booth?.primary?.status === 1}
            complete={currentVendor?.booth?.primary?.status === 2}
          onClick={(e) => {
            changeState(states.FINALIZE)
          }}>
            Finalize registration
          </ListItem>
        </List>
      </TodoContainer>

    </Wrapper>
  )
}

export default Home