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
      }
      // {
      //   id: 5,
      //   company_Name: 'Dove Feeding Corp',
      //   sme_zscore: 222,
      //   bond_rating: 'D',
      //   created_at: 1629657000000
      // }
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
