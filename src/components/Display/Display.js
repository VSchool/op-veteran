import React from 'react'
import styled from 'styled-components'

const DisplayContainer = styled.div`
    width: 200px;
    height: 200px;
    position: relative;
    top: 40px;
    left: calc(50% - 200px/2);
    display: flex;
    justify-content: center;
    align-items: center;

    & > h1 {
        margin: 0px;
        font-size: 104px;
        line-height: 104px;
        color: orange;
    }
`

export default function Display(props) {
    const { count } = props

    return (
        <DisplayContainer>
            <h1>{count}</h1>
        </DisplayContainer>
    )
}
