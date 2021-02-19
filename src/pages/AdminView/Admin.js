import React from 'react'
import styled from 'styled-components'
import { Header } from '../../components/Header'

const AdminContainer = styled.div`
    border: 1px solid blue;
`

export default function Admin() {
    return (
        <AdminContainer>
            <Header />
        </AdminContainer>
    )
}
