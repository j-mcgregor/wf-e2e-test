import { Subsidiary } from '../../types/report';

export const mockSubsidiaries: Subsidiary[] = Array(4)
  .fill({
    id: '',
    name: ''
  })
  .map((_, i) => ({
    company_id: `${i + 1}`,
    name: `Subsidiary ${i + 1} LTD`,
    iso_code: 'GB',
    nace_code: '',
    nace_name: '',
    website: ''
  }));
