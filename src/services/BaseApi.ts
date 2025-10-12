import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export class BaseApi {
  protected api: AxiosInstance;

  constructor() {
    this.api = axios.create({ baseURL: apiUrl });

    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 401) {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_user');
          window.location.href = '/login';
        }

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