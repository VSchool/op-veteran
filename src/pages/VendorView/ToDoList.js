import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { VendorContext } from '../../context/VendorProvider'
import { Container, FileUploader } from '../../Elements/basic'
import { BoothContext } from '../../context/BoothProvider'
import { Button } from '../../components/Button'

const ToDoList = ({ List, Header2, ListItem }) => {
  const { currentVendor, storeFile } = useContext(VendorContext)
  const { updateBooth, booths, setNeighbors, newBooths, resetBooth } =
    useContext(BoothContext)
  const [file, setFile] = useState(null)
  const [showLogoUploader, setShowLogoUploader] = useState(false)

  const saveLogo = (file) => {
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
  console.log(currentVendor)
  const finalize = () => {
    console.log('Finalize registration')
    // changeState(states.FINALIZE);
  }
  const changeBooths = (e) => {
    console.log('changing booths')
    for (let booth of booths) {
      if (booth?.restriction !== 1 && booth?.restriction !== 2) {
        const updatedBooth = { ...booth }
        updatedBooth.restriction = 0
        updateBooth(updatedBooth, booth?.id)
        console.log(`updating booth ${booth?.id}`)
      }
    }
  }

  return (
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
      {currentVendor && !currentVendor?.logo ? (
        <ListItem
          complete={currentVendor && currentVendor?.logo}
          current={currentVendor && !currentVendor?.logo}
          onClick={(e) => {
            if (currentVendor && !currentVendor?.logo)
              setShowLogoUploader(!showLogoUploader)
          }}
        >
          Upload logo
        </ListItem>
      ) : null}
      {currentVendor && !currentVendor?.logo && showLogoUploader ? (
        <Container width='80%'>
          <FileUploader
            onChange={(e) => {
              setFile(e.target.files[0])
            }}
            type='file'
          />
          {file === null ? null : (
            <Button
              buttonText='Upload'
              buttonStyle='primary'
              onClick={(e) => {
                saveLogo(file)
              }}
            >
              Upload file
            </Button>
          )}
        </Container>
      ) : null}
      {currentVendor?.sponsorship &&
      !currentVendor?.sponsorship.level &&
      currentVendor?.sponsorship.interested ? (
        <ListItem
          onClick={(e) => {
            if (currentVendor?.sponsorship && !currentVendor?.sponsorship.level)
              handleClick(e)
          }}
          complete={
            currentVendor?.sponsorship && currentVendor?.sponsorship.level
          }
          current={
            currentVendor?.sponsorship && !currentVendor?.sponsorship.level
          }
        >
          Choose sponsorship
        </ListItem>
      ) : null}
      <Link to='/booth'>
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
      <Link to='/finalize'>
        <ListItem
          current={currentVendor?.booth?.primary?.status === 1}
          complete={currentVendor?.booth?.primary?.status === 2}
        >
          Finalize registration
        </ListItem>
      </Link>
    </List>
  )
}

export default ToDoList