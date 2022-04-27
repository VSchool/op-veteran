export function setOpenState(status, setter) {
  if (status === false) {
    setter(() => true);
  } else if (status === true) {
    setter(() => false);
  }
}

export function setStyling(status) {
  if (status === false) {
    return {
      visibility: `hidden`,
      containerHeight: `48px`,
    };
  } else if (status === true) {
    return {
      visibility: `visible`,
      containerHeight: `328px`,
    };
  }
}

export function toggleDetailsView(status, setter) {
  if (status === 'vendor') {
    setter(() => 'event');
  } else if (status === 'event') {
    setter(() => 'vendor');
  }
}

export const fakeData = {
  company: 'Bunty Soap Company',
  booth: 'A01',
  name: 'Frank Hamer',
  phone: '444-444-4444',
  email: 'fajldsjf@email.com',
  address: '1234 main street',
  suite: '#555',
  cityState: 'Austin, TX',
  zipcode: '78611',
  veteranOwned: 'no',
  nonprofit: 'yes',
  poweredBooth: 'yes',
};
