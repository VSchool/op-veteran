import React from 'react'
import styled from 'styled-components'
import { setStyle } from './utils'

const StyledButton = styled.button`
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    /* identical to box height, or 125% */
    justify-content: center;
    display: flex;
    align-items: center;
    text-align: center;

/* Primary/White */

    box-sizing: border-box;
    
    height: 40px;
    line-height: 24px;
    letter-spacing: 0.25px;
    margin: 8px;
    color: ${props => props.color};
    background: ${props => props.background};
    box-shadow: ${props => props.boxShadow};
    // box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12), 0px 3px 5px rgba(0, 0, 0, 0.2);
    // border: 2px solid #618572;
    border: ${props => props.border};
    border-radius: 2px;
    outline: none;
    &:hover{
        background-color: ${props=>props.hoverBackground};
    }
    &:active{
        background: ${props=>props.activeBackground};
        border: ${props=>props.activeBorder};
    }
`

export default function Button(props) {
    const { buttonText, buttonStyle, ...buttonProps } = props
    const { background, border, fontColor, hoverBackground, activeBackground, activeBorder } = setStyle(buttonStyle)

    return (
        <StyledButton
            // className={className}
            background={background} 
            border={border} 
            color={fontColor}
            hoverBackground={hoverBackground}
            activeBackground={activeBackground}
            activeBorder={activeBorder}
				{...buttonProps}
        >
            {buttonText}
        </StyledButton>
    )
}
