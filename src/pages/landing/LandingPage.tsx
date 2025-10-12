import { useState } from 'react';
import { Menu, X, BarChart3, ArrowRight } from 'lucide-react';
import { Hero } from '../../components/landing/Hero';
import { Features } from '../../components/landing/Features';
import { Pricing } from '../../components/landing/Pricing';
import { Testimonials } from '../../components/landing/Testimonials';
import { Footer } from '../../components/landing/Footer';
import { useStripeCheckout } from '../../hooks/useStripeCheckout';
import { getPriceId } from '../../config/stripe.config';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';

export function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    cycle: 'monthly' | 'yearly';
  } | null>(null);
  const [email, setEmail] = useState('');

  const { createCheckout, loading, error } = useStripeCheckout();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleSelectPlan = (planName: string, cycle: 'monthly' | 'yearly') => {
    setSelectedPlan({ name: planName, cycle });
    setIsModalOpen(true);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan || !email) return;

    const priceId = getPriceId(selectedPlan.name, selectedPlan.cycle);
    if (!priceId) {
      alert('ID do preço não configurado');
      return;
    }

    await createCheckout({
      priceId,
      email,
      planName: selectedPlan.name,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <img src="/logo_zyntro.png" alt="Vika Zyntro" className="w-24 h-10" />
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('features')}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Recursos
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Preços
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Depoimentos
              </button>
              <Button
                onClick={() => (window.location.href = '/login')}
                variant="outline"
              >
                Login
              </Button>
              <Button onClick={() => scrollToSection('pricing')}>
                Começar Grátis
              </Button>
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4">
              <button
                onClick={() => scrollToSection('features')}
                className="block text-gray-700 hover:text-blue-600 transition"
              >
                Recursos
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="block text-gray-700 hover:text-blue-600 transition"
              >
                Preços
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="block text-gray-700 hover:text-blue-600 transition"
              >
                Depoimentos
              </button>
              <Button
                onClick={() => (window.location.href = '/login')}
                variant="outline"
                className="w-full"
              >
                Login
              </Button>
              <Button onClick={() => scrollToSection('pricing')} className="w-full">
                Começar Grátis
              </Button>
            </div>
          )}
        </nav>
      </header>

      <Hero
        onGetStarted={() => scrollToSection('pricing')}
        onViewPricing={() => scrollToSection('pricing')}
      />

      <Features />

      <Pricing onSelectPlan={handleSelectPlan} loading={loading} />

      <Testimonials />

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para transformar sua gestão financeira?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Junte-se a milhares de empresas que já otimizaram seus processos financeiros
          </p>
          <Button
            onClick={() => scrollToSection('pricing')}
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50"
          >
            <span>Começar Teste Grátis de 14 Dias</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-sm text-blue-100 mt-4">Não precisa cartão de crédito</p>
        </div>
      </section>

      <Footer />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirme seu email</DialogTitle>
            <DialogDescription>
              Digite seu email para continuar com a assinatura do plano{' '}
              <strong>{selectedPlan?.name}</strong>.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Processando...' : 'Continuar para Pagamento'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}


