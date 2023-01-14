import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

class axiosFacade {
  static get = <T>(url: string, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<T, any>> => {
    return axios.get<T>(url, config);
  };

  static post = <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any> | undefined
  ): Promise<AxiosResponse<T, any>> => {
    return axios.post<T>(url, data, config);
  };

  static put = <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any> | undefined
  ): Promise<AxiosResponse<T, any>> => {
    return axios.put<T>(url, data, config);
  };

  static delete = <T>(url: string, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<T, any>> => {
    return axios.delete<T>(url, config);
  };

  static convertError = (error: unknown): Error | AxiosError =>
    axiosFacade.isAxiosError(error) ? (error as AxiosError) : (error as Error);

  static isAxiosError = (error: unknown): boolean => axios.isAxiosError(error);
}

export default axiosFacade;
