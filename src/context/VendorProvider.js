import react, { createContext, useContext, useEffect, useState } from 'react'
import firestore from '../database'
import Firebase, { Storage } from '../Firebase'
import { UserContext } from './UserProvider'
import { BoothContext } from './BoothProvider'
// import vendorData from "../testing/vendors.json";
import Client from 'shopify-buy/index.unoptimized.umd'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'
import axios from 'axios'
const vendorRef = firestore.collection('vendors')
const batch = firestore.batch()
const products = {
  Paladin: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zODgyMzc3NjgxMzI0MQ==',
  Abrams: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zODgyMzc3Njg0NjAwOQ==',
  Stryker: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zODgyMzc3Njg3ODc3Nw==',
  Bradley: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zODgyMzc3NjkxMTU0NQ==',
  Amtrak: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zODgyMzc3Njk0NDMxMw==',
  WLA: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zODgyMzc3Njk3NzA4MQ==',
  doubleBooth: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDI0NDgxODU3NTU0NQ==',
  electricity: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDI0NDgxODU0Mjc3Nw==',
  freeBooth: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDI0NDgxODUxMDAwOQ==',
  standardBooth: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDI0NDgxODQ0NDQ3Mw==',
  PaladinPromise:
    'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDI2NzYzMjY0MDE4NQ==',
  AbramsPromise: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDI2NzYzMjY3Mjk1Mw==',
  StrykerPromise:
    'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDI2NzYzMjcwNTcyMQ==',
  BradleyPromise:
    'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDI2NzYzMjczODQ4OQ==',
  AmtrakPromise: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDI2NzYzMjc3MTI1Nw==',
  WLAPromise: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDI2NzYzMjgwNDAyNQ==',
}

export const VendorContext = createContext()

