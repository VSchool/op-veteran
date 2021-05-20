import React, {createContext, useContext, useEffect, useState} from "react";
import firestore from "../database";
import {UserContext} from "./UserProvider";
// import boothData from "../testing/booths.json";

const boothRef = firestore.collection("Booths");
const batch = firestore.batch();

export const BoothContext = createContext();
export default function ({children}) {
  const [booths,
    setBooths] = useState({})

 
  const pullMapDataFromFirestore = () => {
    const boothArray = []
    boothRef
      .where("number", ">", 0)
      .get()
      .then(querySnapshop => {
        querySnapshop.forEach(doc => {
          boothArray.push(doc.data())
        })
       setBooths(boothArray)
      })
      .catch(err => console.log(err))
  }

  const createBooth = (data) => {
    boothRef
      .doc(`${data.row}${data.number}`)
      .set({
        id: `${data.row}${data.number}`,
        ...data
      })
      .catch(err => console.error(err));
  }

  const updateBooth = (data) => {
    boothRef
      .doc(`${data.row}${data.number}`)
      .update({
        id: `${data.row}${data.number}`,
        ...data
      })
      .catch(err => console.error(err));
  }

  const deleteBooth = id => {
    boothRef
      .doc(id)
      .delete()
      .catch(err => console.error(err));
  }

  const reserveBooth = (id, vendor) => {
    boothRef
      .doc(id)
      .update({vedor: vendor})
      .catch(err => console.error(err));
  }

  // const sections = {
  //   Alpha: {
  //     A: [],
  //     B: [],
  //     C: [],
  //     D: [],
  //     E: [],
  //     F: [],
  //     G: [],
  //     H: [],
  //     I: []
  //   },
  //   Beta: {
  //     A: [],
  //     B: [],
  //     C: [],
  //     D: [],
  //     E: [],
  //     F: [],
  //     G: [],
  //     H: [],
  //     I: []
  //   },
  //   Gama: {
  //     A: [],
  //     B: [],
  //     C: [],
  //     D: [],
  //     E: [],
  //     F: [],
  //     G: [],
  //     H: [],
  //     I: []
  //   },
  //   Delta: {
  //     A: [],
  //     F: [],
  //     J: [],
  //     K: [],
  //     L: []
  //   }
  // }

  const seedBooths = () => {
    const letters = [
      "A",
      "B",
      "C",
      "D"
    ]
    const greekLetters = ["Gama"]
  for (let section of greekLetters) {
    for (let row of letters) {
      for (let i = 1; i < 8; i++) {
        let number = i + (13)
       const obj = {
          row,
          number,
          section,
          restriction: false,
          hasElectricity: false,
          vendor: null
        }
   deleteBooth(`${obj.hasElectricity.row}${obj.number}`)
      }
    }
  }
}

  useEffect(() => {
    pullMapDataFromFirestore()
  }, [])


  return (
    <BoothContext.Provider
      value={{
      booths,
      createBooth,
      updateBooth
    }}>
      {children}
    </BoothContext.Provider>
  )
}