import errors from '../../messages/en/errors.en.json';
import { SourceTypes } from '../api-handler/api-handler';

const mockErrors: Record<string, string> = errors;

export interface MockApiHandlerReturn {
  data: any;
  code: string;
  error: string;
  isError: boolean;
  ok: boolean;
  message: string;
  sourceType: SourceTypes;
  status: number;
  blob?: Blob;

  [x: string]: any;
}

export const fetchMockData =
  (status: number, sourceType: SourceTypes, code?: string) =>
  async (): Promise<MockApiHandlerReturn> => {
    return new Promise(resolve =>
      setTimeout(
        () =>
          resolve({
            data: null,
            code: code || 'DEFAULT_REQUEST',
            error: '',
            isError: true,
            ok: false,
            message: '',
            sourceType,
            status,
            reports: []
          }),
        200
      )
    );
  };

export const getRandomProperty = (): string => {
  const errorKeys = Object.keys(mockErrors);
  const randomKey = Math.floor(Math.random() * errorKeys.length);
  return errorKeys[randomKey];
};
