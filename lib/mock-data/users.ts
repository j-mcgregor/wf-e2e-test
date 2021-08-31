const mockUsers = {
  'test@test.com': {
    name: 'John Doe',
    email: 'test@test.com',
    id: 1,
    recent_usage: {
      last_login: 1629657065187,
      api_requests: 142,
      reports_ran: 32
    },
    reports: [
      {
        id: 1,
        company_Name: 'Bird Feeding Corp',
        sme_zscore: 456,
        bond_rating: 'AA',
        created_at: 1629660518563
      },
      {
        id: 2,
        company_Name: 'Swan Feeding Corp',
        sme_zscore: 322,
        bond_rating: 'A-',
        created_at: 1629660001000
      },
      {
        id: 3,
        company_Name: 'Geese Feeding Corp',
        sme_zscore: 345,
        bond_rating: 'A',
        created_at: 1629660000000
      },
      {
        id: 4,
        company_Name: 'Pigeon Feeding Corp',
        sme_zscore: 311,
        bond_rating: 'B+',
        created_at: 1629659000000
      },
      {
        id: 5,
        company_Name: 'Dove Feeding Corp',
        sme_zscore: 222,
        bond_rating: 'D',
        created_at: 1629657000000
      },
      {
        id: 6,
        company_Name: 'Dove Feeding Corp',
        sme_zscore: 222,
        bond_rating: 'D',
        created_at: 1629657000000
      },
      {
        id: 7,
        company_Name: 'Bird Feeding Corp',
        sme_zscore: 456,
        bond_rating: 'AA',
        created_at: 1629660518563
      },
      {
        id: 8,
        company_Name: 'Swan Feeding Corp',
        sme_zscore: 322,
        bond_rating: 'A-',
        created_at: 1629660001000
      },
      {
        id: 9,
        company_Name: 'Geese Feeding Corp',
        sme_zscore: 345,
        bond_rating: 'A',
        created_at: 1629660000000
      },
      {
        id: 10,
        company_Name: 'Pigeon Feeding Corp',
        sme_zscore: 311,
        bond_rating: 'B+',
        created_at: 1629659000000
      },
      {
        id: 11,
        company_Name: 'Dove Feeding Corp',
        sme_zscore: 222,
        bond_rating: 'D',
        created_at: 1629657000000
      },
      {
        id: 12,
        company_Name: 'Dove Feeding Corp',
        sme_zscore: 222,
        bond_rating: 'D',
        created_at: 1629657000000
      },
      {
        id: 13,
        company_Name: 'Bird Feeding Corp',
        sme_zscore: 456,
        bond_rating: 'AA',
        created_at: 1629660518563
      },
      {
        id: 14,
        company_Name: 'Swan Feeding Corp',
        sme_zscore: 322,
        bond_rating: 'A-',
        created_at: 1629660001000
      },
      {
        id: 15,
        company_Name: 'THIRD NEWEST ENTRY TEST',
        sme_zscore: 345,
        bond_rating: 'A',
        created_at: 1630408290506
      },
      {
        id: 16,
        company_Name: 'Pigeon Feeding Corp',
        sme_zscore: 311,
        bond_rating: 'B+',
        created_at: 1629659000000
      },
      {
        id: 17,
        company_Name: 'Dove Feeding Corp',
        sme_zscore: 222,
        bond_rating: 'D',
        created_at: 1629657000000
      },
      {
        id: 18,
        company_Name: 'Dove Feeding Corp',
        sme_zscore: 222,
        bond_rating: 'D',
        created_at: 1629657000000
      },
      {
        id: 19,
        company_Name: 'Bird Feeding Corp',
        sme_zscore: 456,
        bond_rating: 'AA',
        created_at: 1629660518563
      },
      {
        id: 20,
        company_Name: 'Swan Feeding Corp',
        sme_zscore: 322,
        bond_rating: 'A-',
        created_at: 1629660001000
      },
      {
        id: 21,
        company_Name: 'Geese Feeding Corp',
        sme_zscore: 345,
        bond_rating: 'A',
        created_at: 1629660000000
      },
      {
        id: 22,
        company_Name: 'SECOND NEWEST ENTRY TEST',
        sme_zscore: 311,
        bond_rating: 'B+',
        created_at: 1630411549699
      },
      {
        id: 23,
        company_Name: 'Dove Feeding Corp',
        sme_zscore: 222,
        bond_rating: 'D',
        created_at: 1629657000000
      },
      {
        id: 24,
        company_Name: 'Dove Feeding Corp',
        sme_zscore: 222,
        bond_rating: 'D',
        created_at: 1629657000000
      },
      {
        id: 25,
        company_Name: 'Dove Feeding Corp',
        sme_zscore: 222,
        bond_rating: 'D',
        created_at: 1629657000000
      },
      {
        id: 26,
        company_Name: 'Bird Feeding Corp',
        sme_zscore: 456,
        bond_rating: 'AA',
        created_at: 1629660518563
      },
      {
        id: 27,
        company_Name: 'Swan Feeding Corp',
        sme_zscore: 322,
        bond_rating: 'A-',
        created_at: 1629660001000
      },
      {
        id: 28,
        company_Name: 'Geese Feeding Corp',
        sme_zscore: 345,
        bond_rating: 'A',
        created_at: 1629660000000
      },
      {
        id: 29,
        company_Name: 'Pigeon Feeding Corp',
        sme_zscore: 311,
        bond_rating: 'B+',
        created_at: 1629659000000
      },
      {
        id: 30,
        company_Name: 'Dove Feeding Corp',
        sme_zscore: 222,
        bond_rating: 'D',
        created_at: 1629657000000
      },
      {
        id: 31,
        company_Name: 'Dove Feeding Corp',
        sme_zscore: 222,
        bond_rating: 'D',
        created_at: 1629657000000
      },
      {
        id: 32,
        company_Name: 'Dove Feeding Corp',
        sme_zscore: 222,
        bond_rating: 'D',
        created_at: 1629657000000
      },
      {
        id: 33,
        company_Name: 'Dove Feeding Corp',
        sme_zscore: 222,
        bond_rating: 'D',
        created_at: 1629657000000
      },
      {
        id: 34,
        company_Name: 'Dove Feeding Corp',
        sme_zscore: 222,
        bond_rating: 'D',
        created_at: 1629657000000
      },
      {
        id: 35,
        company_Name: 'NEWEST TEST ENTRY',
        sme_zscore: 222,
        bond_rating: 'D',
        created_at: 1630411922216
      }
    ]
  },
  'new@test.com': {
    name: 'Jane Doe (new user)',
    email: 'new@test.com',
    id: 2,
    recent_usage: {
      last_login: null,
      api_requests: 0,
      reports_ran: 0
    },
    reports: []
  }
};

export default mockUsers;
