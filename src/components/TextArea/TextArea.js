import React, { useState } from 'react'
import styled from 'styled-components'
import { Label } from '../../Elements/basic'

const Wrapper = styled.div`
  padding: 0;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 24px auto;
  margin: 12px 8px;
`

const Textarea = styled.textarea`
  resize: none;
  padding: 8px 12px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  background: #ffffff;
  border: 2px solid #696969;
  border-radius: 4px;
  outline: none;
  //height: 40px;
  &:focus {
    border: 1px solid #4e92f9;
  }
`
const TextArea = (props) => {
  const { labelText, name, onChange, value, rows } = props
  return (
    <Wrapper>
      <Label>{labelText}</Label>
      <Textarea
        value={value}
        name={name}
        onChange={onChange}
        rows='4'
      ></Textarea>
    </Wrapper>
  )
}
export default TextArea
