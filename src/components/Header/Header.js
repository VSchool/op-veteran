import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../../context/AuthProvider'
import { UserContext } from '../../context/UserProvider'
import { VendorContext } from '../../context/VendorProvider'
import logo from '../../assets/images/vetfest-logo.png'
import userIcon from '../../assets/icons/avatar-icon.svg'
import { Profile } from '../Profile'
import { IoChevronBackSharp, IoCloseOutline } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import ToDoList from '../../pages/VendorView/ToDoList'

const HeaderContainer = styled.div`
  position: relative;
  padding: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  & > .exit-icon {
    position: absolute;
    top: 32px;
    left: 12px;
    width: 40px;
  }

  & .avatar-icon {
    right: 12px;
    width: 40px;
    border-radius: 50%;
  }
`
const SideNav = styled.div`
  height: 100%;
  width: 300px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding: 30px 0;

  & > .sideNavContainer {
    display: flex;
    flex-direction: column;

    justify-content: space-between;
    height: 100%;

    & > .sideNavLinks {
      & > .sideNavLink {
        padding: 8px 8px 8px 32px;
        text-decoration: none;
        font-size: 25px;
        color: #818181;
        display: block;
        transition: 0.3s;
        cursor: pointer;
      }

      & > .sideNavLink:hover {
        color: #f1f1f1;
      }
    }
  }

  & > .closeBtn {
    position: absolute;
    top: 0;
    right: 25px;
    padding: 10px;
    font-size: 36px;

    cursor: pointer;
    color: #818181;
  }

  & > .closeBtn:hover {
    color: #f1f1f1;
  }

  & > .logout {
    display: flex;
    height: 1500px;
    align: center;
    justify: center;
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
    cursor: pointer;
  }

  @media screen and (max-height: 450px) {
    .sidenav {
      padding-top: 15px;
    }
    .sideNavLink {
      font-size: 18px;
    }
  }
`

const List = styled.div`
  & a {
    text-decoration: none;
  }
`

const ListItem = styled.li`
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: white;
  display: block;
  transition: 0.3s;
  text-decoration: ${(props) => (props.complete ? 'line-through' : 'none')};
  font-weight: ${(props) => (props.current ? 'bold' : 'normal')};
  z-index: ${(props) => (props.current ? 3 : null)};
  cursor: ${(props) => (props.current ? 'pointer' : null)};
`

const Header2 = styled(ListItem)``

const LogOut = styled.span`
  & > h1 {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
    cursor: pointer;
  }
`

export default function Header() {
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)
  const { user } = useContext(UserContext)
  const { currentVendor } = useContext(VendorContext)
  const [showProfile, setShowProfile] = useState(false)
  const handleClick = () => {
    setShowProfile((prev) => !prev)
  }
  const [sideToggle, setSideToggle] = useState(true)

  const handleSideBarToggle = () => {
    setSideToggle((prevState) => !prevState)
    console.log(sideToggle)
  }

  return (
    <HeaderContainer>
      {sideToggle ? (
        <></>
      ) : (
        // Drawer menu -- toggle different component render states. See Vendor component render logic.
        <SideNav id='mySideNav'>
          <span className='closeBtn' alt='close' onClick={handleSideBarToggle}>
            <IoCloseOutline />
          </span>
          {/* The 'Home' link is not working right now */}
          <div className='sideNavContainer'>
            <div className='sideNavLinks'>
              <Link to='/' className='sideNavLink'>
                <span className='sideNavLink'>Home</span>
              </Link>
              <Link to='/registration' className='sideNavLink'>
                <span>Register</span>
              </Link>
              <Link to='/sponsorship' className='sideNavLink'>
                <span>Sponsor Tiers</span>
              </Link>
              <Link to='/booth' className='sideNavLink'>
                <span>Booth Select</span>
              </Link>
              <Link to='/finalize' className='sideNavLink'>
                <span>Finalize</span>
              </Link>
            </div>
            <ToDoList List={List} ListItem={ListItem} Header2={Header2} />

            <LogOut>
              <h1 onClick={logout}>Logout</h1>
            </LogOut>
          </div>
        </SideNav>
      )}
      <div>
        <span style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>
          <IoChevronBackSharp />
        </span>
        <span
          style={{ fontSize: '30px', cursor: 'pointer', padding: '10px' }}
          onClick={handleSideBarToggle}
        >
          &#9776;
        </span>
      </div>
      <div>
        <Link className={'header-logo'} to='/'>
          <img src={logo} alt={'OP Veteran VetFest logo.'} />
        </Link>
      </div>
      <div>
        <img
          src={user.userImg === '' ? userIcon : user.userImg}
          alt={'User is logged in.'}
          className={'avatar-icon'}
          onClick={handleClick}
        />
        {showProfile ? <Profile /> : <></>}
      </div>
    </HeaderContainer>
  )
}
