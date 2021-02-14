import React from 'react'
import styled from 'styled-components'

const MessageContainer = styled.div`
    box-sizing: border-box;
    position: relative;
    width: 328px;
    padding: 8px 16px 8px 16px;
    min-height: 32px;
    background: #FFFFFF;
    border: 2px solid #545454;
    box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 4px 5px rgba(0, 0, 0, 0.2);
    border-radius: 2px;

    & > p {
        box-sizing: border-box;
        margin: 0px;
        padding: 0px 0px 0px 0px;
        font-family: Open Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 18px;
        letter-spacing: 0.25px;
        color: #545454;
        // border: 1px dotted blue;
    }
`

export default function StatusMessage(props) {
    const { message, className } = props

    return (
        <MessageContainer className={className}>
            <p>{message}</p>
        </MessageContainer>
    )
}
