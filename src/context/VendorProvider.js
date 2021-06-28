import react, {createContext, useContext, useEffect, useState} from "react";
import firestore from "../database";
import Firebase, {Storage} from '../Firebase'
import {UserContext} from "./UserProvider";
import {BoothContext} from "./BoothProvider";
// import vendorData from "../testing/vendors.json";
import Client from 'shopify-buy';

const vendorRef = firestore.collection("vendors");
const batch = firestore.batch();
const products = {
  Paladin: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zODgyMzc3NjgxMzI0MQ==",
  Abrams: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zODgyMzc3Njg0NjAwOQ==",
  Stryker: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zODgyMzc3Njg3ODc3Nw==",
  Bradley: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zODgyMzc3NjkxMTU0NQ==",
  Amtrak: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zODgyMzc3Njk0NDMxMw==",
  WLA: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zODgyMzc3Njk3NzA4MQ==",
  doubleBooth: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDI0NDgxODU3NTU0NQ==",
  electricity: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDI0NDgxODU0Mjc3Nw==",
  freeBooth: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDI0NDgxODUxMDAwOQ==",
  standardBooth: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDI0NDgxODQ0NDQ3Mw==",
  PaladinPromise: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDI2NzYzMjY0MDE4NQ==",
  AbramsPromise: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDI2NzYzMjY3Mjk1Mw==",
  StrykerPromise: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDI2NzYzMjcwNTcyMQ==",
  BradleyPromise: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDI2NzYzMjczODQ4OQ==",
  AmtrakPromise: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDI2NzYzMjc3MTI1Nw==",
  WLAPromise: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDI2NzYzMjgwNDAyNQ=="
}

export const VendorContext = createContext()
export default function ({children}) {
  const [holdingCell, setHoldingCell] = useState([])
  const {user, reserveBooth: reserve} = useContext(UserContext);
  const [currentVendor, setCurrentVendor] = useState([]);
  const [currentVendorRef, setCurrentVendorRef] = useState(null)
  const {booths, statusCodes, resetBooth} = useContext(BoothContext)
  const [cart, setCart] = useState(null);
  const client = Client.buildClient({domain: 'o-p-veteran.myshopify.com', storefrontAccessToken: '76c1fba5d995f6b7dbb1eb1c1c3c5745'});
  
  useEffect(()=>{
    if (cart == null){
      createCart()
    }
  }, [])
  const createCart = () => {
      client.checkout.create().then((checkout)=>{setCart(checkout.id)})
    }
    
    const checkProducts = () => {
      for (let product of Object.keys(products)) {
        client
          .product
          .fetch(products[product])
          .then(p => console.log(`${product}: ${Object.entries(p)}`))
      }
    }
  const addVendorToCart = ()=>{
      let [first,
        ...last] = currentVendor
        .rep
        .split(" ")
      last = last.join(" ")
      const shippingAddress = {
        address1: currentVendor.address.street,
        address2: currentVendor.address.apt,
        city: currentVendor.address.city,
        company: currentVendor.organization,
        country: 'United States',
        firstName: first,
        lastName: last,
        phone: currentVendor.phone,
        province: currentVendor.address.state,
        zip: currentVendor.address.zip 
      }
      client.checkout.updateShippingAddress(currentVendor.cartId, shippingAddress)
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
     client.checkout.fetch(currentVendor.cartId).then(checkout=>
      window.open(checkout.webUrl))
    }
    const addCartToVendor = (checkout)=>{
      if (currentVendor){
      vendorRef.doc(currentVendor.organization).update({cartId: checkout.id})
    }}
    const addItemToCart = (item) => {
      client
        .checkout
        .addLineItems(currentVendor.cartId, [
          {
            variantId: products[item],
            quantity: 1
          }
        ])
        .then(checkout => {
          console.log(`added ${item} to cart`)
        })
        .catch(err => console.error(err))
    }
    const storeFile = (file, path) => {
      const storageRef = Storage.ref(path)
      storageRef
        .put(file)
        .then((snapShot) => {
          storageRef
            .getDownloadURL()
            .then(url => {
              updateCurrentVendor({logo: url})
            })
        })
        .catch(err => console.log(err))
    }
    // const matchVendor = () => {
    //   const query = vendorRef
    //     .where("repEmail", "==", user.email)
    //     .onSnapshot((querySnapshot) => {
    //       querySnapshot.forEach((doc)=>{
    //       setCurrentVendor(doc.data())
    //       })
    //     }
    //     )
    //   }
    const matchVendor = () => {
   vendorRef
        .where("repEmail", "==", user.email)
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc)=>{
          setCurrentVendor(doc.data())
          })
        })
        
      }
    const createVendor = (data) => {
      const currentVendorData = {
        cartId: cart,
        address: {
          street: data.street,
          apt: data.apt,
          city: data.city,
          state: data.state,
          zip: data.zip
        },
        phone: data.phone,
        rep: data.name,
        repEmail: user.email,
        isGovernmental: data.governmental,
        isNonprofit: data.nonprofit,
        isVeteranOwned: data.vetOwned,
        description: data.description,
        organization: data.organization,
        booth: {
          primary: {
            name: null,
            status: 0
          },
          secondary: {
            name: null,
            status: 0
          }
        },
        sponsorship: {
          interested: data.wantToSponsor,
          level: data.isSponsor
            ? data.sponsorshipLevel
            : null,
          staus: data.isSponsor
            ? 2
            : 0
        },
        logo: null
      }
      vendorRef.doc(`${data.organization}`).set({
          ...currentVendorData
        }, {merge: true}).then(matchVendor).catch(err => console.error(err));
    }
    const deleteVendor = id => {
      vendorRef
        .doc(id)
        .delete()
        .catch(err => console.error(err));
    }
    const updateCurrentVendor = data => {
      // const updatedVendor = {
      //   ...currentVendor,
      //   ...data
      // }
      vendorRef
        .doc(`${currentVendor.organization}`)
        .update(data)
        .catch(err => console.log(err))
    }
    const addBoothToCart = (isPrimary, boothId) => {
      const booth = booths.find(b => b.id === boothId)
      if (["Paladin", "Stryker", "Abrams", "Bradley"].includes(currentVendor.sponsorship.level)) {
        if (isPrimary) {
          addItemToCart("freeBooth")
        } else {
          addItemToCart("doubleBooth")
          client
            .checkout
            .addDiscount(cart.id, "sponsoredDoubleBooth")
        }
        if (booth.hasElectricity) {
          addItemToCart("electricity")
          client
            .checkout
            .addDiscount(cart.id, "sponsoredBoothElectricity")
        }
      } else if (currentVendor.isNonprofit || currentVendor.isGovernmental || currentVendor.isVeteranOwned) {
        if (isPrimary) {
          addItemToCart("freeBooth")
        } else {
          addItemToCart("doubleBooth")
        }
        if (booth.hasElectricity) {
          addItemToCart("electricity")
        }
      } else {
        if (isPrimary) {
          addItemToCart("standardBooth")
        } else {
          addItemToCart("doubleBooth")
        }
        if (booth.hasElectricity) {
          addItemToCart("electricity")
        }
      }
      const updatedVendor = {
        ...currentVendor
      }
      if (isPrimary) {
        updatedVendor.booth[`${isPrimary
            ? "primary"
            : "secondary"}`].id = boothId
        updatedVendor.booth[`${isPrimary
            ? "primary"
            : "secondary"}`].status = 1
      }
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
        cart,
        addItemToCart,
        addBoothToCart,
        createCart,
        checkProducts
      }}>
        {children}
      </VendorContext.Provider>
    )
  }