import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { VendorContext } from '../../context/VendorProvider'
import { Header, HeaderWrapper } from '../../Elements/basic'
import ToDoList from './ToDoList'

const Wrapper = styled.div`
  align-items: center;
  height: calc(100% - 222px);
`

const Header2 = styled.h2`
  font-family: 'Open Sans';
  font-weight: normal;
  padding: 15px 15px;
  width: 100%;
  height: 2em;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.14);
  background-color: #232323;
  color: #ecf0f1;
`
const TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: auto;
  padding: 20px 10px;
  width: clamp(300px, 75%, 800px);
  height: max-content;
`
const List = styled.ol`
  list-style: none;
  counter-reset: steps;
  & a {
    text-decoration: none;
    color: black;
  }
`
const ListItem = styled.li`
  counter-increment: steps;
  font-family: 'Open Sans';
  font-size: 1.3em;
  padding: 20px;
  width: 100%;
  height: 3em;
  line-height: 1.3em;
  margin: 5px 0;
  font-weight: ${(props) => (props.current ? 'bold' : 'normal')};
  background-color: #ecf0f1;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 7px rgba(0, 0, 0, 0.12),
    0px 2px 3px rgba(0, 0, 0, 0.2);
  z-index: ${(props) => (props.current ? 3 : null)};
  text-decoration: ${(props) => (props.complete ? 'line-through' : 'none')};
  cursor: ${(props) => (props.current ? 'pointer' : null)};
  &::before {
    content: counter(steps);
    margin-right: 0.6rem;
    background: #232323;
    color: #ecf0f1;
    width: 1.3em;
    height: 1.3em;
    border-radius: 50%;
    display: inline-grid;
    place-items: center;
    line-height: 1.2em;
  }
  &:hover {
    background-color: ${(props) => (props.current ? '#7c9091' : '#ecf0f1')};
  }
  @media (max-width: 500px) {
    font-size: 1rem;
  }
`
const Home = (props) => {
  const { matchVendor } = useContext(VendorContext)

  // const [items, setItems] = useState({
  //   createAccount: true,
  //   registerVendor: false,
  //   uploadLogo: false,
  //   sponsor: false,
  //   selectBooth: false,
  //   completeRegistration: false,
  // });

  useEffect(() => {
    matchVendor()
  }, [])

  return (
    <Wrapper>
      <TodoContainer>
        <HeaderWrapper>
          <Header>Vendor Registration</Header>
        </HeaderWrapper>
        <ToDoList List={List} Header2={Header2} ListItem={ListItem} />
      </TodoContainer>
    </Wrapper>
  )
}

export default Home
