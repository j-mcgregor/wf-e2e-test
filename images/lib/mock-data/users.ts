/* eslint-disable sonarjs/no-duplicate-string */
export const MockCompanyNames = {
  BIRD: 'Bird Feeding Corp',
  SWAN: 'Swan Feeding Corp',
  GEESE: 'Geese Feeding Corp',
  PIGEON: 'Pigeon Feeding Corp',
  DOVE: 'Dove Feeding Corp'
};

const mockBatchedReports = [
  {
    company_id: '124556',
    sme_z_score: '110',
    company_name: 'Swan Feeding Corp',
    bond_rating: 'B',
    probability_of_default: '78'
  },
  {
    company_id: '245561',
    sme_z_score: '43',
    company_name: 'Swan Feeding Corp',
    bond_rating: 'B',
    probability_of_default: '129'
  },
  {
    company_id: '455612',
    sme_z_score: '296',
    company_name: 'Pigeon Feeding Corp',
    bond_rating: 'B',
    probability_of_default: '5'
  },
  {
    company_id: '556124',
    sme_z_score: '441',
    company_name: 'Swan Feeding Corp',
    bond_rating: 'B',
    probability_of_default: '81'
  },
  {
    company_id: '561245',
    sme_z_score: '298',
    company_name: 'Pigeon Feeding Corp',
    bond_rating: 'B',
    probability_of_default: '41'
  },
  {
    company_id: '612455',
    sme_z_score: '416',
    company_name: 'Geese Feeding Corp',
    bond_rating: 'B',
    probability_of_default: '161'
  },
  {
    company_id: '87262',
    sme_z_score: '110',
    company_name: 'Bird Feeding Corp',
    bond_rating: 'B',
    probability_of_default: '70'
  },
  {
    company_id: '123450',
    sme_z_score: '426',
    company_name: 'Geese Feeding Corp',
    bond_rating: 'B',
    probability_of_default: '118'
  },
  {
    company_id: '098761',
    sme_z_score: '232',
    company_name: 'Swan Feeding Corp',
    bond_rating: 'B',
    probability_of_default: '150'
  },
  {
    company_id: '012312',
    sme_z_score: '9',
    company_name: 'Dove Feeding Corp',
    bond_rating: 'B',
    probability_of_default: '77'
  },
  {
    company_id: '123123',
    sme_z_score: '136',
    company_name: 'Bird Feeding Corp',
    bond_rating: 'B',
    probability_of_default: '101'
  },
  {
    company_id: '123153',
    sme_z_score: '469',
    company_name: 'Swan Feeding Corp',
    bond_rating: 'B',
    probability_of_default: '190'
  }
];

