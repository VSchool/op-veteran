import React, {useContext} from 'react'
import styled from 'styled-components'
import { Button } from '../../components/Button'
import ListItem from './ListItem'
import {UserContext} from '../../context/UserProvider'
import {VendorContext} from '../../context/VendorProvider'



const CardContainer = styled.div`
    width: 100%;
    margin: 8px;
    background: #FFFFFF;
    border-radius: 4px;
    border: 2px solid #EAEAEA;
    padding: 8px;
    display: flex;
    flex-direction: column;
    `

    const Header = styled.h1`
        font-family: Open Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 17px;
        color: #545454;
    `
   const Subheader = styled.h3`
        height: 16px;
        font-family: Open Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 13px;
        line-height: 16px;
        color: #545454;
   `

   const Hr = styled.hr`
    margin: auto;
    margin-top: ${props=>props.top ? props.top : "8px"};
    margin-bottom: ${props=>props.bottom ? props.botton : "8px"};
    background-color: #F4F4F4;
    width: 90%;
   `

const Price = styled.h1`
    font-family: Open Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 27px;
    line-height: 36px;
    text-align: center;
    letter-spacing: 0.02em;
    color: #696969;
    margin-top: 20px;
`

    const SponsorshipButton = styled(Button)`
        margin: 16px auto;
        padding: 4px 8px; 
    `

    const Perks = styled.div`
        
        width: 100%;
        //height: 184px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        // border: 1px solid orange;
`

export default function SponsorshipCard(props) {
    const { className, name, perks, changeState, states} = props
  
    const {user, updateUser} = useContext(UserContext)
    const {vendor, updateCurrentVendor} = useContext(VendorContext)
    const listItems = perks.map((perk=><ListItem key={`${name}${perk.wording}`} className={'item'} wording={perk.wording} valid={perk.valid}/>))
    const handleClick = (e) =>{
        e.preventDefault()
        updateCurrentVendor({sponsorship: {level: name, finalized: false}})
        changeState(states.SELECT)
    }
    return (
        <CardContainer className={className}>
            <Header>{name}</Header>
            <Subheader>Level sponsorship</Subheader>
            <Hr className={'divider'} top="20px" bottom="12px"></Hr>
            <Price className={'price'}>{'$99,999'}</Price>
            <Perks className={'items-container'}>
                {listItems}
            </Perks>
            <Hr className={'divider2'} top="22px" bottom="16px"></Hr>
            <SponsorshipButton className={'sponsorship-button'} buttonText={'Select this level'} buttonStyle={'secondary'} onClick={handleClick}/>
        </CardContainer>
    )
}
