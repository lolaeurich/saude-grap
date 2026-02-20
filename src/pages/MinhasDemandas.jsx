import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import PageHeader from '@/components/layout/PageHeader';
import BottomNav from '@/components/layout/BottomNav';
import TopNav from '@/components/layout/TopNav';
import DemandaCard from '@/components/demanda/DemandaCard';
import StatusBadge from '@/components/demanda/StatusBadge';
import ComentariosModal from '@/components/demanda/ComentariosModal';
import AvaliacaoModal from '@/components/demanda/AvaliacaoModal';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ClipboardList, MessageSquare, CheckCircle2, Clock, MapPin, Calendar } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const mockUser = { id: 'prof123', full_name: 'Dr. João Silva' };

const mockMinhasDemandas = [
  {
    id: '2',
    convenio_nome: 'MediLife',
    especialidade: 'Enfermagem',
    status: 'atribuida',
    profissional_id: 'prof123',
    zona: 'Centro',
    cidade: 'São Paulo',
    endereco: 'Rua da Consolação, 1500',
    data_atendimento: '2024-05-21',
    horario_inicio: '14:00',
    horario_fim: '16:00',
    valor: 200.00,
    urgencia: 'media'
  },
  {
    id: '4',
    convenio_nome: 'CareHealth',
    especialidade: 'Fisioterapia',
    status: 'em_execucao',
    profissional_id: 'prof123',
    zona: 'Zona Oeste',
    cidade: 'São Paulo',
    endereco: 'Rua Heitor Penteado, 500',
    data_atendimento: new Date().toISOString(),
    horario_inicio: '09:00',
    horario_fim: '10:00',
    valor: 160.00,
    urgencia: 'alta'
  },
  {
    id: '5',
    convenio_nome: 'SeniorCare',
    especialidade: 'Fisioterapia',
    status: 'finalizada',
    profissional_id: 'prof123',
    zona: 'Zona Sul',
    cidade: 'São Paulo',
    endereco: 'Av. Santo Amaro, 1000',
    data_atendimento: '2024-05-10',
    horario_inicio: '10:00',
    horario_fim: '11:00',
    valor: 150.00,
    urgencia: 'baixa'
  }
];

