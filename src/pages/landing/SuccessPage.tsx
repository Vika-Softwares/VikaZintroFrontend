import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Mail, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

export function SuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [sessionId] = useState(searchParams.get('session_id'));

  useEffect(() => {
    if (!sessionId) {
      navigate('/');
    }
  }, [sessionId, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">Pagamento Confirmado!</CardTitle>
          <CardDescription className="text-lg mt-2">
            Sua assinatura foi processada com sucesso
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-6 text-center">
            <Mail className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <h3 className="font-bold text-lg mb-2">Verifique seu email</h3>
            <p className="text-gray-700">
              Enviamos suas credenciais de acesso para o email cadastrado.
              Em poucos minutos você receberá seu <strong>usuário e senha temporária</strong>.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold">Próximos passos:</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Verifique sua caixa de entrada (e spam)</li>
              <li>Use as credenciais recebidas para fazer login</li>
              <li>Altere sua senha no primeiro acesso</li>
              <li>Comece a usar o Vika Zyntro!</li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => navigate('/login')}
              className="flex-1"
            >
              <span>Ir para Login</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="flex-1"
            >
              Voltar ao Início
            </Button>
          </div>

          <p className="text-sm text-gray-500 text-center">
            Tem alguma dúvida? Entre em contato com nosso suporte.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}


