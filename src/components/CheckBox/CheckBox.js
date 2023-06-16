import React from 'react'
import styled from 'styled-components'
// import { Label } from '../../Elements/basic'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 8px;
`

const Input = styled.input`
  float: right;
`

const CheckBox = (props) => {
  const { labelText, checked, onChange, name } = props

  return (
    <Wrapper>
      <label>{labelText}</label>
      <Input
        name={name}
        type='checkbox'
        checked={checked}
        onChange={(e) => onChange(e)}
      />
    </Wrapper>
  )
}

export default CheckBox
