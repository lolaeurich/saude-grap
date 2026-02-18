import React, { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import BottomNav from '@/components/layout/BottomNav';
import TopNav from '@/components/layout/TopNav';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Calendar, Stethoscope, DollarSign, Clock, User, X, Phone, MapPin as Location } from "lucide-react";

const mockDemandas = [
  {
    id: 1,
    titulo: "Consulta Clínica Geral",
    paciente: "João Silva",
    especialidade: "Clínica Geral",
    localizacao: "São Paulo - SP",
    data: "2025-02-20",
    hora: "14:00",
    valor: 150,
    urgencia: "media",
    descricao: "Acompanhamento de pressão arterial",
    distancia: "2 km",
    telefone: "(11) 99876-5432",
    endereco: "Rua das Flores, 123 - Apto 42 - São Paulo - SP",
    observacoes: "Paciente é hipertenso em tratamento. Trazer últimos exames de pressão.",
    detalhesCompletos: "Acompanhamento de pressão arterial com histórico de hipertensão. Paciente vem realizando atividades físicas regularmente e está em uso de medicação contínua."
  },
  {
    id: 2,
    titulo: "Avaliação Cardiológica",
    paciente: "Maria Santos",
    especialidade: "Cardiologia",
    localizacao: "São Paulo - SP",
    data: "2025-02-21",
    hora: "10:30",
    valor: 280,
    urgencia: "urgente",
    descricao: "Avaliação pré-operatória",
    distancia: "5 km",
    telefone: "(11) 98765-4321",
    endereco: "Av. Paulista, 2000 - São Paulo - SP",
    observacoes: "Agendado pré-operatório para cirurgia cardíaca. Levar todos os exames cardíacos recentes.",
    detalhesCompletos: "Avaliação pré-operatória criteriosa necessária. Paciente aguarda procedimento cirúrgico e precisa de autorização médica antes da intervenção."
  },
  {
    id: 3,
    titulo: "Fisioterapia - Joelho",
    paciente: "Carlos Oliveira",
    especialidade: "Fisioterapia",
    localizacao: "Zona Leste - SP",
    data: "2025-02-22",
    hora: "16:00",
    valor: 120,
    urgencia: "baixa",
    descricao: "Sessão de reabilitação pós-cirurgia",
    distancia: "8 km",
    telefone: "(11) 97654-3210",
    endereco: "Rua Brasil, 500 - Zona Leste - São Paulo - SP",
    observacoes: "Pós-operatório de artroscopia no joelho direito. Paciente pode deambular com muletas.",
    detalhesCompletos: "Sessão de reabilitação pós-cirúrgica de joelho. Paciente encontra-se na segunda semana de pós-operatório e necessita de estímulos progressivos de mobilidade."
  },
  {
    id: 4,
    titulo: "Avaliação Dermatológica",
    paciente: "Ana Costa",
    especialidade: "Dermatologia",
    localizacao: "Vila Madalena - SP",
    data: "2025-02-23",
    hora: "09:00",
    valor: 200,
    urgencia: "media",
    descricao: "Avaliação de lesão de pele",
    distancia: "3 km",
    telefone: "(11) 96543-2109",
    endereco: "Rua Harmonia, 250 - Vila Madalena - São Paulo - SP",
    observacoes: "Lesão suspeita em região dorsal que necessita de avaliação clínica completa e possível biopsia.",
    detalhesCompletos: "Avaliação clínica de lesão de pele em região do dorso com características que necessitam de investigação. Pode ser necessário encaminhamento para biopsia."
  },
  {
    id: 5,
    titulo: "Consulta Oftalmológica",
    paciente: "Pedro Alves",
    especialidade: "Oftalmologia",
    localizacao: "Centro - SP",
    data: "2025-02-20",
    hora: "15:30",
    valor: 250,
    urgencia: "media",
    descricao: "Renovação de prescrição de óculos",
    distancia: "1 km",
    telefone: "(11) 95432-1098",
    endereco: "Av. Getúlio Vargas, 100 - Centro - São Paulo - SP",
    observacoes: "Última consulta oftalmológica há 2 anos. Paciente refere dificuldade de visão para longe.",
    detalhesCompletos: "Renovação de prescrição de óculos com queixa principal de dificuldade visual para distância. Necessário exame refratométrico completo."
  },
  {
    id: 6,
    titulo: "Avaliação Psicológica",
    paciente: "Linda Ferreira",
    especialidade: "Psicologia",
    localizacao: "Pinheiros - SP",
    data: "2025-02-24",
    hora: "13:00",
    valor: 180,
    urgencia: "baixa",
    descricao: "Primeira consulta - avaliação diagnóstica",
    distancia: "4 km",
    telefone: "(11) 94321-0987",
    endereco: "Rua Bela Cintra, 300 - Pinheiros - São Paulo - SP",
    observacoes: "Primeira consulta. Paciente refere ansiedade e dificuldades de concentração. Encaminhamento de psicólogo.",
    detalhesCompletos: "Avaliação diagnóstica inicial para transtorno de ansiedade. Histórico de stress ocupacional nos últimos meses. Possível necessidade de terapia contínua."
  }
];