export const mockReports = [
  {
    id: '1',
    company_name: MockCompanyNames.BIRD,
    sme_z_score: 456,
    bond_rating: 'AA',
    created_at: '1629660518563',
    bookmarked: false
  },
  {
    id: '2',
    company_name: MockCompanyNames.SWAN,
    sme_z_score: 322,
    bond_rating: 'A-',
    created_at: '1629660001000',
    bookmarked: false
  },
  {
    id: '3',
    company_name: MockCompanyNames.GEESE,
    sme_z_score: 345,
    bond_rating: 'A',
    created_at: '1629660000000',
    bookmarked: false
  },
  {
    id: '4',
    company_name: MockCompanyNames.PIGEON,
    sme_z_score: 311,
    bond_rating: 'B+',
    created_at: '1629659000000',
    bookmarked: false
  },
  {
    id: '5',
    company_name: MockCompanyNames.DOVE,
    sme_z_score: 222,
    bond_rating: 'D',
    created_at: '1629657000000',
    bookmarked: true
  },
  {
    id: '6',
    company_name: MockCompanyNames.DOVE,
    sme_z_score: 222,
    bond_rating: 'D',
    created_at: '1629657000000',
    bookmarked: false
  },
  {
    id: '7',
    company_name: MockCompanyNames.BIRD,
    sme_z_score: 456,
    bond_rating: 'AA',
    created_at: '1629660518563',
    bookmarked: false
  },
  {
    id: '8',
    company_name: MockCompanyNames.SWAN,
    sme_z_score: 322,
    bond_rating: 'A-',
    created_at: '1629660001000',
    bookmarked: true
  },
  {
    id: '9',
    company_name: MockCompanyNames.GEESE,
    sme_z_score: 345,
    bond_rating: 'A',
    created_at: '1629660000000',
    bookmarked: true
  },
  {
    id: '10',
    company_name: MockCompanyNames.PIGEON,
    sme_z_score: 311,
    bond_rating: 'B+',
    created_at: '1629659000000',
    bookmarked: false
  },
  {
    id: '11',
    company_name: MockCompanyNames.DOVE,
    sme_z_score: 222,
    bond_rating: 'D',
    created_at: '1629657000000',
    bookmarked: false
  },
  {
    id: '12',
    company_name: MockCompanyNames.DOVE,
    sme_z_score: 222,
    bond_rating: 'D',
    created_at: '1629657000000'
  },
  {
    id: '13',
    company_name: MockCompanyNames.BIRD,
    sme_z_score: 456,
    bond_rating: 'AA',
    created_at: '1629660518563',
    bookmarked: false
  },
  {
    id: '14',
    company_name: MockCompanyNames.SWAN,
    sme_z_score: 322,
    bond_rating: 'A-',
    created_at: '1629660001000',
    bookmarked: false
  },
  {
    id: '15',
    company_name: 'THIRD NEWEST ENTRY TEST',
    sme_z_score: 345,
    bond_rating: 'A',
    created_at: '1630408290506',
    bookmarked: false
  },
  {
    id: '16',
    company_name: MockCompanyNames.PIGEON,
    sme_z_score: 311,
    bond_rating: 'B+',
    created_at: '1629659000000',
    bookmarked: false
  },
  {
    id: '17',
    company_name: MockCompanyNames.DOVE,
    sme_z_score: 222,
    bond_rating: 'D',
    created_at: '1629657000000',
    bookmarked: false
  },
  {
    id: '18',
    company_name: MockCompanyNames.DOVE,
    sme_z_score: 222,
    bond_rating: 'D',
    created_at: '1629657000000',
    bookmarked: false
  },
  {
    id: '19',
    company_name: MockCompanyNames.BIRD,
    sme_z_score: 456,
    bond_rating: 'AA',
    created_at: '1629660518563',
    bookmarked: false
  },
  {
    id: '20',
    company_name: MockCompanyNames.SWAN,
    sme_z_score: 322,
    bond_rating: 'A-',
    created_at: '1629660001000',
    bookmarked: false
  },
  {
    id: '21',
    company_name: MockCompanyNames.GEESE,
    sme_z_score: 345,
    bond_rating: 'A',
    created_at: '1629660000000',
    bookmarked: false
  },
  {
    id: '22',
    company_name: 'SECOND NEWEST ENTRY TEST',
    sme_z_score: 311,
    bond_rating: 'B+',
    created_at: '1630411549699',
    bookmarked: true
  },
  {
    id: '23',
    company_name: MockCompanyNames.DOVE,
    sme_z_score: 222,
    bond_rating: 'D',
    created_at: '1629657000000',
    bookmarked: false
  },
  {
    id: '24',
    company_name: MockCompanyNames.DOVE,
    sme_z_score: 222,
    bond_rating: 'D',
    created_at: '1629657000000',
    bookmarked: false
  },
  {
    id: '25',
    company_name: MockCompanyNames.DOVE,
    sme_z_score: 222,
    bond_rating: 'D',
    created_at: '1629657000000',
    bookmarked: false
  },
  {
    id: '26',
    company_name: MockCompanyNames.BIRD,
    sme_z_score: 456,
    bond_rating: 'AA',
    created_at: '1629660518563',
    bookmarked: false
  },
  {
    id: '27',
    company_name: MockCompanyNames.SWAN,
    sme_z_score: 322,
    bond_rating: 'A-',
    created_at: '1629660001000',
    bookmarked: false
  },
  {
    id: '28',
    company_name: MockCompanyNames.GEESE,
    sme_z_score: 345,
    bond_rating: 'A',
    created_at: '1629660000000',
    bookmarked: false
  },
  {
    id: '29',
    company_name: MockCompanyNames.PIGEON,
    sme_z_score: 311,
    bond_rating: 'B+',
    created_at: '1629659000000',
    bookmarked: false
  },
  {
    id: '30',
    company_name: MockCompanyNames.DOVE,
    sme_z_score: 222,
    bond_rating: 'D',
    created_at: '1629657000000',
    bookmarked: false
  },
  {
    id: '31',
    company_name: MockCompanyNames.DOVE,
    sme_z_score: 222,
    bond_rating: 'D',
    created_at: '1629657000000',
    bookmarked: false
  },
  {
    id: '32',
    company_name: MockCompanyNames.DOVE,
    sme_z_score: 222,
    bond_rating: 'D',
    created_at: '1629657000000',
    bookmarked: false
  },
  {
    id: '33',
    company_name: MockCompanyNames.DOVE,
    sme_z_score: 222,
    bond_rating: 'D',
    created_at: '1629657000000',
    bookmarked: false
  },
  {
    id: '34',
    company_name: MockCompanyNames.DOVE,
    sme_z_score: 222,
    bond_rating: 'D',
    created_at: '1629657000000',
    bookmarked: false
  },
  {
    id: '35',
    company_name: 'NEWEST TEST ENTRY',
    sme_z_score: 222,
    bond_rating: 'D',
    created_at: '1630411922216',
    bookmarked: false
  }
];

