import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import PageHeader from '../components/layout/PageHeader';
import TopNav from '@/components/layout/TopNav';
import BottomNavConvenio from '../components/layout/BottomNavConvenio';
import DemandaPublicadaCard from '../components/convenio/DemandaPublicadaCard';

const mockDemandas = [
  {
    id: '1',
    convenio_nome: 'CareHealth',
    especialidade: 'Fisioterapia Motora',
    status: 'disponivel',
    zona: 'Zona Sul',
    cidade: 'São Paulo',
    endereco: 'Av. Ibirapuera, 2000',
    data_atendimento: '2024-05-20',
    horario_inicio: '08:00',
    horario_fim: '09:00',
    valor: 150.00,
    urgencia: 'alta',
    created_date: '2024-05-10'
  },
  {
    id: '2',
    convenio_nome: 'MediLife',
    especialidade: 'Enfermagem',
    status: 'atribuida',
    zona: 'Centro',
    cidade: 'São Paulo',
    endereco: 'Rua da Consolação, 1500',
    data_atendimento: '2024-05-21',
    horario_inicio: '14:00',
    horario_fim: '16:00',
    valor: 200.00,
    urgencia: 'media',
    created_date: '2024-05-11'
  },
  {
    id: '3',
    convenio_nome: 'SeniorCare',
    especialidade: 'Cuidador',
    status: 'finalizada',
    zona: 'Zona Norte',
    cidade: 'São Paulo',
    endereco: 'Rua Voluntários, 300',
    data_atendimento: '2024-05-15',
    horario_inicio: '10:00',
    horario_fim: '18:00',
    valor: 350.00,
    urgencia: 'baixa',
    created_date: '2024-05-05'
  }
];

export default function DemandasPublicadas() {
  const [activeTab, setActiveTab] = useState('disponiveis');

  const { data: demandas = [], isLoading } = useQuery({
    queryKey: ['demandas-publicadas'],
    queryFn: async () => {
      // Simula um delay de rede
      await new Promise(resolve => setTimeout(resolve, 800));
      return mockDemandas;
    },
  });

  const demandasDisponiveis = demandas.filter(d => d.status === 'disponivel');
  const demandasAtribuidas = demandas.filter(d => d.status === 'atribuida');
  const demandasEmExecucao = demandas.filter(d => d.status === 'em_execucao');
  const demandasFinalizadas = demandas.filter(d => d.status === 'finalizada');

  const renderDemandas = (lista, emptyMessage) => {
    if (isLoading) {
      return Array(3).fill(0).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl p-4 shadow-lg">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-3" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ));
    }

    if (lista.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500 text-sm">{emptyMessage}</p>
        </div>
      );
    }

    return lista.map((demanda) => (
      <DemandaPublicadaCard key={demanda.id} demanda={demanda} />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-purple-50 to-pink-50 pb-24">
      <TopNav currentPage="DemandasPublicadas" />
      <div className="md:hidden">
        <PageHeader title="Minhas Demandas" showLogo={true} />
      </div>

      <main className="px-3 md:px-6 py-3 md:py-6 max-w-7xl mx-auto">
        {/* Action Buttons */}
        <div className="mb-4 grid grid-cols-2 gap-2">
          <Link to={createPageUrl('CriarDemanda')}>
            <Button className="w-full h-12 bg-gradient-to-r from-violet-600 to-purple-600 active:from-violet-700 active:to-purple-700 text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" />
              Nova Demanda
            </Button>
          </Link>
          <Link to={createPageUrl('CriarDemandaRecorrente')}>
            <Button className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 active:from-emerald-700 active:to-teal-700 text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" />
              Demanda Recorrente
            </Button>
          </Link>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full bg-white/60 backdrop-blur-sm p-1 rounded-xl mb-4 shadow-lg">
            <TabsTrigger 
              value="disponiveis" 
              className="flex-1 rounded-lg font-semibold text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md py-2"
            >
              Disponíveis ({demandasDisponiveis.length})
            </TabsTrigger>
            <TabsTrigger 
              value="atribuidas" 
              className="flex-1 rounded-lg font-semibold text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md py-2"
            >
              Aceitas ({demandasAtribuidas.length})
            </TabsTrigger>
            <TabsTrigger 
              value="em_execucao" 
              className="flex-1 rounded-lg font-semibold text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md py-2"
            >
              Execução ({demandasEmExecucao.length})
            </TabsTrigger>
            <TabsTrigger 
              value="finalizadas" 
              className="flex-1 rounded-lg font-semibold text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md py-2"
            >
              Finalizadas ({demandasFinalizadas.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="disponiveis" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {renderDemandas(demandasDisponiveis, "Nenhuma demanda disponível no momento")}
          </TabsContent>

          <TabsContent value="atribuidas" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {renderDemandas(demandasAtribuidas, "Nenhuma demanda aceita ainda")}
          </TabsContent>

          <TabsContent value="em_execucao" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {renderDemandas(demandasEmExecucao, "Nenhuma demanda em execução")}
          </TabsContent>

          <TabsContent value="finalizadas" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {renderDemandas(demandasFinalizadas, "Nenhuma demanda finalizada")}
          </TabsContent>
        </Tabs>
      </main>

      <BottomNavConvenio currentPage="DemandasPublicadas" />
    </div>
  );
}