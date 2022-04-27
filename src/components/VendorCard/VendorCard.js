import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from '../Button'
import { setOpenState, setStyling, toggleDetailsView, fakeData } from './utils'
import closedIcon from '../../assets/icons/card-closed-icon.svg'
import radioSelected from '../../assets/icons/radio-selected-icon.svg'
import radioUnselected from '../../assets/icons/radio-unselected-icon.svg'

const CardContainer = styled.div`
  position: relative;
  top: 0px;
  left: 0px;
  right: 0px;
  height: ${(props) => props.height};
  background: #ffffff;
  z-index: 0;
  // border: 1px dotted black;

  &:hover {
    z-index: 1;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.14), 0px 4px 5px rgba(0, 0, 0, 0.12),
      0px 1px 10px rgba(0, 0, 0, 0.2);
  }

  & > .heading-wrapper {
    box-sizing: border-box;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    height: 48px;
    background: #ffffff;
    // border: 1px dashed orange;

    & > h5 {
      box-sizing: border-box;
      margin: 0px;
      position: absolute;
      top: calc(50% - 24px / 2);
      left: 16px;
      right: 88px;
      height: 24px;
      font-family: Open Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 24px;
      display: flex;
      align-items: center;
      color: #545454;
      // border: 1px dotted dodgerblue;
    }

    & > h4 {
      box-sizing: border-box;
      margin: 0px;
      position: absolute;
      top: calc(50% - 24px / 2);
      right: 40px;
      width: 40px;
      height: 24px;
      font-family: Open Sans;
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
      text-align: center;
      color: #545454;
      // border: 1px dotted dodgerblue;
    }

    & > img {
      box-sizing: border-box;
      position: absolute;
      top: calc(50% - 24px / 2);
      right: 12px;
      width: 24px;
      // border: 1px dotted dodgerblue;
    }
  }

  & > .details-wrapper {
    box-sizing: border-box;
    position: absolute;
    top: 48px;
    left: 0px;
    right: 0px;
    height: 280px;
    // border: 1px dashed lightgreen;

    & > .divider-1 {
      position: absolute;
      top: 0px;
      left: 16px;
      right: 16px;
      height: 2px;
      background: #f4f4f4;
    }

    & > .divider-2 {
      position: absolute;
      top: 232px;
      left: 16px;
      right: 16px;
      height: 2px;
      background: #f4f4f4;
    }

    & > h6 {
      box-sizing: border-box;
      position: absolute;
      top: 16px;
      left: 16px;
      margin: 0px;
      font-family: Open Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 24px;
      display: flex;
      align-items: center;
      color: #545454;
      // border: 1px dotted dodgerblue;
    }

    & > .radio-vendor {
      box-sizing: border-box;
      position: absolute;
      top: 20px;
      left: 140px;
      width: 16px;
      // border: 1px dotted dodgerblue;
    }

    & > .radio-event {
      box-sizing: border-box;
      position: absolute;
      top: 20px;
      left: 236px;
      width: 16px;
      // border: 1px dotted dodgerblue;
    }

    & > .radio-label-vendor {
      box-sizing: border-box;
      position: absolute;
      top: 20px;
      left: 160px;
      margin: 0px;
      font-family: Open Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 15px;
      line-height: 16px;
      display: flex;
      align-items: center;
      color: #545454;
      // border: 1px dotted dodgerblue;
    }

    & > .radio-label-event {
      box-sizing: border-box;
      position: absolute;
      top: 20px;
      left: 256px;
      margin: 0px;
      font-family: Open Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 15px;
      line-height: 16px;
      display: flex;
      align-items: center;
      color: #545454;
      // border: 1px dotted dodgerblue;
    }

    & > .details {
      box-sizing: border-box;
      margin: 0px;
      height: 16px;
      font-family: Open Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 15px;
      line-height: 16px;
      display: flex;
      align-items: center;
      color: #545454;
      // border: 1px dotted dodgerblue;
    }

    & > .detail-1 {
      position: absolute;
      top: 56px;
      left: 16px;
      right: 16px;
    }

    & > .detail-2 {
      position: absolute;
      top: 80px;
      left: 16px;
      right: 16px;
    }

    & > .detail-3 {
      position: absolute;
      top: 104px;
      left: 16px;
      right: 16px;
    }

    & > .detail-4 {
      position: absolute;
      top: 128px;
      left: 16px;
      right: 16px;
    }

    & > .detail-5 {
      position: absolute;
      top: 152px;
      left: 16px;
      right: 16px;
    }

    & > .detail-6 {
      position: absolute;
      top: 176px;
      left: 16px;
      right: 16px;
    }

    & > .detail-7 {
      position: absolute;
      top: 200px;
      left: 16px;
      right: 16px;
    }

    & > .text-button {
      position: absolute;
      top: 236px;
      left: calc(50% - 200px / 2);
      width: 200px;
      // border: 1px dotted dodgerblue;
    }
  }
`

export default function VendorCard() {
  const [isOpen, setIsOpen] = useState(false)
  const [detailsView, setDetailsView] = useState('vendor')
  const { visibility, containerHeight } = setStyling(isOpen)

  return (
    <CardContainer height={containerHeight}>
      <div
        className={'heading-wrapper'}
        onClick={() => setOpenState(isOpen, setIsOpen)}
      >
        <h5>{fakeData.company}</h5>
        <h4>{fakeData.booth}</h4>
        <img src={closedIcon} alt={'Click for more details.'} />
      </div>
      <div className={'details-wrapper'} style={{ visibility: visibility }}>
        <div className={'divider-1'}>{''}</div>
        <h6>View details:</h6>
        <img
          className={'radio-vendor'}
          src={radioSelected}
          alt={'Radio button'}
          onClick={() => toggleDetailsView(detailsView, setDetailsView)}
        />
        <p className={'radio-label-vendor'}>Vendor</p>
        <img
          className={'radio-event'}
          src={radioUnselected}
          alt={'Radio button'}
        />
        <p className={'radio-label-event'}>Event</p>
        <p className={'details detail-1'}>{fakeData.name}</p>
        <p className={'details detail-2'}>{fakeData.phone}</p>
        <p className={'details detail-3'}>{fakeData.email}</p>
        <p className={'details detail-4'}>{fakeData.address}</p>
        <p className={'details detail-5'}>{fakeData.suite}</p>
        <p className={'details detail-6'}>{fakeData.cityState}</p>
        <p className={'details detail-7'}>{fakeData.zipcode}</p>
        <div className={'divider-2'}>{''}</div>
        <Button
          className={'text-button'}
          buttonText={'Change booth number'}
          buttonStyle={'text'}
        />
      </div>
    </CardContainer>
  )
}
