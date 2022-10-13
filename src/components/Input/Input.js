import React, { useState } from 'react'
import styled from 'styled-components'
import warningIcon from '../../assets/icons/warning-icon.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faClear,
  faEye,
  faEyeSlash,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons'
import { Label } from '../../Elements/basic'

const InputWrapper = styled.div`
  padding: 0;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 24px 36px;
  margin: 12px 8px;
  width: 95%;
`

const TextInput = styled.input`
  margin: 0;
  padding: 0 12px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  background: #ffffff;
  border: none;
  border-bottom: 1.5px solid lightgray;
  outline: none;
  width: 100%;
  &:focus {
    border-bottom: 1.5px solid rgb(51, 168, 82);
  }
`

const Input = (props) => {
  const {
    labelText,
    name,
    onChange,
    type,
    value,
    autocomplete,
    disabled,
  } = props
  return (
    <InputWrapper>
      <Label>{labelText}</Label>
      <TextInput
        autocomplete={autocomplete}
        name={name}
        onChange={onChange}
        value={value}
        type={type}
        disabled={disabled}
      />
    </InputWrapper>
  )
}
export default Input
