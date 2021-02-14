import React from 'react'
import styled from 'styled-components'
import { Header } from '../../components/Header'
import RegistrationForm from './RegistrationForm'
import SponsorshipSelection from './SponsorshipSelection'

const VendorPageContainer = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    position: relative;
    // border: 2px solid dodgerblue;
`

export default function Vendor() {
    return (
        <VendorPageContainer>
            <Header />
            {/* <RegistrationForm /> */}
            <SponsorshipSelection />
        </VendorPageContainer>
    )
}
