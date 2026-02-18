import React from 'react';
import { Card } from "@/components/ui/card";
import { BarChart3, TrendingUp, Clock, CheckCircle, FileText } from "lucide-react";
import PageHeader from '@/components/layout/PageHeader';
import TopNav from '@/components/layout/TopNav';
import BottomNav from '@/components/layout/BottomNav';

const mockDemandas = [
  { id: 1, titulo: "Consulta Clínica", especialidade: "Clínica Geral", status: "finalizada", valor: 150 },
  { id: 2, titulo: "Avaliação Cardiológica", especialidade: "Cardiologia", status: "atribuida", valor: 280 },
  { id: 3, titulo: "Fisioterapia", especialidade: "Fisioterapia", status: "em_execucao", valor: 120 },
  { id: 4, titulo: "Dermatologia", especialidade: "Dermatologia", status: "disponivel", valor: 200 },
  { id: 5, titulo: "Oftalmologia", especialidade: "Oftalmologia", status: "finalizada", valor: 250 },
  { id: 6, titulo: "Psicologia", especialidade: "Psicologia", status: "disponivel", valor: 180 },
  { id: 7, titulo: "Cardiologia Check-up", especialidade: "Cardiologia", status: "finalizada", valor: 300 },
  { id: 8, titulo: "Consulta Clínica Follow-up", especialidade: "Clínica Geral", status: "em_execucao", valor: 150 },
];

export default function RelatoriosConvenio() {
  const totalDemandas = mockDemandas.length;
  const demandasDisponiveis = mockDemandas.filter(d => d.status === 'disponivel').length;
  const demandasAtribuidas = mockDemandas.filter(d => d.status === 'atribuida').length;
  const demandasEmExecucao = mockDemandas.filter(d => d.status === 'em_execucao').length;
  const demandasFinalizadas = mockDemandas.filter(d => d.status === 'finalizada').length;
  
  const valorTotal = mockDemandas.reduce((sum, d) => sum + (d.valor || 0), 0);
  const valorMedio = totalDemandas > 0 ? valorTotal / totalDemandas : 0;

  const stats = [
    { 
      label: "Total de Demandas", 
      value: totalDemandas, 
      icon: FileText, 
      color: "from-violet-500 to-purple-600" 
    },
    { 
      label: "Aguardando Aceite", 
      value: demandasDisponiveis, 
      icon: Clock, 
      color: "from-yellow-500 to-orange-600" 
    },
    { 
      label: "Em Andamento", 
      value: demandasAtribuidas + demandasEmExecucao, 
      icon: TrendingUp, 
      color: "from-blue-500 to-cyan-600" 
    },
    { 
      label: "Finalizadas", 
      value: demandasFinalizadas, 
      icon: CheckCircle, 
      color: "from-emerald-500 to-teal-600" 
    },
  ];

  // Agrupar especialidades
  const especialidadesCount = mockDemandas.reduce((acc, d) => {
    acc[d.especialidade] = (acc[d.especialidade] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="pb-32">
      <TopNav currentPage="RelatoriosConvenio" />
      <PageHeader title="Relatórios" />
      
      <div className="p-4 md:px-12 lg:px-24 max-w-6xl mx-auto space-y-4">
        {/* Valor Total */}
        <Card className="p-6 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 text-white rounded-lg shadow-lg border-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <BarChart3 className="w-6 h-6" />
            </div>
            <span className="text-sm font-semibold opacity-90">Valor Total Investido</span>
          </div>
          <p className="text-4xl font-bold mb-2">R$ {valorTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
          <p className="text-sm opacity-80">Média de R$ {valorMedio.toLocaleString('pt-BR', {minimumFractionDigits: 2})} por demanda</p>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-4 rounded-lg hover:shadow-lg transition-shadow">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-600 font-medium mt-1">{stat.label}</p>
              </Card>
            );
          })}
        </div>

        {/* Especialidades Mais Solicitadas */}
        <Card className="p-4 rounded-lg">
          <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-violet-600 to-purple-600 rounded-full"></div>
            Especialidades Mais Solicitadas
          </h3>
          <div className="space-y-2">
            {Object.entries(especialidadesCount)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 5)
              .map(([especialidade, count], index) => (
                <div key={especialidade} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="text-sm font-medium text-gray-700">{especialidade}</span>
                  <span className="text-sm font-bold text-violet-600 bg-violet-50 px-3 py-1 rounded-full">{count}</span>
                </div>
              ))}
          </div>
        </Card>

        {/* Distribuição por Status */}
        <Card className="p-4 rounded-lg">
          <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-blue-600 to-cyan-600 rounded-full"></div>
            Distribuição por Status
          </h3>
          <div className="space-y-3">
            {[
              { label: "Finalizadas", count: demandasFinalizadas, color: "emerald" },
              { label: "Em Andamento", count: demandasAtribuidas + demandasEmExecucao, color: "blue" },
              { label: "Aguardando", count: demandasDisponiveis, color: "yellow" },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-gray-700 font-medium">{item.label}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`bg-${item.color}-500 h-2 rounded-full`}
                      style={{width: `${(item.count / totalDemandas) * 100}%`}}
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-900 min-w-[2rem]">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <BottomNav currentPage="RelatoriosConvenio" />
    </div>
  );
}