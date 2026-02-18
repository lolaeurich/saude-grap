import React, { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import BottomNav from '@/components/layout/BottomNav';
import TopNav from '@/components/layout/TopNav';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, DollarSign, MapPin, X, Phone, Mail, CheckCircle, Clock } from "lucide-react";

const mockDemandasPublicadas = [
  {
    id: 1,
    titulo: "Triagem de Enfermagem",
    pacientes: 3,
    especialidade: "Enfermagem",
    localizacao: "São Paulo - SP",
    endereco: "Rua das Flores, 123 - São Paulo - SP",
    data: "2025-02-20",
    valor: 90,
    status: "aberta",
    descricao: "Triagem inicial para 3 pacientes em acompanhamento domiciliar",
    detalhesCompletos: "Necessário realizar triagem inicial em 3 pacientes do convênio para avaliação de saúde geral, sinais vitais e histórico clínico.",
    profissionais: 0,
    telefone: "(11) 3000-1001"
  },
  {
    id: 2,
    titulo: "Atendimento Clínico em Casa",
    pacientes: 2,
    especialidade: "Clínica Geral",
    localizacao: "Vila Mariana - SP",
    endereco: "Avenida Paulista, 1000 - Vila Mariana - SP",
    data: "2025-02-21",
    valor: 120,
    status: "aberta",
    descricao: "Atendimento clínico para 2 pacientes com acompanhamento contínuo",
    detalhesCompletos: "Atendimento clínico de rotina para 2 pacientes crônicos em acompanhamento. Verificação de sinais vitais, orientações medicamentosas e coleta de dados para monitoramento contínuo.",
    profissionais: 1,
    telefone: "(11) 3000-1002"
  },
  {
    id: 3,
    titulo: "Avaliação Odontológica",
    pacientes: 5,
    especialidade: "Odontologia",
    localizacao: "Zona Oeste - SP",
    endereco: "Rua Brasil, 500 - Zona Oeste - SP",
    data: "2025-02-22",
    valor: 150,
    status: "parcial",
    descricao: "Avaliação odontológica preventiva para 5 pacientes idosos",
    detalhesCompletos: "Avaliação odontológica preventiva para 5 pacientes idosos, com foco em saúde bucal e higiene. Avaliação de necessidade de limpeza profissional ou outros procedimentos.",
    profissionais: 2,
    telefone: "(11) 3000-1003"
  }
];

export default function DemandasPublicadas() {
  const [demandas] = useState(mockDemandasPublicadas);
  const [selectedDemanda, setSelectedDemanda] = useState(null);

  return (
    <div className="pb-32">
      <TopNav currentPage="DemandasPublicadas" />
      <PageHeader title="Demandas Publicadas" />
      
      <div className="p-4 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">Demandas publicadas pelo seu convênio. Acompanhe o progresso das contratações.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {demandas.map(demanda => (
            <Card key={demanda.id} className="p-4 hover:shadow-lg transition-shadow rounded-lg">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-base">{demanda.titulo}</h3>
                <p className="text-sm text-gray-600">{demanda.especialidade}</p>
              </div>
              <Badge variant={demanda.status === 'aberta' ? 'default' : 'secondary'}>
                {demanda.status === 'aberta' ? 'Aberta' : 'Parcial'}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm mb-4 text-gray-700">
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>{demanda.pacientes} {demanda.pacientes === 1 ? 'paciente' : 'pacientes'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{new Date(demanda.data).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{demanda.localizacao}</span>
              </div>
              <div className="flex items-center gap-2 text-green-700 font-semibold">
                <DollarSign size={16} />
                <span>R$ {demanda.valor}</span>
              </div>
            </div>

            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
              onClick={() => setSelectedDemanda(demanda)}>
              Ver Detalhes
            </Button>
          </Card>
        ))}
        </div>
      </div>

      {/* Modal de Detalhes */}
      {selectedDemanda && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto" 
          onClick={() => setSelectedDemanda(null)}>
          <Card 
            className="w-full max-w-md max-h-[80vh] overflow-y-auto rounded-lg shadow-2xl my-8" 
            onClick={(e) => e.stopPropagation()}>
            <div className="relative p-6">
              {/* Botão Fechar */}
              <button
                onClick={() => setSelectedDemanda(null)}
                className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>

              {/* Header */}
              <div className="mb-4 pr-8">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="font-bold text-lg text-gray-900">{selectedDemanda.titulo}</h2>
                  <Badge variant={selectedDemanda.status === 'aberta' ? 'default' : 'secondary'}>
                    {selectedDemanda.status === 'aberta' ? 'Aberta' : 'Parcial'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">{selectedDemanda.especialidade}</p>
              </div>

              {/* Informações principais */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Users size={18} className="text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-600">Pacientes</p>
                    <p className="font-semibold text-gray-900">{selectedDemanda.pacientes}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <DollarSign size={18} className="text-green-600" />
                  <div>
                    <p className="text-xs text-gray-600">Valor</p>
                    <p className="font-semibold text-gray-900">R$ {selectedDemanda.valor}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <Calendar size={18} className="text-purple-600" />
                  <div>
                    <p className="text-xs text-gray-600">Data</p>
                    <p className="font-semibold text-gray-900">{new Date(selectedDemanda.data).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <MapPin size={18} className="text-orange-600" />
                  <div>
                    <p className="text-xs text-gray-600">Endereço</p>
                    <p className="font-semibold text-gray-900 text-sm">{selectedDemanda.endereco}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <Phone size={18} className="text-red-600" />
                  <div>
                    <p className="text-xs text-gray-600">Telefone</p>
                    <p className="font-semibold text-gray-900">{selectedDemanda.telefone}</p>
                  </div>
                </div>
              </div>

              {/* Descrição */}
              <div className="mb-4">
                <h3 className="font-semibold text-sm text-gray-900 mb-2">Descrição</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{selectedDemanda.descricao}</p>
              </div>

              {/* Detalhes Completos */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-sm text-gray-900 mb-2">Detalhes Adicionais</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{selectedDemanda.detalhesCompletos}</p>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2 text-sm mb-4">
                <CheckCircle size={16} className="text-green-600" />
                <span className="text-gray-700">
                  <strong>{selectedDemanda.profissionais}</strong> profissional(is) aceitou(aram)
                </span>
              </div>

              {/* Botões de Ação */}
              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                  onClick={() => setSelectedDemanda(null)}>
                  Acompanhar
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 rounded-lg"
                  onClick={() => setSelectedDemanda(null)}>
                  Fechar
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
      
      <BottomNav currentPage="DemandasPublicadas" />
    </div>
  );
}
