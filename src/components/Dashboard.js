import React, { useContext } from 'react'
import styled from 'styled-components'
import { UserContext } from '../context/UserProvider'
import ToDoList from '../pages/VendorView/ToDoList'
const DashboardContainer = styled.div`
  padding: 30px;
  border-radius: 0.5rem;
`

const DashboardFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
`

const InfoContainer = styled.div`
  background-color: ${(props) => props.bgcolor};
  padding: 20px;
  border-radius: 0.5rem;
  color: ${(props) => props.color};
  margin: 20px;
  & p {
    padding: 10px 0;
  }
`

const TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const Header2 = styled.h2`
  color: white;
  margin-bottom: 20px;
`

const List = styled.ol`
  list-style: none;
  counter-reset: steps;
  background-color: #575a6c;
  color: #575a6c;
  padding: 20px;
  border-radius: 0.5rem;
  & a {
    text-decoration: none;
    color: #575a6c;
  }
`
const ListItem = styled.li`
  counter-increment: steps;
  font-weight: ${(props) => (props.current ? 'bold' : 'normal')};
  font-size: 1.1em;
  padding: 10px;
  background-color: ${(props) => (props.complete ? '#e0e0e0' : 'white')};
  border-radius: 0.5rem;
  margin-bottom: 10px;
  z-index: ${(props) => (props.current ? 3 : null)};
  text-decoration: ${(props) => (props.complete ? 'line-through' : 'none')};
  transition: all 0.3s ease-in-out;
  &::before {
    content: counter(steps);
    margin-right: 0.6rem;
    color: #575a6c;
    width: 1.3em;
    height: 1.3em;
    border-radius: 50%;
    display: inline-grid;
    place-items: center;
    line-height: 1.2em;
  }
  &:hover {
    cursor: ${(props) => (props.current ? 'pointer' : 'default')};
    transform: ${(props) => (props.current ? 'scale(1.1)' : null)};
  }
  @media (max-width: 500px) {
    font-size: 1rem;
  }
`

const Dashboard = () => {
  const { user } = useContext(UserContext)

  //capitalize first letter of user name
  const capitalize = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  return (
    <DashboardContainer>
      <DashboardFlex>
        <div>
          <InfoContainer bgcolor='white' color='#575A6C'>
            <h1>Hello {capitalize(user.name)}</h1>
            <p>Welcome to O.P Veteran</p>
          </InfoContainer>
          <InfoContainer bgcolor='#F9AC67' color='white'>
            (Cart Will Go Here)
          </InfoContainer>
        </div>
        <TodoContainer>
          <ToDoList List={List} Header2={Header2} ListItem={ListItem} />
        </TodoContainer>
      </DashboardFlex>
    </DashboardContainer>
  )
}

export default Dashboard
