import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import PageHeader from '@/components/layout/PageHeader';
import StatusBadge from '@/components/demanda/StatusBadge';
import ComentariosModal from '@/components/demanda/ComentariosModal';
import AvaliacaoModal from '@/components/demanda/AvaliacaoModal';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Timer, 
  DollarSign, 
  Stethoscope,
  Building2,
  FileText,
  Award,
  AlertCircle,
  MessageSquare,
  CheckCircle2
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const mockUser = { id: 'prof123', full_name: 'Dr. João Silva' };

const mockDemandaDetalhe = {
  id: '1',
  convenio_nome: 'Saúde Total',
  especialidade: 'Fisioterapia Motora',
  status: 'disponivel',
  zona: 'Zona Sul',
  cidade: 'São Paulo',
  endereco: 'Rua das Flores, 123',
  data_atendimento: '2024-10-25',
  horario_inicio: '09:00',
  horario_fim: '10:00',
  duracao_minutos: 60,
  valor: 120.00,
  urgencia: 'alta',
  observacoes: 'Paciente idoso, necessita de cuidado ao movimentar.',
  requisitos: 'CREFITO ativo',
  profissional_id: null
};

export default function DetalhesDemanda() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const urlParams = new URLSearchParams(window.location.search);
  const demandaId = urlParams.get('id');
  const [comentariosModalOpen, setComentariosModalOpen] = useState(false);
  const [avaliacaoModalOpen, setAvaliacaoModalOpen] = useState(false);

  const { data: demanda, isLoading } = useQuery({
    queryKey: ['demanda', demandaId],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 600));
      // Retorna o mock, mas se o ID for de uma demanda "minha" (ex: '4'), ajusta o status para teste
      if (demandaId === '4') {
        return { ...mockDemandaDetalhe, id: '4', status: 'em_execucao', profissional_id: 'prof123' };
      }
      return mockDemandaDetalhe;
    },
    enabled: !!demandaId
  });

  const { data: user } = useQuery({
    queryKey: ['current-user'],
    queryFn: () => Promise.resolve(mockUser)
  });

  const aceitarMutation = useMutation({
    mutationFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['demanda', demandaId] });
      queryClient.invalidateQueries({ queryKey: ['demandas-disponiveis'] });
      queryClient.invalidateQueries({ queryKey: ['minhas-demandas'] });
    }
  });

  const iniciarMutation = useMutation({
    mutationFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['demanda', demandaId] });
      queryClient.invalidateQueries({ queryKey: ['minhas-demandas'] });
    }
  });

  const salvarComentariosMutation = useMutation({
    mutationFn: async (comentarios) => {
      await new Promise(resolve => setTimeout(resolve, 500));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['demanda', demandaId] });
      queryClient.invalidateQueries({ queryKey: ['minhas-demandas'] });
      setComentariosModalOpen(false);
    }
  });

  const finalizarComAvaliacaoMutation = useMutation({
    mutationFn: async (avaliacao) => {
      await new Promise(resolve => setTimeout(resolve, 500));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['demanda', demandaId] });
      queryClient.invalidateQueries({ queryKey: ['minhas-demandas'] });
      navigate(createPageUrl('MinhasDemandas'));
    }
  });

  const formatarData = (data) => {
    if (!data) return "";
    try {
      return format(new Date(data), "dd 'de' MMMM, yyyy", { locale: ptBR });
    } catch {
      return data;
    }
  };

  const calcularDuracao = () => {
    if (demanda?.duracao_minutos) {
      const horas = Math.floor(demanda.duracao_minutos / 60);
      const minutos = demanda.duracao_minutos % 60;
      if (horas > 0 && minutos > 0) {
        return `${horas}h ${minutos}min`;
      } else if (horas > 0) {
        return `${horas}h`;
      }
      return `${minutos} minutos`;
    }
    return "";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PageHeader title="Detalhes da Demanda" showBack backPage="MinhasDemandas" />
        <div className="px-4 py-4 max-w-lg mx-auto space-y-4">
          <Skeleton className="h-6 w-24" />
          <Card className="p-4">
            <Skeleton className="h-4 w-40 mb-4" />
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (!demanda) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PageHeader title="Detalhes da Demanda" showBack backPage="MinhasDemandas" />
        <div className="px-4 py-16 max-w-lg mx-auto text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Demanda não encontrada</p>
        </div>
      </div>
    );
  }

  const isOwner = demanda.profissional_id === user?.id;
  const canAccept = demanda.status === 'disponivel';
  const canStart = demanda.status === 'atribuida' && isOwner;
  const isInProgress = demanda.status === 'em_execucao' && isOwner;

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-purple-50 to-pink-50 pb-32">
      <PageHeader 
        title="Detalhes da Demanda" 
        showBack 
        backPage={isOwner ? "MinhasDemandas" : "DemandasDisponiveis"} 
      />

      <main className="px-3 md:px-6 py-3 md:py-6 max-w-4xl mx-auto space-y-3 md:space-y-4">
        {/* Status */}
        <StatusBadge status={demanda.status} />

        {/* Header Card */}
        <Card className="p-5 bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl shadow-xl border-0">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Stethoscope className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-xs text-white/90 font-semibold">{demanda.especialidade}</span>
          </div>
          <h2 className="text-lg font-bold text-white mb-2">{demanda.convenio_nome}</h2>
          <div className="flex items-baseline gap-1">
            <p className="text-2xl font-black text-white">
              R$ {demanda.valor?.toFixed(2).replace('.', ',')}
            </p>
          </div>
        </Card>

        {/* Local e Horário */}
        <Card className="p-4 bg-white rounded-2xl shadow-lg border-0">
          <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-violet-600 to-purple-600 rounded-full"></div>
            Local e Horário
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Endereço</p>
                <p className="text-sm text-gray-900">{demanda.endereco}</p>
                <p className="text-sm text-gray-600">{demanda.zona} - {demanda.cidade}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Data</p>
                <p className="text-sm text-gray-900">{formatarData(demanda.data_atendimento)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Horário e Duração</p>
                <p className="text-sm text-gray-900">
                  {demanda.horario_inicio} - {demanda.horario_fim} ({calcularDuracao()})
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Detalhes do Serviço */}
        <Card className="p-4 bg-white rounded-2xl shadow-lg border-0">
          <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-violet-600 to-purple-600 rounded-full"></div>
            Detalhes do Serviço
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <DollarSign className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Valor Total</p>
                <p className="text-sm text-gray-900 font-medium">
                  R$ {demanda.valor?.toFixed(2).replace('.', ',')}
                </p>
              </div>
            </div>

            {demanda.observacoes && (
              <div className="flex items-start gap-3">
                <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Observações</p>
                  <p className="text-sm text-gray-700">{demanda.observacoes}</p>
                </div>
              </div>
            )}

            {demanda.requisitos && (
              <div className="flex items-start gap-3">
                <Award className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Requisitos</p>
                  <p className="text-sm text-gray-700">{demanda.requisitos}</p>
                </div>
              </div>
            )}

            {demanda.duracao_minutos && (
              <div className="flex items-start gap-3">
                <Timer className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Tempo Estimado</p>
                  <p className="text-sm text-gray-900">{calcularDuracao()}</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </main>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 md:p-6 safe-bottom">
        <div className="max-w-4xl mx-auto space-y-2">
          {canAccept && (
            <Button 
              onClick={() => aceitarMutation.mutate()}
              disabled={aceitarMutation.isPending}
              className="w-full h-12 bg-gradient-to-r from-violet-600 to-purple-600 active:from-violet-700 active:to-purple-700 text-white rounded-xl text-sm font-bold shadow-lg"
            >
              {aceitarMutation.isPending ? "Aceitando..." : "Aceitar Demanda"}
            </Button>
          )}

          {canStart && (
            <Button 
              onClick={() => iniciarMutation.mutate()}
              disabled={iniciarMutation.isPending}
              className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 active:from-orange-600 active:to-red-600 text-white rounded-xl text-sm font-bold shadow-lg"
            >
              {iniciarMutation.isPending ? "Iniciando..." : "Iniciar Atendimento"}
            </Button>
          )}

          {isInProgress && (
            <div className="flex gap-2">
              <Button 
                onClick={() => setComentariosModalOpen(true)}
                className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-lg"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Comentários
              </Button>
              <Button 
                onClick={() => setAvaliacaoModalOpen(true)}
                className="flex-1 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 active:from-emerald-600 active:to-teal-600 text-white rounded-xl text-sm font-bold shadow-lg"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Finalizar
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Modais */}
      <ComentariosModal
        open={comentariosModalOpen}
        onClose={() => setComentariosModalOpen(false)}
        demanda={demanda}
        onSalvar={salvarComentariosMutation.mutate}
      />
      <AvaliacaoModal
        open={avaliacaoModalOpen}
        onClose={() => setAvaliacaoModalOpen(false)}
        onFinalizar={finalizarComAvaliacaoMutation.mutate}
      />
    </div>
  );
}