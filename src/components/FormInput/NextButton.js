import React from 'react'
import styled from 'styled-components'
import rightArrowIcon from '../../assets/icons/arrow-right-icon.svg'
const StyledButton = styled.button`
    box-sizing: border-box;
    width: 128px;
    height: 32px;
    padding: auto;
    font-family: Open Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #618572;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    position: absolute;
    bottom: 0px;
    right: 0px;
    // border: 1px dotted blue;

    & > img {
        box-sizing: border-box;
        margin-left: 8px;
        width: 24px;
        // border: 1px dotted blue;
    }
    &:active{
        border: 2px solid #70C297;
        border-radius: 4px; 
    }
`

export default function NextButton(props) {
    const {className, callback} = props
    return <StyledButton onClick={callback} className={className}>{'Next'}<img src={rightArrowIcon} alt={'Click to save answer.'} /></StyledButton>
}