const mockUsers = {
  'test@test.com': {
    full_name: 'John Doe',
    email: 'test@test.com',
    id: 1,
    preferences: {
      defaults: {
        locale: 'en-GB',
        currency: 'GBP',
        home_page: 'dashboard',
        reporting_country: 'GB'
      },
      communication: {
        batch_report_email: true,
        service_updates: true, // wiserfunding api updates / service i.e. api back up
        company_updates: false // wiserfunding company updates i.e. series b raised
      }
    },
    reports: mockReports,
    batched_report_jobs: [
      {
        id: 12,
        name: 'Car Niche',
        create_date: 1629657000000,
        finish_date: 1629657000000,
        total_reports: mockBatchedReports.length,
        company_list: mockBatchedReports
      },
      {
        id: 13,
        name: 'Batched Report - 11/11/21 - (12) ',
        create_date: 1629657000000,
        finish_date: 1629657000000,
        total_reports: mockBatchedReports.length,
        company_list: mockBatchedReports
      },
      {
        id: 14,
        name: 'Tv Niche',
        create_date: 1629657000000,
        finish_date: 1629657000000,
        total_reports: mockBatchedReports.length,
        company_list: mockBatchedReports
      },
      {
        id: 15,
        name: 'Teddy bear Niche (in Progress)',
        create_date: 1629657000000,
        finish_date: false,
        total_reports: mockBatchedReports.length,
        company_list: []
      }
    ]
  },
  'new@test.com': {
    full_name: 'Jane Doe (new user)',
    email: 'new@test.com',
    id: 2,
    preferences: {
      defaults: {
        locale: 'en-GB',
        currency: 'GBP',
        home_page: 'dashboard',
        reporting_country: 'GB'
      },
      communication: {
        batch_report_email: true,
        service_updates: true, // wiserfunding api updates / service i.e. api back up
        company_updates: false // wiserfunding company updates i.e. series b raised
      }
    },
    reports: [],
    batched_report_jobs: []
  }
};

export default mockUsers;
