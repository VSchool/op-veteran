import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { AuthContext } from "../../context/AuthProvider";
import { UserContext } from "../../context/UserProvider";
import logo from '../../assets/images/vetfest-logo.png'
import userIcon from '../../assets/icons/avatar-icon.svg'
import {Profile} from '../Profile'
import {IoChevronBackSharp, IoCloseOutline} from 'react-icons/io5'
import { Link, useHistory } from 'react-router-dom';

const HeaderContainer = styled.div`
    position: relative;
    height: 88px;
    padding: 20px;
    box-shadow:
    inset 0 -3em 3em rgb(209, 209, 209),
    0 0  0 2px rgba(0,0,0,0.4),
    0.3em 0.3em 1em rgba(0,0,0,0.4);
    

    & > .exit-icon {
        position: absolute;
        top: 32px;
        left: 12px;
        width: 40px;
    }

    & > .header-logo {
        position: absolute;
        top: 32px;
        left: calc(50% - 160px/2);
        width: 160px;
    }

    & > .avatar-icon {
        position: absolute;
        top: 32px;
        right: 12px;
        width: 40px;
        border-radius: 50%;
    }


`       
const SideNav = styled.div`
    height: 100%;
    width: 250px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;

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

    & > .closeBtn {
        position: absolute;
        top: 0;
        right: 25px;
        padding: 10px;
        font-size: 36px;
        margin-left: 50px;
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
        .sidenav {padding-top: 15px;}
        .sideNavLink {font-size: 18px;}
    }
`

const LogOut = styled.span`
    display: flex;
    height: 50%;
    align-items: center;

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

export default function Header(props) {
    
    const { logout } = useContext(AuthContext);
    const { states, changeState } = props
    const {user}=useContext(UserContext);
    const [showProfile, setShowProfile] = useState(false)
    const handleClick = () => { setShowProfile((prev)=>!prev) }
    const [sideToggle, setSideToggle] = useState(true)

    const handleSideBarToggle = () => {
        setSideToggle(prevState => !prevState)
        console.log(sideToggle)
    }

    const history = useHistory()

    return (
        <HeaderContainer>
            { 
                sideToggle ?
                <>
                    <span 
                        style={{cursor: 'pointer'}}
                        onClick={history.goBack()}
                    >
                        <IoChevronBackSharp />
                    </span>
                    <span 
                        style={{fontSize:'30px',cursor:'pointer', padding: '10px'}} 
                        onClick={handleSideBarToggle}
                    >
                        &#9776;
                    </span>
                </>
                :
                // Drawer menu -- toggle different component render states. See Vendor component render logic.
                <SideNav id='mySideNav'>
                    <span className='closeBtn' alt="close" onClick={handleSideBarToggle}><IoCloseOutline /></span>
                    {/* The 'Home' link is not working right now */}
                    <span className='sideNavLink' onClick={() => changeState(states.HOME)}>Home</span>
                    <Link to='/registration' className='sideNavLink'>
                        <span onClick={() => changeState(states.REGISTER)}>Register</span>
                    </Link>
                    <Link to='sponsorship' className='sideNavLink'>
                        <span onClick={() => changeState(states.SPONSOR)}>Sponsor Tiers</span>
                    </Link>
                    <Link to='/booth' className='sideNavLink'>
                        <span onClick={() => changeState(states.SELECT)}>Booth Select</span>
                    </Link>
                    <Link to='/finalize' className='sideNavLink'>
                        <span onClick={() => changeState(states.FINALIZE)}>Finalize</span>
                    </Link>

                    <LogOut>
                        <h1 onClick={logout}>Logout</h1>
                    </LogOut>
                </SideNav>
            }
            <Link className={'header-logo'} to='/'>
                <img 
                    src={logo} 
                    alt={'OP Veteran VetFest logo.'} 
                />
            </Link>
            <img 
                src={user.userImg === "" ? userIcon : user.userImg} 
                alt={'User is logged in.'} 
                className={'avatar-icon'} 
                onClick={handleClick}
            />
            {showProfile ? <Profile/> : <></>}
        </HeaderContainer>
    )
}

