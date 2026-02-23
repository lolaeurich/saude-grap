import React, { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import BottomNav from '@/components/layout/BottomNav';
import TopNav from '@/components/layout/TopNav';
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Calendar, Wallet, Info, ChevronDown, FileText, Download } from "lucide-react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

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
  const [periodoGrafico, setPeriodoGrafico] = useState('mes');
  const [pagamentosOpen, setPagamentosOpen] = useState(false);

  // Dados fixos para gráfico
  const dadosGrafico = {
    semana: [
      { nome: 'Seg', valor: 450 },
      { nome: 'Ter', valor: 600 },
      { nome: 'Qua', valor: 350 },
      { nome: 'Qui', valor: 800 },
      { nome: 'Sex', valor: 550 },
      { nome: 'Sáb', valor: 400 },
      { nome: 'Dom', valor: 200 }
    ],
    mes: [
      { nome: 'Sem 1', valor: 2400 },
      { nome: 'Sem 2', valor: 3200 },
      { nome: 'Sem 3', valor: 2800 },
      { nome: 'Sem 4', valor: 3600 }
    ],
    trimestre: [
      { nome: 'Jan', valor: 8500 },
      { nome: 'Fev', valor: 9200 },
      { nome: 'Mar', valor: 11000 }
    ],
    ano: [
      { nome: 'T1', valor: 28700 },
      { nome: 'T2', valor: 32500 },
      { nome: 'T3', valor: 35800 },
      { nome: 'T4', valor: 38200 }
    ]
  };

  // Pagamentos recentes e futuros (dados fixos)
  const pagamentosRecentes = [
    { data: '2026-02-20', convenio: 'Amil Saúde', valor: 350.00, status: 'pago' },
    { data: '2026-02-18', convenio: 'Bradesco Saúde', valor: 280.00, status: 'pago' },
    { data: '2026-02-15', convenio: 'SulAmérica', valor: 420.00, status: 'pago' }
  ];

  const pagamentosFuturos = [
    { data: '2026-02-25', convenio: 'Unimed', valor: 380.00, status: 'pendente' },
    { data: '2026-02-28', convenio: 'NotreDame', valor: 450.00, status: 'pendente' }
  ];

  const exportarRelatorio = (formato) => {
    alert(`Exportando relatório fiscal em formato ${formato.toUpperCase()}...`);
  };

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

        {/* Gráfico de Lucros */}
        <Card className="p-5 bg-white rounded-2xl shadow-lg border-0 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-gray-900">Evolução de Lucros</h3>
            <Select value={periodoGrafico} onValueChange={setPeriodoGrafico}>
              <SelectTrigger className="w-32 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semana">Semana</SelectItem>
                <SelectItem value="mes">Mês</SelectItem>
                <SelectItem value="trimestre">Trimestre</SelectItem>
                <SelectItem value="ano">Ano</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Gráfico de Linha (Escala) */}
          <div className="h-[200px] w-full mt-4 relative">
            {/* Eixo Y e Linhas de Grade */}
            <div className="absolute inset-0 left-0 right-0 top-0 bottom-6 flex flex-col justify-between text-xs text-gray-400 pointer-events-none z-0">
              {[100, 75, 50, 25, 0].map((percent) => {
                 const maxVal = Math.max(...dadosGrafico[periodoGrafico].map(d => d.valor));
                 return (
                  <div key={percent} className="flex items-center w-full">
                    <span className="w-10 text-right mr-2 text-[10px]">
                      {Math.round(maxVal * (percent / 100))}
                    </span>
                    <div className="flex-1 h-px bg-gray-100 border-t border-dashed border-gray-200"></div>
                  </div>
                );
              })}
            </div>

            {/* Área do Gráfico */}
            <div className="absolute inset-0 left-12 right-2 top-2 bottom-6 z-10">
               <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                 <defs>
                   <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                     <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
                     <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                   </linearGradient>
                 </defs>
                 {/* Área Sombreada */}
                 <path
                   d={`M0,100 ${dadosGrafico[periodoGrafico].map((d, i) => {
                     const maxVal = Math.max(...dadosGrafico[periodoGrafico].map(d => d.valor));
                     const x = (i / (dadosGrafico[periodoGrafico].length - 1)) * 100;
                     const y = 100 - (d.valor / maxVal) * 100;
                     return `L${x},${y}`;
                   }).join(' ')} L100,100 Z`}
                   fill="url(#gradient)"
                 />
                 {/* Linha */}
                 <polyline
                   points={dadosGrafico[periodoGrafico].map((d, i) => {
                     const maxVal = Math.max(...dadosGrafico[periodoGrafico].map(d => d.valor));
                     const x = (i / (dadosGrafico[periodoGrafico].length - 1)) * 100;
                     const y = 100 - (d.valor / maxVal) * 100;
                     return `${x},${y}`;
                   }).join(' ')}
                   fill="none"
                   stroke="#8b5cf6"
                   strokeWidth="2"
                   vectorEffect="non-scaling-stroke"
                 />
               </svg>

               {/* Pontos Interativos */}
               {dadosGrafico[periodoGrafico].map((d, i) => {
                 const maxVal = Math.max(...dadosGrafico[periodoGrafico].map(d => d.valor));
                 const x = (i / (dadosGrafico[periodoGrafico].length - 1)) * 100;
                 const y = 100 - (d.valor / maxVal) * 100;
                 return (
                   <div 
                    key={i}
                    className="absolute w-3 h-3 bg-white border-2 border-violet-600 rounded-full hover:scale-125 transition-transform cursor-pointer group"
                    style={{ 
                      left: `${x}%`, 
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                   >
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 shadow-lg pointer-events-none">
                        R$ {d.valor.toFixed(2)}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                      </div>
                   </div>
                 );
               })}
            </div>

            {/* Labels X Axis */}
            <div className="absolute bottom-0 left-12 right-2 h-6">
              {dadosGrafico[periodoGrafico].map((d, i) => {
                 const x = (i / (dadosGrafico[periodoGrafico].length - 1)) * 100;
                 return (
                   <span 
                    key={i} 
                    className="absolute text-[10px] text-gray-500 transform -translate-x-1/2 top-1"
                    style={{ left: `${x}%` }}
                   >
                     {d.nome}
                   </span>
                 );
              })}
            </div>
          </div>
        </Card>

        {/* Dropdown Pagamentos */}
        <Collapsible open={pagamentosOpen} onOpenChange={setPagamentosOpen} className="mb-4">
          <Card className="bg-white rounded-2xl shadow-lg border-0 overflow-hidden">
            <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-violet-600" />
                <span className="font-bold text-gray-900">Pagamentos Recebidos e Futuros</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${pagamentosOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-4 pt-0 space-y-4">
                {/* Recebidos */}
                <div>
                  <p className="text-xs font-bold text-gray-500 mb-2">RECEBIDOS</p>
                  <div className="space-y-2">
                    {pagamentosRecentes.map((pag, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                        <div>
                          <p className="text-sm font-bold text-gray-900">{pag.convenio}</p>
                          <p className="text-xs text-gray-600">{format(parseISO(pag.data), "dd/MM/yyyy")}</p>
                        </div>
                        <p className="text-sm font-bold text-emerald-600">R$ {pag.valor.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Futuros */}
                <div>
                  <p className="text-xs font-bold text-gray-500 mb-2">A RECEBER</p>
                  <div className="space-y-2">
                    {pagamentosFuturos.map((pag, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                        <div>
                          <p className="text-sm font-bold text-gray-900">{pag.convenio}</p>
                          <p className="text-xs text-gray-600">{format(parseISO(pag.data), "dd/MM/yyyy")}</p>
                        </div>
                        <p className="text-sm font-bold text-amber-600">R$ {pag.valor.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Relatório Fiscal */}
        <Card className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg border-0">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-base font-bold text-gray-900">Relatório Fiscal / Imposto de Renda</h3>
          </div>
          <p className="text-xs text-gray-600 mb-4">
            Exporte seus dados fiscais para declaração de IR. Inclui valores brutos, líquidos, retenções e taxas.
          </p>
          <div className="flex gap-2">
            <Button onClick={() => exportarRelatorio('pdf')} className="flex-1 h-9 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold">
              <Download className="w-3.5 h-3.5 mr-1.5" /> PDF
            </Button>
            <Button onClick={() => exportarRelatorio('csv')} className="flex-1 h-9 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-bold">
              <Download className="w-3.5 h-3.5 mr-1.5" /> CSV
            </Button>
            <Button onClick={() => exportarRelatorio('excel')} className="flex-1 h-9 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold">
              <Download className="w-3.5 h-3.5 mr-1.5" /> Excel
            </Button>
          </div>
          <div className="mt-4 p-3 bg-white/80 rounded-lg">
            <p className="text-[10px] font-semibold text-gray-500 mb-1">INFORMAÇÕES INCLUÍDAS:</p>
            <p className="text-xs text-gray-700 leading-relaxed">
              Nome, CPF/CNPJ, Ano, Mês, Convênio, CNPJ do convênio, Valor bruto, Taxas da plataforma, Valor líquido, Retenção IR/INSS, Data do pagamento
            </p>
          </div>
        </Card>
      </div>
      
      <BottomNav />
    </div>
  );
}
