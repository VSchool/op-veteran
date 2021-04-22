import React, {useState} from 'react'
import styled from 'styled-components'
import StatusMessage from '../../../components/StatusMessage'
import { SponsorshipCard } from '../../../components/SponsorshipCard'
import {perkList, sponsorshipLevels} from '../../../components/SponsorshipCard/utils'
import { formatMs } from '@material-ui/core'

import {
    LandingContainer,
    Logo,
    Subheader,
    Header,
    HeaderWrapper,
    ButtonWrapper,
    FormWrapper,
    Wrapper,
    Row
  } from "../../../Elements/basic";
  
const SponsorshipContainer = styled.div`
  
    `
    // border: 2px solid blue;

    /* & > h1 {
        box-sizing: border-box;
        //margin: 0px;
        //position: absolute;
        //top: 104px;
        left: calc(50% - 328px/2);
        //width: 328px;
        max-height: 64px;
        font-family: 'Open Sans', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 27px;
        line-height: 32px;
        color: #545454;
        // border: 1px solid dodgerblue;
    }

    & > .subtitle {
        box-sizing: border-box;
        margin: 0px;
        //position: absolute;
        top: 176px;
        left: calc(50% - 328px/2);
        width: 328px;
        max-height: 40px;
        font-family: 'Open Sans', sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 20px;
        color: #545454;
        // border: 1px solid dodgerblue;
    } */

    /* & > .status-message {
        position: absolute;
        top: 16px;
        left: calc(50% - 328px/2);
    } */

    const CardsContainer = styled.div`
        box-sizing: border-box;
        height: 448px;
        padding:8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: scroll;
        // border: 2px dotted black;
        @media only screen and (min-width: 600px){
            flex-direction: row;
        }
`

export default function SponsorshipSelection(props) {
    const [data, setData] = useState(props.data)
    const {changeState, states} = props
    const sponsorships=sponsorshipLevels.map(level=>{
        return <SponsorshipCard key={level.name} changeState={changeState} states={states} name={level.name} perks={level.perks}/>
    })
    return (
        <LandingContainer>
            <StatusMessage className={'status-message'} message={'Thanks! We added that information to your profile. Let’s find the correct sponsorship level for your organization.'} />
            <HeaderWrapper>
                <Header>{'Sponsorship level selection'}.</Header>
                <Subheader className={'subtitle'}>Choose the right sponsorship package for your organization. </Subheader>
            </HeaderWrapper>
            <CardsContainer className={'cards-container'}>
                {sponsorships}
            </CardsContainer>
        </LandingContainer>
    )
}
