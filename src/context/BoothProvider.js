import React, {createContext, useContext, useEffect, useState} from "react";
import firestore from "../database";
import {UserContext} from "./UserProvider";
// import boothData from "../testing/booths.json";

const boothRef = firestore.collection("Booths");
const batch = firestore.batch();

export const BoothContext = createContext();
export default function ({children}) {
  

  const pullMapDataFromFirestore = ()=>{
    const boothArray = []             
    boothRef
      .where("number", ">", 0)
      .get()
      .then(querySnapshop => {
        querySnapshop.forEach(doc => {
          boothArray.push(doc.data())
        })}).catch(err=>console.log(err))
        return boothArray}

  const organizeMapData = (rawData)=>{
        return rawData.reduce((obj, booth) => {
            if (!obj.hasOwnProperty(booth.section)) {
              obj[booth.section] = {}
       
            }
            if (!obj[booth.section].hasOwnProperty(booth.row)) {
              obj[booth.section][booth.row] = []

            }
            obj[booth.section][booth.row]
              .push(booth)
              return obj
            }, {})}
            


    const createBooth = (data) => {
      boothRef
        .doc(`${data.row}${data.number}`)
        .set({
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

    return (
      <BoothContext.Provider
        value={{
          createBooth,
          pullMapDataFromFirestore,
          organizeMapData
      }}>
        {children}
      </BoothContext.Provider>
    )
  }