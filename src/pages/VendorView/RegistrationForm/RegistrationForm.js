import React, {useContext, useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import {FormInput} from '../../../components/FormInput'
import ProgressBar from '../../../components/ProgressBar'
import StatusMessage from '../../../components/StatusMessage'
import {UserContext} from '../../../context/UserProvider'
import {VendorContext} from '../../../context/VendorProvider'
import {Input} from '../../../components/Input'
import {Button} from '../../../components/Button'
import {TextArea} from '../../../components/TextArea'
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
import {CheckBox} from '../../../components/CheckBox'

export default function RegistrationForm(props) {
  const {user, updateUser} = useContext(UserContext)
  const {currentVendor, matchVendor, createVendor} = useContext(VendorContext)
  const [showSponsorship, setShowSponsorship] = useState(false)
  useEffect(() => {
    matchVendor()
  }, [])
  useEffect(() => {
    if (currentVendor && currentVendor.repEmail ===user.email){
      const nextState = (currentVendor.sponsorship.interested && !currentVendor.sponsorship.finalized) ? states.SPONSOR : states.SELECT
      changeState(nextState)
    }
  }, [currentVendor])
  const [input, setInput] = useState({
    name: user.name ? user.name : "",
    organization: "",
    description: "",
    phone: "",
    apt: "",
    street: "",
    apt: "",
    city: "",
    zip: "",
    state: "",
    nonprofit: false,
    vetOwned: false,
    wantToSponsor: false,
    needElectricity: false,
    wantDoubleSpace: false
  })
 
  const {changeState, states} = props
  const handleChange = (e) => {
    const {name, value} = e.target
    setInput(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  const handleShowSponsorship = (e)=>{
    e.preventDefault()
    setShowSponsorship(true)
  }

  const handleClick = (e) => {
    e.preventDefault()
    const currentVendorData = {
      address: {
        street: input.street,
        apt: input.apt,
        city: input.city,
        state: input.state,
        zip: input.zip
      },
      rep: input.name,
      repEmail: user.email,
      description: input.description,
      organization: input.organization,
      booth: {
        primary: {
          needElectricity: input.needElectricity,
          name: null,
          finalized: false
        },
        secondary: {
          requested: input.wantDoubleSpace,
          name: null, 
          finalized: false
        }
      },
      sponsorship: {
        interested: input.wantToSponsor,
        level: null, 
        finalized: false
      },
      logo: null, 
      
    }
    createVendor(currentVendorData)
    if (input.wantToSponsor) {
    changeState(states.SPONSOR)
    }
    else{
      changeState(states.SELECT)
    }
  }
  const handleCheck = (e) => {
    const {name, checked} = e.target
    console.log(e.target)
    setInput(prev => {
      return {
        ...prev,
        [name]: checked
      }
    })
  }

  return (
    <Container>
      <HeaderWrapper>
        <Subheader>Registration Form</Subheader>
        <Header>Point of Contact</Header>
      </HeaderWrapper>
      <FormWrapper>
        <Input
          autocomplete="name"
          labelText="Name"
          name="name"
          type="text"
          value={input.name}
          onChange={handleChange}/>
        <Input
          labelText="Name of organization"
          autocomplete="organization"
          name="organization"
          type="text"
          value={input.organization}
          onChange={handleChange}/>
        <TextArea
          labelText="Brief description of organization"
          name="description"
          rows="4"
          value={input.description}
          onChange={handleChange}></TextArea>
        <Input
          type="phone"
          autocomplete="tel"
          labelText="Phone"
          name="phone"
          value={input.phone}
          onChange={handleChange}/>
        <Input
          labelText="Address"
          autocomplete="street-address"
          name="street"
          type="text"
          value={input.street}
          onChange={handleChange}/>
        <Input
          labelText="City"
          name="city"
          autocomplete="address-level1"
          type="text"
          value={input.city}
          onChange={handleChange}/>
        <Row coloumms="3">
          <Input
            type="text"
            labelText="Apt or suite"
            name="apt"
            value={input.apt}
            onChange={handleChange}/>
          <Input
            type="text"
            labelText="State"
            name="state"
            autocomplete="address-level2"
            value={input.state}
            onChange={handleChange}/>
          <Input
            type="text"
            labelText="Zipcode"
            name="zip"
            auto-complete="postal-code"
            value={input.zip}
            onChange={handleChange}/>
        </Row>
        <CheckBox
          labelText="Organization is veteran owned"
          name="vetOwned"
          checked={input.vetOwned}
          onChange={handleCheck}/>
        <CheckBox
          labelText="Organization is a nonprofit"
          name="nonprofit"
          checked={input.nonprofit}
          onChange={handleCheck}/>
          <CheckBox
          labelText="Will need electricity at booth (Additional fee of $50)"
          name="needElectricity"
          checked={input.needElectricity}
          onChange={handleCheck}/>
          <CheckBox
          labelText="Prefer a double booth 10' x 20'(Additional fee of $50)"
          name="wantDoubleSpace"
          checked={input.wantDoubleSpace}
          onChange={handleCheck}/>
          <CheckBox
          labelText="Interested in becoming a sponsor of O.P. Vetfest"
          name="wantToSponsor"
          checked={input.wantToSponsor}
          onChange={handleCheck}/>
           <Button buttonText="See sponsorship levels and benifits" buttonStyle="text" onClick={handleShowSponsorship}/>
        <Button buttonText="Continue" buttonStyle="primary" onClick={handleClick}/>
      </FormWrapper>
      <StatusMessage
        className={'status-message'}
        message={'Welcome to O.P. Veteran. Now, please continue the registration.'}/>
        {showSponsorship ? <></> : null}
    </Container>
  )
}
