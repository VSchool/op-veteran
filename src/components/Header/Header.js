import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { AuthContext } from "../../context/AuthProvider";
import { UserContext } from "../../context/UserProvider";
import exitIcon from '../../assets/icons/exit-icon.svg'
import logo from '../../assets/images/vetfest-logo.png'
import userIcon from '../../assets/icons/avatar-icon.svg'
import {Profile} from '../Profile'

const HeaderContainer = styled.div`
    position: relative;
    height: 88px;
    padding: 20px;
    box-shadow:
    inset 0 -3em 3em rgba(0,0,0,0.1),
          0 0  0 2px rgb(58, 80, 68),
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

export default function Header() {
	const { logout } = useContext(AuthContext);
    const {user}=useContext(UserContext);
    const [showProfile, setShowProfile] = useState(false)
    const handleClick = ()=>{
        setShowProfile((prev)=>!prev)
    }
    return (
        <HeaderContainer>
            {/* <img src={exitIcon} alt={'Click to exit.'} className={'exit-icon'} onClick={logout} /> */}
            <img src={logo} alt={'OP Veteran VetFest logo.'} className={'header-logo'} />
            <img src={user.userImg === "" ? userIcon : user.userImg} alt={'User is logged in.'} className={'avatar-icon'} onClick={handleClick}/>
            {showProfile ? <Profile/> : null}
        </HeaderContainer>
    )
}
