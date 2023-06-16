import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import NextButton from './NextButton'
import warningIcon from '../../assets/icons/warning-icon.svg'
import Selection from '../Selection'
const InputContainer = styled.form`
  box-sizing: border-box;
  // position: relative;
  width: 328px;
  height: 120px;
  // border: 1px dashed black;

  & > .label {
    box-sizing: border-box;
    margin: 0px;
    // position: absolute;
    /* top: 0px;
        left: 0px;
        right: 0px; */
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
    /* position: absolute;
        top: 72px;
        left: 0px;
        right: 0px; */
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 16px;
    color: #ea7c7c;
    visibility: hidden;
    border: 1px dotted blue;
  }

  & > .wrapper {
    /* position: absolute;
        top: 28px;
        left: 0px;
        right: 0px; */
    height: 32px;
    border-bottom: 1px solid #545454;

    & > input {
      box-sizing: border-box;
      /* position: absolute;
            left: 0px;
            width: 280px;
            height: 32px; */
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
      /* position: absolute;
            top: calc(50% - 24px/2);
            right: 0px;
            //width:  */
      height: 24px;
      visibility: hidden;
      // border: 1px dotted blue;
    }

    & > .next-button {
      /* position: absolute;
        bottom: 0px;
        right: 0px; */
    }
  }
`

export default function FormInput(props) {
  // const { label, className, answer, saveAnswer, topic } = props
  const { className, saveAnswer, topic } = props
  // const { question, type, required, vendorProp } = topic
  const { question, type, vendorProp } = topic
  const [input, setInput] = useState('')
  const focusRef = useRef(null)

  const handleChange = (e) => {
    setInput(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    focusRef.current && focusRef.current.focus()
    saveAnswer({ [vendorProp]: input })
    setInput('')
  }
  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus()
    }
  }, []) 
  
  //COMMENT:  React Hook useEffect has an unnecessary dependency: 'focusRef.current'. Either exclude it or remove the dependency array. Mutable values like 'focusRef.current' aren't valid dependencies because mutating them doesn't re-render the component  react-hooks/exhaustive-deps
//NOTE: removed 'focusRef.current" as dependency in useEffect above to address msg/warning
  return (
    <InputContainer onSubmit={handleSubmit} className={className}>
      <p className={'label'}>{question}</p>
      <div className={'wrapper'}>
        {type === 'text' ? (
          <>
            <input ref={focusRef} value={input} onChange={handleChange} />
            <img src={warningIcon} alt={'Invalid text entered.'} />
          </>
        ) : type === 'yes-no' ? (
          <>
            <lable>
              Yes{' '}
              <input
                checked={input === 'yes'}
                onChange={handleChange}
                type='radio'
                value='yes'
                name={vendorProp}
              />{' '}
            </lable>
            <lable>
              No{' '}
              <input
                checked={input === 'no'}
                onChange={handleChange}
                ref={focusRef}
                type='radio'
                value='no'
                name={vendorProp}
              />{' '}
            </lable>
          </>
        ) : (
          <>
            <Selection
              ref={focusRef}
              onChange={handleChange}
              name={vendorProp}
              options={topic.options}
            />
          </>
        )}
      </div>
      <p className={'helper-text'}>{'Helper text'}</p>
      <NextButton className={'next-button'} />
    </InputContainer>
  )
}
