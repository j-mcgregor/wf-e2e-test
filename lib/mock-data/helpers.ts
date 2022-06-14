import errors from '../../messages/en/errors.en.json';

const mockErrors: Record<string, string> = errors;

export interface MockApiHandlerReturn {
  data: any;
  errorCode: string;
  error: string;
  isError: boolean;
  ok: boolean;
  message: string;
  sourceType: string;
}

export const fetchMockData = async (): Promise<MockApiHandlerReturn> => {
  return new Promise(resolve =>
    setTimeout(
      () =>
        resolve({
          data: null,
          errorCode: 'DEFAULT_REQUEST',
          error: '',
          isError: true,
          ok: false,
          message: '',
          sourceType: ''
        }),
      1000
    )
  );
};

export const getRandomProperty = (): string => {
  const errorKeys = Object.keys(mockErrors);
  const randomKey = Math.floor(Math.random() * errorKeys.length);
  return errorKeys[randomKey];
};
