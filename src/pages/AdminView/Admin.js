import React from 'react'
import styled from 'styled-components'

const AdminContainer = styled.div`
    border: 1px solid blue;
`

export default function Admin() {
    return (
        <AdminContainer>
            <p>Admin Component</p>
        </AdminContainer>
    )
}
