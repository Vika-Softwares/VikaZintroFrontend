import { BaseApi } from './BaseApi';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export class AuthApi extends BaseApi {
  async login(data: LoginRequest): Promise<LoginResponse> {
    return this.post<LoginResponse>('/auth/login', data);
  }

  async changePassword(data: ChangePasswordRequest): Promise<{ message: string }> {
    return this.post<{ message: string }>('/auth/change-password', data);
  }
}

export const authApi = new AuthApi();
