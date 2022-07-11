import useSWR, { SWRConfiguration } from 'swr';
import {
  ApiHandlerResponse,
  SourceTypes
} from '../lib/api-handler/api-handler';
import fetcher from '../lib/utils/fetcher';
import { ToastTextFromResponseProps, TriggerToast, useToast } from './useToast';

const useSWRWithToasts = <T>(
  url: string | false | null,
  fetcherFunction: (url: string) => Promise<any> = fetcher,
  options: SWRConfiguration,
  toastOptions: TriggerToast | {} = {}
) => {
  const { triggerToast, getToastTextFromResponse } = useToast();
  const { data, isValidating, error, mutate } = useSWR<ApiHandlerResponse<T>>(
    url,
    fetcherFunction,
    options
  );

  if (data?.isError) {
    const toastText = getToastTextFromResponse({
      ...data,
      code: `${data.code}`
    } as ToastTextFromResponseProps);
    toastText &&
      triggerToast({
        toastId: `${data.code}`,
        title: toastText?.title,
        description: toastText?.description,
        status: data.status,
        ...toastOptions
      });
  }

  const isLoading = !data && isValidating;

  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading
  };
};

export default useSWRWithToasts;
