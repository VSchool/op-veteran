import React from 'react'
import styled from 'styled-components'
import { Header } from '../components/Header'
import { FormInput } from '../components/FormInput'

const VendorPageContainer = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    position: relative;
    // border: 2px solid dodgerblue;

    & > h1 {
        box-sizing: border-box;
        margin: 0px;
        position: absolute;
        top: 192px;
        left: calc(50% - 328px/2);
        width: 328px;
        max-height: 64px;
        font-family: Open Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 32px;
        line-height: 32px;
        color: #545454;
        // border: 1px solid dodgerblue;
    }

    & > .subtitle {
        box-sizing: border-box;
        margin: 0px;
        position: absolute;
        top: 272px;
        left: calc(50% - 328px/2);
        width: 328px;
        max-height: 40px;
        font-family: Open Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 20px;
        color: #545454;
        // border: 1px solid dodgerblue;
    }

    & > .form-input {
        position: absolute;
        top: 376px;
        left: calc(50% - 328px/2);
    }
`

export default function Vendor() {
    return (
        <VendorPageContainer>
            <Header />
            <h1>Vendor Page</h1>
            <p className={'subtitle'}>Before selecting your booth, let's get some more point of contact information.</p>
            <FormInput label={'Some random question.'} className={'form-input'} />
        </VendorPageContainer>
    )
}
