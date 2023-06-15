import { createContext, useContext, useState } from 'react'
import { VendorContext } from './VendorProvider'
import { BoothContext } from './BoothProvider'
import Client from 'shopify-buy/index.unoptimized.umd'
import { useNavigate } from 'react-router-dom'

import products from './data/shopifyProducts'
// import { FieldsOnCorrectTypeRule } from 'graphql'
// import { Input } from '../components/Input'

export const CartContext = createContext()

export default function CartProvider({ children }) {
  const { currentVendor, createVendor } = useContext(VendorContext)

  // const navigate = useNavigate()

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
        ) 

      })
      .catch((err) => console.log(err))
  }

  const getShopifyCart = () => {
    console.log('getShopifyCart called')

    if (!currentVendor) return
    return client.checkout
      .fetch(currentVendor.cartId)
      .then((res) => {
        console.log('currentVendor from getShopifyCart', currentVendor)
        console.log(
          'currentVendor.cartId from getShopifyCart',
          currentVendor.cartId
        ) 
        console.log('res.lineItems', res.lineItems)
        console.log('res from getShopifyCart', res)

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
    console.log('currentVendor.cartId from addItemToCart', currentVendor.cartId)
    console.log('products[item]', products[item])

    // products[item]= 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MzAxODQwMDc5Mjc2MQ=='
    //note:  Z Free Booth adds to cart like this when set it above, so seems like right code;

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
    console.log('boothId', boothId)
    console.log('TEST PRIMARY: only setting current local cart')
    setLocalCart({ primaryBoothId: boothId })
    localStorage.setItem(
      'localCart',
      JSON.stringify({ primaryBoothId: boothId })
    )
  }

  const addPrimaryBoothToCart = async (boothId) => {
    console.log(
      'this is the current booth selection id from addPrimaryBoothCart: ', 
      boothId
    )

    // currentBooth should hold the whole booth instead of just the ID to avoid always holding
    const booth = booths.find((b) => b.id === boothId)

    console.log('booth.hasElectricity primary', booth.hasElectricity)

    const tier1 = ['Paladin', 'Stryker', 'Abrams', 'Bradley']
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
  }

  const addSecondaryBoothToLocalCart = (boothId) => {
    setLoading(true)
    console.log('TEST SECONDARY: only setting current local cart')
    setLocalCart((prevCart) => ({ ...prevCart, secondaryBoothId: boothId }))
    localStorage.setItem(
      'localCart',
      JSON.stringify({ ...localCart, secondaryBoothId: boothId })
    )
  }

  const clearAndLoadShopifyCart = async (
    currentVendor,
    primaryBoothId,
    secondaryBoothId
  ) => {
    console.log('clearLineItemsFrom Cart Called')

    const checkoutId = currentVendor.cartId

    console.log('checkoutId from clear cart', checkoutId)
    console.log('cart before remove items', cart)

    const lineItemsToRemove = await cart.map((item) => item.id)

    console.log('lineItemsToRemove', lineItemsToRemove)

    await client.checkout
      .removeLineItems(checkoutId, lineItemsToRemove)

      .then(async (checkout) => {
        console.log(
          'checkout.lineItems after remove all line item ids',
          checkout.lineItems
        )

        await addPrimaryBoothToCart(primaryBoothId)

        if (secondaryBoothId) {
          await addSecondaryBoothToCart(secondaryBoothId)
        }

        await getShopifyCart()

        await openCart()
      })
  }

  const addSecondaryBoothToCart = async (boothId) => {
    console.log(
      'this is the current booth selection id from addSecondaryBoothCart: ',
      boothId
    )

    const tier1 = ['Paladin', 'Stryker', 'Abrams', 'Bradley']
    const booth = booths.find((b) => b.id === boothId)

    console.log('booth.hasElectricity secondary', booth.hasElectricity)
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
    }
  }

  // const checkProducts = () => {
  //   for (let product of Object.keys(products)) {
  //     client.product
  //       .fetch(products[product])
  //       .then((p) => console.log(`${product}: ${Object.entries(p)}`))
  //   }
  // }

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

  // const getOrderStatus = () => {
  //   client.checkout.fetch(currentVendor.cartId).then((checkout) => {
  //     const lineItems = checkout.lineItems
  //     const toRemove = lineItems.map((item) => item.id)
  //     client.checkout
  //       .removeLineItems(currentVendor.cartId, toRemove)
  //       .then(() => console.log('removed'))
  //   })
  // }

  return (
    <CartContext.Provider
      value={{
        createCart,
        changeQuantity,
        addItemToCart,
        addPrimaryBoothToLocalCart,
        addSecondaryBoothToLocalCart,
        clearAndLoadShopifyCart,
        getShopifyCart,
        openCart,
        localCart,
        setLocalCart,
        cart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
