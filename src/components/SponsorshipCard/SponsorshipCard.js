import React from 'react'
import styled from 'styled-components'
import { Button } from '../../components/Button'
import ListItem from './ListItem'
import { sponsorshipLevels, perkList } from './utils'

const CardContainer = styled.div`
    box-sizing: border-box;
    padding: 16px 24px 16px 24px;
    min-width: 312px;
    height: 416px;
    margin: 0px 16px 0px 0px;
    background: #FFFFFF;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    // border: 1px dotted black;

    & > h4 {
        box-sizing: border-box;
        margin: 0px;
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
        margin: 0px 0px 16px 0px;
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
        margin-top: 0px;
        margin-bottom: 16px;
        width: 100%;
        height: 2px;
        background: #F4F4F4;
    }

    & > .divider2 {
        margin: 0px 0px 16px 0px;
        width: 100%;
        height: 2px;
        background: #F4F4F4;
    }

    & > .price {
        box-sizing: border-box;
        margin: 24px 0px 16px 0px;
        width: 100%;
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
        position: relative;
        left: calc(50% - 136px/2);
        margin-top: 0px;
        // border: 1px dotted red;
    }

    & > .items-container {
        box-sizing: border-box;
        width: 100%;
        height: 184px;
        margin: 0px 0px 0px 0px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        // border: 1px solid orange;

        & > .item {
            box-sizing: border-box;
            // border: 1px solid red;
        }
    }
`

export default function SponsorshipCard(props) {
    const { className } = props

    return (
        <CardContainer className={className}>
            <h4>{'Title'}</h4>
            <h5>Level sponsorship</h5>
            <div className={'divider'}></div>
            <div className={'items-container'}>
                <ListItem className={'item'} />
                <ListItem className={'item'} />
                <ListItem className={'item'} />
                <ListItem className={'item'} />
                <ListItem className={'item'} />
                <ListItem className={'item'} />
            </div>

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
