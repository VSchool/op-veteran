import React from 'react'
import styled from 'styled-components'

const SponsorshipContainer = styled.div`
    box-sizing: border-box;
    position: absolute;
    top: 88px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    border: 2px solid blue;
`

export default function SponsorshipSelection() {
    return (
        <SponsorshipContainer>
            <p>Sponsorship</p>
        </SponsorshipContainer>
    )
}
