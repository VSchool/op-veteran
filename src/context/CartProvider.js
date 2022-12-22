import { createContext, useContext, useState } from 'react'
import { VendorContext } from './VendorProvider'
import { BoothContext } from './BoothProvider'
import Client from 'shopify-buy/index.unoptimized.umd'

import products from './data/shopifyProducts'
import { FieldsOnCorrectTypeRule } from 'graphql'
import { Input } from '../components/Input'

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

        console.log(
          'cartId after createVendor inside createCart',
          client.cartId
        ) //kelly - added

        //updateCurrentVendor({ cartId: checkout.id })  //commented out w/Maira on call 9/1
      })
      .catch((err) => console.log(err))
  }

  const getShopifyCart = () => {
    if (!currentVendor) return
    return client.checkout
      .fetch(currentVendor.cartId)
      .then((res) => {
        console.log('currentVendor from getShopifyCart', currentVendor)
        console.log(
          'currentVendor.cartId from getShopifyCart',
          currentVendor.cartId
        ) //kelly -- added to check & this console.logs too
        console.log('res.lineItems', res.lineItems) //kelly -- but this console.log shows an empty array after trying to add booth -- and shows empty on screen too??
        console.log('res from getShopifyCart', res)

        //TEST FETCH--FOR FREE BOOTH THAT WE ADDED BACK TO SHOPIFY PRODUCTS ON 11/4/22--this seems to work
        // const productId = 'gid://shopify/Product/7541532557497'
        // client.product.fetch(productId).then((product) => {
        //   // Do something with the product
        //   console.log('TEST FREE BOOTH product', product)
        // })
        //TEST FETCH OF ALL PRODUCTS
        // client.product.fetchAll().then((products) => {
        //   // Do something with the products
        //   console.log('fetch all products', products)
        // })

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
    console.log(`addItemToCart item: ${item} boothId: ${boothId}`) //kelly -- this is console.logging
    console.log('currentVendor.cartId from addItemToCart', currentVendor.cartId) //kelly added to see if coming through; this is console.logging as well
    console.log('products[item]', products[item]) //this console.logs the old freeBooth id -- but HOW?

    // products[item]= 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MzAxODQwMDc5Mjc2MQ=='
    //note:  Z Free Booth adds to cart like this when set it above, so seems like right code;
    //BUT...why is it setting to the old freeBooth code & where is this occurring b/c it's commented out in VendorProvider????

    if (electricity) {
      return client.checkout
        .addLineItems(currentVendor.cartId, [
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
        .then((res) => console.log('res from add', res.lineItems))
        .catch((err) => console.log('err from add', err))
    } else {
      return client.checkout
        .addLineItems(currentVendor.cartId, [
          {
            variantId: products[item],
            quantity: 1,
            customAttributes: [{ key: 'boothID', value: boothId }],
          },
        ])
        .then((res) => console.log('res from add', res.lineItems))
        .catch((err) => console.log('err from add', err))
    }
  }

  const addPrimaryBoothToLocalCart = (boothId) => {
    setLoading(true)
    console.log('boothId', boothId) //kelly added to see if anything set here
    console.log('TEST PRIMARY: only setting current local cart') //kelly -- this console.logs
    setLocalCart({ primaryBoothId: boothId })
    localStorage.setItem(
      'localCart',
      JSON.stringify({ primaryBoothId: boothId }) //kelly -- this shows up in local storage
    )
    currentVendor && addPrimaryBoothToCart(boothId)
  }

  const addPrimaryBoothToCart = async (boothId) => {
    console.log(
      'this is the current booth selection id from addPrimaryBoothCart: ', //kelly -- this console.logs
      boothId
    )
    // currentBooth should hold the whole booth instead of just the ID to avoid always holding
    const booth = booths.find((b) => b.id === boothId)
    const tier1 = ['Paladin', 'Stryker', 'Abrams', 'Bradley']
    console.log('Cart provider - current vendor')
    console.log(currentVendor)
    if (tier1.some((tier) => currentVendor.sponsorshipLevel.includes(tier))) {
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
      console.log("isNonProfit/isVet/isGov't")

      if (booth.hasElectricity) {
        await addItemToCart('freeBooth', boothId, 'electricity')
      } else {
        await addItemToCart('freeBooth', boothId)
      }
    } else {
      console.log('regular user')
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
    const tier1 = ['Paladin', 'Stryker', 'Abrams', 'Bradley']
    const booth = booths.find((b) => b.id === boothId)
    if (tier1.some((tier) => currentVendor.sponsorshipLevel.includes(tier))) {
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
