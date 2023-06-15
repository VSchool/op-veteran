import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
// import { FormInput } from '../../../components/FormInput'
// import ProgressBar from '../../../components/ProgressBar'
import StatusMessage from '../../../components/StatusMessage'
import { UserContext } from '../../../context/UserProvider'
import { VendorContext } from '../../../context/VendorProvider'
import { CartContext } from '../../../context/CartProvider'
// import { BoothContext } from '../../../context/BoothProvider'
import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'
import { TextArea } from '../../../components/TextArea'
import Selection from '../../../components/Selection'
import {
  // LandingContainer,
  // Logo,
  Subheader,
  Header,
  HeaderWrapper,
  // ButtonWrapper,
  FormWrapper,
  // Wrapper,
  Row,
  Container,
  PageContainer,
} from '../../../Elements/basic'
import { CheckBox } from '../../../components/CheckBox'
import { StateDropdown } from '../../../components/StateDropdown'
import { useNavigate } from 'react-router-dom'

const Paragraph = styled.p`
  padding: 10px 5px;
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
  & > button {
    margin: 0px;
  }
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
  height: 250px;
  background-color: white;
  padding: 20px;
  border-radius: 0.5rem;
`

const Required = styled.span`
  display: flex;
  justify-content: center;
  color: red;
  font-size: smaller;
`

