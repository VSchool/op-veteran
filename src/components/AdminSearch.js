import React from 'react'
import styled from 'styled-components'
import searchIcon from '../assets/icons/search-icon.svg'

const InputContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 328px;
  height: 40px;
  border: 1px solid #545454;
  border-radius: 2px;

  & > input {
    box-sizing: border-box;
    // width: 120px;
    height: 24px;
    border: 1px dashed dodgerblue;
  }

  & > img {
    box-sizing: border-box;
    // position: absolute;
    // top: calc(50% - 24px/2);
    // right: 16px;
    height: 24px;
    border: 1px dashed dodgerblue;
  }
`

export default function AdminSearch() {
  return (
    <InputContainer>
      <input placeholder={'placeholder'} />
      <img src={searchIcon} alt={'Search icon'} />
    </InputContainer>
  )
}
