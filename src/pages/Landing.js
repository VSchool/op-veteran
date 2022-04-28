import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { Auth } from '../Firebase'
import { Button } from '../components/Button'
import { GoogleButton } from '../components/GoogleButton'
import { Input } from '../components/Input'
import logo from '../assets/images/vetfest-logo.png'
import StatusMessage from '../components/StatusMessage'

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
} from '../Elements/basic'
import styled from 'styled-components'

const ErrMsg = styled.p`
  color: red;
  text-align: center;
  font-size: 80%;
`

const ToggleLink = styled.p`
  text-align: center;
  padding: 5px 0px;
  cursor: pointer;
`

/*
init value: login:
*/

export default function Landing() {
  const {
    auth,
    authError,
    setAuthErr,
    handleErrors,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
  } = useContext(AuthContext)

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errMsg, setErrMsg] = useState('')
  const [notification, setNotification] = useState('')
  const [toggleLogin, setToggleLogin] = useState(true)
  const [state, setState] = useState(null)
  const states = { REGISTER: 'register', SIGNUP: 'signup' }
  const selectRegister = (e) => {}
  const handleGoogle = (e) => {
    e.preventDefault()
    signInWithGoogle()
  }

  const ActionCodeSettings = {}

  const handleConfirmPassword = () => {
    if (inputs.password !== inputs.confirmPassword) {
      setErrMsg('Passwords dont match')
      return false
    }
    return true
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }))
    setErrMsg('')
  }

  const handleClick = (e) => {
    e.preventDefault()
    const { email, password } = inputs
    /*** Add validation ***/
    const { name } = e.target
    if (e.target.innerText === 'Register') {
      handleConfirmPassword() && signUpWithEmail(email, password)
      if (authError === null) {
        setInputs({ email: '', password: '', confirmPassword: '' })
        setNotification(
          'Thank you! Check your email to verify your account and complete registration'
        )
        setToggleLogin((prev) => !prev)
      }
      console.log('landing page auth: ', auth)
    } else if (e.target.innerText === 'Sign in') {
      signInWithEmail(email, password)
    }
  }

  return (
    <LandingContainer>
      {authError ? <StatusMessage message={authError} /> : null}
      {notification ? <StatusMessage message={notification} /> : null}
      <Logo src={logo} alt='OP Veteran VetFest logo' />
      <Wrapper>
        <HeaderWrapper>
          <Subheader>OP Veteran</Subheader>
          <Header>VetFest Registration</Header>
        </HeaderWrapper>
        <FormWrapper name='landingform'>
          {toggleLogin ? (
            <>
              <Input
                className='email'
                type='email'
                helperText={null}
                labelText='E-mail'
                name='email'
                value={inputs.email}
                onChange={handleChange}
              />
              <Input
                className='password'
                type='password'
                helperText='8 characters'
                labelText='Password'
                name='password'
                value={inputs.password}
                onChange={handleChange}
              />
              <Button
                buttonText={'Sign in'}
                buttonStyle={'secondary'}
                onClick={handleClick}
                name='signin'
              />
              <ToggleLink onClick={() => setToggleLogin((prev) => !prev)}>
                Not a member yet? Sign up
              </ToggleLink>
            </>
          ) : (
            <>
              <Input
                className='email'
                type='email'
                helperText={null}
                labelText='E-mail'
                name='email'
                value={inputs.email}
                onChange={handleChange}
              />
              <Input
                className='password'
                type='password'
                helperText='8 characters'
                labelText='Password'
                name='password'
                value={inputs.password}
                onChange={handleChange}
              />
              <Input
                className='password'
                type='password'
                helperText='8 characters'
                labelText='Confirm Password'
                name='confirmPassword'
                value={inputs.confirmPassword}
                onChange={handleChange}
              />
              <Button
                buttonText={'Register'}
                buttonStyle={'primary'}
                onClick={handleClick}
                name='register'
              />
              <ErrMsg>{errMsg}</ErrMsg>
              <ToggleLink onClick={() => setToggleLogin((prev) => !prev)}>
                Already a member? Login
              </ToggleLink>
            </>
          )}
          <Row>
            <p>or</p>
          </Row>
          <GoogleButton
            buttonStyle='secondary'
            buttonText='Sign in with '
            fontColor='#545454'
            onClick={handleGoogle}
          />
        </FormWrapper>
      </Wrapper>
    </LandingContainer>
  )
}
