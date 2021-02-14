import React from 'react'
import styled from 'styled-components'
import googleLogo from '../assets/icons/google-icon.svg'

const StyledButton = styled.button`
    box-sizing: border-box;
    position: absolute;
    top: 336px;
    left: calc(50% - 56px/2);
    width: 56px;
    height: 56px;
    border-radius: 100%;
    border: 2px solid #EAEAEA;
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12), 0px 3px 5px rgba(0, 0, 0, 0.2);
    background: #FFFFFF;

    & > img {
        box-sizing: border-box;
        position: absolute;
        top: calc(50% - 28px/2);
        left: calc(50% - 28px/2);
        width: 28px;
        height: 28px;
        // border: 1px dotted orange;
    }
`

export default function GoogleLoginButton() {
    return <StyledButton><img src={googleLogo} alt={'Google logo'} /></StyledButton>
}
