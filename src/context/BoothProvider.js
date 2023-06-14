import React, { createContext, useContext, useEffect, useState } from 'react'
import firestore from '../database'
import { UserContext } from './UserProvider'
// import boothData from "../testing/booths.json";

const boothRef = firestore.collection('Booths')
const batch = firestore.batch()

export const BoothContext = createContext()
export default function BoothProvider({ children }) {
  const [booths, setBooths] = useState([])

  const [rowsOfBooths, setRowsOfBooths] = useState({})
  const [sectionsOfRows, setSectionsOfRows] = useState({})
  const statusCodes = {
    OPEN: 0,
    ONHOLD: 1,
    RESERVED: 2,
  }
  const organizeBoothData = () => {
    if (booths && booths.length > 0) {
      Object.keys(rowData).forEach((rowId) => {
        const boothsInRow = booths.filter((b) => b.row === rowId)
        boothsInRow.sort((a, b) => parseInt(a.number) - parseInt(b.number))
        return boothsInRow
      })
    }
  }
  const makeId = (row, number) => {
    let id = row
    if (number < 10) {
      id += '0'
    }
    id += number
    return id
  }
  const newBooths = () => {
    const rows = ['O', 'P', 'Q', 'R']
    for (let b = 0; b < rows.length; b++) {
      for (let i = 1; i < rowData[rows[b]].booths + 1; i++) {
        createBooth({
          hasElectricity: false,
          number: i,
          row: rows[b],
          neighbors: [],
          restriction: 0,
          section: 0,
          status: 0,
          vendor: null,
          id: makeId(rows[b], i),
        })
      }
    }
  }
  const createBooth = (data) => {
    let id = data.row
    if (data.number < 10) {
      id += '0'
    }
    id += data.number
    boothRef
      .doc(id)
      .set({
        ...data,
      })
      .then(console.log(`booth ${id} created`))
      .catch((err) => console.error(err))
  }
  const resetBooth = (id) => {
    updateBooth(
      {
        status: 0,
        vendor: null,
      },
      id
    )
  }
  const updateBooth = (data, id) => {
    boothRef
      .doc(id)
      .update(data)
      .catch((err) => console.error(err))
  }
  const deleteBooth = (id) => {
    boothRef
      .doc(id)
      .delete()
      .catch((err) => console.error(err))
  }
  const reserveBooth = (vendor, id) => {
    updateBooth(
      {
        vendor: vendor,
        status: 2,
      },
      id
    )
  }
  const holdBooth = (vendor, id) => {
    updateBooth(
      {
        vendor: vendor,
        status: 1,
      },
      id
    )
  }

  const rowData = {
    A: {
      x: 162,
      y: 399,
      theta: -20,
    },
    B: {
      x: 222,
      y: 364,
      theta: -20,
    },
    C: {
      x: 275,
      y: 337,
      theta: -20,
    },
    D: {
      x: 297,
      y: 328,
      theta: -20,
    },
    E: {
      x: 354,
      y: 268,
      theta: -30,
    },

    F: {
      x: 420,
      y: 228,
      theta: -30,
    },
    G: {
      x: 470,
      y: 197,
      theta: -30,
    },
    H: {
      x: 525,
      y: 167,
      theta: -30,
    },
    I: {
      x: 590,
      y: 152,
      theta: -30,
    },
    J: {
      x: 354,
      y: 894,
      theta: -28,
    },
    K: {
      x: 407,
      y: 898,
      theta: -120,
    },
    L: {
      x: 421,
      y: 954,
      theta: -120,
    },
    M: {
      x: 446,
      y: 995,
      theta: -120,
    },
    N: {
      x: 625,
      y: 653,
      theta: -23,
    },
    O: {
      x: 115,
      y: 193,
      theta: -45,
      booths: 2,
    },
    P: {
      x: 185,
      y: 205,
      theta: -0,
      booths: 2,
    },
    Q: {
      x: 214,
      y: 122,
      theta: -39,
      booths: 4,
    },
    R: {
      x: 342,
      y: 167,
      theta: 60,
      booths: 2,
    },
    S: {
      x: 457,
      y: 928,
      theta: -120,
    },
  }

  const diagramData = {
    section1: {
      A: {
        x: 80,
        y: 98,
        theta: 0,
      },
      B: {
        x: 183,
        y: 98,
        theta: 0,
      },
      C: {
        x: 323,
        y: 98,
        theta: 0,
      },
      D: {
        x: 406,
        y: 98,
        theta: 0,
      },
    },
    section3: {
      A: {
        x: 80,
        y: 789,
        theta: 0,
      },
      B: {
        x: 183,
        y: 789,
        theta: 0,
      },
      C: {
        x: 323,
        y: 789,
        theta: 0,
      },
      D: {
        x: 806,
        y: 789,
        theta: 0,
      },
    },
    section5: {
      A: {
        x: 0,
        y: 1498,
        theta: 0,
      },
      B: {
        x: 103,
        y: 1498,
        theta: 0,
      },
      C: {
        x: 243,
        y: 1498,
        theta: 0,
      },
      D: {
        x: 326,
        y: 1498,
        theta: 0,
      },
    },
    section2: {
      E: {
        x: 780,
        y: 98,
        theta: 0,
      },
      F: {
        x: 915,
        y: 98,
        theta: 0,
      },
      G: {
        x: 1025,
        y: 98,
        theta: 0,
      },
      H: {
        x: 1135,
        y: 98,
        theta: 0,
      },
      I: {
        x: 1248,
        y: 98,
        theta: 0,
      },
    },
    section4: {
      E: {
        x: 780,
        y: 789,
        theta: 0,
      },
      F: {
        x: 915,
        y: 789,
        theta: 0,
      },
      G: {
        x: 1025,
        y: 789,
        theta: 0,
      },
      H: {
        x: 1135,
        y: 789,
        theta: 0,
      },
      I: {
        x: 1248,
        y: 789,
        theta: 0,
      },
    },
    section6: {
      E: {
        x: 780,
        y: 1498,
        theta: 0,
      },
      F: {
        x: 915,
        y: 1498,
        theta: 0,
      },
      G: {
        x: 1025,
        y: 1498,
        theta: 0,
      },
      H: {
        x: 1135,
        y: 1500,
        theta: 0,
      },
      I: {
        x: 1248,
        y: 1500,
        theta: 0,
      },
    },
    section7: {
      J: {
        x: 18,
        y: 2198,
        theta: 0,
      },
      K: {
        x: 100,
        y: 2377,
        theta: -90,
      },
      L: {
        x: 100,
        y: 2558,
        theta: -90,
      },
      M: {
        x: 100,
        y: 2702,
        theta: -90,
      },
      N: {
        x: 614,
        y: 2198,
        theta: 0,
      },
    },
  }

  const getBooths = (boothArray = []) => {
    return boothRef.where('number', '!=', null).onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        boothArray.push(doc.data())
      })
      setBooths(boothArray)
    })
  }

  useEffect(() => {
    const boothArray = []
    if (booths && booths.length === 0) {
      //.where("number", "!=", null)
      getBooths(boothArray)
    }
  }, [])

  return (
    <BoothContext.Provider
      value={{
        booths,
        rowData,
        createBooth,
        updateBooth,
        reserveBooth,
        rowsOfBooths,
        diagramData,
        organizeBoothData,
        statusCodes,
        resetBooth,
        holdBooth,
        newBooths,
        getBooths,
      }}
    >
      {children}
    </BoothContext.Provider>
  )
}
