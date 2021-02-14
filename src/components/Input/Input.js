import React from 'react'
import styled from 'styled-components'
import warningIcon from '../../assets/icons/warning-icon.svg'

const InputContainer = styled.div`
    width: 328px;
    border: 1px solid black;

    & > .label {
        margin: 0px;
        font-family: Open Sans;
        font-style: normal;
        font-weight: 300;
        font-size: 12px;
        line-height: 16px;
        display: flex;
        align-items: center;
        letter-spacing: 0.02em;
        color: #545454;
        border: 1px dotted blue;
    }

    & > .helper-text {
        margin: 0px;
        font-family: Open Sans;
        font-style: normal;
        font-weight: 300;
        font-size: 12px;
        line-height: 16px;
        display: flex;
        align-items: center;
        letter-spacing: 0.02em;
        color: #EA7C7C;        
        border: 1px dotted blue;
    }

    & > input {
        // background: blue;
    }

    & > img {
        border: 1px dotted blue;
    }
`

export default function Input() {
    return (
        <InputContainer>
            <p className={'label'}>Input</p>
            <input />
            <img src={warningIcon} alt={'Invalid text entered'} />
            <p className={'helper-text'}>{'Helper text'}</p>
        </InputContainer>
    )
}