export default function VendorProvider({ children }) {
  const [primaryMode, setPrimaryMode] = useState(true)
  const [holdingCell, setHoldingCell] = useState([])
  const { user, reserveBooth: reserve } = useContext(UserContext)
  const [currentVendor, setCurrentVendor] = useState(null)
  const { booths, statusCodes, resetBooth } = useContext(BoothContext)
  const [cartItems, setCartItems] = useState(null)
  const client = Client.buildClient({
    domain: 'o-p-veteran.myshopify.com',
    storefrontAccessToken: '76c1fba5d995f6b7dbb1eb1c1c3c5745',
  })

  // test
  const [localCart, setLocalCart] = useState({
    primaryBoothId: '',
    secondaryBoothId: '',
  })

  // This should work if we can get the cartId properly.  Doesnt appear its in the
  // currentVendor data becasue createCart function is never called
  const getCartItems = () => {
    client.checkout
      .fetch(currentVendor?.cartId)
      .then((res) => {
        console.log('dec 7: fetched cart items!!', res.lineItems)
        setCartItems(res.lineItems)
      })
      .catch((err) => console.log(err))
  }

  const updateCurrentVendor = (data) => {
    // const updatedVendor = {   ...currentVendor,   ...data }
    if (!currentVendor) {
      return
    }
    vendorRef
      .doc(`${currentVendor.organization}`)
      .update(data)
      .catch((err) => console.log(err))
  }

  // This funciton is unused and is the root of the Shopify problem because its not saving the cart ID
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

  // Need to use the createCart function before this is called for this
  // function to work so we can have a cartId and checkout.id
  // best to split into 2
  const createVendor = (data) => {
    // this gets called from createVendor so it works in conjuction with createCart.
    // after createCart returns cart Id, it calls createVendor
    const currentVendorData = {
      cartId: data.cartId, // Doesnt appear this info saved? // THIS IS CHECKOUT ID
      cartUrl: data.cartUrl,
      address: {
        street: data.street,
        apt: data.apt,
        city: data.city,
        state: data.state,
        zip: data.zip,
      },
      phone: data.phone,
      rep: `${data.firstName} ${data.lastName}`,
      repEmail: user.email,
      isGovernmental: data.governmental,
      isNonprofit: data.nonprofit,
      isVeteranOwned: data.vetOwned,
      description: data.description,
      organization: data.organization,
      booth: {
        primary: {
          id: null,
          status: 0,
        },
        secondary: {
          id: null,
          status: 0,
        },
      },
      sponsorship: {
        interested: data.wantToSponsor,
        level: data.isSponsor ? data.sponsorshipLevel : null,
        staus: data.isSponsor ? 2 : 0,
      },
      logo: null,
    }
    vendorRef
      .doc(data.organization)
      .set(currentVendorData)
      .then(() => matchVendor())
      .catch((err) => console.log(err))
    // const shippingAddress = {
    //   address1: data.street,
    //   address2: data.apt,
    //   city: data.city,
    //   company: data.organization,
    //   country: 'United States',
    //   firstName: data.fisttName,
    //   lastName: data.lastName,
    //   phone: data.phone,
    //   province: data.state,
    //   zip: data.zip
    // }
    // const email = data.repEmail
    // client
    //   .checkout
    //   .create({shippingAddress, email})
    //   .then((checkout => {
    // }))
  }

  const checkProducts = () => {
    for (let product of Object.keys(products)) {
      client.product
        .fetch(products[product])
        .then((p) => console.log(`${product}: ${Object.entries(p)}`))
    }
  }
  // useEffect(() => { vendorData.forEach(b => { batch.set(vendorRef.doc(b.id),
  // b); }); batch.commit().catch(err => console.error(err)); }, []); useEffect(()
  // => { 	const unsub = vendorRef.onSnapshot(snap => { 		const list = {}; 		const
  // removeKeys = []; 		snap.docChanges.forEach(change => { 			if (change.type ===
  // "removed") { 				removeKeys.push(change.doc.id); 			} else {
  // 				list[change.doc.id] = change.doc.data(); 			} 		}); 		setVendors(prev =>
  // { 			const copy = {...prev}; 			removeKeys.forEach(k => delete copy[k]);
  // 			return {...copy, ...list}; 		}); 	}, err => console.error(err)); 	return
  // unsub; }, [setVendors]); useEffect(() => { 	if (selectedVendor) {
  // 		setSelectedVendor(prev => vendors[prev.id]); 	} }, [vendors,
  // setSelectedVendor]);

  const openCart = () => {
    // This Doesnt work becasue I cant get a valid cartId
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

  const deleteVendor = (id) => {
    vendorRef
      .doc(id)
      .delete()
      .catch((err) => console.error(err))
  }
  // useEffect(() => {   matchVendor() }, [])  useEffect(() => {        if
  // (currentVendor?.booths?.primary?.status != undefined) {
  // setPrimaryMode(!currentVendor.booths.primary.status)        }  },
  // [currentVendor])

  // test to check if it's okay to make localcart
  const addPrimaryBoothToLocalCart = (boothId) => {
    console.log('TEST PRIMARY: only setting current local cart')
    setLocalCart({ primaryBoothId: boothId })
  }

  const addSecondaryBoothToLocalCart = (boothId) => {
    console.log('TEST SECONDARY: only setting current local cart')
    setLocalCart((prevCart) => ({ ...prevCart, secondaryBoothId: boothId }))
  }

  const addPrimaryBoothToCart = (boothId) => {
    console.log(
      'this is the current booth selection id from addPrimaryBoothCart: ',
      boothId
    )
    //currentBooth should hold the whole booth instead of just the ID to avoid always holding
    const booth = booths.find((b) => b.id === boothId)
    if (
      ['Paladin', 'Stryker', 'Abrams', 'Bradley'].includes(
        currentVendor.sponsorship.level
      )
    ) {
      addItemToCart('freeBooth', boothId)
        .then(() => {
          if (booth.hasElectricity) {
            addItemToCart('electricity').then((checkout) =>
              checkout.addDiscount(
                currentVendor.cartId,
                'sponsoredBoothElectricity'
              )
            )
          }
        })
        .catch((err) => console.log(err))
    } else if (
      currentVendor.isNonprofit ||
      currentVendor.isGovernmental ||
      currentVendor.isVeteranOwned
    ) {
      addItemToCart('freeBooth')
        .then(() => {
          if (booth.hasElectricity) {
            addItemToCart('electricity', boothId)
              .then((checkout) => console.log(checkout))
              .catch((err) => console.log(err))
          }
        })
        .catch((err) => console.log(err))
    } else {
      addItemToCart('standardBooth', boothId)
        .then(() => {
          if (booth.hasElectricity) {
            addItemToCart('electricity', boothId)
              .then((checkout) => console.log(checkout))
              .catch((err) => console.log(err))
          }
        })
        .catch((err) => console.log(err))
    }

    // may have to refactor this part
    updateCurrentVendor({
      'booth.primary': {
        id: boothId,
        status: 1,
      },
    })
  }

  const addSecondaryBoothToCart = (boothId) => {
    const booth = booths.find((b) => b.id === boothId)
    if (
      ['Paladin', 'Stryker', 'Abrams', 'Bradley'].includes(
        currentVendor.sponsorship.level
      )
    ) {
      addItemToCart('doubleBooth', boothId)
        .then((checkout) =>
          checkout.addDiscount(currentVendor.cartId, 'sponsoredDoubleBooth')
        )
        .then(() => {
          if (booth.hasElectricity) {
            addItemToCart('electricity')
          }
        })
        .then((checkout) =>
          checkout.addDiscount(
            currentVendor.cartId,
            'sponsoredBoothElectricity'
          )
        )
        .catch((err) => console.log(err))
    } else if (
      currentVendor.isNonprofit ||
      currentVendor.isGovernmental ||
      currentVendor.isVeteranOwned
    ) {
      addItemToCart('doubleBooth', boothId)
        .then(() => {
          if (booth.hasElectricity) {
            addItemToCart('electricity').then((checkout) =>
              console.log(checkout)
            )
          }
        })
        .catch((err) => console.log(err))
    } else {
      addItemToCart('doubleBooth', boothId)
        .then(() => {
          if (booth.hasElectricity) {
            addItemToCart('electricity')
              .then((checkout) => console.log(checkout))
              .catch((err) => console.log(err))
          }
        })
        .catch((err) => console.log(err))
    }

    // may have to refactor this part
    updateCurrentVendor({
      'booth.secondary': {
        id: boothId,
        status: 1,
      },
    })
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
    <VendorContext.Provider
      value={{
        currentVendor,
        createVendor,
        deleteVendor,
        matchVendor,
        updateCurrentVendor,
        storeFile,
        cartItems,
        changeQuantity,
        addItemToCart,
        addPrimaryBoothToCart,
        addSecondaryBoothToCart,
        addPrimaryBoothToLocalCart,
        addSecondaryBoothToLocalCart,
        createCart,
        checkProducts,
        primaryMode,
        setPrimaryMode,
        getCartItems,
        openCart,
        getOrderStatus,
        client,
        localCart,
      }}
    >
      {children}
    </VendorContext.Provider>
  )
}
