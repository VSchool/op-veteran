import React from 'react'
import styled from 'styled-components'
import { Header } from '../../components/Header'
import AdminSearch from  '../../components/AdminSearch'

const AdminContainer = styled.div`
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 100vh;
    border: 1px solid blue;

    & > h1 {
        margin: 0px;
        font-family: Open Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 32px;
        line-height: 32px;
        letter-spacing: 0.02em;
        color: #545454;
        border: 1px dotted dodgerblue;
    }

    & > .subtitle {
        margin: 0px;
        font-family: Open Sans;
        font-style: normal;
        font-weight: 300;
        font-size: 18px;
        line-height: 24px;
        letter-spacing: 0.01em;
        color: #545454;
        border: 1px dotted dodgerblue;
    }

    & > .diagram-placeholder {
        width: 100%;
        height: 375px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Open Sans';
        border: 1px dotted orange;
    }
`

export default function Admin() {
    return (
        <AdminContainer>
            <Header />
            <h1>{`Welcome, Admin.`}</h1>
            <p className={'subtitle'}>{'Here is a current list, and map, of vendors registered for Vet Fest.'}</p>
            <div className={'diagram-placeholder'}><h2>Diagram placeholder</h2></div>
            <AdminSearch />
        </AdminContainer>
    )
}