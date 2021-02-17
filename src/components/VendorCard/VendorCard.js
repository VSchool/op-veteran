import React from 'react'
import styled from 'styled-components'
import closedIcon from '../../assets/icons/card-closed-icon.svg'
import radioSelected from '../../assets/icons/radio-selected-icon.svg'
import radioUnselected from '../../assets/icons/radio-unselected-icon.svg'


const CardContainer = styled.div`
    box-sizing: border-box;
    position: relative;
    top: 0px;
    left: 0px;
    right: 0px;
    height: 330px;
    border: 1px dotted black;

    & > .heading-wrapper {
        box-sizing: border-box;
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        height: 48px;
        border: 1px dashed orange;

        & > h5 {
            box-sizing: border-box;
            margin: 0px;
            position: absolute;
            top: calc(50% - 24px/2);
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
            border: 1px dotted dodgerblue;
        }

        & > h4 {
            box-sizing: border-box;
            margin: 0px;
            position: absolute;
            top: calc(50% - 24px/2);
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
            border: 1px dotted dodgerblue;
        }
    
        & > img {
            box-sizing: border-box;
            position: absolute;
            top: calc(50% - 24px/2);
            right: 12px;
            width: 24px;
            border: 1px dotted dodgerblue;
    
        }    
    }

    & > .details-wrapper {
        box-sizing: border-box;
        position: absolute;
        top: 48px;
        left: 0px;
        right: 0px;
        height: 280px;
        border: 1px dashed lightgreen;

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
            border: 1px dotted dodgerblue;
        }

        & > .radio-vendor  {
            box-sizing: border-box;
            position: absolute;
            top: 20px;
            left: 140px;
            width: 16px;
            border: 1px dotted dodgerblue;
        }

        & > .radio-event  {
            box-sizing: border-box;
            position: absolute;
            top: 20px;
            left: 236px;
            width: 16px;
            border: 1px dotted dodgerblue;
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
            border: 1px dotted dodgerblue;
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
            border: 1px dotted dodgerblue;
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
            border: 1px dotted dodgerblue;
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
    }
`

export default function VendorCard() {
    return (
        <CardContainer>
            <div className={'heading-wrapper'}>
                <h5>{'Bunty Soap Company'}</h5>
                <h4>{'A01'}</h4>
                <img src={closedIcon} alt={'Click for more details.'} />
            </div>
            <div className={'details-wrapper'}>
                <h6>View details:</h6>
                <img className={'radio-vendor'} src={radioSelected} alt={'Radio button'} />
                <p className={'radio-label-vendor'}>Vendor</p>

                <img className={'radio-event'} src={radioUnselected} alt={'Radio button'} />
                <p className={'radio-label-event'}>Event</p>

                <p className={'details detail-1'}>{'Frank Galikanokus'}</p>
                <p className={'details detail-2'}>{'512-555-1212'}</p>
                <p className={'details detail-3'}>{'f.galikanokus@email.com'}</p>
                <p className={'details detail-4'}>{'1234 Hero Lane'}</p>
                <p className={'details detail-5'}>{'Suite #555'}</p>
                <p className={'details detail-6'}>{'Austin, TX'}</p>
                <p className={'details detail-7'}>{'78611'}</p>

            </div>
        </CardContainer>
    )
}
