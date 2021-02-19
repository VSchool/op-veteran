import React from 'react'
import styled from 'styled-components'
import StatusMessage from '../../components/StatusMessage'
import { SponsorshipCard } from '../../components/SponsorshipCard'

const SponsorshipContainer = styled.div`
    box-sizing: border-box;
    position: absolute;
    top: 88px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    // border: 2px solid blue;

    & > h1 {
        box-sizing: border-box;
        margin: 0px;
        position: absolute;
        top: 104px;
        left: calc(50% - 328px/2);
        width: 328px;
        max-height: 64px;
        font-family: Open Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 32px;
        line-height: 32px;
        color: #545454;
        // border: 1px solid dodgerblue;
    }

    & > .subtitle {
        box-sizing: border-box;
        margin: 0px;
        position: absolute;
        top: 176px;
        left: calc(50% - 328px/2);
        width: 328px;
        max-height: 40px;
        font-family: Open Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 20px;
        color: #545454;
        // border: 1px solid dodgerblue;
    }

    & > .status-message {
        position: absolute;
        top: 16px;
        left: calc(50% - 328px/2);
    }

    & > .cards-container {
        box-sizing: border-box;
        position: absolute;
        top: 240px;
        left: 0px;
        right: 0px;
        height: 448px;
        padding: 0px 0px 0px 8px;
        display: flex;
        align-items: center;
        overflow: scroll;
        // border: 2px dotted black;
    }
`

export default function SponsorshipSelection() {
    return (
        <SponsorshipContainer>
            <h1>{'Sponsorship level selection'}.</h1>
            <p className={'subtitle'}>Choose the right sponsorship package for your organization.</p>
            <StatusMessage className={'status-message'} message={'Thanks! We added that information to your profile. Let’s find the correct sponsorship level for your organization.'} />
            <div className={'cards-container'}>
                <SponsorshipCard />
                <SponsorshipCard />
                <SponsorshipCard />
                <SponsorshipCard />
                <SponsorshipCard />
                <SponsorshipCard />
            </div>
        </SponsorshipContainer>
    )
}
