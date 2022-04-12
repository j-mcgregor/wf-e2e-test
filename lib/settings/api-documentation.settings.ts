import { linkCardType } from '../../types/api-documentation.d';

export const apiCards: linkCardType[] = [
  {
    header: 'postman_header',
    description: 'postman_description',
    href: '/api-documentation/postman'
  },
  {
    header: 'redoc_header',
    description: 'redoc_description',
    href: '/api-documentation/redoc'
  },
  {
    header: 'swagger_header',
    description: 'swagger_description',
    href: '/api-documentation/swagger'
  }
];

export const documentCards: linkCardType[] = [
  {
    header: 'environment_document_header',
    description: 'environment_document_description',
    href: '/api-documentation/environment-document'
  },
  {
    header: 'collection_document_header',
    description: 'collection_document_description',
    href: '/api-documentation/collection-document'
  }
];
