const companyNameOptions: string[] = [
  'Bird',
  'Swan',
  'Geese',
  'Pigeon',
  'Dove',
  'Dolphin',
  'Seagull',
  'Ant',
  'Termite',
  'Shark',
  'Barracuda',
  'Wasp',
  'Cat',
  'Alligator',
  'Crocodile',
  'Rhino',
  'Giraffe',
  'Wolverine',
  'Ant Eater',
  'Smiling Sharks',
  'Sad Sharks',
  'Owl'
];

const companyEnding: string = ' LTD';

export type ShortCompany = {
  name: string;
  registered_address: string;
  registration_date: number | Date;
  company_id: string;
};

const generateMockCompanies = (): ShortCompany[] => {
  return companyNameOptions.map(name => ({
    name: name + companyEnding,
    registered_address: '123 Regent Street, London, England',
    registration_date: 1626603231,
    company_id: '123456789'
  }));
};

const mockCompanies: ShortCompany[] = generateMockCompanies();

export default mockCompanies;
