import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { VendorContext } from '../../context/VendorProvider'
import { UserContext } from '../../context/UserProvider'
import { CanvasContext } from '../../context/CanvasProvider'
import Finalize from '../../pages/VendorView/Finalize'
import firestore from '../../database'
import opveteranLogo from '../../assets/icons/OPVeteranLogo.png'

const Wrapper = styled.div`
  margin: auto;
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12),
    0px 4px 5px rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  border: 1px solid #e6e6e6;
  color: #ffffff;
  background: #1a3300;
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: space-between;
  justify-content: space-between;
  position: relative;
  z-index: 999;
  & div {
    height: auto;
  }

  & > div {
    & > div {
      & button {
        width: auto;
      }
      & > div {
        & > div:first-child {
          & > div:first-child {
            display: none;
          }
        }
      }
    }
  }
`
const Paragraph = styled.p``
const Logo = styled.img`
  width: 40px;
  height: 40px;
`

const Profile = (props) => {
  const { currentVendor, updateCurrentVendor } = useContext(VendorContext)
  const { user, updateUser } = useContext(UserContext)
  const { currentBooth } = useContext(CanvasContext)

  const [info, setInfo] = useState({
    organization:
      currentVendor !== null ? currentVendor.organization : 'Not registered',
    description:
      currentVendor !== null ? currentVendor.description : 'Not registered',
    logo: currentVendor !== null ? currentVendor.logo : opveteranLogo,
    primaryBooth:
      currentVendor !== null ? currentVendor.primaryBooth : 'Not registered',
    secondaryBooth:
      currentVendor !== null ? currentVendor.secondaryBooth : 'Not registered',
    address: currentVendor !== null ? currentVendor.address : 'Not registered',
    rep: currentVendor !== null ? currentVendor.rep : 'Not registered',
    repEmail:
      currentVendor !== null ? currentVendor.repEmail : 'Not registered',
    sponsorship:
      currentVendor !== null ? currentVendor.sponsorship : 'Not registered',
  })
  const boothRef = firestore.collection('Booths')

  /* Delete this later, just for testing*/
  /* for testing purposes because you can add more than 2 booths at a time */
  // const resetBooths = () => {
  //     boothRef.get().then(function(querySnapshot) {
  //         querySnapshot.forEach(function(doc) {
  //             doc.ref.update({
  //                 status: 0,
  //                 vendor: null
  //             });
  //         });
  //     }).catch(err => console.log(err))
  // }
  return (
    <Wrapper>
      <div>
        <Logo src={info.logo} />
        <Paragraph>
          Current Booth: {currentBooth ? currentBooth : 'None Selected'}
        </Paragraph>
        <Paragraph>Name: {info.rep}</Paragraph>
        <Paragraph>Organization: {info.organization}</Paragraph>
        <Paragraph>
          Sponsorship:{' '}
          {info.sponsorshipLevel ? info.sponsorshipLevel : 'None Selected'}
        </Paragraph>
      </div>
      <div>{/* <Finalize /> */}</div>
      {/* for testing purposes because you can add more than 2 booths at a time */}
      {/* <button onClick={resetBooths}>Reset Booths</button> */}
    </Wrapper>
  )
}

export default Profile
