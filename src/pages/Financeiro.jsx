import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import BottomNav from '@/components/layout/BottomNav';
import TopNav from '@/components/layout/TopNav';
import { Card } from "@/components/ui/card";
import { TrendingUp, Calendar } from "lucide-react";

const mockFinanceiro = {
  mesAtual: {
    mes: "Fevereiro/2025",
    receita: 1280,
    demandas: 6
  },
  acumulado: {
    total: 4850,
    demandas: 22
  },
  ultimas: [
    { id: 1, data: "2025-02-15", paciente: "João Silva", valor: 150, status: "pago" },
    { id: 2, data: "2025-02-14", paciente: "Ana Costa", valor: 200, status: "pago" },
    { id: 3, data: "2025-02-13", paciente: "Maria Santos", valor: 280, status: "pendente" },
    { id: 4, data: "2025-02-12", paciente: "Carlos Oliveira", valor: 120, status: "pago" },
    { id: 5, data: "2025-02-11", paciente: "Pedro Alves", valor: 250, status: "concluido" }
  ]
};

export default function Financeiro() {
  return (
    <div className="pb-32">
      <TopNav />
      <PageHeader title="Financeiro" />
      
      <div className="p-4 md:px-12 lg:px-24 max-w-6xl mx-auto">
        {/* Resumo - 2 colunas no desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Mês Atual */}
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <span className="text-sm text-gray-600">Mês Atual</span>
              <Calendar size={20} className="text-blue-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-blue-900">R$ {mockFinanceiro.mesAtual.receita.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
              <span className="text-sm text-blue-700">{mockFinanceiro.mesAtual.demandas} demandas</span>
            </div>
            <p className="text-xs text-blue-600 mt-1">{mockFinanceiro.mesAtual.mes}</p>
          </Card>

          {/* Total Acumulado */}
          <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200 rounded-lg">
          <div className="flex items-start justify-between mb-2">
            <span className="text-sm text-gray-600">Total Acumulado</span>
            <TrendingUp size={20} className="text-green-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-green-900">R$ {mockFinanceiro.acumulado.total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
            <span className="text-sm text-green-700">{mockFinanceiro.acumulado.demandas} demandas</span>
          </div>
          <p className="text-xs text-green-600 mt-1">Desde o início do mês</p>
        </Card>
        </div>

        {/* Últimas Transações */}
        <div>
          <h3 className="font-bold text-base mb-3">Últimas Transações</h3>
          <div className="space-y-2">
            {mockFinanceiro.ultimas.map(transacao => (
              <Card key={transacao.id} className="p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">{transacao.paciente}</p>
                  <p className="text-xs text-gray-500">{new Date(transacao.data).toLocaleDateString('pt-BR')}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-green-700">R$ {transacao.valor.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                  <div className={`px-2 py-1 rounded text-xs font-semibold ${
                    transacao.status === 'pago' ? 'bg-green-100 text-green-700' :
                    transacao.status === 'pendente' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {transacao.status === 'pago' ? 'Pago' : transacao.status === 'pendente' ? 'Pendente' : 'Concluído'}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
