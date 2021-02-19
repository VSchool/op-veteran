import React from 'react';
import styled from 'styled-components'

const StyledInput = styled.input`
    box-sizing: border-box;
    width: 328px;
    height: 40px;
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 24px;
    display: flex;
    align-items: center;
    letter-spacing: 0.01em;
    color: #545454;
    border: 1px solid #545454;
    border-radius: 2px;

    &:focus {
        outline: 2px solid #799C8A;
        // background: blue;
    }

    &::placeholder {
        font-family: Open Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 15px;
        line-height: 24px;
        display: flex;
        align-items: center;
        letter-spacing: 0.01em;
        color: #545454;
        opacity: 50%;
    }
`

export default function AdminSearch() {
    return <StyledInput placeholder={'placeholder'}></StyledInput>
}