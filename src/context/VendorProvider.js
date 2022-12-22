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
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'
import axios from 'axios'
const vendorRef = firestore.collection('vendors')
const batch = firestore.batch()

//COMMENTED PRODUCTS OUT HERE B/C DO NOT THINK THIS CODE BELOW IS BEING UTILIZED (note: products info is in ./data/shopifyProducts & accessed in CartProvider )
// const products = {
//   Paladin: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zODgyMzc3NjgxMzI0MQ==',
//   Abrams: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zODgyMzc3Njg0NjAwOQ==',
//   Stryker: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zODgyMzc3Njg3ODc3Nw==',
//   Bradley: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zODgyMzc3NjkxMTU0NQ==',
//   Amtrak: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zODgyMzc3Njk0NDMxMw==',
//   WLA: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zODgyMzc3Njk3NzA4MQ==',
//   doubleBooth: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDI0NDgxODU3NTU0NQ==',
//   electricity: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDI0NDgxODU0Mjc3Nw==',
//   freeBooth: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MzAxODQwMDc5Mjc2MQ==',   //new code after deleted
//   standardBooth: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDI0NDgxODQ0NDQ3Mw==',
//   PaladinPromise:
//     'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDI2NzYzMjY0MDE4NQ==',
//   AbramsPromise: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDI2NzYzMjY3Mjk1Mw==',
//   StrykerPromise:
//     'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDI2NzYzMjcwNTcyMQ==',
//   BradleyPromise:
//     'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDI2NzYzMjczODQ4OQ==',
//   AmtrakPromise: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDI2NzYzMjc3MTI1Nw==',
//   WLAPromise: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDI2NzYzMjgwNDAyNQ==',
// }

//Kelly -- NOTES re: product info:
// freeBooth: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDI0NDgxODUxMDAwOQ==', //this is original code for free booth that was deleted --
//freeBooth: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MzAxODQwMDc5Mjc2MQ==', //this is the new free booth that we had to add back  //new Z free booth:  gid://shopify/ProductVariant/43018400792761
//this line right above decodes to gid://shopify/ProductVariant/40244818510009 (note: this console.logging as products[item] even though product was deleted & commented out here??)
//   doubleBooth: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDI0NDgxODU3NTU0NQ=='; this decodes to gid://shopify/ProductVariant/40244818575545
//  electricity: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDI0NDgxODU0Mjc3Nw==', //this decodes to gid://shopify/ProductVariant/40244818542777
//  standardBooth: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDI0NDgxODQ0NDQ3Mw==',  //this decodes to gid://shopify/ProductVariant/40244818444473

//10x20 booth fee:  https://o-p-veteran.myshopify.com/admin/products/6777794134201
//powered booth fee:  https://o-p-veteran.myshopify.com/admin/products/6777794101433
//Z free booth:  https://o-p-veteran.myshopify.com/admin/products/7541532557497

export const VendorContext = createContext()

export default function VendorProvider({ children }) {
  const [primaryMode, setPrimaryMode] = useState(true)
  const [holdingCell, setHoldingCell] = useState([])
  const { user, reserveBooth: reserve } = useContext(UserContext)

  const initState = JSON.parse(localStorage.getItem('currentVendor')) || null

  const [currentVendor, setCurrentVendor] = useState(initState)

  // This should work if we can get the cartId properly.  Doesnt appear its in the
  // currentVendor data becasue createCart function is never called

  // ORIGINAL EDIT/UPDATE CODE using update
  //   const updateCurrentVendor = (data) => {
  //   if (!currentVendor) {
  //     return
  //   }
  //   setCurrentVendor((prevState) => ({
  //     ...prevState,
  //     ...data,
  //     address: {
  //       street: data.address.street,
  //       city: data.address.city,
  //       state: data.address.state,
  //       zip: data.address.zip,
  //     },
  //   }))

  //   vendorRef
  //     .doc(`${currentVendor.organization}`)
  //     .update({
  //       ...currentVendor,
  //       ...data,
  //       address: {
  //         street: data.address.street,
  //         city: data.address.city,
  //         state: data.address.state,
  //         zip: data.address.zip,
  //       },
  //     })
  //     .catch((err) => console.log(err))
  // }

  //ORIGINAL EDIT/UPDATE CODE using update -- but with KR changes;
  //NOTE:  THIS ONE WORKS w/o duplicating info in Firebase when make edit
  const updateCurrentVendor = ({ city, state, street, zip, ...data }) => {
    //kelly -- attempting to destructure data to exclude address & avoid duplicate info in Firebase doc

    if (!currentVendor) {
      return
    }
    setCurrentVendor({
      city,
      state,
      street,
      zip,
      ...data,
    })

    vendorRef
      .doc(`${currentVendor.organization}`)
      .update({
        // {...currentVendor, //kelly- if use ...currentVendor instead of ...data-- does not work
        ...data, //kelly - hopefully this now excludes the extra address "stuff"
        address: {
          street: street, //instead of data.address.street here & for the 3 fields below, now changed to street, etc. b/c of destructuring above
          city: city,
          state: state,
          zip: zip,
        },
        rep: `${data.firstName} ${data.lastName}`,
      })
      .catch((err) => console.log(err))
  }

  // This funciton is unused and is the root of the Shopify problem because its not saving the cart ID
  // Need to figure out where to integrate it. On the RegistrationForm component would likely make the most sense.

  // Need to use the createCart function before this is called for this
  // function to work so we can have a cartId and checkout.id
  // best to split into 2
  const createVendor = (data) => {
    console.log('vendor data', data) //kelly added to check what's coming in--this seems to have reg info that I added
    // this gets called from createVendor so it works in conjuction with createCart.
    // after createCart returns cart Id, it calls createVendor
    const currentVendorData = {
      firstName: data.firstName,
      lastName: data.lastName,
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
      isGovernmental: data.isGovernmental, //changed from data.governmental
      isNonprofit: data.isNonprofit, //changed from data.nonprofit
      isVeteranOwned: data.isVeteranOwned, //changed from data.vetOwned
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
        status: data.isSponsor ? 2 : 0, //fixed typo here -- changed "staus" to "status"
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

    // console.log('currentVendorData', currentVendorData) //kelly added as checkpoint
    // console.log('vendorRef.doc', vendorRef.doc) //kelly added as checkpoint
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

  const saveCurrentVendor = (data) => {
    localStorage.setItem('currentVendor', JSON.stringify(data))
    setCurrentVendor(data)
  }

  const matchVendor = () => {
    if (user && currentVendor === null) {
      console.log(`matching vendor with ${user?.email}`)
      vendorRef
        .where('repEmail', '==', user.email)
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            saveCurrentVendor(doc.data())
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

  return (
    <VendorContext.Provider
      value={{
        currentVendor,
        createVendor,
        deleteVendor,
        matchVendor,
        updateCurrentVendor,
        storeFile,
        primaryMode,
        setPrimaryMode,
      }}
    >
      {children}
    </VendorContext.Provider>
  )
}
