import React from 'react'
import styled from 'styled-components'

const VendorPageContainer = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    position: relative;
    border: 2px solid dodgerblue;
`

export default function Vendor() {
    return (
        <VendorPageContainer>
            <p>Vendor Page</p>
        </VendorPageContainer>
    )
}
