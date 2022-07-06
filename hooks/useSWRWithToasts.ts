import useSWR, { SWRConfiguration } from 'swr';
import fetcher from '../lib/utils/fetcher';
import { TriggerToast, useToast } from './useToast';

const useSWRWithToasts = (
  url: string | false | null,
  fetcherFunction: (url: string) => Promise<any> = fetcher,
  options: SWRConfiguration,
  toastOptions: TriggerToast | {} = {}
) => {
  const { triggerToast, getToastTextFromResponse } = useToast();
  const { data, isValidating, error, mutate } = useSWR(
    url,
    fetcherFunction,
    options
  );

  if (data?.isError) {
    const toastText = getToastTextFromResponse(data);
    toastText &&
      triggerToast({
        toastId: data.code,
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
