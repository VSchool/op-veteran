import React, { useContext } from 'react'
import styled from 'styled-components'
import { Button } from '../Button'
import { CanvasContext } from '../../context/CanvasProvider'
import { BoothContext } from '../../context/BoothProvider'
import { VendorContext } from '../../context/VendorProvider'
import { IoCloseOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

const CardContainer = styled.div`
  width: 311px;
  height: fit-content;
  margin: auto;
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12),
    0px 4px 5px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: space-around;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const CloseBtn = styled.div`
  & > .closeBtn {
    position: absolute;
    top: 0;
    right: 25px;
    padding: 10px;
    font-size: 36px;
    margin-left: 50px;
    cursor: pointer;
    color: #818181;
  }

  & > .closeBtn:hover {
    color: #f1f1f1;
  }
`
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
`
const Header = styled.h1`
  font-size: 17px;
  line-height: 24px;
  color: #2980b9;
  font-family: 'Roboto Mono', monospace;
`
const Subheader = styled.h3`
  font-style: normal;
  font-weight: normal;
  font-size: 1rem;
  line-height: 16px;
  color: #545454;
`
const Breadcrumbs = styled.h2`
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  color: #545454;
`
const Logo = styled.img`
  height: 60px;
  width: auto;
`
const Paragraph = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 20px;
  color: #545454;
`
const HeaderWrapper = styled.div`
  padding: 20px 0;
`
const Hr = styled.hr`
  margin: auto;
  margin-top: ${(props) => (props.top ? props.top : '8px')};
  margin-bottom: ${(props) => (props.bottom ? props.botton : '8px')};
  background-color: #f4f4f4;
  width: 90%;
`
const BoothCard = (props) => {
  const navigate = useNavigate()
  const { data, handleSelectBooth, handleClose } = props
  const { id, vendor, section, hasElectricity, row, restriction } = data
  const { currentVendor, createVendor } = useContext(VendorContext)
  const handlePrimaryClick = (e) => {
    e.preventDefault()
    if (isAllowed()) {
      // idea: instead of calling handleSelectBooth,
      // update currentBoothSelection and show that in
      // cart, then have the option for the user to
      // add the two booths to their cart
      handleSelectBooth(id)
    } else {
      navigate('/sponsorship')
    }
    // don't send user to vendors page
    // else {
    //   const updatedVendor = {
    //     ...currentVendor,
    //   };
    //   updatedVendor.sponsorship.interested = true;
    //   updateCurrentVendor(updatedVendor);
    //   changeState(states.SPONSOR);
    // }
  }

  const isAllowed = () => {
    const tier1 = ['Paladin', 'Stryker', 'Abrams', 'Bradley']
    const tier2 = ['Paladin', 'Stryker']
   
    if (vendor) return false
    if (restriction === 0) {
      return true
    } else if (restriction === 1) {
      return tier1.some(tier => currentVendor.sponsorship.level.includes(tier))
    } else if (restriction === 2) {
      return tier2.some(tier => currentVendor.sponsorship.level.includes(tier))
    }
  }
  return (
    <CardContainer>
      <HeaderWrapper>
        <CloseBtn>
          <span className='closeBtn' alt='close' onClick={handleClose}>
            <IoCloseOutline />
          </span>
        </CloseBtn>
        <Header>{`Booth ${id}`}</Header>
        <Paragraph>Info & availability</Paragraph>
      </HeaderWrapper>
      <HeaderWrapper>
        <Subheader>
          {`Section: ${section} | Row:`}{' '}
          <span style={{ fontFamily: 'Roboto Mono' }}>{row}</span>
        </Subheader>
        {hasElectricity ? <Paragraph>Powered</Paragraph> : null}
      </HeaderWrapper>
      <HeaderWrapper>
        {vendor && vendor !== null ? (
          <>
            <Subheader>{vendor.organization}</Subheader>
            <Paragraph> {vendor.description} </Paragraph>
          </>
        ) : (
          <>
            <Subheader>Open</Subheader>
            <Paragraph>
              {' '}
              This boothspace is available.
              {isAllowed()
                ? null
                : `This section is reserved for ${
                    restriction === 2
                      ? 'Paladin and Abrams '
                      : 'Stryker and Bradley '
                  } level sponsors.`}{' '}
            </Paragraph>
          </>
        )}
      </HeaderWrapper>
      <ButtonWrapper>
        {vendor && vendor === null ? (
          <Button
            buttonStyle='primary'
            buttonText='Close'
            onClick={handleClose}
          />
        ) : (
          <>
            {' '}
            <Button
              buttonStyle='primary'
              buttonText={isAllowed() ? 'Select booth' : 'View sponsorships'}
              onClick={handlePrimaryClick}
            />{' '}
            <Button
              buttonStyle='secondary'
              buttonText='Cancel'
              onClick={handleClose}
            />{' '}
          </>
        )}
      </ButtonWrapper>
    </CardContainer>
  )
}
export default BoothCard
