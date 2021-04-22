import React from 'react'
import styled from 'styled-components'
import checkmarkIcon from '../../assets/icons/card-checkmark-icon.svg'
import uncheckmarkIcon from '../../assets/icons/card-uncheckmark-icon.svg'

const ItemContainer = styled.div`
    box-sizing: border-box;
    position: relative;
    // width: 100%;
    height: 24px;
    padding: 20px;
    // border: 1px dotted black;

    & > p {
        box-sizing: border-box;
        position: absolute;
        top: 0px;
        left: 0px;
        right: 52px;
        height: 24px;
        margin: 0px;
        font-family: OpenSans;
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 20px;
        display: flex;
        align-items: center;
        letter-spacing: 0.015em;
        color: #545454;
        // border: 1px dotted dodgerblue;
    }

    & > img {
        box-sizing: border-box;
        position: absolute;
        top: 0px;
        right: 0px;
        height: 24px;
        // width: 16px;
        // border: 1px dotted dodgerblue;
    }
`

export default function ListItem(props) {
    const { className, wording, valid } = props

    return (
        <ItemContainer style={{opacity: valid ? 1: 0.4}}>
            <p>{wording}</p>
            { valid ? 
            <img src={checkmarkIcon} alt={'Checkmark icon'} /> : <img src={uncheckmarkIcon} alt={"Uncheckmark icon"}/>}
        </ItemContainer>
    )
}
