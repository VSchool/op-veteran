import React, { Fragment, useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { VendorContext } from '../../context/VendorProvider'
import { BoothContext } from '../../context/BoothProvider'
import { UserContext } from '../../context/UserProvider'
import { Wrapper, Container, PageContainer } from '../../Elements/basic'
import { Button } from '../../components/Button'
import StatusMessage from '../../components/StatusMessage'
import { useNavigate } from 'react-router-dom'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CardContainer = styled.div`
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.4);
  border-radius: 0.5rem;
  background: #ffffff;
  padding: 30px;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & button {
    width: 50%;
  }
`

const CartContainer = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 20px;
`

const Head = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 17px;
  line-height: 24px;
  color: #1abc9c;
  background-color: #ffffff;
  padding: 10px;
  width: 100%;
  text-align: center;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  border-bottom: 1px solid #e6e6e6;
`

const Cart = styled.div`
  margin-bottom: 30px;
  border: 1px solid #e6e6e6;
  border-radius: 0.5rem;

  div:last-child {
    border: none;
  }
`

const LocalCart = styled.div`
  p {
    font-weight: bold;
    color: #2980b9;
  }
`

const EmptyCart = styled.p`
  font-weight: bold;
  color: #e67e22;
  padding: 10px;
`

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #e6e6e6;

  p {
    margin: 5px;
  }
`

const Product = styled.div`
  display: flex;
  justify-content: space-between;

  p {
    font-weight: bold;
    color: #16a085;
  }
`

const ProductOptions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > p {
    font-weight: bold;
  }
`

const TrashButton = styled.a`
  color: #c0392b;
  opacity: 0.7;
  cursor: pointer;
  font-size: 1.5rem;
  margin-left: 5px;

  &:hover {
    opacity: 1;
  }
`

const Finalize = (props) => {
  // const { currentVendor, getCartItems, cart, openCart } = useContext(VendorContext);
  const navigate = useNavigate()
  const {
    currentVendor,
    openCart,
    getCartItems,
    cartItems,
    changeQuantity,
    localCart,
    loading,
    getShopifyCart,
  } = useContext(VendorContext)
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
    getShopifyCart()
  }, [])

  return (
    <PageContainer>
      <CardContainer>
        <CartContainer>
          {/* <Wrapper> */}
          <Cart>
            <LocalCart>
              <Head style={{ color: '#3498db' }}>Local Cart Items</Head>
              <ProductWrapper>
                <p>
                  Booth Selection:{' '}
                  <span style={{ fontFamily: 'Roboto Mono' }}>
                    {localCart.primaryBoothId}
                  </span>
                </p>
              </ProductWrapper>
              <ProductWrapper>
                <p>
                  Adjacent Booth Selection:{' '}
                  <span style={{ fontFamily: 'Roboto Mono' }}>
                    {localCart.secondaryBoothId}
                  </span>
                </p>
              </ProductWrapper>
            </LocalCart>
          </Cart>

          {/* Shopify Cart items list */}

          {loading ? (
            <Head>Loading Cart Items...</Head>
          ) : (
            <>
              <Cart>
                <Head>Shopify Cart Items</Head>
                {cartItems.length === 0 && (
                  <EmptyCart>Your cart is empty</EmptyCart>
                )}
                {cartItems?.map((item, index) => (
                  <ProductWrapper key={item + index}>
                    <Product>
                      <p>{item.title}</p>
                      {/* <p>ID: {item.id}</p> */}
                      <ProductOptions>
                        <p>{item.quantity}</p>
                        <TrashButton
                          onClick={() => changeQuantity(item.id, item.quantity)}
                        >
                          <FontAwesomeIcon icon={faTrash} size='xs' />
                        </TrashButton>{' '}
                      </ProductOptions>
                    </Product>
                  </ProductWrapper>
                ))}
              </Cart>
            </>
          )}
        </CartContainer>

        {/* End Shopify Cart ITems List */}
        {/* <a onClick={(e)=>console.log(e.target)} href={currentVendor.cartUrl} target="_blank">Open Cart</a> */}

        {!currentVendor ? (
          <>
            <StatusMessage
              className={'status-message'}
              message={
                'You must register to checkout. Please register to continue.'
              }
              animationTime={5000}
            />
            <Button
              buttonText='Register to continue'
              buttonStyle='primary'
              onClick={() => navigate('/registration')}
            />
          </>
        ) : cartItems.length === 0 ? (
          <Button
            buttonText='Continue to Booth selection'
            buttonStyle='primary'
            onClick={() => navigate('/booth-selection')}
          />
        ) : (
          <Button
            buttonText='Continue to checkout'
            buttonStyle='primary'
            onClick={openCart}
          />
        )}

        {/* </Wrapper> */}
      </CardContainer>
    </PageContainer>
  )
}

export default Finalize
