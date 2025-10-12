import { Zap, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

interface HeroProps {
  onGetStarted: () => void;
  onViewPricing: () => void;
}

export function Hero({ onGetStarted, onViewPricing }: HeroProps) {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">Teste grátis por 14 dias</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Gestão Financeira
            <span className="text-blue-600"> Inteligente</span> para sua Empresa
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Controle completo de contas a pagar, receber, emissão de NFS-e e orçamentos.
            Tudo em uma plataforma moderna e intuitiva.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg shadow-lg"
            >
              <span>Começar Grátis</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              onClick={onViewPricing}
              variant="outline"
              size="lg"
              className="text-lg"
            >
              Ver Preços
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">Não precisa cartão de crédito • Cancele quando quiser</p>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">5.000+</div>
            <div className="text-gray-600">Empresas Ativas</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">99.9%</div>
            <div className="text-gray-600">Uptime Garantido</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">4.8/5</div>
            <div className="text-gray-600">Avaliação dos Usuários</div>
          </div>
        </div>
      </div>
    </section>
  );
}


