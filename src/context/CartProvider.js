import { createContext, useContext, useState } from 'react'
import { VendorContext } from './VendorProvider'
import { BoothContext } from './BoothProvider'
import Client from 'shopify-buy/index.unoptimized.umd'

import products from './data/shopifyProducts'

export const CartContext = createContext()

export default function CartProvider({ children }) {
  const { currentVendor, createVendor } = useContext(VendorContext)

  const { booths } = useContext(BoothContext)

  const client = Client.buildClient({
    domain: 'o-p-veteran.myshopify.com',
    storefrontAccessToken: '76c1fba5d995f6b7dbb1eb1c1c3c5745',
  })

  const [cart, setCart] = useState([])
  const localStorageCart = JSON.parse(localStorage.getItem('localCart'))
  const initState = {
    primaryBoothId: '' || localStorageCart?.primaryBoothId,
    secondaryBoothId: '' || localStorageCart?.secondaryBoothId,
  }
  const [localCart, setLocalCart] = useState(initState)
  const [loading, setLoading] = useState(true)

  const createCart = (data) => {
    console.log('createCart function called with data: ', data)
    client.checkout
      .create({
        shippingAddress: {
          address1: data.street,
          address2: data.apt,
          city: data.city,
          company: data.organization,
          country: 'United States',
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          province: data.state,
          zip: data.zip,
        },
        email: data.repEmail,
      })
      .then((checkout) => {
        console.log('From vendor provider: checkout', checkout)
        console.log('From vendor provider: checkout ID', checkout.id)
        createVendor({
          ...data,
          cartId: checkout.id,
          cartUrl: checkout.webUrl,
        })

        // updateCurrentVendor({cartId: checkout.id})
      })
      .catch((err) => console.log(err))
  }

  const getShopifyCart = () => {
    if (!currentVendor) return
    return client.checkout
      .fetch(currentVendor.cartId)
      .then((res) => {
        console.log(res.lineItems)
        const lineItemsData = res.lineItems.map((item) => {
          return {
            title: item.title,
            quantity: item.quantity,
            id: item.id,
          }
        })
        setCart(lineItemsData)
      })
      .then(() => setLoading(false))
      .catch((err) => console.log(err))
  }

  const addItemToCart = (item, boothId, electricity) => {
    console.log(`addItemToCart item: ${item} boothId: ${boothId}`)

    if (electricity) {
      return client.checkout.addLineItems(currentVendor.cartId, [
        {
          variantId: products[item],
          quantity: 1,
          customAttributes: [{ key: 'boothID', value: boothId }],
        },
        {
          variantId: products[electricity],
          quantity: 1,
          customAttributes: [{ key: 'boothID', value: boothId }],
        },
      ])
    } else {
      return client.checkout.addLineItems(currentVendor.cartId, [
        {
          variantId: products[item],
          quantity: 1,
          customAttributes: [{ key: 'boothID', value: boothId }],
        },
      ])
    }
  }

  const addPrimaryBoothToLocalCart = (boothId) => {
    setLoading(true)
    console.log('TEST PRIMARY: only setting current local cart')
    setLocalCart({ primaryBoothId: boothId })
    localStorage.setItem(
      'localCart',
      JSON.stringify({ primaryBoothId: boothId })
    )
    currentVendor && addPrimaryBoothToCart(boothId)
  }

  const addPrimaryBoothToCart = async (boothId) => {
    console.log(
      'this is the current booth selection id from addPrimaryBoothCart: ',
      boothId
    )
    // currentBooth should hold the whole booth instead of just the ID to avoid always holding
    const booth = booths.find((b) => b.id === boothId)
    if (
      ['Paladin', 'Stryker', 'Abrams', 'Bradley'].includes(
        currentVendor.sponsorship.level
      )
    ) {
      if (booth.hasElectricity) {
        const checkout = await addItemToCart(
          'freeBooth',
          boothId,
          'electricity'
        )
        await checkout.addDiscount(
          currentVendor.cartId,
          'sponsoredBoothElectricity'
        )
      } else {
        await addItemToCart('freeBooth', boothId)
      }
    } else if (
      currentVendor.isNonprofit ||
      currentVendor.isGovernmental ||
      currentVendor.isVeteranOwned
    ) {
      if (booth.hasElectricity) {
        await addItemToCart('freeBooth', boothId, 'electricity')
      } else {
        await addItemToCart('freeBooth', boothId)
      }
    } else {
      if (booth.hasElectricity) {
        await addItemToCart('standardBooth', boothId, 'electricity')
      } else {
        await addItemToCart('standardBooth', boothId)
      }
    }
    await getShopifyCart()
  }

  const addSecondaryBoothToLocalCart = (boothId) => {
    setLoading(true)
    console.log('TEST SECONDARY: only setting current local cart')
    setLocalCart((prevCart) => ({ ...prevCart, secondaryBoothId: boothId }))
    localStorage.setItem(
      'localCart',
      JSON.stringify({ ...localCart, secondaryBoothId: boothId })
    )
    currentVendor && addSecondaryBoothToCart(boothId)
  }

  const addSecondaryBoothToCart = async (boothId) => {
    const booth = booths.find((b) => b.id === boothId)
    if (
      ['Paladin', 'Stryker', 'Abrams', 'Bradley'].includes(
        currentVendor.sponsorship.level
      )
    ) {
      if (booth.hasElectricity) {
        const checkout = await addItemToCart(
          'doubleBooth',
          boothId,
          'electricity'
        )
        const electricityDiscount = await checkout.addDiscount(
          currentVendor.cartId,
          'sponsoredBoothElectricity'
        )
        await electricityDiscount.addDiscount(
          currentVendor.cartId,
          'sponsoredDoubleBooth'
        )
      } else {
        const doubleBoothCheckout = await addItemToCart('doubleBooth', boothId)
        await doubleBoothCheckout.addDiscount(
          currentVendor.cartId,
          'sponsoredDoubleBooth'
        )
      }
    } else if (
      currentVendor.isNonprofit ||
      currentVendor.isGovernmental ||
      currentVendor.isVeteranOwned
    ) {
      if (booth.hasElectricity) {
        await addItemToCart('doubleBooth', boothId, 'electricity')
      } else {
        await addItemToCart('doubleBooth', boothId)
      }
    } else {
      if (booth.hasElectricity) {
        await addItemToCart('doubleBooth', boothId, 'electricity')
      } else {
        await addItemToCart('doubleBooth', boothId)
      }
      getShopifyCart()
    }
  }

  const checkProducts = () => {
    for (let product of Object.keys(products)) {
      client.product
        .fetch(products[product])
        .then((p) => console.log(`${product}: ${Object.entries(p)}`))
    }
  }

  const changeQuantity = (itemId, currentQuantity) => {
    let newQuantity = currentQuantity - 1
    client.checkout
      .updateLineItems(currentVendor.cartId, {
        id: itemId,
        quantity: newQuantity,
      })
      .then((checkout) => {
        setCart(checkout.lineItems)
      })
  }

  const openCart = () => {
    if (!currentVendor) return
    console.log('opening cart')
    client.checkout
      .fetch(currentVendor?.cartId)
      .then((checkout) => window.open(checkout.webUrl))
  }

  const getOrderStatus = () => {
    client.checkout.fetch(currentVendor.cartId).then((checkout) => {
      const lineItems = checkout.lineItems
      const toRemove = lineItems.map((item) => item.id)
      client.checkout
        .removeLineItems(currentVendor.cartId, toRemove)
        .then(() => console.log('removed'))
    })
  }

  return (
    <CartContext.Provider
      value={{
        createCart,
        changeQuantity,
        addItemToCart,
        addPrimaryBoothToLocalCart,
        addSecondaryBoothToLocalCart,
        getShopifyCart,
        openCart,
        localCart,
        cart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