const urgenciaConfig = {
  urgente: { label: "Urgente", className: "bg-red-100 text-red-700" },
  media: { label: "Média", className: "bg-yellow-100 text-yellow-700" },
  baixa: { label: "Baixa", className: "bg-green-100 text-green-700" }
};

const filterOptions = [
  { key: "localizacao", label: "Localização", icon: MapPin },
  { key: "data", label: "Data", icon: Calendar },
  { key: "especialidade", label: "Especialidade", icon: Stethoscope },
  { key: "valor", label: "Valor", icon: DollarSign }
];

export default function DemandasDisponiveis() {
  const [activeFilter, setActiveFilter] = useState(null);
  const [demandas, setDemandas] = useState(mockDemandas);
  const [selectedDemanda, setSelectedDemanda] = useState(null);

  const handleAceitar = (id) => {
    setDemandas(demandas.filter(d => d.id !== id));
  };

  return (
    <div className="pb-32">
      <TopNav />
      <PageHeader title="Demandas Disponíveis" />
      
      <div className="p-4 md:px-12 lg:px-24 max-w-7xl mx-auto space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filterOptions.map(f => {
            const Icon = f.icon;
            return (
              <Button
                key={f.key}
                variant={activeFilter === f.key ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(activeFilter === f.key ? null : f.key)}
                className="whitespace-nowrap flex gap-2">
                <Icon size={16} />
                {f.label}
              </Button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {demandas.map(demanda => (
            <Card key={demanda.id} className="p-4 hover:shadow-lg transition-shadow rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-base">{demanda.titulo}</h3>
                  <p className="text-sm text-gray-600">{demanda.descricao}</p>
                </div>
                <Badge className={urgenciaConfig[demanda.urgencia].className}>
                  {urgenciaConfig[demanda.urgencia].label}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <User size={16} />
                  <span>{demanda.paciente}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Stethoscope size={16} />
                  <span>{demanda.especialidade}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin size={16} />
                  <span>{demanda.distancia}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar size={16} />
                  <span>{new Date(demanda.data).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock size={16} />
                  <span>{demanda.hora}</span>
                </div>
                <div className="flex items-center gap-2 text-green-700 font-semibold">
                  <DollarSign size={16} />
                  <span>R$ {demanda.valor}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold"
                  onClick={() => handleAceitar(demanda.id)}>
                  Aceitar
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 rounded-full"
                  onClick={() => setSelectedDemanda(demanda)}>
                  Detalhes
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal de Detalhes */}
      {selectedDemanda && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto" onClick={() => setSelectedDemanda(null)}>
          <Card className="w-full max-w-md max-h-[80vh] overflow-y-auto rounded-2xl shadow-2xl my-8" onClick={(e) => e.stopPropagation()}>
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
                  <Badge className={urgenciaConfig[selectedDemanda.urgencia].className}>
                    {urgenciaConfig[selectedDemanda.urgencia].label}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">{selectedDemanda.especialidade}</p>
              </div>

              {/* Informações principais */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <User size={18} className="text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-600">Paciente</p>
                    <p className="font-semibold text-gray-900">{selectedDemanda.paciente}</p>
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
                    <p className="text-xs text-gray-600">Data e Hora</p>
                    <p className="font-semibold text-gray-900">{new Date(selectedDemanda.data).toLocaleDateString('pt-BR')} às {selectedDemanda.hora}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <Location size={18} className="text-orange-600" />
                  <div>
                    <p className="text-xs text-gray-600">Localização</p>
                    <p className="font-semibold text-gray-900">{selectedDemanda.localizacao}</p>
                  </div>
                </div>
              </div>

              {/* Descrição completa */}
              <div className="mb-4">
                <h3 className="text-sm font-bold text-gray-900 mb-2">Descrição</h3>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedDemanda.detalhesCompletos}</p>
              </div>

              {/* Contato */}
              <div className="mb-4">
                <div className="flex items-center gap-2 text-sm mb-2">
                  <Phone size={16} className="text-gray-600" />
                  <p className="font-semibold text-gray-900">{selectedDemanda.telefone}</p>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <Location size={16} className="text-gray-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">{selectedDemanda.endereco}</p>
                </div>
              </div>

              {/* Observações */}
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-yellow-700 font-semibold mb-1">⚠️ Observações Importantes</p>
                <p className="text-sm text-yellow-900">{selectedDemanda.observacoes}</p>
              </div>

              {/* Botões */}
              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold"
                  onClick={() => {
                    handleAceitar(selectedDemanda.id);
                    setSelectedDemanda(null);
                  }}>
                  Aceitar Demanda
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 rounded-full"
                  onClick={() => setSelectedDemanda(null)}>
                  Fechar
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
      
      <BottomNav />
    </div>
  );
}