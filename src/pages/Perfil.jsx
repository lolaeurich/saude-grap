import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useJornada } from '@/lib/JornadaContext';
import PageHeader from '@/components/layout/PageHeader';
import BottomNav from '@/components/layout/BottomNav';
import TopNav from '@/components/layout/TopNav';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin } from "lucide-react";

const mockPerfil = {
  nome: "Dr. Fernando Silva",
  especialidade: "Médico Clínico Geral",
  email: "fernando.silva@example.com",
  telefone: "(11) 98765-4321",
  cidade: "São Paulo, SP",
  crm: "123456/SP",
  classificacao: 4.8,
  avaliacoes: 47,
  demandas: 22,
  sobre: "Médico com mais de 10 anos de experiência em clínica geral. Especialista em atendimento integrado.",
  verificado: true
};

export default function Perfil() {
  const navigate = useNavigate();
  const { resetarJornada } = useJornada();

  const handleLogout = () => {
    resetarJornada();
    navigate('/', { replace: true });
  };

  return (
    <div className="pb-32">
      <TopNav />
      <PageHeader title="Meu Perfil" />
      
      <div className="p-4 md:px-12 lg:px-24 max-w-6xl mx-auto space-y-4">
        {/* Cabeçalho do Perfil */}
        <Card className="p-6 text-center bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white text-2xl font-bold">
              FS
            </div>
          </div>
          <h2 className="font-bold text-xl">{mockPerfil.nome}</h2>
          <p className="text-sm text-gray-600">{mockPerfil.especialidade}</p>
          <div className="flex items-center justify-center gap-1 mt-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className={i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
              ))}
            </div>
            <span className="text-sm font-semibold">{mockPerfil.classificacao}</span>
            <span className="text-xs text-gray-600">({mockPerfil.avaliacoes} avaliações)</span>
          </div>
          {mockPerfil.verificado && (
            <div className="mt-3 inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
              ✓ Verificado
            </div>
          )}
        </Card>

        {/* Informações Principais */}
        <div className="grid grid-cols-3 gap-2">
          <Card className="p-3 text-center">
            <div className="text-2xl font-bold text-blue-600">{mockPerfil.demandas}</div>
            <div className="text-xs text-gray-600">Demandas</div>
          </Card>
          <Card className="p-3 text-center">
            <div className="text-2xl font-bold text-green-600">0%</div>
            <div className="text-xs text-gray-600">Taxa</div>
          </Card>
          <Card className="p-3 text-center">
            <div className="text-2xl font-bold text-purple-600">10+</div>
            <div className="text-xs text-gray-600">Anos exp.</div>
          </Card>
        </div>

        {/* Detalhes de Contato */}
        <Card className="p-4">
          <h3 className="font-bold mb-3">Informações de Contato</h3>
          <div className="space-y-2 text-sm">
            <p className="text-gray-600">Email: <span className="font-semibold text-gray-900">{mockPerfil.email}</span></p>
            <p className="text-gray-600">Telefone: <span className="font-semibold text-gray-900">{mockPerfil.telefone}</span></p>
            <p className="text-gray-600">CRM: <span className="font-semibold text-gray-900">{mockPerfil.crm}</span></p>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin size={16} />
              <span>{mockPerfil.cidade}</span>
            </div>
          </div>
        </Card>

        {/* Sobre */}
        <Card className="p-4">
          <h3 className="font-bold mb-2">Sobre Você</h3>
          <p className="text-sm text-gray-700">{mockPerfil.sobre}</p>
        </Card>

        {/* Ações */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold py-2.5">
            Editar Perfil
          </Button>
          <Button variant="outline" className="rounded-lg font-semibold py-2.5 border-gray-300 hover:bg-gray-50">
            Configurações
          </Button>
          <Button 
            variant="outline" 
            className="col-span-1 md:col-span-2 text-red-600 border-red-200 hover:bg-red-50 rounded-lg font-semibold py-2.5"
            onClick={handleLogout}
          >
            Sair da Plataforma
          </Button>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
