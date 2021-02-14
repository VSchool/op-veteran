import React from 'react'
import styled from 'styled-components'
import { Button } from '../../components/Button'

const CardContainer = styled.div`
    box-sizing: border-box;
    position: relative;
    width: 312px;
    min-height: 416px;
    border: 1px dotted black;

    & > h4 {
        box-sizing: border-box;
        margin: 0px;
        position: absolute;
        top: 16px;
        left: 24px;
        right: 24px;
        height: 24px;
        font-family: Open Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 24px;
        display: flex;
        align-items: center;
        letter-spacing: 0.03em;
        text-transform: uppercase;
        color: #545454;
        border: 1px dotted dodgerblue;
    }

    & > h5 {
        box-sizing: border-box;
        margin: 0px;
        position: absolute;
        top: 40px;
        left: 24px;
        right: 24px;
        height: 16px;
        font-family: Helvetica Neue;
        font-style: normal;
        font-weight: 300;
        font-size: 12px;
        line-height: 16px;
        display: flex;
        align-items: center;
        letter-spacing: 0.015em;
        color: #545454;
        border: 1px dotted dodgerblue;
    }

    & > .divider {
        height: 2px;
        background: #f4f4f4;
    }
    // DELETE THIS WHEN DONE
    & > .place {
        margin: 0px;
        height: 24px;
        border: 1px dotted dodgerblue;
    }

    & > .price {
        margin: 0px;
    }
`

export default function SponsorshipCard() {
    return (
        <CardContainer>
            <h4>{'Title'}</h4>
            <h5>Level sponsorship</h5>
            <div className={'divider'}></div>
            {/* <p className={'place'}>Perk desc</p> */}
            {/* <p className={'place'}>Perk desc</p> */}
            {/* <p className={'place'}>Perk desc</p> */}
            {/* <p className={'place'}>Perk desc</p> */}
            {/* <p className={'place'}>Perk desc</p> */}
            {/* <p className={'place'}>Perk desc</p> */}
            {/* <h2 className={'price'}>{'$99,999'}</h2> */}
            {/* <div className={'divider'}></div> */}
            {/* <Button buttonText={'Select this level'} buttonStyle={'text'} /> */}
        </CardContainer>
    )
}
