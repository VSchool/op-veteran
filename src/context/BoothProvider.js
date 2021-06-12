import React, {createContext, useContext, useEffect, useState} from "react";
import firestore from "../database";
import {UserContext} from "./UserProvider";
// import boothData from "../testing/booths.json";

const boothRef = firestore.collection("Booths");
const batch = firestore.batch();

export const BoothContext = createContext();
export default function ({children}) {
  const [booths,
    setBooths] = useState([])
    /********************** */
    const [debounce, setDebounce] = useState(false)
    /******************** */
  const [rowsOfBooths, setRowsOfBooths] =useState({})
  const [sectionsOfRows, setSectionsOfRows] =useState({})

    useEffect(() => {
      if (booths && booths.length > 0) {
      Object.keys(rowData).forEach(rowId => {
        const boothsInRow = booths.filter(b=>b.row === rowId)
        boothsInRow.sort((a, b)=>parseInt(a.number) - parseInt(b.number))
        setRowsOfBooths(prev=>({
          ...prev,
          [rowId]: boothsInRow
        }))
      }
        )
      console.log(Object.entries(rowsOfBooths))}
    }, [])

  const pullMapDataFromFirestore = async () => {
    if (!debounce){
    const boothArray = []
   const querySnapshop = await boothRef
      .where("number", "!=", null)
      .get()
      try {       
        querySnapshop.forEach(doc => {
          boothArray.push(doc.data())
        })
        setBooths(boothArray)
      } catch (error) {
        console.log(error)
      }
      setDebounce(true)
    setTimeout(() => {
      setDebounce(false)
      console.log("setting debounce")
    }, 1000);
    }
  }

  const createBooth = (data) => {
    let id = data.row
    if (data.number <10){
      id +="0"
    }
    id+=data.number
    boothRef
  
      .set({
        ...data
      }).then(console.log(`booth ${id} created`))
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
  const holdBooth = (id, vendor) =>{
    
  }
  const reserveBooth = (id, vendor) => {
    boothRef
      .doc(id).get()
      .then(boothQuery=>console.log(boothQuery.get("onHold")))
      .catch(err => console.error(err))
    boothRef
      .doc(id)
      .update({vedor: vendor})
      .then(console.log(`booth ${id} has been reserved by ${vendor.organization}`))
      .catch(err => console.error(err));
  }

  const rowData ={
    A: {
        x: 162,
        y: 399,
        theta: -20 ,
  
    },
    B: {
        x: 222,
        y: 364,
        theta: -20,
     
    },
    C: {
        x: 282,
        y: 334,
        theta: -20 ,
    },
    D: {
        x: 297,
        y:328 ,
        theta: -20 
    },
    E: {
        x: 354,
        y: 268,
        theta: -30
    },
    
    F: {
        x: 420,
        y: 228,
        theta: -30 
    },
    G: {
        x: 470,
        y: 197,
        theta: -30 
    },
    H: {
        x: 525,
        y: 167,
        theta: -30
    },
    I: {
        x: 590,
        y: 152,
        theta: -30 
    },
    J: {
        x:354 ,
        y: 894,
        theta: -28
    },
    K: {
        x: 407,
        y: 898,
        theta: -120 
    },
    L: {
        x: 421,
        y: 954,
        theta: -120
    },
    M: {
        x: 446,
        y: 995,
        theta: -120 
    },
    N: {
        x: 625,
        y: 653,
        theta: -23
    }
}
  const diagramData ={
    section1: {
    A: {
         x: 0,
        y:98,
        theta: 0 ,
  
    },
    B: {
        x: 103,
        y:98,
        theta: 0,
     
    },
    C: {
         x: 243,
         y:98,
        theta: 0 ,
    },
    D: {
         x: 326,
        y: 98 ,
        theta: 0 
    }
  },
    section3: {
    A: {
         x: 0,
        y: 789,
        theta: 0 ,
  
    },
    B: {
        x: 103,
        y: 789,
        theta: 0,
     
    },
    C: {
         x: 243,
        y: 789,
        theta: 0 ,
    },
    D: {
         x: 326,
        y: 789 ,
        theta: 0 
    }
  },
  section5: {
    A: {
         x: 0,
        y: 1498,
        theta: 0 ,
  
    },
    B: {
        x: 103,
        y: 1498,
        theta: 0,
     
    },
    C: {
         x: 243,
        y: 1498,
        theta: 0 ,
    },
    D: {
         x: 326,
        y: 1498 ,
        theta: 0 
    }
  },
  section2: {
    E: {
        x: 780,
        y:98,
        theta: 0 ,
  
    },
    F: {
        x: 915,
        y:98,
        theta: 0,
     
    },
    G: {
        x: 1025,
   y:98,
        theta: 0 ,
    },
    H: {
        x: 1135,
        y: 98 ,
        theta: 0 
    },
    I: {
        x: 1248,
        y: 98 ,
        theta: 0 
    }
  },
  section4: {
    E: {
        x: 780,
       y: 789,
        theta: 0 ,
  
    },
    F: {
        x: 915,
       y: 789,
        theta: 0,
     
    },
    G: {
        x: 1025,
       y: 789,
        theta: 0 ,
    },
    H: {
        x: 1135,
        y: 789 ,
        theta: 0 
    },
    I: {
        x: 1248,
        y: 789 ,
        theta: 0 
    }
  },
  section6: {
    E: {
        x: 780,
       y: 1498,
        theta: 0 ,
  
    },
    F: {
        x: 915,
       y: 1498,
        theta: 0,
     
    },
    G: {
        x: 1025,
       y: 1498,
        theta: 0 ,
    },
    H: {
        x: 1135,
        y: 1500 ,
        theta: 0 
    },
    I: {
        x: 1248,
        y: 1500 ,
        theta: 0 
    }
  },
  section7: {
    J: {
        x: 18,
       y: 2198,
        theta: 0 ,
  
    },
    K: {
        x: 100,
       y: 2377,
        theta: -90,
     
    },
    L: {
        x: 100,
       y: 2558,
        theta: -90 ,
    },
    M: {
        x: 100,
        y: 2702 ,
        theta: -90 
    },
    N: {
        x: 614,
        y: 2198 ,
        theta: 0 
    }
  }
    
}
  const seedBooths = (e) => {
    e.preventDefault()
    console.log("seeding")
    const letters =      ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"]
    
    
    const boothObjects =[] 
    for (let row of letters) {
      for (let i = 1; i < 8; i++) {
        
        let exists = false
        const obj = {hasElectricity: false, restriction: 2,section:0, row: row, number: i, neighbors: [], vendor: null}
        
        switch (row){
          case "N":
          
            exists = true
            if (row === "H"){
            obj.hasElectricity = ((i < 8 && i > 2 ) ||(i<20 && i > 14)) ? true : false
            }
            if (i < 8) {
              obj.section = 7
            } else if (i < 15) {
              obj.section = 4
            }
            else {
              obj.section = 7
            }
            // if (i < 15) {
            //   obj.restriction =1
            // }
            // else {
            //   obj.restriction=2
            // }
            break;
        }
      
     if (exists) {  
   boothObjects.push(obj)
   
    }
      }
    }
    boothObjects.forEach((obj) => {
      createBooth(obj)
    })
  }
useEffect(() => {
  pullMapDataFromFirestore()
}, [])



  return (
    <BoothContext.Provider
      value={{
      booths,
      rowData,
      createBooth,
      updateBooth, 
      reserveBooth, 
      pullMapDataFromFirestore,
      rowsOfBooths,
      diagramData
    }}>
      {children}
    </BoothContext.Provider>
  )
}