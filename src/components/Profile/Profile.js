import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { VendorContext } from '../../context/VendorProvider'
import { UserContext } from '../../context/UserProvider'
import { CanvasContext } from '../../context/CanvasProvider'
import Finalize from '../../pages/VendorView/Finalize'
import firestore from '../../database'
import opveteranLogo from '../../assets/icons/OPVeteranLogo.png'

const Wrapper = styled.div`
  min-width: 311px;
  height: fit-content;
  margin: auto;
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12),
    0px 4px 5px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: space-between;
  position: fixed;
  top: 70px;
  right: 20px;
  z-index: 999;
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
      <Logo src={info.logo} />
      <Paragraph>
        Current Booth: {currentBooth ? currentBooth : 'None Selected'}
      </Paragraph>
      <Paragraph>Name: {info.rep}</Paragraph>
      <Paragraph>Organization: {info.organization}</Paragraph>
      <Paragraph>
        Sponsorship:{' '}
        {info.sponsorship.level ? info.sponsorship.level : 'None Selected'}
      </Paragraph>
      <Finalize />
      {/* for testing purposes because you can add more than 2 booths at a time */}
      {/* <button onClick={resetBooths}>Reset Booths</button> */}
    </Wrapper>
  )
}

export default Profile
