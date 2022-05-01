import React, { createContext, useState } from 'react'
import Client from 'shopify-buy/index.unoptimized.umd'
import products from './data/shopifyProducts'

export const ShopifyContext = createContext()

export default function ShopifyProvider({ children }) {
  const client = Client.buildClient({
    domain: 'o-p-veteran.myshopify.com',
    storefrontAccessToken: '76c1fba5d995f6b7dbb1eb1c1c3c5745',
  })
  const [cartItems, setCartItems] = useState(null)
  const [localCart, setLocalCart] = useState({
    primaryBoothId: '',
    secondaryBoothId: '',
  })

  const getCartItems = () => {
    if (!currentVendor) return
    client.checkout
      .fetch(currentVendor?.cartId)
      .then((res) => {
        console.log('dec 7: fetched cart items!!', res.lineItems)
        setCartItems(res.lineItems)
      })
      .catch((err) => console.log(err))
  }

  // This function is unused and is the root of the Shopify problem because its not saving the cart ID
  // Need to figure out where to integrate it. On the RegistrationForm component would likely make the most sense.
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

  const checkProducts = () => {
    for (let product of Object.keys(products)) {
      client.product
        .fetch(products[product])
        .then((p) => console.log(`${product}: ${Object.entries(p)}`))
    }
  }

  const openCart = () => {
    if (!currentVendor) return
    console.log('opening cart')
    client.checkout
      .fetch(currentVendor?.cartId)
      .then((checkout) => window.open(checkout.webUrl))
  }

  const changeQuantity = (itemId, currentQuantity) => {
    /*
    
    const lineItemsToUpdate = [
  {id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ=', quantity: 2}
];

// Update the line item on the checkout (change the quantity or variant)
client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then((checkout) => {
  // Do something with the updated checkout
  console.log(checkout.lineItems); // Quantity of line item 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ=' updated to 2
});

    */
    let newQuantity = currentQuantity - 1
    client.checkout
      .updateLineItems(currentVendor.cartId, {
        id: itemId,
        quantity: newQuantity,
      })
      .then((checkout) => {
        setCartItems(checkout.lineItems)
      })
  }

  const addItemToCart = (item, boothId) => {
    return client.checkout.addLineItems(currentVendor.cartId, [
      {
        variantId: products[item],
        quantity: 1,
        customAttributes: [{ key: 'boothID', value: boothId }],
      },
    ])
  }
  const storeFile = (file, path) => {
    const storageRef = Storage.ref(path)
    storageRef
      .put(file)
      .then((snapShot) => {
        storageRef.getDownloadURL().then((url) => {
          updateCurrentVendor({ logo: url })
        })
      })
      .catch((err) => console.log(err))
  }
  // const matchVendor = () => {   const query = vendorRef     .where("repEmail",
  // "==", user.email)     .onSnapshot((querySnapshot) => {
  // querySnapshot.forEach((doc)=>{       setCurrentVendor(doc.data())       })  }
  //     )   }
  const matchVendor = () => {
    if (user && currentVendor === null) {
      console.log(`matching vendor with ${user?.email}`)
      vendorRef
        .where('repEmail', '==', user.email)
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setCurrentVendor(doc.data())
          })
        })
    }
  }

  return <ShopifyContext.Provider>{children}</ShopifyContext.Provider>
}
