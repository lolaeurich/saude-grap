import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import BottomNav from '@/components/layout/BottomNav';
import TopNav from '@/components/layout/TopNav';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, MapPin, Calendar, DollarSign } from "lucide-react";

const mockDemandaDetalhes = {
  id: 1,
  titulo: "Consulta Clínica Geral",
  paciente: "João Silva",
  especialidade: "Clínica Geral",
  localizacao: "São Paulo - SP",
  data: "2025-02-20",
  hora: "14:00",
  valor: 150,
  status: "confirmada",
  descricao: "Acompanhamento de pressão arterial e avaliação clínica geral. Paciente com histórico de hipertensão.",
  observacoes: "Paciente vem acompanhado de familiar. Solicitar exames complementares.",
  contato: "(11) 98765-4321",
  endereco: "Rua das Flores, 123 - São Paulo - SP"
};

export default function DetalhesDemanda() {
  return (
    <div className="pb-32">
      <TopNav />
      <PageHeader title="Detalhes da Demanda" />
      
      <div className="p-4 md:px-12 lg:px-24 max-w-2xl mx-auto space-y-4">
        {/* Header */}
        <Card className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="font-bold text-lg">{mockDemandaDetalhes.titulo}</h2>
              <p className="text-sm text-gray-600">{mockDemandaDetalhes.especialidade}</p>
            </div>
            <Badge className="bg-green-100 text-green-700">
              <CheckCircle size={14} className="mr-1" />
              {mockDemandaDetalhes.status}
            </Badge>
          </div>
          <p className="text-sm text-blue-700 font-semibold">Paciente: {mockDemandaDetalhes.paciente}</p>
        </Card>

        {/* Informações Principais */}
        <Card className="p-4">
          <h3 className="font-bold mb-3">Informações</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-500" />
              <span>{new Date(mockDemandaDetalhes.data).toLocaleDateString('pt-BR')} às {mockDemandaDetalhes.hora}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-gray-500" />
              <span>{mockDemandaDetalhes.localizacao}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign size={16} className="text-green-600" />
              <span className="font-semibold text-green-700">R$ {mockDemandaDetalhes.valor}</span>
            </div>
          </div>
        </Card>

        {/* Contato do Paciente */}
        <Card className="p-4">
          <h3 className="font-bold mb-3">Contato</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Telefone:</strong> {mockDemandaDetalhes.contato}</p>
            <p><strong>Endereço:</strong> {mockDemandaDetalhes.endereco}</p>
          </div>
        </Card>

        {/* Descrição */}
        <Card className="p-4">
          <h3 className="font-bold mb-3">Descrição</h3>
          <p className="text-sm text-gray-700">{mockDemandaDetalhes.descricao}</p>
        </Card>

        {/* Observações */}
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <h3 className="font-bold mb-3">Observações Importantes</h3>
          <p className="text-sm text-yellow-900">{mockDemandaDetalhes.observacoes}</p>
        </Card>

        {/* Ações */}
        <div className="space-y-2">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold py-2.5">
            <CheckCircle size={16} className="mr-2" />
            Confirmar Atendimento
          </Button>
          <Button variant="outline" className="w-full">Voltar</Button>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
