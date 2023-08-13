import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";

// COOKIES
import Cookies from 'js-cookie';

// TYPES
import { IService, EHttpMethod } from "@/types";

class HttpService {
  private http: AxiosInstance;
  private baseURL = process.env.baseURL;

  constructor() {
    this.http = axios.create({
      baseURL: this.baseURL,
      withCredentials: false,
      headers: this.setupHeaders(),
    });
  }

  private get getAuthorization() {
    const accessToken = Cookies.get("AccessToken") || "";
    return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
  }

  public service() {
    this.injectInterceptors();

    return this;
  }

  private setupHeaders(hasAttachment = false) {
    return hasAttachment
      ? { "Content-Type": "multipart/form-data", ...this.getAuthorization }
      : { "Content-Type": "application/json", ...this.getAuthorization }; 
  }

  private async request<T>(
    method: EHttpMethod,
    url: string,
    options: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.http.request<T>({
        method,
        url,
        ...options,
      });

      return response.data;
    } catch (error) {
      return this.normalizeError(error);
    }
  }

  public async get<T>(url: string, params?: IService.IParams, hasAttachment = false): Promise<T> {
    return this.request<T>(EHttpMethod.GET, url, { params, headers: this.setupHeaders(hasAttachment) });
  }

  public async push<T, P>(url: string, payload: P, params?:  IService.IParams, hasAttachment = false): Promise<T> {
    return this.request<T>(EHttpMethod.POST, url, { params, data: payload, headers: this.setupHeaders(hasAttachment) });
  }

  public async update<T, P>(url: string, payload: P, params?:  IService.IParams, hasAttachment = false): Promise<T> {
    return this.request<T>(EHttpMethod.POST, url, { params, data: payload, headers: this.setupHeaders(hasAttachment) });
  }

  public async remove<T>(url: string, params?:  IService.IParams, hasAttachment = false): Promise<T> {
    return this.request<T>(EHttpMethod.DELETE, url, { params, headers: this.setupHeaders(hasAttachment) });
  }

  private injectInterceptors() {
    // Set up interceptors here
    this.http.interceptors.request.use((request) => {
      // * Perform an action
      // TODO: implement an NProgress
      return request;
    });

    this.http.interceptors.response.use(
      (response) => {
        // * Do something
        return response;
      },

      (error) => {
        // * Implement a global error alert
        return Promise.reject(error);
      }
    );
  }

  private normalizeError(error: unknown) {
    // Normalize error here
    return Promise.reject(error);
  }
}

export { HttpService as default };
