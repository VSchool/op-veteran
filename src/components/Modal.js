// import React, { useState } from 'react'
import React from 'react'
import styled, { keyframes } from 'styled-components'
import { MdReport } from 'react-icons/md'
import { Button } from '../components/Button'

// const ButtonWrapper = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill(minmax(35%, 50%)));
//   justify-content: space-between;
//   align-items: center;
//   margin: 10px auto;
// `
const entrance = keyframes`
    from {
      transform: translateX(-50vw)
    }
    to {
      transform: translateX(25vw;)
    }
`
// background: rgba(35, 65, 80, 0.4);

const GreyBackground = styled.div`
  height: 110vh;
  width: 100vw;
  background-color: #0f0e0e94;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 4;
`
const MessageContainer = styled.div`
  display: flex;
  align-self: center;
  justify-self: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #fafafa;
  border: 2px solid #4e92f9;
  box-sizing: border-box;
  box-shadow: 0px 8px 10px rgba(84, 84, 84, 0.14),
    0px 3px 14px rgba(84, 84, 84, 0.12), 0px 4px 5px rgba(84, 84, 84, 0.2);
  border-radius: 4px;
  padding: 12px 16px;
  position: fixed;
  width: ${(props) => (props.width ? props.width : 'clamp(300px, 600px,80vw)')};
  height: ${(props) =>
    props.height ? props.height : 'clamp(400px,800px, 80vh)'};
  overflow: hidden;
  z-index: 9;
  // transition: all 0.5s ease-in-out;
  animation: ${entrance} 0.5s ease-in;
`

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`
/* box-sizing: border-box;
    position: relative;
    width: 328px;
    padding: 8px 16px 8px 16px;
    min-height: 32px;
    background: #FFFFFF;
    border: 2px solid #545454; */
/* box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 4px 5px rgba(0, 0, 0, 0.2); */
/* border-radius: 2px; */
/* @media only screen and (min-width: 600px){
        width: 528px;
        left: calc(50% - 528px/2);
*/
const Text = styled.p`
  box-sizing: border-box;
  margin: 0px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 18px;
  letter-spacing: 0.25px;
  color: #545454;
  // border: 1px dotted blue;
  padding: 0.5rem;
`
const Icon = styled(MdReport)`
  width: 24px;
  height: 24px;
  color: #4e92f9;
  padding: 4px auto;
`

export default function Modal(props) {
  const { message, modalOpen, setModalOpen, confirm } = props
  
  return (
    <>
      <GreyBackground>
        <MessageContainer height={modalOpen ? '250px' : null}>
          <Icon />

          <Text>{modalOpen ? message : 'Click for instructions'}</Text>

          <ButtonDiv>
            <Button
              buttonText='Confirm and Checkout'
              buttonStyle='primary'
              onClick={confirm}
            />
            <Button
              buttonText='Cancel'
              buttonStyle='primary'
              onClick={(e) => setModalOpen(false)}
            />
          </ButtonDiv>
        </MessageContainer>
      </GreyBackground>
    </>
  )
}
