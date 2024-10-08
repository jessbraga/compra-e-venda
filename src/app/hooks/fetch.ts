import useSWR, { mutate } from 'swr';
import { get } from '@/app/lib/api';
import { AxiosRequestConfig } from 'axios';

interface FetchError {
  message: string
  status?: number
}

export function useFetch<T>(url: string, config?: AxiosRequestConfig) {
  const { data, error, isLoading } = useSWR<T, FetchError>(url, () => get<T>(url, config))

  const reValidate = () =>  {
    mutate(url)
  }

  return {
    data,
    isLoading,
    isError: !!error,
    error,
    reValidate
  }
}
