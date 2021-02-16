import { createContext, useContext, useEffect, useState } from "react";
import Firestore from "../Firestore";
import { UserContext } from "./UserProvider";
import boothData from "../testing/booths.json";

const boothRef = Firestore.collection("Booths");
const batch = Firestore.batch();

export const BoothContext = createContext();
export default function BoothProvider({children}) {
	const { user } = useContext(UserContext);
	const [booths, setBooths] = useState([]);
	
	// useEffect(() => {
		// boothData.forEach(b => {
			// batch.set(boothRef.doc(b.id), b);
		// });
		// batch.commit().catch(err => console.error(err));
	// }, []);
	
	useEffect(() => {
		const unsub = boothRef.onSnapshot(snap => {
			const list = {};
			const removeKeys = [];
			snap.docChanges.forEach(change => {
				if (change.type === "removed") {
					removeKeys.push(change.doc.id);
				} else {
					list[change.doc.id] = change.doc.data();
				}
			});
			setBooths(prev => {
				const copy = {...prev};
				removeKeys.forEach(k => delete copy[k]);
				return {...copy, ...list};
			});
		}, err => console.error(err));
		
		return unsub;
	}, [setBooths]);
	
	return (
		<BoothContext.Provider value={{ booths }}>
			{children}
		</BoothContext.Provider>
	);
}