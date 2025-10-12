import {
  DollarSign,
  FileText,
  BarChart3,
  CreditCard,
  TrendingUp,
  Users,
  Shield,
  Clock,
  Zap,
} from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: DollarSign,
      title: 'Contas a Pagar e Receber',
      description: 'Controle total sobre suas finanças com gestão completa de pagamentos e recebimentos.',
    },
    {
      icon: FileText,
      title: 'Emissão de NFS-e',
      description: 'Emita notas fiscais de serviço diretamente pelo sistema, integrado com prefeituras.',
    },
    {
      icon: BarChart3,
      title: 'Relatórios Avançados',
      description: 'Dashboards intuitivos e relatórios detalhados para tomada de decisões estratégicas.',
    },
    {
      icon: CreditCard,
      title: 'Gestão de Orçamentos',
      description: 'Crie e envie orçamentos profissionais com poucos cliques.',
    },
    {
      icon: TrendingUp,
      title: 'Fluxo de Caixa',
      description: 'Visualize seu fluxo de caixa em tempo real e planeje o futuro financeiro.',
    },
    {
      icon: Users,
      title: 'Multi-usuários',
      description: 'Colabore com sua equipe com controle de permissões e acessos.',
    },
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Tudo que você precisa para gerir suas finanças
          </h2>
          <p className="text-xl text-gray-600">
            Recursos completos para controle financeiro empresarial profissional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                <feature.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 sm:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div className="flex items-start space-x-4">
              <Shield className="w-8 h-8 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-lg mb-2">Segurança Máxima</h4>
                <p className="text-blue-100">Criptografia de ponta a ponta e backup automático diário</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Clock className="w-8 h-8 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-lg mb-2">Economia de Tempo</h4>
                <p className="text-blue-100">Automatize processos e economize até 20 horas por semana</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Zap className="w-8 h-8 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-lg mb-2">Rápido e Fácil</h4>
                <p className="text-blue-100">Interface intuitiva, comece a usar em minutos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


