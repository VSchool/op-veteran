import React from 'react'
import styled from 'styled-components'

const BarContainer = styled.div`
    box-sizing: border-box;
    position: fixed;
    width: 200px;
    min-height: 32px;
    bottom: 56px;
    // border: 1px dashed black;

    & > p {
        box-sizing: border-box;
        margin: 0px;
        //position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        font-family: Open Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        display: flex;
        align-items: center;
        color: #545454;
        // border: 1px dotted blue;
    }

    & > .container-div {
        box-sizing: border-box;
        //position: absolute;
        top: 28px;
        left: 0px;
        right: 0px;
        width: 100%;
        height: 4px;
        background: #D9D9D9;    
        border-radius: 4px;

        & > .fill-div {
            background: #545454;
            width: ${props=>props.complete}%;
            height: 100%;
            border-radius: 4px;
        }
    }
`

export default function ProgressBar(props) {
    const { complete, className } = props

    return (
        <BarContainer className={className}>
            <p>{`${complete}% completed`}</p>
            <div className={'container-div'}>
                <div className={'fill-div'} complete={complete}></div>
            </div>
        </BarContainer>
    )
}