export default function RegistrationForm(props) {
  // const { user, updateUser } = useContext(UserContext)
  const { user } = useContext(UserContext)
  // const { seedBooths } = useContext(BoothContext)
  const {
    createCart, // This function needs to be called to create a shopify cartId. Use it in the handleSubmit function here or at the begining of the createVendor function in the VendorProvider.  This is currently untested
  } = useContext(CartContext)
  const {
    currentVendor,
    updateCurrentVendor,
    // matchVendor,
    // createVendor,
    storeFile,
  } = useContext(VendorContext)
  const navigate = useNavigate()
  // const [showSponsorship, setShowSponsorship] = useState(false)
  // const { changeState, states } = props

  const currentVendorAddressData = { ...currentVendor.address }
  console.log('currentVendorAddress Data', currentVendorAddressData)

  delete currentVendor.address
  console.log('currentVendor', currentVendor)

  const [input, setInput] = useState(
    currentVendor
      ? { ...currentVendor, ...currentVendorAddressData }
      : {
          firstName: '',
          lastName: '',
          organization: '',
          description: '',
          phone: '',
          apt: '',
          street: '',
          city: '',
          state: '',
          zip: '',
          isNonprofit: false,
          isGovernmental: false,
          isVeteranOwned: false,
          isSponsor: false,
          sponsorshipLevel: '',
          wantToSponsor: false,
          file: null,
          repEmail: user.email,
        }
  )

  console.log('input outside of anything', input)

  const [regErrors, setRegErrors] = useState({})

  const [isEdit, setIsEdit] = useState(false)

  const [isValidReg, setIsValidReg] = useState(false)
  console.log('isValidReg', isValidReg)

  //USEEFFECT TO HANDLE FORM EDITS
  useEffect(() => {
    handleValidation(input)
  }, [input]) //COMMENT: React Hook useEffect has a missing dependency: 'handleValidation'. Either include it or remove the dependency array  react-hooks/exhaustive-deps

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

  // const handleShowSponsorship = (e) => {
  //   e.preventDefault()
  //   setShowSponsorship(true)
  // }

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

  const handleValidation = () => {
    console.log('handleValidation called')
    console.log('input from inside handleValidation', input)
    console.log('address from inside handleValidation', input.address)

    setIsValidReg(false)
	  
    let errorsReg = {}

    if (input.firstName.length < 2) {
      errorsReg.firstName = 'First name is a required field.'
    }

    if (input.lastName.length < 2) {
      errorsReg.lastName = 'Last name is a required field.'
    }

    if (input.phone.length < 10) {
      errorsReg.phone = 'Phone is a required field.'
    }

    if (input.street.length === 0) {
      errorsReg.street = 'Street address is a required field.'
    }

    if (input.city.length === 0) {
      errorsReg.city = 'City is a required field.'
    }

    if (input.zip.length < 5) {
      errorsReg.zip = 'Valid zip code required.'
    }

    if (input.state === "") {
      errorsReg.state = 'State is required.'
    }

    console.log('errors', errorsReg)
	  
    setRegErrors(errorsReg)
	  
    console.log('Object.keys(regErrors).length', Object.keys(regErrors).length)

     if (Object.keys(errorsReg).length > 0) {
      setIsValidReg(false)
      console.log('NOT VALID')
    }

    if (Object.keys(errorsReg).length === 0) {
      setIsValidReg(true)
      console.log('VALID')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log('isValidReg right after handleSubmit called', isValidReg)

    if (isEdit) {
      console.log('isEdit', isEdit)
      updateCurrentVendor(input)
    } else {
      // setShowSponsorship(input.wantToSponsor)
      // createVendor({ ...input })

      console.log('from handlesubmit: ', { ...input })
      createCart({ ...input }) //kelly-this calls createVendor() currently
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
    console.log('handleCheck called -name', e.target.name)
    console.log('handleCheck called - checked', e.target.checked)
    console.log('input.isSponsor from handleCheck', input.isSponsor)
    console.log(
      'currentVendor.isSponsor from handleCehck',
      currentVendor.isSponsor
    )

    const { name, checked } = e.target
    setInput((prev) => {
      return {
        ...prev,
        [name]: checked,
        sponsorshipLevel:
          input.isSponsor || currentVendor.isSponsor === false
            ? null
            : input.sponsorshipLevel,
      }
    })
  }

  const handleIsEditing = () => {
    setIsEdit(!isEdit)
  }

  if (currentVendor && !isEdit) {
    return (
      <PageContainer>
        <Card>
          <div>
            <h1 style={{ marginBottom: '5px', color: '#16a085' }}>
              You have already registered.
            </h1>
            <p style={{ color: '#2c2c2c' }}>
              If you would like to edit your information click the button below
            </p>
          </div>
          <ButtonGroup>
            <Button
              buttonText='Edit Registration'
              buttonStyle='primary'
              onClick={handleIsEditing}
            />
            <Button
              buttonText='Return to Booth Selection'
              buttonStyle='secondary'
              onClick={() => navigate('/booth-selection')}
            />
          </ButtonGroup>
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
          defaultValue={currentVendor.firstName}
          value={input.firstName}
          onChange={handleChange}
        />
        <Required>
          {regErrors.firstName ? <span>{regErrors.firstName}</span> : null}
        </Required>

        <Input
          autocomplete='last'
          labelText='Last name'
          name='lastName'
          type='text'
          defaultValue={currentVendor.lastName}
          value={input.lastName}
          onChange={handleChange}
        />
        <Required>
          {regErrors.lastName ? <span>{regErrors.lastName}</span> : null}
        </Required>

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
          defaultValue={currentVendor.organization}
          value={input.organization}
          onChange={handleChange}
        />
        <TextArea
          labelText='Brief description of organization'
          name='description'
          rows='4'
          defaultValue={currentVendor.description}
          value={input.description}
          onChange={handleChange}
        ></TextArea>

        <Input
          type='tel'
          autocomplete='tel'
          labelText='Phone'
          name='phone'
          defaultValue={currentVendor.phone}
          value={input.phone}
          onChange={handleChange}
        />
        <Required>
          {regErrors.phone ? <span>{regErrors.phone}</span> : null}
        </Required>

        <Input
          labelText='Address'
          autocomplete='street-address'
          name='street'
          type='text'
          defaultValue={currentVendor.street}
          value={input.street}
          onChange={handleChange}
        />
        <Required>
          {regErrors.street ? <span>{regErrors.street}</span> : null}
        </Required>

        <Input
          labelText='City'
          name='city'
          autocomplete='address-level1'
          type='text'
          defaultValue={currentVendor.city}
          value={input.city}
          onChange={handleChange}
        />
        <Required>
          {regErrors.city ? <span>{regErrors.city}</span> : null}
        </Required>

        <Row columns='3'>
          <Input
            type='text'
            labelText='Apt or suite'
            name='apt'
            defaultValue={currentVendor.apt}
            value={input.apt}
            onChange={handleChange}
          />
  
          <StateDropdown
            defaultValue={currentVendor.state}
            value={input.state}
            state={input.state}
            handleChange={handleChange}
          />
          <Required>
            {regErrors.state ? <span>{regErrors.state}</span> : null}
          </Required>
          <Input
            type='text'
            labelText='Zipcode'
            name='zip'
            auto-complete='postal-code'
            defaultValue={currentVendor.zip}
            value={input.zip}
            onChange={handleChange}
          />
          <Required>
            {regErrors.zip ? <span>{regErrors.zip} </span> : null}
          </Required>
        </Row>
        <Row columns='2'>
          <Paragraph>Upload your organization's logo.</Paragraph>
          <FileButton type='file' name='logo' onChange={handleChooseFile} />
        </Row>
        <CheckBox
          labelText='Organization is veteran owned'
          name='isVeteranOwned' //changed from "vetOwned"
          checked={input.isVeteranOwned} //changed from input.vetOwned
          onChange={handleCheck}
        />
        <CheckBox
          labelText='Organization is a nonprofit'
          name='isNonprofit' //changed from "nonprofit"
          checked={input.isNonprofit} //changed from input.nonprofit
          onChange={handleCheck}
        />
        <CheckBox
          labelText='Organization is a governmental organization'
          name='isGovernmental' //changed from "governmental"
          checked={input.isGovernmental} //changed from input.governmental
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
              '--Select--',
              'WLA - $250',
              'AMTRAK - $500',
              'Bradley - $1000',
              'Stryker - $2500',
              'Abrams - $5000',
              'Paladin - $10000',
            ]}
            defaultValue={currentVendor.sponsorshipLevel}
            value={input.sponsorshipLevel} //Select Options go away, but this value doesn't change back to empty in database
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
	  disabled={!isValidReg}  //disables submit button until registration is valid/isValidReg = true
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

      {/* {showSponsorship ? <></> : null} */}
    </Container>
  )
}
