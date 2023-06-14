import styled, { keyframes } from 'styled-components'
import { MdReport } from 'react-icons/md'
import { CloseButton } from '../../Elements/basic'
import { Button } from '../Button'
import { useNavigate } from 'react-router-dom'

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  // repeat(auto-fill(minmax(35%,50%)));
  justify-content: space-around;
  align-items: center;
  margin: 10px auto;
`
const entrance = keyframes`
    0% {top: -150px;}
    20% {top: 100px;}
    80% {top: 100px;}
    100% {top: -150px;}
`

const MessageContainer = styled.div`
  display: flex;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: rgba(35, 65, 80, 1);
  border: 2px solid #4e92f9;
  box-sizing: border-box;
  box-shadow: 0px 8px 10px rgba(84, 84, 84, 0.14),
    0px 3px 14px rgba(84, 84, 84, 0.12), 0px 4px 5px rgba(84, 84, 84, 0.2);
  border-radius: 4px;
  padding: 12px 16px;
  margin: auto;
  position: fixed;
  width: ${(props) => (props.width ? props.width : 'clamp(200px, 300px,80vw)')};
  height: ${(props) =>
    props.height ? props.height : 'clamp(300px,400px, 80vh)'};
  overflow: hidden;
  z-index: 90;
  transition: all 1s ease-in-out;
`
//animation: ${entrance} 4s ease-in;
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
  padding: 0px 10px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 18px;
  letter-spacing: 0.25px;
  color: #ecf0f1;
  // border: 1px dotted blue;
`
const Icon = styled(MdReport)`
  width: 24px;
  height: 24px;
  color: #4e92f9;
  padding: 4px auto;
`

const DoubleBoothModal = (props)=>{

  const {data, options, handleSelectBooth, handleClose} = props
  //const { id, vendor, section, hasElectricity, row, restriction } = data
  const { id } = data

  console.log("booth id from doubleBoothModal", id)
  
  
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/finalize')
  }

  const handleDoubleBoothSelect = (e) => {
    console.log("handleDoubleBoothSelect called")
    const boothId = e.target.innerText
    handleSelectBooth(boothId, true)
    handleClick()
  }

  const handleDoubleCardClose = async(e) =>{
    e.preventDefault()
    console.log("handleDoubleCardClose id", id)
    await handleClose(id)
  }

 const buttons = options.map((booth, index) => (
    <Button
      buttonText={booth} 
      buttonStyle='primary'
      onClick={handleDoubleBoothSelect}
      id={id}
      key={index}
    />
  ))

  return (
    <MessageContainer>
      <Text>Please select the adjacent booth you'd like to add.</Text>
      {buttons.length && <ButtonWrapper>{buttons}</ButtonWrapper>}
      <Button
        buttonStyle='secondary'
        buttonText='Continue with single booth'
        onClick={handleClick}
        column='1/3'
        row='2/3'
      />
      <Button
        buttonStyle='primary'
        buttonText='Close'
        onClick={handleDoubleCardClose}
      />
    </MessageContainer>
  )
}

export default DoubleBoothModal
