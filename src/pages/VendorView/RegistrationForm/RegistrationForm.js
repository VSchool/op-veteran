import React, { useContext, useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { FormInput } from '../../../components/FormInput'
import ProgressBar from '../../../components/ProgressBar'
import StatusMessage from '../../../components/StatusMessage'
import { UserContext } from '../../../context/UserProvider'
import { VendorContext } from '../../../context/VendorProvider'
import { CartContext } from '../../../context/CartProvider'
import { BoothContext } from '../../../context/BoothProvider'
import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'
import { TextArea } from '../../../components/TextArea'
import Selection from '../../../components/Selection'
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
  Container,
  PageContainer,
} from '../../../Elements/basic'
import { CheckBox } from '../../../components/CheckBox'
import { useNavigate } from 'react-router-dom'
const Paragraph = styled.p`
  padding: 10px 5px;
`
const FileButton = styled.input`
  /* width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1; */
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 500px;
  height: 200px;
  background-color: white;
  padding: 20px;
  border-radius: 0.5rem;
`

export default function RegistrationForm(props) {
  const { user, updateUser } = useContext(UserContext)
  const { seedBooths } = useContext(BoothContext)
  const {
    createCart, // This function needs to be called to create a shopify cartId. Use it in the handleSubmit function here or at the begining of the createVendor function in the VendorProvider.  This is currently untested
  } = useContext(CartContext)
  const {
    currentVendor,
    updateCurrentVendor,
    matchVendor,
    createVendor,
    storeFile,
  } = useContext(VendorContext)
  const navigate = useNavigate()
  const [showSponsorship, setShowSponsorship] = useState(false)
  const { changeState, states } = props
  const [input, setInput] = useState(
    currentVendor
      ? { ...currentVendor, ...currentVendor.address }
      : {
          firstName: '',
          lastName: '',
          organization: '',
          description: '',
          phone: '',
          apt: '',
          street: '',
          apt: '',
          city: '',
          zip: '',
          state: '',
          nonprofit: false,
          governmental: false,
          vetOwned: false,
          isSponsor: false,
          sponsorshipLevel: '',
          wantToSponsor: false,
          file: null,
          repEmail: user.email,
        }
  )
  const [isEdit, setIsEdit] = useState(false)

  // useEffect(() => {
  //   if (currentVendor && currentVendor.repEmail ===user.email){
  //     const nextState = (currentVendor.sponsorship.interested && !currentVendor.sponsorship.finalized) ? states.SPONSOR : states.SELECT
  //     changeState(nextState)
  //   }
  // }, [currentVendor])

  const handleChange = (e) => {
    const { name, value } = e.target
    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }
  const handleShowSponsorship = (e) => {
    e.preventDefault()
    setShowSponsorship(true)
  }

  const handleChooseFile = (e) => {
    setInput((prev) => ({ ...prev, file: e.target.files[0] }))
  }

  const saveLogo = (file) => {
    const fileName = file.name
    const extension = fileName.split('.')[1]
    storeFile(
      file,
      `logos/${input.organization}/${input.organization}.${extension}`
    )
  }

  // async but no await?
  const handleSubmit = (e) => {
    e.preventDefault()

    if (isEdit) {
      updateCurrentVendor(input)
    } else {
      setShowSponsorship(input.wantToSponsor)
      // createVendor({...input})

      console.log('from handlesubmit: ', { ...input })
      createCart({ ...input })
    }
    if (input.file) {
      saveLogo(input.file)
    }
    if (input.wantToSponsor) {
      navigate('/sponsorship')
    } else {
      navigate('/booth-selection')
    }
  }

  const handleCheck = (e) => {
    const { name, checked } = e.target
    setInput((prev) => {
      return {
        ...prev,
        [name]: checked,
      }
    })
  }

  const handleIsEditing = () => {
    setIsEdit(true)
  }

  if (currentVendor && !isEdit) {
    return (
      <PageContainer>
        <Card>
          <h1>You have already registered.</h1>
          <p>
            If you would like to edit your information click the button below:
          </p>
          <Button
            buttonText='Edit Registration'
            buttonStyle='primary'
            onClick={handleIsEditing}
          />
        </Card>
      </PageContainer>
    )
  }

  return (
    <Container height='fit-content'>
      <HeaderWrapper>
        <Subheader>{isEdit && 'Edit '}Registration Form</Subheader>
        <Header>Point of Contact</Header>
      </HeaderWrapper>
      <FormWrapper>
        <Input
          autocomplete='first'
          labelText='First name'
          name='firstName'
          type='text'
          value={input.firstName}
          onChange={handleChange}
        />
        <Input
          autocomplete='last'
          labelText='Last name'
          name='lastName'
          type='text'
          value={input.lastName}
          onChange={handleChange}
        />

        <Input
          labelText={
            currentVendor
              ? 'Name of Organization (cannot change)'
              : 'Name of organization'
          }
          autocomplete='organization'
          name='organization'
          type='text'
          disabled={currentVendor}
          value={input.organization}
          onChange={handleChange}
        />
        <TextArea
          labelText='Brief description of organization'
          name='description'
          rows='4'
          value={input.description}
          onChange={handleChange}
        ></TextArea>
        <Input
          type='phone'
          autocomplete='tel'
          labelText='Phone'
          name='phone'
          value={input.phone}
          onChange={handleChange}
        />
        <Input
          labelText='Address'
          autocomplete='street-address'
          name='street'
          type='text'
          value={input.street}
          onChange={handleChange}
        />
        <Input
          labelText='City'
          name='city'
          autocomplete='address-level1'
          type='text'
          value={input.city}
          onChange={handleChange}
        />
        <Row coloumms='3'>
          <Input
            type='text'
            labelText='Apt or suite'
            name='apt'
            value={input.apt}
            onChange={handleChange}
          />
          <Input
            type='text'
            labelText='State'
            name='state'
            autocomplete='address-level2'
            value={input.state}
            onChange={handleChange}
          />
          <Input
            type='text'
            labelText='Zipcode'
            name='zip'
            auto-complete='postal-code'
            value={input.zip}
            onChange={handleChange}
          />
        </Row>
        <Row columns='2'>
          <Paragraph>Upload your organization's logo.</Paragraph>
          <FileButton type='file' name='logo' onChange={handleChooseFile} />
        </Row>
        <CheckBox
          labelText='Organization is veteran owned'
          name='vetOwned'
          checked={input.vetOwned}
          onChange={handleCheck}
        />
        <CheckBox
          labelText='Organization is a nonprofit'
          name='nonprofit'
          checked={input.nonprofit}
          onChange={handleCheck}
        />
        <CheckBox
          labelText='Organization is a governmental organization'
          name='governmental'
          checked={input.governmental}
          onChange={handleCheck}
        />
        <CheckBox
          labelText='Organization is a current sponsor of O.P. Vetfest'
          name='isSponsor'
          checked={input.isSponsor}
          onChange={handleCheck}
        />
        {input.isSponsor ? (
          <Selection
            name='sponsorshipLevel'
            options={[
              'WLA - $250',
              'AMTRAK - $500',
              'Bradley - $1000',
              'Stryker - $2500',
              'Abrams - $5000',
              'Paladin - $10000',
            ]}
            value={input.sponsorshipLevel}
            handleChange={handleChange}
          />
        ) : null}
        {input.isSponsor ? null : (
          <CheckBox
            labelText='Interested in becoming a sponsor of O.P. Vetfest'
            name='wantToSponsor'
            checked={input.wantToSponsor}
            onChange={handleCheck}
          />
        )}
        {/* <Button buttonText="See sponsorship levels and benifits" buttonStyle="text" onClick={handleShowSponsorship}/> */}
        <Button
          buttonText='Continue'
          buttonStyle='primary'
          onClick={handleSubmit}
        />
      </FormWrapper>
      {!currentVendor && (
        <StatusMessage
          className={'status-message'}
          message={
            'Welcome to O.P. Veteran. Now, please continue the registration.'
          }
        />
      )}

      {showSponsorship ? <></> : null}
    </Container>
  )
}
