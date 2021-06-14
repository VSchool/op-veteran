import React, {useState,  useContext} from 'react'
import styled from 'styled-components'
import {VendorContext} from "../../context/VendorProvider";
import {UserContext} from "../../context/UserProvider";

const Wrapper = styled.div`
     min-width: 311px;
    height: fit-content;
    margin: auto;
    box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 4px 5px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    background: #FFFFFF;
    display: flex;
    flex-direction: column;
    padding: 20px;
    justify-content: space-between;
    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    right:0;
    

`
const Paragraph = styled.p`

`
const Logo = styled.img`
    width: 40px;
    height: 40px;
`

const Profile = (props) =>{
    const {currentVendor, updateCurrentVendor} = useContext(VendorContext)
    const {user, updateUser} = useContext(UserContext)
    const [info, setInfo] = useState({
        organization: currentVendor.organization,
        description: currentVendor.description,
        logo: currentVendor.logo,
        primaryBooth: currentVendor.primaryBooth,
        secondaryBooth: currentVendor.secondaryBooth,
        address: currentVendor.address,
        rep: currentVendor.rep,
        repEmail: currentVendor.repEmail,
        sponsorship: currentVendor.sponsorship,
    })
    return (
<Wrapper>
        <Paragraph>Name: {info.rep}</Paragraph>
</Wrapper>
    )
}

export default Profile