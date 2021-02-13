import React from 'react'
import styled from 'styled-components'
import { setStyle } from './utils'

const StyledButton = styled.button`
    width: 100%;
    height: 40px;
    font-size: 20px;
    border: 2px solid #545454;
    background: ${props => props.background};
    color: ${props => props.color};
    outline: none;

    &:hover {
        border: 2px solid lightblue;
    }

    &:active {
        background: lightblue;
        color: #FFFFFF;
    }
`

export default function Button(props) {
    const { buttonText, buttonStyle, onClick } = props
    const { background, color } = setStyle(buttonStyle)

    return <StyledButton background={background} color={color} onClick={onClick}>{buttonText}</StyledButton>
}
