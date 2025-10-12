export const STRIPE_PRICES = {
  BASICO_MONTHLY_TEST: 'price_1SG6RM9elBdol8l3PGDExPP5',
  BASICO_YEARLY_TEST: 'price_1SG6Rc9elBdol8l3bRKTF0Uh',
  PROFISSIONAL_MONTHLY_TEST: 'price_1SG6S29elBdol8l3kILksCCp',
  PROFISSIONAL_YEARLY_TEST: 'price_1SG6SJ9elBdol8l3jlGeAmeR',
  ENTERPRISE_MONTHLY_TEST: 'price_1SG6Sh9elBdol8l3sooRAZBb',
  ENTERPRISE_YEARLY_TEST: 'price_1SG6TN9elBdol8l3BR6pA5fC',
};

export function getPriceId(planName: string, cycle: 'monthly' | 'yearly'): string {
  const priceMap: Record<string, Record<string, string>> = {
    'Básico': {
      monthly: STRIPE_PRICES.BASICO_MONTHLY_TEST,
      yearly: STRIPE_PRICES.BASICO_YEARLY_TEST,
    },
    'Profissional': {
      monthly: STRIPE_PRICES.PROFISSIONAL_MONTHLY_TEST,
      yearly: STRIPE_PRICES.PROFISSIONAL_YEARLY_TEST,
    },
    'Enterprise': {
      monthly: STRIPE_PRICES.ENTERPRISE_MONTHLY_TEST,
      yearly: STRIPE_PRICES.ENTERPRISE_YEARLY_TEST,
    },
  };
  return priceMap[planName]?.[cycle] || '';
}