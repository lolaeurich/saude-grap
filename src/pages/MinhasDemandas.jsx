import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import BottomNav from '@/components/layout/BottomNav';
import TopNav from '@/components/layout/TopNav';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, AlertCircle, MapPin, Calendar } from "lucide-react";

const mockMinhasDemandas = [
  {
    id: 1,
    titulo: "Consulta Clínica Geral",
    paciente: "João Silva",
    data: "2025-02-20",
    hora: "14:00",
    localizacao: "São Paulo - SP",
    valor: 150,
    status: "confirmada"
  },
  {
    id: 2,
    titulo: "Avaliação Dermatológica",
    paciente: "Ana Costa",
    data: "2025-02-23",
    hora: "09:00",
    localizacao: "Vila Madalena - SP",
    valor: 200,
    status: "concluida"
  },
  {
    id: 3,
    titulo: "Avaliação Psicológica",
    paciente: "Linda Ferreira",
    data: "2025-02-24",
    hora: "13:00",
    localizacao: "Pinheiros - SP",
    valor: 180,
    status: "pendente"
  }
];

const statusConfig = {
  confirmada: { label: "Confirmada", className: "bg-blue-100 text-blue-700" },
  concluida: { label: "Concluída", className: "bg-green-100 text-green-700" },
  pendente: { label: "Pendente", className: "bg-yellow-100 text-yellow-700" }
};

export default function MinhasDemandas() {
  return (
    <div className="pb-32">
      <TopNav />
      <PageHeader title="Minhas Demandas" />
      
      <div className="p-4 md:px-12 lg:px-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockMinhasDemandas.map(demanda => {
            const statusInfo = statusConfig[demanda.status];
            
            return (
              <Card key={demanda.id} className="p-4 hover:shadow-lg transition-shadow rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-base">{demanda.titulo}</h3>
                  <p className="text-sm text-gray-600">Paciente: {demanda.paciente}</p>
                </div>
                <Badge className={statusInfo.className}>
                  {statusInfo.label}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm mb-3 text-gray-700">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{new Date(demanda.data).toLocaleDateString('pt-BR')} {demanda.hora}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{demanda.localizacao}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-semibold text-lg text-green-700">R$ {demanda.valor}</span>
                <Button variant="outline" size="sm">Ver Detalhes</Button>
              </div>
            </Card>
            );
          })}
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
