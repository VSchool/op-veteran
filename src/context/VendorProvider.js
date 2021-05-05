import { createContext, useContext, useEffect, useState } from "react";
import firestore from "../database";
import { UserContext } from "./UserProvider";
// import vendorData from "../testing/vendors.json";

const vendorRef = firestore.collection("vendors");
const batch = firestore.batch();

export const VendorContext = createContext();
export default function({children}) {
	const { user, reserveBooth: reserve } = useContext(UserContext);
	const [vendor, setVendor] = useState([]);
	const [currentVendorRef, setCurrentVendorRef] = useState(null)
	useEffect(() => {
		if (vendor){
			setCurrentVendorRef(vendorRef.doc(`${vendor.organization}`))
		}
	}, [vendor])
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
	
	const matchVendor = () => {
		const query = vendorRef.where("repEmail", "==", user.email).get().then((querySnapshot)=>{
			querySnapshot.forEach((doc) => {
				
				setVendor(doc.data())
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
		currentVendorRef.update(data).catch(err=>console.log(err))
	}
	
	
	return (
		<VendorContext.Provider value={{
			vendor,
			createVendor,
			deleteVendor,
			matchVendor, 
			updateCurrentVendor
		}}>
			{children}
		</VendorContext.Provider>
	);
}