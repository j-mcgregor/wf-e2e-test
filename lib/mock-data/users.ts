/* eslint-disable sonarjs/no-duplicate-string */
const MockCompanyNames = {
  BIRD: 'Bird Feeding Corp',
  SWAN: 'Swan Feeding Corp',
  GEESE: 'Geese Feeding Corp',
  PIGEON: 'Pigeon Feeding Corp',
  DOVE: 'Dove Feeding Corp'
};

export const giveUserCorrectStructure = (user: any) => ({
  ...mockUsers['new@test.com'],
  ...user
});

export const mockReports = [
  {
    id: 1,
    company_name: MockCompanyNames.BIRD,
    sme_zscore: 456,
    bond_rating: 'AA',
    created_at: 1629660518563,
    bookmarked: false
  },
  {
    id: 2,
    company_name: MockCompanyNames.SWAN,
    sme_zscore: 322,
    bond_rating: 'A-',
    created_at: 1629660001000,
    bookmarked: false
  },
  {
    id: 3,
    company_name: MockCompanyNames.GEESE,
    sme_zscore: 345,
    bond_rating: 'A',
    created_at: 1629660000000,
    bookmarked: false
  },
  {
    id: 4,
    company_name: MockCompanyNames.PIGEON,
    sme_zscore: 311,
    bond_rating: 'B+',
    created_at: 1629659000000,
    bookmarked: false
  },
  {
    id: 5,
    company_name: MockCompanyNames.DOVE,
    sme_zscore: 222,
    bond_rating: 'D',
    created_at: 1629657000000,
    bookmarked: true
  },
  {
    id: 6,
    company_name: MockCompanyNames.DOVE,
    sme_zscore: 222,
    bond_rating: 'D',
    created_at: 1629657000000,
    bookmarked: false
  },
  {
    id: 7,
    company_name: MockCompanyNames.BIRD,
    sme_zscore: 456,
    bond_rating: 'AA',
    created_at: 1629660518563,
    bookmarked: false
  },
  {
    id: 8,
    company_name: MockCompanyNames.SWAN,
    sme_zscore: 322,
    bond_rating: 'A-',
    created_at: 1629660001000,
    bookmarked: true
  },
  {
    id: 9,
    company_name: MockCompanyNames.GEESE,
    sme_zscore: 345,
    bond_rating: 'A',
    created_at: 1629660000000,
    bookmarked: true
  },
  {
    id: 10,
    company_name: MockCompanyNames.PIGEON,
    sme_zscore: 311,
    bond_rating: 'B+',
    created_at: 1629659000000,
    bookmarked: false
  },
  {
    id: 11,
    company_name: MockCompanyNames.DOVE,
    sme_zscore: 222,
    bond_rating: 'D',
    created_at: 1629657000000,
    bookmarked: false
  },
  {
    id: 12,
    company_name: MockCompanyNames.DOVE,
    sme_zscore: 222,
    bond_rating: 'D',
    created_at: 1629657000000
  },
  {
    id: 13,
    company_name: MockCompanyNames.BIRD,
    sme_zscore: 456,
    bond_rating: 'AA',
    created_at: 1629660518563,
    bookmarked: false
  },
  {
    id: 14,
    company_name: MockCompanyNames.SWAN,
    sme_zscore: 322,
    bond_rating: 'A-',
    created_at: 1629660001000,
    bookmarked: false
  },
  {
    id: 15,
    company_name: 'THIRD NEWEST ENTRY TEST',
    sme_zscore: 345,
    bond_rating: 'A',
    created_at: 1630408290506,
    bookmarked: false
  },
  {
    id: 16,
    company_name: MockCompanyNames.PIGEON,
    sme_zscore: 311,
    bond_rating: 'B+',
    created_at: 1629659000000,
    bookmarked: false
  },
  {
    id: 17,
    company_name: MockCompanyNames.DOVE,
    sme_zscore: 222,
    bond_rating: 'D',
    created_at: 1629657000000,
    bookmarked: false
  },
  {
    id: 18,
    company_name: MockCompanyNames.DOVE,
    sme_zscore: 222,
    bond_rating: 'D',
    created_at: 1629657000000,
    bookmarked: false
  },
  {
    id: 19,
    company_name: MockCompanyNames.BIRD,
    sme_zscore: 456,
    bond_rating: 'AA',
    created_at: 1629660518563,
    bookmarked: false
  },
  {
    id: 20,
    company_name: MockCompanyNames.SWAN,
    sme_zscore: 322,
    bond_rating: 'A-',
    created_at: 1629660001000,
    bookmarked: false
  },
  {
    id: 21,
    company_name: MockCompanyNames.GEESE,
    sme_zscore: 345,
    bond_rating: 'A',
    created_at: 1629660000000,
    bookmarked: false
  },
  {
    id: 22,
    company_name: 'SECOND NEWEST ENTRY TEST',
    sme_zscore: 311,
    bond_rating: 'B+',
    created_at: 1630411549699,
    bookmarked: true
  },
  {
    id: 23,
    company_name: MockCompanyNames.DOVE,
    sme_zscore: 222,
    bond_rating: 'D',
    created_at: 1629657000000,
    bookmarked: false
  },
  {
    id: 24,
    company_name: MockCompanyNames.DOVE,
    sme_zscore: 222,
    bond_rating: 'D',
    created_at: 1629657000000,
    bookmarked: false
  },
  {
    id: 25,
    company_name: MockCompanyNames.DOVE,
    sme_zscore: 222,
    bond_rating: 'D',
    created_at: 1629657000000,
    bookmarked: false
  },
  {
    id: 26,
    company_name: MockCompanyNames.BIRD,
    sme_zscore: 456,
    bond_rating: 'AA',
    created_at: 1629660518563,
    bookmarked: false
  },
  {
    id: 27,
    company_name: MockCompanyNames.SWAN,
    sme_zscore: 322,
    bond_rating: 'A-',
    created_at: 1629660001000,
    bookmarked: false
  },
  {
    id: 28,
    company_name: MockCompanyNames.GEESE,
    sme_zscore: 345,
    bond_rating: 'A',
    created_at: 1629660000000,
    bookmarked: false
  },
  {
    id: 29,
    company_name: MockCompanyNames.PIGEON,
    sme_zscore: 311,
    bond_rating: 'B+',
    created_at: 1629659000000,
    bookmarked: false
  },
  {
    id: 30,
    company_name: MockCompanyNames.DOVE,
    sme_zscore: 222,
    bond_rating: 'D',
    created_at: 1629657000000,
    bookmarked: false
  },
  {
    id: 31,
    company_name: MockCompanyNames.DOVE,
    sme_zscore: 222,
    bond_rating: 'D',
    created_at: 1629657000000,
    bookmarked: false
  },
  {
    id: 32,
    company_name: MockCompanyNames.DOVE,
    sme_zscore: 222,
    bond_rating: 'D',
    created_at: 1629657000000,
    bookmarked: false
  },
  {
    id: 33,
    company_name: MockCompanyNames.DOVE,
    sme_zscore: 222,
    bond_rating: 'D',
    created_at: 1629657000000,
    bookmarked: false
  },
  {
    id: 34,
    company_name: MockCompanyNames.DOVE,
    sme_zscore: 222,
    bond_rating: 'D',
    created_at: 1629657000000,
    bookmarked: false
  },
  {
    id: 35,
    company_name: 'NEWEST TEST ENTRY',
    sme_zscore: 222,
    bond_rating: 'D',
    created_at: 1630411922216,
    bookmarked: false
  }
];

