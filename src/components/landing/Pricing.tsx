import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';

interface PricingProps {
  onSelectPlan: (planName: string, billingCycle: 'monthly' | 'yearly') => void;
  loading?: boolean;
}

export function Pricing({ onSelectPlan, loading = false }: PricingProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Básico',
      description: 'Ideal para pequenas empresas iniciantes',
      monthlyPrice: 29.90,
      yearlyPrice: 299,
      features: [
        'Até 3 usuários',
        'Contas a pagar e receber',
        'Emissão de até 50 NFS-e/mês',
        'Relatórios básicos',
        'Suporte por email',
        '5 GB de armazenamento',
      ],
      highlighted: false,
    },
    {
      name: 'Profissional',
      description: 'Para empresas em crescimento',
      monthlyPrice: 79.90,
      yearlyPrice: 799,
      features: [
        'Até 10 usuários',
        'Contas a pagar e receber ilimitadas',
        'Emissão ilimitada de NFS-e',
        'Relatórios avançados e dashboards',
        'Gestão completa de orçamentos',
        'Suporte prioritário',
        '50 GB de armazenamento',
        'Integração com bancos',
        'App mobile',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      description: 'Solução completa para grandes empresas',
      monthlyPrice: 149.90,
      yearlyPrice: 1499,
      features: [
        'Usuários ilimitados',
        'Todos os recursos do Profissional',
        'API personalizada',
        'Gerente de conta dedicado',
        'Suporte 24/7',
        'Armazenamento ilimitado',
        'Treinamento personalizado',
        'Múltiplas empresas/filiais',
        'Relatórios customizados',
      ],
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Escolha o plano ideal para seu negócio
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Sem taxas ocultas. Cancele quando quiser.
          </p>

          <div className="inline-flex items-center bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md transition font-medium ${
                billingCycle === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md transition font-medium relative ${
                billingCycle === 'yearly'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Anual
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                Economize 17%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 ${
                plan.highlighted
                  ? 'bg-blue-600 text-white shadow-2xl scale-105 border-4 border-blue-400'
                  : 'bg-white border-2 border-gray-200'
              } transition-all duration-300 hover:shadow-xl relative`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                  Mais Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <p className={plan.highlighted ? 'text-blue-100' : 'text-gray-600'}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className={`text-5xl font-bold ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                    R$ {(billingCycle === 'monthly' ? plan.monthlyPrice : Math.floor(plan.yearlyPrice / 12)).toFixed(2).replace('.', ',')}
                  </span>
                  <span className={`ml-2 ${plan.highlighted ? 'text-blue-100' : 'text-gray-600'}`}>
                    /mês
                  </span>
                </div>
                {billingCycle === 'yearly' && (
                  <p className={`text-sm mt-1 ${plan.highlighted ? 'text-blue-100' : 'text-gray-500'}`}>
                    Cobrado anualmente R$ {plan.yearlyPrice.toFixed(2).replace('.', ',')}
                  </p>
                )}
              </div>

              <Button
                onClick={() => onSelectPlan(plan.name, billingCycle)}
                disabled={loading}
                className={`w-full mb-6 ${
                  plan.highlighted
                    ? 'bg-white text-blue-600 hover:bg-blue-50'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {loading ? 'Processando...' : 'Começar Agora'}
              </Button>

              <ul className="space-y-3">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start">
                    <CheckCircle2 className={`w-5 h-5 mr-3 flex-shrink-0 mt-0.5 ${
                      plan.highlighted ? 'text-blue-200' : 'text-green-500'
                    }`} />
                    <span className={plan.highlighted ? 'text-blue-50' : 'text-gray-700'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-600 mt-12">
          Todos os planos incluem 14 dias de teste grátis • Sem compromisso
        </p>
      </div>
    </section>
  );
}