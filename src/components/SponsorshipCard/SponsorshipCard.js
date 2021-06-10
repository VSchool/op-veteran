import React, {useContext, useState} from 'react'
import styled from 'styled-components'
import { Button } from '../../components/Button'
import ListItem from './ListItem'
import {UserContext} from '../../context/UserProvider'
import {VendorContext} from '../../context/VendorProvider'
import {Blur} from '../../Elements/basic'

const CardContainer = styled.div`
    width: 288px;
    height: 396px;
    margin: 8px;
    background: #FFFFFF;
    border-radius: 4px;
    border: 2px solid #EAEAEA;
    padding: 8px;
    display: flex;
    flex-direction: column;
    position: relative;
    border: ${props=>props.selected ? "solid rgb(121, 156, 138) 2px" : null};
    box-shadow: ${props=>props.selected ? "0 0 10px 10px rgba(121, 156, 138, .4)":null};
    //filter: ${props=>props.selected ? "blur(10px)" : null};
    `

    const Header = styled.h1`
        font-family: Open Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 17px;
        color: #545454;
        text-align: center;
    `
   const Subheader = styled.h3`
        height: 16px;
        font-family: Open Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 13px;
        line-height: 16px;
        color: #545454;
        text-align: center;
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
    const ModalWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 268px;
    margin: auto;
    height: 200px;
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    z-index:10;
    box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 4px 5px rgba(0, 0, 0, 0.2);
    justify-content: space-around;
    align-items: center;
    `
const Row = styled.div`
    display: flex;
    flex-direction: row;
    `
    const Paragraph = styled.p `
        font-family: 'Open Sans';
        margin: 10px;
    `
// const ModalWrapper = styled.div`
//     display: flex;
//     flex-direction: column;
//     padding: 10px;
//     position: absolute;
// `
export default function SponsorshipCard(props) {
    const { className, name, perks, changeState, states, handlePayToday, handleContactMe} = props
    const {user, updateUser} = useContext(UserContext)
    const {addItemToCart, removeItemFromCart} = props
    const {vendor, updateCurrentVendor} = useContext(VendorContext)
    const [selected, setSelected] = useState(false)
    const listItems = perks.map((perk=><ListItem key={`${name}${perk.wording}`} className={'item'} wording={perk.wording} valid={perk.valid}/>))
    const handleClick = (e)=>{
        setSelected(prev=>!prev)
    }
    const handleSelect = (e) =>{
        const status = e.target.innerText === "Pay Today" ? "in cart" : "pending"
        const item = e.target.innerText === "Pay Today" ? 
        {
            category: "sponsorship",
            name: name,
            price: "$9999"
        } :
        {
            category: "sponsorship comitment",
            name: name,
            price: "$0"
        }
        addItemToCart(item)
        updateCurrentVendor({"sponsorship.status": "in cart", "level": name})
        changeState(states.SELECT)
    }
   
    return (
        
        <CardContainer className={className} selected={selected}>
            <Header>{name}</Header>
            <Subheader>Level sponsorship</Subheader>
            <Hr className={'divider'} top="20px" bottom="12px"></Hr>
            <Price className={'price'}>{'$99,999'}</Price>
            <Perks className={'items-container'}>
                {listItems}
            </Perks>
            <Hr className={'divider2'} top="22px" bottom="16px"></Hr>
            <SponsorshipButton className={'sponsorship-button'} buttonText={'Select this level'} buttonStyle={'primary'} onClick={handleClick}/> :
            {selected ?
            <>
            <Blur width="288px" height="396px"/>
            <ModalWrapper>
                <Paragraph>Would you like to pay the sponsorship today or be contacted by an event organizer to make arrangements?</Paragraph>
                <Row>
                <Button buttonStyle="primary" buttonText="Pay Today" onClick={handleSelect}/>
                <Button buttonStyle="primary" buttonText="Contact Me" onClick={handleSelect}/>
            </Row>
            </ModalWrapper> </> : null
            }
            
            </CardContainer>
    )
}