export default function MinhasDemandas() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("aceitas");
  const [comentariosModalOpen, setComentariosModalOpen] = useState(false);
  const [avaliacaoModalOpen, setAvaliacaoModalOpen] = useState(false);
  const [demandaSelecionada, setDemandaSelecionada] = useState(null);

  const { data: user } = useQuery({
    queryKey: ['current-user'],
    queryFn: () => Promise.resolve(mockUser)
  });

  const { data: demandas = [], isLoading } = useQuery({
    queryKey: ['minhas-demandas', user?.id],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      return mockMinhasDemandas;
    },
    enabled: !!user?.id
  });

  const iniciarMutation = useMutation({
    mutationFn: async (demanda) => {
      await new Promise(resolve => setTimeout(resolve, 500));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['minhas-demandas'] });
    }
  });

  const salvarComentariosMutation = useMutation({
    mutationFn: async ({ demandaId, comentarios }) => {
      await new Promise(resolve => setTimeout(resolve, 500));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['minhas-demandas'] });
      setComentariosModalOpen(false);
    }
  });

  const finalizarComAvaliacaoMutation = useMutation({
    mutationFn: async ({ demandaId, avaliacao }) => {
      await new Promise(resolve => setTimeout(resolve, 500));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['minhas-demandas'] });
      setAvaliacaoModalOpen(false);
    }
  });

  const demandasAceitas = demandas.filter(d => d.status === 'atribuida');
  const demandasEmExecucao = demandas.filter(d => d.status === 'em_execucao');
  const demandasFinalizadas = demandas.filter(d => d.status === 'finalizada');

  const handleVerDetalhes = (demanda) => {
    navigate(createPageUrl(`DetalhesDemanda?id=${demanda.id}`));
  };

  const handleIniciarAtendimento = (demanda) => {
    iniciarMutation.mutate(demanda);
    navigate(createPageUrl(`DetalhesDemanda?id=${demanda.id}`));
  };

  const abrirComentarios = (demanda) => {
    setDemandaSelecionada(demanda);
    setComentariosModalOpen(true);
  };

  const abrirAvaliacao = (demanda) => {
    setDemandaSelecionada(demanda);
    setAvaliacaoModalOpen(true);
  };

  const handleSalvarComentarios = (comentarios) => {
    salvarComentariosMutation.mutate({
      demandaId: demandaSelecionada.id,
      comentarios
    });
  };

  const handleFinalizarComAvaliacao = (avaliacao) => {
    finalizarComAvaliacaoMutation.mutate({
      demandaId: demandaSelecionada.id,
      avaliacao
    });
  };

  const renderDemandaEmExecucao = (demanda) => {
    return (
      <Card className="p-5 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-xl border-4 border-orange-300 animate-pulse">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-5 h-5 text-white animate-spin" />
          <span className="text-xs font-bold text-white uppercase tracking-wide">EM ANDAMENTO AGORA</span>
        </div>
        
        <h3 className="text-lg font-bold text-white mb-2">{demanda.convenio_nome}</h3>
        <p className="text-sm text-white/90 mb-4">{demanda.especialidade}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-white text-sm">
            <MapPin className="w-4 h-4" />
            <span>{demanda.endereco}</span>
          </div>
          <div className="flex items-center gap-2 text-white text-sm">
            <Calendar className="w-4 h-4" />
            <span>{format(new Date(demanda.data_atendimento), "dd/MM/yyyy", { locale: ptBR })}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => abrirComentarios(demanda)}
            className="flex-1 bg-white text-orange-600 hover:bg-gray-100"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Comentários
          </Button>
          <Button
            onClick={() => abrirAvaliacao(demanda)}
            className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Finalizar
          </Button>
        </div>
      </Card>
    );
  };

  const renderDemandaList = (list, variant) => {
    if (isLoading) {
      return Array(4).fill(0).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-start gap-3 mb-4">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-20 w-full rounded-lg mb-4" />
          <div className="flex gap-2">
            <Skeleton className="h-10 flex-1 rounded-lg" />
            <Skeleton className="h-10 flex-1 rounded-lg" />
          </div>
        </div>
      ));
    }

    if (list.length === 0) {
      return (
        <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <ClipboardList className="w-7 h-7 text-gray-400" />
          </div>
          <p className="text-gray-500">Nenhuma demanda nesta categoria</p>
        </div>
      );
    }

    return list.map((demanda) => (
      <div key={demanda.id} className="relative">
        <div className="absolute -top-2 right-4 z-10">
          <StatusBadge status={demanda.status} />
        </div>
        <DemandaCard
          demanda={demanda}
          variant={variant}
          onVerDetalhes={handleVerDetalhes}
          onIniciarAtendimento={handleIniciarAtendimento}
        />
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-purple-50 to-pink-50 pb-24 md:pb-0">
      <TopNav currentPage="MinhasDemandas" />
      
      <div className="md:hidden">
        <PageHeader title="Minhas Demandas" />
      </div>

      <main className="px-3 md:px-6 py-3 md:py-6 max-w-7xl mx-auto">
        <h2 className="hidden md:block text-2xl font-bold text-gray-900 mb-6">Minhas Demandas</h2>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full bg-white/60 backdrop-blur-sm p-1 rounded-xl mb-4 shadow-lg">
            <TabsTrigger 
              value="aceitas" 
              className="flex-1 rounded-lg font-semibold text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md py-2"
            >
              Aceitas ({demandasAceitas.length})
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

          <TabsContent value="aceitas" className="mt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {renderDemandaList(demandasAceitas, "aceita")}
          </TabsContent>

          <TabsContent value="em_execucao" className="mt-0 space-y-4">
            {demandasEmExecucao.length > 0 && (
              <div className="mb-6">
                {renderDemandaEmExecucao(demandasEmExecucao[0])}
              </div>
            )}
            {demandasEmExecucao.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {demandasEmExecucao.slice(1).map((demanda) => (
                  <div key={demanda.id} className="relative">
                    <div className="absolute -top-2 right-4 z-10">
                      <StatusBadge status={demanda.status} />
                    </div>
                    <DemandaCard
                      demanda={demanda}
                      variant="em_execucao"
                      onVerDetalhes={handleVerDetalhes}
                    />
                  </div>
                ))}
              </div>
            )}
            {demandasEmExecucao.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <ClipboardList className="w-7 h-7 text-gray-400" />
                </div>
                <p className="text-gray-500">Nenhuma demanda em execução</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="finalizadas" className="mt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {renderDemandaList(demandasFinalizadas, "finalizada")}
          </TabsContent>
        </Tabs>
      </main>

      <div className="md:hidden">
        <BottomNav currentPage="MinhasDemandas" />
      </div>

      {/* Modais */}
      {demandaSelecionada && (
        <>
          <ComentariosModal
            open={comentariosModalOpen}
            onClose={() => setComentariosModalOpen(false)}
            demanda={demandaSelecionada}
            onSalvar={handleSalvarComentarios}
          />
          <AvaliacaoModal
            open={avaliacaoModalOpen}
            onClose={() => setAvaliacaoModalOpen(false)}
            onFinalizar={handleFinalizarComAvaliacao}
          />
        </>
      )}
    </div>
  );
}