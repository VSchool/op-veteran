import React, {useState} from 'react'
import styled from 'styled-components'
import warningIcon from '../../assets/icons/warning-icon.svg'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClear, faEye, faEyeSlash, faExclamationTriangle} from '@fortawesome/free-solid-svg-icons'
import {Label} from '../../Elements/basic'

const InputWrapper = styled.div`
    padding: 0;
    box-sizing: border-box;
    display: grid;
    grid-template-rows: 24px 36px;
    margin: 12px 8px;
    
`

const TextInput = styled.input`
    margin: 0;
    padding: 0 12px;
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    background: #FFFFFF;
    border: 2px solid #696969;
    border-radius: 4px;
    outline: none;
    width: 100%;
    &:focus{
        border: 1px solid #4E92F9;
    }
`


const Input = (props)=>{
    const {labelText, name, onChange, type, value, autocomplete} = props
    return (
        <InputWrapper>
        <Label>{labelText}</Label>
            <TextInput autocomplete={autocomplete} name={name} onChange={onChange} value={value} type={type}/>
        
        </InputWrapper>
    )
}
export default Input