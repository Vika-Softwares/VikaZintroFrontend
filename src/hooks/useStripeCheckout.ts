import { useState } from 'react';
import { subscriptionApi } from '../services/SubscriptionApi';

export function useStripeCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCheckout = async (params: {
    priceId: string;
    email: string;
    planName: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await subscriptionApi.createCheckout(params);
      
      if (response.url) {
        window.location.href = response.url;
      } else {
        throw new Error('URL de checkout não retornada');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao criar checkout';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createCheckout, loading, error };
}