import React from 'react'
import styled from 'styled-components'

import { Button } from './components/Button'
import GoogleLoginButton from './components/GoogleLoginButton'

const PlaygroundContainer = styled.div`
    box-sizing: border-box;
    width: 100%;
    min-height: 100%;
    border: 2px solid blue;

    & > h1 {
        margin: 0px;
        font-size: 48px;
        font-family: 'Open Sans';
        text-align: center;
        text-transform: uppercase;
        color: #545454;
    }

    & > h2 {
        margin: 0px;
        font-size: 32px;
        font-family: 'Open Sans';
        color: #545454;
    }
`

export default function Playground() {
    return (
        <PlaygroundContainer>
            <h1>Playground</h1>
            <br/>
            <h2>{'Button'}</h2>
            <br />
            <Button buttonText={'Primary'} buttonStyle={'primary'} />
            <br />
            <Button buttonText={'Secondary'} buttonStyle={'secondary'} />
            <br />
            <GoogleLoginButton />
        </PlaygroundContainer>
    )
}
