import React from 'react'
import styled from 'styled-components'
import NextButton from './NextButton'
import warningIcon from '../../assets/icons/warning-icon.svg'

const InputContainer = styled.div`
    box-sizing: border-box;
    position: relative;
    width: 328px;
    height: 120px;
    // border: 1px dashed black;

    & > .label {
        box-sizing: border-box;
        margin: 0px;
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        font-family: Open Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        color: #545454;
        // border: 1px dotted blue;
    }

    & > .helper-text {
        box-sizing: border-box;
        margin: 0px;
        position: absolute;
        top: 72px;
        left: 0px;
        right: 0px;
        font-family: Open Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 15px;
        line-height: 16px;
        color: #EA7C7C;
        visibility: hidden;
        border: 1px dotted blue;
    }

    & > .wrapper {
        position: absolute;
        top: 28px;
        left: 0px;
        right: 0px;
        height: 32px;
        border-bottom: 1px solid #545454;

        & > input {
            box-sizing: border-box;
            position: absolute;
            left: 0px;
            width: 280px;
            height: 32px;
            font-family: Open Sans;
            font-style: normal;
            font-weight: 300;
            font-size: 28px;
            line-height: 32px;
            color: #403926;
            border: none;
            outline: none;
        }

        & > img {
            box-sizing: border-box;
            position: absolute;
            top: calc(50% - 24px/2);
            right: 0px;
            width: height: 24px;
            visibility: hidden;
            // border: 1px dotted blue;
        }
    }

    & > .next-button {
        position: absolute;
        bottom: 0px;
        right: 0px;
    }
`

export default function FormInput(props) {
    const { label, className } = props
    return (
        <InputContainer className={className}>
            <p className={'label'}>{label}</p>
            <div className={'wrapper'}>
                <input />
                <img src={warningIcon} alt={'Invalid text entered.'} />
            </div>
            <p className={'helper-text'}>{'Helper text'}</p>
            <NextButton className={'next-button'} />
        </InputContainer>
    )
}
