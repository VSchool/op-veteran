import React, {useContext, useState, useEffect} from 'react'
import styled from 'styled-components'
import { FormInput } from '../../../components/FormInput'
import ProgressBar from '../../../components/ProgressBar'
import StatusMessage from '../../../components/StatusMessage'
import {UserContext} from '../../../context/UserProvider'
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
  Row
} from "../../../Elements/basic";
import { CheckBox } from '../../../components/CheckBox'

    const RegistrationContainer = styled.div`
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        //align-items: center;
        //grid-template-rows: 1fr 1fr;
        height: 100%;
        width: 100%;
        padding: 0 24px 88px 24px; 
    `


export default function RegistrationForm(props) {
  const {user, updateUser} = useContext(UserContext)
    const [input, setInput] = useState({
      name: user.name === "" ? "" : user.name, 
      vendor: "",
      description: "",
      phone: "",
      street: "",
      city: "",
      apt: "",
      state: "",
      zip: "",
      vetOwned: true,
      nonprofit: false
    })
    const [page, setPage] = useState(0)

    const {changeState, states} = props
    
    const handleChange = (e)=>{
      const {name, value} = e.target
      
      setInput(prev=>{
        return {
          ...prev,
          [name]: value
        }
      })
    }
    const handleClick = (e)=>{
      e.preventDefault()
      if (page === 0) setPage(1)
      else {
        updateUser(input)
        changeState(states.SPONSOR)
      }
    }
    const handleCheck = (e)=>{
      const {name, checked} = e.target
      console.log(e.target)
        setInput(prev=>{
          return {
            ...prev,
            [name]: checked
          }
        })
    }

    return (
        <RegistrationContainer>
            <HeaderWrapper>
              <Subheader>Registration Form</Subheader>
              <Header>Point of Contact</Header>
            </HeaderWrapper>
              {page === 0 ? 
            <FormWrapper>
              <Input labelText="Name" name="name" type="text" value={input.name} onChange={handleChange}/>
              <Input labelText="Name of organization" name="vendor" type="text" value={input.vendor} onChange={handleChange}/>
              <TextArea labelText="Brief description of organization" name="description" rows="4" value={input.description} onChange={handleChange}></TextArea>
              <Input type="phone" labelText="Phone" name="phone" value={input.phone} onChange={handleChange}/>
              <Button buttonText="Continue" buttonStyle="primary" onClick={handleClick}/>
            </FormWrapper> :
            <FormWrapper>
              <Input labelText="Address" name="street" type="text" value={input.street} onChange={handleChange}/>
              <Input labelText="City" name="city" type="text" value={input.city} onChange={handleChange}/>
              <Input labelText="State" name="state" type="text" min="2" max="2" value={input.state} onChange={handleChange}/>
              <Row coloumms="3">
              <Input type="text" labelText="Apt or suite" name="apt" value={input.apt} onChange={handleChange}/>
              <Input type="text" labelText="State" name="state" value={input.state} onChange={handleChange}/>
              <Input type="text" labelText="Zipcode" name="zip" value={input.zip} onChange={handleChange}/>
              </Row>
              <CheckBox labelText="Organization is veteran owned" name="vetOwned" checked={input.vetOwned} onChange={handleCheck}/>
              <CheckBox labelText="Organization is a nonprofit" name="nonprofit" checked={input.nonprofit} onChange={handleCheck}/>
              <Button buttonText="Continue" buttonStyle="primary" onClick={handleClick}/>
            </FormWrapper>
            }
            <StatusMessage className={'status-message'} message={'Welcome to O.P. Veteran. Now, please continue the registration.'} />
        </RegistrationContainer>
    )
}
