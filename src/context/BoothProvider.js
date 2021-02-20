import { createContext, useContext, useEffect, useState } from "react";
import firestore from "../database";
import { UserContext } from "./UserProvider";
// import boothData from "../testing/booths.json";

const boothRef = firestore.collection("Booths");
const batch = firestore.batch();

export const BoothContext = createContext();
export default function BoothProvider({children}) {
	const { user, reserveBooth: reserve } = useContext(UserContext);
	const [booths, setBooths] = useState([]);
	const [selectedBooth, setSelectedBooth] = useState(null);
	
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
	
	useEffect(() => {
		if (selectedBooth) {
			setSelectedBooth(prev => booths[prev.id]);
		}
	}, [booths, setSelectedBooth]);
	
	const selectBooth = id => {
		setSelectedBooth(booths[id]);
	}
	
	const deselectBooth = () => {
		setSelectedBooth(null);
	}
	
	const createBooth = num => {
		boothRef.doc(`a${num}`).set({
			id: `a${num}`,
			x: 0,
			y: 0,
			reserved: false
		}).catch(err => console.error(err));
	}
	
	const setBoothPosition = (id, x, y) => {
		boothRef.doc(id).update({ x, y })
			.catch(err => console.error(err));
	}
	
	const deleteBooth = id => {
		boothRef.doc(id).delete().catch(err => console.error(err));
	}
	
	const reserveBooth = () => {
		boothRef.doc(selectedBooth.id).update({ reservied: true })
			.catch(err => console.error(err));
		reserve(selectedBooth.id);
	}
	
	return (
		<BoothContext.Provider value={{
			booths,
			selectedBooth,
			selectBooth,
			deselectBooth,
			createBooth,
			setBoothPosition,
			deleteBooth,
			reserveBooth
		}}>
			{children}
		</BoothContext.Provider>
	);
}