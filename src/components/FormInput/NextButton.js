import React from 'react'
import styled from 'styled-components'
import rightArrowIcon from '../../assets/icons/arrow-right-icon.svg'
const StyledButton = styled.button`
    box-sizing: border-box;
    width: 88px;
    height: 24px;
    font-family: Open Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    display: flex;
    align-items: center;
    text-align: right;
    color: #618572;
    background: #FFFFFF;
    border: none;
    outline: none;
    // border: 1px dotted blue;


    & > img {
        box-sizing: border-box;
        margin-left: 8px;
        width: 24px;
        // border: 1px dotted blue;
    }
`

export default function NextButton(props) {
    const { className } = props

    return <StyledButton className={className}>{'Next'}<img src={rightArrowIcon} alt={'Click to save answer.'} /></StyledButton>
}
