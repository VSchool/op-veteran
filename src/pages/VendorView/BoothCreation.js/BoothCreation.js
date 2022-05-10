import React, { useContext, useState, useEffect, useRef } from 'react'
import { BoothContext } from '../../../context/BoothProvider'
import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'
import { TextArea } from '../../../components/TextArea'
import {
  LandingContainer,
  Logo,
  Subheader,
  Header,
  HeaderWrapper,
  ButtonWrapper,
  FormWrapper,
  Wrapper,
  Row,
  Container,
} from '../../../Elements/basic'
import { CheckBox } from '../../../components/CheckBox'

const BoothCreation = (props) => {
  const { createBooth } = useContext(BoothContext)

  const handleChange = (e) => {
    const { name, value } = e.target
    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }
  const handleCheck = (e) => {
    const { name, checked } = e.target
    console.log(e.target)
    setInput((prev) => {
      return {
        ...prev,
        [name]: checked,
      }
    })
  }
  const [input, setInput] = useState({
    row: '',
    start: 8,
    end: 14,
    section: '',
    paladin: false,
    abrams: false,
    hasElectricity: false,
    food: false,
    vendor: null,
  })
  const handleClick = (e) => {
    e.preventDefault()
    for (let i = input.start; i <= input.end; i++) {
      const boothData = {
        row: input.row,
        number: i,
        section: input.section,
        restriction: input.paladin
          ? 'paladin'
          : input.abrams
          ? 'abrams'
          : input.food
          ? 'food'
          : null,
        hasElectricity: input.hasElectricity,
        vendor: {},
      }
      createBooth(boothData)
    }
  }
  return (
    <FormWrapper>
      <Input
        labelText='Row'
        name='row'
        type='text'
        value={input.row}
        onChange={handleChange}
      />
      <Input
        labelText='Start'
        name='start'
        type='number'
        value={input.start}
        onChange={handleChange}
      />
      <Input
        labelText='End'
        name='end'
        type='number'
        value={input.end}
        onChange={handleChange}
      />
      <Input
        labelText='Section'
        name='section'
        type='text'
        value={input.section}
        onChange={handleChange}
      />
      <CheckBox
        labelText='Paladin?'
        name='paladin'
        checked={input.paladin}
        onChange={handleCheck}
      />
      <CheckBox
        labelText='Abrams?'
        name='abrams'
        checked={input.abrams}
        onChange={handleCheck}
      />
      <CheckBox
        labelText='Has electricity?'
        name='hasElectricity'
        checked={input.hasElectricity}
        onChange={handleCheck}
      />
      <CheckBox
        labelText='Is food vendor?'
        name='food'
        checked={input.food}
        onChange={handleCheck}
      />
      <Button
        buttonText='Add Booth'
        buttonStyle='primary'
        onClick={handleClick}
      />
    </FormWrapper>
  )
}

export default BoothCreation
