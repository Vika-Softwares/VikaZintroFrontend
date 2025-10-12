import { BaseApi } from './BaseApi';

export interface CreateCheckoutRequest {
  priceId: string;
  email: string;
  planName: string;
}

export interface CreateCheckoutResponse {
  url: string;
}

export interface SubscriptionStatus {
  id: string;
  userId?: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  priceId?: string;
  planName?: string;
  status: string;
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  createdAt: Date;
}

export class SubscriptionApi extends BaseApi {
  async createCheckout(data: CreateCheckoutRequest): Promise<CreateCheckoutResponse> {
    return this.post<CreateCheckoutResponse>('/checkout/create-session', data);
  }

  async getSubscriptionStatus(email: string): Promise<SubscriptionStatus> {
    return this.get<SubscriptionStatus>(`/subscription/status/${email}`);
  }
}

export const subscriptionApi = new SubscriptionApi();