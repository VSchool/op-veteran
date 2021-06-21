import {createContext, useContext, useEffect, useState} from "react";
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
  const {user, reserveBooth: reserve} = useContext(UserContext);
  const [currentVendor,
    setCurrentVendor] = useState([]);
  const [currentVendorRef,
    setCurrentVendorRef] = useState(null)
  const {booths, statusCodes} = useContext(BoothContext)
  const [cart,
    setCart] = useState(null);
  const client = Client.buildClient({domain: 'o-p-veteran.myshopify.com', storefrontAccessToken: '76c1fba5d995f6b7dbb1eb1c1c3c5745'});
const checkProducts = ()=>{
  for (let product of Object.keys(products)){
    client.product.fetch(products[product]).then(p=>console.log(`${product}: ${Object.entries(p)}`))
  }
}
  useEffect(() => {
    if (cart === null) {
      client
        .checkout
        .create()
        .then((checkout) => {
          setCart(checkout)
        })
    }
  }, [])
  useEffect(() => {
    if (currentVendor && currentVendor.length > 0) {
      setCurrentVendorRef(vendorRef.doc(`${currentVendor.organization}`))
    }
  }, [currentVendor])
  
  // useEffect(() => { vendorData.forEach(b => { batch.set(vendorRef.doc(b.id),
  // b); }); batch.commit().catch(err => console.error(err)); }, []); useEffect(()
  // => { 	const unsub = vendorRef.onSnapshot(snap => { 		const list = {};
  // 		const removeKeys = []; 		snap.docChanges.forEach(change => { 			if
  // (change.type === "removed") { 				removeKeys.push(change.doc.id); 			} else {
  // 				list[change.doc.id] = change.doc.data(); 			} 		}); 		setVendors(prev =>
  // { 			const copy = {...prev}; 			removeKeys.forEach(k => delete copy[k]);
  // 			return {...copy, ...list}; 		}); 	}, err => console.error(err)); 	return
  // unsub; }, [setVendors]); useEffect(() => { 	if (selectedVendor) {
  // 		setSelectedVendor(prev => vendors[prev.id]); 	} }, [vendors,
  // setSelectedVendor]);
  const test = ()=>{
    for (let p of Object.keys(products)){
      client.product.fetch(products[p]).then(a=>console.log(a))
    }
  }
  const openCart = () => {
    window.open(cart.webUrl)
  }
  const addItemToCart = (item) => {

    client
      .checkout
      .addLineItems(cart.id, [
        {
          variantId: products[item],
          quantity: 1
        }
      ])
      .then(checkout => {
        setCart(checkout)
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
      }).catch(err=> console.log(err))
    }
  const matchVendor = () => {
    const query = vendorRef
      .where("repEmail", "==", user.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

          setCurrentVendor(doc.data())
        })
      })
      .catch(err => console.log(err))
  }

  const createVendor = (data) => {
    vendorRef
      .doc(`${data.organization}`)
      .set({
        id: `${data.organization}`,
        ...data
      })
      .then(matchVendor())
      .catch(err => console.error(err));
  }

  const deleteVendor = id => {
    vendorRef
      .doc(id)
      .delete()
      .catch(err => console.error(err));
  }

  const updateCurrentVendor = data => {
    vendorRef
      .doc(`${currentVendor.organization}`)
      .update(data)
      .catch(err => console.log(err))
  }
    const addBoothToCart = (isPrimary, boothId) =>{
      const booth = booths.filter(b=>b.id === boothId)[0]
      if (["Paladin", "Stryker", "Abrams", "Bradley"].includes(currentVendor.sponsorship.level)){
        if (isPrimary){
          addItemToCart("freeBooth")
        }
        else {
          addItemToCart("doubleBooth")
          client.checkout.addDiscount(cart.id, "sponsoredDoubleBooth")
        }
        if (booth.hasElectricity) {
          addItemToCart("electricity")
          client.checkout.addDiscount(cart.id, "sponsoredBoothElectricity")
        }
      }
      
      else if (currentVendor.isNonprofit || currentVendor.isGovernmental || currentVendor.isVeteranOwned){
        if (isPrimary) {
          addItemToCart("freeBooth")
        }
        else {
          addItemToCart("doubleBooth")
        }
        if (booth.hasElectricity) {
          addItemToCart("electricity")
        }
      }
      else {
        if (isPrimary) {
          addItemToCart("standardBooth")
        }
        else {
          addItemToCart("doubleBooth")
        }
        if (booth.hasElectricity){
          addItemToCart("electricity")
        }
      }
      const updatedVendor = {...currentVendor}
      if (isPrimary){
        updatedVendor.booth[`${isPrimary ? "primary" : "secondary"}`].name = boothId
        updatedVendor.booth[`${isPrimary ? "primary" : "secondary"}`].status = 1
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
      checkProducts
    }}>
      {children}
    </VendorContext.Provider>
  )
}