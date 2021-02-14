import React from 'react'
import styled from 'styled-components'

const PlaygroundContainer = styled.div`
    box-sizing: border-box;
    width: 100%;
    min-height: 100%;
    border: 2px solid blue;

    & > h1 {
        margin: 0px;
    }
`

export default function Playground() {
    return (
        <PlaygroundContainer>
            <h1>Playground</h1>
        </PlaygroundContainer>
    )
}
