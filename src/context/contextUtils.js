////booth

const setNeighbors = () => {
  console.log('setting neighbors')
  for (let booth of booths) {
    const updatedBooth = { ...booth }
    updatedBooth.vendor = null
    updatedBooth.status = 'open'
    updateBooth(updatedBooth, booth.id)
    console.log(`updated ${booth.id}`)
  }
}

const seedBooths = (e) => {
  e.preventDefault()
  console.log('seeding')
  const letters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
  ]

  const boothObjects = []
  for (let row of letters) {
    for (let i = 1; i < 8; i++) {
      let exists = false
      const obj = {
        hasElectricity: false,
        restriction: 2,
        section: 0,
        row: row,
        number: i,
        neighbors: [],
        vendor: null,
      }

      switch (row) {
        case 'N':
          exists = true
          if (row === 'H') {
            obj.hasElectricity =
              (i < 8 && i > 2) || (i < 20 && i > 14) ? true : false
          }
          if (i < 8) {
            obj.section = 7
          } else if (i < 15) {
            obj.section = 4
          } else {
            obj.section = 7
          }
          // if (i < 15) {
          //   obj.restriction =1
          // }
          // else {
          //   obj.restriction=2
          // }
          break
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
c
