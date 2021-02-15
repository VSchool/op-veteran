import React from 'react'
import styled from 'styled-components'
import checkmarkIcon from '../../assets/icons/card-checkmark-icon.svg'

const ItemContainer = styled.div`
    box-sizing: border-box;
    position: relative;
    height: 24px;
    // border: 1px dotted black;

    & > p {
        box-sizing: border-box;
        position: absolute;
        top: 0px;
        left: 0px;
        right: 52px;
        height: 24px;
        margin: 0px;
        font-family: Helvetica Neue;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 24px;
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
    const { className } = props

    return (
        <ItemContainer className={className}>
            <p>{'Recognition on website'}</p>
            <img src={checkmarkIcon} alt={'Checkmark icon'} />
        </ItemContainer>
    )
}
