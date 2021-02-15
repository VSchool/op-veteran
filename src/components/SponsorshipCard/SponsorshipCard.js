import React from 'react'
import styled from 'styled-components'
import { Button } from '../../components/Button'
import ListItem from './ListItem'
import { sponsorshipLevels, perkList } from './utils'

const CardContainer = styled.div`
    box-sizing: border-box;
    position: relative;
    width: 312px;
    min-height: 392px;
    background: #FFFFFF;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    // border: 1px dotted black;

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
        // border: 1px dotted dodgerblue;
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
        // border: 1px dotted dodgerblue;
    }

    & > .divider {
        position: absolute;
        top: 72px;
        left: 24px;
        right: 24px;
        height: 2px;
        background: #F4F4F4;
    }

    & > .divider2 {
        position: absolute;
        top: 336px;
        left: 24px;
        right: 24px;
        height: 2px;
        background: #F4F4F4;
    }

    & > .item {
        position: absolute;
        top: 88px;
        left: 24px;
        right: 24px;
        border: 1px dotted blue;
    }
    // DELETE THIS WHEN DONE
    & > .place1 {
        box-sizing: border-box;
        position: absolute;
        top: 88px;
        left: 24px;
        right: 24px;
        margin: 0px;
        height: 24px;
        // border: 1px dotted dodgerblue;
    }

    & > .place2{
        box-sizing: border-box;
        position: absolute;
        top: 120px;
        left: 24px;
        right: 24px;
        margin: 0px;
        height: 24px;
        // border: 1px dotted dodgerblue;
    }

    & > .place3{
        box-sizing: border-box;
        position: absolute;
        top: 152px;
        left: 24px;
        right: 24px;
        margin: 0px;
        height: 24px;
        // border: 1px dotted dodgerblue;
    }

    & > .place4{
        box-sizing: border-box;
        position: absolute;
        top: 184px;
        left: 24px;
        right: 24px;
        margin: 0px;
        height: 24px;
        // border: 1px dotted dodgerblue;
    }

    & > .place5{
        box-sizing: border-box;
        position: absolute;
        top: 216px;
        left: 24px;
        right: 24px;
        margin: 0px;
        height: 24px;
        // border: 1px dotted dodgerblue;
    }

    & > .place6{
        box-sizing: border-box;
        position: absolute;
        top: 248px;
        left: 24px;
        right: 24px;
        margin: 0px;
        height: 24px;
        // border: 1px dotted dodgerblue;
    }

    & > .price {
        box-sizing: border-box;
        position: absolute;
        top: 288px;
        left: 24px;
        right: 24px;
        margin: 0px;
        font-family: Open Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 28px;
        line-height: 32px;
        text-align: center;
        letter-spacing: 0.03em;
        color: #696969;
        // border: 1px dotted dodgerblue;
    }

    & > .sponsorship-button {
        position: absolute;
        top: 346px;
        left: calc(50% - 136px/2);
        // border: 1px dotted red;
    }
`

export default function SponsorshipCard() {

    for (const perk in perkList) {
        console.log()
    }

    console.log(perkList)


    return (
        <CardContainer>
            <h4>{'Title'}</h4>
            <h5>Level sponsorship</h5>
            <div className={'divider'}></div>
            <ListItem className={'item'} />
            {/* <p className={'place1'}>Perk desc</p>
            <p className={'place2'}>Perk desc</p>
            <p className={'place3'}>Perk desc</p>
            <p className={'place4'}>Perk desc</p>
            <p className={'place5'}>Perk desc</p>
            <p className={'place6'}>Perk desc</p> */}
            <h2 className={'price'}>{'$99,999'}</h2>
            <div className={'divider2'}></div>
            <Button className={'sponsorship-button'} buttonText={'Select this level'} buttonStyle={'text'} />
        </CardContainer>
    )
}
