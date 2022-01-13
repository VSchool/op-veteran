import React, { Fragment, useState, useContext, useEffect} from "react";
import styled from "styled-components";
import { VendorContext } from "../../context/VendorProvider";
import { BoothContext } from "../../context/BoothProvider";
import { UserContext } from "../../context/UserProvider";
import { Wrapper, Container } from "../../Elements/basic";
import {Button} from '../../components/Button'

const CardContainer = styled.div`
  width: 400px;
  height: fit-content;
  margin: auto;
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12),
    0px 4px 5px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  top: 0;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const Head = styled.h1`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 17px;
  line-height: 24px;
  color: #545454;
`;
const Subheader = styled.h3`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 16px;
  color: #545454;
`;
const Breadcrumbs = styled.h2`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  color: #545454;
`;
const Logo = styled.img`
  height: 60px;
  width: auto;
`;
const Paragraph = styled.p`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 20px;
  color: #545454;
`;
const HeaderWrapper = styled.div`
  padding: 20px 0;
`;
const Hr = styled.hr`
  margin: auto;
  margin-top: ${(props) => (props.top ? props.top : "8px")};
  margin-bottom: ${(props) => (props.bottom ? props.botton : "8px")};
  background-color: #f4f4f4;
  width: 90%;
`;
const List = styled.ul`
  display: flex;
  flex-direction: row;
  margin: auto;
`;
const ItemTitle = styled.li`
`;
const ItemPrice = styled.p`
  grid-column: 2/3;
`;
const ItemQuantity = styled.p`
  grid-column: 3/4;
`;

const Finalize = (props) => {
  // const { currentVendor, getCartItems, cart, openCart } = useContext(VendorContext);
  const { currentVendor, openCart, getCartItems, cartItems, changeQuantity, localCart} = useContext(VendorContext);
  // const [cartItems, setCartItems] = useState([])

  // This was the original code which breaks
// useEffect(() => {
//   getCartItems().then(items=> {
//     // const elements = items.map((item) => <ItemTitle key={item.title}> {item.title} </ItemTitle>)
//     // setCartItems(elements)
//     items.lineItems.forEach((item)=>{
//       console.table(item.variant)
//     })
// }, [])})

// This is for testing
useEffect(() => {
  getCartItems()
}, [currentVendor])

console.log("finalize page: currentVendor ", cartItems)
  return (
    <CardContainer>
      {/* <Wrapper> */}
      <Head>Local Cart Items</Head>
      <p>Booth Selection: {localCart.primaryBoothId}</p>      
      <p>Adjacent Booth Selection: {localCart.secondaryBoothId}</p>
      
      <br/><br/>
      
      {/* Shopify Cart items list */}
      <Head>Shopift Cart Items</Head>
      {cartItems?.map(item => <article key={item}>
        <p>Product: {item.title}</p>
        {/* <p>ID: {item.id}</p> */}
        <p>Quantity: {item.quantity}</p>
        <button onClick={()=>changeQuantity(item.id, item.quantity)}>Remove</button>
        </article>
      )} 
      {/* End Shopify Cart ITems List */}
      {/* <a onClick={(e)=>console.log(e.target)} href={currentVendor.cartUrl} target="_blank">Open Cart</a> */}
      <Button buttonText="Continue to checkout" buttonStyle="primary" onClick={openCart}/>
      {/* </Wrapper> */}
    </CardContainer>
  );
};

export default Finalize;
