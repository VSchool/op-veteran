export const perkList = {
  perkOne: 'Social Media Announcement',
  perkTwo: 'Recognition at Event',
  perkThree: 'Website Sponsorship',
  perkFour: 'Logo on Event Flyers',
  perkFive: 'Logo on Event Shirts*',
  perkSix: 'Swag Distribution',
  perkSeven: 'Vendor at Event*',
  perkEight: 'Radio Endorsement',
  perkNine: 'Television Endorsement',
  perkTen: 'Detailed Promotional Live Social Media Video',
};

export const sponsorshipLevels = [
  {
    name: 'Paladin',
    price: 10000,
    perks: [
      { wording: perkList.perkOne, valid: true },
      { wording: perkList.perkTwo, valid: true },
      { wording: perkList.perkThree, valid: true },
      { wording: perkList.perkFour, valid: true },
      { wording: perkList.perkFive, valid: true },
      { wording: perkList.perkSix, valid: true },
      { wording: perkList.perkSeven, valid: true },
      { wording: perkList.perkEight, valid: true },
      { wording: perkList.perkNine, valid: true },
      { wording: perkList.perkTen, valid: true },
    ],
  },
  {
    name: 'Abrams',
    price: 5000,
    perks: [
      { wording: perkList.perkOne, valid: true },
      { wording: perkList.perkTwo, valid: true },
      { wording: perkList.perkThree, valid: true },
      { wording: perkList.perkFour, valid: true },
      { wording: perkList.perkFive, valid: true },
      { wording: perkList.perkSix, valid: true },
      { wording: perkList.perkSeven, valid: true },
      { wording: perkList.perkEight, valid: true },
      { wording: perkList.perkNine, valid: true },
      { wording: perkList.perkTen, valid: false },
    ],
  },
  {
    name: 'Stryker',
    price: 2500,
    perks: [
      { wording: perkList.perkOne, valid: true },
      { wording: perkList.perkTwo, valid: true },
      { wording: perkList.perkThree, valid: true },
      { wording: perkList.perkFour, valid: true },
      { wording: perkList.perkFive, valid: true },
      { wording: perkList.perkSix, valid: true },
      { wording: perkList.perkSeven, valid: true },
      { wording: perkList.perkEight, valid: true },
      { wording: perkList.perkNine, valid: false },
      { wording: perkList.perkTen, valid: false },
    ],
  },
  {
    name: 'Bradley',
    price: 1000,
    perks: [
      { wording: perkList.perkOne, valid: true },
      { wording: perkList.perkTwo, valid: true },
      { wording: perkList.perkThree, valid: true },
      { wording: perkList.perkFour, valid: true },
      { wording: perkList.perkFive, valid: true },
      { wording: perkList.perkSix, valid: true },
      { wording: perkList.perkSeven, valid: true },
      { wording: perkList.perkEight, valid: true },
      { wording: perkList.perkNine, valid: false },
      { wording: perkList.perkTen, valid: false },
    ],
  },
  {
    name: 'AMTRAK',
    price: 500,
    perks: [
      { wording: perkList.perkOne, valid: true },
      { wording: perkList.perkTwo, valid: true },
      { wording: perkList.perkThree, valid: true },
      { wording: perkList.perkFour, valid: true },
      { wording: perkList.perkFive, valid: false },
      { wording: perkList.perkSix, valid: false },
      { wording: perkList.perkSeven, valid: false },
      { wording: perkList.perkEight, valid: false },
      { wording: perkList.perkNine, valid: false },
      { wording: perkList.perkTen, valid: false },
    ],
  },
  {
    name: 'WLA',
    price: 250,
    perks: [
      { wording: perkList.perkOne, valid: true },
      { wording: perkList.perkTwo, valid: true },
      { wording: perkList.perkThree, valid: false },
      { wording: perkList.perkFour, valid: false },
      { wording: perkList.perkFive, valid: false },
      { wording: perkList.perkSix, valid: false },
      { wording: perkList.perkSeven, valid: false },
      { wording: perkList.perkEight, valid: false },
      { wording: perkList.perkNine, valid: false },
      { wording: perkList.perkTen, valid: false },
    ],
  },
];

/*
Additional level:

MOAB: Contact Us
A sponsorship tier customized through mutual agreement for the most generous of our community partners.

*/
