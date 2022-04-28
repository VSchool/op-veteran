import React from 'react'
import styled from 'styled-components'
import googleLogo from '../assets/icons/google-icon.svg'

const StyledButton = styled.button`
  box-sizing: border-box;
  width: 317px;
  height: 43px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  //letter-spacing: 0.25px;
  color: ${(props) => props.color};
  background: ${(props) => props.background};
  box-shadow: ${(props) => props.boxShadow};
  // box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12), 0px 3px 5px rgba(0, 0, 0, 0.2);
  // border: 2px solid #618572;
  border: ${(props) => props.border};
  border-radius: 2px;
  outline: none;
  padding: 11px;
  &:hover {
    background-color: ${(props) => props.hoverBackground};
  }
  &:active {
    background: ${(props) => props.activeBackground};
    border: ${(props) => props.activeBorder};
  }
`
const GoogleLogo = styled.img`
  width: 20px;
  height: 20px;
  padding-left: 6px;
`
const ButtonText = styled.span`
  margin-right: 6px;
`

export default function GoogleLoginButton(props) {
  const { className, onClick } = props
  return (
    <StyledButton onClick={onClick}>
      <span>Register with </span>
      <img src={googleLogo} alt='google logo' />
    </StyledButton>
  )
}
