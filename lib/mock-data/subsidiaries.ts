import { Subsidiary } from '../../types/report';

export const mockSubsidiaries: Subsidiary[] = Array(4)
  .fill({
    id: '',
    name: ''
  })
  .map((_, i) => ({
    id: `${i + 1}`,
    name: `Subsidiary ${i + 1} LTD`
  }));
