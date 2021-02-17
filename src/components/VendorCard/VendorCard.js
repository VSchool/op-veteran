import React from 'react'
import styled from 'styled-components'
import closedIcon from '../../assets/icons/card-closed-icon.svg'

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
        border: 1px dashed lightgreen;

        & > p {
            margin: 0px;
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
            {/* <div className={'details-wrapper'}>
                <p>Details section</p>
            </div> */}
        </CardContainer>
    )
}
