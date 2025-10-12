import { BarChart3 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/logo_zyntro.png" alt="Vika Zyntro" className="w-24 h-10" />
            </div>
            <p className="text-sm">
              Gestão financeira inteligente para empresas modernas.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Produto</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-white transition">Recursos</a></li>
              <li><a href="#pricing" className="hover:text-white transition">Preços</a></li>
              <li><a href="#" className="hover:text-white transition">Segurança</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Sobre</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
              <li><a href="#" className="hover:text-white transition">Carreiras</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Suporte</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-white transition">Contato</a></li>
              <li><a href="#" className="hover:text-white transition">Status</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-sm text-center">
          <p>&copy; 2025 Vika Zyntro. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}


