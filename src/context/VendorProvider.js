import { createContext, useContext, useEffect, useState } from "react";
import firestore from "../database";
import Firebase, {Storage} from '../Firebase'
import { UserContext } from "./UserProvider";
// import vendorData from "../testing/vendors.json";
import Client from 'shopify-buy';


const vendorRef = firestore.collection("vendors");
const batch = firestore.batch();
const products = {

}
export const VendorContext = createContext();
export default function({children}) {
	const { user, reserveBooth: reserve } = useContext(UserContext);
	const [currentVendor, setCurrentVendor] = useState([]);
	const [currentVendorRef, setCurrentVendorRef] = useState(null)
	const [cart, setCart] = useState(null);
	const client = Client.buildClient({
	  domain: 'o-p-veteran.myshopify.com',
	  storefrontAccessToken: '76c1fba5d995f6b7dbb1eb1c1c3c5745'
	});

	useEffect(() => {
		if (cart === null) {
			client.checkout.create().then((checkout)=>{
				setCart(checkout.id)
			})
		}
		if (currentVendor && currentVendor.length > 0) {
			setCurrentVendorRef(vendorRef.doc(`${currentVendor.organization}`))
		}
	}, [currentVendor])
	// useEffect(() => {
		// vendorData.forEach(b => {
			// batch.set(vendorRef.doc(b.id), b);
		// });
		// batch.commit().catch(err => console.error(err));
	// }, []);
	
	// useEffect(() => {
	// 	const unsub = vendorRef.onSnapshot(snap => {
	// 		const list = {};
	// 		const removeKeys = [];
	// 		snap.docChanges.forEach(change => {
	// 			if (change.type === "removed") {
	// 				removeKeys.push(change.doc.id);
	// 			} else {
	// 				list[change.doc.id] = change.doc.data();
	// 			}
	// 		});
	// 		setVendors(prev => {
	// 			const copy = {...prev};
	// 			removeKeys.forEach(k => delete copy[k]);
	// 			return {...copy, ...list};
	// 		});
	// 	}, err => console.error(err));
		
	// 	return unsub;
	// }, [setVendors]);
	
	// useEffect(() => {
	// 	if (selectedVendor) {
	// 		setSelectedVendor(prev => vendors[prev.id]);
	// 	}
	// }, [vendors, setSelectedVendor]);

	const addItemToCart = (itemHandle) =>{
		client.product.fetchByHandle(itemHandle).then((product) => {
			// Do something with the product
			client.checkout.addLineItems(cart, product).then(checkout => {
				console.log(checkout.webUrl)
			})
		})
	}
	const storeFile =  (file, path) => {
		const storageRef = Storage.ref(path)
		  storageRef.put(file).then((snapShot) =>{
		  storageRef.getDownloadURL().then(url=>{
			  updateCurrentVendor({logo: url})
		})})
	}

	const matchVendor = () => {
		const query = vendorRef.where("repEmail", "==", user.email).get().then((querySnapshot)=>{
			querySnapshot.forEach((doc) => {
				
				setCurrentVendor(doc.data())
		})
	}).catch(err=>console.log(err))
}
	                                            
	const createVendor = (data) => {
		vendorRef.doc(`${data.organization}`).set({
			id: `${data.organization}`,
			...data
		}).then(matchVendor()).catch(err => console.error(err));
	}
	
	const deleteVendor = id => {
		vendorRef.doc(id).delete().catch(err => console.error(err));
	}

	const updateCurrentVendor = data => {
		vendorRef.doc(`${currentVendor.organization}`).update(data).catch(err=>console.log(err))
	}
	
	
	return (
		<VendorContext.Provider value={{
			currentVendor,
			createVendor,
			deleteVendor,
			matchVendor, 
			updateCurrentVendor,
			storeFile,
			cart,
			addItemToCart
		}}>
			{children}
		</VendorContext.Provider>
	)}