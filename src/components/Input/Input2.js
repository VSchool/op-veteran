import React, {useState} from 'react'
import styled from 'styled-components'
import warningIcon from '../../assets/icons/warning-icon.svg'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClear, faEye, faEyeSlash, faExclamationTriangle} from '@fortawesome/free-solid-svg-icons'

const InputContainer = styled.div `
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 44px;
    `
// border: 1px solid black;

const Label = styled.label `
        margin: 0px;
        position: absolute;
        top: 0px;
        left: 0px;
        font-family: Open Sans;
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 24px;
      
        color: #545454;
        // border: 1px dotted blue
        `

const Wrapper = styled.div `
        position: absolute;
        top: 28px;
        left: 8px;
        right: 8px;
        height: 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid #545454;
`
const TextInput = styled.input `
            box-sizing: border-box;
            height: 36px;
            width: 280px;
            font-family: Open Sans;
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            letter-spacing: 0.01em;
            color: #545454;
           // border: none;
            outline: none;
            border-radius: 2px;
            ///background-color: transparent;
        &::after {
          content: ${props=>props.icon}
        }
`
const Icon = styled(FontAwesomeIcon)`
            box-sizing: border-box;
            width: 24px;
            height: 24px;
            visibility: ${props => props.show
  ? "visible"
  : "hidden"};
            color: ${props => props.color};
            `
// border: 1px dotted blue;

const HelperText = styled.p `
        margin: 0px;
        position: absolute;
        top: 56px;
        left: 8px;
        right: 8px;
        font-family: Open Sans;
        font-style: normal;
        font-weight: 300;
        font-size: 12px;
        line-height: 16px;
        letter-spacing: 0.02em;
        color: #EA7C7C; 
        visibility: ${props => props.helperText
  ? "visible"
  : "hidden"};      
        // border: 1px dotted blueeß
`

export default function Input(props) {
  const [invalid, setInvalid] = useState(false)
  const [type, setType] = useState(props.type)
  const {
    labelText,
    className,
    helperText,
    ...inputProps
  } = props
  return (
    <InputContainer className={className}>
     
      <Label className={'label'}>{labelText}</Label>
        <TextInput type={type} aria-label={labelText} {...inputProps}/>
        {invalid ? <Icon icon={faExclamationTriangle} alt={'Invalid text entered'}/> : null}
      
      {helperText
        ? <HelperText className={'helper-text'}>{helperText}</HelperText>
        : null}
        
    </InputContainer>
  )
}
