import React, { useState, useContext } from 'react'
import Modal from '../../components/FileUploadModal'
// import StatusMessage from '../../components/StatusMessage'
import { Link } from 'react-router-dom'
import { VendorContext } from '../../context/VendorProvider'
import { CanvasContext } from '../../context/CanvasProvider'
import {
  Container,
  FileUploader,
  FileUploaderLabel,
} from '../../Elements/basic'
//import { BoothContext } from '../../context/BoothProvider'
import { Button } from '../../components/Button'

const ToDoList = ({ List, Header2, ListItem }) => {
  const { currentVendor, storeFile } = useContext(VendorContext)
  const { currentBooth } = useContext(CanvasContext)

  // const { updateBooth, booths, setNeighbors, newBooths, resetBooth } =
  //   useContext(BoothContext)
  //const { updateBooth, booths} = useContext(BoothContext)
  const [file, setFile] = useState(null)
  const [showLogoUploader, setShowLogoUploader] = useState(false)

   const [modalOpen, setModalOpen] = useState(false)

   const fileSizeAlert = () => {
     //    // write or import modal, display after 'continue to checkout' is clicked'
     setModalOpen(true)
   }

  const saveLogo = (file) => {
    console.log("file inside saveLogo", file)
    const fileName = file.name
    const extension = fileName.split('.')[1]
    const newFileName = currentVendor?.organization.replace(/ /g, '')

    console.log(newFileName)
    
    
    storeFile(file, `logos/${newFileName}/${newFileName}.${extension}`)
  }

  const handleLogoUpload = (e) => {
    setShowLogoUploader(false)
    saveLogo(file)
  }

  const handleClick = (e) => {
    switch (e.target.innerText) {
      case 'Upload logo':
        setShowLogoUploader(!setShowLogoUploader)
        break
      default:
        break
    }
  }

  // const changeBooths = (e) => {
  //   console.log('changing booths')
  //   for (let booth of booths) {
  //     if (booth?.restriction !== 1 && booth?.restriction !== 2) {
  //       const updatedBooth = { ...booth }
  //       updatedBooth.restriction = 0
  //       updateBooth(updatedBooth, booth?.id)
  //       console.log(`updating booth ${booth?.id}`)
  //     }
  //   }
  // }

  return (
    <div>
      <List>
        <Header2>To do:</Header2>
        <ListItem complete={true}>Create account</ListItem>
        <Link to='/registration'>
          <ListItem
            complete={currentVendor?.organization}
            current={currentVendor === null}
          >
            Register vendor
          </ListItem>
        </Link>
        {/* {(currentVendor && !currentVendor?.logoFileName) || !currentVendor ? (
        <ListItem
          // complete={currentVendor && currentVendor?.logo}
          complete={currentVendor && currentVendor?.logoFileName}
          current={currentVendor && !currentVendor?.logoFileName}
          onClick={(e) => {
            if (currentVendor && !currentVendor?.logoFileName)
              setShowLogoUploader(!showLogoUploader)
          }}
        >
          Upload logo
        </ListItem>
      ) : null} */}

        <ListItem
          // complete={currentVendor && currentVendor?.logo}
          complete={currentVendor && currentVendor?.logoFileName}
          current={currentVendor && !currentVendor?.logoFileName}
          onClick={(e) => {
            if (currentVendor && !currentVendor?.logoFileName)
              setShowLogoUploader(!showLogoUploader)
          }}
        >
          Upload logo
        </ListItem>

        {currentVendor && !currentVendor?.logoFileName && showLogoUploader ? (
          <Container width='80%' height='auto'>
            <FileUploader
              onChange={(e) => {
                if (e.target.files[0].size > 1 * 1000 * 1024) {
                  fileSizeAlert()
                  // alert('Only logo files sized at 1 MB or under are allowed. Please try again.')
                  return false
                }
                setFile(e.target.files[0])
              }}
              type='file'
              Style='primary'
              id='upload-photo'
            />
            <FileUploaderLabel
              id='upload-photo-label'
              htmlFor='upload-photo' //*************NOTE: getting message that "for" is invalid DOM property-- did you mean htmlFor?
              type='label'
            >
              Choose File
            </FileUploaderLabel>
            {file === null ? null : (
              <div>
                <label style={{ color: 'white' }}>${file.name}</label>
                <Button
                  buttonText='Upload'
                  buttonStyle='upload'
                  onClick={(e) => {
                    // saveLogo(file)
                    handleLogoUpload()
                  }}
                >
                  Upload file
                </Button>
              </div>
            )}
          </Container>
        ) : null}

        {currentVendor?.sponsorship &&
        !currentVendor?.sponsorshipLevel &&
        currentVendor?.sponsorship.interested ? (
          <ListItem
            onClick={(e) => {
              if (
                currentVendor?.sponsorship &&
                !currentVendor?.sponsorshipLevel
              )
                handleClick(e)
            }}
            complete={
              currentVendor?.sponsorship && currentVendor?.sponsorshipLevel
            }
            current={
              currentVendor?.sponsorship && !currentVendor?.sponsorshipLevel
            }
          >
            Choose sponsorship
          </ListItem>
        ) : null}

        {!currentVendor ? (
          <Link to='/booth-selection' onClick={(e) => e.preventDefault()}>
            <ListItem>Select booth</ListItem>
          </Link>
        ) : (
          <Link to='/booth-selection'>
            <ListItem
              onClick={(e) => {
                handleClick(e)
              }}
              complete={currentVendor?.booth?.primary.status > 0}
              current={currentVendor?.booth?.primary.status === 0}
            >
              Select booth
            </ListItem>
          </Link>
        )}

        {!currentVendor || !currentBooth ? (
          <Link to='/finalize' onClick={(e) => e.preventDefault()}>
            <ListItem>Finalize registration</ListItem>
          </Link>
        ) : (
          <Link to='/finalize'>
            <ListItem
              current={currentVendor?.booth?.primary?.status === 1}
              complete={currentVendor?.booth?.primary?.status === 2}
            >
              Finalize registration
            </ListItem>
          </Link>
        )}
      </List>
      {modalOpen && (
        <Modal
          message={
            'Logo file uploads should be sized at 1 MB or less. Please try again.'
          }
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      )}
    </div>
  )
}

export default ToDoList
