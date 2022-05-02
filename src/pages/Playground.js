import React from 'react'
import styled from 'styled-components'
import { Button } from '../components/Button'
import GoogleLoginButton from '../components/GoogleLoginButton'
import { Input } from '../components/Input'
import { FormInput } from '../components/FormInput'
import ProgressBar from '../components/ProgressBar'
import StatusMessage from '../components/StatusMessage'
import { SponsorshipCard, ListItem } from '../components/SponsorshipCard'
import { VendorCard } from '../components/VendorCard'

const PlaygroundContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  padding: 0px 24px 0px 24px;
  width: 100%;
  min-height: 100%;
  // border: 2px solid blue;

  & > h1 {
    margin: 0px;
    font-size: 48px;
    text-align: center;
    text-transform: uppercase;
    color: #545454;
  }

  & > .wrapper {
    // box-sizing: border-box;
    display: flex;
    flex-direction: column;
    // border: 1px dotted orange;
  }

  & > h2 {
    margin: 40px 0px 0px 0px;
    font-size: 32px;
    color: #545454;
  }

  & > p {
    margin: 0px 0px 8px 0px;
    color: #545454;
  }

  & > .google {
    position: relative;
  }
`

export default function Playground() {
  return (
    <PlaygroundContainer>
      <h1>Playground</h1>

      <h2>Card List Item</h2>
      <div className={'wrapper'}>
        <VendorCard />
        <VendorCard />
        <VendorCard />
      </div>

      {/* <h2>Card List Item</h2>
            <ListItem /> */}

      {/* <h2>Sponsorship Card</h2>
            <SponsorshipCard /> */}

      {/* <h2>Status Message</h2>
            <StatusMessage message={'Congrats!  You have created an account on O.P. Veteran. Now, please continue the registration.'} /> */}

      {/* <h2>Progress Bar</h2>
            <ProgressBar complete={75} /> */}

      {/* <h2>Button</h2>

            <p>{'primary'}</p>
            <Button buttonText={'Primary'} buttonStyle={'primary'} />
            <br />

            <p>{'secondary'}</p>
            <Button buttonText={'Secondary'} buttonStyle={'secondary'} />
            <br />

            <p>{'google'}</p>
            <GoogleLoginButton className={'google'} /> */}

      {/* <h2>Input</h2>
            <Input labelText={'Label'} placeholder={'placeholder'} /> */}

      {/* <h2>Form Input</h2>
            <FormInput label={'Label as a question'} /> */}
    </PlaygroundContainer>
  )
}