const mockUsers = {
  'test@test.com': {
    full_name: 'John Doe',
    email: 'test@test.com',
    id: 1,

    // to do: remove and refactor
    recent_usage: {
      last_login: 1629657065187,
      api_requests: 142,
      reports_ran: 32
    },
    is_sso: false,
    contact_information: {
      first_name: 'John',
      last_name: 'Doe',
      country: 'United Kingdom',
      street_address: '123 A place Street',
      city: 'London',
      state: 'Hackney',
      postcode: 'N42FF',
      company_name: 'Awesome Stuff LTD',
      company_hq_location: 'United Kingdom'
    },
    preferences: {
      localisation: 'English (GB)',
      default_currency: 'United Kingdom - Pound (£)',
      default_login_screen: 'dashboard',
      default_reporting_country: 'United Kingdom',
      communication: {
        batch_report_email: true,
        service_update: true,
        company_updates: false
      }
    },
    reports: mockReports
  },
  'new@test.com': {
    full_name: 'Jane Doe (new user)',
    email: 'new@test.com',
    id: 2,
    is_sso: false,
    recent_usage: {
      last_login: null,
      api_requests: 0,
      reports_ran: 0
    },
    contact_information: {
      first_name: 'John',
      last_name: 'Doe',
      country: null,
      street_address: null,
      city: null,
      state: null,
      postcode: null,
      company_name: null,
      company_hq_location: null
    },
    preferences: {
      // eslint-disable-next-line sonarjs/no-duplicate-string
      localisation: 'English (GB)',
      default_currency: 'United Kingdom - Pound (£)',
      default_login_screen: 'dashboard',
      default_reporting_country: 'United Kingdom',
      communication: {
        batch_report_email: true,
        service_update: true,
        company_updates: true
      }
    },
    reports: []
  }
};

export default mockUsers;
