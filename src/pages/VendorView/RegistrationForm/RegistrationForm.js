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
      ? { ...currentVendor, ...currentVendor.address } //kelly - theory: showing register inputs again b/c did not have address inputs??
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

  // const [regErrors, setRegErrors] = useState({
  //   firstName: '',
  //   lastName: '',
  //   phone: '',
  //   street: '',
  //   city: '',
  //   zip: '',
  //   state: '',
  // })

  const [regErrors, setRegErrors] = useState({})

  // const [isValidReg, setIsValidReg] = useState(true)

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

  //validation seems to work but problems with how to check that regErrors are present/cleared b/4 to go to booth selection***
  //useRef??
  // const handleValidation = () => {
  //   if (input.firstName.length < 2) {
  //     setRegErrors((prevState) => ({
  //       ...prevState,
  //       lastName: 'Last name is a required field.',
  //     }))

  //   if (input.lastName.length < 2) {
  //     setRegErrors((prevState) => ({
  //       ...prevState,
  //       lastName: 'Last name is a required field.',
  //     }))
  //   }

  //   if (input.phone.length === 0) {
  //     //other format validation here?
  //     setRegErrors((prevState) => ({
  //       ...prevState,
  //       phone: 'Phone is a required field.',
  //     }))
  //   }

  //   if (input.street.length === 0) {
  //     setRegErrors((prevState) => ({
  //       ...prevState,
  //       street: 'Street address is a required field.',
  //     }))
  //   }

  //   if (input.city.length === 0) {
  //     setRegErrors((prevState) => ({
  //       ...prevState,
  //       city: 'City is a required field.',
  //     }))
  //   }

  //   if (input.zip.length < 5) {
  //     setRegErrors((prevState) => ({
  //       ...prevState,
  //       zip: 'Valid zip code required.',
  //     }))
  //   }

  //   if (!input.state) {
  //     setRegErrors((prevState) => ({
  //       ...prevState,
  //       state: 'State is required.',
  //     }))
  //   }

  // }

  //Best way to set regErrors back to empty values for each property here??
  // const clearRegErrors = () => {
  //   setRegErrors({
  //     firstName: '',
  //     lastName: '',
  //     phone: '',
  //     street: '',
  //     city: '',
  //     zip: '',
  //     state: '',
  //   })
  // }

  //TRY WITH USING isValidReg with useState--not working properly
  // const handleValidation = () => {
  //   let errorsReg = {}

  //   if (input.firstName.length < 2) {
  //     errorsReg.firstName = 'First name is a required field.'
  //   }

  //   if (input.lastName.length < 2) {
  //     errorsReg.lastName = 'Last name is a required field.'
  //   }

  //   if (input.phone.length < 10) {
  //     errorsReg.phone = 'Phone is a required field.'
  //   }

  //   if (input.street.length === 0) {
  //     errorsReg.street = 'Street address is a required field.'
  //   }

  //   if (input.city.length === 0) {
  //     errorsReg.city = 'City is a required field.'
  //   }

  //   if (input.zip.length < 5) {
  //     errorsReg.zip = 'Valid zip code required.'
  //   }

  //   if (!input.state) {
  //     errorsReg.state = 'State is required.'
  //   }

  //   console.log('errors', errorsReg)
  //   console.log(
  //     'Object.values(errorsReg).length',
  //     Object.values(errorsReg).length
  //   )

  //   if (Object.values(errorsReg).length > 0) {
  //     setIsValidReg(false)
  //     setRegErrors(errorsReg)
  //   }

  //   console.log('isValidReg', isValidReg) //this does not console.log as changed, even though errors
  //   console.log('regErrors', regErrors)

  //   return errorsReg
  // }

  //ALTERNATE FORM VALIDATION--this works (without employing useState for isValidReg)
  const handleValidation = () => {
    let isValidReg = true
    let errorsReg = {}
    if (input.firstName.length < 2) {
      errorsReg.firstName = 'First name is a required field.'
      isValidReg = false
    }

    if (input.lastName.length < 2) {
      errorsReg.lastName = 'Last name is a required field.'
      isValidReg = false
    }

    if (input.phone.length < 10) {
      errorsReg.phone = 'Phone is a required field.'
      isValidReg = false
    }

    if (input.street.length === 0) {
      errorsReg.street = 'Street address is a required field.'
      isValidReg = false
    }

    if (input.city.length === 0) {
      errorsReg.city = 'City is a required field.'
      isValidReg = false
    }

    if (input.zip.length < 5) {
      errorsReg.zip = 'Valid zip code required.'
      isValidReg = false
    }

    if (!input.state) {
      errorsReg.state = 'State is required.'
      isValidReg = false
    }
    console.log('isValidReg', isValidReg)
    console.log('errors', errorsReg)
    setRegErrors(errorsReg)
    return isValidReg
  }

  // async but no await?
  const handleSubmit = (e) => {
    e.preventDefault()
    // clearRegErrors()

    const isValidReg = handleValidation()
    console.log(
      'isValidReg after handleValidation inside handleSubmit',
      isValidReg
    )

    // const regErrorArr = Object.values(regErrors)
    // console.log('regErrorArr from handleValidation', regErrorArr)
    // if (Object.values(regErrors).length !== 0) {
    // Object.values(object).every(x => x === null || x === '')

    if (isValidReg === false) {
      //not giving correct answer b/c seems like value not keeping up with state
      //how validate that object has associated values???  have to loop through?
      //need different way to check here
      console.log('hey, there are some registration errors here!')
      console.log('regErrors Object', regErrors) //NOTE:  state appears to be updating, but this console.log does not seem to work (except on second button click)
    }

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
    } else if (isValidReg === true) {
      navigate('/booth-selection')
    }

    // else {
    //   navigate('/booth-selection')
    // }

    // if (isErrorReg === false) {
    //   navigate('/booth-selection')
    // }

    //comment here to push
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
          value={input.firstName}
          onChange={handleChange}
          required //does not work
        />
        <Required>
          {regErrors.firstName ? <span>{regErrors.firstName}</span> : null}
        </Required>

        <Input
          autocomplete='last'
          labelText='Last name'
          name='lastName'
          type='text'
          value={input.lastName}
          onChange={handleChange}
          required //not working
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
          required //not working
        />
        <Required>
          {regErrors.phone ? <span>{regErrors.phone}</span> : null}
        </Required>

        <Input
          labelText='Address'
          autocomplete='street-address'
          name='street'
          type='text'
          value={input.street}
          onChange={handleChange}
          required //not working
        />
        <Required>
          {regErrors.street ? <span>{regErrors.street}</span> : null}
        </Required>

        <Input
          labelText='City'
          name='city'
          autocomplete='address-level1'
          type='text'
          value={input.city}
          onChange={handleChange}
          required //not working
        />
        <Required>
          {regErrors.city ? <span>{regErrors.city}</span> : null}
        </Required>

        <Row columns='3'>
          <Input
            type='text'
            labelText='Apt or suite'
            name='apt'
            value={input.apt}
            onChange={handleChange}
          />
          {/* <Input
            type='text'
            labelText='State'
            name='state'
            autocomplete='address-level2'
            value={input.state}
            onChange={handleChange}
          /> */}

          <StateDropdown
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
            value={input.zip}
            onChange={handleChange}
            required //not working
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
