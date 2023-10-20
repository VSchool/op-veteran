// import React, { useContext, useState, useEffect} from 'react'
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import Modal from '../../../components/FileUploadModal'
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
// import { IoLogoAndroid } from 'react-icons/io5'

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
    //setCurrentVendor,
    updateCurrentVendor,
    //saveLogo,
    //setLogoUrl,
    //logoUrl,
    // matchVendor,
    // createVendor,
    storeFile,
  } = useContext(VendorContext)
  const navigate = useNavigate()
  // const [showSponsorship, setShowSponsorship] = useState(false)
  // const { changeState, states } = props

  const [regErrors, setRegErrors] = useState({})

  const [isEdit, setIsEdit] = useState(false)
  const [isValidReg, setIsValidReg] = useState(false)
  const [logoFile, setLogoFile] = useState(null) //TEST w/ null as default instead of {}
  const [logoFileName, setLogoFileName] = useState('')
  const [logoUrl, setLogoUrl] = useState('')


 const [modalOpen, setModalOpen] = useState(false)

const fileSizeAlert = () => {
  //    // write or import modal, display after 'continue to checkout' is clicked'
     setModalOpen(true)
   }
  
// console.log("CURRENTVENDOR.ADDRESS", currentVendor.address)

  //better way to do these next 5 lines???
  const currentVendorAddressData = currentVendor !== null
    ? { ...currentVendor.address }
    : null
    
    console.log('currentVendorAddress Data', currentVendorAddressData)
  
  if (currentVendorAddressData !== null) {
    delete currentVendor.address
  } 


  console.log('currentVendor', currentVendor)
  // console.log("currentVendor.city", currentVendor.city)
  console.log('currentVendor from reg form', currentVendor)
  // console.log("currentVendor.address", currentVendor.address)

  const [input, setInput] = useState(
    currentVendor
      ? { ...currentVendor, ...currentVendorAddressData}
      
      // ? { ...currentVendor, ...currentVendorAddressData}
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
          // file: null,
          //logoUrl: '',
          // logoFileName: '',
          repEmail: user.email,
        }
  )

  console.log('input outside of anything', input)

  const handleValidation = () => {
    console.log('handleValidation called')
    console.log('input from inside handleValidation', input)
    // console.log('address from inside handleValidation', input.address)

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

    if (input.state === '') {
      errorsReg.state = 'State is required.'
    }

    if (input.zip.length < 4) {
      errorsReg.zip = 'Valid zip code required.'
    }

    console.log('errorsReg', errorsReg)

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

 
//moved saveLogo funciton  back here (from Vendor context)
    //  const saveLogo = async (file) => {
    //    console.log('file inside saveLogo', file)
    //    const fileName = file.name
    //    console.log('FILENAME', fileName) //this is UNDEFINED for some reason
    //    const extension = fileName.split('.')[1]
    //    const newFileName = currentVendor?.organization.replace(/ /g, '')

    //    console.log(newFileName)

  
    //    const url = storeFile(file, `logos/${newFileName}/${newFileName}.${extension}`)

    //    console.log("url from saveLogo", url)

    //    setLogoUrl(url)

    

    //           // setCurrentVendor((prev) => ({
    //           //   ...prev,
    //           //   logoFileName: fileName,
    //           //   logoUrl: url
    //           // }))


    //    // console.log("logoUrl from inside saveLogo", logoUrl)
    //  }


  //TEST DIFF USEEFFECT
  // useEffect(() => {
  //   console.log("useEffect regErrors", regErrors)
  //   if (Object.keys(regErrors).length === 0 && isValidReg) {
  //     // console.log("useEffect input", input)
  //   }
  // }, [regErrors, isValidReg])

  //USEEFFECT TO HANDLE FORM EDITS
  // useEffect(() => {
  //   handleValidation()
  //   console.log('useEffect/handleValidation called')
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []) //COMMENT: React Hook useEffect has a missing dependency: 'handleValidation'. Either include it or remove the dependency array  react-hooks/exhaustive-deps


  // useEffect(() => {
  //   if (currentVendor && currentVendor.repEmail ===user.email){
  //     const nextState = (currentVendor.sponsorship.interested && !currentVendor.sponsorship.finalized) ? states.SPONSOR : states.SELECT
  //     changeState(nextState)
  //   }
  // }, [currentVendor])

  //TRY THIS =======> TEST moving function inside of useEffect instead*****************


  const handleChange = (e) => {
    const { name, value } = e.target
    handleValidation()  //NOTE: this doesn't work if just try to add file on EDIT but don't make any other changes
    setInput((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  // const handleShowSponsorship = (e) => {
  //   e.preventDefault()
  //   setShowSponsorship(true)
  // }






  const handleChooseFile = (e) => {
    console.log('handleChooseFile called')
    console.log('handleChooseFile e.target.files[0]', e.target.files[0]) //check to see what's in there
    console.log(
      'handleChooseFile e.target.files[0].name',
      e.target.files[0].name
    )
       if (e.target.files[0].size > 1 * 1000 * 1024) {
        fileSizeAlert()
        // alert('Only logo files sized at 1 MB or under are allowed. Please try again.')
        return false
      }

      // do other operation
  
    console.log("SETLOGOFILE getting called")
    setLogoFile(e.target.files[0])
    setLogoFileName(e.target.files[0].name)
    console.log('logoFile', logoFile)
    console.log('logoFileName', logoFileName)
    handleValidation()

  }

  // const saveLogo = (logo) => {
  //   console.log("saveLogo inside of RegForm called")
  //   console.log("saveLogo file", logo)
  //   console.log("saveLogo file.name", logo.name)

  //   const fileName = logo.name
  //   const extension = fileName.split('.')[1]
  //   storeFile(logo,`logos/${input.organization}/${input.organization}.${extension}`)
  // }

  //storefile from vendor context w/ setInputs added


  //ORIGINAL CODE FOR saveLogo:
  // const saveLogo = (file) => {
  //   const fileName = file.name
  //   // console.log("fileName from saveLogo", filename)
  //   const extension = fileName.split('.')[1]
  //   storeFile(
  //     file,
  //     `logos/${input.organization}/${input.organization}.${extension}`
  //   )
  // }

//***********CURRENT SAVELOGO FROM VENDOR CONTEXT
    // const saveLogo = (file) => {
    //   console.log('file inside saveLogo', file)
    //   const fileName = file.name
    //   const extension = fileName.split('.')[1]
    //   const newFileName = currentVendor?.organization.replace(/ /g, '')

    //   console.log(newFileName)

    //   storeFile(file, `logos/${newFileName}/${newFileName}.${extension}`)
    // }

    // if (logoFile) {
    //   // console.log('if input.file', input.file)
    //   saveLogo(logoFile)
    // }

  // const logoUrl = JSON.parse(localStorage.getItem('logoUrl'))
  // console.log("LOGOURL outside of anything in REG form", logoUrl)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    console.log('isValidReg right after handleSubmit called', isValidReg)

    if(logoFile) {  
      console.log('LOGOFILE inside handleSubmit', logoFile)
      console.log('LOGOFILE.NAME', logoFile.name)
      // saveLogo(logoFile)
      const fileName = logoFile.name
      console.log('FILENAME', fileName) 
      const extension = fileName.split('.')[1]
      const newFileName = currentVendor?.organization.replace(/ /g, '')
      const url = storeFile(logoFile,`logos/${newFileName}/${newFileName}.${extension}`) 
      console.log('URL inside of handleSubmit/if(logoFile)', url)
 
      setLogoUrl(url)   //this not getting captured/set when submit -- coming back as empty ''
    }

    if (isEdit) {
      console.log('isEdit', isEdit)
      console.log(
        'currentVendor.logoUrl inside if(isEdit)handleSubmit',
        currentVendor.logoUrl
      )
      console.log("logoUrl for isEdit? inside handleSubmit", logoUrl)

      updateCurrentVendor({
        ...input,
        logoFileName: logoFile !== null ? logoFileName : currentVendor.logoFileName || null,
        logoUrl: logoFile !== null ? logoUrl : currentVendor.logoUrl || null,
      })
   
      
    } else {
      // setShowSponsorship(input.wantToSponsor)
      // createVendor({ ...input })

      console.log('INPUTS from handlesubmit: ', { ...input })
      await createCart({ ...input }) //kelly-this calls createVendor() currently

    }

   
    // if (input.file) {
    //   console.log('if input.file', input.file)
    //   await saveLogo(input.file)
    //   await setInput(prev=>({...prev, file: null}))
    // }

    if (input.wantToSponsor) {
      navigate('/sponsorship')
    } else {
      navigate('/booth-selection')
    }
  }

  const handleCheck = (e) => {
    console.log('handleCheck called -name', e.target.name)
    console.log('handleCheck called - checked', e.target.checked)

    const { name, checked } = e.target

    setInput((prev) => {
      return {
        ...prev,
        [name]: checked,
        sponsorshipLevel: !input.isSponsor.checked
          ? ''
          : input.sponsorshipLevel,
      }
    })
    handleValidation()
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
          type='tel'
          autocomplete='tel'
          labelText='Phone'
          name='phone'
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
            value={input.apt}
            onChange={handleChange}
          />

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
          />
          <Required>
            {regErrors.zip ? <span>{regErrors.zip} </span> : null}
          </Required>
        </Row>
        <Row columns='2'>
          {/* <Paragraph>Upload your organization's logo.</Paragraph> */}
          <Row columns='2'>
            <Paragraph>Upload your organization's logo.</Paragraph>
            <FileButton
              type='file'
              name='logoFile'
              onChange={handleChooseFile}
            />{' '}
            {/*changed name='logo' to name='file' */}
          </Row>
          <Row style={{ fontSize: '10px', fontWeight: 'bold', color: 'blue' }}>
            {currentVendor?.logoFileName
              ? `Last selected logo file: "${currentVendor.logoFileName}"`
              : null}
          </Row>
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
              '',
              'WLA - $250',
              'AMTRAK - $500',
              'Bradley - $1000',
              'Stryker - $2500',
              'Abrams - $5000',
              'Paladin - $10000',
            ]}
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
          disabled={!isValidReg} //disables submit button until registration is valid/isValidReg = true
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
         {modalOpen && (
          <Modal
            message={
              'Logo file uploads should be sized at 1 MB or less. Please try again.'
            }
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
          />
        )}
    </Container>
  )
}
