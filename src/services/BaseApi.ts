import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export class BaseApi {
  protected api: AxiosInstance;

  constructor() {
    console.log("API URL:", apiUrl);
    this.api = axios.create({ baseURL: apiUrl });

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        const message =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          "Erro desconhecido ao comunicar com o backend.";
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("apiError", {
              detail: { title: "Erro", message },
            })
          );
        }
        return Promise.reject(error);
      }
    );
  }

  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await this.api.get<T>(url, config);
    return data;
  }

  protected async post<T>(
    url: string,
    body: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const { data } = await this.api.post<T>(url, body, config);
    return data;
  }

  protected async put<T>(
    url: string,
    body: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const { data } = await this.api.put<T>(url, body, config);
    return data;
  }

  protected async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const { data } = await this.api.delete<T>(url, config);
    return data;
  }
}