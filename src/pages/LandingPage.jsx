import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useJornada } from '@/lib/JornadaContext';
import { Heart, Briefcase, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  const navigate = useNavigate();
  const { escolherJornada } = useJornada();

  const handleProfissional = () => {
    escolherJornada('profissional');
    navigate('/DemandasDisponiveis');
  };

  const handleConvenio = () => {
    escolherJornada('convenio');
    navigate('/DemandasPublicadas');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo e Título */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
              <Heart className="w-8 h-8 text-white fill-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-3">
            CareNow
          </h1>
          <p className="text-lg text-gray-600">Escolha seu tipo de acesso para começar</p>
        </div>

        {/* Cards de Jornada */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Você é um Profissional de Saúde */}
          <Card className="p-8 hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 border-transparent hover:border-blue-200" onClick={handleProfissional}>
            <div className="flex flex-col h-full">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Profissional de Saúde</h2>
              
              <p className="text-gray-600 text-sm mb-6 flex-grow">
                Encontre demandas de atendimento disponíveis, aceite os chamados que mais se adequam ao seu perfil e acompanhe seus ganhos.
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>Visualize demandas disponíveis</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>Gerencie seus atendimentos</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>Acompanhe sua receita</span>
                </div>
              </div>

              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold py-3 group-hover:shadow-lg transition-all flex items-center justify-center gap-2"
                onClick={handleProfissional}
              >
                Continuar
                <ArrowRight size={18} />
              </Button>
            </div>
          </Card>

          {/* Você é um Convênio */}
          <Card className="p-8 hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 border-transparent hover:border-green-200" onClick={handleConvenio}>
            <div className="flex flex-col h-full">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <Heart className="w-6 h-6 text-green-600 fill-green-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Gestor de Convênio</h2>
              
              <p className="text-gray-600 text-sm mb-6 flex-grow">
                Publique demandas de atendimento para sua rede de profissionais, acompanhe o progresso e gere relatórios detalhados.
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
                  <span>Publique novas demandas</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
                  <span>Acompanhe seu portfólio</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
                  <span>Acesse relatórios e análises</span>
                </div>
              </div>

              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold py-3 group-hover:shadow-lg transition-all flex items-center justify-center gap-2"
                onClick={handleConvenio}
              >
                Continuar
                <ArrowRight size={18} />
              </Button>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Você pode trocar de jornada a qualquer momento nas configurações
          </p>
        </div>
      </div>
    </div>
  );
}
